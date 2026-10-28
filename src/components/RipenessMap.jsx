import Card from './Card.jsx'
import Icon from './Icon.jsx'

const legend = [
  { className: 'cell-ripe', label: 'Moden' },
  { className: 'cell-soon', label: 'Snart moden' },
  { className: 'cell-green', label: 'Umoden' },
  { className: 'cell-done', label: 'Høstet i dag' },
  { className: 'cell-flagged', label: 'Avvik oppdaget' },
]

// Rader med så mange modne planter eller flere får uthevet tall
const HIGH_RIPE_COUNT = 14

export default function RipenessMap({ rows, plantsPerRow }) {
  const total = rows.length * plantsPerRow

  return (
    <Card
      title={`Modningskart · ${rows.length} rader, ${total} planter`}
      className="ripeness"
      meta={
        <div className="legend">
          {legend.map((item) => (
            <span key={item.label} className="legend-item">
              <span className={`swatch ${item.className}`} />
              {item.label}
            </span>
          ))}
        </div>
      }
    >
      <div className="ripeness-scroll">
        <div className="ripeness-layout">
          {/* Hovedgang med ladestasjon og pakkeri */}
          <div className="aisle">
            <div className="aisle-station">
              <Icon name="bolt" />
              Lading A
              <span className="pill">R3</span>
            </div>
            <div className="aisle-label">Hovedgang</div>
            <div className="aisle-station">
              <Icon name="box" />
              Pakkeri
            </div>
          </div>

          <div className="rows">
            {rows.map((row) => (
              <div key={row.label} className="row">
                <span className="row-label">{row.label}</span>
                <div className="row-cells">
                  {row.cells.map((cell, j) => (
                    <div
                      key={j}
                      className={`cell ${cell.flagged ? 'cell-flagged' : `cell-${cell.kind}`}`}
                    >
                      {cell.robot && <span className="robot-marker">{cell.robot}</span>}
                    </div>
                  ))}
                </div>
                <span className={`row-count${row.ripe >= HIGH_RIPE_COUNT ? ' is-high' : ''}`}>
                  {row.ripe}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="card-note">
        Tallet til høyre er modne planter igjen i raden. Robotene plukker radene i rekkefølge
        etter andel modne.
      </p>
    </Card>
  )
}
