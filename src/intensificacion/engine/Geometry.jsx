// Plano cartesiano para graficar rectas y triángulos para las construcciones.
import { useId, useState } from 'react'
import { parsePoints, parseNumber, parseRay } from './check'

const N = 8 // el plano va de −8 a 8
const SIZE = 340, PAD = 10
const unit = (SIZE - 2 * PAD) / (2 * N)
const px = (x) => PAD + (x + N) * unit
const py = (y) => PAD + (N - y) * unit
const marks = Array.from({ length: 2 * N + 1 }, (_, i) => i - N)

const LINE_COLORS = ['#2c5282', '#b86e00', '#7b4bb3']

// Por cada recta se guardan hasta dos puntos. Tocar un punto marcado lo borra; un tercero reemplaza al más viejo.
// Con «names» se grafican varias rectas en el mismo plano: valor «puntos|puntos|puntos».
export function Plane({ value, onChange, disabled, mark, names, marks: results }) {
  const clip = useId().replace(/:/g, '')
  const [active, setActive] = useState(0)
  const sets = names ? names.map((_, i) => String(value || '').split('|')[i] || '') : [value || '']
  const current = names ? active : 0
  const pts = parsePoints(sets[current])
  const save = (text) => {
    const next = sets.map((s, i) => (i === current ? text : s))
    onChange(next.every((s) => !s) ? '' : next.join('|'))
  }
  const tap = (e) => {
    if (disabled) return
    const box = e.currentTarget.getBoundingClientRect()
    const x = Math.round((((e.clientX - box.left) / box.width) * SIZE - PAD) / unit - N)
    const y = Math.round(N - (((e.clientY - box.top) / box.height) * SIZE - PAD) / unit)
    if (Math.abs(x) > N || Math.abs(y) > N) return
    const i = pts.findIndex(([a, b]) => a === x && b === y)
    const next = i >= 0 ? pts.filter((_, k) => k !== i) : [...pts, [x, y]].slice(-2)
    save(next.map((p) => p.join(',')).join(';'))
  }
  const colorOf = (i) => {
    const ok = names ? results?.[i] : mark
    if (ok === false) return '#c0392b'
    if (names) return LINE_COLORS[i]
    return ok ? '#1e8e4e' : LINE_COLORS[0]
  }
  const drawn = sets.map(parsePoints)
  return (
    <div>
      {names && (
        <div className="segmented" role="group" aria-label="Recta que estás graficando">
          {names.map((n, i) => (
            <button key={n} type="button" className="seg" aria-pressed={active === i} onClick={() => setActive(i)}>
              <span className="swatch" style={{ background: LINE_COLORS[i] }} />{n}{results ? (results[i] ? ' ✓' : ' ✗') : ''}
            </button>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="chart plane" onClick={tap} role="img" aria-label="Plano cartesiano">
        <clipPath id={clip}><rect x={PAD} y={PAD} width={SIZE - 2 * PAD} height={SIZE - 2 * PAD} /></clipPath>
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
        {drawn.map((two, i) => {
          if (two.length !== 2) return null
          const [[x1, y1], [x2, y2]] = two
          const dx = x2 - x1, dy = y2 - y1, k = 40
          return <line key={i} clipPath={`url(#${clip})`} x1={px(x1 - k * dx)} y1={py(y1 - k * dy)} x2={px(x1 + k * dx)} y2={py(y1 + k * dy)}
            stroke={colorOf(i)} strokeWidth="2" />
        })}
        {drawn.map((two, i) => two.map(([x, y]) => <circle key={`${i}-${x},${y}`} cx={px(x)} cy={py(y)} r="5" fill={names ? LINE_COLORS[i] : '#c0392b'} />))}
      </svg>
      {!disabled && (
        <p className="pietotal">
          {names ? `${names[current]}: ` : ''}
          {pts.length ? `Puntos: ${pts.map(([x, y]) => `(${x} ; ${y})`).join(' y ')} ` : 'Todavía no marcaste puntos. '}
          {pts.length > 0 && <button type="button" className="link" onClick={() => save('')}>Borrar</button>}
        </p>
      )}
    </div>
  )
}

// ---------- Recta numérica ----------
// kind 'point': ubicar un número. kind 'ray': extremo, punto lleno o hueco y hacia dónde se sombrea.
export function NumberLine({ field, value, onChange, disabled, mark }) {
  const MIN = -6, MAX = 6, W = 340, H = 64, M = 14, Y = 34
  const nx = (v) => M + ((v - MIN) / (MAX - MIN)) * (W - 2 * M)
  const isRay = field.kind === 'ray'
  const state = isRay ? parseRay(value) : { end: value || '', closed: '', dir: '' }
  const at = parseNumber(state.end)
  const text = (v) => String(v).replace('.', ',')
  const emit = (patch) => {
    const n = { ...state, ...patch }
    onChange(isRay ? `${n.end}|${n.closed}|${n.dir}` : n.end)
  }
  const move = (v) => emit({ end: text(Math.round(Math.min(MAX, Math.max(MIN, v)) * 10) / 10) })
  const tap = (e) => {
    if (disabled) return
    const box = e.currentTarget.getBoundingClientRect()
    move(MIN + ((((e.clientX - box.left) / box.width) * W - M) / (W - 2 * M)) * (MAX - MIN))
  }
  const color = mark === false ? '#c0392b' : mark ? '#1e8e4e' : '#2c5282'
  const ints = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i)
  const toggle = (key, v, label) => (
    <button type="button" className="seg" aria-pressed={state[key] === v} onClick={() => emit({ [key]: v })}>{label}</button>
  )
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart axis" onClick={tap} role="img" aria-label="Recta numérica">
        <line x1="3" x2={W - 3} y1={Y} y2={Y} stroke="#1b2430" strokeWidth="1.4" />
        {Array.from({ length: (MAX - MIN) * 2 + 1 }, (_, i) => MIN + i / 2).map((v) => (
          <line key={v} x1={nx(v)} x2={nx(v)} y1={Y - (Number.isInteger(v) ? 6 : 3)} y2={Y + (Number.isInteger(v) ? 6 : 3)} stroke="#1b2430" />
        ))}
        {ints.map((v) => <text key={v} x={nx(v)} y={Y + 19} textAnchor="middle" fontSize="11">{v}</text>)}
        {at !== null && isRay && state.dir && (
          <line x1={nx(at)} x2={state.dir === 'izq' ? 3 : W - 3} y1={Y} y2={Y} stroke={color} strokeWidth="6" opacity=".7" />
        )}
        {at !== null && (
          <circle cx={nx(at)} cy={Y} r="6" strokeWidth="2.5" stroke={color} fill={!isRay || state.closed === 'c' ? color : '#fff'} />
        )}
      </svg>
      {!disabled && (
        <div className="axis-tools">
          <div className="axis-move">
            <button type="button" className="key" aria-label="Mover el punto 0,1 a la izquierda" onClick={() => move((at ?? 0) - 0.1)}>−</button>
            <output>{at === null ? 'Tocá la recta' : `Punto en ${state.end}`}</output>
            <button type="button" className="key" aria-label="Mover el punto 0,1 a la derecha" onClick={() => move((at ?? 0) + 0.1)}>+</button>
          </div>
          {isRay && (
            <>
              <div className="segmented" role="group" aria-label="Tipo de punto">{toggle('closed', 'c', '● Lleno')}{toggle('closed', 'a', '○ Hueco')}</div>
              <div className="segmented" role="group" aria-label="Sombreado">{toggle('dir', 'izq', '← Izquierda')}{toggle('dir', 'der', 'Derecha →')}</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ---------- Trapecio isósceles con medidas en x ----------
export function Trapezoid({ shape }) {
  const { top, over, height, side } = shape
  return (
    <svg viewBox="0 0 300 190" className="chart tri" role="img"
      aria-label={`Trapecio isósceles: base menor ${top}x, lados ${side}x, altura ${height}x; la base mayor se divide en ${over}x, ${top}x y ${over}x`}>
      <polygon points="95,30 205,30 280,145 20,145" fill="none" stroke="#111" strokeWidth="1.6" />
      <path d="M95 30V145M205 30V145" stroke="#111" strokeDasharray="5 4" />
      <path d="M95 133h12v12M205 133h-12v12" fill="none" stroke="#111" />
      <g fontSize="15" fill="#111" textAnchor="middle">
        <text x="150" y="22">{top}x</text>
        <text x="42" y="82">{side}x</text><text x="258" y="82">{side}x</text>
        <text x="115" y="92">{height}x</text>
        <text x="57" y="165">{over}x</text><text x="150" y="165">{top}x</text><text x="243" y="165">{over}x</text>
      </g>
    </svg>
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
