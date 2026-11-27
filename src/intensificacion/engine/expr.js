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
      out.push(name === 'x' ? { t: 'x' } : name in CONSTS ? { t: 'const', v: CONSTS[name], name } : { t: 'fn', f: FUNCS[name], name })
      i += name.length; continue
    }
    if ('+-*/^()'.includes(s[i])) { out.push({ t: 'op', v: s[i] }); i++; continue }
    return null
  }
  return out
}

// Gramática única: el «armado» decide si se obtiene una función (para corregir) o LaTeX (para mostrar).
// Si faltan paréntesis de cierre al final, se completan solos: «√(x+1» vale «√(x+1)».
function parse(src, make) {
  const toks = tokenize(src)
  if (!toks || !toks.length) return null
  let p = 0
  const peek = () => toks[p]
  const isOp = (v) => peek()?.t === 'op' && peek().v === v
  const startsPrimary = () => { const k = peek(); return k && (k.t === 'num' || k.t === 'x' || k.t === 'const' || k.t === 'fn' || (k.t === 'op' && k.v === '(')) }
  const fail = () => { throw new Error('parse') }

  function expr() {
    let l = term()
    while (isOp('+') || isOp('-')) { const op = toks[p++].v; l = make.sum(l, term(), op) }
    return l
  }
  function term() {
    let l = unary()
    for (;;) {
      if (isOp('*') || isOp('/')) { const d = toks[p++].v === '/'; const b = unary(); l = d ? make.div(l, b) : make.mul(l, b) }
      else if (startsPrimary()) l = make.mul(l, unary())
      else return l
    }
  }
  function unary() {
    if (isOp('-')) { p++; return make.neg(unary()) }
    if (isOp('+')) { p++; return unary() }
    return power()
  }
  function power() {
    const base = primary()
    if (isOp('^')) { p++; return make.pow(base, power2()) }
    return base
  }
  function power2() {
    if (isOp('-')) { p++; return make.neg(power2()) }
    if (isOp('+')) { p++; return power2() }
    return power()
  }
  function primary() {
    const k = toks[p++]
    if (!k) fail()
    if (k.t === 'num') return make.num(k.v)
    if (k.t === 'const') return make.constant(k)
    if (k.t === 'x') return make.x()
    if (k.t === 'fn') return make.fn(k, isOp('(') ? primary() : power())
    if (k.t === 'op' && k.v === '(') {
      const a = expr()
      if (isOp(')')) p++
      else if (p < toks.length) fail()
      return make.group(a)
    }
    return fail()
  }
  try { const out = expr(); return p === toks.length ? out : null } catch { return null }
}

const EVAL = {
  num: (v) => () => v,
  constant: (k) => () => k.v,
  x: () => (x) => x,
  sum: (a, b, op) => (op === '+' ? (x) => a(x) + b(x) : (x) => a(x) - b(x)),
  mul: (a, b) => (x) => a(x) * b(x),
  div: (a, b) => (x) => a(x) / b(x),
  neg: (a) => (x) => -a(x),
  pow: (a, b) => (x) => Math.pow(a(x), b(x)),
  fn: (k, a) => (x) => k.f(a(x)),
  group: (a) => a,
}

// Cada nodo: «tex» es cómo se escribe; «bare» es lo de adentro de un paréntesis (sobra en fracciones, raíces y exponentes).
const node = (tex, bare = tex) => ({ tex, bare })
const FN_TEX = { sin: 'sen', sen: 'sen', cos: 'cos', tan: 'tan', ln: 'ln', log: 'log' }
const TEX = {
  num: (v) => node(String(v).replace('.', '{,}')),
  constant: (k) => node(k.name === 'pi' ? '\\pi' : 'e'),
  x: () => node('x'),
  sum: (a, b, op) => node(`${a.tex} ${op} ${b.tex}`),
  mul: (a, b) => node(/^(\d|-)/.test(b.tex) ? `${a.tex} \\cdot ${b.tex}` : `${a.tex}\\,${b.tex}`),
  div: (a, b) => node(`\\dfrac{${a.bare}}{${b.bare}}`),
  neg: (a) => node(`-${a.tex}`),
  pow: (a, b) => node(`{${a.tex}}^{${b.bare}}`),
  fn: (k, a) => {
    if (k.name === 'sqrt') return node(`\\sqrt{${a.bare}}`)
    if (k.name === 'exp') return node(`e^{${a.bare}}`)
    if (k.name === 'abs') return node(`\\left|${a.bare}\\right|`)
    return node(`\\operatorname{${FN_TEX[k.name]}}\\left(${a.bare}\\right)`)
  },
  group: (a) => node(`\\left(${a.tex}\\right)`, a.tex),
}

// Devuelve una función de x, o null si la expresión no se entiende.
export const compile = (src) => parse(src, EVAL)

const POINTS = [0.4, 0.9, 1.3, 1.7, 2.2, 2.9, 3.6, 4.4]
const clean = (raw) => String(raw ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-')
  .replace(/^(y|f\(x\)|f'\(x\)|f´\(x\)|f''\(x\)|g\(x\)|g'\(x\)|h'\(x\)|a\(x\)|a'\(x\)|s\(x\)|s'\(x\)|f)=/, '')
const closeTo = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))

// LaTeX de lo que escribió el alumno, o null si todavía no se entiende.
export function toTex(raw, { antiderivative = false } = {}) {
  let text = clean(raw), constant = ''
  if (antiderivative) {
    const m = text.match(/\+(c|k)$/)
    if (m) { constant = ` + ${m[1].toUpperCase()}`; text = text.slice(0, -2) }
  }
  const out = parse(text, TEX)
  return out ? out.tex + constant : null
}

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
