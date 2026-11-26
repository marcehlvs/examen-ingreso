import { useEffect, useState } from 'react'
import { SECTIONS } from './sections'
import Home from './Home'

// Navegación por «#/ruta»: funciona en GitHub Pages sin configuración extra.
const readPath = () => window.location.hash.replace(/^#\/?/, '')

export default function App() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => { setPath(readPath()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const section = SECTIONS.find((s) => s.path === path)
  useEffect(() => {
    document.title = `${section ? section.label : 'Inicio'} – Matemática`
  }, [section])

  return (
    <div className="app">
      <nav className="nav" aria-label="Secciones">
        <a href="#/" className={!section ? 'on' : ''}>Inicio</a>
        {SECTIONS.map((s) => (
          <a key={s.path} href={`#/${s.path}`} className={section === s ? 'on' : ''}>{s.label}</a>
        ))}
      </nav>

      {section ? <section.Component /> : <Home />}

      <p className="credit">
        Creado por el Prof. Juan Marcelo Bejarano
        <span className="credit-note">Material de práctica no oficial</span>
      </p>
    </div>
  )
}
