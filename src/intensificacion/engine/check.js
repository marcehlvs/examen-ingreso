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
export function parsePoly(raw) {
  const s = String(raw ?? '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUP.indexOf(c)).join(''))
    .replace(/[\s·*]/g, '').replace(/−/g, '-').toLowerCase().replace(/^y=/, '')
  if (!s || !/^[+-]?[^+-]+([+-][^+-]+)*$/.test(s)) return null
  const out = {}
  for (const term of s.match(/[+-]?[^+-]+/g)) {
    const m = term.match(/^([+-])?(\d+(?:[.,]\d+)?(?:\/\d+)?)?(x(?:\^(\d+))?)?$/)
    if (!m || (m[2] === undefined && !m[3])) return null
    const coef = (m[1] === '-' ? -1 : 1) * (m[2] === undefined ? 1 : parseNumber(m[2]))
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

// Conjunto solución: «vacio» (∅) o el único número que lo forma.
const isEmptySet = (raw) => /^(∅|ø|\{\}|vac[ií]o)$/i.test(String(raw ?? '').replace(/\s/g, ''))

// Recta dibujada: el alumno marca dos puntos, guardados como «x,y;x,y».
export const parsePoints = (raw) => String(raw || '').split(';').filter(Boolean).map((p) => p.split(',').map(Number))

const same = (a, b) => a !== null && Math.abs(a - b) < 1e-9

// Un «campo» es cada casillero que el alumno completa.
export function isFieldOk(field, value) {
  if (field.kind === 'select') return value === field.answer
  if (field.kind === 'poly') return samePoly(parsePoly(value), parsePoly(field.answer))
  if (field.kind === 'set') return field.answer === '∅' ? isEmptySet(value) : same(parseNumber(value), parseNumber(field.answer))
  if (field.kind === 'line') {
    const pts = parsePoints(value)
    return pts.length === 2 && (pts[0][0] !== pts[1][0] || pts[0][1] !== pts[1][1])
      && pts.every(([x, y]) => Math.abs(field.m * x + field.b - y) < 1e-9)
  }
  if (field.kind === 'factor') return isFactorization(value, field.answer)
  if (field.kind === 'angle') {
    const v = value || []
    const nums = [0, 1, 2].map((i) => (/^\d+$/.test((v[i] || '').trim()) ? Number(v[i]) : null))
    return nums.every((x, i) => x === field.answer[i])
  }
  return same(parseNumber(value), parseNumber(field.answer))
}

export const isFilled = (value) =>
  Array.isArray(value) ? value.some((x) => String(x || '').trim() !== '') : String(value ?? '').trim() !== ''

// Todos los campos de un ítem, vengan de una lista, una tabla o un gráfico.
export function fieldsOf(item) {
  if (item.plane) return [item.plane]
  if (item.table) return item.table.rows.flat().filter((c) => typeof c === 'object')
  if (item.chart) return item.chart.points.filter((p) => !p.fixed)
  return item.fields
}

export const isItemOk = (item, values) => fieldsOf(item).every((f) => isFieldOk(f, values[f.key]))

export const show = (field) => {
  if (field.kind === 'angle') return `${field.answer[0]}° ${field.answer[1]}′ ${field.answer[2]}″`
  if (field.kind === 'factor') return factorText(field.answer)
  if (field.kind === 'line') return `la recta que pasa por (0 ; ${field.b}) y (1 ; ${field.m + field.b})`
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
