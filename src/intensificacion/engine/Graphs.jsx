// Gráficos de funciones: uno para leer (con varias curvas) y cuatro opciones para reconocer el correcto.
import { useId } from 'react'

const W = 300

// graph: { window: [xMin, xMax, yMin, yMax], curves: [{ f, color, label }], asymptote?: { x } | { y } }
export function FunctionGraph({ graph, small }) {
  const clip = useId().replace(/:/g, '')
  const [x0, x1, y0, y1] = graph.window
  const u = W / (x1 - x0), H = Math.min(W * 1.1, (y1 - y0) * u)
  const v = H / (y1 - y0)
  const px = (x) => (x - x0) * u
  const py = (y) => (y1 - y) * v
  const ints = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
  const every = x1 - x0 > 14 ? 4 : x1 - x0 > 10 ? 2 : 1
  const everyY = y1 - y0 > 14 ? 4 : y1 - y0 > 10 ? 2 : 1

  // La curva se corta donde la función no existe o se va muy lejos de la ventana.
  const path = (f) => {
    let d = '', pen = false
    for (let i = 0; i <= 1200; i++) {
      const x = x0 + ((x1 - x0) * i) / 1200
      let y = f(x)
      if (y === -Infinity) y = y0 - 5
      if (y === Infinity) y = y1 + 5
      if (!Number.isFinite(y)) { pen = false; continue }
      y = Math.max(y0 - 5, Math.min(y1 + 5, y))
      d += `${pen ? 'L' : 'M'}${px(x).toFixed(1)} ${py(y).toFixed(1)}`
      pen = true
    }
    return d
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart graph" role="img" aria-label={graph.alt || 'Gráfico en ejes cartesianos'}>
      <clipPath id={clip}><rect width={W} height={H} /></clipPath>
      {ints(x0, x1).map((x) => <line key={`x${x}`} x1={px(x)} x2={px(x)} y1="0" y2={H} stroke="#d5dce6" />)}
      {ints(y0, y1).map((y) => <line key={`y${y}`} x1="0" x2={W} y1={py(y)} y2={py(y)} stroke="#d5dce6" />)}
      <line x1="0" x2={W} y1={py(0)} y2={py(0)} stroke="#1b2430" strokeWidth="1.4" />
      <line x1={px(0)} x2={px(0)} y1="0" y2={H} stroke="#1b2430" strokeWidth="1.4" />
      <g fontSize={small ? 15 : 10} fill="#1b2430">
        {ints(x0 + 1, x1 - 1).filter((x) => x && x % every === 0).map((x) => <text key={x} x={px(x)} y={py(0) + (small ? 15 : 12)} textAnchor="middle">{x}</text>)}
        {ints(y0 + 1, y1 - 1).filter((y) => y && y % everyY === 0).map((y) => <text key={y} x={px(0) - 4} y={py(y) + 4} textAnchor="end">{y}</text>)}
      </g>
      <g clipPath={`url(#${clip})`} fill="none">
        {graph.asymptote && (graph.asymptote.x !== undefined
          ? <line x1={px(graph.asymptote.x)} x2={px(graph.asymptote.x)} y1="0" y2={H} stroke="#b86e00" strokeDasharray="6 4" strokeWidth="1.5" />
          : <line x1="0" x2={W} y1={py(graph.asymptote.y)} y2={py(graph.asymptote.y)} stroke="#b86e00" strokeDasharray="6 4" strokeWidth="1.5" />)}
        {graph.curves.map((c, i) => <path key={i} d={path(c.f)} stroke={c.color || '#2c5282'} strokeWidth={small ? 3 : 2} />)}
      </g>
      {graph.curves.filter((c) => c.label).map((c) => (
        <text key={c.label} x={px(c.at[0])} y={py(c.at[1])} fontSize="14" fontWeight="700" fill={c.color}>{c.label}</text>
      ))}
    </svg>
  )
}

export const LETTERS = ['A', 'B', 'C', 'D']

// sketch: { window, options: [graph, graph, graph, graph], answer: 'A' | … }
export function Sketches({ sketch, value, onChange, disabled, mark }) {
  return (
    <div className="sketches" role="group" aria-label="Opciones de gráfico">
      {sketch.options.map((o, i) => {
        const letter = LETTERS[i], chosen = value === letter
        return (
          <button key={letter} type="button" disabled={disabled} aria-pressed={chosen} aria-label={`Gráfico ${letter}`}
            className={`sketch ${chosen && mark !== undefined ? (mark ? 'ok' : 'no') : ''}`} onClick={() => onChange(letter)}>
            <span>{letter}</span>
            <FunctionGraph small graph={{ ...o, window: sketch.window }} />
          </button>
        )
      })}
    </div>
  )
}
