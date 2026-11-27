import { exprEqual, parseLimit } from './expr'
// Corrección de respuestas escritas.

// Número en formato argentino: «3.902,35», «0,5», «23/12», «$ 40», «15%», «90°». Devuelve null si no se entiende.
export function parseNumber(raw) {
  let s = String(raw ?? '').replace(/[\s$%°]/g, '').replace(/−/g, '-')
  if (!s) return null
  const one = (t) => {
    if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.')
    else if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '') // separador de miles
    return /^-?(\d+(\.\d+)?|\.\d+)$/.test(t) ? Number(t) : null
  }
  const parts = s.split('/')
  if (parts.length === 1) return one(s)
  if (parts.length !== 2) return null
  const a = one(parts[0]), b = one(parts[1])
  return a === null || b === null || b === 0 ? null : a / b
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const isPrime = (n) => {
  if (n < 2) return false
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false
  return true
}

// Descomposición en factores primos: «2^2·3», «2x2x3», «2².3», «2*2*3»
export function isFactorization(raw, n) {
  const s = String(raw ?? '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUP.indexOf(c)).join(''))
    .replace(/\s/g, '')
    .replace(/[x×·.*]/gi, '*')
  let product = 1
  for (const term of s.split('*')) {
    const m = term.match(/^(\d+)(?:\^(\d+))?$/)
    if (!m) return false
    const base = Number(m[1]), exp = m[2] === undefined ? 1 : Number(m[2])
    if (!isPrime(base) || exp < 1 || exp > 20) return false
    product *= base ** exp
    if (product > n) return false
  }
  return product === n
}

// Polinomio reducido en x, en cualquier orden: «4x^4+7x^3-2x^2-5x», «x³ − 5x² + 6x», «6 - 3x».
// Devuelve {grado: coeficiente}, o null si no se entiende o quedan términos semejantes sin reducir.
export function parsePoly(raw, variable = 'x') {
  let s = String(raw ?? '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUP.indexOf(c)).join(''))
    .replace(/[\s·*]/g, '').replace(/−/g, '-').toLowerCase().replace(/^y=/, '').replace(/\((-?\d+\/\d+)\)/g, '$1')
  if (variable !== 'x') {
    if (s.includes('x')) return null
    s = s.split(variable).join('x')
  }
  if (!s || !/^[+-]?[^+-]+([+-][^+-]+)*$/.test(s)) return null
  const out = {}
  for (const term of s.match(/[+-]?[^+-]+/g)) {
    const m = term.match(/^([+-])?(\d+(?:[.,]\d+)?(?:\/\d+)?)?(x(?:\^(\d+))?(?:\/(\d+))?)?$/)
    if (!m || (m[2] === undefined && !m[3])) return null
    const coef = ((m[1] === '-' ? -1 : 1) * (m[2] === undefined ? 1 : parseNumber(m[2]))) / (m[5] ? Number(m[5]) : 1)
    const deg = m[3] ? (m[4] === undefined ? 1 : Number(m[4])) : 0
    if (deg in out) return null
    out[deg] = coef
  }
  return out
}

const samePoly = (a, b) => {
  if (!a || !b) return false
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].every((d) => Math.abs((a[d] || 0) - (b[d] || 0)) < 1e-9)
}

// Diferencia de cuadrados escrita como producto de dos binomios conjugados, en cualquier orden.
function isConjugates(raw, field) {
  const s = String(raw ?? '').replace(/\s/g, '').replace(/\((-?\d+\/\d+)\)/g, '$1')
  const m = s.match(/^\(([^()]+)\)[·*×.]?\(([^()]+)\)$/)
  if (!m) return false
  const got = [m[1], m[2]].map((t) => parsePoly(t, field.v))
  const [a, b] = field.factors.map((t) => parsePoly(t, field.v))
  const neg = (q) => Object.fromEntries(Object.entries(q).map(([d, c]) => [d, -c]))
  return [[a, b], [neg(a), neg(b)]].some(([x, y]) =>
    (samePoly(got[0], x) && samePoly(got[1], y)) || (samePoly(got[0], y) && samePoly(got[1], x)))
}

// Recta numérica con solución de una inecuación: «extremo|c u a (cerrado o abierto)|izq o der».
export const parseRay = (raw) => {
  const [end = '', closed = '', dir = ''] = String(raw || '').split('|')
  return { end, closed, dir }
}

const isLine = (raw, { m, b }) => {
  const pts = parsePoints(raw)
  return pts.length === 2 && (pts[0][0] !== pts[1][0] || pts[0][1] !== pts[1][1])
    && pts.every(([x, y]) => Math.abs(m * x + b - y) < 1e-9)
}
export const linesOk = (raw, field) => {
  const sets = String(raw || '').split('|')
  return field.lines.map((l, i) => isLine(sets[i], l))
}

// Conjunto solución: «vacio» (∅) o el único número que lo forma.
const isEmptySet = (raw) => /^(∅|ø|\{\}|vac[ií]o)$/i.test(String(raw ?? '').replace(/\s/g, ''))

// Recta dibujada: el alumno marca dos puntos, guardados como «x,y;x,y».
export const parsePoints = (raw) => String(raw || '').split(';').filter(Boolean).map((p) => p.split(',').map(Number))

const same = (a, b, tol = 1e-9) => a !== null && Math.abs(a - b) <= tol

// Conjunto con uno o varios números separados por «;», en cualquier orden, o vacío.
function isNumberSet(raw, field) {
  if (field.answer === '∅') return isEmptySet(raw)
  const got = String(raw ?? '').replace(/[{}]/g, '').split(';').map(parseNumber)
  const want = field.answer.map(parseNumber)
  if (got.length !== want.length || got.some((v) => v === null)) return false
  const sort = (l) => [...l].sort((a, b) => a - b)
  return sort(got).every((v, i) => same(v, sort(want)[i], field.tol ? field.tol + 1e-9 : 1e-9))
}

// Un «campo» es cada casillero que el alumno completa.
export function isFieldOk(field, value) {
  if (field.kind === 'expr') return exprEqual(value, field.answer, { antiderivative: field.antiderivative, points: field.points })
  if (field.kind === 'limit') {
    const got = parseLimit(value, parseNumber), want = typeof field.answer === 'number' || /\d/.test(String(field.answer)) ? parseNumber(String(field.answer)) : field.answer
    return typeof want === 'number' ? same(got, want, field.tol ? field.tol + 1e-9 : 1e-9) && typeof got === 'number' : got === want
  }
  if (field.kind === 'select' || field.kind === 'sketch') return value === field.answer
  if (field.kind === 'numset') return isNumberSet(value, field)
  if (field.kind === 'poly') return samePoly(parsePoly(value, field.v), parsePoly(field.answer, field.v))
  if (field.kind === 'set') return field.answer === '∅' ? isEmptySet(value) : same(parseNumber(value), parseNumber(field.answer))
  if (field.kind === 'line') return isLine(value, field)
  if (field.kind === 'lines') return linesOk(value, field).every(Boolean)
  if (field.kind === 'conj') return isConjugates(value, field)
  if (field.kind === 'point') {
    const v = parseNumber(value)
    return v !== null && Math.abs(v - field.value) <= 0.15
  }
  if (field.kind === 'ray') {
    const r = parseRay(value), end = parseNumber(r.end)
    return end !== null && Math.abs(end - field.end) < 0.01 && r.closed === (field.closed ? 'c' : 'a') && r.dir === field.dir
  }
  if (field.kind === 'factor') return isFactorization(value, field.answer)
  if (field.kind === 'angle') {
    const v = value || []
    const nums = [0, 1, 2].map((i) => (/^\d+$/.test((v[i] || '').trim()) ? Number(v[i]) : null))
    return nums.every((x, i) => x === field.answer[i])
  }
  return same(parseNumber(value), parseNumber(field.answer), field.tol ? field.tol + 1e-9 : 1e-9)
}

export const isFilled = (value) =>
  Array.isArray(value) ? value.some((x) => String(x || '').trim() !== '') : String(value ?? '').trim() !== ''

// Todos los campos de un ítem, vengan de una lista, una tabla o un gráfico.
export function fieldsOf(item) {
  if (item.sketch) return [item.sketch]
  if (item.plane) return [item.plane]
  if (item.axis) return [item.axis]
  if (item.table) return item.table.rows.flat().filter((c) => typeof c === 'object')
  if (item.chart) return item.chart.points.filter((p) => !p.fixed)
  return item.fields
}

export const isItemOk = (item, values) => fieldsOf(item).every((f) => isFieldOk(f, values[f.key]))

// Ejercicios con consigna «elegí k»: se cuentan solo k grupos de ítems. Para corregir, los mejor resueltos;
// para saber qué falta completar, los que tienen más casilleros escritos.
export function countedItems(exercise, values, by = 'ok') {
  if (!exercise.choose) return exercise.items
  const { k, groups } = exercise.choose
  const ranked = groups.map((ids, order) => {
    const items = ids.map((id) => exercise.items.find((i) => i.id === id))
    const ok = items.filter((i) => isItemOk(i, values)).length
    const filled = items.filter((i) => fieldsOf(i).some((f) => isFilled(values[f.key]))).length
    return { items, order, score: by === 'ok' ? ok * 100 + filled : filled }
  }).sort((a, b) => b.score - a.score || a.order - b.order)
  return ranked.slice(0, k).sort((a, b) => a.order - b.order).flatMap((g) => g.items)
}

// Un ítem queda «sin elegir» si su grupo está vacío y ya hay otros k grupos con respuestas.
export function isSkipped(exercise, item, values) {
  if (!exercise.choose) return false
  const used = (ids) => ids.some((id) => fieldsOf(exercise.items.find((i) => i.id === id)).some((f) => isFilled(values[f.key])))
  const mine = exercise.choose.groups.find((ids) => ids.includes(item.id))
  return !!mine && !used(mine) && exercise.choose.groups.filter(used).length >= exercise.choose.k
}

export const show = (field) => {
  const es = (v) => String(v).replace('.', ',')
  if (field.kind === 'expr') return field.display || field.answer.replace(/\^(\d)/g, (_, d) => SUP[d]).replace(/\*/g, '·')
  if (field.kind === 'limit') return field.display || (field.answer === 'inf' ? '+∞' : field.answer === '-inf' ? '−∞' : field.answer === 'dne' ? 'no existe' : field.tol ? `≈ ${es(field.answer)}` : es(field.answer).replace('-', '−'))
  if (field.kind === 'numset') return field.answer === '∅' ? '∅' : `{${field.answer.map(es).join(' ; ')}}`
  if (field.kind === 'sketch') return `gráfico ${field.answer}`
  if (field.kind === 'num' && field.tol) return `≈ ${es(field.answer)}`
  if (field.kind === 'angle') return `${field.answer[0]}° ${field.answer[1]}′ ${field.answer[2]}″`
  if (field.kind === 'factor') return factorText(field.answer)
  if (field.kind === 'line') return field.display || `la recta que pasa por (0 ; ${field.b}) y (1 ; ${field.m + field.b})`
  if (field.kind === 'lines') return field.names.join(', ') + ' como indica el desarrollo'
  if (field.kind === 'conj') return field.factors.map((f) => `(${f.replace(/\^(\d)/g, (_, d) => SUP[d])})`).join('')
  if (field.kind === 'point') return `en ${String(Math.round(field.value * 10) / 10).replace('.', ',')} (aproximadamente)`
  if (field.kind === 'ray') return `${field.closed ? 'punto lleno' : 'punto hueco'} en ${field.label2}, sombreado hacia la ${field.dir === 'izq' ? 'izquierda' : 'derecha'}`
  if (field.kind === 'poly') return field.answer.replace(/\^(\d)/g, (_, d) => SUP[d])
  if (field.kind === 'set') return field.answer === '∅' ? 'S = ∅' : `S = {${field.answer}}`
  return String(field.answer)
}

export function factorText(n) {
  const out = []
  for (let p = 2; n > 1; p++) {
    let e = 0
    while (n % p === 0) { n /= p; e++ }
    if (e) out.push(e === 1 ? `${p}` : `${p}${String(e).split('').map((d) => SUP[d]).join('')}`)
  }
  return out.join(' · ')
}
