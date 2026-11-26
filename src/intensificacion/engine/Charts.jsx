// Gráficos que completa el alumno: puntos en ejes cartesianos, barras y circular.
import { parseNumber } from './check'

const COLORS = ['#2c5282', '#e0a100', '#1e8e4e', '#c0392b', '#7b4bb3']
const W = 320, H = 260, L = 36, R = 10, T = 12, B = 40
const comma = (v) => String(Math.round(v * 100) / 100).replace('.', ',')

// type 'puntos': eje x numérico a escala. type 'barras': una barra por categoría.
export function XYChart({ chart, values, onChange, disabled }) {
  const { type, points, yMax, step, yTick, xLabel, yLabel } = chart
  const xMax = type === 'puntos' ? Math.max(...points.map((p) => p.x)) + 1 : points.length
  const px = (i) => L + (type === 'puntos' ? (points[i].x / xMax) : (i + 0.5) / xMax) * (W - L - R)
  const py = (v) => T + (1 - v / yMax) * (H - T - B)
  const valueOf = (p) => (p.fixed ? p.answer : parseNumber(values[p.key]))
  const set = (p, v) => onChange(p.key, comma(Math.min(yMax, Math.max(0, Math.round(v / step) * step))))

  const tap = (e) => {
    if (disabled) return
    const box = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - box.left) / box.width) * W
    const y = ((e.clientY - box.top) / box.height) * H
    let best = 0
    points.forEach((_, i) => { if (Math.abs(px(i) - x) < Math.abs(px(best) - x)) best = i })
    if (!points[best].fixed) set(points[best], (1 - (y - T) / (H - T - B)) * yMax)
  }

  const ticks = []
  for (let v = 0; v <= yMax + 1e-9; v += yTick) ticks.push(v)
  const xTicks = type === 'puntos' ? Array.from({ length: xMax + 1 }, (_, i) => i) : []
  const barW = ((W - L - R) / xMax) * 0.6

  return (
    <div>
      <p className="axis-title">{yLabel}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" onClick={tap} role="img" aria-label={`Gráfico: ${yLabel} según ${xLabel}`}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={py(v)} y2={py(v)} stroke="#d5dce6" />
            <text x={L - 5} y={py(v) + 4} textAnchor="end" fontSize="10">{comma(v)}</text>
          </g>
        ))}
        {xTicks.map((v) => (
          <g key={v}>
            <line x1={L + (v / xMax) * (W - L - R)} x2={L + (v / xMax) * (W - L - R)} y1={T} y2={H - B} stroke="#eef1f6" />
            <text x={L + (v / xMax) * (W - L - R)} y={H - B + 13} textAnchor="middle" fontSize="10">{v}</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="#1b2430" strokeWidth="1.5" />
        <line x1={L} x2={L} y1={T} y2={H - B} stroke="#1b2430" strokeWidth="1.5" />
        {points.map((p, i) => {
          const v = valueOf(p)
          const drawn = v !== null && v >= 0 && v <= yMax
          return (
            <g key={i}>
              {type === 'barras' && drawn && <rect x={px(i) - barW / 2} y={py(v)} width={barW} height={H - B - py(v)} fill={COLORS[i % 5]} />}
              {type === 'puntos' && drawn && <circle cx={px(i)} cy={py(v)} r="5" fill={p.fixed ? '#5b6573' : '#c0392b'} />}
              {type === 'barras' && <text x={px(i)} y={H - B + 13} textAnchor="middle" fontSize="10">{p.label}</text>}
            </g>
          )
        })}
        <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize="11" fontWeight="700">{xLabel}</text>
      </svg>
      <div className="steppers">
        {points.map((p, i) => {
          const v = valueOf(p)
          return (
            <div key={i} className="stepper">
              <span>{p.label}{p.fixed ? ' (dato)' : ''}</span>
              {!p.fixed && <button type="button" disabled={disabled} aria-label={`Bajar ${p.label}`} onClick={() => set(p, (v ?? 0) - step)}>−</button>}
              <output>{v === null ? '—' : comma(v)}</output>
              {!p.fixed && <button type="button" disabled={disabled} aria-label={`Subir ${p.label}`} onClick={() => set(p, (v ?? 0) + step)}>+</button>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Circular: el alumno escribe los grados de cada sector y se dibuja al instante.
export function PieChart({ chart, values, onChange, disabled }) {
  const degrees = chart.points.map((p) => Math.max(0, parseNumber(values[p.key]) || 0))
  const total = degrees.reduce((a, b) => a + b, 0)
  const at = (deg) => {
    const a = ((deg - 90) * Math.PI) / 180
    return [100 + 90 * Math.cos(a), 100 + 90 * Math.sin(a)]
  }
  let from = 0
  return (
    <div>
      <svg viewBox="0 0 200 200" className="chart pie" role="img" aria-label="Gráfico circular">
        <circle cx="100" cy="100" r="90" fill="#fff" stroke="#1b2430" strokeWidth="1.2" />
        {degrees.map((d, i) => {
          const start = from
          from += d
          const end = Math.min(from, 360)
          if (end <= start) return null
          if (end - start >= 360) return <circle key={i} cx="100" cy="100" r="90" fill={COLORS[i % 5]} />
          return (
            <path key={i} d={`M 100 100 L ${at(start)} A 90 90 0 ${end - start > 180 ? 1 : 0} 1 ${at(end)} Z`} fill={COLORS[i % 5]} stroke="#fff" />
          )
        })}
      </svg>
      <div className="fields">
        {chart.points.map((p, i) => (
          <label key={p.key} className="field">
            <span><i className="dot" style={{ background: COLORS[i % 5] }} />{p.label}</span>
            <span className="inrow">
              <input type="text" inputMode="decimal" value={values[p.key] || ''} disabled={disabled} onChange={(e) => onChange(p.key, e.target.value)} />
              <b>°</b>
            </span>
          </label>
        ))}
      </div>
      <p className={`pietotal ${total > 360 ? 'over' : ''}`}>Completaste {comma(total)}°{total > 360 ? ': te pasaste de los 360°' : ' de 360°'}</p>
    </div>
  )
}
