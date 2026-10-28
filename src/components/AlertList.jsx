import Card from './Card.jsx'
import Icon from './Icon.jsx'

export const alertIcons = {
  deviation: { name: 'alertCircle', color: 'var(--deviation)', label: 'Avvik' },
  priority: { name: 'arrowUp', color: 'var(--ripe)', label: 'Prioritet' },
  info: { name: 'bolt', color: 'var(--muted)', label: 'Info' },
}

export default function AlertList({ alerts }) {
  return (
    <Card title="Varsler" className="card-alerts">
      <ul className="plain-list alerts">
        {alerts.map((alert) => (
          <li key={alert.title} className="alert">
            <Icon {...alertIcons[alert.type]} />
            <div className="list-text">
              <strong>{alert.title}</strong>
              <span>{alert.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
