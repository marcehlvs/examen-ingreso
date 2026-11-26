// Armadores para 2.º año.
import { num, sel, item } from './builders'
import { LINES } from '../engine/Geometry'

const r = String.raw
const tex = (v) => String(v).replace('.', ',').replace(',', '{,}')

export const poly = (answer, label) => ({ kind: 'poly', answer, label, aria: label })
export const setField = (answer) => ({ kind: 'set', answer: String(answer), label: 'Conjunto solución: x =', aria: '' })

export const exprItem = (id, expr, answer, steps) => item(id, `$${expr}$`, [poly(answer, 'Expresión reducida')], steps)
export const eqItem = (id, expr, answer, steps) => item(id, `$${expr}$`, [setField(answer)], steps)

const OPS = ['x <', 'x ≤', 'x >', 'x ≥']
const interval = (op, v) => ({ 'x <': `(−∞ ; ${v})`, 'x ≤': `(−∞ ; ${v}]`, 'x >': `(${v} ; +∞)`, 'x ≥': `[${v} ; +∞)` })[op]
export const ineqItem = (id, expr, op, v, steps) => {
  const shown = String(v).replace('-', '−')
  return item(id, `$${expr}$`, [
    sel('Signo de la solución', OPS, op),
    num(v, { label: 'Número', aria: 'Número:' }),
    sel('Conjunto solución (intervalo)', OPS.map((o) => interval(o, shown)), interval(op, shown)),
  ], steps)
}

const lineText = (m, b) => `${m === 1 ? '' : m === -1 ? '-' : m}x${b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${-b}`}`

const graph = (id, m, b, steps) => ({
  id, prompt: 'Graficá la recta. Tocá dos puntos de la recta en el plano.',
  plane: { kind: 'line', key: `${id}-g`, m, b, aria: 'Gráfico:' }, steps,
})

// Función dada: raíz, ordenada y gráfico.
export function givenLine(letter, expr, m, b) {
  const root = -b / m
  return [
    item(`3${letter}1`, `$${expr}$. Hallá la raíz y la ordenada al origen.`,
      [num(root, { label: 'Raíz: x =', aria: 'Raíz:' }), num(b, { label: 'Ordenada al origen: y =', aria: 'Ordenada:' })], [
        r`Ordenada al origen: es el valor de $y$ cuando $x = 0$: $y = ${b}$.`,
        r`Raíz: es el valor de $x$ cuando $y = 0$: $0 = ${lineText(m, b)}$, entonces $x = ${tex(root)}$.`]),
    graph(`3${letter}2`, m, b, [r`Marcá la ordenada $(0 ; ${b})$ y la raíz $(${tex(root)} ; 0)$, y uní los puntos con una recta.`,
      r`La pendiente es $${m}$: por cada unidad que avanza $x$, $y$ ${m > 0 ? 'sube' : 'baja'} ${Math.abs(m)}.`]),
  ]
}

// Recta que pasa por dos puntos.
export function twoPointLine(letter, [x1, y1], [x2, y2]) {
  const m = (y2 - y1) / (x2 - x1), b = y1 - m * x1
  const par = (v) => (v < 0 ? `(${v})` : `${v}`)
  return [
    item(`3${letter}1`, `Hallá la ecuación de la recta que pasa por los puntos $A = (${x1} ; ${y1})$ y $B = (${x2} ; ${y2})$.`, [
      num(m, { label: 'Pendiente: m =', aria: 'Pendiente:' }),
      num(b, { label: 'Ordenada al origen: b =', aria: 'Ordenada:' }),
      poly(lineText(m, b).replace(/ /g, ''), 'Ecuación: y ='),
    ], [
      r`Pendiente: $m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{${y2} - ${par(y1)}}{${x2} - ${par(x1)}} = ${m}$.`,
      r`Reemplazo el punto $A$ en $y = mx + b$: $${y1} = ${m} \cdot ${par(x1)} + b$, entonces $b = ${b}$.`,
      r`La ecuación es $y = ${lineText(m, b)}$.`,
      r`Verifico con $B$: $${m} \cdot ${par(x2)} + ${par(b)} = ${y2}$. ✓`]),
    graph(`3${letter}2`, m, b, [r`Marcá los puntos $A = (${x1} ; ${y1})$ y $B = (${x2} ; ${y2})$: la recta pasa por los dos.`]),
  ]
}

// ---------- Puntos notables de un triángulo ----------
const CENTERS = ['Baricentro', 'Ortocentro', 'Incentro', 'Circuncentro']
const RADIUS = ['Distancia perpendicular del centro a un lado', 'Distancia del centro a un vértice', 'La mitad de un lado']
const INFO = {
  Baricentro: { lines: 'Medianas', how: 'Una mediana une un vértice con el punto medio del lado opuesto. Marcá los puntos medios midiendo con la regla.' },
  Ortocentro: { lines: 'Alturas', how: 'Una altura sale de un vértice y es perpendicular al lado opuesto. Trazala con la escuadra.' },
  Incentro: { lines: 'Bisectrices', how: 'La bisectriz divide cada ángulo en dos partes iguales. Trazala con compás o transportador.' },
  Circuncentro: { lines: 'Mediatrices', how: 'La mediatriz es perpendicular a un lado y pasa por su punto medio. Trazala con compás y regla.' },
}
export function triangleItem(id, prompt, center, points, circle) {
  const info = INFO[center]
  const fields = [sel('¿Qué rectas hay que trazar?', LINES, info.lines), sel('El punto donde se cortan es el…', CENTERS, center)]
  if (circle) fields.push(sel('¿Cuál es el radio de la circunferencia?', RADIUS, RADIUS[circle === 'inscripta' ? 0 : 1]))
  const steps = [info.how, `Alcanza con trazar dos ${info.lines.toLowerCase()}: la tercera sirve para controlar. Se cortan en el ${center.toLowerCase()}.`]
  if (circle === 'inscripta') steps.push('Trazá una perpendicular desde el incentro a un lado: esa distancia es el radio. La circunferencia toca los tres lados.')
  if (circle === 'circunscripta') steps.push('Con centro en el circuncentro y radio hasta un vértice, la circunferencia pasa por los tres vértices.')
  return { ...item(id, `${prompt} Elegí las opciones y mirá cómo queda la construcción.`, fields, steps), figure: { points, circle } }
}

// Estadística con variable numérica: f, F, fr, f %, ángulo; gráfico circular y de barras.
export function statsExercise2({ n, statement, data, variable, values }) {
  const total = values.reduce((s, v) => s + v.f, 0)
  let acc = 0
  const rows = values.map((v) => ({ ...v, F: (acc += v.f) }))
  const dec = (x) => String(Math.round(x * 10000) / 10000).replace('.', ',')
  const cell = (key, answer, aria) => num(answer, { key, aria })
  return {
    n, title: 'Estadística', statement, data,
    items: [
      {
        id: `${n}a`,
        prompt: 'Completá la tabla: frecuencia absoluta (f), acumulada (F), relativa (fr), porcentual (f %) y el ángulo de cada sector.',
        table: {
          head: [variable, 'f', 'F', 'fr', 'f %', 'Ángulo (°)'],
          rows: [
            ...rows.map((v, i) => [v.label,
              cell(`${n}a-f${i}`, v.f, `f de ${v.label}:`), cell(`${n}a-F${i}`, v.F, `F de ${v.label}:`),
              cell(`${n}a-r${i}`, `${v.f}/${total}`, `fr de ${v.label}:`), cell(`${n}a-p${i}`, (v.f * 100) / total, `f% de ${v.label}:`),
              cell(`${n}a-g${i}`, (v.f * 360) / total, `ángulo de ${v.label}:`)]),
            ['Total', cell(`${n}a-tf`, total, 'Total f:'), '—', cell(`${n}a-tr`, 1, 'Total fr:'), cell(`${n}a-tp`, 100, 'Total f%:'), cell(`${n}a-tg`, 360, 'Total ángulo:')],
          ],
        },
        steps: [`f: contá cuántas veces aparece cada valor. En total hay ${total} datos.`,
          `F: sumá las frecuencias absolutas desde el primer valor: ${rows.map((v) => v.F).join(', ')}. La última coincide con el total.`,
          `fr = f : ${total}. f % = fr · 100. Ángulo = fr · 360° (cada dato equivale a ${360 / total}°).`,
          ...rows.map((v) => `Valor ${v.label}: f = ${v.f}; F = ${v.F}; fr = ${dec(v.f / total)}; f % = ${(v.f * 100) / total}; ángulo = ${(v.f * 360) / total}°.`)],
      },
      {
        id: `${n}b`, prompt: 'Completá el gráfico circular: escribí cuántos grados le corresponden a cada sector.',
        chart: { type: 'torta', points: rows.map((v, i) => ({ label: `${variable}: ${v.label}`, key: `${n}b-${i}`, answer: String((v.f * 360) / total), aria: `${v.label}:` })) },
        steps: rows.map((v) => `${v.label}: ${(v.f * 360) / total}°.`),
      },
      {
        id: `${n}c`, prompt: 'Completá el gráfico de barras. Podés tocar el gráfico o usar los botones − y +.',
        chart: { type: 'barras', xLabel: variable, yLabel: 'Frecuencia absoluta', yMax: 10, step: 1, yTick: 1,
          points: rows.map((v, i) => ({ label: v.label, key: `${n}c-${i}`, answer: String(v.f), aria: `${v.label}:` })) },
        steps: ['La altura de cada barra es la frecuencia absoluta.', ...rows.map((v) => `${v.label}: altura ${v.f}.`)],
      },
    ],
  }
}
