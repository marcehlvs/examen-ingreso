// Aviso en línea. tone: 'success' | 'error' | 'warn' | 'info'. Los errores se anuncian al instante (role="alert").
const ICON = { success: '✓', error: '!', warn: '⚠', info: 'ℹ' }

export default function Notice({ tone = 'info', children }) {
  return (
    <div className={`notice ${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="ico" aria-hidden="true">{ICON[tone]}</span>
      <p>{children}</p>
    </div>
  )
}
