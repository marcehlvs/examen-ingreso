// 5.º año. Las hojas no indican sección: se cargó como «A». La práctica transcribe las hojas del profesor; en el
// 2.º cuatrimestre se quitó el ejercicio 4 (producto de dos rectas) y se agregaron estadística y combinatoria.
import { activitySet } from './builders'
import { setEquation, valueEquation, surdEquation, absStudy, logStudy, expStudy, chooseExercise, productExercise, sturgesExercise, countingExercise } from './builders5'

const r = String.raw

// ---------- 1.er cuatrimestre ----------
const moduleEquations = (a, b) => ({
  n: 1, title: 'Ecuaciones con módulo',
  statement: 'Resolvé las ecuaciones aplicando la definición de módulo y sus propiedades, y escribí el conjunto solución. Si hay dos soluciones, separalas con «;».',
  items: [setEquation('1a', ...a), setEquation('1b', ...b)],
})
const moduleStudy = (f, g) => ({
  n: 2, title: 'Función módulo: estudio completo',
  statement: 'Realizá el estudio completo de cada función: raíces, ordenada al origen, C⁺ y C⁻, crecimiento y decrecimiento, dominio e imagen.',
  items: [...absStudy('2a', ...f), ...absStudy('2b', ...g)],
})
const exponentialEquations = (a, b, c) => ({
  n: 3, title: 'Ecuaciones exponenciales', statement: 'Resolvé las siguientes ecuaciones exponenciales y verificá el resultado.',
  items: [valueEquation('3a', ...a), valueEquation('3b', ...b), valueEquation('3c', ...c)],
})

const c1Modelo = [
  moduleEquations(
    [r`5 \cdot |3x - 1| = 6x - 5`, [], [r`El módulo no es negativo, así que tiene que ser $6x - 5 \geq 0$, es decir, $x \geq \frac{5}{6}$.`,
      r`Si $x \geq \frac{1}{3}$: $15x - 5 = 6x - 5$ da $x = 0$, que no cumple $x \geq \frac{5}{6}$.`, r`Si $x < \frac{1}{3}$: $-15x + 5 = 6x - 5$ da $x = \frac{10}{21}$, que tampoco cumple.`, r`$S = \emptyset$.`]],
    [r`3 \cdot |x - 1| + 2 = 5 - x`, ['0', '3/2'], [r`$3|x - 1| = 3 - x$.`, r`Si $x \geq 1$: $3x - 3 = 3 - x$, entonces $x = \frac{3}{2}$.`, r`Si $x < 1$: $3 - 3x = 3 - x$, entonces $x = 0$.`, r`Las dos verifican: $S = \{0 ; \frac{3}{2}\}$.`]],
  ),
  moduleStudy(
    [r`f(x) = -2 \cdot \left|2 \cdot \left(x - \frac{1}{2}\right) - 3\right| - 4`, { A: -2, m: 2, n: -4, k: -4, simplified: r`f(x) = -2|2x - 4| - 4` }],
    [r`g(x) = 3 \cdot |(x + 2) \cdot 4 - 5| - 9`, { A: 3, m: 4, n: 3, k: -9, simplified: r`g(x) = 3|4x + 3| - 9` }],
  ),
  exponentialEquations(
    [r`2^{2x+1} - 6 \cdot 4^x + 8 = 0`, '1/2', [r`$2^{2x+1} = 2 \cdot 4^x$.`, r`$2 \cdot 4^x - 6 \cdot 4^x = -8$, entonces $4^x = 2$.`, r`$x = \frac{1}{2}$. Verifico: $4 - 12 + 8 = 0$. ✓`]],
    [r`5^{x+1} + 2 \cdot 5^x - 5^{x-1} = 34 \cdot 5^{-1}`, 0, [r`Factor común $5^x$: $5^x \cdot \left(5 + 2 - \frac{1}{5}\right) = \frac{34}{5}$.`, r`$5^x \cdot \frac{34}{5} = \frac{34}{5}$, entonces $5^x = 1$ y $x = 0$.`]],
    [r`2^{3x-8} - 2^x = 0`, 4, [r`$2^{3x-8} = 2^x$. Bases iguales, exponentes iguales: $3x - 8 = x$.`, r`$x = 4$. Verifico: $2^4 - 2^4 = 0$. ✓`]],
  ),
]

const c1Ex1 = [
  moduleEquations(
    [r`4 \cdot |2x - 1| = 3x - 6`, [], [r`Tiene que ser $3x - 6 \geq 0$: $x \geq 2$.`, r`Los dos casos dan $x = -\frac{2}{5}$ y $x = \frac{10}{11}$, que no cumplen. $S = \emptyset$.`]],
    [r`2 \cdot |x - 3| + 1 = 9 - x`, ['-2', '14/3'], [r`$2|x - 3| = 8 - x$.`, r`Si $x \geq 3$: $x = \frac{14}{3}$. Si $x < 3$: $x = -2$.`]],
  ),
  moduleStudy(
    [r`f(x) = -3 \cdot \left|2 \cdot \left(x + \frac{1}{2}\right) - 5\right| - 6`, { A: -3, m: 2, n: -4, k: -6, simplified: r`f(x) = -3|2x - 4| - 6` }],
    [r`g(x) = 2 \cdot |(x - 1) \cdot 3 + 5| - 8`, { A: 2, m: 3, n: 2, k: -8, simplified: r`g(x) = 2|3x + 2| - 8` }],
  ),
  exponentialEquations(
    [r`3^{2x+1} - 5 \cdot 9^x + 6 = 0`, '1/2', [r`$3 \cdot 9^x - 5 \cdot 9^x = -6$, entonces $9^x = 3$ y $x = \frac{1}{2}$.`]],
    [r`2^{x+2} + 3 \cdot 2^x - 2^{x-1} = 13 \cdot 2`, 2, [r`$2^x \cdot \left(4 + 3 - \frac{1}{2}\right) = 26$.`, r`$2^x = 4$, entonces $x = 2$.`]],
    [r`3^{2x-5} - 3^x = 0`, 5, [r`$2x - 5 = x$, entonces $x = 5$.`]],
  ),
]

const c1Ex2 = [
  moduleEquations(
    [r`2 \cdot |3x - 1| = x + 3`, ['-1/7', '1'], [r`Si $x \geq \frac{1}{3}$: $6x - 2 = x + 3$, $x = 1$.`, r`Si $x < \frac{1}{3}$: $-6x + 2 = x + 3$, $x = -\frac{1}{7}$.`]],
    [r`4 \cdot |x - 2| + 3 = x`, [], [r`$4|x - 2| = x - 3$, así que tiene que ser $x \geq 3$.`, r`Los casos dan $x = \frac{5}{3}$ y $x = \frac{11}{5}$, que no cumplen. $S = \emptyset$.`]],
  ),
  moduleStudy(
    [r`f(x) = -\left|2 \cdot \left(x + \frac{3}{2}\right) - 1\right| - 5`, { A: -1, m: 2, n: 2, k: -5, simplified: r`f(x) = -|2x + 2| - 5` }],
    [r`g(x) = 4 \cdot |(x + 1) \cdot 2 - 5| - 12`, { A: 4, m: 2, n: -3, k: -12, simplified: r`g(x) = 4|2x - 3| - 12` }],
  ),
  exponentialEquations(
    [r`5^{2x+1} - 7 \cdot 25^x + 10 = 0`, '1/2', [r`$5 \cdot 25^x - 7 \cdot 25^x = -10$, entonces $25^x = 5$ y $x = \frac{1}{2}$.`]],
    [r`3^{x+1} + 2 \cdot 3^x - 3^{x-1} = 14 \cdot 3`, 2, [r`$3^x \cdot \left(3 + 2 - \frac{1}{3}\right) = 42$.`, r`$3^x = 9$, entonces $x = 2$.`]],
    [r`5^{4x-9} - 5^x = 0`, 3, [r`$4x - 9 = x$, entonces $x = 3$.`]],
  ),
]

// ---------- 2.º cuatrimestre ----------
const single = (i) => [i]
const logEquations = (a, b, c) => chooseExercise(1, 'Ecuaciones logarítmicas (elegí 2 de 3)',
  'Resolvé 2 (dos) de las 3 (tres) ecuaciones y verificá el resultado. Si resolvés las tres, se cuentan las dos mejores.', 2,
  [single(valueEquation('1a', ...a)), single(surdEquation('1b', ...b)), single({ ...setEquation('1c', ...c) })])
const logFunctions = (f, g) => chooseExercise(2, 'Funciones logarítmicas (elegí 1 de 2)',
  'Elegí 1 (una) de las 2 (dos) funciones (a o b). Hallá dominio, asíntota, imagen, intersección con los ejes, crecimiento, positividad y negatividad, y graficá.', 1,
  [logStudy('2a', ...f), logStudy('2b', ...g)])
const expFunctions = (f, g) => chooseExercise(3, 'Funciones exponenciales (elegí 1 de 2)',
  'Elegí 1 (una) de las 2 (dos) funciones (a o b). Hallá dominio, asíntota, imagen, intersección con los ejes, crecimiento, positividad y negatividad, y graficá.', 1,
  [expStudy('3a', ...f), expStudy('3b', ...g)])
const outer = (a, b, c) => `(−∞ ; ${a}) ∪ (${b} ; ${c})`
const mixed = (a, b, c) => `(${a} ; ${b}) ∪ (${c} ; +∞)`

const c2Modelo = [
  logEquations(
    [r`\log_3(x^2) + \log_{81} x = 3 \cdot \log_9 x + \frac{3}{2}`, 9, [r`Paso todo a base 3 con $t = \log_3 x$: $2t + \frac{t}{4} = \frac{3}{2}t + \frac{3}{2}$.`, r`$\frac{3}{4}t = \frac{3}{2}$, entonces $t = 2$ y $x = 9$.`]],
    [r`\log_9 x - \log_9(x - 1) = \log_9(x - 2) + 4^{-0{,}5}`, [5, 7, 3], [r`$4^{-0{,}5} = \frac{1}{2}$. Dominio: $x > 2$.`, r`$\log_9 \dfrac{x}{(x-1)(x-2)} = \frac{1}{2}$, entonces $x = 3(x - 1)(x - 2)$.`,
      r`$3x^2 - 10x + 6 = 0$, con soluciones $x = \dfrac{5 \pm \sqrt{7}}{3}$.`, r`Solo está en el dominio $x = \dfrac{5 + \sqrt{7}}{3} \approx 2{,}55$.`]],
    [r`2 \cdot \ln x = \ln(5x - 6)`, ['2', '3'], [r`Dominio: $x > \frac{6}{5}$.`, r`$x^2 = 5x - 6$, es decir, $x^2 - 5x + 6 = 0$.`, r`$S = \{2 ; 3\}$: las dos están en el dominio.`]],
  ),
  logFunctions(
    [r`f(x) = \log_3(3x - 6) - 3`, { a: 1, b: 3, m: 3, n: -6, k: -3, position: 2 }],
    [r`g(x) = 2 \cdot \ln(-x + 2) - 4`, { a: 2, m: -1, n: 2, k: -4, position: 0 }],
  ),
  expFunctions(
    [r`f(x) = -\frac{1}{2} \cdot 4^x + 2`, { a: -0.5, b: 4, k: 2, position: 1 }],
    [r`g(x) = 5 \cdot 6^x - 1`, { a: 5, b: 6, k: -1, position: 3 }],
  ),
  productExercise(4, {
    f: (x) => 3 - x / 2, g: (x) => x * (x - 3), fAt: [-3.6, 3.9], gAt: [4.1, 4.5], window: [-5, 8, -4, 6],
    xs: [1, 4, 0, -1, 3], zeros: [0, 3, 6],
    pos: outer(0, 3, 6), neg: mixed(0, 3, 6), signOptions: [outer(0, 3, 6), mixed(0, 3, 6), '(0 ; 3)', '(−∞ ; 6)'],
    wrong: [(x) => -(3 - x / 2) * x * (x - 3), (x) => (3 - x / 2) * x * (x + 3), (x) => 3 - x / 2 + x * (x - 3)], position: 2,
  }),
  sturgesExercise({ n: 5, variable: 'Altura (cm)', statement: 'Se midió la altura, en centímetros, de 20 estudiantes:', data: '158, 158, 150, 160, 161, 154, 155, 163, 163, 175, 158, 163, 163, 168, 169, 165, 150, 160, 157, 172.',
    min: 150, max: 175, amplitude: 5, freqs: [3, 5, 7, 3, 2],
    compare: { statement: 'Compará la variabilidad de dos grupos con el coeficiente de variación.', names: ['Grupo A', 'Grupo B'], groups: [[2, 4, 5, 6, 8], [13, 19, 21, 22, 25]] } }),
  countingExercise(6, [
    ['¿De cuántas maneras se pueden ordenar 5 libros distintos en un estante?', 0, 120, [r`Se usan todos y importa el orden: $P_5 = 5! = 120$.`]],
    ['¿Cuántos anagramas (con o sin sentido) se pueden formar con las letras de la palabra CASA?', 1, 12, [r`Son 4 letras y la A se repite 2 veces: $\dfrac{4!}{2!} = 12$.`]],
    ['En una carrera corren 8 atletas. ¿De cuántas maneras se puede armar el podio (1.º, 2.º y 3.º)?', 2, 336, [r`Importa el orden y no se repite: $V_{8,3} = 8 \cdot 7 \cdot 6 = 336$.`]],
    ['¿Cuántas claves de 4 dígitos (del 0 al 9) se pueden formar si los dígitos se pueden repetir?', 3, 10000, [r`$VR_{10,4} = 10^4 = 10.000$.`]],
    ['De un curso de 10 estudiantes se elige una comisión de 3. ¿Cuántas comisiones distintas se pueden formar?', 4, 120, [r`No importa el orden: $C_{10,3} = \dbinom{10}{3} = 120$.`]],
  ], [7, 3, 35, [r`$\dbinom{7}{3} = \dfrac{7!}{3! \cdot 4!} = 35$.`]],
  ['En un grupo hay 6 mujeres y 4 varones. Se eligen 3 personas al azar. ¿Cuál es la probabilidad de que sean exactamente 2 mujeres y 1 varón?', '1/2',
    [r`Casos posibles: $\dbinom{10}{3} = 120$.`, r`Casos favorables: $\dbinom{6}{2} \cdot \dbinom{4}{1} = 15 \cdot 4 = 60$.`, r`$P = \dfrac{60}{120} = \dfrac{1}{2}$.`]]),
]

const c2Ex1 = [
  logEquations(
    [r`\log_2(x^2) + \log_{16} x = 3 \cdot \log_4 x + \frac{3}{2}`, 4, [r`Con $t = \log_2 x$: $2t + \frac{t}{4} = \frac{3}{2}t + \frac{3}{2}$, entonces $t = 2$ y $x = 4$.`]],
    [r`\log_4 x - \log_4(x - 1) = \log_4(x - 3) + 4^{-0{,}5}`, [9, 33, 4], [r`Dominio: $x > 3$.`, r`$x = 2(x - 1)(x - 3)$, es decir, $2x^2 - 9x + 6 = 0$.`, r`Sirve $x = \dfrac{9 + \sqrt{33}}{4} \approx 3{,}69$.`]],
    [r`2 \cdot \ln x = \ln(7x - 12)`, ['3', '4'], [r`$x^2 - 7x + 12 = 0$, entonces $S = \{3 ; 4\}$.`]],
  ),
  logFunctions(
    [r`f(x) = \log_2(2x - 6) - 3`, { a: 1, b: 2, m: 2, n: -6, k: -3, position: 1 }],
    [r`g(x) = 2 \cdot \ln(-x + 3) - 2`, { a: 2, m: -1, n: 3, k: -2, position: 3 }],
  ),
  expFunctions(
    [r`f(x) = -\frac{1}{2} \cdot 6^x + 3`, { a: -0.5, b: 6, k: 3, position: 0 }],
    [r`g(x) = 4 \cdot 5^x - 1`, { a: 4, b: 5, k: -1, position: 2 }],
  ),
  productExercise(4, {
    f: (x) => 2 - x / 2, g: (x) => x * (x - 2), fAt: [-3.6, 4.4], gAt: [3.4, 4.5], window: [-5, 8, -4, 6],
    xs: [1, 4, 0, -1, 3], zeros: [0, 2, 4],
    pos: outer(0, 2, 4), neg: mixed(0, 2, 4), signOptions: [mixed(0, 2, 4), '(0 ; 2)', outer(0, 2, 4), '(−∞ ; 4)'],
    wrong: [(x) => -(2 - x / 2) * x * (x - 2), (x) => (2 - x / 2) * x * (x + 2), (x) => 2 - x / 2 + x * (x - 2)], position: 0,
  }),
  sturgesExercise({ n: 5, variable: 'Minutos', statement: 'Estos son los minutos que tardan 20 estudiantes en llegar a la escuela:', data: '45, 21, 44, 6, 17, 24, 15, 27, 23, 27, 29, 14, 5, 25, 18, 34, 17, 29, 28, 26.',
    min: 5, max: 45, amplitude: 8, freqs: [2, 5, 8, 3, 2],
    compare: { statement: 'Compará la variabilidad de los puntajes de dos cursos.', names: ['Curso A', 'Curso B'], groups: [[3, 9, 11, 12, 15], [18, 24, 26, 27, 30]] } }),
  countingExercise(6, [
    ['¿De cuántas maneras se pueden ubicar 6 personas en una fila?', 0, 720, [r`$P_6 = 6! = 720$.`]],
    ['¿Cuántos anagramas se pueden formar con las letras de la palabra BANANA?', 1, 60, [r`6 letras: la A se repite 3 veces y la N, 2: $\dfrac{6!}{3! \cdot 2!} = 60$.`]],
    ['Entre 10 estudiantes se eligen presidente, secretario y tesorero. ¿De cuántas maneras puede hacerse?', 2, 720, [r`$V_{10,3} = 10 \cdot 9 \cdot 8 = 720$.`]],
    ['¿Cuántos códigos de 3 letras se pueden armar con A, B, C, D y E si las letras se pueden repetir?', 3, 125, [r`$VR_{5,3} = 5^3 = 125$.`]],
    ['Un entrenador tiene 12 jugadores. ¿Cuántos equipos distintos de 5 puede formar, sin tener en cuenta los puestos?', 4, 792, [r`$C_{12,5} = \dbinom{12}{5} = 792$.`]],
  ], [8, 2, 28, [r`$\dbinom{8}{2} = \dfrac{8 \cdot 7}{2} = 28$.`]],
  ['En una bolsa hay 5 bolitas rojas y 3 azules. Se sacan 2 a la vez. ¿Cuál es la probabilidad de que las dos sean rojas?', '5/14',
    [r`Casos posibles: $\dbinom{8}{2} = 28$. Favorables: $\dbinom{5}{2} = 10$.`, r`$P = \dfrac{10}{28} = \dfrac{5}{14}$.`]]),
]

const c2Ex2 = [
  logEquations(
    [r`\log_5(x^2) + \log_{625} x = 3 \cdot \log_{25} x + \frac{3}{2}`, 25, [r`Con $t = \log_5 x$: $2t + \frac{t}{4} = \frac{3}{2}t + \frac{3}{2}$, entonces $t = 2$ y $x = 25$.`]],
    [r`\log_{25} x - \log_{25}(x - 2) = \log_{25}(x - 3) + 4^{-0{,}5}`, [13, 19, 5], [r`Dominio: $x > 3$.`, r`$x = 5(x - 2)(x - 3)$, es decir, $5x^2 - 26x + 30 = 0$.`, r`Sirve $x = \dfrac{13 + \sqrt{19}}{5} \approx 3{,}47$.`]],
    [r`2 \cdot \ln x = \ln(6x - 8)`, ['2', '4'], [r`$x^2 - 6x + 8 = 0$, entonces $S = \{2 ; 4\}$.`]],
  ),
  logFunctions(
    [r`f(x) = \log_4(2x - 4) - 2`, { a: 1, b: 4, m: 2, n: -4, k: -2, position: 3 }],
    [r`g(x) = 3 \cdot \ln(-x + 1) - 3`, { a: 3, m: -1, n: 1, k: -3, position: 1 }],
  ),
  expFunctions(
    [r`f(x) = -\frac{1}{3} \cdot 9^x + 3`, { a: -1 / 3, b: 9, k: 3, position: 2 }],
    [r`g(x) = 3 \cdot 4^x - 2`, { a: 3, b: 4, k: -2, position: 0 }],
  ),
  productExercise(4, {
    f: (x) => x + 2, g: (x) => x * (x - 3), fAt: [3.2, 5.4], gAt: [-1.9, 5.4], window: [-5, 8, -4, 6],
    xs: [1, 2, 0, -1, 3], zeros: [-2, 0, 3],
    pos: mixed(-2, 0, 3), neg: outer(-2, 0, 3), signOptions: [outer(-2, 0, 3), '(0 ; 3)', mixed(-2, 0, 3), '(−2 ; +∞)'],
    wrong: [(x) => -(x + 2) * x * (x - 3), (x) => (x - 2) * x * (x - 3), (x) => x + 2 + x * (x - 3)], position: 1,
  }),
  sturgesExercise({ n: 5, variable: 'Peso (kg)', statement: 'Estos son los pesos, en kilogramos, de 20 estudiantes:', data: '50, 52, 59, 47, 52, 67, 70, 62, 54, 44, 40, 49, 56, 44, 56, 57, 48, 55, 59, 63.',
    min: 40, max: 70, amplitude: 6, freqs: [3, 4, 7, 4, 2],
    compare: { statement: 'Compará la variabilidad de las mediciones de dos máquinas.', names: ['Máquina A', 'Máquina B'], groups: [[7, 9, 10, 11, 13], [9, 15, 17, 18, 21]] } }),
  countingExercise(6, [
    ['¿De cuántas maneras se pueden ordenar 7 canciones distintas en una lista?', 0, 5040, [r`$P_7 = 7! = 5040$.`]],
    ['¿Cuántos anagramas se pueden formar con las letras de la palabra COCOA?', 1, 30, [r`5 letras: la C y la O se repiten 2 veces: $\dfrac{5!}{2! \cdot 2!} = 30$.`]],
    ['Se arma una bandera de 3 franjas de colores distintos, eligiendo entre 7 colores. ¿Cuántas banderas se pueden hacer?', 2, 210, [r`$V_{7,3} = 7 \cdot 6 \cdot 5 = 210$.`]],
    ['Una prueba tiene 5 preguntas de verdadero o falso. ¿De cuántas maneras se puede responder completa?', 3, 32, [r`$VR_{2,5} = 2^5 = 32$.`]],
    ['Una heladería tiene 12 gustos. ¿Cuántas combinaciones de 3 gustos distintos se pueden pedir?', 4, 220, [r`$C_{12,3} = \dbinom{12}{3} = 220$.`]],
  ], [9, 4, 126, [r`$\dbinom{9}{4} = \dfrac{9!}{4! \cdot 5!} = 126$.`]],
  ['De un mazo español de 40 cartas (10 de cada palo) se sacan 2 cartas a la vez. ¿Cuál es la probabilidad de que las dos sean de oro?', '3/52',
    [r`Casos posibles: $\dbinom{40}{2} = 780$. Favorables: $\dbinom{10}{2} = 45$.`, r`$P = \dfrac{45}{780} = \dfrac{3}{52}$.`]]),
]

export const SECTION_5A = {
  terms: [
    { id: '1', title: '1.er cuatrimestre', topics: 'Módulo: ecuaciones y funciones · Ecuaciones exponenciales',
      activities: activitySet('5A-c1', 2026, c1Modelo, c1Ex1, c1Ex2) },
    { id: '2', title: '2.º cuatrimestre', topics: 'Logaritmos · Función exponencial · Producto de funciones · Estadística · Combinatoria y probabilidad',
      activities: activitySet('5A-c2', 2026, c2Modelo, c2Ex1, c2Ex2) },
  ],
}
