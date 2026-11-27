// Versión «examen»: la usan los Exámenes 1 y 2 y todas las hojas en PDF.
// Saca las ayudas (cómo se resuelve, pasos intermedios, componentes) y deja solo lo que se pregunta.
// La «Práctica» en pantalla no pasa por acá: conserva la guía completa.
import { exam6 } from './exam6'

// Casilleros nuevos con claves propias, para no pisar los de la versión guiada.
export const withFields = (item, fields, extra = {}) => ({ ...item, ...extra, fields: fields.map((f, i) => ({ ...f, key: `${item.id}-x${i}` })) })

const has = (item, test) => (item.fields || []).some(test)
const byLabel = (item, start) => item.fields.find((f) => (f.label || '').startsWith(start))
const listText = (list) => `${list.slice(0, -1).join(', ')} y ${list[list.length - 1]}`

function cleanItem(item) {
  if (!item.fields) return item

  // M.C.M. y D.C.M.: la factorización se hace en la hoja.
  if (has(item, (f) => f.kind === 'factor')) {
    const numbers = item.fields.filter((f) => f.kind === 'factor').map((f) => f.answer)
    return withFields(item, item.fields.filter((f) => f.kind !== 'factor'), { prompt: `Calculá el M.C.M. y el D.C.M. de ${listText(numbers)}.` })
  }
  // Inecuaciones: solo el conjunto solución, escrito por el alumno.
  if (byLabel(item, 'Signo de la solución')) {
    return withFields(item, [{ kind: 'interval', answer: byLabel(item, 'Conjunto solución').answer, label: 'Conjunto solución:', aria: 'Conjunto solución:' }])
  }
  // Radicales: el resultado completo, sin decir qué forma tiene.
  if (byLabel(item, 'a (número que multiplica')) {
    return withFields(item, [{ kind: 'surd', answer: item.fields.map((f) => Number(f.answer)), label: 'Resultado', aria: 'Resultado:' }],
      { prompt: item.prompt.replace(/\. El resultado tiene la forma .*$/, '') })
  }
  if (item.prompt.includes('La solución tiene la forma')) {
    return withFields(item, [{ kind: 'surdfrac', answer: item.fields.map((f) => Number(f.answer)), label: 'x =', aria: 'x =' }],
      { prompt: item.prompt.replace(/\. La solución tiene la forma .*$/, '') })
  }
  // Rectas: la ecuación (la pendiente y la ordenada son pasos para llegar).
  const equation = byLabel(item, 'Ecuación: y =')
  if (equation) return withFields(item, [{ ...equation, label: 'y =', aria: 'Ecuación: y =' }])
  // Notación científica: un solo resultado.
  if (byLabel(item, 'Número que multiplica a la potencia')) {
    return withFields(item, [{ kind: 'sci', answer: item.fields.map((f) => f.answer), label: 'Notación científica:', aria: 'Notación científica:' }])
  }
  // Combinatoria: no se pregunta qué fórmula usar.
  if (byLabel(item, '¿Qué se usa?')) return withFields(item, item.fields.filter((f) => f.label !== '¿Qué se usa?'))
  if (item.prompt.startsWith('Aplicá la regla de Sturges')) {
    return { ...item, prompt: 'Con la regla de Sturges, calculá la cantidad de intervalos. Calculá también el rango y la amplitud.' }
  }
  // Comparación de variabilidad: coeficientes de variación y conclusión.
  if (has(item, (f) => (f.label || '').endsWith('desvío estándar'))) {
    return withFields(item, item.fields.filter((f) => !/: (media|desvío estándar)$/.test(f.label || '')))
  }
  // Construcciones: en el papel se traza; las opciones quedan solo en pantalla.
  if (item.prompt.endsWith(' Elegí las opciones y mirá cómo queda la construcción.')) {
    return { ...item, paper: item.prompt.replace(' Elegí las opciones y mirá cómo queda la construcción.', ''), paperBlank: true }
  }
  return item
}

const cleanExercise = (e) => ({
  ...e,
  statement: e.title === 'Combinatoria y probabilidad' ? 'Resolvé cada situación.' : e.statement,
  items: e.items.map(cleanItem),
})

export const toExam = (exercises, prefix) => (prefix.startsWith('6A') ? exam6(exercises) : exercises.map(cleanExercise))
