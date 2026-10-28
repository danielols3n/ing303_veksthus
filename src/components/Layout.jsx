import { useState } from 'react'
import { Outlet } from 'react-router'
import Topbar from './Topbar.jsx'
import { alerts as initialAlerts, greenhouse } from '../data/demo.js'

// Felles ramme for alle sider. Varslene ligger her så merket i menyen
// oppdateres når de leses på varselsiden.
export default function Layout() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const unread = alerts.filter((a) => !a.read).length

  const markRead = (id) =>
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, read: true } : a)))
  const markAllRead = () => setAlerts((list) => list.map((a) => ({ ...a, read: true })))

  return (
    <div className="dashboard">
      <Topbar site={greenhouse} alertCount={unread} />
      <main className="dashboard-main">
        <Outlet context={{ alerts, markRead, markAllRead }} />
      </main>
      <footer className="dashboard-footer">
        Konseptskisse · ING303 · tallene er illustrative, ikke målte verdier
      </footer>
    </div>
  )
}
