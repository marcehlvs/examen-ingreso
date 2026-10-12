import { useState } from 'react'
import { SECTIONS } from './examData'
import { getStats, weakSections, clearStats } from './studentStats'

const fmtDate = (t) => new Date(t).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
const MODE = { examen: 'Examen', simulacro: 'Simulacro' }
const level = (p) => (p >= 75 ? 'good' : p >= 50 ? 'mid' : 'low')

export default function Stats({ onWeak }) {
  const [, force] = useState(0)
  const [ask, setAsk] = useState(false)
  const st = getStats()
  const weak = weakSections()
  const sessions = st.sessions.slice(-8)
  const gp = st.total ? Math.round((100 * st.ok) / st.total) : null

  if (st.total === 0) {
    return (
      <section className="section">
        <div className="card"><p className="prompt">Todavía no hay datos. Resolvé un examen, un simulacro o ejercicios de práctica y acá vas a ver tus aciertos por ejercicio.</p></div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="card">
        <p className="statbig">{gp}%<small> de aciertos</small></p>
        <p className="qpts">{st.ok} correctas de {st.total} respondidas (examen, simulacro y práctica)</p>
      </div>

      <div className="card">
        <h3 className="h3">Aciertos por ejercicio</h3>
        {SECTIONS.map((s) => {
          const v = st.per[s.id], p = v.n ? Math.round((100 * v.ok) / v.n) : null
          return (
            <div key={s.id} className="srow">
              <div className="brow"><span>Ej. {s.id} · {s.title}</span><strong>{p === null ? '—' : `${p}%`}</strong></div>
              <div className="bar small"><div className={`fill ${p === null ? '' : level(p)}`} style={{ width: `${p || 0}%` }} /></div>
              <span className="qpts">{v.n ? `${v.ok}/${v.n} correctas` : 'sin datos todavía'}</span>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h3 className="h3">Para reforzar</h3>
        {weak.length ? (
          <>
            <p className="prompt">Tus puntos más flojos: {weak.map((w) => `Ej. ${w} (${Math.round((100 * st.per[w].ok) / st.per[w].n)}%)`).join(', ')}.</p>
            <button type="button" className="btn" onClick={onWeak}>Repasar mis errores →</button>
          </>
        ) : (
          <p className="prompt">No hay ejercicios por debajo de 75% (se necesitan al menos 3 respuestas por ejercicio). ¡Seguí practicando!</p>
        )}
      </div>

      {sessions.length > 0 && (
        <div className="card">
          <h3 className="h3">Últimos exámenes y simulacros</h3>
          <div className="spark" aria-hidden="true">
            {sessions.map((s, i) => <div key={i} className={`sbar ${level(s.score)}`} style={{ height: `${Math.max(6, s.score)}%` }} title={`${s.score}/100`} />)}
          </div>
          <ul className="slist">
            {[...sessions].reverse().map((s, i) => (
              <li key={i}><span>{fmtDate(s.t)} · {MODE[s.mode] || s.mode}</span><strong>{s.score}/{s.total}{s.usedMs ? ` · ${Math.round(s.usedMs / 60000)} min` : ''}</strong></li>
            ))}
          </ul>
        </div>
      )}

      <div className="footer">
        {!ask ? (
          <button type="button" className="btn ghost" onClick={() => setAsk(true)}>Borrar estadísticas</button>
        ) : (
          <>
            <span className="qpts">¿Seguro? No se puede deshacer.</span>
            <button type="button" className="btn ghost" onClick={() => setAsk(false)}>Cancelar</button>
            <button type="button" className="btn" onClick={() => { clearStats(); setAsk(false); force((n) => n + 1) }}>Sí, borrar</button>
          </>
        )}
      </div>
    </section>
  )
}
