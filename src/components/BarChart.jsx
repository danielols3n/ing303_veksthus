// Enkelt søylediagram med verdi over og etikett under hver søyle.
// items: [{ key, label, value, display, estimate }]
export default function BarChart({ items, max, plotHeight, gap }) {
  const style = { '--bar-count': items.length, '--bar-gap': gap }

  return (
    <>
      <div className="bars bars-plot" style={style}>
        {items.map((item) => (
          <div key={item.key} className="bar-col">
            <span className={`bar-value${item.estimate ? ' muted' : ''}`}>{item.display}</span>
            <div
              className={`bar${item.estimate ? ' is-estimate' : ''}`}
              style={{ height: Math.max(2, Math.round((item.value / max) * plotHeight)) }}
            />
          </div>
        ))}
      </div>
      <div className="bars bars-axis" style={style}>
        {items.map((item) => (
          <span key={item.key} className="bar-axis">{item.label}</span>
        ))}
      </div>
    </>
  )
}
