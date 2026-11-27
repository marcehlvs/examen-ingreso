// Versión «examen» de 6.º año. Las respuestas salen de la versión guiada: no se cargan a mano.
import { withFields } from './exam'

const only = (item, extra) => ({ ...item, ...extra })
const val = (f) => String(f.answer)
const pair = (x, y, label) => ({ kind: 'pair', answer: [val(x), val(y)], label, aria: label, ...(x.tol || y.tol ? { tol: x.tol || y.tol } : {}) })
const complex = (re, im, label) => ({ kind: 'complex', answer: [val(re), val(im)], label, aria: label, ...(re.tol || im.tol ? { tol: re.tol || im.tol } : {}) })
const final = (f, label) => ({ ...f, label, aria: label })

const ITEMS = {
  vecOps: (it) => {
    const names = [...it.prompt.split('calculá ')[1].matchAll(/\$([^$]+)\$/g)].map((m) => `$${m[1]}$ =`)
    return withFields(it, names.map((n, i) => pair(it.fields[2 * i], it.fields[2 * i + 1], n)))
  },
}

const graphExam = (e) => ({
  ...e, title: 'Límites en un gráfico', statement: '',
  items: e.items.map((it) => ({ ...it, prompt: 'A partir del gráfico de $f$, calculá:' })),
})

const EXERCISES = {
  Vectores: (e) => ({ ...e, statement: 'Escribí los ángulos en grados, con un decimal.', items: [ITEMS.vecOps(e.items[0]), e.items[1], e.items[2]] }),

  'Ecuación vectorial de la recta': (e) => {
    const [forms, explicit, two, graph] = e.items
    const [m, n] = explicit.fields
    const slope = val(m), origin = val(n)
    return {
      ...e, statement: '',
      items: [
        only(forms, { paper: forms.prompt.replace('Elegí sus otras formas.', 'Escribí sus ecuaciones paramétricas, simétrica y general.') }),
        withFields(explicit, [{ kind: 'expr', answer: `(${slope})*x+(${origin})`, display: lineText(slope, origin), label: 'y =', aria: 'Ecuación: y =' }]),
        withFields(two, [two.fields[2]], {
          prompt: two.prompt.replace(/ Hallá su vector director .*$/, ' Elegí su ecuación vectorial.'),
          paper: two.prompt.replace(/ Hallá su vector director .*$/, ' Escribí su ecuación vectorial.'),
        }),
        only(graph, { prompt: 'Representá la recta en el plano: tocá dos puntos de la recta.', paper: 'Representá la recta en el plano.' }),
      ],
    }
  },

  'Números complejos: formas y potencias de i': (e) => {
    const [forms, polar, powers, combo] = e.items
    const [mod, arg, re, im] = forms.fields
    return {
      ...e, title: 'Números complejos', statement: 'Escribí los ángulos en grados, con un decimal.',
      items: [
        withFields(forms, [final(mod, 'Módulo $|z|$ ='), final(arg, 'Argumento ='), complex(re, im, 'Conjugado $\\bar{z}$ =')]),
        withFields(polar, [polar.fields[0], complex(polar.fields[1], polar.fields[2], 'Forma binómica:')], {
          paper: polar.prompt.replace('elegí su forma trigonométrica y escribilo en forma binómica', 'escribilo en forma trigonométrica y en forma binómica'),
        }),
        powers,
        withFields(combo, [complex(...combo.fields, 'Resultado')]),
      ],
    }
  },

  'Números complejos: operaciones': (e) => ({
    ...e, statement: 'Los argumentos van en grados, entre $0°$ y $360°$.',
    items: e.items.map((it) => {
      if (it.id !== '4c') return withFields(it, [complex(...it.fields, 'Resultado')], { prompt: it.prompt.replace(' usando la forma polar', '') })
      const names = ['$z_1 \\cdot z_2$ =', '$\\dfrac{z_1}{z_2}$ =', `$(z_2)^{${it.prompt.match(/\(z_2\)\^\{(\d+)\}/)[1]}}$ =`]
      return withFields(it, names.map((label, i) => ({ kind: 'polar', answer: [val(it.fields[2 * i]), val(it.fields[2 * i + 1])], label, aria: label })))
    }),
  }),

  'Límites: propiedades y límites laterales': (e) => {
    const [props, rational, free, lateral] = e.items
    const limit = lateral.fields[2]
    const a = limit.label.match(/\\to (-?\d+)\}/)[1]
    return {
      ...e, title: 'Límites', statement: '',
      items: [
        only(props, { prompt: props.prompt.replace('calculá cada límite aplicando las propiedades.', 'calculá:') }),
        rational, free,
        withFields(lateral, [limit], { prompt: lateral.prompt.replace(/, calculá los límites laterales .*$/, `, calculá $\\lim_{x \\to ${a}} f(x)$.`) }),
      ],
    }
  },

  'Límites a partir de un gráfico': (e) => graphExam(e),
  'Límites infinitos en un gráfico': (e) => graphExam(e),
  'Límites infinitos y en el infinito': (e) => ({ ...e, title: 'Límites', statement: '' }),
  'Indeterminación 0/0': (e) => ({ ...e, title: 'Límites', statement: '' }),

  Continuidad: (e) => ({
    ...e, statement: '',
    items: e.items.map((it) => (it.fields.length === 3
      ? withFields(it, [final(it.fields[2], 'Clasificación')], { prompt: it.prompt.replace('Estudiá la continuidad de', 'Clasificá según su continuidad la función') })
      : it)),
  }),

  Asíntotas: (e) => {
    const [first, second] = e.items
    const set = (f, label) => ({ ...f, label, aria: label })
    const oblique = (answer, display) => ({ kind: 'exprset', answer, display, label: 'Oblicua: y =', aria: 'Asíntota oblicua: y =' })
    const [v, h, m, n] = second.fields
    const ask = (it) => `${it.prompt.split('. Hallá')[0]}. Hallá todas sus asíntotas.`
    return {
      ...e, statement: 'Si no hay asíntotas de algún tipo, indicá ∅. Si hay más de una, separalas con «;».',
      items: [
        withFields(first, [set(first.fields[0], 'Verticales: x ='), set(first.fields[1], 'Horizontales: y ='), oblique('∅', '∅')], { prompt: ask(first) }),
        withFields(second, [set(v, 'Verticales: x ='), set(h, 'Horizontales: y ='), oblique(`(${val(m)})*x+(${val(n)})`, lineText(val(m), val(n)))], { prompt: ask(second) }),
      ],
    }
  },

  Derivadas: (e) => ({
    ...e, statement: 'Derivá cada función. No hace falta simplificar.',
    items: e.items.map((it) => (it.id === '5f' ? withFields(it, it.fields.slice(2)) : it)),
  }),

  'Análisis de una función': (e) => {
    const [a, b, c, d, graph] = e.items
    const tex = a.prompt.split('. Hallá')[0]
    const critical = a.fields[1].answer // [p, q]
    const points = [[b.fields[0], b.fields[1]], [b.fields[2], b.fields[3]]]
    const point = (kind, label) => {
      const i = points.findIndex(([type]) => type.answer === kind)
      return { kind: 'pair', answer: [String(critical[i]), val(points[i][1])], label, aria: label }
    }
    return {
      ...e, statement: `Estudiá la función ${tex}.`,
      items: [
        withFields(a, [point('Máximo relativo', 'Máximo relativo: (x ; y)'), point('Mínimo relativo', 'Mínimo relativo: (x ; y)')], { prompt: 'Hallá los extremos relativos.' }),
        only(c, { prompt: 'Indicá los intervalos de crecimiento y de decrecimiento.' }),
        withFields(d, [
          { kind: 'pair', answer: [val(d.fields[1]), String(valueAt(graph, val(d.fields[1])))], label: 'Punto de inflexión: (x ; y)', aria: 'Punto de inflexión:' },
          d.fields[2], d.fields[3],
        ], { id: '6c', prompt: 'Hallá el punto de inflexión e indicá la concavidad.' }),
        only(graph, { id: '6d', paper: 'Realizá el gráfico de la función.' }),
      ].map((it, i) => (i === 1 ? { ...it, id: '6b' } : it)),
    }
  },

  Optimización: (e) => {
    const [, , values, check] = e.items
    const [x, other] = values.fields
    const best = check.fields[1]
    const labels = e.statement.includes('río') ? ['Cada lado perpendicular al río (m) =', 'Lado paralelo al río (m) =', 'Superficie máxima (m²) =']
      : e.statement.includes('alambre') ? ['Ancho (m) =', 'Largo (m) =', 'Superficie máxima (m²) =']
        : ['Un número =', 'El otro número =', 'Suma mínima =']
    return {
      ...e,
      statement: e.statement.replace(/ Si \$x\$ es el [^,]*, hallá/, ' Hallá').replace(/ Si \$x\$ es uno de los números, .*$/, ''),
      items: [withFields({ ...values, id: '7' }, [x, other, best].map((f, i) => final(f, labels[i])), { prompt: '' })],
    }
  },

  Integrales: (e) => ({
    ...e, statement: 'Calculá las siguientes integrales.',
    items: e.items.map((it) => (it.fields.length === 2
      ? withFields(it, [final(it.fields[1], 'Resultado')], { prompt: it.prompt.replace('. Hallá una primitiva y aplicá la regla de Barrow.', '') })
      : it)),
  }),
}

function lineText(m, n) {
  const slope = m === '1' ? '' : m === '-1' ? '−' : m.replace('-', '−')
  const term = m === '0' ? '' : `${slope}x`
  if (n === '0') return term || '0'
  if (!term) return n.replace('-', '−')
  return `${term} ${n.startsWith('-') ? '−' : '+'} ${n.replace('-', '')}`
}
// Ordenada del punto de inflexión: se evalúa la función correcta del ítem del gráfico.
function valueAt(graph, x) {
  const options = graph.sketch.options
  const f = options['ABCD'.indexOf(graph.sketch.answer)].curves[0].f
  return Math.round(f(Number(x)) * 1e6) / 1e6
}

export const exam6 = (exercises) => exercises.map((e) => (EXERCISES[e.title] ? EXERCISES[e.title](e) : e))
