import BarChart from '../components/BarChart.jsx'
import Card from '../components/Card.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { forecast, KG_PER_ROBOT_HOUR, ROBOT_HOURS_PER_DAY } from '../data/demo.js'

// Over denne andelen av kapasiteten markeres dagen som travel
const BUSY_SHARE = 0.75

export default function Forecast() {
  const max = Math.max(...forecast.map((d) => d.kg))
  const total = forecast.reduce((sum, d) => sum + d.kg, 0)
  const peak = forecast.find((d) => d.kg === max)

  const days = forecast.map((d) => {
    const hours = d.kg / KG_PER_ROBOT_HOUR
    return { ...d, hours, share: hours / ROBOT_HOURS_PER_DAY }
  })

  const items = forecast.map((d) => ({ key: d.day, label: d.day, value: d.kg, display: d.kg }))

  return (
    <>
      <PageHeading title="Prognose">
        Forventet høsting de neste 7 dagene, basert på modningsbildene fra dagens runde.
      </PageHeading>

      <div className="stat-grid stat-grid-wide">
        <div className="stat">
          <span className="stat-value">{total.toLocaleString('nb-NO')} kg</span>
          <span className="stat-label">totalt neste 7 dager</span>
        </div>
        <div className="stat">
          <span className="stat-value">{Math.round(total / forecast.length)} kg</span>
          <span className="stat-label">snitt per dag</span>
        </div>
        <div className="stat">
          <span className="stat-value stat-value-ripe">{peak.kg} kg</span>
          <span className="stat-label">toppdag · {peak.day} {peak.date}</span>
        </div>
      </div>

      <Card title="Forventet høsting per dag" className="forecast forecast-large" meta={<span className="card-meta">kg</span>}>
        <BarChart items={items} max={max} plotHeight={180} gap="12px" />
      </Card>

      <Card title="Robotkapasitet">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Dag</th>
                <th scope="col" className="num">Kg</th>
                <th scope="col" className="num">Robottimer</th>
                <th scope="col">Bruk av kapasitet</th>
                <th scope="col">Modneste rader</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => {
                const busy = d.share >= BUSY_SHARE
                return (
                  <tr key={d.day}>
                    <th scope="row">
                      {d.day} <span className="muted">{d.date}</span>
                    </th>
                    <td className="num">{d.kg}</td>
                    <td className="num">{d.hours.toFixed(1).replace('.', ',')}</td>
                    <td>
                      <div className="capacity">
                        <div className="meter">
                          <div
                            className={`meter-fill${busy ? ' is-low' : ''}`}
                            style={{ width: `${Math.min(100, Math.round(d.share * 100))}%` }}
                          />
                        </div>
                        <span className={busy ? 'row-count is-high' : 'muted'}>
                          {Math.round(d.share * 100)} %
                        </span>
                      </div>
                    </td>
                    <td>{d.rows}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="card-note">
          Regnet med ca. {KG_PER_ROBOT_HOUR} kg per robottime og {ROBOT_HOURS_PER_DAY} robottimer
          per dag (3 robotar). Dager over {BUSY_SHARE * 100} % er markert.
        </p>
      </Card>
    </>
  )
}
