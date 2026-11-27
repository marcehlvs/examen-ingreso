import { useEffect, useState } from 'react'

// Cuánto tapa el teclado del celular. En iOS el teclado no achica la página, así que se calcula
// con visualViewport para que la barra quede justo encima.
function useKeyboardOffset(active) {
  const [off, setOff] = useState(0)
  useEffect(() => {
    const vv = window.visualViewport
    if (!active || !vv) return undefined
    const update = () => setOff(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)))
    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); setOff(0) }
  }, [active])
  return off
}

// Barra fija al pie de la pantalla.
export default function Dock({ label, lift = false, className = '', children }) {
  const off = useKeyboardOffset(lift)
  return (
    <div className={`dock ${className}`} style={off ? { bottom: off } : undefined} role="region" aria-label={label}>
      <div className="dock-inner">{children}</div>
    </div>
  )
}

// Reserva el lugar de la barra para que no tape el final de la página.
export const DockSpace = ({ tall = false }) => <div className={`dock-space ${tall ? 'tall' : ''}`} aria-hidden="true" />

// Avance «12/56» con barra fina.
export function DockProgress({ count, total, label }) {
  return (
    <div className="dock-count">
      <span><strong>{count}/{total}</strong> {label}</span>
      <div className="bar small" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={count}>
        <div className="fill" style={{ width: `${total ? (count / total) * 100 : 0}%` }} />
      </div>
    </div>
  )
}
