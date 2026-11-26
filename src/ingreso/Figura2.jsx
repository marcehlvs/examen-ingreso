// Figuras de los Exámenes 2 y 3 (SVG, esquemáticas).
const INK = '#1f3a5f'
const RED = '#c0392b'

const L = ({ a, b, c = INK }) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth="1.7" />
const T = ({ x, y, children, c = '#111' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="700" fill={c}>{children}</text>
)
const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)]
const arc = (cx, cy, r, from, to) => {
  const [x1, y1] = polar(cx, cy, r, from)
  const [x2, y2] = polar(cx, cy, r, to)
  return `M ${x1} ${y1} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 0 ${x2} ${y2}`
}

function Rayos({ n = 'ABCFDEG' }) {
  const O = [130, 105]
  const rays = [0, 35, 72, 125, 180, 215, 285]
  const corner = [polar(...O, 14, 35), polar(...O, 19.8, 80), polar(...O, 14, 125)]
  return (
    <>
      <polyline points={corner.map((p) => p.join(',')).join(' ')} fill="none" stroke={RED} strokeWidth="1.7" />
      {rays.map((deg, i) => {
        const k = n[i]
        const [x, y] = polar(...O, 92, deg)
        return (
          <g key={k}>
            <L a={O} b={polar(...O, 80, deg)} />
            <T x={x} y={y + 4}>{k}</T>
          </g>
        )
      })}
      <circle cx={O[0]} cy={O[1]} r="3" fill={INK} />
      <T x={O[0] - 6} y={O[1] + 19}>O</T>
    </>
  )
}

function Delta() {
  // Transversal por (110,60) y (82,130)
  return (
    <>
      <L a={[15, 60]} b={[215, 60]} />
      <L a={[15, 130]} b={[215, 130]} />
      <L a={[126, 20]} b={[66, 170]} />
      <T x={226} y={64}>a</T>
      <T x={226} y={134}>b</T>
      <T x={129} y={48} c={RED}>δ</T>
      <T x={101} y={118} c={RED}>α</T>
      <T x={67} y={119} c={RED}>ε</T>
    </>
  )
}

function Rojo({ izq = '73° 49′ 45″', der = '41° 27′ 38″', d = 41.5, i = 73.8 }) {
  const O = [130, 140]
  const m = d
  const n = 180 - i
  return (
    <>
      <path d={`M ${O} L ${polar(...O, 40, m)} A 40 40 0 0 0 ${polar(...O, 40, n)} Z`} fill="rgba(192,57,43,.25)" stroke={RED} strokeWidth="2" />
      <L a={[10, 140]} b={[250, 140]} />
      <L a={O} b={polar(...O, 112, m)} />
      <L a={O} b={polar(...O, 112, n)} />
      <path d={arc(...O, 52, 0, m)} fill="none" stroke={INK} />
      <path d={arc(...O, 52, n, 180)} fill="none" stroke={INK} />
      <T x={226} y={124}>{der}</T>
      <T x={52} y={104}>{izq}</T>
      <T x={141} y={88} c={RED}>β</T>
    </>
  )
}

function Antena({ base = '24 m', hip = '74 m', torre = true }) {
  return (
    <>
      <L a={[20, 150]} b={[235, 150]} />
      <L a={[190, 150]} b={[190, 25]} />
      <line x1="190" y1="25" x2="50" y2="150" stroke={INK} strokeDasharray="5 4" strokeWidth="1.5" />
      {torre && <path d="M 176 150 L 190 55 L 204 150 M 180 123 L 200 123 M 184 97 L 196 97" fill="none" stroke={INK} />}
      <path d="M 190 138 L 178 138 L 178 150" fill="none" stroke={RED} />
      <T x={115} y={167}>{base}</T>
      <T x={98} y={78}>{hip}</T>
      <T x={222} y={90} c={RED}>?</T>
    </>
  )
}

function Triangulo() {
  const O = [75, 135], M = [123, 20], R = [200, 135]
  // OM y OR tienen la misma longitud (aprox. 125)
  return (
    <>
      <polygon points={`${O} ${M} ${R}`} fill="#e8eef6" stroke={INK} strokeWidth="1.7" />
      <line x1={O[0]} y1={O[1]} x2="20" y2="135" stroke={INK} strokeDasharray="5 4" />
      <L a={[94, 75]} b={[104, 80]} />
      <L a={[137, 130]} b={[137, 141]} />
      <path d={arc(...O, 20, 67, 180)} fill="none" stroke={RED} strokeWidth="1.7" />
      <T x={123} y={14}>M</T>
      <T x={74} y={152}>O</T>
      <T x={210} y={150}>R</T>
      <T x={52} y={112} c={RED}>α</T>
    </>
  )
}

function Trapecio({ menor = '90 mm', mayor = '1,4 dm', alto = '0,12 m' }) {
  return (
    <>
      <polygon points="50,30 158,30 218,150 50,150" fill="#e8eef6" stroke={INK} strokeWidth="1.7" />
      <path d="M 50 138 L 62 138 L 62 150 M 50 42 L 62 42 L 62 30" fill="none" stroke={INK} />
      <T x={104} y={21}>{menor}</T>
      <T x={134} y={168}>{mayor}</T>
      <T x={24} y={94}>{alto}</T>
      <T x={163} y={22}>P</T>
      <T x={230} y={154}>Q</T>
      <T x={202} y={86} c={RED}>?</T>
    </>
  )
}

const FIGS = {
  rayos: [Rayos, '0 0 260 210', 'Rectas AD y BE que se cortan en O, con semirrectas OC, OF y OG; el ángulo BOF es recto'],
  delta: [Delta, '0 0 240 180', 'Dos paralelas a y b cortadas por una transversal, con los ángulos delta, alfa y épsilon'],
  rojo: [Rojo, '0 0 272 160', 'Ángulo llano dividido en tres: 41° 27′ 38″, beta en rojo y 73° 49′ 45″'],
  antena: [Antena, '0 0 250 175', 'Antena vertical, sombra de 24 metros y distancia de 74 metros de la punta al extremo de la sombra'],
  triangulo: [Triangulo, '0 0 240 160', 'Triángulo MOR con lados OM y OR iguales y ángulo exterior alfa en O'],
  trapecio: [Trapecio, '0 0 245 175', 'Trapecio rectángulo con base menor 90 mm, base mayor 1,4 dm, altura 0,12 m y lado oblicuo PQ'],
  rayos3: [() => <Rayos n="MNPQRST" />, '0 0 260 210', 'Rectas MR y NS que se cortan en O, con semirrectas OP, OQ y OT; el ángulo NOQ es recto'],
  rojo3: [() => <Rojo izq="64° 47′ 35″" der="52° 36′ 48″" d={52.6} i={64.8} />, '0 0 272 160', 'Ángulo llano dividido en tres: 52° 36′ 48″, beta en rojo y 64° 47′ 35″'],
  poste: [() => <Antena base="20 m" hip="52 m" torre={false} />, '0 0 250 175', 'Poste vertical con un cable de 52 metros fijado al suelo a 20 metros de la base'],
  trapecio3: [() => <Trapecio menor="1,1 dm" mayor="0,19 m" alto="150 mm" />, '-10 0 255 175', 'Trapecio rectángulo con base menor 1,1 dm, base mayor 0,19 m, altura 150 mm y lado oblicuo PQ'],
}

export default function Figura2({ tipo }) {
  const [Fig, box, label] = FIGS[tipo]
  return (
    <svg viewBox={box} className="figura" role="img" aria-label={label}>
      <Fig />
    </svg>
  )
}
