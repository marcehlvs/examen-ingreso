// Estadísticas del alumno: se guardan en el navegador (localStorage).
const KEY = 'examen-ingreso-stats-v1'
const empty = () => ({ log: [], sessions: [] })
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || empty() } catch { return empty() } }
const save = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)) } catch { /* sin almacenamiento */ } }

// items: [{ sec, ok, src }]  src = 'examen' | 'simulacro' | 'practica'
export function recordAnswers(items) {
  const d = load(), t = Date.now()
  d.log.push(...items.map((i) => ({ t, ...i })))
  d.log = d.log.slice(-3000)
  save(d)
}
export function recordSession(s) {
  const d = load()
  d.sessions.push(s)
  d.sessions = d.sessions.slice(-50)
  save(d)
}
export function getStats() {
  const d = load(), per = {}
  for (let s = 1; s <= 7; s++) per[s] = { n: 0, ok: 0 }
  d.log.forEach((r) => { if (per[r.sec]) { per[r.sec].n++; if (r.ok) per[r.sec].ok++ } })
  return { per, sessions: d.sessions, total: d.log.length, ok: d.log.filter((r) => r.ok).length }
}
// Ejercicios con al menos 3 respuestas y menos de 75% de aciertos, del más flojo al menos flojo (máx. 3)
export function weakSections() {
  const { per } = getStats()
  return Object.entries(per)
    .filter(([, v]) => v.n >= 3 && v.ok / v.n < 0.75)
    .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)
    .slice(0, 3)
    .map(([k]) => Number(k))
}
export const clearStats = () => { try { localStorage.removeItem(KEY) } catch { /* nada */ } }
