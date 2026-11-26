// Secciones de la página. Para quitar el examen de ingreso:
// 1) borrá su bloque de esta lista y el `import` de arriba, y 2) borrá la carpeta src/ingreso/.
import Ingreso from './ingreso/Ingreso'
import Intensificacion from './intensificacion/Intensificacion'

export const SECTIONS = [
  {
    path: 'intensificacion',
    label: 'Intensificación',
    description: 'Recuperá los contenidos de Matemática adeudados y acreditá los cuatrimestres pendientes.',
    Component: Intensificacion,
  },
  {
    path: 'ingreso',
    label: 'Examen de ingreso',
    description: 'Exámenes modelo de ingreso a 2° año 2027.',
    Component: Ingreso,
  },
]
