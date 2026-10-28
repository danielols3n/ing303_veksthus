import PageHeading from '../components/PageHeading.jsx'
import { robots } from '../data/demo.js'

const LOW_BATTERY = 30

const stateLabels = {
  picking: 'I drift',
  charging: 'Lader',
}

export default function Robots() {
  const picking = robots.filter((r) => r.state === 'picking').length

  return (
    <>
      <PageHeading title="Robotar">
        {picking} av {robots.length} robotar plukker nå.
      </PageHeading>

      <div className="robot-grid">
        {robots.map((robot) => {
          const low = robot.battery < LOW_BATTERY
          return (
            <section key={robot.id} className="card robot-card">
              <div className="robot-card-header">
                <span className="robot-id robot-id-large">{robot.id}</span>
                <div className="list-text">
                  <h2 className="robot-card-title">{robot.status}</h2>
                  <span>{robot.detail}</span>
                </div>
                <span className={`state-tag state-${robot.state}`}>{stateLabels[robot.state]}</span>
              </div>

              <div className="robot-battery">
                <div className="card-header">
                  <span className="card-title">Batteri</span>
                  <span className={`battery-value${low ? ' is-low' : ''}`}>{robot.battery} %</span>
                </div>
                <div className="meter" role="img" aria-label={`Batteri ${robot.battery} %`}>
                  <div
                    className={`meter-fill${low ? ' is-low' : ''}`}
                    style={{ width: `${robot.battery}%` }}
                  />
                </div>
              </div>

              <div className="stat-grid stat-grid-2">
                {robot.stats.map((stat) => (
                  <div key={stat.label} className="stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="card-title">Siste hendelser</h3>
                <ol className="plain-list event-log">
                  {robot.log.map((entry) => (
                    <li key={entry.time + entry.text}>
                      <span className="event-time">{entry.time}</span>
                      <span>{entry.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
