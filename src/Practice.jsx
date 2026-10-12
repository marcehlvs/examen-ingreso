import { useState } from 'react'
import { SECTIONS } from './examData'
import { generate } from './generators'
import Rich from './Rich'
import { recordAnswers, weakSections } from './studentStats'

const LETTERS = ['A', 'B', 'C', 'D']

// Modo práctica: ejercicios nuevos (mismos tipos que el examen) generados al azar.
// -1 = «Mis débiles»: ejercicios de las secciones con menos aciertos
const make = (t) => {
  if (t !== -1) return generate(t)
  const w = weakSections()
  return generate(w.length ? w[Math.floor(Math.random() * w.length)] : 0)
}

export default function Practice({ initialTopic = 0 }) {
  const [topic, setTopic] = useState(initialTopic) // 0 = mezcla, -1 = mis débiles
  const [q, setQ] = useState(() => make(initialTopic))
  const [sel, setSel] = useState(null)
  const [show, setShow] = useState(false)
  const [tally, setTally] = useState({ ok: 0, total: 0 })

  const next = (t = topic) => { setQ(make(t)); setSel(null); setShow(false) }
  const pickTopic = (t) => { setTopic(t); next(t) }
  const choose = (i) => {
    if (sel !== null) return
    setSel(i)
    recordAnswers([{ sec: q.sec, ok: i === q.answer, src: 'practica' }])
    setTally((t) => ({ ok: t.ok + (i === q.answer ? 1 : 0), total: t.total + 1 }))
  }
  const sec = SECTIONS.find((s) => s.id === q.sec)
  const done = sel !== null

  return (
    <section className="section">
      <div className="chips">
        <a href="#p" className={topic === 0 ? 'chip-on' : ''} onClick={(e) => { e.preventDefault(); pickTopic(0) }}>Mezcla</a>
        {weakSections().length > 0 && (
          <a href="#p" className={topic === -1 ? 'chip-on' : ''} onClick={(e) => { e.preventDefault(); pickTopic(-1) }}>Mis débiles</a>
        )}
        {SECTIONS.map((s) => (
          <a key={s.id} href="#p" title={s.title} className={topic === s.id ? 'chip-on' : ''} onClick={(e) => { e.preventDefault(); pickTopic(s.id) }}>Ej. {s.id}</a>
        ))}
      </div>
      <p className="tally">Aciertos: <strong>{tally.ok}/{tally.total}</strong></p>

      <article className="card">
        <header className="card-head">
          <span className="qnum">Ej. {q.sec}</span>
          <span className="qpts">{sec.title}</span>
          {done && <span className={`badge ${sel === q.answer ? 'good' : 'bad'}`}>{sel === q.answer ? 'Correcta' : 'Incorrecta'}</span>}
        </header>
        <p className="prompt"><Rich text={q.prompt} /></p>
        <div className="options" role="radiogroup">
          {q.options.map((opt, i) => {
            let cls = 'opt'
            if (sel === i) cls += ' sel'
            if (done && i === q.answer) cls += ' ok'
            if (done && sel === i && i !== q.answer) cls += ' no'
            return (
              <button key={i} type="button" role="radio" aria-checked={sel === i} className={cls} disabled={done} onClick={() => choose(i)}>
                <span className="letter">{q.options.length === 2 ? (i === 0 ? 'V' : 'F') : LETTERS[i]}</span>
                <span className="otext"><Rich text={opt} /></span>
              </button>
            )
          })}
        </div>
        <button type="button" className="link" onClick={() => setShow((v) => !v)}>
          {show ? 'Ocultar desarrollo' : 'Ver desarrollo paso a paso'}
        </button>
        {show && (
          <ol className="steps">
            {q.steps.map((s, i) => <li key={i}><Rich text={s} /></li>)}
            <li className="final">Respuesta correcta: <strong><Rich text={q.options[q.answer]} /></strong></li>
          </ol>
        )}
      </article>

      <div className="footer">
        <button type="button" className="btn" onClick={() => next()}>{done ? 'Otra parecida →' : 'Saltar →'}</button>
      </div>
    </section>
  )
}
