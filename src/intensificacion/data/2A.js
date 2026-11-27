// 2.º año, sección A. «Modelo 2026» transcribe las hojas del profesor; en el 2.º cuatrimestre
// el ejercicio 4 (ángulos) se reemplazó por el de estadística.
import { num, item, calc, activitySet } from './builders'
import { exprItem, eqItem, ineqItem, givenLine, twoPointLine, triangleItem, statsExercise2 } from './builders2'

const r = String.raw

// ---------- 1.er cuatrimestre ----------
const integers = (a, b) => ({
  n: 1, title: 'Cálculos combinados con enteros', statement: 'Resolvé los siguientes cálculos combinados con números enteros.',
  items: [calc('1a', ...a), calc('1b', ...b)],
})
const rationals = (a, b) => ({
  n: 2, title: 'Cálculos combinados con racionales',
  statement: 'Resolvé los siguientes cálculos combinados con números racionales. Podés escribir el resultado como fracción (por ejemplo, 7/6).',
  items: [calc('2a', ...a), calc('2b', ...b)],
})
const sums = (a, b) => ({
  n: 3, title: 'Sumas algebraicas',
  items: [
    item('3a', `Hallá el valor de $m$: $${a[0]}$`, [num(a[1], { label: 'm =', aria: 'm =' })], a[2]),
    calc('3b', ...b),
  ],
})
const polys = (a, b) => ({
  n: 4, title: 'Expresiones algebraicas',
  statement: 'Resolvé las operaciones y hallá la expresión reducida. Para escribir potencias usá el botón ^.',
  items: [exprItem('4a', ...a), exprItem('4b', ...b)],
})
const science = (statement, big, bigSteps, [coef, exp], sciSteps, bigQuestion, sciQuestion) => ({
  n: 5, title: 'Notación científica', statement,
  items: [
    item('5a', bigQuestion, [num(big, { label: 'Número completo', aria: 'Número:' })], bigSteps),
    item('5b', sciQuestion, [
      num(coef, { label: 'Número que multiplica a la potencia de 10', aria: 'Coeficiente:' }),
      num(exp, { label: 'Exponente del 10', aria: 'Exponente:' }),
    ], sciSteps),
  ],
})

const c1Modelo = [
  integers(
    [r`\sqrt{8} \cdot \sqrt{32} + (-2^2 - 8^0) \cdot 3 + (5 - 3^2)^3 - 15`, -78, [
      r`$\sqrt{8} \cdot \sqrt{32} = \sqrt{256} = 16$.`, r`$(-2^2 - 8^0) \cdot 3 = (-4 - 1) \cdot 3 = -15$. Atención: $-2^2 = -4$.`,
      r`$(5 - 9)^3 = (-4)^3 = -64$.`, r`$16 - 15 - 64 - 15 = -78$.`]],
    [r`\sqrt{17 \cdot (+2)^5 - (-2)^5} - \left(-6^3 + (-6)^0\right) : (-5) + (-7)^2`, 30, [
      r`Raíz: $17 \cdot 32 - (-32) = 544 + 32 = 576$ y $\sqrt{576} = 24$.`,
      r`$-6^3 + (-6)^0 = -216 + 1 = -215$ y $-215 : (-5) = 43$.`, r`$(-7)^2 = 49$.`, r`$24 - 43 + 49 = 30$.`]],
  ),
  rationals(
    [r`5^{-1} + \sqrt{\left(0{,}5 + \frac{1}{3}\right) : 7{,}5 + 3^{-1}} - 0{,}6`, '4/15', [
      r`$0{,}5 + \frac{1}{3} = \frac{5}{6}$ y $\frac{5}{6} : \frac{15}{2} = \frac{1}{9}$.`,
      r`$\sqrt{\frac{1}{9} + \frac{1}{3}} = \sqrt{\frac{4}{9}} = \frac{2}{3}$.`, r`$\frac{1}{5} + \frac{2}{3} - \frac{3}{5} = \frac{4}{15}$.`]],
    [r`\sqrt{\frac{1}{3} \cdot (1 + 3^{-1})} - (1 + 0{,}5)^{-3} - 3^{-3}`, '1/3', [
      r`$\sqrt{\frac{1}{3} \cdot \frac{4}{3}} = \sqrt{\frac{4}{9}} = \frac{2}{3}$.`,
      r`$\left(\frac{3}{2}\right)^{-3} = \left(\frac{2}{3}\right)^3 = \frac{8}{27}$ y $3^{-3} = \frac{1}{27}$.`,
      r`$\frac{2}{3} - \frac{8}{27} - \frac{1}{27} = \frac{1}{3}$.`]],
  ),
  sums(
    [r`5 - (8 + 3) - (2 + m - 9) = -4`, 5, [r`$5 - 11 - (m - 7) = -4$.`, r`$-6 - m + 7 = -4$, es decir, $1 - m = -4$.`, r`$m = 5$.`]],
    [r`5 - 10 + 8 - 9 + 6 - 5 + 7 - 4`, -2, [r`Positivos: $5 + 8 + 6 + 7 = 26$. Negativos: $10 + 9 + 5 + 4 = 28$.`, r`$26 - 28 = -2$.`]],
  ),
  polys(
    [r`(x^2 - 3x) \cdot (x - 2)`, 'x^3-5x^2+6x', [r`Distributiva: $x^3 - 2x^2 - 3x^2 + 6x$.`, r`Reduzco: $x^3 - 5x^2 + 6x$.`]],
    [r`(4x^2 + 3x - 5) \cdot (x^2 + x)`, '4x^4+7x^3-2x^2-5x', [
      r`Distributiva: $4x^4 + 4x^3 + 3x^3 + 3x^2 - 5x^2 - 5x$.`, r`Reduzco: $4x^4 + 7x^3 - 2x^2 - 5x$.`]],
  ),
  science(r`El Sol es una estrella que se formó hace $4{,}6 \cdot 10^9$ años y se encuentra a ciento cincuenta millones de kilómetros de la Tierra.`,
    4600000000, [r`$4{,}6 \cdot 10^9 = 4{,}6 \cdot 1.000.000.000 = 4.600.000.000$ años.`],
    ['1,5', 8], [r`Ciento cincuenta millones es $150.000.000$ km.`, r`$150.000.000 = 1{,}5 \cdot 10^8$ km.`],
    '¿Podés escribir la edad del Sol (en años) como número completo?', 'Expresá en notación científica la distancia entre el Sol y la Tierra (en km).'),
]

const c1Ex1 = [
  integers(
    [r`\sqrt{2} \cdot \sqrt{50} + (-3^2 - 5^0) \cdot 2 + (4 - 6)^3 - 9`, -27, [
      r`$\sqrt{100} = 10$.`, r`$(-9 - 1) \cdot 2 = -20$.`, r`$(-2)^3 = -8$.`, r`$10 - 20 - 8 - 9 = -27$.`]],
    [r`\sqrt{31 \cdot (+2)^3 - (-2)^3} - \left(-4^3 + (-4)^0\right) : (-7) + (-5)^2`, 32, [
      r`$\sqrt{248 + 8} = \sqrt{256} = 16$.`, r`$(-64 + 1) : (-7) = 9$.`, r`$16 - 9 + 25 = 32$.`]],
  ),
  rationals(
    [r`4^{-1} + \sqrt{\left(0{,}5 + \frac{1}{6}\right) : 1{,}5} + 2^{-1} - 0{,}75`, '2/3', [
      r`$\left(\frac{1}{2} + \frac{1}{6}\right) : \frac{3}{2} = \frac{4}{9}$ y su raíz es $\frac{2}{3}$.`,
      r`$\frac{1}{4} + \frac{2}{3} + \frac{1}{2} - \frac{3}{4} = \frac{2}{3}$.`]],
    [r`\sqrt{\frac{1}{2} \cdot (1 + 8^{-1})} - (1 + 0{,}25)^{-2} - 5^{-2}`, '7/100', [
      r`$\sqrt{\frac{1}{2} \cdot \frac{9}{8}} = \sqrt{\frac{9}{16}} = \frac{3}{4}$.`,
      r`$\left(\frac{5}{4}\right)^{-2} = \frac{16}{25}$ y $5^{-2} = \frac{1}{25}$.`, r`$\frac{3}{4} - \frac{16}{25} - \frac{1}{25} = \frac{7}{100}$.`]],
  ),
  sums(
    [r`7 - (4 + 9) - (3 + m - 8) = -9`, 8, [r`$7 - 13 - (m - 5) = -9$.`, r`$-1 - m = -9$, entonces $m = 8$.`]],
    [r`3 - 8 + 12 - 7 + 4 - 10 + 9 - 6`, -3, [r`Positivos: $28$. Negativos: $31$.`, r`$28 - 31 = -3$.`]],
  ),
  polys(
    [r`(x^2 - 4x) \cdot (x - 3)`, 'x^3-7x^2+12x', [r`$x^3 - 3x^2 - 4x^2 + 12x = x^3 - 7x^2 + 12x$.`]],
    [r`(3x^2 + 2x - 4) \cdot (x^2 + x)`, '3x^4+5x^3-2x^2-4x', [r`$3x^4 + 3x^3 + 2x^3 + 2x^2 - 4x^2 - 4x$.`, r`$3x^4 + 5x^3 - 2x^2 - 4x$.`]],
  ),
  science(r`La Tierra se formó hace aproximadamente $4{,}5 \cdot 10^9$ años. La distancia media entre la Tierra y la Luna es de trescientos ochenta y cuatro mil kilómetros.`,
    4500000000, [r`$4{,}5 \cdot 10^9 = 4.500.000.000$ años.`],
    ['3,84', 5], [r`Trescientos ochenta y cuatro mil es $384.000$ km.`, r`$384.000 = 3{,}84 \cdot 10^5$ km.`],
    'Escribí la edad de la Tierra (en años) como número completo.', 'Expresá en notación científica la distancia entre la Tierra y la Luna (en km).'),
]

const c1Ex2 = [
  integers(
    [r`\sqrt{3} \cdot \sqrt{27} + (-3^2 - 6^0) \cdot 4 + (2 - 5)^3 - 8`, -66, [
      r`$\sqrt{81} = 9$.`, r`$(-9 - 1) \cdot 4 = -40$.`, r`$(-3)^3 = -27$.`, r`$9 - 40 - 27 - 8 = -66$.`]],
    [r`\sqrt{2 \cdot (+3)^5 - (-3)^5} - \left(-5^3 + (-5)^0\right) : (-4) + (-4)^2`, 12, [
      r`$\sqrt{486 + 243} = \sqrt{729} = 27$.`, r`$(-125 + 1) : (-4) = 31$.`, r`$27 - 31 + 16 = 12$.`]],
  ),
  rationals(
    [r`3^{-1} + \sqrt{(0{,}5 + 0{,}25) : 3} + 4^{-1} - 0{,}5`, '7/12', [
      r`$\sqrt{\frac{3}{4} : 3} = \sqrt{\frac{1}{4}} = \frac{1}{2}$.`, r`$\frac{1}{3} + \frac{1}{2} + \frac{1}{4} - \frac{1}{2} = \frac{7}{12}$.`]],
    [r`\sqrt{\frac{1}{5} \cdot (1 + 4^{-1})} - (1 + 0{,}5)^{-2} - 3^{-2}`, '-1/18', [
      r`$\sqrt{\frac{1}{5} \cdot \frac{5}{4}} = \frac{1}{2}$.`, r`$\left(\frac{3}{2}\right)^{-2} = \frac{4}{9}$ y $3^{-2} = \frac{1}{9}$.`,
      r`$\frac{1}{2} - \frac{4}{9} - \frac{1}{9} = -\frac{1}{18}$.`]],
  ),
  sums(
    [r`9 - (6 + 7) - (5 + m - 12) = 2`, 1, [r`$9 - 13 - (m - 7) = 2$.`, r`$3 - m = 2$, entonces $m = 1$.`]],
    [r`-4 + 11 - 7 + 2 - 13 + 9 - 5 + 3`, -4, [r`Positivos: $25$. Negativos: $29$.`, r`$25 - 29 = -4$.`]],
  ),
  polys(
    [r`(x^2 + 5x) \cdot (x - 4)`, 'x^3+x^2-20x', [r`$x^3 - 4x^2 + 5x^2 - 20x = x^3 + x^2 - 20x$.`]],
    [r`(2x^2 - 3x + 4) \cdot (x^2 - x)`, '2x^4-5x^3+7x^2-4x', [r`$2x^4 - 2x^3 - 3x^3 + 3x^2 + 4x^2 - 4x$.`, r`$2x^4 - 5x^3 + 7x^2 - 4x$.`]],
  ),
  science(r`Los dinosaurios no avianos se extinguieron hace aproximadamente $6{,}6 \cdot 10^7$ años. La distancia media entre el Sol y Marte es de doscientos veintiocho millones de kilómetros.`,
    66000000, [r`$6{,}6 \cdot 10^7 = 66.000.000$ años.`],
    ['2,28', 8], [r`Doscientos veintiocho millones es $228.000.000$ km.`, r`$228.000.000 = 2{,}28 \cdot 10^8$ km.`],
    'Escribí como número completo los años que pasaron desde esa extinción.', 'Expresá en notación científica la distancia entre el Sol y Marte (en km).'),
]

// ---------- 2.º cuatrimestre ----------
const equations = (a, b) => ({
  n: 1, title: 'Ecuaciones',
  statement: 'Hallá el conjunto solución de cada ecuación. Si no tiene solución, indicá el conjunto vacío con el botón ∅.',
  items: [eqItem('1a', ...a), eqItem('1b', ...b)],
})
const inequalities = (a, b) => ({
  n: 2, title: 'Inecuaciones', statement: 'Hallá el conjunto solución de cada inecuación.',
  items: [ineqItem('2a', ...a), ineqItem('2b', ...b)],
})
const lines = (statement, a, b) => ({ n: 3, title: 'Función lineal', statement, items: [...a, ...b] })
const triangles = (a, b) => ({ n: 5, title: 'Puntos notables del triángulo', statement: 'Trazá en cada triángulo lo que se pide.', items: [triangleItem('5a', ...a), triangleItem('5b', ...b)] })

// Vértices en un dibujo de 300 × 240.
const SCALENE = [[110, 35], [285, 75], [25, 190]]
const ACUTE = [[160, 25], [265, 215], [40, 220]]
const TRI_B = [[115, 35], [270, 205], [30, 195]]
const TRI_C = [[186, 21], [245, 164], [59, 172]]
const TRI_D = [[95, 40], [280, 190], [20, 205]]

const c2Modelo = [
  equations(
    [r`\sqrt[4]{12x + 21} + 7 = 4`, '∅', [
      r`Despejo la raíz: $\sqrt[4]{12x + 21} = 4 - 7 = -3$.`,
      r`Una raíz de índice par no puede dar un número negativo. Por eso la ecuación no tiene solución: $S = \emptyset$.`,
      r`Si se eleva a la cuarta sin mirar el signo se obtiene $x = 5$, pero no verifica: $\sqrt[4]{81} + 7 = 10 \neq 4$.`]],
    [r`\frac{3x + 1}{2} = \frac{5}{6} \cdot \left(\frac{3}{10}x + \frac{9}{25}\right)`, '-4/25', [
      r`Distributiva: $\frac{3}{2}x + \frac{1}{2} = \frac{1}{4}x + \frac{3}{10}$.`,
      r`$\frac{5}{4}x = -\frac{1}{5}$.`, r`$x = -\frac{4}{25}$, entonces $S = \left\{-\frac{4}{25}\right\}$.`]],
  ),
  inequalities(
    [r`3 \cdot (x - 2) - 1 > 5x + 9`, 'x <', -8, [
      r`$3x - 7 > 5x + 9$.`, r`$-2x > 16$.`, r`Al dividir por un número negativo se invierte el signo: $x < -8$.`, r`$S = (-\infty ; -8)$.`]],
    [r`7 - 3 \cdot (x - 4) \geq 1 + 3x`, 'x ≤', 3, [
      r`$19 - 3x \geq 1 + 3x$.`, r`$-6x \geq -18$.`, r`Se invierte el signo: $x \leq 3$. $S = (-\infty ; 3]$.`]],
  ),
  lines('De las siguientes funciones lineales se pide: raíz, ordenada al origen y gráfico.',
    givenLine('a', 'y = -3x + 6', -3, 6), givenLine('b', 'y = -2 + 2x', 2, -2)),
  statsExercise2({ n: 4, variable: 'Libros', statement: 'Se les preguntó a 20 estudiantes cuántos libros leyeron en el año. Estas fueron las respuestas:',
    data: '2, 2, 0, 1, 1, 1, 3, 1, 3, 1, 2, 2, 0, 3, 3, 2, 2, 0, 1, 2.',
    values: [{ label: '0', f: 3 }, { label: '1', f: 6 }, { label: '2', f: 7 }, { label: '3', f: 4 }] }),
  triangles(['Hallá el baricentro.', 'Baricentro', SCALENE], ['Trazá la circunferencia inscripta.', 'Incentro', ACUTE, 'inscripta']),
]

const c2Ex1 = [
  equations(
    [r`\sqrt[4]{5x + 6} + 3 = 7`, 50, [r`$\sqrt[4]{5x + 6} = 4$.`, r`$5x + 6 = 4^4 = 256$.`, r`$x = 50$. Verifico: $\sqrt[4]{256} + 3 = 7$. ✓`]],
    [r`\frac{2x + 1}{3} = \frac{3}{4} \cdot \left(\frac{2}{9}x + \frac{8}{15}\right)`, '2/15', [
      r`$\frac{2}{3}x + \frac{1}{3} = \frac{1}{6}x + \frac{2}{5}$.`, r`$\frac{1}{2}x = \frac{1}{15}$, entonces $x = \frac{2}{15}$.`]],
  ),
  inequalities(
    [r`4 \cdot (x - 1) - 3 > 6x + 5`, 'x <', -6, [r`$4x - 7 > 6x + 5$.`, r`$-2x > 12$. Se invierte el signo: $x < -6$.`]],
    [r`9 - 2 \cdot (x - 5) \leq 3 + 2x`, 'x ≥', 4, [r`$19 - 2x \leq 3 + 2x$.`, r`$-4x \leq -16$. Se invierte el signo: $x \geq 4$.`]],
  ),
  lines('En a), hallá raíz, ordenada al origen y graficá. En b), hallá la ecuación de la recta que pasa por los dos puntos y graficala.',
    givenLine('a', 'y = -2x + 4', -2, 4), twoPointLine('b', [1, 1], [3, 5])),
  statsExercise2({ n: 4, variable: 'Horas', statement: 'Se les preguntó a 20 estudiantes cuántas horas por día usan el celular. Estas fueron las respuestas:',
    data: '2, 4, 4, 1, 4, 4, 1, 4, 3, 3, 2, 3, 3, 2, 3, 2, 3, 3, 3, 2.',
    values: [{ label: '1', f: 2 }, { label: '2', f: 5 }, { label: '3', f: 8 }, { label: '4', f: 5 }] }),
  triangles(['Hallá el ortocentro.', 'Ortocentro', TRI_B], ['Trazá la circunferencia circunscripta.', 'Circuncentro', TRI_C, 'circunscripta']),
]

const c2Ex2 = [
  equations(
    [r`\sqrt[4]{8x + 1} + 2 = 5`, 10, [r`$\sqrt[4]{8x + 1} = 3$.`, r`$8x + 1 = 81$.`, r`$x = 10$. Verifico: $\sqrt[4]{81} + 2 = 5$. ✓`]],
    [r`\frac{4x - 1}{3} = \frac{2}{5} \cdot \left(\frac{5}{6}x + \frac{5}{4}\right)`, '5/6', [
      r`$\frac{4}{3}x - \frac{1}{3} = \frac{1}{3}x + \frac{1}{2}$.`, r`$x = \frac{1}{2} + \frac{1}{3} = \frac{5}{6}$.`]],
  ),
  inequalities(
    [r`2 \cdot (x + 3) - 7 < 5x + 8`, 'x >', -3, [r`$2x - 1 < 5x + 8$.`, r`$-3x < 9$. Se invierte el signo: $x > -3$.`]],
    [r`10 - 5 \cdot (x - 1) \geq 1 + 2x`, 'x ≤', 2, [r`$15 - 5x \geq 1 + 2x$.`, r`$-7x \geq -14$. Se invierte el signo: $x \leq 2$.`]],
  ),
  lines('En a), hallá raíz, ordenada al origen y graficá. En b), hallá la ecuación de la recta que pasa por los dos puntos y graficala.',
    givenLine('a', 'y = 3x - 6', 3, -6), twoPointLine('b', [-1, 5], [2, -1])),
  statsExercise2({ n: 4, variable: 'Nota', statement: 'Estas son las notas de 20 estudiantes en una evaluación:',
    data: '9, 7, 7, 8, 8, 6, 8, 7, 7, 8, 9, 8, 7, 6, 8, 8, 6, 8, 9, 6.',
    values: [{ label: '6', f: 4 }, { label: '7', f: 5 }, { label: '8', f: 8 }, { label: '9', f: 3 }] }),
  triangles(['Hallá el ortocentro.', 'Ortocentro', TRI_D], ['Trazá la circunferencia inscripta.', 'Incentro', TRI_B, 'inscripta']),
]

export const SECTION_2A = {
  terms: [
    { id: '1', title: '1.er cuatrimestre', topics: 'Enteros · Racionales · Sumas algebraicas · Expresiones algebraicas · Notación científica',
      activities: activitySet('2A-c1', 2026, c1Modelo, c1Ex1, c1Ex2) },
    { id: '2', title: '2.º cuatrimestre', topics: 'Ecuaciones · Inecuaciones · Función lineal · Estadística · Triángulos',
      activities: activitySet('2A-c2', 2026, c2Modelo, c2Ex1, c2Ex2) },
  ],
}
