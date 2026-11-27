import Sheet from '../shared/Sheet'

// Mapa del examen: relleno = respondida, borde punteado = pendiente. Tocar una pregunta lleva hasta ella.
export default function QuestionSheet({ sections, answers, onPick, onClose }) {
  const all = sections.flatMap((s) => s.qs)
  const answered = all.filter((q) => answers[q.id] !== undefined).length
  const firstPending = all.find((q) => answers[q.id] === undefined)
  return (
    <Sheet title="Preguntas" onClose={onClose}>
      <p className="sheet-legend" aria-label="Referencias">
        <span><i className="qdot done" aria-hidden="true" /> Respondida</span>
        <span><i className="qdot" aria-hidden="true" /> Pendiente</span>
        <strong>{answered} de {all.length}</strong>
      </p>
      {firstPending && (
        <button type="button" className="btn block sheet-go" onClick={() => onPick(firstPending)}>
          Ir a la primera sin responder ({firstPending.n || firstPending.id})
        </button>
      )}
      {sections.map((s) => (
        <section key={s.id} aria-label={`Ejercicio ${s.id}`}>
          <h3>Ejercicio {s.id} · {s.title}</h3>
          <div className="qgrid">
            {s.qs.map((q) => {
              const done = answers[q.id] !== undefined
              return (
                <button key={q.id} type="button" className={`qbtn ${done ? 'done' : ''}`}
                  aria-label={`Pregunta ${q.n || q.id}, ${done ? 'respondida' : 'sin responder'}`}
                  onClick={() => onPick(q)}>{q.n || q.id}</button>
              )
            })}
          </div>
        </section>
      ))}
    </Sheet>
  )
}
