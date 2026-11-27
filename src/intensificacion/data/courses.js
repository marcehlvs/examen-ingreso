// Cursos y secciones. Para sumar material: crear el archivo (por ejemplo 2B.js, con la forma de 1A.js)
// y agregarlo en «sections» del curso. Los cursos sin secciones se muestran como «Próximamente».
// En los id de cada actividad, cambiar el prefijo «1A» por el de la sección nueva.
import { SECTION_1A } from './1A'
import { SECTION_2A } from './2A'
import { SECTION_3A } from './3A'

export const COURSES = [
  { id: '1', title: '1.er año', sections: { A: SECTION_1A } },
  { id: '2', title: '2.º año', sections: { A: SECTION_2A } },
  { id: '3', title: '3.er año', sections: { A: SECTION_3A } },
  { id: '4', title: '4.º año', sections: {} },
  { id: '5', title: '5.º año', sections: {} },
  { id: '6', title: '6.º año', sections: {} },
]
