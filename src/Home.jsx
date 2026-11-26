import { SECTIONS } from './sections'

export default function Home() {
  return (
    <>
      <header className="hero">
        <h1>Matemática</h1>
        <p className="sub">Elegí qué querés hacer</p>
      </header>
      <div className="tiles">
        {SECTIONS.map((s) => (
          <a key={s.path} className="tile" href={`#/${s.path}`}>
            <h2>{s.label} →</h2>
            <p>{s.description}</p>
          </a>
        ))}
      </div>
    </>
  )
}
