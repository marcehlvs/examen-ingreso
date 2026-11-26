import { useEffect, useState } from 'react'

const KEY = 'tema-matematica'
const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }

// Claro / oscuro. Si la persona no eligió, se respeta el tema del sistema.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(read) // 'light' | 'dark' | null
  const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const isDark = theme ? theme === 'dark' : systemDark()

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme)
    else document.documentElement.removeAttribute('data-theme')
  }, [theme])

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(KEY, next) } catch { /* sin almacenamiento */ }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-pressed={isDark}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
      <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
      <span className="sr-only">{isDark ? 'Tema claro' : 'Tema oscuro'}</span>
    </button>
  )
}
