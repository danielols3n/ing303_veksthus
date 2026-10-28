export default function HarvestToday({ kg, ripeKg, stats }) {
  const share = Math.round((kg / ripeKg) * 100)

  return (
    <section className="harvest-today">
      <h2 className="card-title">Høstet i dag</h2>
      <div className="harvest-figure">
        <span className="harvest-kg">{kg}</span>
        <div className="harvest-unit">
          <strong>kg</strong>
          <span className="muted">av ca. {ripeKg} kg modne</span>
        </div>
      </div>
      <div className="meter" role="img" aria-label={`${share} % av modne tomater høstet`}>
        <div className="meter-fill" style={{ width: `${share}%` }} />
      </div>
      <div className="stat-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
