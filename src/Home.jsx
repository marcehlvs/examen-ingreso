import { SECTIONS } from './sections'

const ICONS = { intensificacion: '📚', ingreso: '📝' }

export default function Home() {
  return (
    <>
      <header className="hero big">
        <p className="eyebrow">Prof. Juan Marcelo Bejarano</p>
        <h1>Matemática</h1>
        <p className="sub">Elegí qué querés practicar hoy.</p>
      </header>
      <div className="tiles">
        {SECTIONS.map((s) => (
          <a key={s.path} className="tile" href={`#/${s.path}`}>
            <span className="ico" aria-hidden="true">{ICONS[s.path] || '📄'}</span>
            <h2>{s.label}</h2>
            <p>{s.description}</p>
            <span className="cta">Entrar →</span>
          </a>
        ))}
      </div>
    </>
  )
}
