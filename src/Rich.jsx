import katex from 'katex'

// Renderiza texto con fórmulas entre signos $...$ usando KaTeX.
export default function Rich({ text }) {
  const parts = String(text).split(/((?<!\\)\$[^$]+?(?<!\\)\$)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('$') && p.endsWith('$') && p.length > 2) {
          const html = katex.renderToString(p.slice(1, -1), { throwOnError: false })
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
        }
        return <span key={i}>{p.replace(/\\\$/g, '$')}</span>
      })}
    </>
  )
}
