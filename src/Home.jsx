import { SECTIONS } from './sections'

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const ICONS = {
  // Ejes con una curva que sube: recuperar y avanzar
  intensificacion: (
    <svg {...svg}><path d="M4 4v16h16" /><path d="M8 15l4-4 3 3 5-6" /></svg>
  ),
  // Hoja de examen con tilde
  ingreso: (
    <svg {...svg}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M9 14l2 2 4-4" /></svg>
  ),
}
const FALLBACK = <svg {...svg}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>

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
            <span className="ico" aria-hidden="true">{ICONS[s.path] || FALLBACK}</span>
            <h2>{s.label}</h2>
            <p>{s.description}</p>
            <span className="cta">
              Entrar
              <svg {...svg} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
