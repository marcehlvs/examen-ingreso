// 1.º año, sección A. «Modelo 2026» transcribe los modelos del profesor; en el 2.º cuatrimestre
// el último punto (ángulos con incógnita) se reemplazó por el de estadística.
import { num, sel, item, calc, angleCalc, factorItem, inverseExercise, statsExercise } from './builders'

const r = String.raw

// ---------- Ejercicios del 1.er cuatrimestre ----------
const props = (a, b) => ({
  n: 1, title: 'Potenciación y radicación',
  statement: 'Resolvé aplicando las propiedades de la potenciación y de la radicación cuando sea posible.',
  items: [calc('1a', ...a), calc('1b', ...b)],
})
const factors = (a, b) => ({
  n: 2, title: 'M.C.M. y D.C.M.',
  statement: 'Calculá el mínimo común múltiplo (M.C.M.) y el divisor común mayor (D.C.M.), factorizando previamente.',
  items: [factorItem('2a', ...a), factorItem('2b', ...b)],
})
const rationals = (a, b) => ({
  n: 3, title: 'Operaciones combinadas con racionales',
  statement: 'Resolvé. Podés escribir el resultado como número entero o fracción (por ejemplo, 7/6).',
  items: [calc('3a', ...a), calc('3b', ...b)],
})
const share = (statement, labels, answers, steps) => ({
  n: 4, title: 'Situación problemática',
  statement,
  items: [item('4', '', labels.map((label, i) => num(answers[i], { label, aria: `${label}:` })), steps)],
})

// ---------- Ejercicios del 2.º cuatrimestre ----------
const decimals = (a, b) => ({
  n: 1, title: 'Cálculos con decimales',
  statement: 'Resolvé y expresá el resultado en forma decimal.',
  items: [calc('1a', ...a), calc('1b', ...b)],
})
const discount = (statement, answer, steps) => ({
  n: 2, title: 'Porcentaje',
  statement,
  items: [item('2', '', [num(answer, { label: 'Total a pagar', aria: 'Total:', prefix: '$' })], steps)],
})
const angles = (a, b) => ({
  n: 4, title: 'Operaciones con ángulos',
  statement: 'Resolvé. Completá grados, minutos y segundos (escribí 0 si hace falta).',
  items: [angleCalc('4a', ...a), angleCalc('4b', ...b)],
})

// ====================== 1.er cuatrimestre ======================
const c1Modelo = [
  props(
    [r`\sqrt{2} \cdot \sqrt{32} + (8 - 3)^2 : (250 : 10)`, 9, [
      r`Radicación distributiva respecto del producto: $\sqrt{2} \cdot \sqrt{32} = \sqrt{64} = 8$.`,
      r`$(8 - 3)^2 = 5^2 = 25$ y $250 : 10 = 25$.`, r`$8 + 25 : 25 = 8 + 1 = 9$.`]],
    [r`(10 - 2 \cdot 3)^2 : (2^0 + 3) + \sqrt[3]{125}`, 9, [
      r`$(10 - 6)^2 = 4^2 = 16$.`, r`$2^0 + 3 = 1 + 3 = 4$ y $\sqrt[3]{125} = 5$.`, r`$16 : 4 + 5 = 9$.`]],
  ),
  factors(
    [[9, 36, 72], 72, 9, [r`$9 = 3^2$ ; $36 = 2^2 \cdot 3^2$ ; $72 = 2^3 \cdot 3^2$.`,
      r`M.C.M.: factores comunes y no comunes con el mayor exponente: $2^3 \cdot 3^2 = 72$.`,
      r`D.C.M.: factores comunes con el menor exponente: $3^2 = 9$.`]],
    [[24, 30, 56], 840, 2, [r`$24 = 2^3 \cdot 3$ ; $30 = 2 \cdot 3 \cdot 5$ ; $56 = 2^3 \cdot 7$.`,
      r`M.C.M. $= 2^3 \cdot 3 \cdot 5 \cdot 7 = 840$.`, r`D.C.M. $= 2$ (el único factor común a los tres).`]],
  ),
  rationals(
    [r`\frac{3}{4} : \frac{9}{16} + \sqrt{\frac{1}{4}} - \frac{5}{6}`, 1, [
      r`$\frac{3}{4} : \frac{9}{16} = \frac{3}{4} \cdot \frac{16}{9} = \frac{4}{3}$.`, r`$\sqrt{\frac{1}{4}} = \frac{1}{2}$.`,
      r`$\frac{4}{3} + \frac{1}{2} - \frac{5}{6} = \frac{8 + 3 - 5}{6} = 1$.`]],
    [r`\left(\frac{1}{3} + \frac{1}{6}\right)^2 + \sqrt[5]{\frac{32}{243}} + \left(\frac{9}{15}\right)^0`, '23/12', [
      r`$\left(\frac{1}{3} + \frac{1}{6}\right)^2 = \left(\frac{1}{2}\right)^2 = \frac{1}{4}$.`,
      r`$\sqrt[5]{\frac{32}{243}} = \frac{2}{3}$ y $\left(\frac{9}{15}\right)^0 = 1$.`,
      r`$\frac{1}{4} + \frac{2}{3} + 1 = \frac{3 + 8 + 12}{12} = \frac{23}{12}$.`]],
  ),
  share('Camila preparó 324 galletitas y 300 bombones para repartir en su cumpleaños y los quiere poner en bolsas que tengan la misma cantidad de cada tipo. ¿Cuántas bolsas se pueden armar como máximo? ¿Qué cantidad de galletitas y bombones tendrá cada bolsa?',
    ['Cantidad máxima de bolsas', 'Galletitas por bolsa', 'Bombones por bolsa'], [12, 27, 25], [
      'Como se busca la mayor cantidad de bolsas iguales, se calcula el D.C.M.',
      r`$324 = 2^2 \cdot 3^4$ y $300 = 2^2 \cdot 3 \cdot 5^2$. D.C.M. $= 2^2 \cdot 3 = 12$.`,
      r`Galletitas: $324 : 12 = 27$. Bombones: $300 : 12 = 25$.`]),
]

const c1Ex1 = [
  props(
    [r`\sqrt{3} \cdot \sqrt{27} + (9 - 3)^2 : (120 : 10)`, 12, [
      r`$\sqrt{3} \cdot \sqrt{27} = \sqrt{81} = 9$.`, r`$6^2 : 12 = 36 : 12 = 3$.`, r`$9 + 3 = 12$.`]],
    [r`(15 - 3 \cdot 4)^3 : (5^0 + 8) + \sqrt[3]{64}`, 7, [
      r`$(15 - 12)^3 = 3^3 = 27$.`, r`$5^0 + 8 = 9$ y $\sqrt[3]{64} = 4$.`, r`$27 : 9 + 4 = 7$.`]],
  ),
  factors(
    [[12, 18, 60], 180, 6, [r`$12 = 2^2 \cdot 3$ ; $18 = 2 \cdot 3^2$ ; $60 = 2^2 \cdot 3 \cdot 5$.`,
      r`M.C.M. $= 2^2 \cdot 3^2 \cdot 5 = 180$.`, r`D.C.M. $= 2 \cdot 3 = 6$.`]],
    [[28, 42, 70], 420, 14, [r`$28 = 2^2 \cdot 7$ ; $42 = 2 \cdot 3 \cdot 7$ ; $70 = 2 \cdot 5 \cdot 7$.`,
      r`M.C.M. $= 2^2 \cdot 3 \cdot 5 \cdot 7 = 420$.`, r`D.C.M. $= 2 \cdot 7 = 14$.`]],
  ),
  rationals(
    [r`\frac{2}{5} : \frac{4}{15} + \sqrt{\frac{4}{9}} - \frac{7}{6}`, 1, [
      r`$\frac{2}{5} \cdot \frac{15}{4} = \frac{3}{2}$ y $\sqrt{\frac{4}{9}} = \frac{2}{3}$.`,
      r`$\frac{3}{2} + \frac{2}{3} - \frac{7}{6} = \frac{9 + 4 - 7}{6} = 1$.`]],
    [r`\left(\frac{1}{2} + \frac{1}{4}\right)^2 + \sqrt[3]{\frac{8}{27}} + \left(\frac{5}{7}\right)^0`, '107/48', [
      r`$\left(\frac{3}{4}\right)^2 = \frac{9}{16}$.`, r`$\sqrt[3]{\frac{8}{27}} = \frac{2}{3}$ y $\left(\frac{5}{7}\right)^0 = 1$.`,
      r`$\frac{9}{16} + \frac{2}{3} + 1 = \frac{27 + 32 + 48}{48} = \frac{107}{48}$.`]],
  ),
  share('Bruno tiene 168 alfajores y 180 caramelos para repartir en bolsas que tengan la misma cantidad de cada tipo, sin que sobre nada. ¿Cuántas bolsas puede armar como máximo? ¿Cuántos alfajores y caramelos tendrá cada bolsa?',
    ['Cantidad máxima de bolsas', 'Alfajores por bolsa', 'Caramelos por bolsa'], [12, 14, 15], [
      r`$168 = 2^3 \cdot 3 \cdot 7$ y $180 = 2^2 \cdot 3^2 \cdot 5$.`, r`D.C.M. $= 2^2 \cdot 3 = 12$ bolsas.`,
      r`$168 : 12 = 14$ alfajores y $180 : 12 = 15$ caramelos.`]),
]

const c1Ex2 = [
  props(
    [r`\sqrt{5} \cdot \sqrt{20} + (11 - 5)^2 : (180 : 20)`, 14, [
      r`$\sqrt{5} \cdot \sqrt{20} = \sqrt{100} = 10$.`, r`$6^2 : 9 = 36 : 9 = 4$.`, r`$10 + 4 = 14$.`]],
    [r`(20 - 4 \cdot 3)^2 : (7^0 + 7) + \sqrt[4]{81}`, 11, [
      r`$(20 - 12)^2 = 64$.`, r`$7^0 + 7 = 8$ y $\sqrt[4]{81} = 3$.`, r`$64 : 8 + 3 = 11$.`]],
  ),
  factors(
    [[15, 45, 90], 90, 15, [r`$15 = 3 \cdot 5$ ; $45 = 3^2 \cdot 5$ ; $90 = 2 \cdot 3^2 \cdot 5$.`,
      r`M.C.M. $= 2 \cdot 3^2 \cdot 5 = 90$.`, r`D.C.M. $= 3 \cdot 5 = 15$.`]],
    [[36, 48, 60], 720, 12, [r`$36 = 2^2 \cdot 3^2$ ; $48 = 2^4 \cdot 3$ ; $60 = 2^2 \cdot 3 \cdot 5$.`,
      r`M.C.M. $= 2^4 \cdot 3^2 \cdot 5 = 720$.`, r`D.C.M. $= 2^2 \cdot 3 = 12$.`]],
  ),
  rationals(
    [r`\frac{5}{6} : \frac{10}{9} + \sqrt{\frac{9}{16}} - \frac{1}{4}`, '5/4', [
      r`$\frac{5}{6} \cdot \frac{9}{10} = \frac{3}{4}$ y $\sqrt{\frac{9}{16}} = \frac{3}{4}$.`,
      r`$\frac{3}{4} + \frac{3}{4} - \frac{1}{4} = \frac{5}{4}$.`]],
    [r`\left(\frac{1}{2} + \frac{1}{6}\right)^2 + \sqrt[4]{\frac{16}{81}} + \left(\frac{3}{11}\right)^0`, '19/9', [
      r`$\left(\frac{2}{3}\right)^2 = \frac{4}{9}$.`, r`$\sqrt[4]{\frac{16}{81}} = \frac{2}{3}$ y $\left(\frac{3}{11}\right)^0 = 1$.`,
      r`$\frac{4}{9} + \frac{2}{3} + 1 = \frac{4 + 6 + 9}{9} = \frac{19}{9}$.`]],
  ),
  share('En una florería hay 144 rosas y 120 claveles. Quieren armar ramos iguales usando todas las flores. ¿Cuántos ramos se pueden armar como máximo? ¿Cuántas rosas y claveles tendrá cada uno?',
    ['Cantidad máxima de ramos', 'Rosas por ramo', 'Claveles por ramo'], [24, 6, 5], [
      r`$144 = 2^4 \cdot 3^2$ y $120 = 2^3 \cdot 3 \cdot 5$.`, r`D.C.M. $= 2^3 \cdot 3 = 24$ ramos.`,
      r`$144 : 24 = 6$ rosas y $120 : 24 = 5$ claveles.`]),
]

// ====================== 2.º cuatrimestre ======================
const hoses = { xName: 'Cantidad de mangueras', yName: 'Tiempo (horas)', xShort: 'Mangueras:', yShort: 'Tiempo' }

const c2Modelo = [
  decimals(
    [r`6 - (4{,}5 - 3{,}6) \cdot (8{,}7 - 2{,}9) + 5`, '5,78', [
      r`Paréntesis: $4{,}5 - 3{,}6 = 0{,}9$ y $8{,}7 - 2{,}9 = 5{,}8$.`, r`$0{,}9 \cdot 5{,}8 = 5{,}22$.`, r`$6 - 5{,}22 + 5 = 5{,}78$.`]],
    [r`3 \cdot 2{,}5^0 - 1{,}2^2`, '1,56', [r`$2{,}5^0 = 1$ y $1{,}2^2 = 1{,}44$.`, r`$3 \cdot 1 - 1{,}44 = 1{,}56$.`]],
  ),
  discount(r`Luis compró 2 kg de pan en una panadería que cobraba \$2295,50 el kilo. Como había una promoción por llevar esa cantidad, le hicieron un 15% de descuento. ¿Cuánto pagó en total?`,
    '3902,35', [r`Sin descuento: $2 \cdot 2295{,}50 = 4591$.`, r`Descuento: $4591 \cdot 15 : 100 = 688{,}65$.`, r`$4591 - 688{,}65 = 3902{,}35$.`]),
  inverseExercise({ n: 3, k: 8, xs: [1, 2, 5], step: 0.4, yTick: 1, ...hoses,
    statement: 'Para llenar una pileta se utiliza una manguera de la que sale un flujo constante de agua. Esta manguera tarda 8 horas en llenar la pileta. Como necesitan llenarla más rápido, le agregan mangueras cuyo caudal es igual al de la primera.' }),
  angles(
    [r`$2 \cdot (15°\,32'\,56'') + 34°\,14'\,7''$`, [65, 19, 59], [
      r`$2 \cdot (15°\,32'\,56'') = 30°\,64'\,112'' = 31°\,5'\,52''$.`, r`$31°\,5'\,52'' + 34°\,14'\,7'' = 65°\,19'\,59''$.`]],
    [r`La tercera parte de un ángulo llano más el doble de $25°\,18'\,36''$.`, [110, 37, 12], [
      r`Tercera parte de un llano: $180° : 3 = 60°$.`, r`Doble: $2 \cdot (25°\,18'\,36'') = 50°\,36'\,72'' = 50°\,37'\,12''$.`,
      r`$60° + 50°\,37'\,12'' = 110°\,37'\,12''$.`]],
  ),
  statsExercise({ n: 5, variable: 'Deporte', statement: 'Se les preguntó a 20 estudiantes cuál es su deporte favorito. Estas fueron las respuestas:',
    data: 'Fútbol, Vóley, Fútbol, Básquet, Handball, Fútbol, Vóley, Fútbol, Básquet, Vóley, Fútbol, Handball, Básquet, Fútbol, Vóley, Fútbol, Handball, Básquet, Vóley, Fútbol.',
    categories: [{ label: 'Fútbol', f: 8 }, { label: 'Vóley', f: 5 }, { label: 'Básquet', f: 4 }, { label: 'Handball', f: 3 }] }),
]

const c2Ex1 = [
  decimals(
    [r`9 - (5{,}2 - 3{,}7) \cdot (7{,}4 - 3{,}6) + 2`, '5,3', [
      r`$5{,}2 - 3{,}7 = 1{,}5$ y $7{,}4 - 3{,}6 = 3{,}8$.`, r`$1{,}5 \cdot 3{,}8 = 5{,}7$.`, r`$9 - 5{,}7 + 2 = 5{,}3$.`]],
    [r`4 \cdot 3{,}7^0 - 1{,}5^2`, '1,75', [r`$3{,}7^0 = 1$ y $1{,}5^2 = 2{,}25$.`, r`$4 - 2{,}25 = 1{,}75$.`]],
  ),
  discount(r`María compró 3 kg de helado a \$4850,50 el kilo. Por pagar en efectivo le hicieron un 20% de descuento. ¿Cuánto pagó en total?`,
    '11641,2', [r`Sin descuento: $3 \cdot 4850{,}50 = 14551{,}50$.`, r`Descuento: $20\%$ de $14551{,}50 = 2910{,}30$.`, r`$14551{,}50 - 2910{,}30 = 11641{,}20$.`]),
  inverseExercise({ n: 3, k: 12, xs: [1, 3, 5], step: 0.4, yTick: 2, xName: 'Cantidad de canillas', yName: 'Tiempo (horas)', xShort: 'Canillas:', yShort: 'Tiempo',
    statement: 'Una canilla, con un flujo constante de agua, tarda 12 horas en llenar un tanque. Para llenarlo más rápido se abren otras canillas con el mismo caudal.' }),
  angles(
    [r`$3 \cdot (12°\,25'\,48'') + 20°\,50'\,30''$`, [58, 7, 54], [
      r`$3 \cdot (12°\,25'\,48'') = 36°\,75'\,144'' = 37°\,17'\,24''$.`, r`$37°\,17'\,24'' + 20°\,50'\,30'' = 57°\,67'\,54'' = 58°\,7'\,54''$.`]],
    [r`La cuarta parte de un ángulo llano más el doble de $32°\,41'\,50''$.`, [110, 23, 40], [
      r`$180° : 4 = 45°$.`, r`$2 \cdot (32°\,41'\,50'') = 64°\,82'\,100'' = 65°\,23'\,40''$.`, r`$45° + 65°\,23'\,40'' = 110°\,23'\,40''$.`]],
  ),
  statsExercise({ n: 5, variable: 'Transporte', statement: 'Se les preguntó a 20 estudiantes cómo van a la escuela. Estas fueron las respuestas:',
    data: 'Colectivo, A pie, Colectivo, Bicicleta, Colectivo, Auto, A pie, Colectivo, A pie, Bicicleta, Colectivo, A pie, Auto, Colectivo, A pie, Colectivo, Bicicleta, Colectivo, A pie, Colectivo.',
    categories: [{ label: 'Colectivo', f: 9 }, { label: 'A pie', f: 6 }, { label: 'Bicicleta', short: 'Bici', f: 3 }, { label: 'Auto', f: 2 }] }),
]

const c2Ex2 = [
  decimals(
    [r`8 - (6{,}3 - 5{,}1) \cdot (9{,}2 - 4{,}7) + 3`, '5,6', [
      r`$6{,}3 - 5{,}1 = 1{,}2$ y $9{,}2 - 4{,}7 = 4{,}5$.`, r`$1{,}2 \cdot 4{,}5 = 5{,}4$.`, r`$8 - 5{,}4 + 3 = 5{,}6$.`]],
    [r`5 \cdot 1{,}8^0 - 1{,}4^2`, '3,04', [r`$1{,}8^0 = 1$ y $1{,}4^2 = 1{,}96$.`, r`$5 - 1{,}96 = 3{,}04$.`]],
  ),
  discount(r`Una familia compró 4 kg de carne a \$7250,50 el kilo. Con una promoción le hicieron un 10% de descuento. ¿Cuánto pagó en total?`,
    '26101,8', [r`Sin descuento: $4 \cdot 7250{,}50 = 29002$.`, r`Descuento: $10\%$ de $29002 = 2900{,}20$.`, r`$29002 - 2900{,}20 = 26101{,}80$.`]),
  inverseExercise({ n: 3, k: 6, xs: [1, 3, 4], step: 0.5, yTick: 1, xName: 'Cantidad de bombas', yName: 'Tiempo (horas)', xShort: 'Bombas:', yShort: 'Tiempo',
    statement: 'Una bomba, con un caudal constante, tarda 6 horas en vaciar una cisterna. Para vaciarla más rápido se agregan bombas con el mismo caudal.' }),
  angles(
    [r`$2 \cdot (28°\,47'\,39'') - 19°\,50'\,25''$`, [37, 44, 53], [
      r`$2 \cdot (28°\,47'\,39'') = 56°\,94'\,78'' = 57°\,35'\,18''$.`, r`$57°\,35'\,18'' - 19°\,50'\,25'' = 37°\,44'\,53''$.`]],
    [r`La quinta parte de un ángulo llano más el triple de $14°\,25'\,30''$.`, [79, 16, 30], [
      r`$180° : 5 = 36°$.`, r`$3 \cdot (14°\,25'\,30'') = 42°\,75'\,90'' = 43°\,16'\,30''$.`, r`$36° + 43°\,16'\,30'' = 79°\,16'\,30''$.`]],
  ),
  statsExercise({ n: 5, variable: 'Hermanos', statement: 'Se les preguntó a 20 estudiantes cuántos hermanos tienen. Estas fueron las respuestas:',
    data: '1, 0, 2, 1, 3, 1, 0, 2, 1, 2, 0, 1, 3, 2, 1, 0, 2, 1, 0, 2.',
    categories: [{ label: '0', f: 5 }, { label: '1', f: 7 }, { label: '2', f: 6 }, { label: '3', f: 2 }] }),
]

const set = (cuatri, modelo, ex1, ex2) => [
  { slug: 'practica', mode: 'practica', title: 'Práctica: modelo 2026', description: 'El modelo de la intensificación. Comprobá cada ítem y mirá el desarrollo paso a paso.', exercises: modelo },
  { slug: 'examen-1', mode: 'examen', title: 'Examen 1', description: 'Se corrige todo al final.', exercises: ex1 },
  { slug: 'examen-2', mode: 'examen', title: 'Examen 2', description: 'Se corrige todo al final.', exercises: ex2 },
].map((a) => ({ ...a, id: `1A-${cuatri}-${a.slug}` }))

export const SECTION_1A = {
  terms: [
    { id: '1', title: '1.er cuatrimestre', topics: 'Potenciación y radicación · M.C.M. y D.C.M. · Racionales · Problemas', activities: set('c1', c1Modelo, c1Ex1, c1Ex2) },
    { id: '2', title: '2.º cuatrimestre', topics: 'Decimales · Porcentaje · Proporcionalidad · Ángulos · Estadística', activities: set('c2', c2Modelo, c2Ex1, c2Ex2) },
  ],
}
