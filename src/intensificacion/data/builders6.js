// Armadores para 6.º año: vectores, recta, números complejos, límites, continuidad, asíntotas, derivadas,
// análisis de funciones, optimización e integrales. Las respuestas se calculan (no se cargan a mano).
import { num, sel, item } from './builders'
import { numset } from './builders5'

const r = String.raw
const M = '−'
const v = (n) => String(n).replace('-', M)
const par = (n) => (n < 0 ? `(${n})` : `${n}`)
const r2 = (x) => Math.round(x * 100) / 100
const dc = (x) => String(r2(x)).replace('.', '{,}') // decimal en TeX
const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-9
const DEG = 180 / Math.PI

// ---------- Racionales exactos ----------
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a))
export const Q = (n, d = 1) => { if (d < 0) { n = -n; d = -d } const g = gcd(n, d) || 1; return { n: n / g, d: d / g } }
const asQ = (x) => (typeof x === 'number' ? Q(x) : x)
export const qadd = (a, b) => { a = asQ(a); b = asQ(b); return Q(a.n * b.d + b.n * a.d, a.d * b.d) }
export const qsub = (a, b) => { a = asQ(a); b = asQ(b); return Q(a.n * b.d - b.n * a.d, a.d * b.d) }
export const qmul = (a, b) => { a = asQ(a); b = asQ(b); return Q(a.n * b.n, a.d * b.d) }
export const qdiv = (a, b) => { a = asQ(a); b = asQ(b); return Q(a.n * b.d, a.d * b.n) }
export const qs = (q) => (q.d === 1 ? `${q.n}` : `${q.n}/${q.d}`) // para respuestas: «-3/2»
export const qt = (q) => (q.d === 1 ? `${q.n}` : r`${q.n < 0 ? '-' : ''}\frac{${Math.abs(q.n)}}{${q.d}}`) // TeX
export const qn = (q) => q.n / q.d

// ---------- Vectores ----------
const vt = (a) => r`(${a[0]}\,;\,${a[1]})`
const argDeg = (x, y) => { const a = Math.atan2(y, x) * DEG; return a < 0 ? a + 360 : a }
const QUAD = { 1: '1.er cuadrante: el argumento es el ángulo de referencia', 2: '2.º cuadrante: argumento = 180° − ángulo de referencia', 3: '3.er cuadrante: argumento = 180° + ángulo de referencia', 4: '4.º cuadrante: argumento = 360° − ángulo de referencia' }
const quadrant = (x, y) => (x > 0 && y > 0 ? 1 : x < 0 && y > 0 ? 2 : x < 0 && y < 0 ? 3 : 4)
const valueOrApprox = (x) => (isInt(x) ? { answer: String(Math.round(x)) } : { answer: String(r2(x)), tol: 0.01 })

// Suma, resta y producto por un número: ops = [{ text, tex, a, b }] calcula a·u + b·w.
export function vecOps(id, u, w, ops) {
  const fields = ops.flatMap((o) => {
    const c = [o.a * u[0] + o.b * w[0], o.a * u[1] + o.b * w[1]]
    return [num(c[0], { label: `${o.text}: componente x`, aria: `${o.text}, componente x:` }), num(c[1], { label: `${o.text}: componente y`, aria: `${o.text}, componente y:` })]
  })
  const steps = ops.flatMap((o) => [
    r`$${o.tex}$: se opera componente a componente. Componente $x$: $${o.a} \cdot ${par(u[0])} + ${par(o.b)} \cdot ${par(w[0])} = ${o.a * u[0] + o.b * w[0]}$.`,
    r`Componente $y$: $${o.a} \cdot ${par(u[1])} + ${par(o.b)} \cdot ${par(w[1])} = ${o.a * u[1] + o.b * w[1]}$.`,
  ])
  return item(id, r`Dados $\vec{u} = ${vt(u)}$ y $\vec{v} = ${vt(w)}$, calculá ${ops.map((o) => `$${o.tex}$`).join(', ')}.`, fields, steps)
}

export function vecModArg(id, vec, name = 'u') {
  const [x, y] = vec, mod = Math.hypot(x, y), ang = argDeg(x, y), ref = Math.atan(Math.abs(y / x)) * DEG, q = quadrant(x, y)
  return item(id, r`Dado $\vec{${name}} = ${vt(vec)}$, calculá su módulo y su argumento (en grados, entre $0°$ y $360°$, con un decimal).`, [
    num(valueOrApprox(mod).answer, { label: `Módulo $|\\vec{${name}}|$ =`, aria: 'Módulo:', ...(isInt(mod) ? {} : { tol: 0.01 }) }),
    num(String(r2(ang)), { label: 'Argumento (grados) =', aria: 'Argumento:', tol: 0.1 }),
  ], [
    r`Módulo: $|\vec{${name}}| = \sqrt{${par(x)}^2 + ${par(y)}^2} = \sqrt{${x * x + y * y}}${isInt(mod) ? ` = ${mod}` : r` \approx ${dc(mod)}`}$.`,
    r`Ángulo de referencia: $\operatorname{arctg}\left|\dfrac{${y}}{${x}}\right| \approx ${dc(ref)}°$.`,
    `El vector está en el ${QUAD[q]}.`, r`Argumento: $\alpha \approx ${dc(ang)}°$.`,
  ])
}

export function vecDot(id, u, w) {
  const dot = u[0] * w[0] + u[1] * w[1], mu = Math.hypot(...u), mw = Math.hypot(...w)
  const ang = dot === 0 ? 90 : Math.acos(dot / (mu * mw)) * DEG
  return item(id, r`Dados $\vec{u} = ${vt(u)}$ y $\vec{v} = ${vt(w)}$, calculá el producto escalar $\vec{u} \cdot \vec{v}$ y el ángulo que forman (con un decimal).`, [
    num(dot, { label: 'Producto escalar =', aria: 'Producto escalar:' }),
    num(String(r2(ang)), { label: 'Ángulo entre los vectores (grados) =', aria: 'Ángulo:', tol: 0.1 }),
  ], [
    r`$\vec{u} \cdot \vec{v} = ${par(u[0])} \cdot ${par(w[0])} + ${par(u[1])} \cdot ${par(w[1])} = ${dot}$.`,
    dot === 0 ? 'El producto escalar es 0: los vectores son perpendiculares y forman un ángulo de $90°$.'
      : r`Módulos: $|\vec{u}| = ${isInt(mu) ? mu : r`\sqrt{${u[0] ** 2 + u[1] ** 2}} \approx ${dc(mu)}`}$ y $|\vec{v}| = ${isInt(mw) ? mw : r`\sqrt{${w[0] ** 2 + w[1] ** 2}} \approx ${dc(mw)}`}$.`,
    ...(dot === 0 ? [] : [r`$\cos\theta = \dfrac{\vec{u} \cdot \vec{v}}{|\vec{u}| \cdot |\vec{v}|} \approx ${dc(dot / (mu * mw))}$, entonces $\theta \approx ${dc(ang)}°$.`,
      dot > 0 ? 'El producto es positivo: el ángulo es agudo.' : 'El producto es negativo: el ángulo es obtuso.']),
  ])
}

// ---------- Ecuación vectorial de la recta y sus formas ----------
const lam = (d) => (d === 1 ? 'λ' : `${d}λ`)
const paramText = (c0, d) => (c0 === 0 ? (d < 0 ? `${M}${lam(-d)}` : lam(d)) : `${v(c0)} ${d < 0 ? M : '+'} ${lam(Math.abs(d))}`)
const subText = (c) => (c === 0 ? '' : c > 0 ? ` ${M} ${c}` : ` + ${-c}`)
const den = (n) => (n < 0 ? `(${M}${-n})` : `${n}`)
const vecEq = (P, d) => `(x ; y) = (${v(P[0])} ; ${v(P[1])}) + λ · (${v(d[0])} ; ${v(d[1])})`
const paramEq = (P, d) => `x = ${paramText(P[0], d[0])} ; y = ${paramText(P[1], d[1])}`
const symEq = (P, d) => `${P[0] === 0 ? 'x' : `(x${subText(P[0])})`} / ${den(d[0])} = ${P[1] === 0 ? 'y' : `(y${subText(P[1])})`} / ${den(d[1])}`
function genEq(A, B, C) {
  if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C }
  let s = A !== 0 ? `${A === 1 ? '' : A}x` : ''
  if (B !== 0) s += `${s ? (B < 0 ? ` ${M} ` : ' + ') : (B < 0 ? M : '')}${Math.abs(B) === 1 ? '' : Math.abs(B)}y`
  if (C !== 0) s += `${C < 0 ? ` ${M} ` : ' + '}${Math.abs(C)}`
  return `${s} = 0`
}
const withCorrect = (correct, wrongs, position) => {
  const list = [...new Set(wrongs)].filter((w) => w !== correct).slice(0, 3)
  list.splice(position, 0, correct)
  return list
}
const lineData = (P, d) => ({ A: d[1], B: -d[0], C: d[0] * P[1] - d[1] * P[0], m: d[1] / d[0], n: P[1] - (d[1] / d[0]) * P[0] })

export function lineForms(id, P, d, [p1, p2, p3]) {
  const [a, b] = d, [x0, y0] = P, L = lineData(P, d)
  const paramOpts = withCorrect(paramEq(P, d), [paramEq(P, [b, a]), paramEq(P, [-a, b]), paramEq([y0, x0], d), paramEq(P, [a, -b])], p1)
  const symOpts = withCorrect(symEq(P, d), [symEq(P, [b, a]), symEq([y0, x0], d), symEq(P, [-a, b]), symEq([-x0, -y0], d)], p2)
  const genOpts = withCorrect(genEq(L.A, L.B, L.C), [genEq(a, -b, -a * x0 + b * y0), genEq(b, a, -(b * x0 + a * y0)), genEq(L.A, L.B, -L.C), genEq(a, b, -(a * x0 + b * y0))], p3)
  const texEq = vecEq(P, d).replace(/λ/g, '\\lambda')
  return item(id, `Una recta tiene ecuación vectorial $${texEq}$. Elegí sus otras formas.`, [
    sel('Ecuaciones paramétricas', paramOpts, paramEq(P, d)),
    sel('Forma simétrica (o continua)', symOpts, symEq(P, d)),
    sel('Forma general', genOpts, genEq(L.A, L.B, L.C)),
  ], [
    r`El punto es $P = ${vt(P)}$ y el vector director, $\vec{d} = ${vt(d)}$.`,
    `Paramétricas: ${paramEq(P, d)}. Se escribe una ecuación por cada coordenada.`,
    `Simétrica: se despeja λ de cada paramétrica y se igualan: ${symEq(P, d)}.`,
    `General: se multiplica en cruz, ${d[1]}·(x ${subText(P[0]) || '− 0'}) = ${d[0]}·(y ${subText(P[1]) || '− 0'}), y se pasa todo a un miembro: ${genEq(L.A, L.B, L.C)}.`,
  ])
}

export function lineExplicit(id, P, d) {
  const m = Q(d[1], d[0]), n = qsub(P[1], qmul(m, P[0]))
  return item(id, r`Escribí la ecuación explícita $y = mx + n$ de la misma recta, con $\vec{d} = ${vt(d)}$ y $P = ${vt(P)}$.`, [
    num(qs(m), { label: 'Pendiente: m =', aria: 'Pendiente:' }), num(qs(n), { label: 'Ordenada al origen: n =', aria: 'Ordenada:' }),
  ], [
    r`La pendiente es el cociente de las componentes del vector director: $m = \dfrac{${d[1]}}{${d[0]}} = ${qt(m)}$.`,
    r`Reemplazo el punto $P$: $${P[1]} = ${qt(m)} \cdot ${par(P[0])} + n$, entonces $n = ${qt(n)}$.`,
    r`$y = ${qt(m)}x ${qn(n) < 0 ? '-' : '+'} ${qt(Q(Math.abs(n.n), n.d))}$.`,
  ])
}

export function lineTwoPoints(id, A, B, position) {
  const d = [B[0] - A[0], B[1] - A[1]]
  const ok = vecEq(A, d)
  const opts = withCorrect(ok, [vecEq(A, [d[1], d[0]]), vecEq(A, [-d[0], d[1]]), vecEq(B, [-d[0], d[1]]), vecEq([A[1], A[0]], d), vecEq(A, B)], position)
  return item(id, r`Una recta pasa por $A = ${vt(A)}$ y $B = ${vt(B)}$. Hallá su vector director $\vec{d} = \overrightarrow{AB}$ y elegí su ecuación vectorial.`, [
    num(d[0], { label: 'Vector director: componente x', aria: 'Componente x:' }), num(d[1], { label: 'Vector director: componente y', aria: 'Componente y:' }),
    sel('Ecuación vectorial', opts, ok),
  ], [
    r`$\overrightarrow{AB} = B - A = (${B[0]} - ${par(A[0])}\,;\,${B[1]} - ${par(A[1])}) = ${vt(d)}$.`,
    'La ecuación vectorial usa un punto de la recta (por ejemplo, $A$) y el vector director: $(x ; y) = A + λ · \\vec{d}$.',
    `Queda: ${ok}.`,
  ])
}

export function lineGraph(id, P, d) {
  const { m, n } = lineData(P, d)
  return {
    id, prompt: 'Representá la recta en el plano: tocá dos puntos de la recta.',
    plane: { kind: 'line', key: `${id}-g`, m, b: n, aria: 'Gráfico:', display: `la recta que pasa por (${P[0]} ; ${P[1]}) y por (${P[0] + d[0]} ; ${P[1] + d[1]})`.replace(/-/g, M) },
    steps: [r`Marcá $P = ${vt(P)}$ y sumale el vector director: $${vt(P)} + ${vt(d)} = ${vt([P[0] + d[0], P[1] + d[1]])}$ es otro punto de la recta.`, 'Uní los dos puntos con una recta.'],
  }
}

// ---------- Números complejos ----------
const C = (re, im = 0) => ({ re: asQ(re), im: asQ(im) })
const cadd = (a, b) => C(qadd(a.re, b.re), qadd(a.im, b.im))
const csub = (a, b) => C(qsub(a.re, b.re), qsub(a.im, b.im))
const cmul = (a, b) => C(qsub(qmul(a.re, b.re), qmul(a.im, b.im)), qadd(qmul(a.re, b.im), qmul(a.im, b.re)))
const cconj = (a) => C(a.re, qmul(a.im, -1))
const cdiv = (a, b) => {
  const d = qadd(qmul(b.re, b.re), qmul(b.im, b.im)), n = cmul(a, cconj(b))
  return C(qdiv(n.re, d), qdiv(n.im, d))
}
const cpow = (a, k) => { let out = C(1); for (let i = 0; i < k; i++) out = cmul(out, a); return out }
export { C, cadd, csub, cmul, cdiv, cpow }

// a + bi en TeX
export function ct(z) {
  const re = asQ(z.re), im = asQ(z.im)
  const imTxt = (q) => (Math.abs(q.n) === 1 && q.d === 1 ? 'i' : `${qt(Q(Math.abs(q.n), q.d))}i`)
  if (im.n === 0) return qt(re)
  if (re.n === 0) return `${im.n < 0 ? '-' : ''}${imTxt(im)}`
  return `${qt(re)} ${im.n < 0 ? '-' : '+'} ${imTxt(im)}`
}
const norm360 = (a) => ((a % 360) + 360) % 360
const reIm = (z, label = 'Resultado') => [
  num(qs(z.re), { label: `${label}: parte real`, aria: `${label}, parte real:` }),
  num(qs(z.im), { label: `${label}: parte imaginaria`, aria: `${label}, parte imaginaria:` }),
]

export function cplxForms(id, a, b) {
  const mod = Math.hypot(a, b), ang = argDeg(a, b), q = quadrant(a, b), z = C(a, b)
  return item(id, r`Dado $z = ${ct(z)}$, calculá su módulo y su argumento (en grados, con un decimal) y escribí su conjugado $\bar{z}$.`, [
    num(valueOrApprox(mod).answer, { label: 'Módulo |z| =', aria: 'Módulo:', ...(isInt(mod) ? {} : { tol: 0.01 }) }),
    num(String(r2(ang)), { label: 'Argumento (grados) =', aria: 'Argumento:', tol: 0.1 }),
    num(qs(z.re), { label: 'Conjugado: parte real', aria: 'Conjugado, parte real:' }), num(qs(qmul(z.im, -1)), { label: 'Conjugado: parte imaginaria', aria: 'Conjugado, parte imaginaria:' }),
  ], [
    r`Módulo: $|z| = \sqrt{${par(a)}^2 + ${par(b)}^2} = \sqrt{${a * a + b * b}}${isInt(mod) ? ` = ${mod}` : r` \approx ${dc(mod)}`}$.`,
    r`Argumento: ángulo de referencia $\operatorname{arctg}\left|\dfrac{${b}}{${a}}\right| \approx ${dc(Math.atan(Math.abs(b / a)) * DEG)}°$. Está en el ${QUAD[q]}: $\alpha \approx ${dc(ang)}°$.`,
    r`El conjugado cambia el signo de la parte imaginaria: $\bar{z} = ${ct(cconj(z))}$.`,
  ])
}

export function cplxPolarToBinomial(id, rad, theta, position) {
  const t = (theta * Math.PI) / 180
  const re = rad * Math.cos(t), im = rad * Math.sin(t)
  const f = (x) => (isInt(x) ? num(Math.round(x), {}) : num(String(r2(x)), { tol: 0.01 }))
  const a = `${rad}(cos ${theta}° + i sen ${theta}°)`
  const opts = withCorrect(a, [`${rad}(sen ${theta}° + i cos ${theta}°)`, `${rad}(cos ${theta}° ${M} i sen ${theta}°)`, `${theta}(cos ${rad}° + i sen ${rad}°)`], position)
  return item(id, r`Dado $z = ${rad}_{${theta}°}$ (forma polar), elegí su forma trigonométrica y escribilo en forma binómica (con dos decimales si hace falta).`, [
    sel('Forma trigonométrica', opts, a),
    { ...f(re), label: 'Forma binómica: parte real', aria: 'Parte real:' }, { ...f(im), label: 'Forma binómica: parte imaginaria', aria: 'Parte imaginaria:' },
  ], [
    r`La forma trigonométrica es $z = r(\cos\theta + i\,\operatorname{sen}\theta)$ con $r = ${rad}$ y $\theta = ${theta}°$: $z = ${rad}(\cos ${theta}° + i\,\operatorname{sen} ${theta}°)$.`,
    r`Parte real: $${rad} \cdot \cos ${theta}° = ${isInt(re) ? Math.round(re) : dc(re)}$. Parte imaginaria: $${rad} \cdot \operatorname{sen} ${theta}° = ${isInt(im) ? Math.round(im) : dc(im)}$.`,
    r`$z = ${isInt(re) ? Math.round(re) : dc(re)} ${im < 0 ? '-' : '+'} ${isInt(im) ? Math.abs(Math.round(im)) : dc(Math.abs(im))}\,i$.`,
  ])
}

const I_NAMES = ['1', 'i', `${M}1`, `${M}i`]
export function iPowers(id, ks) {
  return item(id, 'Calculá cada potencia de $i$.', ks.map((k) => sel(`i^${k} =`, I_NAMES, I_NAMES[((k % 4) + 4) % 4])), [
    'Las potencias de $i$ se repiten de a cuatro: $i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, …',
    ...ks.map((k) => r`$${k} = 4 \cdot ${Math.floor(k / 4)} + ${k % 4}$, entonces $i^{${k}} = i^{${k % 4}} = ${I_NAMES[k % 4].replace(M, '-')}$.`),
  ])
}

// Combinación de potencias de i: terms = [{ c, k }] → Σ c·i^k
export function iCombo(id, terms) {
  const unit = [C(1), C(0, 1), C(-1), C(0, -1)]
  const total = terms.reduce((s, t) => cadd(s, cmul(C(t.c), unit[t.k % 4])), C(0))
  const tex = terms.map((t, i) => `${t.c < 0 ? '-' : i ? '+' : ''} ${Math.abs(t.c) === 1 ? '' : Math.abs(t.c)}\\,i^{${t.k}}`).join(' ').trim()
  return item(id, r`Calculá y escribí el resultado en forma binómica: $${tex}$.`, reIm(total), [
    ...terms.map((t) => r`$i^{${t.k}} = i^{${t.k % 4}} = ${ct(unit[t.k % 4])}$.`),
    r`Reemplazo y sumo: $${ct(total)}$.`,
  ])
}

// Resultado de una cuenta en forma binómica, con el desarrollo que se pasa o uno automático.
export const cplxResult = (id, tex, value, steps, prompt) => item(id, prompt || r`Calculá y expresá el resultado en forma binómica: $${tex}$.`, reIm(value), steps)

export const mulSteps = (a, b) => [
  r`Aplico la distributiva: $(${ct(a)})(${ct(b)})$ y uso $i^2 = -1$.`,
  r`Parte real: $${qt(a.re)} \cdot ${par(qt(b.re))} - ${par(qt(a.im))} \cdot ${par(qt(b.im))} = ${qt(cmul(a, b).re)}$. Parte imaginaria: $${qt(a.re)} \cdot ${par(qt(b.im))} + ${par(qt(a.im))} \cdot ${par(qt(b.re))} = ${qt(cmul(a, b).im)}$.`,
  r`Resultado: $${ct(cmul(a, b))}$.`,
]
export const divSteps = (a, b) => {
  const num_ = cmul(a, cconj(b)), d = qadd(qmul(b.re, b.re), qmul(b.im, b.im))
  return [
    r`Multiplico numerador y denominador por el conjugado del denominador, $${ct(cconj(b))}$.`,
    r`Numerador: $(${ct(a)})(${ct(cconj(b))}) = ${ct(num_)}$. Denominador: $(${ct(b)})(${ct(cconj(b))}) = ${qt(d)}$.`,
    r`Resultado: $\dfrac{${ct(num_)}}{${qt(d)}} = ${ct(cdiv(a, b))}$.`,
  ]
}

export function cplxPolarOps(id, z1, z2, n) {
  const [r1, t1] = z1, [r2_, t2] = z2
  const prod = [r1 * r2_, norm360(t1 + t2)], quo = [r1 / r2_, norm360(t1 - t2)], pw = [r2_ ** n, norm360(n * t2)]
  const mk = (name, p) => [num(p[0], { label: `${name}: módulo`, aria: `${name}, módulo:` }), num(p[1], { label: `${name}: argumento (°)`, aria: `${name}, argumento:` })]
  return item(id, r`Dados $z_1 = ${r1}_{${t1}°}$ y $z_2 = ${r2_}_{${t2}°}$, calculá en forma polar (con el argumento entre $0°$ y $360°$): $z_1 \cdot z_2$, $\dfrac{z_1}{z_2}$ y $(z_2)^{${n}}$.`,
    [...mk('z₁ · z₂', prod), ...mk('z₁ : z₂', quo), ...mk(`(z₂)^${n}`, pw)], [
      r`Producto: se multiplican los módulos y se suman los argumentos: $${r1} \cdot ${r2_} = ${prod[0]}$ y $${t1}° + ${t2}° = ${t1 + t2}°$${t1 + t2 >= 360 ? `, que equivale a $${prod[1]}°$` : ''}.`,
      r`Cociente: se dividen los módulos y se restan los argumentos: $${r1} : ${r2_} = ${quo[0]}$ y $${t1}° - ${t2}° = ${t1 - t2}°$${t1 - t2 < 0 ? `, que equivale a $${quo[1]}°$` : ''}.`,
      r`Potencia (De Moivre): el módulo se eleva a ${n} y el argumento se multiplica por ${n}: $${r2_}^{${n}} = ${pw[0]}$ y $${n} \cdot ${t2}° = ${n * t2}°$${n * t2 >= 360 ? `, que equivale a $${pw[1]}°$` : ''}.`,
    ])
}

// z^n con z en binómica, pasando por la forma polar. rad es el módulo exacto de z^n (ya calculado a mano en el llamador).
export function cplxMoivre(id, texZ, a, b, n) {
  const mod = Math.hypot(a, b), ang = argDeg(a, b), res = cpow(C(a, b), n)
  const modN = Math.round(mod ** n * 1e6) / 1e6, angN = norm360(Math.round(n * ang * 1e6) / 1e6)
  return item(id, r`Calculá $${texZ}^{${n}}$ usando la forma polar y expresá el resultado en forma binómica.`, reIm(res), [
    r`Paso a polar: $|z| = ${isInt(mod) ? mod : r`\sqrt{${a * a + b * b}}`}$ y $\alpha = ${dc(ang)}°$.`,
    r`De Moivre: $|z|^{${n}} = ${modN}$ y el argumento es $${n} \cdot ${dc(ang)}° = ${dc(n * ang)}°$, que equivale a $${dc(angN)}°$.`,
    r`$z^{${n}} = ${modN}_{${dc(angN)}°} = ${ct(res)}$.`,
  ])
}

// =====================================================================
// Segundo bloque: límites, continuidad, asíntotas, derivadas, integrales
// =====================================================================
const lim = (answer, label, extra = {}) => ({ kind: 'limit', answer, label, aria: label.replace(/\$/g, ''), ...extra })
const limAns = (res) => (res.kind === 'num' ? qs(res.value) : res.kind === 'inf' ? (res.sign > 0 ? 'inf' : '-inf') : 'dne')
const limWords = (res) => (res.kind === 'num' ? qt(res.value) : res.kind === 'inf' ? (res.sign > 0 ? r`+\infty` : r`-\infty`) : r`\text{no existe}`)

// ---------- Polinomios (listas de coeficientes enteros [c0, c1, c2, …]) ----------
const pEval = (p, x) => p.reduce((s, c, i) => s + c * x ** i, 0)
export const polyTex = (p, variable = 'x') => {
  const terms = []
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i]
    if (c === 0) continue
    const a = Math.abs(c)
    terms.push({ neg: c < 0, body: i === 0 ? `${a}` : `${a === 1 ? '' : a}${variable}${i === 1 ? '' : `^{${i}}`}` })
  }
  return terms.length ? terms.map((t, k) => (k === 0 ? (t.neg ? '-' : '') : t.neg ? ' - ' : ' + ') + t.body).join('') : '0'
}
// Respuesta de texto en ASCII para el corrector de expresiones.
export const polyAscii = (p) => p.map((c, i) => (c === 0 ? '' : `${c < 0 ? '-' : '+'}${Math.abs(c)}*x^${i}`)).join('') || '0'
const polyShow = (p) => polyTex(p).replace(/\^\{(\d)\}/g, (_, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).replace(/-/g, M)
// Dividir por (x − a): devuelve cociente y resto (división sintética)
function divLinear(p, a) {
  const q = new Array(p.length - 1)
  let carry = 0
  for (let i = p.length - 1; i >= 1; i--) { carry = p[i] + carry * a; q[i - 1] = carry }
  return { q, rem: p[0] + carry * a }
}
const deriv = (p) => p.slice(1).map((c, i) => c * (i + 1))
const mulP = (a, b) => { const out = new Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y })); return out }
export const fromRoots = (roots, lead = 1) => roots.reduce((p, r0) => mulP(p, [-r0, 1]), [lead])
const sub = (a) => (a === 0 ? 'x' : a > 0 ? `x - ${a}` : `x + ${-a}`)

// Límite de N/D cuando x → a (side: −1 izquierda, +1 derecha, 0 ambos lados)
function limitAt(N, D, a, side = 0) {
  let n = N, d = D, cancelled = 0
  while (pEval(n, a) === 0 && pEval(d, a) === 0) { n = divLinear(n, a).q; d = divLinear(d, a).q; cancelled++ }
  const nv = pEval(n, a), dv = pEval(d, a)
  if (dv !== 0) return { kind: 'num', value: Q(nv, dv), cancelled, n, d }
  let m = 0, dd = d
  while (pEval(dd, a) === 0) { dd = divLinear(dd, a).q; m++ }
  const base = Math.sign(nv) * Math.sign(pEval(dd, a))
  const at = (s) => base * (s < 0 && m % 2 ? -1 : 1)
  if (side) return { kind: 'inf', sign: at(side), cancelled, n, d }
  const L = at(-1), R = at(1)
  return L === R ? { kind: 'inf', sign: L, cancelled, n, d } : { kind: 'dne', left: L, right: R, cancelled, n, d }
}
function limitInf(N, D, dir) {
  const dn = N.length - 1, dd = D.length - 1, ln = N[dn], ld = D[dd]
  if (dn < dd) return { kind: 'num', value: Q(0), dn, dd }
  if (dn === dd) return { kind: 'num', value: Q(ln, ld), dn, dd }
  return { kind: 'inf', sign: Math.sign(ln / ld) * (dir < 0 && (dn - dd) % 2 ? -1 : 1), dn, dd }
}

const sideTex = (s) => (s < 0 ? '^{-}' : s > 0 ? '^{+}' : '')
const fracTex = (N, D) => r`\dfrac{${polyTex(N)}}{${polyTex(D)}}`

// Cociente de polinomios cuando x tiende a un número
export function limRational(id, N, D, a, side = 0) {
  const res = limitAt(N, D, a, side)
  const tex = r`\lim_{x \to ${a}${sideTex(side)}} ${fracTex(N, D)}`
  const nA = pEval(N, a), dA = pEval(D, a)
  const steps = [r`Reemplazo $x = ${a}$: el numerador vale $${nA}$ y el denominador vale $${dA}$.`]
  if (res.kind === 'num' && res.cancelled === 0) steps.push(r`El denominador no se anula: no hay indeterminación. El límite es $\dfrac{${nA}}{${dA}} = ${qt(res.value)}$.`)
  else if (res.cancelled) {
    steps.push(r`Queda $\frac{0}{0}$: es una indeterminación. Factorizo y simplifico el factor $(${sub(a)})$.`)
    steps.push(r`$${polyTex(N)} = (${sub(a)})(${polyTex(divLinear(N, a).q)})$ y $${polyTex(D)} = (${sub(a)})(${polyTex(divLinear(D, a).q)})$.`)
    steps.push(res.kind === 'num' ? r`Reemplazo en lo que queda: $\dfrac{${pEval(res.n, a)}}{${pEval(res.d, a)}} = ${qt(res.value)}$.`
      : r`Al reemplazar queda un número distinto de 0 dividido por 0: el límite es infinito o no existe, según el signo por cada lado.`)
  } else steps.push(r`El numerador no se anula y el denominador tiende a 0: el límite es infinito o no existe. Hay que estudiar el signo del denominador a cada lado de $${a}$.`)
  if (res.kind === 'inf') steps.push(r`El límite es $${limWords(res)}$.`)
  if (res.kind === 'dne') steps.push(r`Por la izquierda tiende a $${res.left > 0 ? '+\\infty' : '-\\infty'}$ y por la derecha a $${res.right > 0 ? '+\\infty' : '-\\infty'}$: los límites laterales son distintos, el límite no existe.`)
  return item(id, `$${tex}$`, [lim(limAns(res), 'Límite =')], steps)
}

// Cociente de polinomios cuando x tiende a +∞ o −∞
export function limInfinity(id, N, D, dir = 1) {
  const res = limitInf(N, D, dir)
  const tex = r`\lim_{x \to ${dir > 0 ? '+' : '-'}\infty} ${fracTex(N, D)}`
  const steps = [r`Es una indeterminación $\frac{\infty}{\infty}$. Comparo los grados: el numerador tiene grado ${res.dn} y el denominador, grado ${res.dd}.`]
  if (res.dn < res.dd) steps.push('Si el grado del denominador es mayor, el cociente tiende a 0.')
  else if (res.dn === res.dd) steps.push(r`Si los grados son iguales, el límite es el cociente de los coeficientes principales: $\dfrac{${N[res.dn]}}{${D[res.dd]}} = ${qt(res.value)}$.`)
  else steps.push(r`Si el grado del numerador es mayor, el límite es infinito. El signo sale de $\dfrac{${N[res.dn]}}{${D[res.dd]}}$ y de la paridad de $${res.dn - res.dd}$${dir < 0 ? ' (con x negativo)' : ''}.`)
  steps.push(r`El límite es $${limWords(res)}$.`)
  return item(id, `$${tex}$`, [lim(limAns(res), 'Límite =')], steps)
}

// Límite escrito a mano (radicales, etc.)
export const limFree = (id, tex, answer, steps, extra = {}) => item(id, `$${tex}$`, [lim(answer, 'Límite =', extra)], steps)

// Propiedades: se conocen lim f y lim g; exprs = [{ tex, calc: (F, G) => Q, why }]
export function limProps(id, F, G, exprs) {
  return item(id, r`Sabiendo que $\lim_{x \to a} f(x) = ${F}$ y $\lim_{x \to a} g(x) = ${G}$, calculá cada límite aplicando las propiedades.`,
    exprs.map((e) => lim(qs(e.calc(Q(F), Q(G))), `$\\lim_{x \\to a} ${e.tex}$ =`)),
    exprs.map((e) => r`$\lim_{x \to a} ${e.tex} = ${typeof e.why === 'function' ? e.why(F, G) : e.why} = ${qt(e.calc(Q(F), Q(G)))}$.`))
}

// Función partida en x = a: izquierda para x < a, derecha para x ≥ a
export function limLateral(id, a, left, right) {
  const L = pEval(left, a), R = pEval(right, a), exists = L === R
  const tex = r`f(x) = \begin{cases} ${polyTex(left)} & \text{si } x < ${a} \\ ${polyTex(right)} & \text{si } x \geq ${a} \end{cases}`
  return item(id, r`Dada $${tex}$, calculá los límites laterales en $x = ${a}$ y, si existe, el límite.`, [
    lim(String(L), `$\\lim_{x \\to ${a}^{-}} f(x)$ =`), lim(String(R), `$\\lim_{x \\to ${a}^{+}} f(x)$ =`),
    lim(exists ? String(L) : 'dne', `$\\lim_{x \\to ${a}} f(x)$ =`),
  ], [
    r`Por la izquierda ($x < ${a}$) se usa $${polyTex(left)}$: $${pEval(left, a)}$.`, r`Por la derecha ($x \geq ${a}$) se usa $${polyTex(right)}$: $${pEval(right, a)}$.`,
    exists ? r`Los dos límites laterales coinciden: el límite existe y vale $${L}$.` : r`Los límites laterales son distintos ($${L} \neq ${R}$): el límite no existe.`,
  ])
}

// Lectura de un gráfico: spec = { window, curves, dots, asymptotes, a, questions: [{ tex, answer, why }] }
export function limGraph(id, spec) {
  return {
    ...item(id, spec.prompt || 'Observá el gráfico de la función f (los círculos vacíos son puntos que no pertenecen a la gráfica; los llenos, sí) y completá.',
      spec.questions.map((q) => lim(q.answer, `$${q.tex}$ =`)),
      spec.questions.map((q) => r`$${q.tex} = ${q.answer === 'dne' ? '\\text{no existe}' : q.answer === 'inf' ? '+\\infty' : q.answer === '-inf' ? '-\\infty' : q.answer}$: ${q.why}`)),
    graph: { window: spec.window, curves: spec.curves, dots: spec.dots || [], asymptotes: spec.asymptotes || [], alt: spec.alt, every: spec.every },
  }
}

// ---------- Continuidad ----------
const TIPOS = ['Es continua en ese punto', 'Discontinuidad evitable', 'Discontinuidad de salto', 'Discontinuidad infinita']
export function contItem(id, tex, a, fa, limit, tipo, steps) {
  return item(id, r`Estudiá la continuidad de $${tex}$ en $x = ${a}$.`, [
    lim(fa, `$f(${a})$ =`), lim(limit, `$\\lim_{x \\to ${a}} f(x)$ =`), sel('Clasificación', TIPOS, TIPOS[tipo]),
  ], steps)
}
export const contK = (id, tex, a, k, steps) => item(id, r`Hallá el valor de $k$ para que $${tex}$ sea continua en $x = ${a}$.`, [num(k, { label: 'k =', aria: 'k =' })], steps)

// ---------- Asíntotas ----------
const setList = (list) => (list.length ? list.map((q) => qs(q)) : '∅')
export function asymRational(id, N, roots) {
  const D = fromRoots(roots), dn = N.length - 1, dd = D.length - 1
  const vert = [...new Set(roots)].filter((x) => pEval(N, x) !== 0).sort((a, b) => a - b)
  const holes = [...new Set(roots)].filter((x) => pEval(N, x) === 0)
  const horiz = dn < dd ? [Q(0)] : dn === dd ? [Q(N[dn], D[dd])] : []
  return item(id, r`$f(x) = ${fracTex(N, D)}$. Hallá sus asíntotas verticales y su asíntota horizontal. Si no hay, escribí ∅; si hay más de una, separalas con «;».`, [
    numset(vert.length ? vert.map(String) : '∅', 'Asíntotas verticales: x ='), numset(setList(horiz), 'Asíntota horizontal: y ='),
  ], [
    r`Verticales: se buscan los valores donde el denominador vale 0. $${polyTex(D)} = ${roots.map((x) => `(${sub(x)})`).join('')}$, entonces $x = ${[...new Set(roots)].join('$ o $x = ')}$.`,
    holes.length ? r`En $x = ${holes[0]}$ el numerador también vale 0: se simplifica y queda un agujero (límite finito), no una asíntota.` : 'Como el numerador no se anula en esos valores, cada uno es una asíntota vertical.',
    vert.length ? r`Asíntotas verticales: $x = ${vert.join('$ y $x = ')}$.` : 'No hay asíntotas verticales.',
    horiz.length ? r`Horizontal: el límite en $\pm\infty$ es $${qt(horiz[0])}$ (${dn < dd ? 'el denominador tiene mayor grado' : 'grados iguales: cociente de coeficientes principales'}). Asíntota: $y = ${qt(horiz[0])}$.` : 'Horizontal: el numerador tiene mayor grado, el límite es infinito. No hay asíntota horizontal.',
  ])
}
export function asymOblique(id, N, root) {
  const D = [-root, 1], { q, rem } = divLinear(N, root), m = q[1], n = q[0]
  const vertical = rem !== 0
  return item(id, r`$g(x) = ${fracTex(N, D)}$. Hallá la asíntota vertical y la asíntota oblicua $y = mx + n$. ¿Tiene asíntota horizontal?`, [
    numset(vertical ? [String(root)] : '∅', 'Asíntota vertical: x ='), numset('∅', 'Asíntota horizontal: y ='),
    num(m, { label: 'Oblicua: m =', aria: 'm =' }), num(n, { label: 'Oblicua: n =', aria: 'n =' }),
  ], [
    r`Vertical: el denominador vale 0 en $x = ${root}$ y el numerador, $${pEval(N, root)}$ (distinto de 0): asíntota vertical $x = ${root}$.`,
    'Horizontal: el numerador tiene un grado más que el denominador, el límite en el infinito es infinito: no hay asíntota horizontal.',
    r`Oblicua: se divide $${polyTex(N)}$ por $(${sub(root)})$. El cociente es $${polyTex(q)}$ y el resto, $${rem}$.`,
    r`La asíntota oblicua es $y = ${polyTex(q)}$: $m = ${m}$ y $n = ${n}$.`,
  ])
}

// ---------- Derivadas ----------
export const derivItem = (id, tex, answer, steps, display) => item(id, r`$f(x) = ${tex}$`, [
  { kind: 'expr', answer, label: "f′(x) =", aria: 'Derivada:', ...(display ? { display } : {}) }], steps)

const lineStr = (m, b) => {
  const mm = qn(m) === 1 ? '' : qn(m) === -1 ? M : v(qs(m)), bb = qn(b) === 0 ? '' : `${qn(b) < 0 ? ` ${M} ` : ' + '}${v(qs(Q(Math.abs(b.n), b.d)))}`
  return `${mm}${qn(m) === 0 ? '' : 'x'}${bb}`.replace(/^ \+ /, '') || '0'
}
export function tangentItem(id, p, a) {
  const fa = pEval(p, a), m = Q(pEval(deriv(p), a)), b = qsub(fa, qmul(m, a)), mn = qdiv(-1, m), bn = qsub(fa, qmul(mn, a))
  const expr = (mm, bb) => `(${qs(mm)})*x+(${qs(bb)})`
  const dp = deriv(p)
  return item(id, r`Para $f(x) = ${polyTex(p)}$, hallá las ecuaciones de la recta tangente y de la recta normal a la gráfica en $x = ${a}$.`, [
    num(fa, { label: `f(${a}) =`, aria: 'f(a):' }), num(qs(m), { label: `f′(${a}) =`, aria: 'Derivada en a:' }),
    { kind: 'expr', answer: expr(m, b), display: lineStr(m, b), label: 'Recta tangente: y =', aria: 'Tangente:' },
    { kind: 'expr', answer: expr(mn, bn), display: lineStr(mn, bn), label: 'Recta normal: y =', aria: 'Normal:' },
  ], [
    r`Valor de la función: $f(${a}) = ${fa}$. Derivada: $f'(x) = ${polyTex(dp)}$ y $f'(${a}) = ${qs(m)}$ (es la pendiente de la tangente).`,
    r`Tangente: $y - ${par(fa)} = ${par(qs(m))}(x - ${par(a)})$, o sea $y = ${lineStr(m, b).replace(M, '-')}$.`,
    r`Normal: es perpendicular a la tangente, su pendiente es $-\dfrac{1}{${qs(m)}} = ${qt(mn)}$. $y = ${lineStr(mn, bn).replace(M, '-')}$.`,
  ])
}

// ---------- Análisis de una función cúbica f(x) = c3·x³ + c2·x² + c1·x + c0 ----------
const LETTERS = ['A', 'B', 'C', 'D']
const interval = (a, b) => `(${a === null ? `${M}∞` : v(qs(a))} ; ${b === null ? '+∞' : v(qs(b))})`
export function sketchItem(id, window, correct, wrong, position, steps, note = '') {
  const options = [...wrong]
  options.splice(position, 0, correct)
  return { id, prompt: `Elegí el gráfico que corresponde a la función${note}.`, sketch: { kind: 'sketch', key: `${id}-s`, window, options, answer: LETTERS[position], aria: 'Gráfico:' }, steps }
}
export function cubicStudy(id, c, position, window) {
  const [c0, c1, c2, c3] = c
  const d1 = deriv(c), d2 = deriv(d1)
  const disc = 4 * c2 * c2 - 12 * c3 * c1, sq = Math.round(Math.sqrt(disc))
  const roots = [Q(-2 * c2 - sq, 6 * c3), Q(-2 * c2 + sq, 6 * c3)].sort((x, y) => qn(x) - qn(y))
  const [p, q] = roots, infl = Q(-c2, 3 * c3)
  const fv = (x) => pEval(c, qn(x))
  const isMax = (x) => pEval(d2, qn(x)) < 0
  const outer = `${interval(null, p)} ∪ ${interval(q, null)}`, inner = interval(p, q)
  const incr = c3 > 0 ? outer : inner, decr = c3 > 0 ? inner : outer
  const up = c3 > 0 ? interval(infl, null) : interval(null, infl), down = c3 > 0 ? interval(null, infl) : interval(infl, null)
  const f = (x) => pEval(c, x)
  const wrongs = [{ curves: [{ f: (x) => -f(x) }] }, { curves: [{ f: (x) => f(-x) }] }, { curves: [{ f: (x) => -f(-x) }] }]
  const T = polyTex(c)
  return [
    item(`${id}a`, r`$f(x) = ${T}$. Hallá la derivada primera y los puntos críticos (donde $f'(x) = 0$). Separá con «;».`, [
      { kind: 'expr', answer: polyAscii(d1), display: polyShow(d1), label: "f′(x) =", aria: 'Derivada primera:' },
      numset([qs(p), qs(q)], 'Puntos críticos: x ='),
    ], [
      r`$f'(x) = ${polyTex(d1)}$.`, r`Resuelvo $${polyTex(d1)} = 0$: $x = ${qt(p)}$ y $x = ${qt(q)}$.`]),
    item(`${id}b`, 'Clasificá cada punto crítico con el criterio de la derivada segunda y calculá el valor de la función en él.', [
      sel(`En x = ${v(qs(p))}`, ['Máximo relativo', 'Mínimo relativo'], isMax(p) ? 'Máximo relativo' : 'Mínimo relativo'), num(fv(p), { label: `f(${v(qs(p))}) =`, aria: 'Valor en el primer punto:' }),
      sel(`En x = ${v(qs(q))}`, ['Máximo relativo', 'Mínimo relativo'], isMax(q) ? 'Máximo relativo' : 'Mínimo relativo'), num(fv(q), { label: `f(${v(qs(q))}) =`, aria: 'Valor en el segundo punto:' }),
    ], [
      r`Derivada segunda: $f''(x) = ${polyTex(d2)}$.`,
      r`$f''(${qs(p)}) = ${pEval(d2, qn(p))}$ ${pEval(d2, qn(p)) < 0 ? '< 0: máximo relativo' : '> 0: mínimo relativo'}. $f''(${qs(q)}) = ${pEval(d2, qn(q))}$ ${pEval(d2, qn(q)) < 0 ? '< 0: máximo relativo' : '> 0: mínimo relativo'}.`,
      r`$f(${qs(p)}) = ${fv(p)}$ y $f(${qs(q)}) = ${fv(q)}$.`]),
    item(`${id}c`, 'Indicá dónde la función crece y dónde decrece (criterio de la derivada primera).', [
      sel('Crece en', [outer, inner, interval(null, q), interval(p, null)], incr), sel('Decrece en', [outer, inner, interval(null, q), interval(p, null)], decr),
    ], [
      r`El signo de $f'(x) = ${polyTex(d1)}$ cambia en los puntos críticos $${qs(p)}$ y $${qs(q)}$. Pruebo un valor en cada tramo.`,
      `Crece donde f′ > 0: ${incr}. Decrece donde f′ < 0: ${decr}.`]),
    item(`${id}d`, 'Estudiá la concavidad: hallá la derivada segunda y el punto de inflexión.', [
      { kind: 'expr', answer: polyAscii(d2), display: polyShow(d2), label: "f″(x) =", aria: 'Derivada segunda:' },
      num(qs(infl), { label: 'Punto de inflexión: x =', aria: 'Inflexión:' }),
      sel('Cóncava hacia arriba (f″ > 0) en', [interval(null, infl), interval(infl, null), 'ℝ'], up), sel('Cóncava hacia abajo (f″ < 0) en', [interval(null, infl), interval(infl, null), 'ℝ'], down),
    ], [
      r`$f''(x) = ${polyTex(d2)}$. Se anula en $x = ${qt(infl)}$.`, r`A cada lado de $${qs(infl)}$ cambia el signo de $f''$: allí hay un punto de inflexión, $f(${qs(infl)}) = ${fv(infl)}$.`,
      `Cóncava hacia arriba en ${up} y cóncava hacia abajo en ${down}.`]),
    sketchItem(`${id}e`, window, { curves: [{ f }] }, wrongs, position, [
      r`El gráfico correcto tiene un ${isMax(p) ? 'máximo' : 'mínimo'} en $x = ${qs(p)}$ (valor ${fv(p)}), un ${isMax(q) ? 'máximo' : 'mínimo'} en $x = ${qs(q)}$ (valor ${fv(q)}) y cambia de concavidad en $x = ${qs(infl)}$.`,
      c3 > 0 ? 'Como el coeficiente de $x^3$ es positivo, la curva sube hacia la derecha.' : 'Como el coeficiente de $x^3$ es negativo, la curva baja hacia la derecha.']),
  ]
}

// ---------- Optimización ----------
// kind: 'perimetro' | 'rio' | 'suma'
export function optimization(n, kind, P) {
  let text, fx, dfx, xv, other, best, second, name, otherLabel, bestLabel, f
  if (kind === 'perimetro') {
    text = `Se dispone de ${P} m de alambre para cercar un terreno rectangular. Si $x$ es el ancho (en metros), hallá las medidas que dan la mayor superficie.`
    fx = `x*(${P / 2}-x)`; dfx = `${P / 2}-2*x`; xv = P / 4; other = P / 2 - xv; best = xv * other; second = -2
    name = 'A', otherLabel = 'Largo (m) =', bestLabel = 'Superficie máxima (m²) ='; f = r`A(x) = x\,(${P / 2} - x)`
  } else if (kind === 'rio') {
    text = `Un granjero tiene ${P} m de alambre para cercar un corral rectangular que se apoya contra un río (ese lado no lleva alambre). Si $x$ es el largo (en metros) de cada lado perpendicular al río, hallá las medidas del corral de mayor superficie.`
    fx = `x*(${P}-2*x)`; dfx = `${P}-4*x`; xv = P / 4; other = P - 2 * xv; best = xv * other; second = -4
    name = 'A', otherLabel = 'Lado paralelo al río (m) =', bestLabel = 'Superficie máxima (m²) ='; f = r`A(x) = x\,(${P} - 2x)`
  } else {
    text = `Hallá dos números positivos cuyo producto sea ${P} y cuya suma sea la menor posible. Si $x$ es uno de los números, el otro es $\\dfrac{${P}}{x}$.`
    const s = Math.sqrt(P)
    fx = `x+${P}/x`; dfx = `1-${P}/x^2`; xv = s; other = s; best = 2 * s; second = (2 * P) / s ** 3
    name = 'S', otherLabel = 'El otro número =', bestLabel = 'Suma mínima ='; f = r`S(x) = x + \dfrac{${P}}{x}`
  }
  const isMax = kind !== 'suma'
  const dTex = kind === 'perimetro' ? r`${P / 2} - 2x` : kind === 'rio' ? r`${P} - 4x` : r`1 - \dfrac{${P}}{x^{2}}`
  return {
    n, title: 'Optimización', statement: text,
    items: [
      item(`${n}a`, `Escribí la función ${name}(x) que hay que ${isMax ? 'maximizar' : 'minimizar'}.`, [{ kind: 'expr', answer: fx, label: `${name}(x) =`, aria: 'Función:', display: fx.replace(/\*/g, '·') }],
        [r`Se expresa todo en función de $x$: $${f}$.`]),
      item(`${n}b`, `Derivá ${name}(x).`, [{ kind: 'expr', answer: dfx, label: `${name}′(x) =`, aria: 'Derivada:', display: dfx.replace(/\*/g, '·') }], [r`$${name}'(x) = ${dTex}$.`]),
      item(`${n}c`, `Igualá la derivada a 0 y hallá el valor de x que ${isMax ? 'maximiza' : 'minimiza'}.`, [num(xv, { label: 'x =', aria: 'x:' }), num(other, { label: otherLabel, aria: 'Otro valor:' })], [
        r`$${name}'(x) = 0$ da $x = ${xv}$.`, kind === 'perimetro' ? r`El largo es $${P / 2} - ${xv} = ${other}$: el terreno es un cuadrado.` : kind === 'rio' ? r`El lado paralelo al río mide $${P} - 2 \cdot ${xv} = ${other}$.` : r`El otro número es $\dfrac{${P}}{${xv}} = ${other}$.`]),
      item(`${n}d`, 'Verificá con la derivada segunda que es el valor buscado y calculá el resultado.', [
        sel(`Como ${name}″(${xv}) ${second < 0 ? '< 0' : '> 0'}, es un…`, ['Máximo', 'Mínimo'], isMax ? 'Máximo' : 'Mínimo'), num(best, { label: bestLabel, aria: 'Resultado:', ...(isInt(best) ? {} : { tol: 0.01 }) }),
      ], [
        r`$${name}''(x) = ${kind === 'perimetro' ? '-2' : kind === 'rio' ? '-4' : r`\dfrac{${2 * P}}{x^{3}}`}$: ${second < 0 ? 'es negativa, entonces hay un máximo' : 'es positiva, entonces hay un mínimo'}.`,
        r`$${name}(${xv}) = ${best}$.`,
      ]),
    ],
  }
}

// ---------- Integrales ----------
export const integralItem = (id, tex, answer, steps, display) => item(id, r`$\displaystyle\int ${tex}\,dx$`, [
  { kind: 'expr', antiderivative: true, answer, label: 'F(x) =', aria: 'Primitiva:', ...(display ? { display } : {}) }], steps)

export function definiteItem(id, lo, hi, tex, F, display, value, steps) {
  return item(id, r`$\displaystyle\int_{${lo}}^{${hi}} ${tex}\,dx$. Hallá una primitiva y aplicá la regla de Barrow.`, [
    { kind: 'expr', antiderivative: true, answer: F, label: 'F(x) =', aria: 'Primitiva:', ...(display ? { display } : {}) },
    num(isInt(value) ? Math.round(value) : String(r2(value)), { label: 'Valor de la integral =', aria: 'Integral:', ...(isInt(value) ? {} : { tol: 0.01 }) }),
  ], steps)
}
