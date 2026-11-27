// 3.er año. Las hojas no indican sección: se cargó como «A». «Modelo 2026» transcribe las hojas del profesor;
// en el 2.º cuatrimestre el problema 5 (barril) se reemplazó por estadística.
import { calc, item, num, activitySet } from './builders'
import { trapezoidExercise, specialProducts, rootPoint, ineqPair, radical, system, linesExercise, ungroupedExercise, groupedExercise } from './builders3'

const r = String.raw

// ---------- 1.er cuatrimestre ----------
const rationals = (a, b) => ({
  n: 1, title: 'Cálculos combinados',
  statement: 'Resolvé los siguientes cálculos combinados. Podés escribir el resultado como fracción (por ejemplo, 7/6).',
  items: [calc('1a', ...a), calc('1b', ...b)],
})
const equations = (a, b) => ({
  n: 2, title: 'Ecuaciones', statement: 'Resolvé las siguientes ecuaciones y verificá la solución.',
  items: [
    item('2a', `$${a[0]}$`, [num(a[1], { label: 'd =', aria: 'd =' })], a[2]),
    item('2b', `$${b[0]}$`, [num(b[1], { label: 'x =', aria: 'x =' })], b[2]),
  ],
})
const roots = (a, b) => ({ n: 5, title: 'Irracionales en la recta numérica', statement: 'Representá en la recta numérica.', items: [rootPoint('5a', ...a), rootPoint('5b', ...b)] })

const c1Modelo = [
  rationals(
    [r`\sqrt[5]{\left(\frac{32}{243}\right)^{-1}} - \left(-\frac{5}{4}\right)^{-1} - 0{,}\widehat{7} : 0{,}\widehat{4}`, '11/20', [
      r`$\left(\frac{32}{243}\right)^{-1} = \frac{243}{32}$ y $\sqrt[5]{\frac{243}{32}} = \frac{3}{2}$.`, r`$\left(-\frac{5}{4}\right)^{-1} = -\frac{4}{5}$.`,
      r`$0{,}\widehat{7} = \frac{7}{9}$ y $0{,}\widehat{4} = \frac{4}{9}$, entonces $\frac{7}{9} : \frac{4}{9} = \frac{7}{4}$.`, r`$\frac{3}{2} + \frac{4}{5} - \frac{7}{4} = \frac{11}{20}$.`]],
    [r`\left[\left(-\frac{3}{2}\right)^{4}\right]^{3} : \left[\left(-\frac{3}{2}\right)^{5}\right]^{2} - \sqrt[3]{\frac{1}{2}} \cdot \sqrt[3]{\frac{1}{4}} + \left(\frac{1}{2}\right)^{0}`, '11/4', [
      r`Potencia de potencia y cociente de igual base: $\left(-\frac{3}{2}\right)^{12} : \left(-\frac{3}{2}\right)^{10} = \left(-\frac{3}{2}\right)^{2} = \frac{9}{4}$.`,
      r`$\sqrt[3]{\frac{1}{2} \cdot \frac{1}{4}} = \sqrt[3]{\frac{1}{8}} = \frac{1}{2}$.`, r`$\frac{9}{4} - \frac{1}{2} + 1 = \frac{11}{4}$.`]],
  ),
  equations(
    [r`\dfrac{d^2}{-\frac{12}{5}} = \dfrac{-\frac{45}{4}}{d}`, 3, [r`Multiplico en cruz: $d^3 = \left(-\frac{12}{5}\right) \cdot \left(-\frac{45}{4}\right) = 27$.`, r`$d = \sqrt[3]{27} = 3$.`,
      r`Verifico: $9 : \left(-\frac{12}{5}\right) = -\frac{15}{4}$ y $\left(-\frac{45}{4}\right) : 3 = -\frac{15}{4}$. ✓`]],
    [r`4 \cdot (2x + 1) - 2 = 3 \cdot (2x + 2) - 4`, 0, [r`$8x + 2 = 6x + 2$.`, r`$2x = 0$, entonces $x = 0$.`, r`Verifico: los dos miembros valen $2$. ✓`]],
  ),
  trapezoidExercise(3, { top: 4, over: 3, height: 4, side: 5 }),
  specialProducts(4,
    [r`(-7g^3 + 3g^4)^2`, '9g^8-42g^7+49g^6', 'g', [r`$(a + b)^2 = a^2 + 2ab + b^2$.`, r`$(-7g^3)^2 + 2 \cdot (-7g^3) \cdot 3g^4 + (3g^4)^2 = 49g^6 - 42g^7 + 9g^8$.`]],
    [r`16p^4 - \frac{4}{25}p^2`, ['4p^2+2/5p', '4p^2-2/5p'], 'p', [r`$a^2 - b^2 = (a + b) \cdot (a - b)$.`, r`$a = \sqrt{16p^4} = 4p^2$ y $b = \sqrt{\frac{4}{25}p^2} = \frac{2}{5}p$.`,
      r`$\left(4p^2 + \frac{2}{5}p\right) \cdot \left(4p^2 - \frac{2}{5}p\right)$.`]]),
  roots(
    [r`-\sqrt{5}`, -Math.sqrt(5), [r`$5 = 2^2 + 1^2$: se arma un triángulo rectángulo de catetos 2 y 1. Su hipotenusa mide $\sqrt{5}$.`, r`Con el compás se lleva esa medida desde el 0 hacia la izquierda: $-\sqrt{5} \approx -2{,}24$.`]],
    [r`\sqrt{12}`, Math.sqrt(12), [r`$12 = 4^2 - 2^2$: triángulo rectángulo con un cateto de 2 sobre el 2 de la altura e hipotenusa de 4. El otro cateto mide $\sqrt{12}$.`,
      r`También: $12 = 3^2 + (\sqrt{3})^2$. Con el compás se lleva desde el 0 hacia la derecha: $\sqrt{12} \approx 3{,}46$.`]],
  ),
]

const c1Ex1 = [
  rationals(
    [r`\sqrt[3]{\left(\frac{8}{27}\right)^{-1}} - \left(-\frac{3}{5}\right)^{-1} - 0{,}\widehat{5} : 0{,}\widehat{3}`, '3/2', [
      r`$\sqrt[3]{\frac{27}{8}} = \frac{3}{2}$ y $\left(-\frac{3}{5}\right)^{-1} = -\frac{5}{3}$.`, r`$\frac{5}{9} : \frac{3}{9} = \frac{5}{3}$.`, r`$\frac{3}{2} + \frac{5}{3} - \frac{5}{3} = \frac{3}{2}$.`]],
    [r`\left[\left(-\frac{2}{3}\right)^{3}\right]^{4} : \left[\left(-\frac{2}{3}\right)^{5}\right]^{2} - \sqrt[3]{\frac{1}{3}} \cdot \sqrt[3]{\frac{1}{9}} + \left(\frac{3}{4}\right)^{0}`, '10/9', [
      r`$\left(-\frac{2}{3}\right)^{12 - 10} = \frac{4}{9}$.`, r`$\sqrt[3]{\frac{1}{27}} = \frac{1}{3}$.`, r`$\frac{4}{9} - \frac{1}{3} + 1 = \frac{10}{9}$.`]],
  ),
  equations(
    [r`\dfrac{d^2}{-\frac{2}{3}} = \dfrac{-12}{d}`, 2, [r`$d^3 = \left(-\frac{2}{3}\right) \cdot (-12) = 8$, entonces $d = 2$.`, r`Verifico: los dos miembros valen $-6$. ✓`]],
    [r`5 \cdot (x + 2) - 3 = 2 \cdot (2x + 5) - 1`, 2, [r`$5x + 7 = 4x + 9$, entonces $x = 2$.`, r`Verifico: los dos miembros valen $17$. ✓`]],
  ),
  trapezoidExercise(3, { top: 5, over: 6, height: 8, side: 10 }),
  specialProducts(4,
    [r`(-5m^2 + 2m^3)^2`, '4m^6-20m^5+25m^4', 'm', [r`$(-5m^2)^2 + 2 \cdot (-5m^2) \cdot 2m^3 + (2m^3)^2 = 25m^4 - 20m^5 + 4m^6$.`]],
    [r`25a^4 - \frac{9}{16}a^2`, ['5a^2+3/4a', '5a^2-3/4a'], 'a', [r`Las bases son $5a^2$ y $\frac{3}{4}a$.`, r`$\left(5a^2 + \frac{3}{4}a\right) \cdot \left(5a^2 - \frac{3}{4}a\right)$.`]]),
  roots(
    [r`-\sqrt{10}`, -Math.sqrt(10), [r`$10 = 3^2 + 1^2$: catetos 3 y 1. La hipotenusa se lleva desde el 0 hacia la izquierda: $-\sqrt{10} \approx -3{,}16$.`]],
    [r`\sqrt{8}`, Math.sqrt(8), [r`$8 = 2^2 + 2^2$: catetos 2 y 2. La hipotenusa se lleva desde el 0 hacia la derecha: $\sqrt{8} \approx 2{,}83$.`]],
  ),
]

const c1Ex2 = [
  rationals(
    [r`\sqrt[4]{\left(\frac{16}{81}\right)^{-1}} - \left(-\frac{4}{7}\right)^{-1} - 0{,}\widehat{8} : 0{,}\widehat{6}`, '23/12', [
      r`$\sqrt[4]{\frac{81}{16}} = \frac{3}{2}$ y $\left(-\frac{4}{7}\right)^{-1} = -\frac{7}{4}$.`, r`$\frac{8}{9} : \frac{6}{9} = \frac{4}{3}$.`, r`$\frac{3}{2} + \frac{7}{4} - \frac{4}{3} = \frac{23}{12}$.`]],
    [r`\left[\left(-\frac{4}{3}\right)^{2}\right]^{5} : \left[\left(-\frac{4}{3}\right)^{4}\right]^{2} - \sqrt[3]{\frac{1}{5}} \cdot \sqrt[3]{\frac{1}{25}} + \left(\frac{5}{7}\right)^{0}`, '116/45', [
      r`$\left(-\frac{4}{3}\right)^{10 - 8} = \frac{16}{9}$.`, r`$\sqrt[3]{\frac{1}{125}} = \frac{1}{5}$.`, r`$\frac{16}{9} - \frac{1}{5} + 1 = \frac{116}{45}$.`]],
  ),
  equations(
    [r`\dfrac{d^2}{-\frac{5}{2}} = \dfrac{-50}{d}`, 5, [r`$d^3 = \left(-\frac{5}{2}\right) \cdot (-50) = 125$, entonces $d = 5$.`, r`Verifico: los dos miembros valen $-10$. ✓`]],
    [r`3 \cdot (3x - 1) + 5 = 4 \cdot (2x + 1) + 1`, 3, [r`$9x + 2 = 8x + 5$, entonces $x = 3$.`, r`Verifico: los dos miembros valen $29$. ✓`]],
  ),
  trapezoidExercise(3, { top: 6, over: 8, height: 15, side: 17 }),
  specialProducts(4,
    [r`(-4k^5 + 6k^2)^2`, '16k^10-48k^7+36k^4', 'k', [r`$(-4k^5)^2 + 2 \cdot (-4k^5) \cdot 6k^2 + (6k^2)^2 = 16k^{10} - 48k^7 + 36k^4$.`]],
    [r`36y^6 - \frac{4}{49}y^2`, ['6y^3+2/7y', '6y^3-2/7y'], 'y', [r`Las bases son $6y^3$ y $\frac{2}{7}y$.`, r`$\left(6y^3 + \frac{2}{7}y\right) \cdot \left(6y^3 - \frac{2}{7}y\right)$.`]]),
  roots(
    [r`-\sqrt{13}`, -Math.sqrt(13), [r`$13 = 3^2 + 2^2$: catetos 3 y 2. La hipotenusa se lleva desde el 0 hacia la izquierda: $-\sqrt{13} \approx -3{,}61$.`]],
    [r`\sqrt{7}`, Math.sqrt(7), [r`$7 = 4^2 - 3^2$: triángulo rectángulo de hipotenusa 4 y un cateto 3; el otro mide $\sqrt{7} \approx 2{,}65$. Con el compás se lleva desde el 0 hacia la derecha.`]],
  ),
]

// ---------- 2.º cuatrimestre ----------
const inequalities = (a, b) => ({
  n: 1, title: 'Inecuaciones', statement: 'Resolvé las siguientes inecuaciones y representá cada solución en la recta numérica.',
  items: [...ineqPair('a', ...a), ...ineqPair('b', ...b)],
})
const radicals = (a, b) => ({
  n: 2, title: 'Cálculos con radicales', statement: 'Resolvé estos cálculos combinados de la forma más simple posible.',
  items: [radical('2a', ...a), radical('2b', ...b)],
})
const systems = (a, b) => ({
  n: 3, title: 'Sistemas de ecuaciones', statement: 'Resolvé los siguientes sistemas por el método de igualación.',
  items: [system('3a', ...a), system('3b', ...b)],
})
const line = (m, mText, mTex, b, eq, tex) => ({ m, mText, mTex, b, eq, tex })

// Estadística: datos no agrupados
const goals = (n) => ungroupedExercise({ n, variable: 'Goles', statement: 'Se registraron los goles que convirtió un equipo en sus últimos 20 partidos:', data: '2, 1, 3, 4, 2, 0, 3, 0, 2, 1, 2, 2, 2, 2, 1, 0, 1, 0, 3, 1.',
  values: [[0, 4], [1, 5], [2, 7], [3, 3], [4, 1]], median: 2,
  medianStep: 'Mediana: con n = 20 (par) se promedian los datos de las posiciones 10 y 11. Según F, las posiciones 10 a 16 valen 2, así que la mediana es 2.',
  questions: [
    { q: '¿En cuántos partidos hizo como máximo 1 gol?', answer: 9, step: 'Como máximo 1: es F de 1, o sea 9 partidos.' },
    { q: '¿Qué porcentaje de partidos hizo 3 goles o más?', answer: 20, step: '3 o más: 3 + 1 = 4 partidos, el 20 %.' },
    { q: '¿Cuántos goles convirtió en total en esos partidos?', answer: 32, step: 'Es la suma de los productos x · f: 32 goles.' },
  ] })
const siblings = (n) => ungroupedExercise({ n, variable: 'Herm.', statement: 'Se les preguntó a 20 estudiantes cuántos hermanos tienen:', data: '1, 1, 3, 1, 4, 3, 2, 0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 4, 0, 0.',
  values: [[0, 3], [1, 7], [2, 5], [3, 3], [4, 2]], median: 1.5,
  medianStep: 'Mediana: con n = 20 (par) se promedian los datos de las posiciones 10 y 11. Según F, la posición 10 vale 1 y la 11 vale 2: la mediana es (1 + 2) : 2 = 1,5.',
  questions: [
    { q: '¿Cuántos estudiantes tienen como máximo 1 hermano?', answer: 10, step: 'Como máximo 1: F de 1, o sea 10 estudiantes.' },
    { q: '¿Qué porcentaje tiene 3 hermanos o más?', answer: 25, step: '3 o más: 3 + 2 = 5 estudiantes, el 25 %.' },
    { q: '¿Cuántos estudiantes tienen al menos 1 hermano?', answer: 17, step: 'Al menos 1: 20 − 3 = 17.' },
  ] })

// Estadística: datos agrupados
const heights = (n) => groupedExercise({ n, variable: 'Altura (cm)', statement: 'Se midió la altura, en centímetros, de 20 estudiantes. Usá los intervalos de la tabla.', data: '160, 155, 158, 157, 164, 165, 154, 162, 151, 153, 163, 161, 172, 160, 164, 162, 156, 167, 168, 159.',
  limits: [150, 155, 160, 165, 170, 175], freqs: [3, 5, 8, 3, 1],
  questions: [
    { q: '¿Cuántos estudiantes miden menos de 160 cm?', answer: 8, step: 'Menos de 160: F del segundo intervalo, 8.' },
    { q: '¿Qué porcentaje mide 165 cm o más?', answer: 20, step: '165 o más: 3 + 1 = 4 estudiantes, el 20 %.' },
    { q: 'La media, ¿es mayor, menor o igual que la mediana?', options: ['Mayor', 'Menor', 'Igual'], answer: 'Menor', step: 'La media es 161 y la mediana 161,25: la media es menor.' },
  ] })
const travel = (n) => groupedExercise({ n, variable: 'Minutos', statement: 'Se les preguntó a 20 estudiantes cuántos minutos tardan en llegar a la escuela. Usá los intervalos de la tabla.', data: '38, 45, 24, 29, 15, 40, 34, 25, 12, 21, 18, 5, 27, 8, 9, 30, 25, 10, 22, 20.',
  limits: [0, 10, 20, 30, 40, 50], freqs: [3, 4, 8, 3, 2],
  questions: [
    { q: '¿Cuántos estudiantes tardan menos de 20 minutos?', answer: 7, step: 'Menos de 20: F del segundo intervalo, 7.' },
    { q: '¿Qué porcentaje tarda 30 minutos o más?', answer: 25, step: '30 o más: 3 + 2 = 5 estudiantes, el 25 %.' },
    { q: '¿Cuántos tardan 10 minutos o más, pero menos de 30?', answer: 12, step: 'Intervalos [10 ; 20) y [20 ; 30): 4 + 8 = 12.' },
    { q: 'La media, ¿es mayor, menor o igual que la mediana?', options: ['Mayor', 'Menor', 'Igual'], answer: 'Menor', step: 'La media es 23,5 y la mediana 23,75: la media es menor.' },
  ] })

const c2Modelo = [
  inequalities(
    [r`-3 \cdot (x + 1) \geq -x - 6`, 'x ≤', '3/2', 1.5, [r`$-3x - 3 \geq -x - 6$.`, r`$-2x \geq -3$.`, r`Al dividir por un número negativo se invierte el signo: $x \leq \frac{3}{2}$.`]],
    [r`\dfrac{-2x - 3}{3} \leq \dfrac{-0{,}\widehat{7}}{\frac{5}{3}}`, 'x ≥', '-4/5', -0.8, [r`$-0{,}\widehat{7} = -\frac{7}{9}$ y $-\frac{7}{9} : \frac{5}{3} = -\frac{7}{15}$.`,
      r`$-2x - 3 \leq -\frac{7}{5}$.`, r`$-2x \leq \frac{8}{5}$. Se invierte el signo: $x \geq -\frac{4}{5}$.`]],
  ),
  radicals(
    [r`\left(\sqrt{20} - \sqrt{45} + 2\sqrt{80}\right) \cdot \sqrt{2}`, 7, 10, [r`$\sqrt{20} = 2\sqrt{5}$, $\sqrt{45} = 3\sqrt{5}$ y $\sqrt{80} = 4\sqrt{5}$.`, r`$(2 - 3 + 8)\sqrt{5} = 7\sqrt{5}$.`, r`$7\sqrt{5} \cdot \sqrt{2} = 7\sqrt{10}$.`]],
    [r`\sqrt{75} - 2\sqrt{12} - 7\sqrt{3} + \sqrt{27}`, -3, 3, [r`$\sqrt{75} = 5\sqrt{3}$, $\sqrt{12} = 2\sqrt{3}$ y $\sqrt{27} = 3\sqrt{3}$.`, r`$(5 - 4 - 7 + 3)\sqrt{3} = -3\sqrt{3}$.`]],
  ),
  systems(
    [[r`y - 2 = \frac{4}{5}x`, r`2x = y + 1`], '5/2', 4, [r`Despejo $y$: $y = \frac{4}{5}x + 2$ e $y = 2x - 1$.`, r`Igualo: $\frac{4}{5}x + 2 = 2x - 1$, entonces $x = \frac{5}{2}$.`, r`$y = 2 \cdot \frac{5}{2} - 1 = 4$.`]],
    [[r`-x - y = -1`, r`5x + 4y = -3`], -7, 8, [r`$y = 1 - x$ e $y = \dfrac{-3 - 5x}{4}$.`, r`Igualo: $4 - 4x = -3 - 5x$, entonces $x = -7$.`, r`$y = 1 - (-7) = 8$.`]],
  ),
  linesExercise(4, { p1: [4, -5], p2: [2, 5], parallel: [0, 2], perp: [-5, 0],
    l1: line(-5, '-5', '-5', 15, '-5x+15', '-5x + 15'), l2: line(-5, '-5', '-5', 2, '-5x+2', '-5x + 2'),
    l3: line(0.2, '1/5', r`\frac{1}{5}`, 1, '1/5x+1', r`\frac{1}{5}x + 1`) }),
  goals(5),
  heights(6),
]

const c2Ex1 = [
  inequalities(
    [r`-4 \cdot (x + 2) \geq -2x - 3`, 'x ≤', '-5/2', -2.5, [r`$-4x - 8 \geq -2x - 3$.`, r`$-2x \geq 5$. Se invierte el signo: $x \leq -\frac{5}{2}$.`]],
    [r`\dfrac{-5x - 1}{4} \leq \dfrac{-0{,}\widehat{5}}{\frac{10}{9}}`, 'x ≥', '1/5', 0.2, [r`$-\frac{5}{9} : \frac{10}{9} = -\frac{1}{2}$.`, r`$-5x - 1 \leq -2$.`, r`$-5x \leq -1$. Se invierte el signo: $x \geq \frac{1}{5}$.`]],
  ),
  radicals(
    [r`\left(\sqrt{12} - \sqrt{27} + 2\sqrt{75}\right) \cdot \sqrt{2}`, 9, 6, [r`$(2 - 3 + 10)\sqrt{3} = 9\sqrt{3}$.`, r`$9\sqrt{3} \cdot \sqrt{2} = 9\sqrt{6}$.`]],
    [r`\sqrt{50} - 2\sqrt{18} - 4\sqrt{2} + \sqrt{32}`, -1, 2, [r`$\sqrt{50} = 5\sqrt{2}$, $\sqrt{18} = 3\sqrt{2}$ y $\sqrt{32} = 4\sqrt{2}$.`, r`$(5 - 6 - 4 + 4)\sqrt{2} = -\sqrt{2}$: es decir, $a = -1$.`]],
  ),
  systems(
    [[r`y - 3 = \frac{2}{3}x`, r`3x = y + 4`], 3, 5, [r`$y = \frac{2}{3}x + 3$ e $y = 3x - 4$.`, r`Igualo: $\frac{2}{3}x + 3 = 3x - 4$, entonces $x = 3$.`, r`$y = 5$.`]],
    [[r`-x - y = -2`, r`4x + 3y = 1`], -5, 7, [r`$y = 2 - x$ e $y = \dfrac{1 - 4x}{3}$.`, r`Igualo: $6 - 3x = 1 - 4x$, entonces $x = -5$ e $y = 7$.`]],
  ),
  linesExercise(4, { p1: [1, 5], p2: [3, 1], parallel: [0, -1], perp: [-4, 0],
    l1: line(-2, '-2', '-2', 7, '-2x+7', '-2x + 7'), l2: line(-2, '-2', '-2', -1, '-2x-1', '-2x - 1'),
    l3: line(0.5, '1/2', r`\frac{1}{2}`, 2, '1/2x+2', r`\frac{1}{2}x + 2`) }),
  siblings(5),
]

const c2Ex2 = [
  inequalities(
    [r`-5 \cdot (x - 1) > -2x + 11`, 'x <', '-2', -2, [r`$-5x + 5 > -2x + 11$.`, r`$-3x > 6$. Se invierte el signo: $x < -2$.`]],
    [r`\dfrac{-2x + 1}{5} \geq \dfrac{-0{,}\widehat{6}}{\frac{10}{3}}`, 'x ≤', '1', 1, [r`$-\frac{2}{3} : \frac{10}{3} = -\frac{1}{5}$.`, r`$-2x + 1 \geq -1$.`, r`$-2x \geq -2$. Se invierte el signo: $x \leq 1$.`]],
  ),
  radicals(
    [r`\left(\sqrt{8} - \sqrt{18} + 3\sqrt{50}\right) \cdot \sqrt{7}`, 14, 14, [r`$(2 - 3 + 15)\sqrt{2} = 14\sqrt{2}$.`, r`$14\sqrt{2} \cdot \sqrt{7} = 14\sqrt{14}$.`]],
    [r`\sqrt{80} - 2\sqrt{45} - 6\sqrt{5} + \sqrt{125}`, -3, 5, [r`$\sqrt{80} = 4\sqrt{5}$, $\sqrt{45} = 3\sqrt{5}$ y $\sqrt{125} = 5\sqrt{5}$.`, r`$(4 - 6 - 6 + 5)\sqrt{5} = -3\sqrt{5}$.`]],
  ),
  systems(
    [[r`y - 2 = \frac{3}{4}x`, r`2x = y + 3`], 4, 5, [r`$y = \frac{3}{4}x + 2$ e $y = 2x - 3$.`, r`Igualo: $\frac{3}{4}x + 2 = 2x - 3$, entonces $x = 4$.`, r`$y = 5$.`]],
    [[r`-x - y = -3`, r`5x + 2y = -6`], -4, 7, [r`$y = 3 - x$ e $y = \dfrac{-6 - 5x}{2}$.`, r`Igualo: $6 - 2x = -6 - 5x$, entonces $x = -4$ e $y = 7$.`]],
  ),
  linesExercise(4, { p1: [2, -3], p2: [4, 3], parallel: [0, 4], perp: [-3, 0],
    l1: line(3, '3', '3', -9, '3x-9', '3x - 9'), l2: line(3, '3', '3', 4, '3x+4', '3x + 4'),
    l3: line(-1 / 3, '-1/3', r`-\frac{1}{3}`, -1, '-1/3x-1', r`-\frac{1}{3}x - 1`) }),
  travel(5),
]

export const SECTION_3A = {
  terms: [
    { id: '1', title: '1.er cuatrimestre', topics: 'Cálculos combinados · Ecuaciones · Perímetro y área · Productos especiales · Recta numérica',
      activities: activitySet('3A-c1', 2026, c1Modelo, c1Ex1, c1Ex2) },
    { id: '2', title: '2.º cuatrimestre', topics: 'Inecuaciones · Radicales · Sistemas · Ecuación de la recta · Estadística',
      activities: activitySet('3A-c2', 2026, c2Modelo, c2Ex1, c2Ex2) },
  ],
}
