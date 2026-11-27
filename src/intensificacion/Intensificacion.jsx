import { COURSES } from './data/courses'
import Activity from './engine/Activity'
import Empty from '../shared/Empty'
import { Compass, Arrow } from '../shared/Icons'
import Ring, { toneOf } from '../shared/Ring'
import { activityProgress, courseProgress } from '../shared/progress'

const BASE = '#/intensificacion'

// Estado de una actividad: sin empezar, en curso («12 de 21») o terminada (corregida con X %).
function Status({ p }) {
  if (p.status === 'none') return <p className="status"><span className="status-chip">Sin empezar</span></p>
  const text = p.status === 'done' ? (p.exam ? `${p.pct}%` : `${p.done} de ${p.total}`) : `${p.done} de ${p.total}`
  const chip = p.status === 'done' ? (p.exam ? 'Corregida' : 'Completa') : 'En curso'
  return (
    <p className={`status ${p.status}`}>
      <span className="status-chip">{chip}</span>
      <span>{text}</span>
      <span className="bar small" role="progressbar" aria-label="Avance de la actividad" aria-valuemin={0} aria-valuemax={p.total} aria-valuenow={p.done}>
        <span className={`fill ${p.status === 'done' && p.exam ? toneOf(p.pct) : ''}`} style={{ width: `${p.total ? (p.done / p.total) * 100 : 0}%` }} />
      </span>
    </p>
  )
}

function Crumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Ruta de navegación">
      {trail.map(([label, href], i) => (
        <span key={label}>{href ? <a href={href}>{label}</a> : <b aria-current="page">{label}</b>}</span>
      ))}
    </nav>
  )
}

const Header = ({ title, sub, eyebrow }) => (
  <header className="hero">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
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

  // Error: la dirección no existe (enlace viejo o mal escrito).
  if (courseId && !(activity || section)) {
    return (
      <Empty icon={<Compass />} title="No encontramos esa página"
        action={<a className="btn" href={BASE}>Ver todos los cursos</a>}>
        El enlace puede estar incompleto o el material todavía no está cargado.
      </Empty>
    )
  }

  if (activity) {
    const back = `${BASE}/${course.id}/${sectionId}`
    return (
      <>
        <Crumbs trail={[['Cursos', BASE], [`${course.title} ${sectionId}`, back], [`${term.title}: ${activity.title}`]]} />
        <Header title={activity.title}
          eyebrow={`${course.title} «${sectionId}» · ${term.title}`}
          sub={activity.mode === 'examen' ? 'Resolvé todo y corregí al final.' : 'Comprobá cada ítem a medida que avanzás.'} />
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
          <section key={t.id} className="section" aria-labelledby={`term-${t.id}`}>
            <h2 id={`term-${t.id}`}>{t.title}<em>{t.topics}</em></h2>
            <div className="tiles tight">
              {t.activities.map((a) => {
                const prog = activityProgress(a)
                return (
                  <a key={a.slug} className="tile" href={`${BASE}/${course.id}/${sectionId}/${t.id}/${a.slug}`}>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    <Status p={prog} />
                    <span className="cta">{prog.status === 'none' ? 'Empezar' : prog.status === 'done' ? 'Repasar' : 'Continuar'}<Arrow /></span>
                  </a>
                )
              })}
            </div>
          </section>
        ))}
      </>
    )
  }

  return (
    <>
      <Header eyebrow="Intensificación" title="Intensificación en Matemática"
        sub="Recuperá los contenidos adeudados y acreditá los cuatrimestres pendientes." />
      <div className="courses">
        {COURSES.map((c) => {
          const names = Object.keys(c.sections)
          const cp = names.length ? courseProgress(c) : null
          return (
            <article key={c.id} className={`course ${names.length ? '' : 'soon'}`} aria-label={c.title}>
              <h2>{c.title}</h2>
              {cp && (
                <div className="course-progress">
                  <Ring pct={cp.pct} size={56} stroke={6} label={`Avance del curso: ${cp.pct}%`}>{cp.pct}%</Ring>
                  <span>{cp.started ? `${cp.started} ${cp.started === 1 ? 'empezada' : 'empezadas'}` : 'Sin empezar'}</span>
                </div>
              )}
              {names.length ? (
                <div className="stack">
                  {names.map((s) => (
                    <a key={s} className="btn small" href={`${BASE}/${c.id}/${s}`} aria-label={`${c.title}, sección ${s}`}>Sección {s}</a>
                  ))}
                </div>
              ) : <span className="pill">Próximamente</span>}
            </article>
          )
        })}
      </div>
    </>
  )
}
