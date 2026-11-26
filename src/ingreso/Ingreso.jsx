import { useEffect, useMemo, useRef, useState } from 'react'
import { SECTIONS, QUESTIONS, TOTAL } from './examData'
import Rich from '../shared/Rich'
import Figura from './Figura'
import Figura2 from './Figura2'
import { SECTIONS2, QUESTIONS2 } from './examData2'
import { SECTIONS3, QUESTIONS3 } from './examData3'
import Stats from './Stats'
import { recordAnswers, recordSession } from './studentStats'

const STORAGE_KEY = 'examen-ingreso-2do-2027-v1'
const LETTERS = ['A', 'B', 'C', 'D']
const minutesFor = (mode) => (mode === 'examen2' || mode === 'examen3' ? 120 : 90)

const EXAMS = ['examen', 'examen2', 'examen3']

// Exámenes que muestran la etiqueta «Nuevo»: para quitarla, sacalos de esta lista.
const NEW_EXAMS = ['examen2', 'examen3']

const fmt = (ms) => {
  const t = Math.max(0, Math.floor(ms / 1000))
  const m = String(Math.floor(t / 60)).padStart(2, '0')
  const sec = String(t % 60).padStart(2, '0')
  return `${m}:${sec}`
}

function loadSaved() {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    // Datos guardados de un modo que ya no existe (simulacro o práctica): se conserva solo lo respondido.
    if (d.mode && !EXAMS.includes(d.mode)) return { answers: d.answers }
    return d
  } catch {
    return {}
  }
}

export default function Ingreso() {
  const saved = useMemo(loadSaved, [])
  const [answers, setAnswers] = useState(saved.answers || {})
  const [mode, setMode] = useState(saved.mode || 'examen') // 'examen' | 'examen2' | 'examen3'
  const [showStats, setShowStats] = useState(false)
  const [submitted, setSubmitted] = useState(saved.submitted || false)
  const [openSol, setOpenSol] = useState({})
  const [onlyWrong, setOnlyWrong] = useState(false)
  const [startedAt, setStartedAt] = useState(saved.startedAt || null)
  const [usedMs, setUsedMs] = useState(saved.usedMs ?? null)
  const [now, setNow] = useState(Date.now())
  const [pending, setPending] = useState(null) // 'submit' | 'reset' | null

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, mode, submitted, startedAt, usedMs }))
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [answers, mode, submitted, startedAt, usedMs])

  const questions = mode === 'examen2' ? QUESTIONS2 : mode === 'examen3' ? QUESTIONS3 : QUESTIONS
  const sections = mode === 'examen2' ? SECTIONS2 : mode === 'examen3' ? SECTIONS3 : SECTIONS
  const examMs = minutesFor(mode) * 60 * 1000
  const ref = useRef({})
  ref.current = { answers, questions, mode, startedAt, submitted }

  const answered = questions.filter((q) => answers[q.id] !== undefined).length
  const isCorrect = (q) => answers[q.id] === q.answer
  const score = questions.reduce((s, q) => s + (isCorrect(q) ? q.pts : 0), 0)
  const showScore = submitted

  const bySection = sections.map((sec) => {
    const qs = questions.filter((q) => q.sec === sec.id)
    const earned = qs.reduce((s, q) => s + (isCorrect(q) ? q.pts : 0), 0)
    return { ...sec, qs, earned }
  })

  const choose = (qid, idx) => {
    if (submitted) return
    setAnswers((a) => ({ ...a, [qid]: idx }))
  }

  const finish = () => {
    const { answers: A, questions: Q, mode: m, startedAt: st, submitted: done } = ref.current
    if (done) return
    const used = st ? Math.min(Date.now() - st, minutesFor(m) * 60 * 1000) : null
    recordAnswers(Q.filter((q) => A[q.id] !== undefined).map((q) => ({ sec: q.sec, ok: A[q.id] === q.answer, src: m })))
    const per = {}
    Q.forEach((q) => { per[q.sec] = (per[q.sec] || 0) + (A[q.id] === q.answer ? q.pts : 0) })
    const sc = Q.reduce((t, q) => t + (A[q.id] === q.answer ? q.pts : 0), 0)
    recordSession({ t: Date.now(), mode: m, score: sc, total: TOTAL, usedMs: used, per })
    ref.current.submitted = true
    setUsedMs(used)
    setSubmitted(true)
    setPending(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = () => {
    if (questions.length - answered > 0) setPending('submit')
    else finish()
  }

  const reset = () => setPending('reset')

  const doReset = () => {
    setAnswers({})
    setSubmitted(false)
    setOpenSol({})
    setOnlyWrong(false)
    setStartedAt(null)
    setUsedMs(null)
    setPending(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cronómetro: cuenta regresiva y corrección automática al llegar a 0
  useEffect(() => {
    if (!startedAt || submitted) return
    const id = setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (t - startedAt >= minutesFor(ref.current.mode) * 60 * 1000) finish()
    }, 1000)
    return () => clearInterval(id)
  }, [startedAt, submitted])

  const remaining = startedAt ? examMs - (now - startedAt) : examMs
  const timerRunning = startedAt && !submitted

  const toggleSol = (id) => setOpenSol((o) => ({ ...o, [id]: !o[id] }))

  const renderQuestion = (q, n) => {
    const sel = answers[q.id]
    const reveal = submitted
    return (
      <article key={q.id} className="card" id={`q-${q.id}`}>
        <header className="card-head">
          <span className="qnum">{q.n || q.id}</span>
          <span className="qpts">{q.pts} {q.pts === 1 ? 'punto' : 'puntos'}</span>
          {reveal && (
            <span className={`badge ${sel === q.answer ? 'good' : 'bad'}`}>
              {sel === undefined ? 'Sin responder' : sel === q.answer ? 'Correcta' : 'Incorrecta'}
            </span>
          )}
        </header>
        <p className="prompt"><Rich text={q.prompt} /></p>
        {q.fig === true ? <Figura /> : q.fig && <Figura2 tipo={q.fig} />}
        <div className="options" role="radiogroup">
          {q.options.map((opt, i) => {
            let cls = 'opt'
            if (sel === i) cls += ' sel'
            if (reveal && i === q.answer) cls += ' ok'
            if (reveal && sel === i && i !== q.answer) cls += ' no'
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={sel === i}
                className={cls}
                disabled={submitted}
                onClick={() => choose(q.id, i)}
              >
                <span className="letter">{q.options.length === 2 ? (i === 0 ? 'V' : 'F') : LETTERS[i]}</span>
                <span className="otext"><Rich text={opt} /></span>
              </button>
            )
          })}
        </div>
        {submitted && (
          <>
            <button type="button" className="link" onClick={() => toggleSol(q.id)}>
              {openSol[q.id] ? 'Ocultar desarrollo' : 'Ver desarrollo paso a paso'}
            </button>
            {openSol[q.id] && (
              <ol className="steps">
                {q.steps.map((s, i) => (
                  <li key={i}><Rich text={s} /></li>
                ))}
                <li className="final">
                  Respuesta correcta: <strong><Rich text={q.options[q.answer]} /></strong>
                </li>
              </ol>
            )}
          </>
        )}
      </article>
    )
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-row">
          <strong>Ingreso a 2° año 2027</strong>
          {timerRunning && (
            <span className={`timer ${remaining < 5 * 60 * 1000 ? 'low' : ''}`}>⏱ {fmt(remaining)}</span>
          )}
          <span>{answered}/{questions.length}{showScore ? ` · ${score}/${TOTAL} pts` : ''}</span>
        </div>
        <div className="bar"><div className="fill" style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
      </div>

      <header className="hero">
        <h1>{mode === 'examen2' ? 'Examen de ingreso N.º 2' : mode === 'examen3' ? 'Examen de ingreso N.º 3' : 'Examen modelo de ingreso'}</h1>
        <p className="sub">Matemática · {questions.length} preguntas · {TOTAL} puntos · sin calculadora</p>

        <div className="modes" role="tablist">
          {[['examen', 'Examen 1'], ['examen2', 'Examen 2'], ['examen3', 'Examen 3']].map(([m, label]) => (
            <button
              key={m} type="button" role="tab" aria-selected={mode === m}
              className={mode === m ? 'on' : ''} disabled={submitted || !!startedAt}
              onClick={() => { setShowStats(false); setMode(m) }}
            >
              {label}
              {NEW_EXAMS.includes(m) && <span className="tag-new">Nuevo</span>}
            </button>
          ))}
        </div>
        <p className="modehelp">
          {mode === 'examen'
            ? 'El examen modelo. Respondé todo y corregí al final; después ves el desarrollo de cada pregunta.'
            : 'Para resolver en 2 horas con papel y lápiz. Marcá cada resultado y corregí al final.'}
        </p>
        <button type="button" className="btn ghost start" disabled={!!timerRunning} onClick={() => setShowStats((v) => !v)}>
          {showStats ? '← Volver' : '📊 Mis estadísticas'}
        </button>

        {!showStats && !submitted && !startedAt && (
          <button type="button" className="btn ghost start" onClick={() => { setNow(Date.now()); setStartedAt(Date.now()) }}>
            ⏱ Iniciar cronómetro ({minutesFor(mode)} min)
          </button>
        )}

        {!showStats && (
          <nav className="chips" aria-label="Ir a un ejercicio">
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" onClick={() => document.getElementById(`ex-${s.id}`)?.scrollIntoView()}>Ej. {s.id}</button>
            ))}
          </nav>
        )}
      </header>

      {showStats ? <Stats /> : (<>
      {submitted && (
        <section className="result">
          <h2>Resultado</h2>
          <p className="big">{score}<small> / {TOTAL}</small></p>
          <p className="pct">
            {Math.round((score / TOTAL) * 100)}% de respuestas puntuadas
            {usedMs !== null && ` · Tiempo usado: ${fmt(usedMs)}`}
          </p>
          <ul className="breakdown">
            {bySection.map((s) => (
              <li key={s.id}>
                <div className="brow"><span>Ej. {s.id} · {s.title}</span><strong>{s.earned}/{s.pts}</strong></div>
                <div className="bar small"><div className="fill" style={{ width: `${(s.earned / s.pts) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
          <label className="check">
            <input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} />
            Mostrar solo las que no acerté
          </label>
          <button type="button" className="btn ghost" onClick={reset}>Volver a intentarlo</button>
        </section>
      )}

      {bySection.map((sec) => {
        const list = sec.qs.filter((q) => !(submitted && onlyWrong && isCorrect(q)))
        if (list.length === 0) return null
        return (
          <section key={sec.id} id={`ex-${sec.id}`} className="section">
            <h2>
              <span>Ejercicio {sec.id}</span> {sec.title}
              <em>{sec.pts} pts{showScore ? ` · ${sec.earned} obtenidos` : ''}</em>
            </h2>
            {list.map((q, i) => renderQuestion(q, i))}
          </section>
        )
      })}

      <footer className="footer">
        {!submitted ? (
          <button type="button" className="btn" onClick={submit}>Corregir examen</button>
        ) : (
          <button type="button" className="btn" onClick={reset}>Volver a intentarlo</button>
        )}
        {!submitted && answered > 0 && (
          <button type="button" className="btn ghost" onClick={reset}>Borrar respuestas</button>
        )}
      </footer>
      </>)}


      {pending && (
        <div className="overlay">
          <div className="dialog" role="alertdialog">
            <p>
              {pending === 'submit'
                ? `Te faltan ${questions.length - answered} preguntas sin responder. ¿Corregir igual?`
                : 'Se borrarán todas tus respuestas. ¿Empezar de nuevo?'}
            </p>
            <div className="drow">
              <button type="button" className="btn ghost" onClick={() => setPending(null)}>Cancelar</button>
              <button type="button" className="btn" onClick={pending === 'submit' ? finish : doReset}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
