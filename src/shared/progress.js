// Avance guardado de cada actividad de Intensificación (lo escribe Activity.jsx en localStorage).
import { countedItems, fieldsOf, isFilled, isItemOk } from '../intensificacion/engine/check'

export const activityKey = (a) => `intensificacion:${a.mode === 'examen' ? 'v2' : 'v1'}:${a.id}`

// status: 'none' | 'progress' | 'done'
// done: ítems completados (en práctica, los comprobados bien; en examen, los completos o, ya corregido, todos)
// score: solo exámenes corregidos, ítems bien
export function activityProgress(activity) {
  let state = null
  try { state = JSON.parse(localStorage.getItem(activityKey(activity))) } catch { /* sin almacenamiento */ }
  const values = state?.values || {}, checked = state?.checked || {}, submitted = !!state?.submitted
  const exam = activity.mode === 'examen'
  const items = activity.exercises.flatMap((e) => countedItems(e, values))
  const total = items.length
  if (!total) return { status: 'none', done: 0, total: 0, pct: 0, exam }

  if (exam && submitted) {
    const score = items.filter((i) => isItemOk(i, values)).length
    return { status: 'done', done: total, total, score, pct: Math.round((score / total) * 100), exam }
  }
  const touched = Object.values(values).some(isFilled) || Object.values(checked).some(Boolean)
  if (!touched) return { status: 'none', done: 0, total, pct: 0, exam }

  const done = exam
    ? activity.exercises.flatMap((e) => countedItems(e, values, 'filled')).filter((i) => fieldsOf(i).every((f) => isFilled(values[f.key]))).length
    : items.filter((i) => checked[i.id] && isItemOk(i, values)).length
  return { status: !exam && done === total ? 'done' : 'progress', done, total, pct: Math.round((done / total) * 100), exam }
}

// Suma de todas las actividades de un curso (todas sus secciones y cuatrimestres).
export function courseProgress(course) {
  let done = 0, total = 0, started = 0
  Object.values(course.sections).forEach((sec) => sec.terms.forEach((t) => t.activities.forEach((a) => {
    const p = activityProgress(a)
    done += p.done; total += p.total
    if (p.status !== 'none') started++
  })))
  return { done, total, started, pct: total ? Math.round((done / total) * 100) : 0 }
}
