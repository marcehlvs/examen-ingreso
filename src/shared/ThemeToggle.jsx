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
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {isDark
          ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
          : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
      </svg>
      <span className="sr-only">{isDark ? 'Tema claro' : 'Tema oscuro'}</span>
    </button>
  )
}
