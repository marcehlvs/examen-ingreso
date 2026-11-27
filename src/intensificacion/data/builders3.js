// Armadores para 3.er año.
import { num, sel, item } from './builders'

const r = String.raw
const tex = (v) => String(Math.round(v * 10000) / 10000).replace('.', '{,}')
const txt = (v) => String(Math.round(v * 10000) / 10000).replace('.', ',')

const polyField = (answer, label, v = 'x') => ({ kind: 'poly', answer, v, label, aria: label })

// ---------- Trapecio: perímetro y área ----------
export function trapezoidExercise(n, shape) {
  const { top, over, height, side } = shape
  const base = top + 2 * over, per = base + top + 2 * side, area = ((base + top) * height) / 2
  return {
    n, title: 'Perímetro y área', statement: 'Escribí de la forma más sencilla posible las expresiones que representan el perímetro y el área de la figura.',
    items: [{
      ...item(`${n}a`, 'Observá el trapecio.', [polyField(`${per}x`, 'Perímetro'), polyField(`${area}x^2`, 'Área')], [
        `Base mayor: $${over}x + ${top}x + ${over}x = ${base}x$.`,
        `Perímetro: $${base}x + ${side}x + ${top}x + ${side}x = ${per}x$.`,
        r`Área del trapecio: $A = \dfrac{(B + b) \cdot h}{2} = \dfrac{(${base}x + ${top}x) \cdot ${height}x}{2} = ${area}x^2$.`,
      ]),
      shape,
    }],
  }
}

// ---------- Productos especiales ----------
export function specialProducts(n, [squareTex, squareAnswer, v1, squareSteps], [diffTex, factors, v2, diffSteps]) {
  return {
    n, title: 'Productos especiales',
    statement: 'En a) desarrollá el cuadrado del binomio. En b) escribí la diferencia de cuadrados como producto de dos binomios (usá los botones para los paréntesis y las potencias).',
    items: [
      item(`${n}a`, `$${squareTex}$`, [polyField(squareAnswer, 'Desarrollo', v1)], squareSteps),
      item(`${n}b`, `$${diffTex}$`, [{ kind: 'conj', factors, v: v2, label: 'Producto de binomios', aria: 'Producto:' }], diffSteps),
    ],
  }
}

// ---------- Recta numérica ----------
export const rootPoint = (id, expr, value, steps) => ({
  id, prompt: `Ubicá $${expr}$ en la recta numérica. Tocá la recta y ajustá con los botones − y +.`,
  axis: { kind: 'point', key: `${id}-p`, value, aria: 'Posición:' }, steps,
})

// Inecuación: primero la solución y después su representación. end es un número y shown, su escritura.
export function ineqPair(letter, expr, op, shown, end, steps) {
  const closed = op === 'x ≤' || op === 'x ≥', dir = op === 'x <' || op === 'x ≤' ? 'izq' : 'der'
  const v = shown.replace('-', '−')
  const interval = (o) => ({ 'x <': `(−∞ ; ${v})`, 'x ≤': `(−∞ ; ${v}]`, 'x >': `(${v} ; +∞)`, 'x ≥': `[${v} ; +∞)` })[o]
  const OPS = ['x <', 'x ≤', 'x >', 'x ≥']
  return [
    item(`1${letter}1`, `$${expr}$`, [
      sel('Signo de la solución', OPS, op),
      num(shown, { label: 'Número', aria: 'Número:' }),
      sel('Conjunto solución (intervalo)', OPS.map(interval), interval(op)),
    ], steps),
    {
      id: `1${letter}2`, prompt: 'Representá la solución en la recta numérica. Ubicá el extremo, elegí el tipo de punto y hacia dónde se sombrea.',
      axis: { kind: 'ray', key: `1${letter}2-r`, end, closed, dir, label2: v, aria: 'Gráfico:' },
      steps: [`El extremo es $${shown}$${Number.isInteger(end) ? '' : ` (en decimal, $${tex(end)}$)`}.`,
        closed ? 'El signo incluye la igualdad: el punto va lleno y en el intervalo se usa corchete.' : 'El signo es estricto: el punto va hueco y en el intervalo se usa paréntesis.',
        `Se sombrea hacia la ${dir === 'izq' ? 'izquierda (los menores)' : 'derecha (los mayores)'}.`],
    },
  ]
}

// ---------- Radicales: respuesta de la forma a·√b ----------
export const radical = (id, expr, coef, root, steps) =>
  item(id, `$${expr}$. El resultado tiene la forma $a \\cdot \\sqrt{b}$.`, [
    num(coef, { label: 'a (número que multiplica a la raíz)', aria: 'a =' }),
    num(root, { label: 'b (número dentro de la raíz)', aria: 'b =' }),
  ], steps)

// ---------- Sistemas de ecuaciones ----------
export const system = (id, [eq1, eq2], x, y, steps) =>
  item(id, `$\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}$`, [
    num(x, { label: 'x =', aria: 'x =' }),
    num(y, { label: 'y =', aria: 'y =' }),
  ], steps)

// ---------- Rectas paralelas y perpendiculares ----------
export function linesExercise(n, { p1, p2, parallel, perp, l1, l2, l3 }) {
  const pt = ([x, y]) => `(${x} ; ${y})`
  const eqItem = (id, prompt, line, steps) => item(id, prompt, [
    num(line.mText, { label: 'Pendiente: m =', aria: 'Pendiente:' }),
    polyField(line.eq, 'Ecuación: y ='),
  ], steps)
  const par = (v) => (v < 0 ? `(${v})` : `${v}`)
  return {
    n, title: 'Ecuación de la recta', statement: `La recta $L_1$ pasa por los puntos $${pt(p1)}$ y $${pt(p2)}$.`,
    items: [
      eqItem(`${n}a`, 'Hallá la ecuación de $L_1$.', l1, [
        `Pendiente: $m = \\dfrac{${p2[1]} - ${par(p1[1])}}{${p2[0]} - ${par(p1[0])}} = ${l1.mTex}$.`,
        `Reemplazo $${pt(p1)}$ en $y = mx + b$ y obtengo $b = ${l1.b}$.`, `$L_1$: $y = ${l1.tex}$.`]),
      eqItem(`${n}b`, `Hallá la ecuación de la recta $L_2$, paralela a $L_1$, que pasa por $${pt(parallel)}$.`, l2, [
        `Las rectas paralelas tienen la misma pendiente: $m = ${l2.mTex}$.`, `Como pasa por $${pt(parallel)}$: $b = ${l2.b}$.`, `$L_2$: $y = ${l2.tex}$.`]),
      eqItem(`${n}c`, `Hallá la ecuación de la recta $L_3$, perpendicular a $L_1$, que pasa por $${pt(perp)}$.`, l3, [
        `La pendiente de una perpendicular es la inversa y opuesta: $m = ${l3.mTex}$. Se cumple que $m_1 \\cdot m_3 = -1$.`,
        `Reemplazo $${pt(perp)}$ y obtengo $b = ${l3.b}$.`, `$L_3$: $y = ${l3.tex}$.`]),
      {
        id: `${n}d`, prompt: 'Representá las tres rectas en el mismo sistema de ejes. Elegí cada recta y tocá dos de sus puntos en el plano.',
        plane: { kind: 'lines', key: `${n}d-g`, names: ['L1', 'L2', 'L3'], lines: [l1, l2, l3].map(({ m, b }) => ({ m, b })), aria: 'Gráfico:' },
        steps: [`$L_1$ pasa por $${pt(p1)}$ y $${pt(p2)}$.`, `$L_2$ pasa por $${pt(parallel)}$ y es paralela a $L_1$.`,
          `$L_3$ pasa por $${pt(perp)}$ y forma un ángulo recto con $L_1$.`],
      },
    ],
  }
}

// ---------- Estadística (datos no agrupados y agrupados, sin regla de Sturges) ----------
// rows: [{label, x, f}]; en datos agrupados, además lo y hi, y x es la marca de clase.
function frequencyItems(n, rows, firstHead, grouped) {
  const total = rows.reduce((s, v) => s + v.f, 0)
  let acc = 0
  rows.forEach((v) => { v.F = (acc += v.f) })
  const sum = rows.reduce((s, v) => s + v.x * v.f, 0)
  const cell = (key, answer, aria) => num(answer, { key, aria })
  const mid = grouped ? 'xᵢ' : null
  const first = {
    id: `${n}a`,
    prompt: grouped
      ? 'Completá la tabla: marca de clase (xᵢ), frecuencia absoluta (f), acumulada (F) y el producto xᵢ · f.'
      : 'Completá la tabla: frecuencia absoluta (f), acumulada (F) y el producto x · f.',
    table: {
      head: [firstHead, ...(grouped ? [mid] : []), 'f', 'F', grouped ? 'xᵢ·f' : 'x·f'],
      rows: [
        ...rows.map((v, i) => [v.label,
          ...(grouped ? [cell(`${n}a-x${i}`, v.x, `Marca de ${v.label}:`)] : []),
          cell(`${n}a-f${i}`, v.f, `f de ${v.label}:`), cell(`${n}a-F${i}`, v.F, `F de ${v.label}:`),
          cell(`${n}a-m${i}`, v.x * v.f, `Producto de ${v.label}:`)]),
        ['Total', ...(grouped ? ['—'] : []), cell(`${n}a-tf`, total, 'Total f:'), '—', cell(`${n}a-tm`, sum, 'Suma de productos:')],
      ],
    },
    steps: [
      ...(grouped ? ['La marca de clase es el punto medio del intervalo: (límite inferior + límite superior) : 2. El extremo derecho no entra en el intervalo.'] : []),
      `f: contá cuántos datos hay en cada ${grouped ? 'intervalo' : 'valor'}. En total son ${total}.`,
      `F: suma de las frecuencias absolutas hasta esa fila: ${rows.map((v) => v.F).join(', ')}.`,
      ...rows.map((v) => `${v.label}: ${grouped ? `xᵢ = ${txt(v.x)}; ` : ''}f = ${v.f}; F = ${v.F}; producto = ${txt(v.x * v.f)}.`),
      `Suma de los productos: ${txt(sum)}.`,
    ],
  }
  const second = {
    id: `${n}b`, prompt: 'Completá la frecuencia relativa (fr) y la porcentual (f %).',
    table: {
      head: [firstHead, 'fr', 'f %'],
      rows: [
        ...rows.map((v, i) => [v.label, cell(`${n}b-r${i}`, `${v.f}/${total}`, `fr de ${v.label}:`), cell(`${n}b-p${i}`, (v.f * 100) / total, `f% de ${v.label}:`)]),
        ['Total', cell(`${n}b-tr`, 1, 'Total fr:'), cell(`${n}b-tp`, 100, 'Total f%:')],
      ],
    },
    steps: [`fr = f : ${total} y f % = fr · 100.`, ...rows.map((v) => `${v.label}: fr = ${txt(v.f / total)}; f % = ${(v.f * 100) / total}.`),
      'Control: las relativas suman 1 y los porcentajes, 100.'],
  }
  return { total, sum, mean: sum / total, items: [first, second] }
}

// questions: [{ q, answer, step, options? }]
const questionItem = (id, questions) => item(id, 'Respondé a partir de la tabla.',
  questions.map((q) => (q.options ? sel(q.q, q.options, q.answer) : num(q.answer, { label: q.q, aria: `${q.q}` }))),
  questions.map((q) => q.step))

export function ungroupedExercise({ n, statement, data, variable, values, median, medianStep, questions }) {
  const rows = values.map(([x, f]) => ({ label: String(x), x, f }))
  const t = frequencyItems(n, rows, variable, false)
  const mode = rows.reduce((a, b) => (b.f > a.f ? b : a))
  return {
    n, title: 'Estadística: datos no agrupados', statement, data,
    items: [
      ...t.items,
      item(`${n}c`, 'Calculá la media, la mediana y la moda.', [
        num(t.mean, { label: 'Media' }), num(median, { label: 'Mediana' }), num(mode.x, { label: 'Moda' }),
      ], [`Media: $\\bar{x} = \\dfrac{\\sum x \\cdot f}{n} = \\dfrac{${t.sum}}{${t.total}} = ${tex(t.mean)}$.`,
        medianStep, `Moda: es el valor con mayor frecuencia, ${mode.x} (f = ${mode.f}).`]),
      questionItem(`${n}d`, questions),
    ],
  }
}

export function groupedExercise({ n, statement, data, variable, limits, freqs, questions }) {
  const rows = freqs.map((f, i) => ({ label: `[${limits[i]} ; ${limits[i + 1]})`, lo: limits[i], hi: limits[i + 1], x: (limits[i] + limits[i + 1]) / 2, f }))
  const t = frequencyItems(n, rows, variable, true)
  const modal = rows.reduce((a, b) => (b.f > a.f ? b : a))
  const half = t.total / 2
  const mi = rows.findIndex((v) => v.F >= half)
  const m = rows[mi], before = mi ? rows[mi - 1].F : 0
  const median = m.lo + ((half - before) / m.f) * (m.hi - m.lo)
  const labels = rows.map((v) => v.label)
  return {
    n, title: 'Estadística: datos agrupados', statement, data,
    items: [
      ...t.items,
      item(`${n}c`, 'Calculá la media e indicá el intervalo modal, el intervalo mediano y la mediana.', [
        num(t.mean, { label: 'Media' }), sel('Intervalo modal', labels, modal.label),
        sel('Intervalo mediano', labels, m.label), num(median, { label: 'Mediana' }),
      ], [`Media: $\\bar{x} = \\dfrac{\\sum x_i \\cdot f}{n} = \\dfrac{${t.sum}}{${t.total}} = ${tex(t.mean)}$.`,
        `Intervalo modal: el de mayor frecuencia, ${modal.label} (f = ${modal.f}).`,
        `Intervalo mediano: n : 2 = ${half}. El primer intervalo cuya F llega a ${half} es ${m.label}.`,
        `Mediana: $M_e = L_i + \\dfrac{\\frac{n}{2} - F_{ant}}{f} \\cdot a = ${m.lo} + \\dfrac{${half} - ${before}}{${m.f}} \\cdot ${m.hi - m.lo} = ${tex(median)}$.`]),
      questionItem(`${n}d`, questions),
    ],
  }
}
