import { Inbox } from './Icons'

// Estado vacío: qué pasó y qué puede hacer la persona ahora.
export default function Empty({ icon = <Inbox />, title, children, action }) {
  return (
    <div className="empty">
      <div className="ico" aria-hidden="true">{icon}</div>
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  )
}
