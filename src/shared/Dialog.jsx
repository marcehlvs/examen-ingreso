import { useEffect, useId, useRef } from 'react'

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Modal accesible: foco atrapado, Escape para cerrar, devuelve el foco a quien lo abrió.
export default function Dialog({ title, children, confirmLabel = 'Aceptar', cancelLabel = 'Cancelar', onConfirm, onCancel }) {
  const ref = useRef(null)
  const titleId = useId()
  const bodyId = useId()

  useEffect(() => {
    const opener = document.activeElement
    const root = ref.current
    root.querySelector('[data-autofocus]')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCancel() }
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
  }, [onCancel])

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel() }}>
      <div ref={ref} className="dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={bodyId}>
        <h2 id={titleId}>{title}</h2>
        <p id={bodyId}>{children}</p>
        <div className="drow">
          <button type="button" className="btn ghost" onClick={onCancel} data-autofocus>{cancelLabel}</button>
          <button type="button" className="btn" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
