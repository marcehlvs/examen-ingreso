// Hoja para imprimir o guardar como PDF: consignas y espacio para resolver, sin respuestas.
// Se dibuja fuera de la app y solo se ve al imprimir (ver «@media print» en index.css).
import { createPortal } from 'react-dom'
import Rich from '../../shared/Rich'
import { XYChart } from './Charts'
import { fieldsOf } from './check'

const Line = ({ label, unit }) => (
  <p className="p-line"><span><Rich text={label} /></span><i />{unit && <b>{unit}</b>}</p>
)

// En papel no se toca ni se usan botones: se reemplazan esas indicaciones.
const paperText = (text) => text
  .replace(' Podés tocar el gráfico o usar los botones − y +.', '')
  .replace('escribí cuántos grados le corresponden a cada sector.', 'indicá cuántos grados le corresponden a cada sector y dibujalo.')

function PrintChart({ chart }) {
  if (chart.type !== 'torta') return <div className="p-chart"><XYChart chart={chart} values={{}} disabled onChange={() => {}} /></div>
  return (
    <div className="p-pie">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#000" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="2" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="#000" />
      </svg>
      <div>{chart.points.map((p) => <Line key={p.key} label={`${p.label}:`} unit="°" />)}</div>
    </div>
  )
}

function PrintItem({ item }) {
  const fields = item.table || item.chart ? [] : fieldsOf(item)
  const isCalc = fields.length === 1 && fields[0].label === 'Resultado'
  const isAngle = fields[0]?.kind === 'angle'
  const isFactor = fields.some((f) => f.kind === 'factor')
  return (
    <div className="p-item">
      {item.prompt && <p><b>{item.id})</b> <Rich text={paperText(item.prompt)} /></p>}

      {item.table && (
        <table className="p-table">
          {item.table.head && <thead><tr>{item.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>}
          <tbody>
            {item.table.rows.map((row, r) => (
              <tr key={r}>{row.map((c, i) => <td key={i}>{typeof c === 'object' ? '' : c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
      {item.chart && <PrintChart chart={item.chart} />}

      {(isCalc || isAngle) && <div className="p-space" />}
      {isCalc && <Line label="Resultado:" />}
      {isAngle && <p className="p-line"><span>Resultado:</span><i /><b>°</b><i /><b>′</b><i /><b>″</b></p>}
      {isFactor && <><div className="p-space" />{fields.map((f) => <Line key={f.key} label={f.aria} />)}</>}
      {!isCalc && !isAngle && !isFactor && fields.map((f) => (
        <Line key={f.key} label={`${f.label.replace(/[?¿]$/, '')}${f.label.endsWith('?') ? '?' : ':'}`} unit={null} />
      ))}
    </div>
  )
}

export default function Printable({ activity, course, term }) {
  return createPortal(
    <div className="printable">
      <h1>Intensificación en Matemática</h1>
      <p className="p-credit">Prof. Juan Marcelo Bejarano</p>
      <h2>{course} · {term} · {activity.title}</h2>
      <div className="p-student"><Line label="Nombre y apellido:" /><Line label="Fecha:" /></div>
      {activity.exercises.map((e) => (
        <section key={e.n}>
          {/* La consigna del ejercicio se mantiene junto a su primer ítem */}
          {e.items.map((item, i) => (
            <div key={item.id} className="p-block">
              {i === 0 && (
                <>
                  <h3>Ejercicio {e.n}. {e.title}</h3>
                  {e.statement && <p><Rich text={e.statement.replace(/ (Podés escribir|Completá grados)[^]*$/, '')} /></p>}
                  {e.data && <p className="p-data">{e.data}</p>}
                </>
              )}
              <PrintItem item={item} />
            </div>
          ))}
        </section>
      ))}
    </div>,
    document.body,
  )
}
