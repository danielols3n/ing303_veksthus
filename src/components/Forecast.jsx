import BarChart from './BarChart.jsx'
import Card from './Card.jsx'

export default function Forecast({ days }) {
  const max = Math.max(...days.map((d) => d.kg))
  const items = days.map((d) => ({ key: d.day, label: d.day, value: d.kg, display: d.kg }))

  return (
    <Card
      title="Prognose neste 7 dager"
      className="forecast"
      meta={<span className="card-meta">kg</span>}
    >
      <BarChart items={items} max={max} plotHeight={64} gap="8px" />
      <p className="card-note">Basert på modningsbildene fra dagens runde.</p>
    </Card>
  )
}
