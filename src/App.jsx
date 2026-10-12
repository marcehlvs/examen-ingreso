import { useEffect, useMemo, useRef, useState } from 'react'
import { SECTIONS, QUESTIONS, TOTAL } from './examData'
import Rich from './Rich'
import Figura from './Figura'
import Practice from './Practice'
import Stats from './Stats'
import { generateSimulacro } from './generators'
import { recordAnswers, recordSession } from './studentStats'

const STORAGE_KEY = 'examen-ingreso-2do-2027-v1'
const LETTERS = ['A', 'B', 'C', 'D']
const EXAM_MS = 90 * 60 * 1000 // 90 minutos

const fmt = (ms) => {
  const t = Math.max(0, Math.floor(ms / 1000))
  const m = String(Math.floor(t / 60)).padStart(2, '0')
  const sec = String(t % 60).padStart(2, '0')
  return `${m}:${sec}`
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const saved = useMemo(loadSaved, [])
  const [answers, setAnswers] = useState(saved.answers || {})
  const [mode, setMode] = useState(saved.mode === 'estadisticas' ? 'examen' : saved.mode || 'examen') // 'examen' | 'simulacro' | 'practica'
  const [simQs, setSimQs] = useState(saved.simQs || [])
  const [showStats, setShowStats] = useState(false)
  const [pTopic, setPTopic] = useState(0)
  const [pKey, setPKey] = useState(0)
  const [submitted, setSubmitted] = useState(saved.submitted || false)
  const [openSol, setOpenSol] = useState({})
  const [onlyWrong, setOnlyWrong] = useState(false)
  const [startedAt, setStartedAt] = useState(saved.startedAt || null)
  const [usedMs, setUsedMs] = useState(saved.usedMs ?? null)
  const [now, setNow] = useState(Date.now())
  const [pending, setPending] = useState(null) // 'submit' | 'reset' | null

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, mode, submitted, startedAt, usedMs, simQs }))
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [answers, mode, submitted, startedAt, usedMs, simQs])

  const questions = mode === 'simulacro' ? simQs : QUESTIONS
  const ref = useRef({})
  ref.current = { answers, questions, mode, startedAt, submitted }

  const goMode = (m) => {
    if (m === 'simulacro' && simQs.length === 0) setSimQs(generateSimulacro())
    setMode(m)
  }

  const answered = questions.filter((q) => answers[q.id] !== undefined).length
  const isCorrect = (q) => answers[q.id] === q.answer
  const score = questions.reduce((s, q) => s + (isCorrect(q) ? q.pts : 0), 0)
  const showScore = submitted || mode === 'practica'

  const bySection = SECTIONS.map((sec) => {
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
    const used = st ? Math.min(Date.now() - st, EXAM_MS) : null
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
    setSimQs(mode === 'simulacro' ? generateSimulacro() : [])
    setPending(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cronómetro: cuenta regresiva y corrección automática al llegar a 0
  useEffect(() => {
    if (!startedAt || submitted) return
    const id = setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (t - startedAt >= EXAM_MS) finish()
    }, 1000)
    return () => clearInterval(id)
  }, [startedAt, submitted])

  const remaining = startedAt ? EXAM_MS - (now - startedAt) : EXAM_MS
  const timerRunning = startedAt && !submitted

  const toggleSol = (id) => setOpenSol((o) => ({ ...o, [id]: !o[id] }))

  const renderQuestion = (q, n) => {
    const sel = answers[q.id]
    const reveal = submitted || (mode === 'practica' && sel !== undefined)
    const canSeeSolution = submitted || mode === 'practica'
    return (
      <article key={q.id} className="card" id={`q-${q.id}`}>
        <header className="card-head">
          <span className="qnum">{q.id}</span>
          <span className="qpts">{q.pts} {q.pts === 1 ? 'punto' : 'puntos'}</span>
          {reveal && (
            <span className={`badge ${sel === q.answer ? 'good' : 'bad'}`}>
              {sel === undefined ? 'Sin responder' : sel === q.answer ? 'Correcta' : 'Incorrecta'}
            </span>
          )}
        </header>
        <p className="prompt"><Rich text={q.prompt} /></p>
        {q.fig && <Figura />}
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
        {canSeeSolution && (
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
    <div className="app">
      <div className="topbar">
        <div className="topbar-row">
          <strong>Ingreso a 2° año 2027</strong>
          {timerRunning && (
            <span className={`timer ${remaining < 5 * 60 * 1000 ? 'low' : ''}`}>⏱ {fmt(remaining)}</span>
          )}
          {mode !== 'practica' && <span>{answered}/{questions.length}{showScore ? ` · ${score}/${TOTAL} pts` : ''}</span>}
        </div>
        <div className="bar"><div className="fill" style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
      </div>

      <header className="hero">
        <p className="school">E.E.S.T. N° 7 Quilmes · Taller Regional Quilmes</p>
        <h1>Examen modelo de ingreso</h1>
        <p className="sub">Matemática · {mode === 'practica' ? 'ejercicios generados al azar' : `${questions.length} preguntas · ${TOTAL} puntos · sin calculadora`}</p>

        <div className="modes" role="tablist">
          {[['examen', 'Examen'], ['simulacro', 'Simulacro'], ['practica', 'Práctica']].map(([m, label]) => (
            <button
              key={m} type="button" role="tab" aria-selected={mode === m}
              className={mode === m ? 'on' : ''} disabled={submitted || !!startedAt}
              onClick={() => { setShowStats(false); goMode(m) }}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="modehelp">
          {mode === 'examen'
            ? 'El examen modelo fijo. Respondé todo y corregí al final; después ves el desarrollo de cada pregunta.'
            : mode === 'simulacro'
              ? 'Un examen NUEVO cada vez: mismo formato y puntaje que el modelo, con números al azar. Se corrige al final.'
              : 'Ejercicios nuevos de cada tipo, con números al azar. Corrige al instante y muestra el desarrollo.'}
        </p>
        <button type="button" className="btn ghost start" disabled={!!timerRunning} onClick={() => setShowStats((v) => !v)}>
          {showStats ? '← Volver' : '📊 Mis estadísticas'}
        </button>

        {mode !== 'practica' && !showStats && !submitted && !startedAt && (
          <button type="button" className="btn ghost start" onClick={() => { setNow(Date.now()); setStartedAt(Date.now()) }}>
            ⏱ Iniciar cronómetro (90 min)
          </button>
        )}

        {mode !== 'practica' && !showStats && (
          <nav className="chips" aria-label="Ir a un ejercicio">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#ex-${s.id}`}>Ej. {s.id}</a>
            ))}
          </nav>
        )}
      </header>

      {showStats ? <Stats onWeak={() => { setShowStats(false); setPTopic(-1); setPKey((k) => k + 1); setMode('practica') }} /> : mode === 'practica' ? <Practice key={pKey} initialTopic={pTopic} /> : (<>
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

      <p className="credit">Creado por el Prof. Juan Marcelo Bejarano</p>

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
    </div>
  )
}
