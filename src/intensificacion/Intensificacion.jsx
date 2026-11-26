import { YEARS } from './data'

export default function Intensificacion() {
  return (
    <>
      <header className="hero">
        <h1>Intensificación en Matemática</h1>
        <p className="sub">
          Una instancia para recuperar los contenidos adeudados durante el año y acreditar los cuatrimestres pendientes.
        </p>
      </header>

      {YEARS.length === 0 ? (
        <div className="card"><p className="prompt">Los contenidos de cada año se van a publicar próximamente.</p></div>
      ) : (
        <div className="tiles">
          {YEARS.map((y) => (
            <article key={y.id} className="tile">
              <h2>{y.title}</h2>
              <p>{y.topics.join(' · ')}</p>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
