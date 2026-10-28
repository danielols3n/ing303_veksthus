import { useState } from 'react'
import Card from '../components/Card.jsx'
import PageHeading from '../components/PageHeading.jsx'
import Segmented from '../components/Segmented.jsx'
import { PLANTS_PER_ROW, ripenessRows, rowStatus } from '../data/demo.js'

const sortOptions = [
  { value: 'number', label: 'Radnummer' },
  { value: 'queue', label: 'Plukkerekkefølge' },
]

// Rekkefølge robotene tar radene i: pågående først, så køen, ferdige til slutt
function queueRank(number) {
  const status = rowStatus[number]
  if (status.type === 'active') return 0
  if (status.type === 'queued') return status.position
  return 100 + number
}

function StatusLabel({ status }) {
  if (status.type === 'active') {
    return (
      <span className="status-cell">
        <span className="pill">{status.robot}</span>Plukkes nå
      </span>
    )
  }
  if (status.type === 'queued') return <span>Nr. {status.position} i køen</span>
  return <span className="muted">Ferdig i dag</span>
}

export default function Rows() {
  const [sort, setSort] = useState('number')

  const rows =
    sort === 'queue'
      ? [...ripenessRows].sort((a, b) => queueRank(a.number) - queueRank(b.number))
      : ripenessRows

  const totals = ripenessRows.reduce(
    (sum, r) => ({ ripe: sum.ripe + r.ripe, soon: sum.soon + r.soon, done: sum.done + r.done }),
    { ripe: 0, soon: 0, done: 0 }
  )
  const doneRows = Object.values(rowStatus).filter((s) => s.type === 'done').length
  const activeRows = Object.values(rowStatus).filter((s) => s.type === 'active').length

  return (
    <>
      <PageHeading title="Rader">
        {ripenessRows.length} rader à {PLANTS_PER_ROW} planter. Modning fra dagens bilderunde.
      </PageHeading>

      <div className="stat-grid stat-grid-wide">
        <div className="stat">
          <span className="stat-value stat-value-ripe">{totals.ripe}</span>
          <span className="stat-label">modne planter igjen</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totals.soon}</span>
          <span className="stat-label">snart modne</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totals.done}</span>
          <span className="stat-label">planter høstet i dag</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {doneRows} / {ripenessRows.length}
          </span>
          <span className="stat-label">rader ferdige · {activeRows} pågår</span>
        </div>
      </div>

      <Card
        title="Alle rader"
        meta={
          <Segmented label="Sorter rader" options={sortOptions} value={sort} onChange={setSort} />
        }
      >
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Rad</th>
                <th scope="col">Modningskart</th>
                <th scope="col" className="num">Modne</th>
                <th scope="col" className="num">Snart</th>
                <th scope="col" className="num">Umodne</th>
                <th scope="col" className="num">Høstet</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.number}>
                  <th scope="row">{row.label}</th>
                  <td>
                    <div className="row-cells cell-strip" aria-hidden="true">
                      {row.cells.map((cell, j) => (
                        <div
                          key={j}
                          className={`cell ${cell.flagged ? 'cell-flagged' : `cell-${cell.kind}`}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className={`num${row.ripe >= 14 ? ' row-count is-high' : ''}`}>{row.ripe}</td>
                  <td className="num">{row.soon}</td>
                  <td className="num">{row.green}</td>
                  <td className="num">{row.done}</td>
                  <td>
                    <StatusLabel status={rowStatus[row.number]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="card-note">
          Robotene plukker radene i rekkefølge etter antall modne planter. Rader med 14 eller flere
          modne er uthevet.
        </p>
      </Card>
    </>
  )
}
