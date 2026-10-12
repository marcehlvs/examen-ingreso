// Figura del ejercicio 6C: paralelas a y b cortadas por una transversal.
// Ángulos 1-4 en la intersección superior y 5-8 en la inferior.
export default function Figura() {
  const P = { x: 110, y: 45 }
  const Q = { x: 78, y: 100 }
  const dx = P.x - Q.x
  const dy = Q.y - P.y // en SVG el eje y crece hacia abajo
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI
  const mids = [ang / 2, (ang + 180) / 2, 180 + ang / 2, (ang + 180 + 360) / 2]
  const label = (pt, base) =>
    mids.map((m, j) => {
      const r = 21
      const x = pt.x + r * Math.cos((m * Math.PI) / 180)
      const y = pt.y - r * Math.sin((m * Math.PI) / 180)
      return (
        <text key={base + j} x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#b03030">
          {base + j}
        </text>
      )
    })
  return (
    <svg viewBox="0 0 230 140" className="figura" role="img" aria-label="Dos paralelas cortadas por una transversal, con ángulos numerados del 1 al 8">
      <line x1="10" y1="45" x2="200" y2="45" stroke="#111" strokeWidth="1.6" />
      <line x1="10" y1="100" x2="200" y2="100" stroke="#111" strokeWidth="1.6" />
      <text x="208" y="49" fontSize="13" fontWeight="700">a</text>
      <text x="208" y="104" fontSize="13" fontWeight="700">b</text>
      <line
        x1={Q.x - dx * 0.35} y1={Q.y + dy * 0.35}
        x2={P.x + dx * 0.35} y2={P.y - dy * 0.35}
        stroke="#1F3A5F" strokeWidth="1.6"
      />
      {label(P, 1)}
      {label(Q, 5)}
    </svg>
  )
}
