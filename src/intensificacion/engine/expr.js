// Expresiones en x escritas por el alumno (derivadas, integrales, rectas). No se comparan como texto:
// se evalúan en varios puntos, así «2x(3x^2-1)» y «6x^3-2x» valen lo mismo.
const FUNCS = { sin: Math.sin, sen: Math.sin, cos: Math.cos, tan: Math.tan, ln: Math.log, log: Math.log10, sqrt: Math.sqrt, exp: Math.exp, abs: Math.abs }
const CONSTS = { pi: Math.PI, e: Math.E }
const NAMES = [...Object.keys(FUNCS), ...Object.keys(CONSTS), 'x'].sort((a, b) => b.length - a.length)
const SUP = { '²': '^2', '³': '^3', '⁴': '^4', '⁵': '^5', '⁶': '^6' }

function tokenize(src) {
  const s = String(src ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/÷/g, '/')
    .replace(/√/g, 'sqrt').replace(/π/g, 'pi').replace(/[²³⁴⁵⁶]/g, (c) => SUP[c])
  const out = []
  for (let i = 0; i < s.length;) {
    const rest = s.slice(i)
    const n = rest.match(/^(\d+([.,]\d+)?|[.,]\d+)/)
    if (n) { out.push({ t: 'num', v: Number(n[0].replace(',', '.')) }); i += n[0].length; continue }
    const name = NAMES.find((k) => rest.startsWith(k))
    if (name) {
      out.push(name === 'x' ? { t: 'x' } : name in CONSTS ? { t: 'const', v: CONSTS[name] } : { t: 'fn', f: FUNCS[name] })
      i += name.length; continue
    }
    if ('+-*/^()'.includes(s[i])) { out.push({ t: 'op', v: s[i] }); i++; continue }
    return null
  }
  return out
}

// Devuelve una función de x, o null si la expresión no se entiende.
export function compile(src) {
  const toks = tokenize(src)
  if (!toks || !toks.length) return null
  let p = 0
  const peek = () => toks[p]
  const isOp = (v) => peek()?.t === 'op' && peek().v === v
  const startsPrimary = () => { const k = peek(); return k && (k.t === 'num' || k.t === 'x' || k.t === 'const' || k.t === 'fn' || (k.t === 'op' && k.v === '(')) }
  const fail = () => { throw new Error('parse') }

  function expr() {
    let l = term()
    while (isOp('+') || isOp('-')) { const m = toks[p++].v === '+' ? 1 : -1; const a = l, b = term(); l = (x) => a(x) + m * b(x) }
    return l
  }
  function term() {
    let l = unary()
    for (;;) {
      if (isOp('*') || isOp('/')) { const d = toks[p++].v === '/'; const a = l, b = unary(); l = d ? (x) => a(x) / b(x) : (x) => a(x) * b(x) }
      else if (startsPrimary()) { const a = l, b = unary(); l = (x) => a(x) * b(x) }
      else return l
    }
  }
  function unary() {
    if (isOp('-')) { p++; const a = unary(); return (x) => -a(x) }
    if (isOp('+')) { p++; return unary() }
    return power()
  }
  function power() {
    const base = primary()
    if (isOp('^')) { p++; const e = power2(); return (x) => Math.pow(base(x), e(x)) }
    return base
  }
  function power2() {
    if (isOp('-')) { p++; const a = power2(); return (x) => -a(x) }
    if (isOp('+')) { p++; return power2() }
    return power()
  }
  function primary() {
    const k = toks[p++]
    if (!k) fail()
    if (k.t === 'num') return () => k.v
    if (k.t === 'const') return () => k.v
    if (k.t === 'x') return (x) => x
    if (k.t === 'fn') { const a = isOp('(') ? primary() : power(); return (x) => k.f(a(x)) }
    if (k.t === 'op' && k.v === '(') { const a = expr(); if (!isOp(')')) fail(); p++; return a }
    return fail()
  }
  try { const f = expr(); return p === toks.length ? f : null } catch { return null }
}

const POINTS = [0.4, 0.9, 1.3, 1.7, 2.2, 2.9, 3.6, 4.4]
const clean = (raw) => String(raw ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-')
  .replace(/^(y|f\(x\)|f'\(x\)|f´\(x\)|f''\(x\)|g\(x\)|g'\(x\)|h'\(x\)|a\(x\)|a'\(x\)|s\(x\)|s'\(x\)|f)=/, '')
const closeTo = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))

// antiderivative: la respuesta puede diferir de la correcta en una constante (y se ignora un «+ C» final).
export function exprEqual(raw, want, { antiderivative = false, points = POINTS } = {}) {
  const text = antiderivative ? clean(raw).replace(/[+-]?(c|k)$/, '') : clean(raw)
  if (!text) return false
  const g = compile(text), f = compile(want)
  if (!g || !f) return false
  const pairs = points.map((x) => [f(x), g(x)]).filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b))
  if (pairs.length < Math.min(5, points.length)) return false
  if (!antiderivative) return pairs.every(([a, b]) => closeTo(a, b))
  const d0 = pairs[0][1] - pairs[0][0]
  return pairs.every(([a, b]) => closeTo(b - a, d0))
}

// Límite: número (o fracción), +∞, −∞ o «no existe».
export function parseLimit(raw, parseNumber) {
  const s = String(raw ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-')
  if (!s) return null
  if (/^(no(existe)?|∄|dne|noexiste)$/.test(s)) return 'dne'
  if (/^\+?(∞|inf|infinito)$/.test(s)) return 'inf'
  if (/^-(∞|inf|infinito)$/.test(s)) return '-inf'
  return parseNumber(s)
}
