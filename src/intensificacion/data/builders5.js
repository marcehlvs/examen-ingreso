// Armadores para 5.º año.
import { num, sel, item } from './builders'

const r = String.raw

// Número como fracción simple o con dos decimales, para intervalos y desarrollos.
export function fmt(v) {
  for (let d = 1; d <= 12; d++) {
    const n = v * d
    if (Math.abs(n - Math.round(n)) < 1e-9) return `${Math.round(n) < 0 ? '−' : ''}${Math.abs(Math.round(n))}${d > 1 ? `/${d}` : ''}`
  }
  return v.toFixed(2).replace('.', ',').replace('-', '−')
}
const isSimple = (v) => !fmt(v).includes(',')
// Respuesta numérica: exacta si es fracción simple; si no, redondeada a dos decimales.
const value = (v) => (isSimple(v) ? fmt(v).replace('−', '-') : v.toFixed(2))
const approx = (v) => (isSimple(v) ? {} : { tol: 0.01 })

export const numset = (answer, label, tol) => ({ kind: 'numset', answer, label, aria: label || 'S =', ...(tol ? { tol } : {}) })
const setOf = (list, label) => {
  if (!list.length) return numset('∅', label)
  return numset(list.map(value), label, list.some((v) => !isSimple(v)) ? 0.01 : undefined)
}

const open = (a, b) => `(${a} ; ${b})`
const INF = '+∞', NEG = '−∞'
const unique = (list) => [...new Set(list)]

// ---------- Ecuaciones con módulo y exponenciales ----------
export const setEquation = (id, expr, solutions, steps) => item(id, `$${expr}$`, [numset(solutions.length ? solutions : '∅', '')], steps)
export const valueEquation = (id, expr, answer, steps) => item(id, `$${expr}$`, [num(answer, { label: 'x =', aria: 'x =' })], steps)
// Solución de la forma (a + √b) : c
export const surdEquation = (id, expr, [a, b, c], steps) => item(id, `$${expr}$. La solución tiene la forma $x = \\dfrac{a + \\sqrt{b}}{c}$.`, [
  num(a, { label: 'a =', aria: 'a =' }), num(b, { label: 'b =', aria: 'b =' }), num(c, { label: 'c =', aria: 'c =' })], steps)

// ---------- Estudio de f(x) = A·|m·x + n| + k ----------
export function absStudy(id, tex, { A, m, n, k, simplified }) {
  const h = -n / m, H = fmt(h), K = fmt(k)
  const roots = -k / A > 0 ? [(-(-k / A) - n) / m, (-k / A - n) / m].sort((a, b) => a - b) : []
  const y0 = A * Math.abs(n) + k
  const left = open(NEG, H), right = open(H, INF)
  const up = A > 0 ? right : left, down = A > 0 ? left : right
  const [R1, R2] = roots.map(fmt)
  const outer = roots.length ? `${open(NEG, R1)} ∪ ${open(R2, INF)}` : 'ℝ'
  const inner = roots.length ? open(R1, R2) : '∅'
  const signOptions = unique(['ℝ', '∅', outer, inner, ...(roots.length ? [] : [left, right])])
  const pos = roots.length ? (A > 0 ? outer : inner) : A > 0 ? 'ℝ' : '∅'
  const neg = roots.length ? (A > 0 ? inner : outer) : A > 0 ? '∅' : 'ℝ'
  const image = A > 0 ? `[${K} ; ${INF})` : `(${NEG} ; ${K}]`
  return [
    item(`${id}1`, `$${tex}$. Hallá las raíces y la ordenada al origen. Si hay dos raíces, separalas con «;»; si no hay, usá ∅.`, [
      setOf(roots, 'Raíces'), num(value(y0), { label: 'Ordenada al origen: y =', aria: 'Ordenada:', ...approx(y0) })], [
      `Primero se simplifica: $${simplified}$. El vértice es el punto $(${H} ; ${K})$.`,
      roots.length ? `Raíces: igualando a 0 queda $|${m}x ${n < 0 ? '-' : '+'} ${Math.abs(n)}| = ${fmt(-k / A)}$. Salen dos casos: $x = ${R1}$ y $x = ${R2}$.`
        : `Raíces: al igualar a 0 el módulo tendría que valer $${fmt(-k / A)}$. Un módulo no puede ser negativo: no hay raíces.`,
      `Ordenada al origen: $x = 0$, entonces $y = ${fmt(y0)}$.`]),
    item(`${id}2`, 'Indicá dominio, imagen e intervalos de crecimiento y decrecimiento.', [
      sel('Dominio', ['ℝ', left, right], 'ℝ'),
      sel('Imagen', unique([`[${K} ; ${INF})`, `(${NEG} ; ${K}]`, `[${H} ; ${INF})`, 'ℝ']), image),
      sel('Intervalo de crecimiento', [left, right, 'ℝ'], up),
      sel('Intervalo de decrecimiento', [left, right, 'ℝ'], down)], [
      'El dominio es ℝ: se puede reemplazar x por cualquier número.',
      `El coeficiente que multiplica al módulo es $${A}$: la V abre hacia ${A > 0 ? 'arriba' : 'abajo'}. El vértice $(${H} ; ${K})$ es el ${A > 0 ? 'mínimo' : 'máximo'}.`,
      `Imagen: ${image}. Crece en ${up} y decrece en ${down}.`]),
    item(`${id}3`, 'Indicá los conjuntos de positividad (C⁺) y negatividad (C⁻).', [
      sel('C⁺', signOptions, pos), sel('C⁻', signOptions, neg)], [
      roots.length ? 'Las raíces separan los tramos donde la función cambia de signo.' : 'Como no hay raíces, la función tiene siempre el mismo signo.',
      `C⁺ = ${pos} y C⁻ = ${neg}.`]),
  ]
}

// ---------- Estudio de funciones logarítmicas y exponenciales, con elección del gráfico ----------
const LETTERS = ['A', 'B', 'C', 'D']
function sketchItem(id, window, correct, wrong, position, steps, note = ' (la línea punteada es la asíntota)') {
  const options = [...wrong]
  options.splice(position, 0, correct)
  return {
    id, prompt: `Elegí el gráfico que corresponde a la función${note}.`,
    sketch: { kind: 'sketch', key: `${id}-s`, window, options, answer: LETTERS[position], aria: 'Gráfico:' }, steps,
  }
}

const interceptItem = (id, root, y0, steps) => item(id, 'Hallá las intersecciones con los ejes. Si no corta un eje, usá ∅. Redondeá a dos decimales cuando haga falta.', [
  setOf(root === null ? [] : [root], 'Corta al eje x en x ='),
  setOf(y0 === null ? [] : [y0], 'Corta al eje y en y ='),
], steps)

const signItem = (id, increasing, pos, neg, options, steps) => item(id, 'Indicá el crecimiento y los conjuntos de positividad y negatividad.', [
  sel('La función es', ['Creciente', 'Decreciente'], increasing ? 'Creciente' : 'Decreciente'),
  sel('C⁺', options, pos), sel('C⁻', options, neg)], steps)

// f(x) = a·log_b(m·x + n) + k. Si b no se indica, es el logaritmo natural.
export function logStudy(id, tex, { a, b, m, n, k, position, window = [-12, 12, -8, 8] }) {
  const base = b || Math.E, baseTex = b ? String(b) : 'e'
  const h = -n / m, H = fmt(h)
  const power = Math.pow(base, -k / a)
  const root = (power - n) / m
  const y0 = n > 0 ? (a * Math.log(n)) / Math.log(base) + k : null
  const increasing = a * m > 0
  const domain = m > 0 ? open(H, INF) : open(NEG, H)
  const R = fmt(root)
  const below = m > 0 ? open(H, R) : open(NEG, R), above = m > 0 ? open(R, INF) : open(R, H)
  const pos = increasing ? above : below
  const neg = pos === above ? below : above
  const make = (aa, mm, nn) => ({ f: (x) => (mm * x + nn > 0 ? (aa * Math.log(mm * x + nn)) / Math.log(base) + k : mm * x + nn === 0 ? (aa > 0 ? -Infinity : Infinity) : NaN) })
  const graphOf = (aa, mm, nn) => ({ curves: [make(aa, mm, nn)], asymptote: { x: -nn / mm } })
  return [
    item(`${id}1`, `$${tex}$. Indicá dominio, asíntota e imagen.`, [
      sel('Dominio', unique([open(H, INF), open(NEG, H), open(fmt(-h), INF), 'ℝ']), domain),
      sel('Asíntota', unique([`x = ${H}`, `x = ${fmt(-h)}`, `y = ${H}`, `y = ${fmt(k)}`]), `x = ${H}`),
      sel('Imagen', unique(['ℝ', open(fmt(k), INF), open(NEG, fmt(k))]), 'ℝ')], [
      `El argumento tiene que ser positivo: $${m === 1 ? '' : m === -1 ? '-' : m}x ${n < 0 ? '-' : '+'} ${Math.abs(n)} > 0$, entonces el dominio es ${domain}.`,
      `La asíntota vertical es $x = ${H}$. La imagen de una función logarítmica es ℝ.`]),
    interceptItem(`${id}2`, root, y0, [
      `Eje x: $\\log_{${baseTex}}(\\ldots) = ${fmt(-k / a)}$, así que el argumento vale $${baseTex}^{${fmt(-k / a)}}$. Resulta $x ${isSimple(root) ? '=' : '\\approx'} ${R.replace(',', '{,}').replace('−', '-')}$.`,
      y0 === null ? 'Eje y: $x = 0$ no pertenece al dominio, así que no corta al eje y.' : `Eje y: se reemplaza $x = 0$ y se obtiene $y ${isSimple(y0) ? '=' : '≈'} ${fmt(y0)}$.`]),
    signItem(`${id}3`, increasing, pos, neg, unique([above, below, domain, '∅']), [
      `La función es ${increasing ? 'creciente' : 'decreciente'}. Cambia de signo en la raíz.`, `C⁺ = ${pos} y C⁻ = ${neg}.`]),
    sketchItem(`${id}4`, window, graphOf(a, m, n), [graphOf(-a, m, n), graphOf(a, -m, -n), graphOf(a, m, -n)], position, [
      `Tiene asíntota en $x = ${H}$, existe en ${domain}, es ${increasing ? 'creciente' : 'decreciente'} y corta al eje x en ${R}.`]),
  ]
}

// f(x) = a·b^x + k, con b > 1.
export function expStudy(id, tex, { a, b, k, position, window = [-6, 6, -7, 7] }) {
  const q = -k / a
  const root = q > 0 ? Math.log(q) / Math.log(b) : null
  const y0 = a + k, increasing = a > 0, K = fmt(k)
  const image = a > 0 ? open(K, INF) : open(NEG, K)
  const R = root === null ? null : fmt(root)
  const left = open(NEG, R), right = open(R, INF)
  const pos = root === null ? (a > 0 ? 'ℝ' : '∅') : increasing ? right : left
  const neg = root === null ? (a > 0 ? '∅' : 'ℝ') : increasing ? left : right
  const graphOf = (aa, sign, kk) => ({ curves: [{ f: (x) => aa * Math.pow(b, sign * x) + kk }], asymptote: { y: kk } })
  return [
    item(`${id}1`, `$${tex}$. Indicá dominio, asíntota e imagen.`, [
      sel('Dominio', unique(['ℝ', open(K, INF), open('0', INF)]), 'ℝ'),
      sel('Asíntota', unique([`y = ${K}`, `y = ${fmt(-k)}`, `x = ${K}`, 'y = 0']), `y = ${K}`),
      sel('Imagen', unique([open(K, INF), open(NEG, K), open(fmt(-k), INF), 'ℝ']), image)], [
      'El dominio de una función exponencial es ℝ.', `La asíntota horizontal es $y = ${K}$ y la imagen es ${image}.`]),
    interceptItem(`${id}2`, root, y0, [
      root === null ? 'Eje x: la ecuación no tiene solución.' : `Eje x: $${b}^x = ${fmt(q).replace(',', '{,}')}$, entonces $x ${isSimple(root) ? '=' : '≈'}$ ${R}.`,
      `Eje y: como $${b}^0 = 1$, resulta $y = ${fmt(y0)}$.`]),
    signItem(`${id}3`, increasing, pos, neg, unique([left, right, 'ℝ', '∅']), [`La función es ${increasing ? 'creciente' : 'decreciente'}.`, `C⁺ = ${pos} y C⁻ = ${neg}.`]),
    sketchItem(`${id}4`, window, graphOf(a, 1, k), [graphOf(-a, 1, k), graphOf(a, -1, k), graphOf(a, 1, -k)], position, [
      `Tiene asíntota en $y = ${K}$, es ${increasing ? 'creciente' : 'decreciente'} y corta al eje y en ${fmt(y0)}.`]),
  ]
}

export const chooseExercise = (n, title, statement, k, groups) => ({
  n, title, statement, items: groups.flat(), choose: { k, groups: groups.map((g) => g.map((i) => i.id)) },
})

// ---------- Producto de una función lineal por una cuadrática, leído del gráfico ----------
export function productExercise(n, { f, g, h, fAt, gAt, window, xs, zeros, pos, neg, signOptions, wrong, position }) {
  const picture = { window, curves: [{ f, color: '#17703f', label: 'f', at: fAt }, { f: g, color: '#a1262f', label: 'g', at: gAt }], alt: 'Gráficos de la recta f y la parábola g' }
  const hs = xs.map((x) => f(x) * g(x))
  const sketchWindow = [window[0], window[1], -10, 16]
  return {
    n, title: 'Producto de funciones',
    statement: 'En el gráfico se muestran la función lineal f y la función cuadrática g. Considerá la función h(x) = f(x) · g(x).',
    items: [
      { ...item(`${n}a`, 'Leé los valores en el gráfico y calculá:', xs.map((x, i) => num(fmt(hs[i]).replace('−', '-'), { label: `h(${x}) =`, aria: `h(${x}) =` })),
        xs.map((x, i) => `$h(${x}) = f(${x}) \\cdot g(${x}) = (${fmt(f(x)).replace('−', '-')}) \\cdot (${fmt(g(x)).replace('−', '-')}) = ${fmt(hs[i]).replace('−', '-')}$.`)), graph: picture },
      item(`${n}b`, 'Indicá los ceros de h (separados con «;») y sus conjuntos de positividad y negatividad. Justificá en tu carpeta.', [
        numset(zeros.map(String), 'Ceros de h'), sel('C⁺', signOptions, pos), sel('C⁻', signOptions, neg)], [
        'h vale 0 cuando f vale 0 o g vale 0: se juntan las raíces de las dos funciones.',
        'En cada tramo se aplica la regla de los signos al producto de f por g.', `Ceros: ${zeros.join(' ; ')}. C⁺ = ${pos}. C⁻ = ${neg}.`]),
      sketchItem(`${n}c`, sketchWindow, { curves: [{ f: (x) => f(x) * g(x) }] }, wrong.map((w) => ({ curves: [{ f: w }] })), position, [
        `Marcá los ceros y los puntos calculados: ${xs.map((x, i) => `(${x} ; ${fmt(hs[i])})`).join(', ')}. El gráfico correcto pasa por todos.`], ''),
    ],
  }
}

// ---------- Estadística: regla de Sturges, tabla, gráficos y coeficiente de variación ----------
const dec = (x) => String(Math.round(x * 10000) / 10000).replace('.', ',')

export function sturgesExercise({ n, statement, data, variable, min, max, amplitude, freqs, compare }) {
  const total = freqs.reduce((s, f) => s + f, 0)
  const exact = 1 + 3.322 * Math.log10(total), classes = Math.round(exact)
  const range = max - min
  let acc = 0
  const rows = freqs.map((f, i) => {
    const lo = min + i * amplitude, hi = lo + amplitude
    return { f, F: (acc += f), mark: (lo + hi) / 2, label: i === freqs.length - 1 ? `[${lo};${hi}]` : `[${lo};${hi})` }
  })
  const sum = rows.reduce((s, v) => s + v.mark * v.f, 0)
  const cell = (key, answer, aria) => num(answer, { key, aria })
  const stats = (list) => {
    const mean = list.reduce((s, v) => s + v, 0) / list.length
    const sd = Math.sqrt(list.reduce((s, v) => s + (v - mean) ** 2, 0) / list.length)
    return { mean, sd, cv: (sd / mean) * 100 }
  }
  const [A, B] = compare.groups.map(stats)
  const names = compare.names
  return {
    n, title: 'Estadística', statement, data,
    items: [
      item(`${n}a`, 'Aplicá la regla de Sturges, $k = 1 + 3{,}322 \\cdot \\log n$ (redondeá k al entero más cercano), y calculá el rango y la amplitud.', [
        num(classes, { label: 'Cantidad de intervalos: k =', aria: 'k =' }),
        num(range, { label: 'Rango: R =', aria: 'R =' }),
        num(amplitude, { label: 'Amplitud: a =', aria: 'a =' })], [
        `$k = 1 + 3{,}322 \\cdot \\log ${total} \\approx ${exact.toFixed(2).replace('.', '{,}')}$, entonces $k = ${classes}$.`,
        `Rango: $R = ${max} - ${min} = ${range}$.`, `Amplitud: $a = R : k = ${range} : ${classes} = ${amplitude}$.`]),
      {
        id: `${n}b`, prompt: `Completá la tabla. El primer intervalo empieza en ${min} y el último incluye su extremo derecho.`,
        table: {
          head: [variable, 'xᵢ', 'f', 'F', 'xᵢ·f'],
          rows: [
            ...rows.map((v, i) => [v.label, cell(`${n}b-x${i}`, v.mark, `Marca de ${v.label}:`), cell(`${n}b-f${i}`, v.f, `f de ${v.label}:`),
              cell(`${n}b-F${i}`, v.F, `F de ${v.label}:`), cell(`${n}b-m${i}`, v.mark * v.f, `Producto de ${v.label}:`)]),
            ['Total', '—', cell(`${n}b-tf`, total, 'Total f:'), '—', cell(`${n}b-tm`, sum, 'Suma de productos:')],
          ],
        },
        steps: ['xᵢ es el punto medio de cada intervalo.', ...rows.map((v) => `${v.label}: xᵢ = ${dec(v.mark)}; f = ${v.f}; F = ${v.F}; xᵢ·f = ${dec(v.mark * v.f)}.`), `Suma: ${dec(sum)}.`],
      },
      {
        id: `${n}c`, prompt: 'Completá la frecuencia relativa, la porcentual y el ángulo de cada sector.',
        table: {
          head: [variable, 'fr', 'f %', 'Ángulo (°)'],
          rows: [
            ...rows.map((v, i) => [v.label, cell(`${n}c-r${i}`, `${v.f}/${total}`, `fr de ${v.label}:`),
              cell(`${n}c-p${i}`, (v.f * 100) / total, `f% de ${v.label}:`), cell(`${n}c-g${i}`, (v.f * 360) / total, `ángulo de ${v.label}:`)]),
            ['Total', cell(`${n}c-tr`, 1, 'Total fr:'), cell(`${n}c-tp`, 100, 'Total f%:'), cell(`${n}c-tg`, 360, 'Total ángulo:')],
          ],
        },
        steps: [`fr = f : ${total}; f % = fr · 100; ángulo = fr · 360°.`, ...rows.map((v) => `${v.label}: ${dec(v.f / total)}; ${(v.f * 100) / total} %; ${(v.f * 360) / total}°.`)],
      },
      item(`${n}d`, 'Calculá la media.', [num(sum / total, { label: 'Media' })], [`$\\bar{x} = \\dfrac{\\sum x_i \\cdot f}{n} = \\dfrac{${sum}}{${total}} = ${dec(sum / total).replace(',', '{,}')}$.`]),
      {
        id: `${n}e`, prompt: 'Completá el gráfico de barras. Podés tocar el gráfico o usar los botones − y +.',
        chart: { type: 'barras', xLabel: variable, yLabel: 'Frecuencia absoluta', yMax: 10, step: 1, yTick: 1,
          points: rows.map((v, i) => ({ label: v.label, key: `${n}e-${i}`, answer: String(v.f), aria: `${v.label}:` })) },
        steps: rows.map((v) => `${v.label}: altura ${v.f}.`),
      },
      {
        id: `${n}f`, prompt: 'Completá el gráfico circular: escribí cuántos grados le corresponden a cada sector.',
        chart: { type: 'torta', points: rows.map((v, i) => ({ label: v.label, key: `${n}f-${i}`, answer: String((v.f * 360) / total), aria: `${v.label}:` })) },
        steps: rows.map((v) => `${v.label}: ${(v.f * 360) / total}°.`),
      },
      item(`${n}g`, `${compare.statement} ${names[0]}: ${compare.groups[0].join(', ')}. ${names[1]}: ${compare.groups[1].join(', ')}. Usá el desvío estándar poblacional (dividí por n).`,
        [A, B].flatMap((s, i) => [
          num(s.mean, { label: `${names[i]}: media`, aria: `${names[i]}, media:` }),
          num(s.sd, { label: `${names[i]}: desvío estándar`, aria: `${names[i]}, desvío:` }),
          num(Math.round(s.cv * 100) / 100, { label: `${names[i]}: CV (%)`, aria: `${names[i]}, CV:` }),
        ]).concat(sel('¿Cuál de los dos grupos es más homogéneo?', names, A.cv < B.cv ? names[0] : names[1])), [
        ...[A, B].map((s, i) => `${names[i]}: media ${dec(s.mean)}; varianza ${dec(s.sd ** 2)}; desvío ${dec(s.sd)}; CV = desvío : media · 100 = ${dec(s.cv)} %.`),
        `Es más homogéneo el grupo con menor CV: ${A.cv < B.cv ? names[0] : names[1]}.`]),
    ],
  }
}

// ---------- Combinatoria y probabilidad ----------
const KINDS = ['Permutación sin repetición', 'Permutación con repetición', 'Variación sin repetición', 'Variación con repetición', 'Combinación']

export function countingExercise(n, problems, combinatorial, probability) {
  const letters = 'abcdefg'
  const counting = problems.map(([text, kind, answer, steps], i) => item(`${n}${letters[i]}`, text,
    [sel('¿Qué se usa?', KINDS, KINDS[kind]), num(answer, { label: 'Cantidad', aria: 'Cantidad:' })], steps))
  const [cn, ck, cv, csteps] = combinatorial
  const [ptext, pans, psteps] = probability
  const comb = item(`${n}e`, `Calculá el número combinatorio $\\dbinom{${cn}}{${ck}}$.`, [num(cv, { label: 'Resultado' })], csteps)
  return {
    n, title: 'Combinatoria y probabilidad',
    statement: 'En cada situación, decidí si importa el orden y si se pueden repetir elementos. Después calculá.',
    // Orden: permutaciones, variaciones, número combinatorio, combinación y probabilidad.
    items: [...counting.slice(0, 4), comb, { ...counting[4], id: `${n}f`, fields: counting[4].fields.map((f, i) => ({ ...f, key: `${n}f-${i}` })) },
      item(`${n}g`, ptext, [num(pans, { label: 'Probabilidad (fracción o decimal)', aria: 'Probabilidad:' })], psteps)],
  }
}
