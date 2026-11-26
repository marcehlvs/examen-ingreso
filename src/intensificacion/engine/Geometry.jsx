// Plano cartesiano para graficar rectas y triángulos para las construcciones.
import { parsePoints } from './check'

const N = 8 // el plano va de −8 a 8
const SIZE = 340, PAD = 10
const unit = (SIZE - 2 * PAD) / (2 * N)
const px = (x) => PAD + (x + N) * unit
const py = (y) => PAD + (N - y) * unit
const marks = Array.from({ length: 2 * N + 1 }, (_, i) => i - N)

// Se guardan hasta dos puntos. Tocar un punto marcado lo borra; un tercero reemplaza al más viejo.
export function Plane({ value, onChange, disabled, mark }) {
  const pts = parsePoints(value)
  const tap = (e) => {
    if (disabled) return
    const box = e.currentTarget.getBoundingClientRect()
    const x = Math.round((((e.clientX - box.left) / box.width) * SIZE - PAD) / unit - N)
    const y = Math.round(N - (((e.clientY - box.top) / box.height) * SIZE - PAD) / unit)
    if (Math.abs(x) > N || Math.abs(y) > N) return
    const i = pts.findIndex(([a, b]) => a === x && b === y)
    const next = i >= 0 ? pts.filter((_, k) => k !== i) : [...pts, [x, y]].slice(-2)
    onChange(next.map((p) => p.join(',')).join(';'))
  }
  let line = null
  if (pts.length === 2) {
    const [[x1, y1], [x2, y2]] = pts
    const dx = x2 - x1, dy = y2 - y1, k = 40
    line = <line x1={px(x1 - k * dx)} y1={py(y1 - k * dy)} x2={px(x1 + k * dx)} y2={py(y1 + k * dy)}
      stroke={mark === false ? '#c0392b' : mark ? '#1e8e4e' : '#2c5282'} strokeWidth="2" />
  }
  return (
    <div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="chart plane" onClick={tap} role="img" aria-label="Plano cartesiano">
        <clipPath id="plane-clip"><rect x={PAD} y={PAD} width={SIZE - 2 * PAD} height={SIZE - 2 * PAD} /></clipPath>
        {marks.map((v) => (
          <g key={v} className="grid">
            <line x1={px(v)} x2={px(v)} y1={PAD} y2={SIZE - PAD} stroke="#d5dce6" />
            <line x1={PAD} x2={SIZE - PAD} y1={py(v)} y2={py(v)} stroke="#d5dce6" />
          </g>
        ))}
        <line x1={PAD} x2={SIZE - PAD} y1={py(0)} y2={py(0)} stroke="#1b2430" strokeWidth="1.4" />
        <line x1={px(0)} x2={px(0)} y1={PAD} y2={SIZE - PAD} stroke="#1b2430" strokeWidth="1.4" />
        {marks.filter((v) => v !== 0 && v % 2 === 0 && Math.abs(v) < N).map((v) => (
          <g key={v} fontSize="9">
            <text x={px(v)} y={py(0) + 11} textAnchor="middle">{v}</text>
            <text x={px(0) - 4} y={py(v) + 3} textAnchor="end">{v}</text>
          </g>
        ))}
        <text x={SIZE - PAD - 2} y={py(0) - 5} textAnchor="end" fontSize="11" fontWeight="700">x</text>
        <text x={px(0) + 6} y={PAD + 8} fontSize="11" fontWeight="700">y</text>
        <g clipPath="url(#plane-clip)">{line}</g>
        {pts.map(([x, y]) => <circle key={`${x},${y}`} cx={px(x)} cy={py(y)} r="5" fill="#c0392b" />)}
      </svg>
      {!disabled && (
        <p className="pietotal">
          {pts.length ? `Puntos: ${pts.map(([x, y]) => `(${x} ; ${y})`).join(' y ')} ` : 'Todavía no marcaste puntos. '}
          {pts.length > 0 && <button type="button" className="link" onClick={() => onChange('')}>Borrar</button>}
        </p>
      )}
    </div>
  )
}

// ---------- Triángulos ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
const len = (a) => Math.hypot(a[0], a[1])
const foot = (p, a, b) => {
  const d = sub(b, a), t = ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2)
  return [a[0] + t * d[0], a[1] + t * d[1]]
}
// Corte de las rectas p1–p2 y p3–p4
const cross = (p1, p2, p3, p4) => {
  const a = sub(p2, p1), b = sub(p4, p3), d = a[0] * b[1] - a[1] * b[0]
  const t = ((p3[0] - p1[0]) * b[1] - (p3[1] - p1[1]) * b[0]) / d
  return [p1[0] + t * a[0], p1[1] + t * a[1]]
}

export const LINES = ['Medianas', 'Alturas', 'Bisectrices', 'Mediatrices']

// Devuelve los tres segmentos del tipo elegido y el punto donde se cortan.
export function construction(kind, [A, B, C]) {
  const sides = [[A, B, C], [B, C, A], [C, A, B]] // [vértice, lado opuesto]
  const segs = sides.map(([v, a, b]) => {
    if (kind === 'Medianas') return [v, mid(a, b)]
    if (kind === 'Alturas') return [v, foot(v, a, b)]
    if (kind === 'Bisectrices') {
      const r = len(sub(a, v)) / (len(sub(a, v)) + len(sub(b, v)))
      return [v, [a[0] + r * (b[0] - a[0]), a[1] + r * (b[1] - a[1])]]
    }
    const m = mid(a, b), d = sub(b, a), n = [-d[1], d[0]]
    return [m, [m[0] + n[0], m[1] + n[1]]]
  })
  const center = cross(...segs[0], ...segs[1])
  if (kind === 'Mediatrices') return { center, segs: segs.map(([m]) => [m, [2 * center[0] - m[0], 2 * center[1] - m[1]]]) }
  return { center, segs }
}

// choices[0]: rectas elegidas. Si la figura pide circunferencia, choices[2] indica el radio.
export function TriangleFigure({ figure, choices }) {
  const T = figure.points
  const [kind, , radiusChoice] = choices
  const built = LINES.includes(kind) ? construction(kind, T) : null
  let radius = null
  if (built && figure.circle && radiusChoice) {
    if (radiusChoice.includes('lado')) radius = len(sub(built.center, foot(built.center, T[0], T[1])))
    else if (radiusChoice.includes('vértice')) radius = len(sub(built.center, T[0]))
  }
  return (
    <svg viewBox="0 0 300 240" className="chart tri" role="img" aria-label="Triángulo para la construcción">
      <polygon points={T.map((p) => p.join(',')).join(' ')} fill="none" stroke="#111" strokeWidth="1.6" />
      {built && built.segs.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#2c5282" strokeWidth="1.2" strokeDasharray="5 3" />)}
      {radius && <circle cx={built.center[0]} cy={built.center[1]} r={radius} fill="none" stroke="#c0392b" strokeWidth="1.6" />}
      {built && <circle cx={built.center[0]} cy={built.center[1]} r="3.5" fill="#c0392b" />}
    </svg>
  )
}
