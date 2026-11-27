// Examen 3: pensado para 120 minutos. Mismas 7 categorías que el Examen 1 (así las estadísticas se suman).
import { mix } from './examData'

const r = String.raw

export const SECTIONS3 = [
  { id: 1, title: 'Números naturales: cálculos combinados', pts: 10 },
  { id: 2, title: 'Cálculos con decimales, fracciones, potencias y raíces', pts: 10 },
  { id: 3, title: 'Ecuaciones en N', pts: 10 },
  { id: 4, title: 'Ecuaciones con racionales', pts: 15 },
  { id: 5, title: 'Situaciones problemáticas', pts: 20 },
  { id: 6, title: 'Ángulos', pts: 20 },
  { id: 7, title: 'Triángulos, Pitágoras y medidas', pts: 15 },
]

// El id lleva el prefijo «C» para no pisar las respuestas de los otros exámenes; «n» es lo que se muestra.
const q = (n, sec, pts, prompt, options, answer, steps, fig) => ({ id: `C${n}`, n, sec, pts, prompt, options, answer, steps, fig })

// En todas, la respuesta correcta se escribe primera (answer = 0); mix() desordena las opciones.
const RAW = [
  q('1a', 1, 5, r`Resolvé: $(400 - 4 \cdot 9) : 2^2 + \sqrt{18} \cdot \sqrt{2} - \sqrt{49} \cdot \sqrt{36} + 5^4 \cdot 5^3 : 5^5$`,
    ['80', '60', '164', '75'], 0, [
      r`$400 - 36 = 364$ y $364 : 4 = 91$.`,
      r`$\sqrt{18} \cdot \sqrt{2} = \sqrt{36} = 6$ y $\sqrt{49} \cdot \sqrt{36} = 7 \cdot 6 = 42$.`,
      r`$5^{4+3-5} = 5^2 = 25$.`,
      r`$91 + 6 - 42 + 25 = 80$.`,
    ]),
  q('1b', 1, 5, r`Resolvé: $(90 - 4^3) \cdot 6 : 4 - 72 : 8 + \sqrt{(56 : 7 + 7)^2 + 8 \cdot 8}$`,
    ['47', '53', '30', '319'], 0, [
      r`$(90 - 64) \cdot 6 : 4 = 26 \cdot 6 : 4 = 39$.`,
      r`$72 : 8 = 9$.`,
      r`$(8 + 7)^2 + 64 = 225 + 64 = 289$ y $\sqrt{289} = 17$.`,
      r`$39 - 9 + 17 = 47$.`,
    ]),
  q('2a', 2, 5, r`Resolvé: $(0{,}7)^6 : (0{,}7)^4 + \sqrt{3} \cdot \sqrt{48} - \sqrt[3]{4 + 12 \cdot 5} + \left(\frac{1}{10}\right)^5 : \left(\frac{1}{10}\right)^3$`,
    ['8,5', '9,41', '16,5', '8,59'], 0, [
      r`$(0{,}7)^2 = 0{,}49$.`,
      r`$\sqrt{3} \cdot \sqrt{48} = \sqrt{144} = 12$.`,
      r`$\sqrt[3]{64} = 4$.`,
      r`$\left(\frac{1}{10}\right)^2 = 0{,}01$.`,
      r`$0{,}49 + 12 - 4 + 0{,}01 = 8{,}5$.`,
    ]),
  q('2b', 2, 5, r`Resolvé: $\left[(1{,}2)^4 : (1{,}2)^3\right]^2 - \sqrt[4]{\frac{1}{16}} + \sqrt[3]{\frac{8}{125}} - \left(\frac{3}{8} : \frac{9}{4} + \frac{1}{3}\right)^2$`,
    ['1,09', '1,34', '0,84', '1,59'], 0, [
      r`Corchete: $(1{,}2)^2 = 1{,}44$.`,
      r`$\sqrt[4]{\frac{1}{16}} = \frac{1}{2} = 0{,}5$ y $\sqrt[3]{\frac{8}{125}} = \frac{2}{5} = 0{,}4$.`,
      r`Paréntesis: $\frac{3}{8} \cdot \frac{4}{9} = \frac{1}{6}$; $\frac{1}{6} + \frac{1}{3} = \frac{1}{2}$; al cuadrado, $0{,}25$.`,
      r`$1{,}44 - 0{,}5 + 0{,}4 - 0{,}25 = 1{,}09$.`,
    ]),
  q('3a', 3, 5, r`Hallá $x$ y verificá: $8 + 4 \cdot (x - 3) = 3 \cdot (x + 2)$`,
    [r`$x = 10$`, r`$x = 1$`, r`$x = 6$`, r`$x = 14$`], 0, [
      r`$8 + 4x - 12 = 3x + 6$, es decir, $4x - 4 = 3x + 6$.`,
      r`$x = 10$.`,
      r`Verifico: $8 + 4 \cdot 7 = 36$ y $3 \cdot 12 = 36$. ✓`,
    ]),
  q('3b', 3, 5, r`Hallá $x$ y verificá: $5x + 2 \cdot (4x - 3) + 3 \cdot (x + 2) = 64$`,
    [r`$x = 4$`, r`$x = 5$`, r`$x = 3$`, r`$x = 8$`], 0, [
      r`$5x + 8x - 6 + 3x + 6 = 64$.`,
      r`$16x = 64$, entonces $x = 4$.`,
      r`Verifico: $20 + 2 \cdot 13 + 3 \cdot 6 = 64$. ✓`,
    ]),
  q('4a', 4, 5, r`Hallá $x$ y verificá: $\frac{1}{4} + \frac{2}{3} \cdot \left(\sqrt{x} - \frac{3}{4}\right) = \frac{7}{4}$`,
    [r`$x = 9$`, r`$x = 3$`, r`$x = 81$`, r`$x = \frac{9}{4}$`], 0, [
      r`$\frac{2}{3} \cdot \left(\sqrt{x} - \frac{3}{4}\right) = \frac{3}{2}$.`,
      r`$\sqrt{x} - \frac{3}{4} = \frac{9}{4}$, entonces $\sqrt{x} = 3$ y $x = 9$.`,
      r`Verifico: $\frac{1}{4} + \frac{2}{3} \cdot \frac{9}{4} = \frac{1}{4} + \frac{3}{2} = \frac{7}{4}$. ✓`,
    ]),
  q('4b', 4, 5, r`Hallá $x$ y verificá: $\sqrt{\frac{2}{5}x + 1} - 0{,}5 = \frac{5}{2}$`,
    [r`$x = 20$`, r`$x = 5$`, r`$x = \frac{25}{2}$`, r`$x = \frac{45}{2}$`], 0, [
      r`$\sqrt{\frac{2}{5}x + 1} = \frac{5}{2} + \frac{1}{2} = 3$.`,
      r`$\frac{2}{5}x + 1 = 9$, entonces $\frac{2}{5}x = 8$ y $x = 20$.`,
      r`Verifico: $\sqrt{9} - 0{,}5 = 2{,}5$. ✓`,
    ]),
  q('4c', 4, 5, r`Hallá $x$ y verificá: $\left(\frac{7}{3}x - \frac{3}{4}\right) : \frac{5}{2} = \frac{2}{5}x$`,
    [r`$x = \frac{9}{16}$`, r`$x = \frac{16}{9}$`, r`$x = \frac{9}{40}$`, r`$x = \frac{45}{163}$`], 0, [
      r`$\frac{7}{3}x - \frac{3}{4} = \frac{2}{5}x \cdot \frac{5}{2} = x$.`,
      r`$\frac{4}{3}x = \frac{3}{4}$.`,
      r`$x = \frac{3}{4} : \frac{4}{3} = \frac{9}{16}$.`,
      r`Verifico: ambos miembros dan $\frac{9}{40}$. ✓`,
    ]),
  q('5a', 5, 6, 'De un rollo de cable se usa la tercera parte en una obra. Después, se usan las tres quintas partes de lo que quedaba en otra, y todavía sobran 80 metros. ¿Cuántos metros tenía el rollo?',
    ['300 metros', '200 metros', '133 metros', '1200 metros'], 0, [
      r`Después de la primera obra quedan $\frac{2}{3}$.`,
      r`Sobran $\frac{2}{5}$ de ese resto: $\frac{2}{5} \cdot \frac{2}{3} = \frac{4}{15}$.`,
      r`$\frac{4}{15}x = 80$, entonces $x = 300$ m.`,
    ]),
  q('5b', 5, 2, 'Con el rollo del ejercicio 5a, ¿cuántos metros se usaron en cada obra?',
    ['100 m en la primera y 120 m en la segunda', '100 m en la primera y 180 m en la segunda', '200 m en la primera y 20 m en la segunda', '120 m en la primera y 100 m en la segunda'], 0, [
      r`Primera obra: $300 : 3 = 100$ m. Quedan $200$ m.`,
      r`Segunda obra: $\frac{3}{5} \cdot 200 = 120$ m.`,
      r`Verifico: $100 + 120 + 80 = 300$. ✓`,
    ]),
  q('5c', 5, 4, 'Un listón de madera de 96 cm se corta en dos partes. Una mide 14 cm más que la otra. ¿Cuánto mide cada parte?',
    ['41 cm y 55 cm', '34 cm y 62 cm', '48 cm y 62 cm', '41 cm y 48 cm'], 0, [
      r`$x + (x + 14) = 96$.`,
      r`$2x = 82$, entonces $x = 41$. La otra parte mide $55$ cm.`,
    ]),
  q('5d', 5, 4, r`Un televisor cuesta \$480.000. Se compra en 12 cuotas iguales con un recargo del 18%. ¿Cuál es el valor de cada cuota?`,
    [r`\$47.200`, r`\$40.000`, r`\$32.800`, r`\$41.500`], 0, [
      r`Recargo: $480000 \cdot 18 : 100 = 86400$.`,
      r`Total: $566400$. Cada cuota: $566400 : 12 = 47200$.`,
    ]),
  q('5e', 5, 4, r`La entrada a un museo cuesta \$6.000 y tiene un 30% de descuento para estudiantes. ¿Cuánto paga en total un grupo de 5 personas en el que 3 son estudiantes?`,
    [r`\$24.600`, r`\$21.000`, r`\$25.800`, r`\$17.400`], 0, [
      r`Cada estudiante paga el 70%: $4200$.`,
      r`$3 \cdot 4200 + 2 \cdot 6000 = 24600$.`,
    ]),
  q('6a', 6, 1, r`Observá la figura: $\overleftrightarrow{MR}$ y $\overleftrightarrow{NS}$ son rectas y $N\hat{O}Q$ es recto. El complemento de $N\hat{O}P$ es:`,
    [r`$P\hat{O}Q$`, r`$Q\hat{O}R$`, r`$M\hat{O}N$`, r`$M\hat{O}P$`], 0, [
      r`$N\hat{O}P + P\hat{O}Q = N\hat{O}Q = 90°$.`,
    ], 'rayos3'),
  q('6b', 6, 1, r`En la misma figura, el suplemento de $N\hat{O}T$ es:`,
    [r`$T\hat{O}S$`, r`$T\hat{O}R$`, r`$M\hat{O}T$`, r`$Q\hat{O}S$`], 0, [
      r`Como $\overleftrightarrow{NS}$ es una recta, $N\hat{O}T + T\hat{O}S = 180°$.`,
    ], 'rayos3'),
  q('6c', 6, 1, r`En la misma figura, el opuesto por el vértice de $M\hat{O}N$ es:`,
    [r`$R\hat{O}S$`, r`$M\hat{O}S$`, r`$N\hat{O}R$`, r`$P\hat{O}Q$`], 0, [
      r`Los lados opuestos a $\overrightarrow{OM}$ y $\overrightarrow{ON}$ son $\overrightarrow{OR}$ y $\overrightarrow{OS}$.`,
    ], 'rayos3'),
  q('6d', 6, 1, r`En la misma figura, un ángulo adyacente a $M\hat{O}Q$ es:`,
    [r`$Q\hat{O}R$`, r`$Q\hat{O}P$`, r`$M\hat{O}T$`, r`$R\hat{O}S$`], 0, [
      r`Comparten el lado $\overrightarrow{OQ}$ y los otros lados, $\overrightarrow{OM}$ y $\overrightarrow{OR}$, forman una recta.`,
    ], 'rayos3'),
  q('6e', 6, 4, r`Las rectas $a$ y $b$ son paralelas. $\hat{\delta} = 3x + 15°$ y $\hat{\varepsilon} = 5x + 5°$. ¿Cuánto miden $\hat{\delta}$, $\hat{\varepsilon}$ y $\hat{\alpha}$?`,
    [r`$\hat{\delta} = \hat{\alpha} = 75°$ y $\hat{\varepsilon} = 105°$`, r`$\hat{\delta} = \hat{\alpha} = 105°$ y $\hat{\varepsilon} = 75°$`, r`$\hat{\delta} = \hat{\varepsilon} = 30°$ y $\hat{\alpha} = 150°$`, r`$\hat{\delta} = 75°$, $\hat{\varepsilon} = 105°$ y $\hat{\alpha} = 105°$`], 0, [
      r`$\hat{\alpha}$ es correspondiente con $\hat{\delta}$ y adyacente con $\hat{\varepsilon}$. Entonces $\hat{\delta} + \hat{\varepsilon} = 180°$.`,
      r`$8x + 20 = 180$, entonces $x = 20°$.`,
      r`$\hat{\delta} = \hat{\alpha} = 75°$ y $\hat{\varepsilon} = 105°$.`,
    ], 'delta'),
  q('6f', 6, 5, r`Resolvé: $(47°\,38' \cdot 3 - 68°\,25'\,32'') : 4$`,
    [r`$18°\,37'\,7''$`, r`$18°\,7'\,7''$`, r`$19°\,7'\,7''$`, r`$52°\,49'\,23''$`], 0, [
      r`$47°\,38' \cdot 3 = 141°\,114' = 142°\,54'$.`,
      r`$142°\,54' - 68°\,25'\,32'' = 74°\,28'\,28''$.`,
      r`$74° : 4 = 18°$ y sobran $2° = 120'$.`,
      r`$148' : 4 = 37'$ y $28'' : 4 = 7''$.`,
    ]),
  q('6g', 6, 3, r`Hallá la amplitud del ángulo rojo $\hat{\beta}$. Los tres ángulos de la figura forman un ángulo llano.`,
    [r`$62°\,35'\,37''$`, r`$63°\,36'\,37''$`, r`$62°\,35'\,23''$`, r`$117°\,24'\,23''$`], 0, [
      r`$52°\,36'\,48'' + 64°\,47'\,35'' = 117°\,24'\,23''$.`,
      r`$\hat{\beta} = 179°\,59'\,60'' - 117°\,24'\,23'' = 62°\,35'\,37''$.`,
    ], 'rojo3'),
  q('6h', 6, 2, r`La bisectriz de un ángulo obtuso de $153°\,18'$ lo divide en dos ángulos. ¿Cuánto mide cada uno?`,
    [r`$76°\,39'$`, r`$76°\,9'$`, r`$77°\,9'$`, r`$26°\,42'$`], 0, [
      r`$153° : 2 = 76°$ y sobra $1° = 60'$.`,
      r`$(60' + 18') : 2 = 39'$.`,
    ]),
  q('6i', 6, 2, r`En la figura, $a \parallel b$. ¿Cuál es un par de ángulos alternos externos?`,
    [r`$\angle 2$ y $\angle 8$`, r`$\angle 2$ y $\angle 7$`, r`$\angle 2$ y $\angle 6$`, r`$\angle 3$ y $\angle 5$`], 0, [
      r`Los alternos externos están fuera de las paralelas y en distinto lado de la transversal: $2$ y $8$.`,
      r`$2$ y $7$ son conjugados externos; $2$ y $6$, correspondientes; $3$ y $5$, alternos internos.`,
    ], true),
  q('7a', 7, 4, 'Un cable tensor de 52 m va desde la punta de un poste vertical hasta el suelo, a 20 m de la base. Usando el teorema de Pitágoras, ¿cuál es la altura del poste?',
    ['48 m', '32 m', '72 m', '56 m'], 0, [
      r`El cable es la hipotenusa: $h^2 = 52^2 - 20^2$.`,
      r`$h^2 = 2704 - 400 = 2304$, entonces $h = 48$ m.`,
    ], 'poste'),
  q('7b', 7, 5, r`En el triángulo $MOR$ es $\overline{OM} = \overline{OR}$, $\hat{O} = 3x + 4°$ y $\hat{M} = 2x + 4°$. El ángulo $\hat{\alpha}$ es el exterior en $O$. ¿Cuánto miden los ángulos interiores y $\hat{\alpha}$?`,
    [r`$\hat{O} = 76°$, $\hat{M} = \hat{R} = 52°$, $\hat{\alpha} = 104°$`, r`$\hat{O} = 52°$, $\hat{M} = \hat{R} = 76°$, $\hat{\alpha} = 128°$`, r`$\hat{O} = 76°$, $\hat{M} = \hat{R} = 52°$, $\hat{\alpha} = 128°$`, r`$\hat{O} = 70°$, $\hat{M} = \hat{R} = 55°$, $\hat{\alpha} = 110°$`], 0, [
      r`Como $\overline{OM} = \overline{OR}$, es $\hat{R} = \hat{M}$.`,
      r`$3x + 4 + 2 \cdot (2x + 4) = 180$, entonces $7x + 12 = 180$ y $x = 24°$.`,
      r`$\hat{O} = 76°$, $\hat{M} = \hat{R} = 52°$ y $\hat{\alpha} = 180° - 76° = 104°$.`,
    ], 'triangulo'),
  q('7c', 7, 4, r`En el trapecio rectángulo de la figura, la base mayor mide $0{,}19$ m, la base menor $1{,}1$ dm y la altura 150 mm. ¿Cuánto mide el lado oblicuo $\overline{PQ}$?`,
    ['17 cm', '23 cm', '15,5 cm', '13 cm'], 0, [
      r`En cm: base mayor $19$, base menor $11$ y altura $15$.`,
      r`Catetos: $15$ y $19 - 11 = 8$. $\overline{PQ} = \sqrt{15^2 + 8^2} = \sqrt{289} = 17$ cm.`,
    ], 'trapecio3'),
  q('7d', 7, 2, 'Calculá el perímetro y el área del trapecio del ejercicio 7c.',
    [r`Perímetro: 62 cm; área: 225 cm²`, r`Perímetro: 62 cm; área: 450 cm²`, r`Perímetro: 60 cm; área: 225 cm²`, r`Perímetro: 62 cm; área: 285 cm²`], 0, [
      r`Perímetro: $19 + 17 + 11 + 15 = 62$ cm.`,
      r`Área: $\frac{(19 + 11) \cdot 15}{2} = 225$ cm².`,
    ], 'trapecio3'),
]

export const QUESTIONS3 = mix(RAW)
export const TOTAL3 = QUESTIONS3.reduce((s, x) => s + x.pts, 0)
