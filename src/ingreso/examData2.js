// Examen 2: pensado para 120 minutos. Mismas 7 categorías que el Examen 1 (así las estadísticas se suman).
import { mix } from './examData'

const r = String.raw

export const SECTIONS2 = [
  { id: 1, title: 'Números naturales: cálculos combinados', pts: 10 },
  { id: 2, title: 'Cálculos con decimales, fracciones, potencias y raíces', pts: 10 },
  { id: 3, title: 'Ecuaciones en N', pts: 10 },
  { id: 4, title: 'Ecuaciones con racionales', pts: 15 },
  { id: 5, title: 'Situaciones problemáticas', pts: 20 },
  { id: 6, title: 'Ángulos', pts: 20 },
  { id: 7, title: 'Triángulos, Pitágoras y medidas', pts: 15 },
]

// El id lleva el prefijo «B» para no pisar las respuestas del Examen 1; «n» es lo que se muestra.
const q = (n, sec, pts, prompt, options, answer, steps, fig) => ({ id: `B${n}`, n, sec, pts, prompt, options, answer, steps, fig })

// En todas, la respuesta correcta se escribe primera (answer = 0); mix() desordena las opciones.
const RAW = [
  q('1a', 1, 5, r`Resolvé: $(500 - 7 \cdot 8) : 2^2 + \sqrt{12} \cdot \sqrt{3} - \sqrt{64} \cdot \sqrt{25} + 7^5 \cdot 7^2 : 7^6$`,
    ['84', '78', '164', '78,5'], 0, [
      r`Paréntesis: $7 \cdot 8 = 56$ y $500 - 56 = 444$. Luego $444 : 4 = 111$.`,
      r`$\sqrt{12} \cdot \sqrt{3} = \sqrt{36} = 6$.`,
      r`$\sqrt{64} \cdot \sqrt{25} = 8 \cdot 5 = 40$.`,
      r`Potencias de igual base: $7^{5+2-6} = 7^1 = 7$.`,
      r`$111 + 6 - 40 + 7 = 84$.`,
    ]),
  q('1b', 1, 5, r`Resolvé: $(130 - 5^3) \cdot 8 : 4 - 54 : 9 + \sqrt{(36 : 4 + 3)^2 + 5 \cdot 5}$`,
    ['17', '21', '13', '173'], 0, [
      r`Primer término: $(130 - 125) \cdot 8 : 4 = 5 \cdot 8 : 4 = 10$.`,
      r`Segundo término: $54 : 9 = 6$.`,
      r`Dentro de la raíz: $(9 + 3)^2 + 25 = 144 + 25 = 169$, y $\sqrt{169} = 13$.`,
      r`$10 - 6 + 13 = 17$.`,
    ]),

  q('2a', 2, 5, r`Resolvé: $(0{,}6)^5 : (0{,}6)^3 + \sqrt{2} \cdot \sqrt{50} - \sqrt[4]{1 + 5 \cdot 16} + \left(\frac{1}{5}\right)^7 : \left(\frac{1}{5}\right)^5$`,
    ['7,4', '8,24', '13,4', '7,56'], 0, [
      r`$(0{,}6)^{5-3} = (0{,}6)^2 = 0{,}36$.`,
      r`$\sqrt{2} \cdot \sqrt{50} = \sqrt{100} = 10$.`,
      r`$\sqrt[4]{81} = 3$.`,
      r`$\left(\frac{1}{5}\right)^{2} = \frac{1}{25} = 0{,}04$.`,
      r`$0{,}36 + 10 - 3 + 0{,}04 = 7{,}4$.`,
    ]),
  q('2b', 2, 5, r`Resolvé: $\left[(2{,}5)^3 : (2{,}5)^2\right]^2 - \sqrt[5]{\frac{1}{243}} + \sqrt[3]{\frac{27}{8}} - \left(\frac{3}{10} : \frac{9}{5} + \frac{1}{3}\right)^2$`,
    [r`$\frac{43}{6}$`, r`$\frac{23}{3}$`, r`$\frac{83}{12}$`, r`$\frac{47}{12}$`], 0, [
      r`Corchete: $[(2{,}5)^1]^2 = 6{,}25 = \frac{25}{4}$.`,
      r`$\sqrt[5]{\frac{1}{243}} = \frac{1}{3}$ y $\sqrt[3]{\frac{27}{8}} = \frac{3}{2}$.`,
      r`Paréntesis: $\frac{3}{10} \cdot \frac{5}{9} = \frac{1}{6}$; $\frac{1}{6} + \frac{1}{3} = \frac{1}{2}$; $\left(\frac{1}{2}\right)^2 = \frac{1}{4}$.`,
      r`$\frac{25}{4} - \frac{1}{3} + \frac{3}{2} - \frac{1}{4} = \frac{43}{6}$.`,
    ]),

  q('3a', 3, 5, r`Hallá $x$ y verificá: $4 + 3 \cdot (x - 2) = 2 \cdot (x + 5)$`,
    [r`$x = 12$`, r`$x = 8$`, r`$x = 7$`, r`$x = 2$`], 0, [
      r`Distributiva: $4 + 3x - 6 = 2x + 10$.`,
      r`$3x - 2 = 2x + 10$, entonces $x = 12$.`,
      r`Verifico: $4 + 3 \cdot 10 = 34$ y $2 \cdot 17 = 34$. ✓`,
    ]),
  q('3b', 3, 5, r`Hallá $x$ y verificá: $2x + 3 \cdot (3x - 2) + 4 \cdot (x + 1) = 43$`,
    [r`$x = 3$`, r`$x = 4$`, r`$x = 5$`, r`$x = 2$`], 0, [
      r`Distributiva: $2x + 9x - 6 + 4x + 4 = 43$.`,
      r`$15x - 2 = 43$, entonces $15x = 45$ y $x = 3$.`,
      r`Verifico: $6 + 3 \cdot 7 + 4 \cdot 4 = 6 + 21 + 16 = 43$. ✓`,
    ]),

  q('4a', 4, 5, r`Hallá $x$ y verificá: $\frac{1}{3} + \frac{3}{4} \cdot \left(\sqrt{x} - \frac{2}{3}\right) = \frac{4}{3}$`,
    [r`$x = 4$`, r`$x = 2$`, r`$x = 16$`, r`$x = \frac{4}{9}$`], 0, [
      r`Resto $\frac{1}{3}$ en ambos miembros: $\frac{3}{4} \cdot \left(\sqrt{x} - \frac{2}{3}\right) = 1$.`,
      r`Divido por $\frac{3}{4}$: $\sqrt{x} - \frac{2}{3} = \frac{4}{3}$.`,
      r`$\sqrt{x} = 2$, entonces $x = 4$.`,
      r`Verifico: $\frac{1}{3} + \frac{3}{4} \cdot \frac{4}{3} = \frac{1}{3} + 1 = \frac{4}{3}$. ✓`,
    ]),
  q('4b', 4, 5, r`Hallá $x$ y verificá: $\sqrt{\frac{3}{4}x + 1} - 0{,}25 = \frac{9}{4}$`,
    [r`$x = 7$`, r`$x = 2$`, r`$x = \frac{13}{3}$`, r`$x = \frac{25}{3}$`], 0, [
      r`$0{,}25 = \frac{1}{4}$. Entonces $\sqrt{\frac{3}{4}x + 1} = \frac{9}{4} + \frac{1}{4} = \frac{5}{2}$.`,
      r`Elevo al cuadrado: $\frac{3}{4}x + 1 = \frac{25}{4}$.`,
      r`$\frac{3}{4}x = \frac{21}{4}$, entonces $x = 7$.`,
      r`Verifico: $\sqrt{\frac{25}{4}} - \frac{1}{4} = \frac{5}{2} - \frac{1}{4} = \frac{9}{4}$. ✓`,
    ]),
  q('4c', 4, 5, r`Hallá $x$ y verificá: $\left(\frac{5}{2}x - \frac{2}{3}\right) : \frac{7}{6} = \frac{4}{7}x$`,
    [r`$x = \frac{4}{11}$`, r`$x = \frac{11}{4}$`, r`$x = \frac{4}{19}$`, r`$x = \frac{28}{85}$`], 0, [
      r`La división por $\frac{7}{6}$ pasa multiplicando: $\frac{5}{2}x - \frac{2}{3} = \frac{4}{7}x \cdot \frac{7}{6} = \frac{2}{3}x$.`,
      r`$\frac{5}{2}x - \frac{2}{3}x = \frac{2}{3}$, es decir, $\frac{11}{6}x = \frac{2}{3}$.`,
      r`$x = \frac{2}{3} : \frac{11}{6} = \frac{4}{11}$.`,
      r`Verifico: ambos miembros dan $\frac{16}{77}$. ✓`,
    ]),

  q('5a', 5, 6, 'De un depósito lleno de agua se usan las dos quintas partes para regar. Después, se usan las tres cuartas partes de lo que quedaba para lavar, y todavía sobran 150 litros. ¿Cuántos litros tiene el depósito lleno?',
    ['1000 litros', '600 litros', '375 litros', '1500 litros'], 0, [
      r`Después de regar quedan $\frac{3}{5}$ del total.`,
      r`Sobra $\frac{1}{4}$ de ese resto: $\frac{1}{4} \cdot \frac{3}{5} = \frac{3}{20}$ del total.`,
      r`$\frac{3}{20}x = 150$, entonces $x = 150 \cdot 20 : 3 = 1000$ litros.`,
    ]),
  q('5b', 5, 2, 'En el mismo depósito del ejercicio 5a, ¿cuántos litros se usaron para regar y cuántos para lavar?',
    ['400 L para regar y 450 L para lavar', '400 L para regar y 750 L para lavar', '600 L para regar y 250 L para lavar', '450 L para regar y 400 L para lavar'], 0, [
      r`Para regar: $\frac{2}{5} \cdot 1000 = 400$ L. Quedan $600$ L.`,
      r`Para lavar: $\frac{3}{4} \cdot 600 = 450$ L.`,
      r`Verifico: $400 + 450 + 150 = 1000$. ✓`,
    ]),
  q('5c', 5, 4, 'Una soga de 84 cm se corta en dos partes. Una mide 12 cm menos que la otra. ¿Cuánto mide cada parte?',
    ['36 cm y 48 cm', '30 cm y 54 cm', '42 cm y 54 cm', '36 cm y 42 cm'], 0, [
      r`Parte más larga: $x$. La más corta: $x - 12$.`,
      r`$x + x - 12 = 84$, entonces $2x = 96$ y $x = 48$.`,
      r`Las partes miden $36$ cm y $48$ cm.`,
    ]),
  q('5d', 5, 4, r`Un lavarropas cuesta \$360.000. Se compra en 12 cuotas iguales con un recargo del 15%. ¿Cuál es el valor de cada cuota?`,
    [r`\$34.500`, r`\$30.000`, r`\$25.500`, r`\$31.250`], 0, [
      r`Recargo: el 15% de 360.000 es $360000 \cdot 15 : 100 = 54000$.`,
      r`Precio final: $360000 + 54000 = 414000$.`,
      r`Cada cuota: $414000 : 12 = 34500$.`,
    ]),
  q('5e', 5, 4, r`Una excursión cuesta \$80.000 por persona y tiene un 25% de descuento para estudiantes. ¿Cuánto paga en total un grupo de 3 personas en el que solo 2 son estudiantes?`,
    [r`\$200.000`, r`\$180.000`, r`\$220.000`, r`\$160.000`], 0, [
      r`Cada estudiante paga el 75%: $80000 \cdot 75 : 100 = 60000$.`,
      r`Total: $2 \cdot 60000 + 80000 = 200000$.`,
    ]),

  q('6a', 6, 1, r`Observá la figura: $\overleftrightarrow{AD}$ y $\overleftrightarrow{BE}$ son rectas y $B\hat{O}F$ es recto. El complemento de $B\hat{O}C$ es:`,
    [r`$C\hat{O}F$`, r`$F\hat{O}D$`, r`$A\hat{O}B$`, r`$A\hat{O}C$`], 0, [
      r`$B\hat{O}C + C\hat{O}F = B\hat{O}F = 90°$. Entonces el complemento es $C\hat{O}F$.`,
    ], 'rayos'),
  q('6b', 6, 1, r`En la misma figura, el suplemento de $B\hat{O}G$ es:`,
    [r`$G\hat{O}E$`, r`$G\hat{O}D$`, r`$A\hat{O}G$`, r`$F\hat{O}E$`], 0, [
      r`Como $\overleftrightarrow{BE}$ es una recta, $B\hat{O}G + G\hat{O}E = 180°$.`,
    ], 'rayos'),
  q('6c', 6, 1, r`En la misma figura, el opuesto por el vértice de $D\hat{O}E$ es:`,
    [r`$A\hat{O}B$`, r`$A\hat{O}E$`, r`$B\hat{O}D$`, r`$B\hat{O}C$`], 0, [
      r`Los lados opuestos a $\overrightarrow{OD}$ y $\overrightarrow{OE}$ son $\overrightarrow{OA}$ y $\overrightarrow{OB}$.`,
    ], 'rayos'),
  q('6d', 6, 1, r`En la misma figura, un ángulo adyacente a $A\hat{O}F$ es:`,
    [r`$F\hat{O}D$`, r`$F\hat{O}C$`, r`$A\hat{O}G$`, r`$D\hat{O}E$`], 0, [
      r`Los ángulos adyacentes comparten un lado ($\overrightarrow{OF}$) y los otros dos forman una recta ($\overrightarrow{OA}$ y $\overrightarrow{OD}$).`,
    ], 'rayos'),
  q('6e', 6, 4, r`Las rectas $a$ y $b$ son paralelas. $\hat{\delta} = 4x + 8°$ y $\hat{\alpha} = 6x - 32°$. ¿Cuánto miden $\hat{\delta}$, $\hat{\alpha}$ y $\hat{\varepsilon}$?`,
    [r`$\hat{\delta} = \hat{\alpha} = 88°$ y $\hat{\varepsilon} = 92°$`, r`$\hat{\delta} = \hat{\alpha} = 92°$ y $\hat{\varepsilon} = 88°$`, r`$\hat{\delta} = 88°$, $\hat{\alpha} = 92°$ y $\hat{\varepsilon} = 88°$`, r`$\hat{\delta} = \hat{\alpha} = 88°$ y $\hat{\varepsilon} = 2°$`], 0, [
      r`$\hat{\delta}$ y $\hat{\alpha}$ son correspondientes: son iguales. $4x + 8 = 6x - 32$.`,
      r`$40 = 2x$, entonces $x = 20°$ y $\hat{\delta} = \hat{\alpha} = 88°$.`,
      r`$\hat{\varepsilon}$ es adyacente a $\hat{\alpha}$: $180° - 88° = 92°$.`,
    ], 'delta'),
  q('6f', 6, 5, r`Resolvé: $(38°\,45' \cdot 4 - 72°\,30'\,20'') : 5$`,
    [r`$16°\,29'\,56''$`, r`$16°\,29'\,16''$`, r`$17°\,5'\,56''$`, r`$45°\,30'\,4''$`], 0, [
      r`$38°\,45' \cdot 4 = 152°\,180' = 155°$.`,
      r`$155° - 72°\,30'\,20'' = 82°\,29'\,40''$.`,
      r`Divido por 5: $82° : 5 = 16°$ y sobran $2° = 120'$.`,
      r`$149' : 5 = 29'$ y sobran $4' = 240''$. Por último, $280'' : 5 = 56''$.`,
    ]),
  q('6g', 6, 3, r`Hallá la amplitud del ángulo rojo $\hat{\beta}$. Los tres ángulos de la figura forman un ángulo llano.`,
    [r`$64°\,42'\,37''$`, r`$65°\,43'\,37''$`, r`$64°\,42'\,23''$`, r`$115°\,17'\,23''$`], 0, [
      r`Sumo los datos: $41°\,27'\,38'' + 73°\,49'\,45'' = 115°\,17'\,23''$.`,
      r`$\hat{\beta} = 179°\,59'\,60'' - 115°\,17'\,23'' = 64°\,42'\,37''$.`,
    ], 'rojo'),
  q('6h', 6, 2, r`La bisectriz de un ángulo obtuso de $137°\,24'$ lo divide en dos ángulos. ¿Cuánto mide cada uno?`,
    [r`$68°\,42'$`, r`$68°\,12'$`, r`$69°\,12'$`, r`$42°\,36'$`], 0, [
      r`$137° : 2 = 68°$ y sobra $1° = 60'$.`,
      r`$(60' + 24') : 2 = 42'$. Cada ángulo mide $68°\,42'$.`,
    ]),
  q('6i', 6, 2, r`En la figura, $a \parallel b$. ¿Cuál es un par de ángulos alternos internos?`,
    [r`$\angle 3$ y $\angle 5$`, r`$\angle 3$ y $\angle 6$`, r`$\angle 1$ y $\angle 5$`, r`$\angle 1$ y $\angle 7$`], 0, [
      r`Los alternos internos están entre las paralelas y en distinto lado de la transversal: $\angle 3$ y $\angle 5$.`,
      r`$3$ y $6$ son conjugados internos; $1$ y $5$, correspondientes; $1$ y $7$, alternos externos.`,
    ], true),

  q('7a', 7, 4, 'Una antena proyecta una sombra de 24 m. La distancia entre la punta de la antena y el extremo de la sombra es de 74 m. Usando el teorema de Pitágoras, ¿cuál es la altura de la antena?',
    ['70 m', '50 m', '98 m', '78 m'], 0, [
      r`La distancia de 74 m es la hipotenusa: $h^2 = 74^2 - 24^2$.`,
      r`$h^2 = 5476 - 576 = 4900$, entonces $h = 70$ m.`,
    ], 'antena'),
  q('7b', 7, 5, r`En el triángulo $MOR$ es $\overline{OM} = \overline{OR}$, $\hat{O} = 5x$ y $\hat{M} = 2x + 27°$. El ángulo $\hat{\alpha}$ es el exterior en $O$. ¿Cuánto miden los ángulos interiores y $\hat{\alpha}$?`,
    [r`$\hat{O} = 70°$, $\hat{M} = \hat{R} = 55°$, $\hat{\alpha} = 110°$`, r`$\hat{O} = 55°$, $\hat{M} = \hat{R} = 70°$, $\hat{\alpha} = 125°$`, r`$\hat{O} = 70°$, $\hat{M} = \hat{R} = 55°$, $\hat{\alpha} = 125°$`, r`$\hat{O} = 45°$, $\hat{M} = \hat{R} = 45°$, $\hat{\alpha} = 135°$`], 0, [
      r`Como $\overline{OM} = \overline{OR}$, es $\hat{R} = \hat{M}$.`,
      r`$5x + 2 \cdot (2x + 27) = 180$, entonces $9x + 54 = 180$ y $x = 14°$.`,
      r`$\hat{O} = 70°$ y $\hat{M} = \hat{R} = 55°$.`,
      r`$\hat{\alpha} = 180° - 70° = 110°$.`,
    ], 'triangulo'),
  q('7c', 7, 4, r`En el trapecio rectángulo de la figura, la base mayor mide $1{,}4$ dm, la base menor 90 mm y la altura $0{,}12$ m. ¿Cuánto mide el lado oblicuo $\overline{PQ}$?`,
    ['13 cm', '17 cm', '12,5 cm', '11 cm'], 0, [
      r`Paso todo a cm: $1{,}4$ dm $= 14$ cm; 90 mm $= 9$ cm; $0{,}12$ m $= 12$ cm.`,
      r`Se forma un triángulo rectángulo de catetos $12$ y $14 - 9 = 5$ cm.`,
      r`$\overline{PQ} = \sqrt{12^2 + 5^2} = \sqrt{169} = 13$ cm.`,
    ], 'trapecio'),
  q('7d', 7, 2, 'Calculá el perímetro y el área del trapecio del ejercicio 7c.',
    [r`Perímetro: 48 cm; área: 138 cm²`, r`Perímetro: 48 cm; área: 276 cm²`, r`Perímetro: 47 cm; área: 138 cm²`, r`Perímetro: 48 cm; área: 168 cm²`], 0, [
      r`Perímetro: $14 + 13 + 9 + 12 = 48$ cm.`,
      r`Área: $\frac{(14 + 9) \cdot 12}{2} = 138$ cm².`,
    ], 'trapecio'),
]

export const QUESTIONS2 = mix(RAW)
export const TOTAL2 = QUESTIONS2.reduce((s, x) => s + x.pts, 0)
