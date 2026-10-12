// Generadores del modo práctica: misma tipología que el examen, con números al azar.
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const pick = (a) => a[rnd(0, a.length - 1)]
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]] } return a }
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a))
const M = (s) => '$' + s + '$'
const fr = (p, q) => { const g = gcd(p, q); p /= g; q /= g; return q === 1 ? M(String(p)) : M(`\\frac{${p}}{${q}}`) }
const frRaw = (p, q) => M(`\\frac{${p}}{${q}}`)
const dec = (x) => String(parseFloat(x.toFixed(6))).replace('.', ',')
const offs = (k) => (k % 2 ? Math.ceil(k / 2) : -Math.ceil(k / 2))

// Arma la pregunta: 1 correcta + 3 distractores únicos (si faltan, se completan con fb(k)).
function build(sec, prompt, correct, wrongs, steps, fb) {
  const w = [...new Set(wrongs.filter((x) => x && x !== correct))]
  for (let k = 1; w.length < 3 && k < 40; k++) { const c = fb(k); if (c !== correct && !w.includes(c)) w.push(c) }
  const options = shuffle([correct, ...w.slice(0, 3)])
  return { sec, prompt, options, answer: options.indexOf(correct), steps }
}
const num = (v, f = (n) => String(n)) => (k) => f(v + offs(k))
const okInt = (n) => (Number.isInteger(n) ? n : null)

const G = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] }

// ---------- 1. Cálculos combinados ----------
G[1].push(() => {
  const A = rnd(2, 5), B = rnd(2, 4), Dv = rnd(2, 4), q = rnd(2, 6), C = Dv * q, k = rnd(3, 9), E = k * k
  const v = A * A * B - q + k
  return build(1, `Resolvé: ${M(`${A}^2 \\cdot ${B} - ${C} : ${Dv} + \\sqrt{${E}}`)}`, String(v),
    [String(v + 2 * q), String(A * A * B - q + E), String(v + 1)],
    ['Separo en términos.', `Resuelvo potencias y raíces: ${M(`${A * A} \\cdot ${B} - ${C} : ${Dv} + ${k}`)} (porque ${M(`\\sqrt{${E}} = ${k}`)}).`,
      `Multiplico y divido: ${M(`${A * A * B} - ${q} + ${k}`)}.`, `Sumo y resto de izquierda a derecha: ${M(String(v))}.`], num(v))
})
G[1].push(() => {
  const m = pick([2, 3]), a = rnd(2, 4), b = rnd(2, 3), c = rnd(2, a + b - 1), n = a + b - c, v = m ** n
  return build(1, `Calculá: ${M(`(${m}^{${a}} \\cdot ${m}^{${b}}) : ${m}^{${c}}`)}`, String(v),
    [String(m ** (a * b - c)), String(m ** (n + 1)), String(m ** (n > 1 ? n - 1 : n + 2))],
    [`Producto de igual base: se suman los exponentes, ${M(`${a} + ${b} = ${a + b}`)}.`, `Cociente de igual base: se restan los exponentes, ${M(`${a + b} - ${c} = ${n}`)}.`,
      `Queda ${M(`${m}^{${n}} = ${v}`)}.`], num(v))
})
G[1].push(() => {
  const k = rnd(2, 4), b = rnd(2, 5), s = rnd(2, 5), v = k + b * b - s
  return build(1, `Resolvé: ${M(`\\sqrt[3]{${k ** 3}} + 7^0 \\cdot ${b}^2 - \\sqrt{${s * s}}`)}`, String(v),
    [String(k - s), String(k + b * b + s), String(k + b * b - s + 1)],
    [`Raíces: ${M(`\\sqrt[3]{${k ** 3}} = ${k}`)} y ${M(`\\sqrt{${s * s}} = ${s}`)}. Además ${M('7^0 = 1')}.`, `Potencia: ${M(`${b}^2 = ${b * b}`)}.`,
      `Queda ${M(`${k} + ${b * b} - ${s} = ${v}`)}.`], num(v))
})

// ---------- 2. Propiedades (V/F) ----------
const props = [
  () => { let b = rnd(2, 6), m, n; do { m = rnd(2, 6); n = rnd(2, 6) } while (m * n === m + n)
    return { t: `${b}^{${m}} \\cdot ${b}^{${n}} = ${b}^{${m + n}}`, f: `${b}^{${m}} \\cdot ${b}^{${n}} = ${b}^{${m * n}}`,
      wt: `En el producto de igual base se suman los exponentes: ${m} + ${n} = ${m + n}.`, wf: `En el producto de igual base se SUMAN los exponentes (${m} + ${n} = ${m + n}), no se multiplican.` } },
  () => { const b = rnd(2, 6), n = rnd(1, 3), m = n + rnd(1, 4)
    return { t: `${b}^{${m}} : ${b}^{${n}} = ${b}^{${m - n}}`, f: `${b}^{${m}} : ${b}^{${n}} = ${b}^{${m + n}}`,
      wt: `En el cociente de igual base se restan los exponentes: ${m} - ${n} = ${m - n}.`, wf: `En el cociente de igual base se RESTAN los exponentes (${m} - ${n} = ${m - n}).` } },
  () => { let b = rnd(2, 6), m, n; do { m = rnd(2, 5); n = rnd(2, 5) } while (m * n === m + n)
    return { t: `(${b}^{${m}})^{${n}} = ${b}^{${m * n}}`, f: `(${b}^{${m}})^{${n}} = ${b}^{${m + n}}`,
      wt: `En la potencia de una potencia se multiplican los exponentes: ${m} \\cdot ${n} = ${m * n}.`.replace(/\\cdot/, '·'), wf: `En la potencia de una potencia se MULTIPLICAN los exponentes (${m}·${n} = ${m * n}), no se suman.` } },
  () => { const a = rnd(2, 6), b = rnd(2, 6), n = rnd(2, 4)
    return { t: `(${a} \\cdot ${b})^{${n}} = ${a}^{${n}} \\cdot ${b}^{${n}}`, f: `(${a} \\cdot ${b})^{${n}} = ${a} \\cdot ${b}^{${n}}`,
      wt: 'La potenciación es distributiva respecto de la multiplicación: el exponente afecta a cada factor.', wf: 'El exponente afecta a TODOS los factores del producto, no solo al segundo.' } },
  () => { const a = rnd(2, 8), b = rnd(2, 8)
    return { t: `(${a} + ${b})^2 = (${a} + ${b}) \\cdot (${a} + ${b})`, f: `(${a} + ${b})^2 = ${a}^2 + ${b}^2`,
      wt: 'Elevar al cuadrado es multiplicar la base por sí misma.', wf: `La potencia NO es distributiva respecto de la suma: ${(a + b) ** 2} ≠ ${a * a + b * b}.` } },
  () => { const p = rnd(2, 6), q = rnd(2, 6)
    return { t: `\\sqrt{${p * p} \\cdot ${q * q}} = \\sqrt{${p * p}} \\cdot \\sqrt{${q * q}}`, f: `\\sqrt{${p * p} + ${q * q}} = \\sqrt{${p * p}} + \\sqrt{${q * q}}`,
      wt: `La radicación es distributiva respecto de la multiplicación: ambos lados dan ${p * q}.`, wf: `La radicación NO es distributiva respecto de la suma: ${M(`\\sqrt{${p * p + q * q}}`)} no es ${p + q}.` } },
  () => { const b = rnd(2, 9)
    return { t: `${b}^0 = 1`, f: `${b}^0 = ${b}`, wt: 'Todo número distinto de 0 elevado a la 0 es 1.', wf: `Todo número distinto de 0 elevado a la 0 es 1, no ${b}.` } },
]
G[2].push(() => {
  const p = pick(props)(), truth = Math.random() < 0.5
  return { sec: 2, prompt: `¿Es verdadera o falsa? ${M(truth ? p.t : p.f)}`, options: ['Verdadera', 'Falsa'], answer: truth ? 0 : 1,
    steps: [(truth ? p.wt : p.wf).replace(/\\\$/g, '$')] }
})

// ---------- 3. Ecuaciones en N ----------
const xo = (n) => M(`x = ${n}`)
G[3].push(() => {
  const x = rnd(2, 9), a = rnd(2, 6), b = rnd(2, 9), c = a * x + b
  return build(3, `Hallá $x$: ${M(`${a}x + ${b} = ${c}`)}`, xo(x), [xo(c - b), xo(x + 1), xo(x - 1)],
    [`Paso ${b} restando: ${M(`${a}x = ${c} - ${b} = ${c - b}`)}.`, `Paso ${a} dividiendo: ${M(`x = ${c - b} : ${a} = ${x}`)}.`, `Verifico: ${M(`${a} \\cdot ${x} + ${b} = ${c}`)}. ✓`], (k) => xo(x + offs(k)))
})
G[3].push(() => {
  const x = rnd(2, 8), a = rnd(2, 5), b = rnd(1, 6), c = rnd(1, 6), d = a * (x + b) - c
  return build(3, `Hallá $x$: ${M(`${a}(x + ${b}) - ${c} = ${d}`)}`, xo(x),
    [okInt((d + c) / a) !== null ? xo((d + c) / a) : null, okInt((d - c) / a) !== null ? xo((d - c) / a) : null, xo(x + 2)],
    [`Distributiva: ${M(`${a}x + ${a * b} - ${c} = ${d}`)}.`, `Reduzco: ${M(`${a}x + ${a * b - c} = ${d}`)}.`, `${M(`${a}x = ${d - a * b + c}`)}, entonces ${M(`x = ${x}`)}.`,
      `Verifico: ${M(`${a}(${x} + ${b}) - ${c} = ${d}`)}. ✓`], (k) => xo(x + offs(k)))
})
G[3].push(() => {
  const x = rnd(2, 8), c = rnd(1, 4), a = c + rnd(2, 4), b = rnd(1, 9), d = a * x + b - c * x
  return build(3, `Hallá $x$: ${M(`${a}x + ${b} = ${c}x + ${d}`)}`, xo(x),
    [okInt((d + b) / (a - c)) !== null ? xo((d + b) / (a - c)) : null, okInt((d - b) / (a + c)) !== null ? xo((d - b) / (a + c)) : null, xo(x + 1)],
    [`Junto las $x$ a la izquierda y los números a la derecha: ${M(`${a}x - ${c}x = ${d} - ${b}`)}.`, `${M(`${a - c}x = ${d - b}`)}, entonces ${M(`x = ${x}`)}.`,
      `Verifico: ${M(`${a * x + b}`)} = ${M(`${c * x + d}`)}. ✓`], (k) => xo(x + offs(k)))
})
G[3].push(() => {
  const m = rnd(4, 9), k0 = rnd(1, 9), x = m * m - k0
  return build(3, `Hallá $x$: ${M(`\\sqrt{x + ${k0}} = ${m}`)}`, xo(x), [xo(m * m + k0), xo(m - k0), xo(m + k0)],
    [`Elevo ambos miembros al cuadrado: ${M(`x + ${k0} = ${m}^2 = ${m * m}`)}.`, `${M(`x = ${m * m} - ${k0} = ${x}`)}.`, `Verifico: ${M(`\\sqrt{${x} + ${k0}} = \\sqrt{${m * m}} = ${m}`)}. ✓`], (k) => xo(x + offs(k)))
})

// ---------- 4. Racionales ----------
const PQ = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 8], [1, 20], [3, 20], [1, 25], [7, 25], [9, 20]]
G[4].push(() => {
  const [p, q] = pick(PQ), v = p / q, ds = dec(v), nd = ds.split(',')[1].length, den = 10 ** nd, numr = Math.round(v * den)
  return build(4, `Expresá ${M(ds.replace(',', '{,}'))} como fracción irreducible.`, fr(p, q),
    [den !== q ? frRaw(numr, den) : null, frRaw(q, p), fr(p + 1, q)],
    [`Tiene ${nd} ${nd === 1 ? 'cifra decimal' : 'cifras decimales'}: ${frRaw(numr, den)}.`, `Simplifico dividiendo por ${gcd(numr, den)}: ${fr(p, q)}.`], (k) => fr(p + k, q + k))
})
G[4].push(() => {
  const [p, q] = pick(PQ), v = p / q, ds = dec(v)
  return build(4, `Expresá ${frRaw(p, q)} como número decimal.`, ds, [dec(v * 10), dec(v / 10), `${p},${q}`],
    [`Divido el numerador por el denominador: ${M(`${p} : ${q}`)}.`, `Resulta ${M(ds.replace(',', '{,}'))}.`], (k) => dec(v + k / 10))
})
G[4].push(() => {
  let b, d; do { b = pick([2, 3, 4, 5, 6]); d = pick([2, 3, 4, 5, 6]) } while (b === d)
  const a = rnd(1, b - 1), c = rnd(1, d - 1), n = a * d + c * b
  return build(4, `Resolvé y simplificá: ${M(`\\frac{${a}}{${b}} + \\frac{${c}}{${d}}`)}`, fr(n, b * d),
    [frRaw(a + c, b + d), frRaw(n, b * d), fr(a * c, b * d), fr(n, b + d)],
    [`Denominador común: ${b} · ${d} = ${b * d}.`, `${frRaw(a * d, b * d)} + ${frRaw(c * b, b * d)} = ${frRaw(n, b * d)}.`, `Simplifico: ${fr(n, b * d)}.`], (k) => fr(n + k, b * d))
})
G[4].push(() => {
  const b = rnd(2, 9), d = rnd(2, 9), a = rnd(1, b - 1), c = rnd(1, d - 1)
  return build(4, `Resolvé y simplificá: ${M(`\\frac{${a}}{${b}} \\cdot \\frac{${c}}{${d}}`)}`, fr(a * c, b * d),
    [frRaw(a * c, b * d), fr(a * d, b * c), fr(a + c, b + d)],
    [`Multiplico numeradores entre sí y denominadores entre sí: ${frRaw(a * c, b * d)}.`, `Simplifico: ${fr(a * c, b * d)}.`], (k) => fr(a * c + k, b * d))
})
G[4].push(() => {
  const m = rnd(2, 5), n = rnd(1, 4), t = rnd(2, 6), kk = rnd(1, Math.min(5, n * t - 1)), j = n * t - kk, x = m * t
  return build(4, `Hallá $x$: ${M(`\\frac{${n}}{${m}}x - ${kk} = ${j}`)}`, xo(x), [xo(j * m), xo(x + m), xo(x - m)],
    [`Paso ${kk} sumando: ${M(`\\frac{${n}}{${m}}x = ${j + kk}`)}.`, `Multiplico por ${m}: ${M(`${n}x = ${(j + kk) * m}`)}.`, `Divido por ${n}: ${M(`x = ${x}`)}.`], (k) => xo(x + offs(k)))
})

// ---------- 5. Lenguaje simbólico y problemas ----------
G[5].push(() => {
  const [n, nm] = pick([[2, 'doble'], [3, 'triple'], [4, 'cuádruple']]), [s, op] = pick([['+', 'aumentado'], ['-', 'disminuido']]), k = rnd(2, 9)
  return build(5, `Lenguaje simbólico (x = el número): «El ${nm} de un número, ${op} en ${k}».`, M(`${n}x ${s} ${k}`),
    [M(`${n}(x ${s} ${k})`), M(`${k}x ${s} ${n}`), M(`x^{${n}} ${s} ${k}`)],
    [`«El ${nm} de un número» es ${M(`${n}x`)}.`, `«${op[0].toUpperCase() + op.slice(1)} en ${k}» indica ${s === '+' ? 'sumar' : 'restar'} ${k} a ese resultado: ${M(`${n}x ${s} ${k}`)}.`], (q) => M(`${n}x ${s} ${k + q}`))
})
G[5].push(() => {
  const [n, nm] = pick([[2, 'doble'], [3, 'triple'], [4, 'cuádruple']]), [s, w] = pick([['+', 'siguiente'], ['-', 'anterior']]), o = s === '+' ? '-' : '+'
  return build(5, `Lenguaje simbólico (x = el número): «El ${nm} del ${w} de un número».`, M(`${n}(x ${s} 1)`),
    [M(`${n}x ${s} 1`), M(`x ${s} ${n}`), M(`${n}(x ${o} 1)`)],
    [`«El ${w} de un número» es ${M(`x ${s} 1`)}.`, `«El ${nm}» de todo eso se escribe con paréntesis: ${M(`${n}(x ${s} 1)`)}.`], (q) => M(`${n}(x ${s} ${1 + q})`))
})
G[5].push(() => {
  const [s, w] = pick([['+', 'suma'], ['-', 'diferencia']]), k = rnd(2, 9)
  return build(5, `Lenguaje simbólico (x = el número): «El cuadrado de la ${w} entre un número y ${k}».`, M(`(x ${s} ${k})^2`),
    [M(`x^2 ${s} ${k}`), M(`x^2 ${s} ${k * k}`), M(`2(x ${s} ${k})`)],
    [`«La ${w} entre un número y ${k}» es ${M(`x ${s} ${k}`)}.`, `«El cuadrado» de esa ${w}: ${M(`(x ${s} ${k})^2`)}. No es lo mismo que ${M(`x^2 ${s} ${k * k}`)}.`], (q) => M(`(x ${s} ${k + q})^2`))
})
G[5].push(() => {
  const x = rnd(10, 40), d = rnd(4, 15), L = 2 * x + d, f = (a, b) => `${a} cm y ${b} cm`
  return build(5, `Una tabla de ${L} cm se corta en dos trozos. Uno mide ${d} cm más que el otro. ¿Cuánto mide cada trozo?`, f(x, x + d),
    [f(x - 1, x + d - 1), f(L / 2, L / 2 + d), f(x + 2, x + d + 2)],
    [`$x$ = trozo corto; el otro mide ${M(`x + ${d}`)}.`, `${M(`x + (x + ${d}) = ${L}`)}, entonces ${M(`2x = ${L - d}`)} y ${M(`x = ${x}`)}.`, `El otro mide ${x + d} cm. Verifico: ${x} + ${x + d} = ${L}. ✓`], (k) => f(x + offs(k), x + d + offs(k)))
})
G[5].push(() => {
  const x = rnd(8, 25), d = rnd(3, 9), S = 2 * x + d, [n1, n2] = pick([['Tomás', 'Ana'], ['Lucía', 'Mateo'], ['Sofi', 'Bruno']]), f = (a, b) => `${n1} ${a} y ${n2} ${b}`
  return build(5, `${n2} tiene ${d} años más que ${n1}. Entre los dos suman ${S} años. ¿Qué edad tiene cada uno?`, f(x, x + d),
    [f(S - d, S), f(x + d, x), f(x + 2, x + d + 2)],
    [`$x$ = edad de ${n1}; ${n2} tiene ${M(`x + ${d}`)}.`, `${M(`x + (x + ${d}) = ${S}`)}, entonces ${M(`2x = ${S - d}`)} y ${M(`x = ${x}`)}.`, `${n2} tiene ${x + d}. Verifico: ${x} + ${x + d} = ${S}. ✓`], (k) => f(x + offs(k), x + d + offs(k)))
})
G[5].push(() => {
  const x = rnd(10, 40), S = 3 * x + 3, f = (a) => `${a}, ${a + 1} y ${a + 2}`
  return build(5, `La suma de tres números consecutivos es ${S}. ¿Cuáles son esos números?`, f(x),
    [f(S / 3), f(x - 1), f(x + 2)],
    [`El menor es $x$; los otros son ${M('x + 1')} y ${M('x + 2')}.`, `${M(`x + (x + 1) + (x + 2) = ${S}`)}, entonces ${M(`3x = ${S - 3}`)} y ${M(`x = ${x}`)}.`, `Verifico: ${x} + ${x + 1} + ${x + 2} = ${S}. ✓`], (k) => f(x + offs(k)))
})
G[5].push(() => {
  const c = rnd(2, 9) * 50, n = rnd(2, 5), p = rnd(2, 9) * 50, T = n * c + p, f = (v) => `\\$${v}`
  return build(5, `Mario compró ${n} cuadernos iguales y una lapicera de \\$${p}. En total pagó \\$${T}. ¿Cuánto cuesta cada cuaderno?`, f(c),
    [f(T / n), f(T - p), f((T + p) / n)],
    [`$x$ = precio de un cuaderno.`, `${M(`${n}x + ${p} = ${T}`)}, entonces ${M(`${n}x = ${T - p}`)}.`, `${M(`x = ${T - p} : ${n} = ${c}`)}. Cada cuaderno cuesta \\$${c}.`], (k) => f(c + 50 * offs(k)))
})

// ---------- 6. Ángulos ----------
const dg = (n) => `${n}°`
G[6].push(() => {
  const comp = Math.random() < 0.5, a = comp ? rnd(10, 80) : rnd(20, 160), t = comp ? 90 : 180, v = t - a
  return build(6, `Calculá el ${comp ? 'complemento' : 'suplemento'} de un ángulo de ${a}°.`, dg(v), [dg(a), dg(comp ? 180 - a : 90 - a > 0 ? 90 - a : a + 10), dg(360 - a)],
    [`Los ángulos ${comp ? 'complementarios suman 90°' : 'suplementarios suman 180°'}.`, `${t}° − ${a}° = ${v}°.`], (k) => dg(v + 5 * offs(k)))
})
G[6].push(() => {
  const x = rnd(5, 15), a = rnd(2, 4), c = a + rnd(1, 3), b = rnd(12, 30), v = a * x + b, d = v - c * x
  return build(6, `Dos ángulos opuestos por el vértice miden ${M(`(${a}x + ${b})°`)} y ${M(`(${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)})°`)}. ¿Cuánto mide cada uno?`, dg(v),
    [dg(x), dg(180 - v), dg(2 * v)],
    [`Opuestos por el vértice → son iguales: ${M(`${a}x + ${b} = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`)}.`, `${M(`${b - d} = ${c - a}x`)}, entonces ${M(`x = ${x}`)}.`, `Cada ángulo mide ${M(`${a} \\cdot ${x} + ${b} = ${v}`)}°.`], (k) => dg(v + 5 * offs(k)))
})
G[6].push(() => {
  const th = pick([40, 50, 55, 65, 70, 75, 110, 115, 125, 130, 140]), [rel, same] = pick([['correspondiente', 1], ['alterno interno', 1], ['conjugado interno', 0], ['adyacente', 0], ['opuesto por el vértice', 1]]), v = same ? th : 180 - th
  return build(6, `Dos rectas paralelas están cortadas por una transversal. Un ángulo mide ${th}°. ¿Cuánto mide su ángulo ${rel}?`, dg(v),
    [dg(same ? 180 - th : th), dg(Math.abs(90 - th)), dg(th + 10)],
    [same ? `Los ángulos ${rel}s son iguales: ${th}°.` : `Los ángulos ${rel}s son suplementarios (suman 180°): ${M(`180° - ${th}° = ${v}°`)}.`], (k) => dg(v + 5 * offs(k)))
})
G[6].push(() => {
  const T = 2 * rnd(30, 85)
  return build(6, `El ángulo ${M('\\widehat{AOB}')} mide ${T}° y $OC$ es su bisectriz. ¿Cuánto mide ${M('\\widehat{AOC}')}?`, dg(T / 2), [dg(T), dg(2 * T), dg(180 - T / 2)],
    ['La bisectriz divide al ángulo en dos ángulos iguales.', `${T}° : 2 = ${T / 2}°.`], (k) => dg(T / 2 + 2 * offs(k)))
})

// ---------- 7. Triángulos ----------
const TRI = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29], [12, 16, 20]]
G[7].push(() => {
  const kind = pick(['equi', 'iso', 'esc']); let A, B, C
  if (kind === 'equi') A = B = C = 60
  else if (kind === 'iso') { A = B = pick([30, 35, 40, 45, 50, 55, 65, 70, 75]); C = 180 - 2 * A }
  else { do { A = rnd(25, 80); B = rnd(25, 80); C = 180 - A - B } while (C < 20 || new Set([A, B, C]).size < 3) }
  const L = { equi: 'Equilátero', iso: 'Isósceles', esc: 'Escaleno' }[kind], mx = Math.max(A, B, C), cl = mx < 90 ? 'acutángulo' : mx === 90 ? 'rectángulo' : 'obtusángulo'
  const oL = Object.values({ equi: 'Equilátero', iso: 'Isósceles', esc: 'Escaleno' }).filter((x) => x !== L), oC = ['acutángulo', 'rectángulo', 'obtusángulo'].filter((x) => x !== cl)
  const ang = shuffle([A, B, C]).map(dg).join(', ')
  return build(7, `Un triángulo tiene ángulos de ${ang}. Clasificalo según sus lados y según sus ángulos.`, `${L} y ${cl}`,
    [`${oL[0]} y ${cl}`, `${L} y ${oC[0]}`, `${L} y ${oC[1]}`, `${oL[1]} y ${oC[0]}`],
    [`Según los lados: ${kind === 'equi' ? 'tres ángulos iguales ⇒ tres lados iguales' : kind === 'iso' ? 'dos ángulos iguales ⇒ dos lados iguales' : 'tres ángulos distintos ⇒ tres lados distintos'}: ${L.toLowerCase()}.`,
      `Según los ángulos: el mayor mide ${mx}° (${mx < 90 ? 'menor' : mx === 90 ? 'igual' : 'mayor'} que 90°): ${cl}.`], () => `${oL[1]} y ${oC[1]}`)
})
G[7].push(() => {
  let a, b, x; do { a = rnd(5, 25); b = a + rnd(5, 20); x = (180 - a - b) / 3 } while (!Number.isInteger(x))
  return build(7, `Los ángulos interiores de un triángulo miden $x$, ${M(`(x + ${a})°`)} y ${M(`(x + ${b})°`)}. ¿Cuánto mide el mayor?`, dg(x + b),
    [dg(60 + b), dg(x), dg(x + a)], [`Suman 180°: ${M(`x + (x + ${a}) + (x + ${b}) = 180`)}.`, `${M(`3x = ${180 - a - b}`)}, entonces ${M(`x = ${x}`)}.`, `El mayor es ${M(`x + ${b} = ${x + b}`)}°.`], (k) => dg(x + b + offs(k)))
})
G[7].push(() => {
  let A, B; do { A = rnd(35, 80); B = rnd(35, 80) } while (A + B > 150)
  const C = 180 - A - B
  return build(7, `Dos ángulos interiores de un triángulo miden ${A}° y ${B}°. ¿Cuánto mide el ángulo exterior adyacente al tercer ángulo?`, dg(A + B),
    [dg(C), dg(180 - A), dg(180 - B)], [`El tercer ángulo interior mide ${M(`180° - ${A}° - ${B}° = ${C}°`)}.`, `El exterior adyacente es suplementario: ${M(`180° - ${C}° = ${A + B}°`)} (igual a la suma de los otros dos).`], (k) => dg(A + B + 5 * offs(k)))
})
G[7].push(() => {
  const [a, b, c] = pick(TRI), v = pick([0, 1, 2])
  if (v === 0) return build(7, `Un triángulo rectángulo tiene catetos de ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa?`, `${c} cm`, [`${a + b} cm`, `${a * a + b * b} cm`, `${c + 1} cm`],
    [`Pitágoras: ${M(`h^2 = ${a}^2 + ${b}^2 = ${a * a + b * b}`)}.`, `${M(`h = \\sqrt{${a * a + b * b}} = ${c}`)} cm.`], (k) => `${c + offs(k)} cm`)
  if (v === 1) return build(7, `Un triángulo rectángulo tiene hipotenusa de ${c} cm y un cateto de ${a} cm. ¿Cuánto mide el otro cateto?`, `${b} cm`, [`${c - a} cm`, `${b * b} cm`, `${c + a} cm`],
    [`${M(`c^2 = ${c}^2 - ${a}^2 = ${c * c - a * a}`)}.`, `${M(`c = \\sqrt{${b * b}} = ${b}`)} cm.`], (k) => `${b + offs(k)} cm`)
  return build(7, `Una escalera de ${c} m está apoyada en una pared. Su base está a ${a} m de la pared. ¿A qué altura llega?`, `${b} m`, [`${c - a} m`, `${c + a} m`, `${b * b} m`],
    [`La escalera es la hipotenusa (${c} m) y la distancia a la pared es un cateto (${a} m).`, `${M(`h^2 = ${c}^2 - ${a}^2 = ${b * b}`)}, entonces ${M(`h = ${b}`)} m.`], (k) => `${b + offs(k)} m`)
})

let last = ''
export function generate(topic = 0) {
  for (let i = 0; i < 10; i++) {
    const sec = topic || rnd(1, 7), q = pick(G[sec])()
    if (q.prompt !== last) { last = q.prompt; return q }
  }
  return pick(G[topic || 1])()
}

// ---------- Simulacro: examen nuevo con el mismo formato y puntaje (100 pts, 56 preguntas) ----------
// [índice de generador dentro de la sección (null = al azar), puntos]
const PLAN = {
  1: [[0, 3], [1, 3], [2, 3], [0, 3]],
  2: Array(8).fill([null, 1]),
  3: [[0, 2], [1, 2], [2, 2], [3, 2], [1, 2]],
  4: [[0, 1], [0, 1], [0, 1], [1, 1], [1, 1], [1, 1], [2, 2], [2, 2], [3, 2], [3, 2], [4, 2], [4, 2]],
  5: [[0, 1], [1, 1], [2, 1], [1, 1], [3, 4], [4, 4], [5, 4], [6, 4]],
  6: [[0, 1], [0, 1], [1, 4], [2, 1], [2, 1], [2, 1], [2, 1], [3, 1], [3, 1]],
  7: [[0, 1], [0, 1], [0, 1], [0, 1], [1, 4], [2, 2], [2, 2], [3, 2], [3, 3], [3, 3]],
}
export function generateSimulacro() {
  const out = []
  let n = 0
  for (let sec = 1; sec <= 7; sec++) {
    const seen = new Set()
    PLAN[sec].forEach(([gi, pts]) => {
      let q
      for (let k = 0; k < 30; k++) {
        q = (gi === null ? pick(G[sec]) : G[sec][gi])()
        if (!seen.has(q.prompt)) break
      }
      seen.add(q.prompt)
      out.push({ ...q, id: `S${++n}`, sec, pts })
    })
  }
  return out
}
