import { useEffect, useId, useRef } from 'react'

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Hoja inferior accesible (en pantallas grandes, ventana centrada): foco atrapado y Escape para cerrar.
export default function Sheet({ title, onClose, children }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const opener = document.activeElement
    const root = ref.current
    root.querySelector('[data-autofocus]')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      if (e.key !== 'Tab') return
      const nodes = [...root.querySelectorAll(FOCUSABLE)]
      if (!nodes.length) return
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sheet-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={ref} className="sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="sheet-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="btn ghost small" onClick={onClose} data-autofocus>Cerrar</button>
        </div>
        {children}
      </div>
    </div>
  )
}
