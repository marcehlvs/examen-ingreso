import { COURSES } from './data/courses'
import Activity from './engine/Activity'

const BASE = '#/intensificacion'

function Crumbs({ trail }) {
  return (
    <p className="crumbs">
      {trail.map(([label, href], i) => (
        <span key={label}>{i > 0 && ' › '}{href ? <a href={href}>{label}</a> : <b>{label}</b>}</span>
      ))}
    </p>
  )
}

const Header = ({ title, sub }) => (
  <header className="hero">
    <h1>{title}</h1>
    {sub && <p className="sub">{sub}</p>}
  </header>
)

// Rutas: intensificacion / curso / sección / cuatrimestre / actividad
export default function Intensificacion({ rest = [] }) {
  const [courseId, sectionId, termId, slug] = rest
  const course = COURSES.find((c) => c.id === courseId)
  const section = course?.sections[sectionId]
  const term = section?.terms.find((t) => t.id === termId)
  const activity = term?.activities.find((a) => a.slug === slug)

  if (activity) {
    const back = `${BASE}/${course.id}/${sectionId}`
    return (
      <>
        <Crumbs trail={[['Cursos', BASE], [`${course.title} ${sectionId}`, back], [`${term.title}: ${activity.title}`]]} />
        <Header title={activity.title} sub={`${course.title} «${sectionId}» · ${term.title} · ${activity.mode === 'examen' ? 'se corrige al final' : 'corrige ítem por ítem'}`} />
        <Activity key={activity.id} activity={activity} course={`${course.title} «${sectionId}»`} term={term.title} />
        <p className="backlink"><a href={back}>← Volver a {course.title} «{sectionId}»</a></p>
      </>
    )
  }

  if (section) {
    return (
      <>
        <Crumbs trail={[['Cursos', BASE], [`${course.title} ${sectionId}`]]} />
        <Header title={`${course.title} «${sectionId}»`} sub="Elegí el cuatrimestre que necesitás recuperar." />
        {section.terms.map((t) => (
          <section key={t.id} className="section">
            <h2>{t.title}<em>{t.topics}</em></h2>
            <div className="tiles tight">
              {t.activities.map((a) => (
                <a key={a.slug} className="tile" href={`${BASE}/${course.id}/${sectionId}/${t.id}/${a.slug}`}>
                  <h2>{a.title} →</h2>
                  <p>{a.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </>
    )
  }

  return (
    <>
      <Header title="Intensificación en Matemática"
        sub="Una instancia para recuperar los contenidos adeudados durante el año y acreditar los cuatrimestres pendientes." />
      <div className="courses">
        {COURSES.map((c) => {
          const names = Object.keys(c.sections)
          return (
            <article key={c.id} className={`course ${names.length ? '' : 'soon'}`}>
              <h2>{c.title}</h2>
              {names.length
                ? names.map((s) => <a key={s} className="btn small" href={`${BASE}/${c.id}/${s}`}>Sección {s}</a>)
                : <p>Próximamente</p>}
            </article>
          )
        })}
      </div>
    </>
  )
}
