import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Rich from '../../shared/Rich'
import Dialog from '../../shared/Dialog'
import Notice from '../../shared/Notice'
import { storageAvailable } from '../../shared/storage'
import Ring, { toneOf } from '../../shared/Ring'
import Dock, { DockSpace, DockProgress } from '../../shared/Dock'
import { XYChart, PieChart } from './Charts'
import { FunctionGraph, Sketches } from './Graphs'
import { Plane, TriangleFigure, NumberLine, Trapezoid } from './Geometry'
import Printable from './Printable'
import { toTex } from './expr'
import { fieldsOf, isFieldOk, isFilled, isItemOk, linesOk, countedItems, isSkipped, show } from './check'

const row0 = (item) => item.table.rows[0].length

const load = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || {} } catch { return {} }
}

// Teclado de fórmulas: cada botón muestra el símbolo como en la carpeta e inserta lo que entiende el corrector.
const EXPR_KEYS = [
  { show: 'x', insert: 'x', name: 'x' },
  { show: '√', insert: '√(', name: 'raíz cuadrada' },
  { show: 'x²', insert: '²', name: 'al cuadrado' },
  { show: 'xⁿ', insert: '^(', name: 'otra potencia' },
  { show: 'a/b', insert: '/', name: 'dividido' },
  { show: '(', insert: '(', name: 'abrir paréntesis' },
  { show: ')', insert: ')', name: 'cerrar paréntesis' },
  { show: 'π', insert: 'π', name: 'pi' },
  { show: 'eˣ', insert: 'e^(', name: 'e elevado a' },
  { show: 'ln', insert: 'ln(', name: 'logaritmo natural' },
  { show: 'sen', insert: 'sen(', name: 'seno' },
  { show: 'cos', insert: 'cos(', name: 'coseno' },
  { show: 'tan', insert: 'tan(', name: 'tangente' },
]

const INSERT_AT_CURSOR = ['expr', 'exprset', 'pair', 'complex', 'surd', 'surdfrac', 'interval']

// Teclado de símbolos único, fijo al pie: el campo que tiene el foco le avisa qué teclas ofrecer y cómo insertarlas.
const KeyCtx = createContext(null)
const keyOf = (k) => (typeof k === 'string' ? { show: k, insert: k, name: k } : k)

// Muestra la respuesta como se escribe en papel, para que el alumno controle que sea la que quiso poner.
function Preview({ field, value }) {
  if (!String(value || '').trim()) return null
  const tex = toTex(value, { antiderivative: field.antiderivative })
  return (
    <span className="preview" aria-live="polite">
      {tex
        ? <><span>Se lee así:</span><Rich text={`$${tex}$`} /></>
        : <span>Todavía está incompleto: revisá qué falta escribir.</span>}
    </span>
  )
}

function Field({ field, value, onChange, disabled, mark, compact }) {
  const input = useRef(null)
  const kb = useContext(KeyCtx)
  // Inserta donde está el cursor (o reemplaza lo seleccionado).
  const insert = (text) => {
    const el = input.current, now = String(value || '')
    const from = el?.selectionStart ?? now.length, to = el?.selectionEnd ?? now.length
    onChange(now.slice(0, from) + text + now.slice(to))
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(from + text.length, from + text.length) })
  }

  const cls = mark === undefined ? '' : mark ? 'ok' : 'no'
  const label = field.label && <span><Rich text={field.label} /></span>
  const name = field.aria || field.label || 'Respuesta'
  let control
  if (field.kind === 'polar' || field.kind === 'sci') {
    const v = value || ['', '']
    const box = (i, aria, place = '') => (
      <input className={`${cls} short ${place}`} type="text" disabled={disabled} value={v[i] || ''} aria-label={`${name} ${aria}`} autoComplete="off"
        onChange={(e) => { const n = [...v]; n[i] = e.target.value; onChange(n) }} />
    )
    // Se ve como en la carpeta: r con el argumento de subíndice; en notación científica, el exponente arriba.
    control = field.kind === 'polar'
      ? <span className="inrow stacked">{box(0, 'número principal')}{box(1, 'subíndice', 'low')}<b className="low">°</b></span>
      : <span className="inrow stacked">{box(0, 'número')}<b>· 10</b>{box(1, 'exponente', 'high')}</span>
  } else if (field.kind === 'select') {
    control = (
      <select className={cls} value={value || ''} disabled={disabled} aria-label={name} onChange={(e) => onChange(e.target.value)}>
        <option value="">Elegí una opción…</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (field.kind === 'angle') {
    const v = value || ['', '', '']
    control = (
      <span className="inrow">
        {['°', '′', '″'].map((unit, i) => (
          <span key={unit} className="inrow">
            <input className={`${cls} short`} type="text" inputMode="numeric" disabled={disabled} value={v[i] || ''}
              aria-label={['Grados', 'Minutos', 'Segundos'][i]}
              onChange={(e) => { const n = [...v]; n[i] = e.target.value; onChange(n) }} />
            <b>{unit}</b>
          </span>
        ))}
      </span>
    )
  } else {
    // Teclas de ayuda para los símbolos difíciles de escribir en el celular.
    const keys = { factor: ['×', '^'], poly: [field.v || 'x', '^', '+', '−'], conj: ['(', ')', field.v, '^', '+', '−', '/'], pair: ['(', ';', ')', '−', '/'], complex: ['i', '+', '−', '/'],
      surd: ['√', '−'], surdfrac: ['(', ')', '√', '+', '/'], interval: ['(', '[', ';', ')', ']', '−∞', '+∞', '−', '/'], exprset: [...EXPR_KEYS, '∅'], set: ['−', '/', '∅'], numset: ['−', '/', ';', '∅'], expr: EXPR_KEYS, limit: ['+∞', '−∞', '−', '/', 'no existe'] }[field.kind] || []
    const usable = keys.filter(Boolean)
    const withKeys = !!kb && usable.length > 0 && !disabled
    if (withKeys) {
      // Siempre la versión más nueva: así la tecla actúa sobre lo que está escrito ahora.
      kb.fns.current[field.key] = (key) => {
        const whole = key.insert === '∅' || key.insert === 'no existe'
        if (whole) onChange(key.insert)
        else if (INSERT_AT_CURSOR.includes(field.kind)) insert(key.insert)
        else onChange(String(value || '').replace('∅', '').replace('no existe', '') + key.insert)
      }
    }
    control = (
      <span className="inrow">
        {field.prefix && <b>{field.prefix}</b>}
        <input ref={input} className={cls} type="text" value={value || ''} disabled={disabled} aria-label={name} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
          onFocus={withKeys ? (e) => {
            kb.open(field.key, usable.map(keyOf))
            const el = e.currentTarget
            // Deja el campo a la vista, sobre el teclado de símbolos.
            setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 320)
          } : undefined}
          onBlur={withKeys ? () => kb.close(field.key) : undefined} />
        {field.suffix && <b>{field.suffix}</b>}
      </span>
    )
  }
  if (field.kind === 'expr' || (field.kind === 'exprset' && value !== '∅')) control = <>{control}<Preview field={field} value={value} /></>
  if (compact) return control
  const Tag = ['factor', 'poly', 'set', 'conj', 'limit', 'polar', 'sci', ...INSERT_AT_CURSOR, 'numset'].includes(field.kind) ? 'div' : 'label'
  return <Tag className="field">{label}{control}</Tag>
}

// mode 'practica': cada ítem se comprueba por separado. mode 'examen': se corrige todo al final.
export default function Activity({ activity, course, term }) {
  // Los exámenes cambiaron de casilleros: se guardan aparte de las respuestas de la versión anterior.
  const storageKey = `intensificacion:${activity.mode === 'examen' ? 'v2' : 'v1'}:${activity.id}`
  const [state, setState] = useState(() => ({ values: {}, checked: {}, submitted: false, ...load(storageKey) }))
  const [open, setOpen] = useState({})
  const [ask, setAsk] = useState(null) // 'submit' | 'reset' | null
  const [printing, setPrinting] = useState(false)
  const canSave = useMemo(storageAvailable, [])
  const [kbOpen, setKbOpen] = useState(null) // { id, keys } del campo con el foco
  const kbFns = useRef({})
  const kbCtx = useMemo(() => ({
    fns: kbFns,
    open: (id, keys) => setKbOpen({ id, keys }),
    close: (id) => setKbOpen((c) => (c && c.id === id ? null : c)),
  }), [])
  const { values, checked, submitted } = state
  const exam = activity.mode === 'examen'

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)) } catch { /* sin almacenamiento */ }
  }, [storageKey, state])

  const items = activity.exercises.flatMap((e) => countedItems(e, values))
  const okCount = items.filter((i) => isItemOk(i, values)).length
  const checkedOk = items.filter((i) => checked[i.id] && isItemOk(i, values)).length
  const pending = activity.exercises.flatMap((e) => countedItems(e, values, 'filled'))
    .filter((i) => !fieldsOf(i).every((f) => isFilled(values[f.key]))).length

  const change = (item, key, v) => setState((s) => (s.submitted ? s : {
    ...s, values: { ...s.values, [key]: v }, checked: { ...s.checked, [item.id]: false },
  }))
  const submit = () => {
    setState((s) => ({ ...s, submitted: true }))
    setKbOpen(null)
    setAsk(null)
    window.scrollTo(0, 0)
  }
  const reset = () => {
    setState({ values: {}, checked: {}, submitted: false })
    setOpen({})
    setAsk(null)
    window.scrollTo(0, 0)
  }

  // El navegador usa el título de la página como nombre sugerido del PDF.
  const download = () => {
    const previous = document.title
    document.title = `${course} - ${term} - ${activity.title}`.replace(/[:«»]/g, '')
    setPrinting(true)
    window.addEventListener('afterprint', () => { document.title = previous; setPrinting(false) }, { once: true })
    // Un instante para que se vea el estado «Preparando…» antes de abrir el diálogo de impresión.
    setTimeout(() => window.print(), 120)
  }
  const pdfButton = (
    <button type="button" className={`btn ghost ${printing ? 'loading' : ''}`} onClick={download} disabled={printing} aria-busy={printing}>
      {printing ? 'Preparando…' : <><span aria-hidden="true">⬇</span> Descargar PDF</>}
    </button>
  )

  const renderItem = (item, exercise) => {
    const skipped = exam && submitted && isSkipped(exercise, item, values)
    const reveal = !skipped && (exam ? submitted : !!checked[item.id])
    const ok = reveal && isItemOk(item, values)
    const markOf = (f) => (reveal ? isFieldOk(f, values[f.key]) : undefined)
    const wrong = reveal ? fieldsOf(item).filter((f) => !isFieldOk(f, values[f.key])) : []
    return (
      <article key={item.id} id={`it-${item.id}`} className="card" aria-label={`Ítem ${item.id}`}>
        <header className="card-head">
          <span className="qnum">{item.id}</span>
          {skipped && <span className="pill">No elegido</span>}
          {reveal && <span className={`badge ${ok ? 'good' : 'bad'}`}><span aria-hidden="true">{ok ? '✓' : '!'}</span>{ok ? 'Correcto' : 'A revisar'}</span>}
        </header>
        {item.prompt && <p className="prompt"><Rich text={item.prompt} /></p>}

        {item.figure && <TriangleFigure figure={item.figure} choices={item.fields.map((f) => values[f.key])} />}

        {item.shape && <Trapezoid shape={item.shape} />}
        {item.graph && <FunctionGraph graph={item.graph} />}
        {item.sketch && <Sketches sketch={item.sketch} value={values[item.sketch.key]} disabled={submitted} mark={markOf(item.sketch)} onChange={(v) => change(item, item.sketch.key, v)} />}

        {item.plane && <Plane value={values[item.plane.key]} disabled={submitted} mark={markOf(item.plane)} onChange={(v) => change(item, item.plane.key, v)}
          names={item.plane.names} marks={reveal && item.plane.names ? linesOk(values[item.plane.key], item.plane) : undefined} />}

        {item.axis && <NumberLine field={item.axis} value={values[item.axis.key]} disabled={submitted} mark={markOf(item.axis)} onChange={(v) => change(item, item.axis.key, v)} />}

        {item.fields && (
          <div className="fields">
            {item.fields.map((f) => (
              <Field key={f.key} field={f} value={values[f.key]} disabled={submitted} mark={markOf(f)} onChange={(v) => change(item, f.key, v)} />
            ))}
          </div>
        )}

        {item.table && (
          <div className="tablewrap">
            <table className={`dtable ${row0(item) > 4 ? 'wide' : ''}`}>
              {item.table.head && <thead><tr>{item.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>}
              <tbody>
                {item.table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (typeof cell === 'object' ? (
                      <td key={c}><Field compact field={cell} value={values[cell.key]} disabled={submitted} mark={markOf(cell)} onChange={(v) => change(item, cell.key, v)} /></td>
                    ) : c === 0 ? <th key={c}>{cell}</th> : <td key={c}>{cell}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {item.chart && (item.chart.type === 'torta'
          ? <PieChart chart={item.chart} values={values} disabled={submitted} onChange={(k, v) => change(item, k, v)} />
          : <XYChart chart={item.chart} values={values} disabled={submitted} onChange={(k, v) => change(item, k, v)} />)}

        <div className="item-actions">
          {!exam && (
            <button type="button" className="btn small" disabled={!fieldsOf(item).some((f) => isFilled(values[f.key]))}
              onClick={() => setState((s) => ({ ...s, checked: { ...s.checked, [item.id]: true } }))}>Comprobar</button>
          )}
          {(!exam || submitted) && (
            <button type="button" className="link" aria-expanded={!!open[item.id]} onClick={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}>
              {open[item.id] ? 'Ocultar desarrollo' : 'Ver desarrollo paso a paso'}
            </button>
          )}
        </div>

        {wrong.length > 0 && (
          <p className="hint" role="status">
            {exam
              ? <>Respuesta correcta: {wrong.map((f) => `${f.aria || f.label || ''} ${show(f)}`.replace(/\$/g, '').trim()).join(' · ')}</>
              : 'Revisá los casilleros marcados en rojo y volvé a comprobar.'}
          </p>
        )}
        {open[item.id] && (!exam || submitted) && (
          <ol className="steps">{item.steps.map((s, i) => <li key={i}><Rich text={s} /></li>)}</ol>
        )}
      </article>
    )
  }

  const examDock = exam && !submitted

  return (
    <KeyCtx.Provider value={kbCtx}>
      <div className="pdfbar">
        {pdfButton}
        <p>Hoja para resolver en papel. En la ventana que se abre, elegí «Guardar como PDF».</p>
      </div>
      <Printable activity={activity} course={course} term={term} />

      {exam && submitted && (
        <section className="result" aria-labelledby="resultado">
          <div className="result-head">
            <Ring pct={Math.round((okCount / items.length) * 100)} size={112} stroke={10} animate tone={toneOf(Math.round((okCount / items.length) * 100))}>
              {Math.round((okCount / items.length) * 100)}%
            </Ring>
            <div>
              <h2 id="resultado">Resultado</h2>
              <p className="big">{okCount}<small> / {items.length} ítems correctos</small></p>
            </div>
          </div>
          <p className="pct">Un ítem cuenta como correcto cuando todos sus casilleros están bien.</p>
          {okCount === items.length
            ? <Notice tone="success">¡Excelente! Resolviste todos los ítems bien.</Notice>
            : <Notice tone="info">Abrí «Ver desarrollo paso a paso» en los ítems marcados para repasar cómo se resuelven.</Notice>}
          <ul className="breakdown">
            {activity.exercises.map((e) => (
              <li key={e.n} className="brow"><span>Ej. {e.n} · {e.title}</span><strong>{countedItems(e, values).filter((i) => isItemOk(i, values)).length}/{countedItems(e, values).length}</strong></li>
            ))}
          </ul>
        </section>
      )}
      {!canSave && <Notice tone="warn">Tu navegador no permite guardar el avance: si cerrás la página, vas a perder lo que resolviste.</Notice>}

      {!(exam && submitted) && (
        <div className="tally" role="group" aria-label="Avance">
          <div className="brow">
            <span>{exam ? 'Ítems completos' : 'Ítems correctos comprobados'}</span>
            <strong>{exam ? items.length - pending : checkedOk}/{items.length}</strong>
          </div>
          <div className="bar small" role="progressbar" aria-valuemin={0} aria-valuemax={items.length}
            aria-valuenow={exam ? items.length - pending : checkedOk} aria-label="Avance de la actividad">
            <div className="fill" style={{ width: `${((exam ? items.length - pending : checkedOk) / items.length) * 100}%` }} />
          </div>
        </div>
      )}

      {activity.exercises.map((e) => (
        <section key={e.n} className="section">
          <h2><span>Ejercicio {e.n}</span> {e.title}</h2>
          {e.statement && <div className="card statement"><p className="prompt"><Rich text={e.statement} /></p>{e.data && <p className="rawdata">{e.data}</p>}</div>}
          {e.items.map((item) => renderItem(item, e))}
        </section>
      ))}

      <div className="footer">
        {exam && !submitted && (
          <button type="button" className="btn" onClick={() => (pending ? setAsk('submit') : submit())}>Corregir examen</button>
        )}
        <button type="button" className="btn ghost" onClick={() => setAsk('reset')}>Empezar de nuevo</button>
        {pdfButton}
      </div>

      {ask && (
        <Dialog
          title={ask === 'submit' ? '¿Corregir igual?' : '¿Empezar de nuevo?'}
          confirmLabel={ask === 'submit' ? 'Corregir' : 'Sí, borrar'}
          onCancel={() => setAsk(null)}
          onConfirm={ask === 'submit' ? submit : reset}
        >
          {ask === 'submit'
            ? `Tenés ${pending} ${pending === 1 ? 'ítem incompleto' : 'ítems incompletos'}.`
            : 'Se borrarán las respuestas de esta actividad.'}
        </Dialog>
      )}

      <DockSpace tall />
      {kbOpen ? (
        <Dock label="Teclado de símbolos" lift className="keydock">
          <div className="keys big" role="group" aria-label="Símbolos">
            {kbOpen.keys.map((key) => (
              <button key={key.show} type="button" className="key" aria-label={`Agregar ${key.name}`} title={key.name}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => { e.preventDefault(); kbFns.current[kbOpen.id]?.(key) }}>{key.show}</button>
            ))}
          </div>
        </Dock>
      ) : examDock && (
        <Dock label="Avance y corrección">
          <div className="dock-bar">
            <div className="grow"><DockProgress count={items.length - pending} total={items.length} label="ítems completos" /></div>
            <button type="button" className="btn" onClick={() => (pending ? setAsk('submit') : submit())}>Corregir</button>
          </div>
        </Dock>
      )}
    </KeyCtx.Provider>
  )
}
