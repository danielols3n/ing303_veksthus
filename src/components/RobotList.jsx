import Card from './Card.jsx'

const LOW_BATTERY = 30

export default function RobotList({ robots }) {
  return (
    <Card title="Robotar" className="card-tight">
      <ul className="plain-list">
        {robots.map((robot) => {
          const low = robot.battery < LOW_BATTERY
          return (
            <li key={robot.id} className="robot">
              <span className="robot-id">{robot.id}</span>
              <div className="list-text">
                <strong>{robot.status}</strong>
                <span>{robot.detail}</span>
              </div>
              <div className="battery">
                <span className={`battery-value${low ? ' is-low' : ''}`}>{robot.battery} %</span>
                <div className="meter">
                  <div
                    className={`meter-fill${low ? ' is-low' : ''}`}
                    style={{ width: `${robot.battery}%` }}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
