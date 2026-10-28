import { useState } from 'react'
import { useOutletContext } from 'react-router'
import { alertIcons } from '../components/AlertList.jsx'
import Card from '../components/Card.jsx'
import Icon from '../components/Icon.jsx'
import PageHeading from '../components/PageHeading.jsx'
import Segmented from '../components/Segmented.jsx'
import { alertTypes } from '../data/demo.js'

const filterOptions = [
  { value: 'all', label: 'Alle' },
  ...Object.entries(alertTypes).map(([value, label]) => ({ value, label })),
]

export default function Alerts() {
  const { alerts, markRead, markAllRead } = useOutletContext()
  const [filter, setFilter] = useState('all')

  const unread = alerts.filter((a) => !a.read).length
  const visible = filter === 'all' ? alerts : alerts.filter((a) => a.type === filter)

  return (
    <>
      <PageHeading
        title="Varsler"
        actions={
          unread > 0 && (
            <button type="button" className="button" onClick={markAllRead}>
              Merk alle som lest
            </button>
          )
        }
      >
        {unread > 0 ? `${unread} uleste varsler.` : 'Ingen uleste varsler.'}
      </PageHeading>

      <Card
        title={`${visible.length} varsler`}
        meta={
          <Segmented label="Filtrer varsler" options={filterOptions} value={filter} onChange={setFilter} />
        }
      >
        {visible.length === 0 ? (
          <p className="card-note">Ingen varsler av denne typen.</p>
        ) : (
          <ul className="plain-list alert-feed">
            {visible.map((alert) => (
              <li key={alert.id} className={`alert-item${alert.read ? '' : ' is-unread'}`}>
                <Icon {...alertIcons[alert.type]} />
                <div className="list-text">
                  <strong>{alert.title}</strong>
                  <span>
                    {alertTypes[alert.type]} · {alert.time} · {alert.detail}
                  </span>
                </div>
                {alert.read ? (
                  <span className="muted alert-state">Lest</span>
                ) : (
                  <button type="button" className="button button-quiet" onClick={() => markRead(alert.id)}>
                    Merk som lest
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}
