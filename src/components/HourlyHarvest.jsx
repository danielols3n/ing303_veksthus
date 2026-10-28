import BarChart from './BarChart.jsx'
import Card from './Card.jsx'

export default function HourlyHarvest({ hours }) {
  const items = hours.map((h) => ({
    key: h.hour,
    label: h.hour,
    value: h.kg,
    // Estimerte timer vises med ~, og tomme timer uten tall
    display: h.estimate ? (h.kg ? `~${h.kg}` : '') : String(h.kg),
    estimate: h.estimate,
  }))

  return (
    <Card title="Høstet per time" meta={<span className="card-meta">kg · alle robotar</span>}>
      <BarChart items={items} max={50} plotHeight={120} gap="10px" />
    </Card>
  )
}
