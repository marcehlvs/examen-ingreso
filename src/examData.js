const r = String.raw

export const SECTIONS = [
  { id: 1, title: 'Números naturales: cálculos combinados', pts: 12 },
  { id: 2, title: 'Propiedades de la potenciación y la radicación', pts: 8 },
  { id: 3, title: 'Ecuaciones en N', pts: 10 },
  { id: 4, title: 'Números racionales (no negativos)', pts: 18 },
  { id: 5, title: 'Lenguaje coloquial y simbólico. Situaciones problemáticas', pts: 20 },
  { id: 6, title: 'Ángulos', pts: 12 },
  { id: 7, title: 'Triángulos', pts: 20 },
]

const VF = ['Verdadera', 'Falsa']

// answer = índice (0-based) de la opción correcta
const RAW = [
  // ---------- Ejercicio 1 (3 pts c/u) ----------
  {
    id: '1a', sec: 1, pts: 3,
    prompt: r`Resolvé: $3^2 \cdot 2^3 - 4 : 2 + \sqrt{49}$`,
    options: ['53', '77', '41', '81'], answer: 1,
    steps: [
      r`Separo en términos (los separan las sumas y restas): $3^2 \cdot 2^3$ ; $4 : 2$ ; $\sqrt{49}$.`,
      r`Resuelvo potencias y raíces primero: $9 \cdot 8 - 4 : 2 + 7$.`,
      r`Resuelvo multiplicaciones y divisiones: $72 - 2 + 7$.`,
      r`Resuelvo sumas y restas de izquierda a derecha: $72 - 2 + 7 = 77$.`,
    ],
  },
  {
    id: '1b', sec: 1, pts: 3,
    prompt: r`Resolvé: $5 + 3 \cdot (12 - 2^2) : 4 - \sqrt{36} : 2$`,
    options: ['8', '11', '13', '6'], answer: 0,
    steps: [
      r`Separo en términos: $5$ ; $3 \cdot (12 - 2^2) : 4$ ; $\sqrt{36} : 2$.`,
      r`Primero lo que está entre paréntesis: $2^2 = 4$ y $12 - 4 = 8$.`,
      r`Queda $5 + 3 \cdot 8 : 4 - 6 : 2$ (porque $\sqrt{36} = 6$).`,
      r`Multiplico y divido de izquierda a derecha: $3 \cdot 8 = 24$, $24 : 4 = 6$ y $6 : 2 = 3$.`,
      r`Queda $5 + 6 - 3 = 8$.`,
    ],
  },
  {
    id: '1c', sec: 1, pts: 3,
    prompt: r`Resolvé: $[(2^3 \cdot 2^4) : 2^5 + 3^0] \cdot 5 - \sqrt[3]{27}$`,
    options: ['17', '25', '22', '28'], answer: 2,
    steps: [
      r`Dentro del paréntesis uso propiedades de igual base: $2^3 \cdot 2^4 = 2^{3+4} = 2^7$.`,
      r`Divido: $2^7 : 2^5 = 2^{7-5} = 2^2 = 4$.`,
      r`Recordá que $3^0 = 1$ (todo número distinto de 0 elevado a 0 da 1). El corchete queda $[4 + 1] = 5$.`,
      r`Multiplico: $5 \cdot 5 = 25$. Calculo la raíz: $\sqrt[3]{27} = 3$ porque $3^3 = 27$.`,
      r`Resto: $25 - 3 = 22$.`,
    ],
  },
  {
    id: '1d', sec: 1, pts: 3,
    prompt: r`Resolvé: $\sqrt{5^2 - 3^2} + \sqrt[3]{2^3 \cdot 8} - 2^0$`,
    options: ['5', '7', '8', '9'], answer: 1,
    steps: [
      r`Primero resuelvo lo de adentro de cada raíz: $5^2 - 3^2 = 25 - 9 = 16$, entonces $\sqrt{16} = 4$.`,
      r`Atención: $\sqrt{25 - 9}$ NO es $\sqrt{25} - \sqrt{9}$. La raíz no es distributiva respecto de la resta.`,
      r`$2^3 \cdot 8 = 8 \cdot 8 = 64$, entonces $\sqrt[3]{64} = 4$ porque $4^3 = 64$.`,
      r`$2^0 = 1$.`,
      r`Queda $4 + 4 - 1 = 7$.`,
    ],
  },

  // ---------- Ejercicio 2 (1 pt c/u) ----------
  {
    id: '2a', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $5^3 \cdot 5^2 = 5^6$`,
    options: VF, answer: 1,
    steps: [
      r`En el producto de potencias de igual base se SUMAN los exponentes: $5^3 \cdot 5^2 = 5^{3+2} = 5^5$.`,
      r`Como $5^5 \neq 5^6$, la afirmación es falsa.`,
    ],
  },
  {
    id: '2b', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $7^8 : 7^4 = 7^4$`,
    options: VF, answer: 0,
    steps: [
      r`En el cociente de potencias de igual base se RESTAN los exponentes: $7^8 : 7^4 = 7^{8-4} = 7^4$.`,
      r`Es verdadera.`,
    ],
  },
  {
    id: '2c', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $(2^3)^2 = 2^5$`,
    options: VF, answer: 1,
    steps: [
      r`En la potencia de una potencia se MULTIPLICAN los exponentes: $(2^3)^2 = 2^{3 \cdot 2} = 2^6$.`,
      r`Como $2^6 \neq 2^5$, es falsa. (Se sumaría si fuera un producto, no una potencia de potencia.)`,
    ],
  },
  {
    id: '2d', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $(3 \cdot 4)^2 = 3^2 \cdot 4^2$`,
    options: VF, answer: 0,
    steps: [
      r`La potenciación es distributiva respecto de la multiplicación.`,
      r`Verifico: $(3 \cdot 4)^2 = 12^2 = 144$ y $3^2 \cdot 4^2 = 9 \cdot 16 = 144$. Es verdadera.`,
    ],
  },
  {
    id: '2e', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $(6 + 2)^2 = 6^2 + 2^2$`,
    options: VF, answer: 1,
    steps: [
      r`La potenciación NO es distributiva respecto de la suma.`,
      r`Verifico: $(6 + 2)^2 = 8^2 = 64$, pero $6^2 + 2^2 = 36 + 4 = 40$. Es falsa.`,
    ],
  },
  {
    id: '2f', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $\sqrt{9 \cdot 16} = \sqrt{9} \cdot \sqrt{16}$`,
    options: VF, answer: 0,
    steps: [
      r`La radicación es distributiva respecto de la multiplicación.`,
      r`Verifico: $\sqrt{144} = 12$ y $\sqrt{9} \cdot \sqrt{16} = 3 \cdot 4 = 12$. Es verdadera.`,
    ],
  },
  {
    id: '2g', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $\sqrt{25 + 144} = \sqrt{25} + \sqrt{144}$`,
    options: VF, answer: 1,
    steps: [
      r`La radicación NO es distributiva respecto de la suma.`,
      r`Verifico: $\sqrt{25 + 144} = \sqrt{169} = 13$, pero $\sqrt{25} + \sqrt{144} = 5 + 12 = 17$. Es falsa.`,
    ],
  },
  {
    id: '2h', sec: 2, pts: 1,
    prompt: r`¿Es verdadera o falsa? $8^0 = 0$`,
    options: VF, answer: 1,
    steps: [
      r`Todo número distinto de 0 elevado a la 0 es igual a 1.`,
      r`Entonces $8^0 = 1$, no 0. Es falsa.`,
    ],
  },

  // ---------- Ejercicio 3 (2 pts c/u) ----------
  {
    id: '3a', sec: 3, pts: 2,
    prompt: r`Hallá el valor de $x$: $3x + 7 = 28$`,
    options: [r`$x = 21$`, r`$x = 5$`, r`$x = 7$`, r`$x = 9$`], answer: 2,
    steps: [
      r`Paso el $7$ restando al otro miembro: $3x = 28 - 7$.`,
      r`$3x = 21$.`,
      r`Paso el $3$ dividiendo: $x = 21 : 3 = 7$.`,
      r`Verifico: $3 \cdot 7 + 7 = 28$. ✓`,
    ],
  },
  {
    id: '3b', sec: 3, pts: 2,
    prompt: r`Hallá el valor de $x$: $5x - 2 = 2x + 13$`,
    options: [r`$x = 3$`, r`$x = 15$`, r`$x = 5$`, r`$x = 7$`], answer: 2,
    steps: [
      r`Junto los términos con $x$ a la izquierda y los números a la derecha: $5x - 2x = 13 + 2$.`,
      r`$3x = 15$.`,
      r`$x = 15 : 3 = 5$.`,
      r`Verifico: $5 \cdot 5 - 2 = 23$ y $2 \cdot 5 + 13 = 23$. ✓`,
    ],
  },
  {
    id: '3c', sec: 3, pts: 2,
    prompt: r`Hallá el valor de $x$: $2(x + 4) - 3 = 17$`,
    options: [r`$x = 8$`, r`$x = 10$`, r`$x = 6$`, r`$x = 4$`], answer: 2,
    steps: [
      r`Aplico la propiedad distributiva: $2x + 8 - 3 = 17$.`,
      r`Resuelvo los números: $2x + 5 = 17$.`,
      r`$2x = 17 - 5 = 12$, entonces $x = 6$.`,
      r`Verifico: $2(6 + 4) - 3 = 20 - 3 = 17$. ✓`,
    ],
  },
  {
    id: '3d', sec: 3, pts: 2,
    prompt: r`Hallá el valor de $x$: $4(x - 1) + 2x = 3(x + 5) + 5$`,
    options: [r`$x = 8$`, r`$x = 6$`, r`$x = 24$`, r`$x = 7$`], answer: 0,
    steps: [
      r`Aplico la distributiva en ambos miembros: $4x - 4 + 2x = 3x + 15 + 5$.`,
      r`Reduzco términos semejantes: $6x - 4 = 3x + 20$.`,
      r`Junto las $x$ a la izquierda y los números a la derecha: $6x - 3x = 20 + 4$.`,
      r`$3x = 24$, entonces $x = 8$.`,
      r`Verifico: $4 \cdot 7 + 16 = 44$ y $3 \cdot 13 + 5 = 44$. ✓`,
    ],
  },
  {
    id: '3e', sec: 3, pts: 2,
    prompt: r`Hallá el valor de $x$: $\sqrt{x + 9} = 5$`,
    options: [r`$x = 25$`, r`$x = 34$`, r`$x = 16$`, r`$x = 4$`], answer: 2,
    steps: [
      r`La operación inversa de la raíz cuadrada es elevar al cuadrado. Elevo ambos miembros: $x + 9 = 5^2$.`,
      r`$x + 9 = 25$.`,
      r`$x = 25 - 9 = 16$.`,
      r`Verifico: $\sqrt{16 + 9} = \sqrt{25} = 5$. ✓`,
    ],
  },

  // ---------- Ejercicio 4 (A: 1 pt; B y C: 2 pts) ----------
  {
    id: '4A1', sec: 4, pts: 1,
    prompt: r`Expresá $0{,}75$ como fracción irreducible.`,
    options: [r`$\frac{3}{4}$`, r`$\frac{7}{5}$`, r`$\frac{75}{10}$`, r`$\frac{1}{4}$`], answer: 0,
    steps: [
      r`Dos cifras decimales: escribo $\frac{75}{100}$.`,
      r`Simplifico dividiendo numerador y denominador por 25: $\frac{75 : 25}{100 : 25} = \frac{3}{4}$.`,
    ],
  },
  {
    id: '4A2', sec: 4, pts: 1,
    prompt: r`Expresá $1{,}2$ como fracción irreducible.`,
    options: [r`$\frac{12}{10}$`, r`$\frac{6}{5}$`, r`$\frac{1}{5}$`, r`$\frac{12}{100}$`], answer: 1,
    steps: [
      r`Una cifra decimal: $1{,}2 = \frac{12}{10}$.`,
      r`Esa fracción todavía se puede simplificar: dividiendo por 2 queda $\frac{6}{5}$, que ya es irreducible.`,
    ],
  },
  {
    id: '4A3', sec: 4, pts: 1,
    prompt: r`Expresá $0{,}125$ como fracción irreducible.`,
    options: [r`$\frac{1}{12}$`, r`$\frac{125}{100}$`, r`$\frac{1}{8}$`, r`$\frac{5}{40}$`], answer: 2,
    steps: [
      r`Tres cifras decimales: $0{,}125 = \frac{125}{1000}$.`,
      r`Divido por 125: $\frac{125 : 125}{1000 : 125} = \frac{1}{8}$.`,
    ],
  },
  {
    id: '4A4', sec: 4, pts: 1,
    prompt: r`Expresá $\frac{3}{5}$ como número decimal.`,
    options: ['0,35', '0,6', '1,6', '0,06'], answer: 1,
    steps: [
      r`Divido numerador por denominador: $3 : 5$.`,
      r`$30 : 5 = 6$, entonces $3 : 5 = 0{,}6$.`,
    ],
  },
  {
    id: '4A5', sec: 4, pts: 1,
    prompt: r`Expresá $\frac{7}{4}$ como número decimal.`,
    options: ['0,74', '1,25', '1,75', '3,4'], answer: 2,
    steps: [
      r`$7 : 4 = 1$ y sobran $3$.`,
      r`Bajo un cero: $30 : 4 = 7$ y sobran $2$. Bajo otro cero: $20 : 4 = 5$.`,
      r`Entonces $7 : 4 = 1{,}75$.`,
    ],
  },
  {
    id: '4A6', sec: 4, pts: 1,
    prompt: r`Expresá $\frac{5}{8}$ como número decimal.`,
    options: ['0,58', '0,625', '1,6', '0,85'], answer: 1,
    steps: [
      r`$5 : 8 = 0$, con resto $5$. Bajo un cero: $50 : 8 = 6$ y sobran $2$.`,
      r`$20 : 8 = 2$ y sobran $4$. $40 : 8 = 5$ y no sobra nada.`,
      r`Entonces $5 : 8 = 0{,}625$.`,
    ],
  },
  {
    id: '4B1', sec: 4, pts: 2,
    prompt: r`Resolvé y simplificá: $\frac{2}{3} + \frac{1}{4}$`,
    options: [r`$\frac{3}{7}$`, r`$\frac{11}{12}$`, r`$\frac{3}{12}$`, r`$\frac{8}{12}$`], answer: 1,
    steps: [
      r`Para sumar fracciones busco un denominador común: el mínimo común múltiplo de 3 y 4 es 12.`,
      r`$\frac{2}{3} = \frac{8}{12}$ y $\frac{1}{4} = \frac{3}{12}$.`,
      r`Sumo los numeradores y mantengo el denominador: $\frac{8 + 3}{12} = \frac{11}{12}$.`,
    ],
  },
  {
    id: '4B2', sec: 4, pts: 2,
    prompt: r`Resolvé y simplificá: $\frac{5}{6} - \frac{1}{3}$`,
    options: [r`$\frac{4}{3}$`, r`$\frac{3}{6}$`, r`$\frac{1}{3}$`, r`$\frac{1}{2}$`], answer: 3,
    steps: [
      r`Denominador común: 6. Como $\frac{1}{3} = \frac{2}{6}$, queda $\frac{5}{6} - \frac{2}{6}$.`,
      r`Resto los numeradores: $\frac{5 - 2}{6} = \frac{3}{6}$.`,
      r`Simplifico dividiendo por 3: $\frac{3}{6} = \frac{1}{2}$.`,
    ],
  },
  {
    id: '4B3', sec: 4, pts: 2,
    prompt: r`Resolvé y simplificá: $\frac{3}{4} \cdot \frac{2}{9}$`,
    options: [r`$\frac{1}{6}$`, r`$\frac{27}{8}$`, r`$\frac{6}{36}$`, r`$\frac{5}{13}$`], answer: 0,
    steps: [
      r`Para multiplicar fracciones se multiplican numeradores entre sí y denominadores entre sí: $\frac{3 \cdot 2}{4 \cdot 9} = \frac{6}{36}$.`,
      r`Simplifico dividiendo por 6: $\frac{6}{36} = \frac{1}{6}$.`,
    ],
  },
  {
    id: '4B4', sec: 4, pts: 2,
    prompt: r`Resolvé y simplificá: $\frac{5}{8} : \frac{15}{16}$`,
    options: [r`$\frac{3}{2}$`, r`$\frac{75}{128}$`, r`$\frac{2}{3}$`, r`$\frac{1}{2}$`], answer: 2,
    steps: [
      r`Dividir por una fracción es multiplicar por su inversa: $\frac{5}{8} \cdot \frac{16}{15}$.`,
      r`Multiplico: $\frac{80}{120}$.`,
      r`Simplifico dividiendo por 40: $\frac{80}{120} = \frac{2}{3}$.`,
    ],
  },
  {
    id: '4C1', sec: 4, pts: 2,
    prompt: r`Hallá $x$: $\frac{2}{3}x - 1 = 5$`,
    options: [r`$x = 6$`, r`$x = 9$`, r`$x = 12$`, r`$x = 4$`], answer: 1,
    steps: [
      r`Paso el $1$ sumando: $\frac{2}{3}x = 5 + 1 = 6$.`,
      r`Multiplico ambos miembros por 3 para sacar el denominador: $2x = 18$.`,
      r`$x = 18 : 2 = 9$.`,
      r`Verifico: $\frac{2}{3} \cdot 9 - 1 = 6 - 1 = 5$. ✓`,
    ],
  },
  {
    id: '4C2', sec: 4, pts: 2,
    prompt: r`Hallá $x$: $\frac{x}{4} + \frac{1}{2} = 2$`,
    options: [r`$x = 6$`, r`$x = 10$`, r`$x = \frac{3}{2}$`, r`$x = 8$`], answer: 0,
    steps: [
      r`Paso $\frac{1}{2}$ restando: $\frac{x}{4} = 2 - \frac{1}{2} = \frac{3}{2}$.`,
      r`Paso el 4 multiplicando: $x = \frac{3}{2} \cdot 4 = \frac{12}{2} = 6$.`,
      r`Verifico: $\frac{6}{4} + \frac{1}{2} = \frac{3}{2} + \frac{1}{2} = 2$. ✓`,
    ],
  },

  // ---------- Ejercicio 5 (A: 1 pt; B: 4 pts) ----------
  {
    id: '5A1', sec: 5, pts: 1,
    prompt: 'Lenguaje simbólico (llamá x al número): «El doble de un número, aumentado en 5».',
    options: [r`$2(x + 5)$`, r`$2x + 5$`, r`$x^2 + 5$`, r`$5x + 2$`], answer: 1,
    steps: [
      r`«El doble de un número» es $2x$.`,
      r`«Aumentado en 5» significa que se le suma 5 a ese doble: $2x + 5$.`,
      r`Si fuera $2(x + 5)$ se duplicaría la suma, y eso diría «el doble de la suma entre un número y 5».`,
    ],
  },
  {
    id: '5A2', sec: 5, pts: 1,
    prompt: 'Lenguaje simbólico (llamá x al número): «El triple del siguiente de un número».',
    options: [r`$x + 3$`, r`$3x + 1$`, r`$3(x + 1)$`, r`$3(x - 1)$`], answer: 2,
    steps: [
      r`«El siguiente de un número» es $x + 1$.`,
      r`«El triple» de eso se escribe con paréntesis, porque se multiplica todo el siguiente: $3(x + 1)$.`,
    ],
  },
  {
    id: '5A3', sec: 5, pts: 1,
    prompt: 'Lenguaje simbólico (llamá x al número): «La mitad de un número, disminuida en 4».',
    options: [r`$2x - 4$`, r`$\frac{x}{2} - 4$`, r`$\frac{x - 4}{2}$`, r`$\frac{x}{2} + 4$`], answer: 1,
    steps: [
      r`«La mitad de un número» es $\frac{x}{2}$.`,
      r`«Disminuida en 4» significa que se le resta 4 a esa mitad: $\frac{x}{2} - 4$.`,
    ],
  },
  {
    id: '5A4', sec: 5, pts: 1,
    prompt: 'Lenguaje simbólico (llamá x al número): «El cuadrado de la suma entre un número y 3».',
    options: [r`$x^2 + 3$`, r`$x^2 + 9$`, r`$(x + 3)^2$`, r`$2(x + 3)$`], answer: 2,
    steps: [
      r`«La suma entre un número y 3» es $x + 3$.`,
      r`«El cuadrado» de esa suma eleva todo al cuadrado, por eso va entre paréntesis: $(x + 3)^2$.`,
      r`Ojo: $(x + 3)^2$ no es lo mismo que $x^2 + 9$ (la potencia no es distributiva respecto de la suma).`,
    ],
  },
  {
    id: '5B1', sec: 5, pts: 4,
    prompt: 'Una tabla de 70 cm se corta en dos trozos. Uno de ellos mide 8 cm más que el otro. ¿Cuánto mide cada trozo?',
    options: ['30 cm y 38 cm', '31 cm y 39 cm', '35 cm y 43 cm', '32 cm y 40 cm'], answer: 1,
    steps: [
      r`Incógnita: $x$ = medida del trozo más corto. El otro mide $x + 8$.`,
      r`Los dos trozos suman 70 cm: $x + (x + 8) = 70$.`,
      r`$2x + 8 = 70$, entonces $2x = 62$ y $x = 31$.`,
      r`El otro trozo mide $31 + 8 = 39$ cm.`,
      r`Verifico: $31 + 39 = 70$. ✓ Respuesta: los trozos miden 31 cm y 39 cm.`,
    ],
  },
  {
    id: '5B2', sec: 5, pts: 4,
    prompt: 'Ana tiene 5 años más que su hermano Tomás. Entre los dos suman 29 años. ¿Qué edad tiene cada uno?',
    options: ['Tomás 24 y Ana 29', 'Tomás 12 y Ana 17', 'Tomás 17 y Ana 12', 'Tomás 14 y Ana 19'], answer: 1,
    steps: [
      r`Incógnita: $x$ = edad de Tomás. Ana tiene $x + 5$.`,
      r`Entre los dos suman 29: $x + (x + 5) = 29$.`,
      r`$2x + 5 = 29$, entonces $2x = 24$ y $x = 12$.`,
      r`Ana tiene $12 + 5 = 17$ años.`,
      r`Verifico: $12 + 17 = 29$. ✓ Respuesta: Tomás tiene 12 años y Ana 17.`,
    ],
  },
  {
    id: '5B3', sec: 5, pts: 4,
    prompt: 'La suma de tres números consecutivos es 63. ¿Cuáles son esos números?',
    options: ['21, 22 y 23', '20, 21 y 22', '19, 20 y 21', '18, 19 y 20'], answer: 1,
    steps: [
      r`Incógnita: $x$ = el menor. Los consecutivos son $x$, $x + 1$ y $x + 2$.`,
      r`Suman 63: $x + (x + 1) + (x + 2) = 63$.`,
      r`$3x + 3 = 63$, entonces $3x = 60$ y $x = 20$.`,
      r`Los números son 20, 21 y 22. Verifico: $20 + 21 + 22 = 63$. ✓`,
    ],
  },
  {
    id: '5B4', sec: 5, pts: 4,
    prompt: r`Mario compró 3 cuadernos iguales y una lapicera de \$450. En total pagó \$2.250. ¿Cuánto cuesta cada cuaderno?`,
    options: [r`\$750`, r`\$600`, r`\$1.800`, r`\$900`], answer: 1,
    steps: [
      r`Incógnita: $x$ = precio de un cuaderno.`,
      r`Tres cuadernos más la lapicera cuestan en total 2.250: $3x + 450 = 2250$.`,
      r`$3x = 2250 - 450 = 1800$.`,
      r`$x = 1800 : 3 = 600$.`,
      r`Verifico: $3 \cdot 600 + 450 = 2250$. ✓ Respuesta: cada cuaderno cuesta \$600.`,
    ],
  },

  // ---------- Ejercicio 6 ----------
  {
    id: '6A1', sec: 6, pts: 1,
    prompt: 'Calculá el complemento de un ángulo de 35°.',
    options: ['145°', '55°', '65°', '35°'], answer: 1,
    steps: [
      r`Dos ángulos son complementarios si suman $90°$.`,
      r`$90° - 35° = 55°$.`,
    ],
  },
  {
    id: '6A2', sec: 6, pts: 1,
    prompt: 'Calculá el suplemento de un ángulo de 128°.',
    options: ['38°', '62°', '232°', '52°'], answer: 3,
    steps: [
      r`Dos ángulos son suplementarios si suman $180°$.`,
      r`$180° - 128° = 52°$.`,
    ],
  },
  {
    id: '6B', sec: 6, pts: 4,
    prompt: r`Dos ángulos opuestos por el vértice miden $(3x + 10)°$ y $(5x - 20)°$. ¿Cuánto vale $x$ y cuánto mide cada ángulo?`,
    options: [
      r`$x = 30$; ambos miden $100°$`,
      r`$x = 15$; ambos miden $55°$`,
      r`$x = 5$; ambos miden $25°$`,
      r`$x = 15$; miden $55°$ y $125°$`,
    ],
    answer: 1,
    steps: [
      r`Los ángulos opuestos por el vértice son iguales, entonces planteo: $3x + 10 = 5x - 20$.`,
      r`Junto las $x$ y los números: $10 + 20 = 5x - 3x$.`,
      r`$30 = 2x$, entonces $x = 15$.`,
      r`Reemplazo: $3 \cdot 15 + 10 = 55$ y $5 \cdot 15 - 20 = 55$. Ambos miden $55°$ (coinciden, la ecuación está bien resuelta).`,
    ],
  },
  {
    id: '6C1', sec: 6, pts: 1, fig: true,
    prompt: r`Las rectas $a$ y $b$ son paralelas. Si $\angle 1 = 65°$, ¿cuánto mide $\angle 3$ y qué relación tiene con $\angle 1$?`,
    options: ['115°, opuestos por el vértice', '65°, adyacentes', '65°, opuestos por el vértice', '115°, adyacentes'], answer: 2,
    steps: [
      r`$\angle 3$ está en el mismo vértice que $\angle 1$, justo enfrente (lados opuestos).`,
      r`Los ángulos opuestos por el vértice son iguales: $\angle 3 = 65°$.`,
    ],
  },
  {
    id: '6C2', sec: 6, pts: 1, fig: true,
    prompt: r`Con $\angle 1 = 65°$ y $a \parallel b$: ¿cuánto mide $\angle 4$ y qué relación tiene con $\angle 1$?`,
    options: ['115°, adyacentes', '65°, adyacentes', '115°, correspondientes', '65°, opuestos por el vértice'], answer: 0,
    steps: [
      r`$\angle 4$ comparte un lado con $\angle 1$ y entre los dos forman un ángulo llano: son adyacentes (suplementarios).`,
      r`$\angle 4 = 180° - 65° = 115°$.`,
    ],
  },
  {
    id: '6C3', sec: 6, pts: 1, fig: true,
    prompt: r`Con $\angle 1 = 65°$ y $a \parallel b$: ¿cuánto mide $\angle 5$ y qué relación tiene con $\angle 1$?`,
    options: ['115°, correspondientes', '65°, alternos externos', '115°, adyacentes', '65°, correspondientes'], answer: 3,
    steps: [
      r`$\angle 1$ y $\angle 5$ ocupan la misma posición respecto de la transversal y de cada paralela (arriba a la derecha): son correspondientes.`,
      r`Entre paralelas, los ángulos correspondientes son iguales: $\angle 5 = 65°$.`,
    ],
  },
  {
    id: '6C4', sec: 6, pts: 1, fig: true,
    prompt: r`Con $\angle 1 = 65°$ y $a \parallel b$: ¿cuánto mide $\angle 7$ y qué relación tiene con $\angle 1$?`,
    options: ['65°, correspondientes', '65°, alternos externos', '115°, alternos externos', '115°, adyacentes'], answer: 1,
    steps: [
      r`$\angle 1$ y $\angle 7$ están por fuera de las paralelas y en lados opuestos de la transversal: son alternos externos.`,
      r`Entre paralelas, los alternos externos son iguales: $\angle 7 = 65°$.`,
    ],
  },
  {
    id: '6D1', sec: 6, pts: 1,
    prompt: 'El ángulo AÔB mide 126° y OC es su bisectriz. ¿Cuánto mide AÔC?',
    options: ['126°', '252°', '63°', '53°'], answer: 2,
    steps: [
      r`La bisectriz divide al ángulo en dos ángulos iguales.`,
      r`$\widehat{AOC} = 126° : 2 = 63°$.`,
    ],
  },
  {
    id: '6D2', sec: 6, pts: 1,
    prompt: 'La bisectriz de un ángulo lo divide en dos ángulos de 28° cada uno. ¿Cuánto mide el ángulo total?',
    options: ['56°', '14°', '28°', '84°'], answer: 0,
    steps: [
      r`Como la bisectriz lo divide en dos partes iguales, el total es el doble de cada parte.`,
      r`$28° \cdot 2 = 56°$.`,
    ],
  },

  // ---------- Ejercicio 7 ----------
  {
    id: '7A1', sec: 7, pts: 1,
    prompt: 'Clasificá el triángulo según sus lados y según sus ángulos. Lados: 4 cm, 4 cm y 6 cm. Ángulos: 48°, 48° y 84°.',
    options: ['Equilátero y acutángulo', 'Isósceles y acutángulo', 'Isósceles y obtusángulo', 'Escaleno y acutángulo'], answer: 1,
    steps: [
      r`Según los lados: hay exactamente dos lados iguales (4 cm y 4 cm), entonces es isósceles.`,
      r`Según los ángulos: el mayor mide $84°$, menor que $90°$. Los tres son agudos, entonces es acutángulo.`,
    ],
  },
  {
    id: '7A2', sec: 7, pts: 1,
    prompt: 'Clasificá el triángulo según sus lados y según sus ángulos. Lados: 3 cm, 4 cm y 5 cm. Ángulos: 37°, 53° y 90°.',
    options: ['Isósceles y rectángulo', 'Escaleno y acutángulo', 'Escaleno y rectángulo', 'Escaleno y obtusángulo'], answer: 2,
    steps: [
      r`Según los lados: los tres lados son distintos, entonces es escaleno.`,
      r`Según los ángulos: tiene un ángulo de $90°$, entonces es rectángulo.`,
    ],
  },
  {
    id: '7A3', sec: 7, pts: 1,
    prompt: 'Clasificá el triángulo según sus lados y según sus ángulos. Lados: 5 cm, 5 cm y 5 cm. Ángulos: 60°, 60° y 60°.',
    options: ['Escaleno y acutángulo', 'Equilátero y acutángulo', 'Isósceles y rectángulo', 'Equilátero y obtusángulo'], answer: 1,
    steps: [
      r`Según los lados: los tres lados son iguales, entonces es equilátero.`,
      r`Según los ángulos: los tres miden $60°$ (menos de $90°$), entonces es acutángulo.`,
    ],
  },
  {
    id: '7A4', sec: 7, pts: 1,
    prompt: 'Clasificá el triángulo según sus lados y según sus ángulos. Lados: 2 cm, 3 cm y 4 cm. Ángulos: 29°, 47° y 104°.',
    options: ['Escaleno y obtusángulo', 'Escaleno y acutángulo', 'Isósceles y obtusángulo', 'Escaleno y rectángulo'], answer: 0,
    steps: [
      r`Según los lados: los tres lados son distintos, entonces es escaleno.`,
      r`Según los ángulos: uno mide $104°$, mayor que $90°$, entonces es obtusángulo.`,
    ],
  },
  {
    id: '7B', sec: 7, pts: 4,
    prompt: r`Los ángulos interiores de un triángulo miden $x$, $(x + 10)°$ y $(x + 20)°$. ¿Cuánto mide cada uno?`,
    options: ['60°, 70° y 80°', '40°, 50° y 60°', '50°, 60° y 70°', '45°, 55° y 65°'], answer: 2,
    steps: [
      r`Los ángulos interiores de un triángulo suman $180°$: $x + (x + 10) + (x + 20) = 180$.`,
      r`$3x + 30 = 180$, entonces $3x = 150$ y $x = 50$.`,
      r`Los ángulos miden $50°$, $50° + 10° = 60°$ y $50° + 20° = 70°$.`,
      r`Verifico: $50 + 60 + 70 = 180$. ✓`,
    ],
  },
  {
    id: '7C1', sec: 7, pts: 2,
    prompt: 'Dos ángulos interiores de un triángulo miden 52° y 67°. ¿Cuánto mide el tercer ángulo interior?',
    options: ['119°', '128°', '61°', '113°'], answer: 2,
    steps: [
      r`Los tres ángulos interiores suman $180°$.`,
      r`Primero sumo los que conozco: $52° + 67° = 119°$.`,
      r`Resto del total: $180° - 119° = 61°$.`,
    ],
  },
  {
    id: '7C2', sec: 7, pts: 2,
    prompt: 'En el mismo triángulo (ángulos de 52°, 67° y 61°), ¿cuánto mide el ángulo exterior adyacente al ángulo de 61°?',
    options: ['61°', '119°', '241°', '129°'], answer: 1,
    steps: [
      r`Un ángulo exterior y el interior adyacente son suplementarios: suman $180°$.`,
      r`$180° - 61° = 119°$.`,
      r`Control: el ángulo exterior también es igual a la suma de los otros dos interiores: $52° + 67° = 119°$. ✓`,
    ],
  },
  {
    id: '7D1', sec: 7, pts: 2,
    prompt: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?',
    options: ['14 cm', '10 cm', '100 cm', '48 cm'], answer: 1,
    steps: [
      r`Teorema de Pitágoras: $h^2 = c_1^2 + c_2^2$.`,
      r`$h^2 = 6^2 + 8^2 = 36 + 64 = 100$.`,
      r`$h = \sqrt{100} = 10$ cm (no olvides sacar la raíz al final).`,
    ],
  },
  {
    id: '7D2', sec: 7, pts: 3,
    prompt: 'Un triángulo rectángulo tiene hipotenusa de 17 cm y un cateto de 8 cm. ¿Cuánto mide el otro cateto?',
    options: ['9 cm', '15 cm', '225 cm', '25 cm'], answer: 1,
    steps: [
      r`La hipotenusa es el lado más largo (el opuesto al ángulo recto). Despejo el cateto: $c^2 = h^2 - c_1^2$.`,
      r`$c^2 = 17^2 - 8^2 = 289 - 64 = 225$.`,
      r`$c = \sqrt{225} = 15$ cm.`,
    ],
  },
  {
    id: '7D3', sec: 7, pts: 3,
    prompt: 'Una escalera de 5 m está apoyada contra una pared. Su base está a 3 m de la pared. ¿A qué altura de la pared llega?',
    options: ['8 m', '2 m', '16 m', '4 m'], answer: 3,
    steps: [
      r`La pared, el piso y la escalera forman un triángulo rectángulo. La escalera es la hipotenusa (5 m) y la distancia al piso es un cateto (3 m).`,
      r`Busco el otro cateto: $h^2 = 5^2 - 3^2 = 25 - 9 = 16$.`,
      r`$h = \sqrt{16} = 4$ m. La escalera llega a 4 m de altura.`,
    ],
  },
]


// Mezcla determinística (misma mezcla siempre) para que la respuesta correcta no quede siempre en la misma letra.
function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const QUESTIONS = RAW.map((q) => {
  if (q.options.length !== 4) return q // Verdadera/Falsa se deja en su orden
  const rnd = seeded(q.id)
  const idx = [0, 1, 2, 3]
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return { ...q, options: idx.map((k) => q.options[k]), answer: idx.indexOf(q.answer) }
})

export const TOTAL = QUESTIONS.reduce((s, q) => s + q.pts, 0)
