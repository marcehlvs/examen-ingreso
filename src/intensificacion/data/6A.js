// 6.º año. No hay hojas de modelo: el contenido se armó con los temas del programa.
// 1.er cuatrimestre: vectores, recta, números complejos y límites. 2.º cuatrimestre: límites infinitos e indeterminaciones,
// continuidad, asíntotas, derivadas, análisis de funciones, optimización e integrales.
// «Práctica» es el modelo (con desarrollo paso a paso) y los exámenes 1 y 2 son variantes con otros números.
import { activitySet } from './builders'
import {
  vecOps, vecModArg, vecDot, lineForms, lineExplicit, lineTwoPoints, lineGraph,
  C, cmul, cdiv, cpow, csub, cadd, ct, cplxForms, cplxPolarToBinomial, iPowers, iCombo, cplxResult, mulSteps, divSteps, cplxPolarOps, cplxMoivre,
  limRational, limInfinity, limFree, limProps, limLateral, limGraph, contItem, contK, asymRational, asymOblique,
  derivItem, tangentItem, cubicStudy, optimization, integralItem, definiteItem, qsub, qmul, qdiv, qadd,
} from './builders6'

const r = String.raw
const withPoints = (it, points) => ({ ...it, fields: it.fields.map((f) => (f.kind === 'expr' ? { ...f, points } : f)) })
const SMALL = [0.2, 0.5, 0.8, 1.1, 1.4, 1.7]

// =====================================================================
// 1.er cuatrimestre
// =====================================================================
const vectors = ([u, w, ops, modVec]) => ({
  n: 1, title: 'Vectores',
  statement: 'Los vectores se escriben por componentes, $(x\\,;\\,y)$. Escribí los ángulos en grados, con un decimal.',
  items: [vecOps('1a', u, w, ops), vecModArg('1b', modVec), vecDot('1c', u, w)],
})
const U = r`\vec{u}`, V = r`\vec{v}`
const op = (text, tex, a, b) => ({ text, tex, a, b })

const line = ([P, d, A, B, pos, pos2]) => ({
  n: 2, title: 'Ecuación vectorial de la recta',
  statement: 'Una recta queda determinada por un punto $P$ y un vector director $\\vec{d}$. Su ecuación vectorial es $(x\\,;\\,y) = P + \\lambda \\cdot \\vec{d}$.',
  items: [lineForms('2a', P, d, pos), lineExplicit('2b', P, d), lineTwoPoints('2c', A, B, pos2), lineGraph('2d', P, d)],
})

const complexForms = ([zf, pol, ks, combo]) => ({
  n: 3, title: 'Números complejos: formas y potencias de i',
  statement: 'La forma binómica es $a + bi$; la polar, $r_{\\alpha}$; la trigonométrica, $r(\\cos\\alpha + i\\,\\mathrm{sen}\\,\\alpha)$. Recordá que $i^2 = -1$.',
  items: [cplxForms('3a', ...zf), cplxPolarToBinomial('3b', ...pol), iPowers('3c', ks), iCombo('3d', combo)],
})

const comboItem = (id, tex, value, steps) => cplxResult(id, tex, value, steps)
const complexOps = ({ mul, div, polar, moivre, combo }) => ({
  n: 4, title: 'Números complejos: operaciones',
  statement: 'Expresá cada resultado en la forma que se pide. Los argumentos van en grados, entre $0°$ y $360°$.',
  items: [
    cplxResult('4a', r`(${ct(mul[0])})(${ct(mul[1])})`, cmul(...mul), mulSteps(...mul)),
    cplxResult('4b', r`\dfrac{${ct(div[0])}}{${ct(div[1])}}`, cdiv(...div), divSteps(...div)),
    cplxPolarOps('4c', polar[0], polar[1], polar[2]),
    cplxMoivre('4d', moivre.tex, moivre.a, moivre.b, moivre.n),
    comboItem('4e', combo.tex, combo.value, combo.steps),
  ],
})

const propsEx = ([F, G, exprs, rational, , rootTex, rootAns, rootSteps, side]) => ({
  n: 5, title: 'Límites: propiedades y límites laterales',
  statement: 'Si el límite es infinito, escribí +∞ o −∞ con las teclas; si no existe, escribí «no existe».',
  items: [
    limProps('5a', F, G, exprs),
    limRational('5b', rational[0], rational[1], rational[2]),
    limFree('5c', rootTex, rootAns, rootSteps),
    limLateral('5d', ...side),
  ],
})

// Ejercicio 6: lectura de gráficos
const piece = (f, test) => ({ f: (x) => (test(x) ? f(x) : NaN) })
const graphEx = (spec) => ({ n: 6, title: 'Límites a partir de un gráfico', statement: 'Leé los valores en el gráfico. Un círculo vacío indica que ese punto no pertenece a la gráfica.', items: [limGraph('6a', spec)] })

const G1 = { // salto en x = 2, con f(2) aislado
  window: [-4, 6, -1, 7], alt: 'Gráfico con un salto en x = 2',
  curves: [piece((x) => x / 2 + 2, (x) => x < 2), piece((x) => (x + 6) / 2, (x) => x > 2)],
  dots: [{ x: 2, y: 3, open: true }, { x: 2, y: 4, open: true }, { x: 2, y: 1 }],
  questions: [
    { tex: r`\lim_{x \to 2^{-}} f(x)`, answer: '3', why: 'por la izquierda la curva se acerca a la altura 3 (círculo vacío).' },
    { tex: r`\lim_{x \to 2^{+}} f(x)`, answer: '4', why: 'por la derecha la curva se acerca a la altura 4 (círculo vacío).' },
    { tex: r`\lim_{x \to 2} f(x)`, answer: 'dne', why: 'los límites laterales son distintos, así que el límite no existe.' },
    { tex: r`f(2)`, answer: '1', why: 'el único punto de la gráfica con $x = 2$ es el círculo lleno, de altura 1.' },
  ],
}
const G2 = { // discontinuidad evitable en x = 1
  window: [-3, 4, -3, 6], alt: 'Recta con un agujero en x = 1',
  curves: [{ f: (x) => x + 1 }], dots: [{ x: 1, y: 2, open: true }, { x: 1, y: 4 }],
  questions: [
    { tex: r`\lim_{x \to 1^{-}} f(x)`, answer: '2', why: 'por la izquierda la recta se acerca a la altura 2.' },
    { tex: r`\lim_{x \to 1^{+}} f(x)`, answer: '2', why: 'por la derecha también se acerca a la altura 2.' },
    { tex: r`\lim_{x \to 1} f(x)`, answer: '2', why: 'los límites laterales coinciden: el límite existe, aunque $f(1)$ valga otra cosa.' },
    { tex: r`f(1)`, answer: '4', why: 'el punto lleno está a altura 4.' },
  ],
}
const G3 = { // salto con f(a) igual al límite por la derecha
  window: [-5, 3, -1, 8], alt: 'Gráfico con un salto en x = −1',
  curves: [piece((x) => x + 4, (x) => x < -1), piece((x) => x * x, (x) => x >= -1)],
  dots: [{ x: -1, y: 3, open: true }, { x: -1, y: 1 }],
  questions: [
    { tex: r`\lim_{x \to -1^{-}} f(x)`, answer: '3', why: 'por la izquierda la curva se acerca a la altura 3.' },
    { tex: r`\lim_{x \to -1^{+}} f(x)`, answer: '1', why: 'por la derecha se acerca a la altura 1.' },
    { tex: r`\lim_{x \to -1} f(x)`, answer: 'dne', why: 'los límites laterales son distintos.' },
    { tex: r`f(-1)`, answer: '1', why: 'el círculo lleno está a altura 1.' },
  ],
}

const c1Modelo = [
  vectors([[3, 4], [-2, 1], [op('u + v', r`\vec{u} + \vec{v}`, 1, 1), op('2u − 3v', r`2\vec{u} - 3\vec{v}`, 2, -3)], [3, 4]]),
  line([[2, -1], [3, 2], [1, 2], [4, -2], [1, 3, 0], 2]),
  complexForms([[3, 4], [4, 60], [27, 102, 135], [{ c: 1, k: 15 }, { c: 2, k: 22 }, { c: -1, k: 8 }]]),
  complexOps({
    mul: [C(2, 3), C(1, -4)], div: [C(5, 5), C(1, -2)], polar: [[6, 50], [2, 20], 3],
    moivre: { tex: '(1 + i)', a: 1, b: 1, n: 8 },
    combo: {
      tex: r`(3 - 2i)(1 + i) - (2 + i)^2`, value: csub(cmul(C(3, -2), C(1, 1)), cpow(C(2, 1), 2)),
      steps: [r`$(3 - 2i)(1 + i) = 3 + 3i - 2i - 2i^2 = 5 + i$.`, r`$(2 + i)^2 = 4 + 4i + i^2 = 3 + 4i$.`, r`$(5 + i) - (3 + 4i) = 2 - 3i$.`],
    },
  }),
  propsEx([4, -3, [
    { tex: r`[2f(x) - g(x)]`, calc: (F, G) => qsub(qmul(2, F), G), why: (F, G) => r`2 \cdot ${F} - (${G})` },
    { tex: r`[f(x) \cdot g(x)]`, calc: qmul, why: (F, G) => r`${F} \cdot (${G})` },
    { tex: r`\dfrac{f(x)}{g(x)}`, calc: qdiv, why: (F, G) => r`\dfrac{${F}}{${G}}` },
  ], [[1, -5, 3], [1, 1], 2], 0,
  r`\lim_{x \to 4} \sqrt{2x + 1}`, '3', [r`El límite de una raíz es la raíz del límite: $\sqrt{\lim_{x \to 4} (2x + 1)} = \sqrt{9}$.`, r`$= 3$.`],
  [2, [1, 1], [7, -1]]]),
  graphEx(G1),
]
const c1Ex1 = [
  vectors([[-5, 12], [1, 2], [op('u + v', r`\vec{u} + \vec{v}`, 1, 1), op('3u − 2v', r`3\vec{u} - 2\vec{v}`, 3, -2)], [-5, 12]]),
  line([[-1, 3], [2, -1], [0, -3], [2, 1], [2, 0, 3], 1]),
  complexForms([[-6, 8], [6, 30], [13, 58, 211], [{ c: 1, k: 11 }, { c: -3, k: 6 }, { c: 1, k: 20 }]]),
  complexOps({
    mul: [C(3, -2), C(2, 5)], div: [C(7, 1), C(1, -1)], polar: [[8, 100], [2, 70], 4],
    moivre: { tex: '(1 - i)', a: 1, b: -1, n: 6 },
    combo: {
      tex: r`(2 - i)(1 + 3i) + (1 - 2i)^2`, value: cadd(cmul(C(2, -1), C(1, 3)), cpow(C(1, -2), 2)),
      steps: [r`$(2 - i)(1 + 3i) = 2 + 6i - i - 3i^2 = 5 + 5i$.`, r`$(1 - 2i)^2 = 1 - 4i + 4i^2 = -3 - 4i$.`, r`$(5 + 5i) + (-3 - 4i) = 2 + i$.`],
    },
  }),
  propsEx([-2, 5, [
    { tex: r`[3f(x) + g(x)]`, calc: (F, G) => qadd(qmul(3, F), G), why: (F, G) => r`3 \cdot (${F}) + ${G}` },
    { tex: r`[f(x) \cdot g(x)]`, calc: qmul, why: (F, G) => r`(${F}) \cdot ${G}` },
    { tex: r`\dfrac{g(x)}{f(x)}`, calc: (F, G) => qdiv(G, F), why: (F, G) => r`\dfrac{${G}}{${F}}` },
  ], [[-2, 3, 1], [-1, 2], -1], 0,
  r`\lim_{x \to 2} \sqrt{x^3 + 1}`, '3', [r`El límite de una raíz es la raíz del límite: $\sqrt{2^3 + 1} = \sqrt{9}$.`, r`$= 3$.`],
  [1, [0, 2], [3, -1]]]),
  graphEx(G2),
]
const c1Ex2 = [
  vectors([[8, -6], [3, 4], [op('u − v', r`\vec{u} - \vec{v}`, 1, -1), op('2u + v', r`2\vec{u} + \vec{v}`, 2, 1)], [8, -6]]),
  line([[3, 1], [-2, 3], [-2, 1], [1, 3], [3, 2, 1], 0]),
  complexForms([[-5, -12], [10, 120], [35, 90, 247], [{ c: 2, k: 7 }, { c: 1, k: 14 }, { c: -1, k: 9 }]]),
  complexOps({
    mul: [C(-1, 4), C(3, 1)], div: [C(8, 1), C(2, -1)], polar: [[9, 200], [3, 80], 3],
    moivre: { tex: '(-1 - i)', a: -1, b: -1, n: 4 },
    combo: {
      tex: r`(1 + 2i)(3 - i) - (2 - 3i)^2`, value: csub(cmul(C(1, 2), C(3, -1)), cpow(C(2, -3), 2)),
      steps: [r`$(1 + 2i)(3 - i) = 3 - i + 6i - 2i^2 = 5 + 5i$.`, r`$(2 - 3i)^2 = 4 - 12i + 9i^2 = -5 - 12i$.`, r`$(5 + 5i) - (-5 - 12i) = 10 + 17i$.`],
    },
  }),
  propsEx([6, -2, [
    { tex: r`[f(x) - 4g(x)]`, calc: (F, G) => qsub(F, qmul(4, G)), why: (F, G) => r`${F} - 4 \cdot (${G})` },
    { tex: r`[f(x)]^2 \cdot g(x)`, calc: (F, G) => qmul(qmul(F, F), G), why: (F, G) => r`${F}^2 \cdot (${G})` },
    { tex: r`\dfrac{f(x)}{g(x)}`, calc: qdiv, why: (F, G) => r`\dfrac{${F}}{${G}}` },
  ], [[1, 3, 2], [-1, 1], -1], 0,
  r`\lim_{x \to 5} \sqrt{x^2 - 9}`, '4', [r`El límite de una raíz es la raíz del límite: $\sqrt{5^2 - 9} = \sqrt{16}$.`, r`$= 4$.`],
  [-1, [-1, 0, 1], [2, 1]]]),
  graphEx(G3),
]

// =====================================================================
// 2.º cuatrimestre
// =====================================================================
const INF_HINT = 'Si el límite es infinito, escribí +∞ o −∞ con las teclas; si no existe, escribí «no existe».'
const infinite = ([a, b, c, d]) => ({
  n: 1, title: 'Límites infinitos y en el infinito', statement: INF_HINT,
  items: [limRational('1a', ...a), limRational('1b', ...b), limInfinity('1c', ...c), limInfinity('1d', ...d)],
})
const radicalLimit = (id, tex, a, answer, steps) => limFree(id, tex, answer, steps)
const indeterminate = ([a, b, rad]) => ({
  n: 2, title: 'Indeterminación 0/0', statement: 'Al reemplazar aparece $\\frac{0}{0}$. Factorizá o racionalizá para salvar la indeterminación.',
  items: [limRational('2a', ...a), limRational('2b', ...b), radicalLimit('2c', ...rad)],
})

const cont = ([a, b, k]) => ({
  n: 3, title: 'Continuidad', statement: 'Una función es continua en $x = a$ si existe $f(a)$, existe el límite en $a$ y los dos valores coinciden.',
  items: [contItem('3a', ...a), contItem('3b', ...b), contK('3c', ...k)],
})
const cases = (rows) => r`f(x) = \begin{cases} ${rows.map(([e, c]) => `${e} & \\text{si } ${c}`).join(' \\\\ ')} \end{cases}`
const three = (a, f, fa, lim_) => [
  `Condición 1: $f(${a}) = ${fa}$ ${fa === 'no existe' ? '(la función no está definida en ese punto)' : ''}.`,
  `Condición 2: el límite en $x = ${a}$ es ${lim_}.`,
]

const asym = ([a, b]) => ({
  n: 4, title: 'Asíntotas', statement: 'Una asíntota vertical aparece donde el denominador se anula y el numerador no. Para la horizontal se estudia el límite en el infinito.',
  items: [asymRational('4a', ...a), asymOblique('4b', ...b)],
})

const derivatives = ({ a, b, c, d, e, tg }) => ({
  n: 5, title: 'Derivadas',
  statement: 'Derivá cada función. No hace falta simplificar. Para escribir raíces, potencias y funciones usá los botones de abajo de cada casillero. Después mirá «Se lee así» para controlar que sea tu respuesta.',
  items: [
    derivItem('5a', ...a), derivItem('5b', ...b), derivItem('5c', ...c), withPoints(derivItem('5d', ...d), SMALL), derivItem('5e', ...e), tangentItem('5f', ...tg),
  ],
})

const analysis = ([coef, pos, win]) => ({
  n: 6, title: 'Análisis de una función',
  statement: 'Estudiá la función con las derivadas: puntos críticos, crecimiento, extremos, concavidad y punto de inflexión. Después elegí su gráfico.',
  items: cubicStudy('6', coef, pos, win),
})

const integrals = ({ a, b, c, d, e, f }) => ({
  n: 8, title: 'Integrales',
  statement: 'Hallá una primitiva de cada función (no hace falta escribir +C). En las definidas, usá la regla de Barrow: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.',
  items: [integralItem('8a', ...a), integralItem('8b', ...b), withPoints(integralItem('8c', ...c), SMALL), withPoints(integralItem('8d', ...d), SMALL),
    definiteItem('8e', ...e), withPoints(definiteItem('8f', ...f), SMALL)],
})

// Gráficos de límites infinitos
const GI1 = { // x = 2 asíntota vertical y y = 1 horizontal
  window: [-4, 8, -4, 6], alt: 'Gráfico con asíntotas x = 2 e y = 1',
  curves: [piece((x) => 1 / (x - 2) + 1, (x) => x < 2), piece((x) => 1 / (x - 2) + 1, (x) => x > 2)], asymptotes: [{ x: 2 }, { y: 1 }],
  questions: [
    { tex: r`\lim_{x \to 2^{-}} f(x)`, answer: '-inf', why: 'por la izquierda la curva baja sin límite.' },
    { tex: r`\lim_{x \to 2^{+}} f(x)`, answer: 'inf', why: 'por la derecha la curva sube sin límite.' },
    { tex: r`\lim_{x \to +\infty} f(x)`, answer: '1', why: 'a la derecha la curva se acerca a la asíntota horizontal $y = 1$.' },
  ],
}
const GI2 = { // −1/(x+1)² : x = −1, y = 0
  window: [-6, 4, -6, 2], alt: 'Gráfico con asíntota x = −1',
  curves: [piece((x) => -1 / (x + 1) ** 2, (x) => x < -1), piece((x) => -1 / (x + 1) ** 2, (x) => x > -1)], asymptotes: [{ x: -1 }],
  questions: [
    { tex: r`\lim_{x \to -1^{-}} f(x)`, answer: '-inf', why: 'por la izquierda la curva baja sin límite.' },
    { tex: r`\lim_{x \to -1^{+}} f(x)`, answer: '-inf', why: 'por la derecha también baja sin límite.' },
    { tex: r`\lim_{x \to -1} f(x)`, answer: '-inf', why: 'los dos límites laterales son iguales, el límite es $-\\infty$.' },
    { tex: r`\lim_{x \to +\infty} f(x)`, answer: '0', why: 'la curva se acerca al eje $x$ por abajo.' },
  ],
}
const GI3 = { // 2/(x-1) − 1 : x = 1, y = −1
  window: [-5, 7, -6, 4], alt: 'Gráfico con asíntotas x = 1 e y = −1',
  curves: [piece((x) => 2 / (x - 1) - 1, (x) => x < 1), piece((x) => 2 / (x - 1) - 1, (x) => x > 1)], asymptotes: [{ x: 1 }, { y: -1 }],
  questions: [
    { tex: r`\lim_{x \to 1^{-}} f(x)`, answer: '-inf', why: 'por la izquierda la curva baja sin límite.' },
    { tex: r`\lim_{x \to 1^{+}} f(x)`, answer: 'inf', why: 'por la derecha la curva sube sin límite.' },
    { tex: r`\lim_{x \to -\infty} f(x)`, answer: '-1', why: 'a la izquierda la curva se acerca a $y = -1$.' },
  ],
}
const graphLimits = (spec) => ({ n: 9, title: 'Límites infinitos en un gráfico', statement: 'Las líneas punteadas son asíntotas. ' + INF_HINT, items: [limGraph('9a', spec)] })

const c2Modelo = [
  infinite([[[3], [4, -4, 1], 2], [[2], [-3, 1], 3], [[1, -1, 3], [5, 0, 2], 1], [[1, 0, 0, 1], [2, 0, 1], -1]]),
  indeterminate([[[-4, 0, 1], [-2, 1], 2], [[-3, -2, 1], [-9, 0, 1], 3],
    [r`\lim_{x \to 4} \dfrac{\sqrt{x} - 2}{x - 4}`, 4, '1/4', [r`Queda $\frac{0}{0}$. Multiplico por el conjugado, $\sqrt{x} + 2$: $(\sqrt{x} - 2)(\sqrt{x} + 2) = x - 4$.`, r`$\dfrac{x - 4}{(x - 4)(\sqrt{x} + 2)} = \dfrac{1}{\sqrt{x} + 2}$.`, r`Reemplazo $x = 4$: $\dfrac{1}{2 + 2} = \dfrac{1}{4}$.`]]]),
  cont([
    [r`${cases([['\\dfrac{x^2 - 4}{x - 2}', 'x \\neq 2'], ['3', 'x = 2']])}`, 2, '3', '4', 1, [...three(2, 0, '3', '4'), r`Simplifico: $\dfrac{x^2 - 4}{x - 2} = x + 2$, que tiende a $4$. Como $3 \neq 4$, la función no es continua: se podría "reparar" definiendo $f(2) = 4$.`, 'Es una discontinuidad evitable.']],
    [cases([['x + 2', 'x < 1'], ['5 - x', 'x \\geq 1']]), 1, '4', 'dne', 2, [...three(1, 0, '4', 'no existe'), r`Por la izquierda: $1 + 2 = 3$. Por la derecha: $5 - 1 = 4$. Son distintos.`, 'Es una discontinuidad de salto finito.']],
    [cases([['\\dfrac{x^2 - x - 6}{x - 3}', 'x \\neq 3'], ['k', 'x = 3']]), 3, '5', [r`$\dfrac{x^2 - x - 6}{x - 3} = \dfrac{(x - 3)(x + 2)}{x - 3} = x + 2$, que tiende a $5$ cuando $x \to 3$.`, r`Para que sea continua tiene que ser $f(3) = k = 5$.`]],
  ]),
  asym([[[-3, 0, 2], [3, -2]], [[1, 0, 1], 1]]),
  derivatives({
    a: [r`4x^3 - 5x^2 + 3x - 7`, '12*x^2-10*x+3', [r`Se deriva cada término con $(x^n)' = n x^{n-1}$ y la derivada de una constante es 0.`, r`$f'(x) = 12x^2 - 10x + 3$.`]],
    b: [r`3\,\mathrm{sen}\,x - 2\ln x + 5e^{x}`, '3*cos(x)-2/x+5*e^x', [r`$(\mathrm{sen}\,x)' = \cos x$, $(\ln x)' = \frac{1}{x}$ y $(e^x)' = e^x$.`, r`$f'(x) = 3\cos x - \dfrac{2}{x} + 5e^{x}$.`]],
    c: [r`(3x^2 - 1)^4`, '4*(3*x^2-1)^3*6*x', [r`Regla de la cadena: $[g(x)^n]' = n \cdot g(x)^{n-1} \cdot g'(x)$ con $g(x) = 3x^2 - 1$.`, r`$f'(x) = 4(3x^2 - 1)^3 \cdot 6x = 24x(3x^2 - 1)^3$.`], '24x(3x²−1)³'],
    d: [r`e^{2x+1}`, '2*e^(2*x+1)', [r`La derivada de $e^{u}$ es $e^{u} \cdot u'$, con $u = 2x + 1$ y $u' = 2$.`, r`$f'(x) = 2e^{2x+1}$.`]],
    e: [r`\mathrm{sen}(x^2)`, '2*x*cos(x^2)', [r`La derivada de $\mathrm{sen}(u)$ es $\cos(u) \cdot u'$, con $u = x^2$ y $u' = 2x$.`, r`$f'(x) = 2x\cos(x^2)$.`]],
    tg: [[1, -2, 0, 1], 1],
  }),
  analysis([[5, -9, -3, 1], 1, [-3, 5, -24, 12]]),
  optimization(7, 'perimetro', 80),
  integrals({
    a: [r`(6x^2 - 4x + 5)`, '2*x^3-2*x^2+5*x', [r`Se integra cada término con $\int x^n dx = \frac{x^{n+1}}{n+1}$.`, r`$F(x) = 2x^3 - 2x^2 + 5x + C$.`]],
    b: [r`(3\cos x + 2e^{x} - \tfrac{1}{x})`, '3*sin(x)+2*e^x-ln(x)', [r`$\int \cos x\,dx = \mathrm{sen}\,x$, $\int e^x dx = e^x$ y $\int \frac{1}{x}dx = \ln|x|$.`, r`$F(x) = 3\,\mathrm{sen}\,x + 2e^x - \ln|x| + C$.`]],
    c: [r`2x(x^2 + 1)^3`, '(x^2+1)^4/4', [r`Sustitución: $u = x^2 + 1$, entonces $du = 2x\,dx$.`, r`$\int u^3 du = \dfrac{u^4}{4}$. Vuelvo a $x$: $F(x) = \dfrac{(x^2 + 1)^4}{4} + C$.`]],
    d: [r`x\,e^{x^2}`, 'e^(x^2)/2', [r`Sustitución: $u = x^2$, entonces $du = 2x\,dx$ y $x\,dx = \frac{du}{2}$.`, r`$\int e^{u}\,\frac{du}{2} = \frac{e^u}{2}$. $F(x) = \dfrac{e^{x^2}}{2} + C$.`]],
    e: ['0', '2', '(3x^2 + 1)', 'x^3+x', 'x³ + x', 10, [r`Una primitiva es $F(x) = x^3 + x$.`, r`Barrow: $F(2) - F(0) = (8 + 2) - 0 = 10$.`]],
    f: ['0', '1', 'e^{x}', 'e^x', 'eˣ', Math.E - 1, [r`Una primitiva es $F(x) = e^x$.`, r`Barrow: $F(1) - F(0) = e - 1 \approx 1{,}72$.`]],
  }),
  graphLimits(GI1),
]

const c2Ex1 = [
  infinite([[[-2], [1, 2, 1], -1], [[1, 1], [-2, 1], 2, -1], [[3, 0, 4], [0, -1, 1], 1], [[1, 2], [-3, 0, 1], 1]]),
  indeterminate([[[6, -5, 1], [-2, 1], 2], [[-1, 0, 1], [-4, 3, 1], 1],
    [r`\lim_{x \to 9} \dfrac{\sqrt{x + 7} - 4}{x - 9}`, 9, '1/8', [r`Queda $\frac{0}{0}$. Multiplico por el conjugado, $\sqrt{x + 7} + 4$: $(\sqrt{x + 7} - 4)(\sqrt{x + 7} + 4) = x + 7 - 16 = x - 9$.`, r`$\dfrac{x - 9}{(x - 9)(\sqrt{x + 7} + 4)} = \dfrac{1}{\sqrt{x + 7} + 4}$.`, r`Reemplazo $x = 9$: $\dfrac{1}{4 + 4} = \dfrac{1}{8}$.`]]]),
  cont([
    [cases([['x^2 - 1', 'x < 2'], ['2x - 1', 'x \\geq 2']]), 2, '3', '3', 0, [...three(2, 0, '3', '3'), r`Por la izquierda: $2^2 - 1 = 3$. Por la derecha: $2 \cdot 2 - 1 = 3$. Los límites laterales coinciden: el límite es 3.`, 'Condición 3: $f(2) = 3$ es igual al límite, entonces la función es continua en $x = 2$.']],
    [r`f(x) = \dfrac{3}{x - 1}`, 1, 'dne', 'dne', 3, [...three(1, 0, 'no existe', 'no existe'), r`Al acercarse a $1$ el denominador tiende a $0$: por la izquierda la función tiende a $-\infty$ y por la derecha a $+\infty$.`, 'Es una discontinuidad infinita (hay una asíntota vertical).']],
    [cases([['\\dfrac{x^2 - 9}{x - 3}', 'x \\neq 3'], ['k', 'x = 3']]), 3, '6', [r`$\dfrac{x^2 - 9}{x - 3} = x + 3$, que tiende a $6$ cuando $x \to 3$.`, r`Para que sea continua tiene que ser $f(3) = k = 6$.`]],
  ]),
  asym([[[0, 1, 3], [2, -2]], [[3, -1, 2], 1]]),
  derivatives({
    a: [r`5x^4 - 2x^3 + 6x - 1`, '20*x^3-6*x^2+6', [r`Se deriva cada término con $(x^n)' = n x^{n-1}$.`, r`$f'(x) = 20x^3 - 6x^2 + 6$.`]],
    b: [r`4\cos x + 3\ln x - e^{x}`, '-4*sin(x)+3/x-e^x', [r`$(\cos x)' = -\mathrm{sen}\,x$, $(\ln x)' = \frac{1}{x}$ y $(e^x)' = e^x$.`, r`$f'(x) = -4\,\mathrm{sen}\,x + \dfrac{3}{x} - e^{x}$.`]],
    c: [r`(2x^3 + 5)^3`, '3*(2*x^3+5)^2*6*x^2', [r`Regla de la cadena con $g(x) = 2x^3 + 5$ y $g'(x) = 6x^2$.`, r`$f'(x) = 3(2x^3 + 5)^2 \cdot 6x^2 = 18x^2(2x^3 + 5)^2$.`], '18x²(2x³+5)²'],
    d: [r`e^{x^2 - 3x}`, '(2*x-3)*e^(x^2-3*x)', [r`La derivada de $e^{u}$ es $e^{u} \cdot u'$, con $u = x^2 - 3x$ y $u' = 2x - 3$.`, r`$f'(x) = (2x - 3)\,e^{x^2 - 3x}$.`]],
    e: [r`\ln(3x^2 + 1)`, '6*x/(3*x^2+1)', [r`La derivada de $\ln(u)$ es $\dfrac{u'}{u}$, con $u = 3x^2 + 1$ y $u' = 6x$.`, r`$f'(x) = \dfrac{6x}{3x^2 + 1}$.`]],
    tg: [[1, -3, 2], 2],
  }),
  analysis([[1, 9, -6, 1], 2, [-1, 5, -16, 22]]),
  optimization(7, 'rio', 120),
  integrals({
    a: [r`(4x^3 - 9x^2 + 2)`, 'x^4-3*x^3+2*x', [r`Se integra cada término con $\int x^n dx = \frac{x^{n+1}}{n+1}$.`, r`$F(x) = x^4 - 3x^3 + 2x + C$.`]],
    b: [r`(5\,\mathrm{sen}\,x - \tfrac{3}{x} + e^{x})`, '-5*cos(x)-3*ln(x)+e^x', [r`$\int \mathrm{sen}\,x\,dx = -\cos x$, $\int \frac{1}{x}dx = \ln|x|$ y $\int e^x dx = e^x$.`, r`$F(x) = -5\cos x - 3\ln|x| + e^x + C$.`]],
    c: [r`3x^2(x^3 - 2)^4`, '(x^3-2)^5/5', [r`Sustitución: $u = x^3 - 2$, entonces $du = 3x^2\,dx$.`, r`$\int u^4 du = \dfrac{u^5}{5}$. $F(x) = \dfrac{(x^3 - 2)^5}{5} + C$.`]],
    d: [r`\cos(2x + 1)`, 'sin(2*x+1)/2', [r`Sustitución: $u = 2x + 1$, entonces $du = 2\,dx$ y $dx = \frac{du}{2}$.`, r`$\int \cos u\,\frac{du}{2} = \frac{\mathrm{sen}\,u}{2}$. $F(x) = \dfrac{\mathrm{sen}(2x + 1)}{2} + C$.`]],
    e: ['1', '3', '(2x - 1)', 'x^2-x', 'x² − x', 6, [r`Una primitiva es $F(x) = x^2 - x$.`, r`Barrow: $F(3) - F(1) = (9 - 3) - (1 - 1) = 6$.`]],
    f: ['0', r`\tfrac{\pi}{2}`, r`\cos x`, 'sin(x)', 'sen x', 1, [r`Una primitiva es $F(x) = \mathrm{sen}\,x$.`, r`Barrow: $F\!\left(\frac{\pi}{2}\right) - F(0) = 1 - 0 = 1$.`]],
  }),
  graphLimits(GI2),
]
const c2Ex2 = [
  infinite([[[5], [0, 0, 1], 0], [[1], [2, 1], -2], [[0, -2, 5], [1, 0, 3], 1], [[0, -1, 0, 0, 1], [1, 0, 1], -1]]),
  indeterminate([[[-6, 1, 1], [-2, 1], 2], [[-2, -1, 1], [-4, 0, 1], 2],
    [r`\lim_{x \to 4} \dfrac{\sqrt{2x + 1} - 3}{x - 4}`, 4, '1/3', [r`Queda $\frac{0}{0}$. Multiplico por el conjugado, $\sqrt{2x + 1} + 3$: $(\sqrt{2x + 1} - 3)(\sqrt{2x + 1} + 3) = 2x + 1 - 9 = 2(x - 4)$.`, r`$\dfrac{2(x - 4)}{(x - 4)(\sqrt{2x + 1} + 3)} = \dfrac{2}{\sqrt{2x + 1} + 3}$.`, r`Reemplazo $x = 4$: $\dfrac{2}{3 + 3} = \dfrac{1}{3}$.`]]]),
  cont([
    [r`f(x) = \dfrac{x^2 - 1}{x + 1}`, -1, 'dne', '-2', 1, [...three(-1, 0, 'no existe', '-2'), r`$\dfrac{x^2 - 1}{x + 1} = \dfrac{(x - 1)(x + 1)}{x + 1} = x - 1$, que tiende a $-2$.`, 'El límite existe pero $f(-1)$ no está definida: es una discontinuidad evitable.']],
    [cases([['x^2 - 1', 'x < 0'], ['2x + 3', 'x \\geq 0']]), 0, '3', 'dne', 2, [...three(0, 0, '3', 'no existe'), r`Por la izquierda: $0^2 - 1 = -1$. Por la derecha: $2 \cdot 0 + 3 = 3$. Son distintos.`, 'Es una discontinuidad de salto finito.']],
    [cases([['\\dfrac{x^2 - 5x + 6}{x - 2}', 'x \\neq 2'], ['k', 'x = 2']]), 2, '-1', [r`$\dfrac{x^2 - 5x + 6}{x - 2} = \dfrac{(x - 2)(x - 3)}{x - 2} = x - 3$, que tiende a $-1$ cuando $x \to 2$.`, r`Para que sea continua tiene que ser $f(2) = k = -1$.`]],
  ]),
  asym([[[-1, 0, 1], [2, -1]], [[4, -1, 1], -1]]),
  derivatives({
    a: [r`7x^2 - 3\sqrt{x} + 2`, '14*x-3/(2*sqrt(x))', [r`Escribo $\sqrt{x} = x^{1/2}$: su derivada es $\frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$.`, r`$f'(x) = 14x - \dfrac{3}{2\sqrt{x}}$.`]],
    b: [r`5\,\mathrm{sen}\,x - 3\cos x + 2e^{x}`, '5*cos(x)+3*sin(x)+2*e^x', [r`$(\mathrm{sen}\,x)' = \cos x$, $(\cos x)' = -\mathrm{sen}\,x$ y $(e^x)' = e^x$.`, r`$f'(x) = 5\cos x + 3\,\mathrm{sen}\,x + 2e^{x}$.`]],
    c: [r`(x^2 + 4x)^5`, '5*(x^2+4*x)^4*(2*x+4)', [r`Regla de la cadena con $g(x) = x^2 + 4x$ y $g'(x) = 2x + 4$.`, r`$f'(x) = 5(x^2 + 4x)^4 \cdot (2x + 4)$.`]],
    d: [r`e^{-x^2}`, '-2*x*e^(-x^2)', [r`La derivada de $e^{u}$ es $e^{u} \cdot u'$, con $u = -x^2$ y $u' = -2x$.`, r`$f'(x) = -2x\,e^{-x^2}$.`]],
    e: [r`\cos(2x + 1)`, '-2*sin(2*x+1)', [r`La derivada de $\cos(u)$ es $-\mathrm{sen}(u) \cdot u'$, con $u = 2x + 1$ y $u' = 2$.`, r`$f'(x) = -2\,\mathrm{sen}(2x + 1)$.`]],
    tg: [[2, -3, 0, 1], 2],
  }),
  analysis([[-2, 9, 3, -1], 0, [-3, 5, -8, 26]]),
  optimization(7, 'suma', 49),
  integrals({
    a: [r`(8x^3 + 3x^2 - 6x)`, '2*x^4+x^3-3*x^2', [r`Se integra cada término con $\int x^n dx = \frac{x^{n+1}}{n+1}$.`, r`$F(x) = 2x^4 + x^3 - 3x^2 + C$.`]],
    b: [r`(\tfrac{2}{x} + 4\cos x - e^{x})`, '2*ln(x)+4*sin(x)-e^x', [r`$\int \frac{1}{x}dx = \ln|x|$, $\int \cos x\,dx = \mathrm{sen}\,x$ y $\int e^x dx = e^x$.`, r`$F(x) = 2\ln|x| + 4\,\mathrm{sen}\,x - e^x + C$.`]],
    c: [r`(2x + 3)(x^2 + 3x)^2`, '(x^2+3*x)^3/3', [r`Sustitución: $u = x^2 + 3x$, entonces $du = (2x + 3)\,dx$.`, r`$\int u^2 du = \dfrac{u^3}{3}$. $F(x) = \dfrac{(x^2 + 3x)^3}{3} + C$.`]],
    d: [r`\dfrac{x}{x^2 + 4}`, 'ln(x^2+4)/2', [r`Sustitución: $u = x^2 + 4$, entonces $du = 2x\,dx$ y $x\,dx = \frac{du}{2}$.`, r`$\int \frac{1}{u}\cdot\frac{du}{2} = \frac{\ln|u|}{2}$. $F(x) = \dfrac{\ln(x^2 + 4)}{2} + C$.`]],
    e: ['0', '1', '(3x^2 + 2x)', 'x^3+x^2', 'x³ + x²', 2, [r`Una primitiva es $F(x) = x^3 + x^2$.`, r`Barrow: $F(1) - F(0) = (1 + 1) - 0 = 2$.`]],
    f: ['1', 'e', r`\dfrac{1}{x}`, 'ln(x)', 'ln x', 1, [r`Una primitiva es $F(x) = \ln x$.`, r`Barrow: $F(e) - F(1) = \ln e - \ln 1 = 1 - 0 = 1$.`]],
  }),
  graphLimits(GI3),
]

export const SECTION_6A = {
  terms: [
    { id: '1', title: '1.er cuatrimestre', topics: 'Vectores · Recta · Números complejos · Límites y propiedades · Límites laterales', activities: activitySet('6A-c1', 2026, c1Modelo, c1Ex1, c1Ex2) },
    { id: '2', title: '2.º cuatrimestre', topics: 'Límites infinitos · Indeterminaciones · Continuidad · Asíntotas · Derivadas · Análisis de funciones · Optimización · Integrales', activities: activitySet('6A-c2', 2026, c2Modelo, c2Ex1, c2Ex2) },
  ],
}
