// Armadores de ítems. Cada casillero recibe una clave única dentro de la actividad (id del ítem + sufijo).
export const num = (answer, extra = {}) => ({ kind: 'num', answer: String(answer), ...extra })
export const sel = (label, options, answer) => ({ kind: 'select', label, options, answer })
export const angle = (d, m, s) => ({ kind: 'angle', answer: [d, m, s], aria: '' })

const keyed = (id, fields) => fields.map((f, i) => ({ ...f, key: `${id}-${i}` }))
export const item = (id, prompt, fields, steps) => ({ id, prompt, fields: keyed(id, fields), steps })

export const calc = (id, expr, answer, steps) => item(id, `$${expr}$`, [num(answer, { label: 'Resultado' })], steps)
export const angleCalc = (id, prompt, a, steps) => item(id, prompt, [angle(...a)], steps)

export const factorItem = (id, numbers, mcm, dcm, steps) =>
  item(id, `Factorizá ${numbers.join(', ')} y calculá el M.C.M. y el D.C.M.`, [
    ...numbers.map((n) => ({ kind: 'factor', label: `${n} =`, aria: `${n} =`, answer: n })),
    num(mcm, { label: 'M.C.M.', aria: 'M.C.M. =' }),
    num(dcm, { label: 'D.C.M.', aria: 'D.C.M. =' }),
  ], steps)

const dec = (x) => String(Math.round(x * 10000) / 10000).replace('.', ',')

// Proporcionalidad inversa: tabla, variables, tipo de relación y gráfico.
export function inverseExercise({ n, statement, k, xs, xName, yName, xShort, yShort, step, yTick }) {
  const rest = xs.slice(1)
  const NAMES = [yName, xName]
  return {
    n, title: 'Proporcionalidad', statement,
    items: [
      {
        id: `${n}a`, prompt: 'Completá la tabla.',
        table: {
          rows: [
            [yName, dec(k), ...rest.map((x, i) => num(dec(k / x), { key: `${n}a-${i}`, aria: `${yShort} con ${x}:` }))],
            [xName, ...xs.map(String)],
          ],
        },
        steps: [`Si se multiplica la cantidad, el tiempo se divide por el mismo número. El producto siempre es $${k}$.`,
          ...rest.map((x) => `Con ${x}: $${k} : ${x} = ${dec(k / x).replace(',', '{,}')}$ horas.`)],
      },
      item(`${n}b1`, '¿Cuál es la variable dependiente y cuál la independiente?',
        [sel('Variable dependiente', NAMES, yName), sel('Variable independiente', NAMES, xName)],
        [`El tiempo depende de la cantidad: la variable dependiente es «${yName}» y la independiente, «${xName}».`]),
      item(`${n}b2`, '¿La relación es de proporcionalidad directa o inversa? ¿Por qué? Indicá la fórmula ($t$: tiempo en horas; $c$: cantidad).',
        [
          sel('Tipo de relación', ['Proporcionalidad directa', 'Proporcionalidad inversa', 'No es proporcional'], 'Proporcionalidad inversa'),
          sel('¿Por qué?', [
            'Porque el cociente entre las dos variables es constante',
            'Porque el producto entre las dos variables es constante',
            'Porque cuando una variable aumenta, la otra también aumenta',
          ], 'Porque el producto entre las dos variables es constante'),
          sel('Fórmula', [`t = ${k} · c`, `t = ${k} : c`, `t = c : ${k}`, `t = ${k} − c`], `t = ${k} : c`),
        ],
        [`$t \\cdot c = ${k}$ en todas las columnas. Por eso es de proporcionalidad inversa.`, `La fórmula es $t = ${k} : c$.`,
          'No alcanza con que una variable baje cuando la otra sube: el producto tiene que ser constante.']),
      {
        id: `${n}c`, prompt: 'Realizá el gráfico: marcá los puntos. Podés tocar el gráfico o usar los botones − y +.',
        chart: {
          type: 'puntos', xLabel: xName, yLabel: yName, yMax: k, step, yTick,
          points: xs.map((x, i) => ({ x, label: `${xShort} ${x}`, key: `${n}c-${i}`, answer: i === 0 ? k : dec(k / x), fixed: i === 0, aria: `${xShort} ${x}:` })),
        },
        steps: xs.map((x) => `Punto $(${x}\\,;\\,${dec(k / x).replace(',', '{,}')})$.`).concat('Los puntos no quedan alineados: en la proporcionalidad inversa describen una curva.'),
      },
    ],
  }
}

// Estadística: tabla de frecuencias, moda, gráfico de barras y circular.
export function statsExercise({ n, statement, data, variable, categories }) {
  const total = categories.reduce((s, c) => s + c.f, 0)
  const moda = categories.reduce((a, b) => (b.f > a.f ? b : a))
  const cell = (key, answer, aria) => num(answer, { key, aria })
  return {
    n, title: 'Estadística', statement, data,
    items: [
      {
        id: `${n}a`,
        prompt: 'Completá la tabla de frecuencias. La frecuencia relativa se puede escribir como fracción o como decimal.',
        table: {
          head: [variable, 'Frec. absoluta', 'Frec. relativa', 'Porcentaje (%)'],
          rows: [
            ...categories.map((c, i) => [c.label,
              cell(`${n}a-f${i}`, c.f, `f de ${c.label}:`),
              cell(`${n}a-r${i}`, `${c.f}/${total}`, `fr de ${c.label}:`),
              cell(`${n}a-p${i}`, (c.f * 100) / total, `% de ${c.label}:`)]),
            ['Total', cell(`${n}a-tf`, total, 'Total f:'), cell(`${n}a-tr`, 1, 'Total fr:'), cell(`${n}a-tp`, 100, 'Total %:')],
          ],
        },
        steps: [`Contá cuántas veces aparece cada valor. Son ${total} datos.`,
          ...categories.map((c) => `${c.label}: $f = ${c.f}$; $f_r = ${c.f} : ${total} = ${dec(c.f / total).replace(',', '{,}')}$; porcentaje: $${(c.f * 100) / total}\\%$.`),
          'Controlá: las frecuencias absolutas suman el total de datos, las relativas suman 1 y los porcentajes, 100.'],
      },
      item(`${n}b`, '¿Cuál es la moda?', [sel('Moda', categories.map((c) => c.label), moda.label)],
        [`La moda es el valor con mayor frecuencia: «${moda.label}», con ${moda.f}.`]),
      {
        id: `${n}c`, prompt: 'Completá el gráfico de barras. Podés tocar el gráfico o usar los botones − y +.',
        chart: {
          type: 'barras', xLabel: variable, yLabel: 'Frecuencia absoluta', yMax: 10, step: 1, yTick: 1,
          points: categories.map((c, i) => ({ label: c.short || c.label, key: `${n}c-${i}`, answer: String(c.f), aria: `${c.label}:` })),
        },
        steps: ['La altura de cada barra es la frecuencia absoluta.', ...categories.map((c) => `${c.label}: altura ${c.f}.`)],
      },
      {
        id: `${n}d`, prompt: 'Completá el gráfico circular: escribí cuántos grados le corresponden a cada sector.',
        chart: { type: 'torta', points: categories.map((c, i) => ({ label: c.label, key: `${n}d-${i}`, answer: String((c.f * 360) / total), aria: `${c.label}:` })) },
        steps: [`El círculo completo mide $360°$ y representa los ${total} datos. A cada dato le corresponden $360° : ${total} = ${360 / total}°$.`,
          ...categories.map((c) => `${c.label}: $${c.f} \\cdot ${360 / total}° = ${(c.f * 360) / total}°$.`)],
      },
    ],
  }
}
