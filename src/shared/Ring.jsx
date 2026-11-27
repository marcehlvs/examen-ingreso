import { useEffect, useState } from 'react'

// Anillo de avance. Con `animate` arranca vacío y se llena al aparecer (una sola vez).
// Sin `label` es decorativo: el dato ya está escrito al lado.
export default function Ring({ pct, size = 56, stroke = 6, tone = '', label, animate = false, children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r
  const [p, setP] = useState(animate ? 0 : pct)
  useEffect(() => {
    if (!animate) { setP(pct); return undefined }
    const id = setTimeout(() => setP(pct), 80)
    return () => clearTimeout(id)
  }, [pct, animate])
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <span className={`ring ${tone}`} style={{ width: size, height: size }} {...a11y}>
      <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle className="ring-fill" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(100, Math.max(0, p)) / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {children !== undefined && <span className="ring-center">{children}</span>}
    </span>
  )
}

// Color según el porcentaje: verde desde 60, ámbar desde 40, rojo debajo.
export const toneOf = (pct) => (pct >= 60 ? 'good' : pct >= 40 ? 'mid' : 'low')
