import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from './sections'
import Home from './Home'
import ThemeToggle from './shared/ThemeToggle'

// Navegación por «#/ruta»: funciona en GitHub Pages sin configuración extra.
const readPath = () => window.location.hash.replace(/^#\/?/, '')

export default function App() {
  const [path, setPath] = useState(readPath)
  const main = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    const onChange = () => { setPath(readPath()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const [root, ...rest] = path.split('/')
  const section = SECTIONS.find((s) => s.path === root)
  useEffect(() => {
    document.title = `${section ? section.label : 'Inicio'} – Matemática`
    // Al cambiar de pantalla el foco pasa al contenido (lectores de pantalla y teclado).
    if (first.current) first.current = false
    else main.current?.focus({ preventScroll: true })
  }, [path, section])

  return (
    <div className="app">
      <a className="skip" href="#contenido" onClick={(e) => { e.preventDefault(); main.current?.focus() }}>Saltar al contenido</a>
      <div className="nav-wrap">
        <nav className="nav" aria-label="Secciones">
          <a className="brand" href="#/" aria-label="Inicio" aria-current={!section ? 'page' : undefined}>
            <span className="brand-mark" aria-hidden="true">x²</span>
            <span className="brand-name">Matemática</span>
          </a>
          {SECTIONS.map((s) => (
            <a key={s.path} href={`#/${s.path}`} aria-current={section === s ? 'page' : undefined} aria-label={s.label}>
              <span className="nav-full">{s.label}</span><span className="nav-short" aria-hidden="true">{s.short || s.label}</span>
            </a>
          ))}
          <span className="spacer" />
          <ThemeToggle />
        </nav>
      </div>

      <main id="contenido" ref={main} tabIndex={-1}>
        {section ? <section.Component rest={rest} /> : <Home />}
      </main>

      <footer className="credit">
        Creado por el Prof. Juan Marcelo Bejarano
        <span className="credit-note">Material de práctica no oficial</span>
      </footer>
    </div>
  )
}
