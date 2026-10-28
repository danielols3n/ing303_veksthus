import { NavLink } from 'react-router'
import Clock from './Clock.jsx'
import Icon from './Icon.jsx'

const navItems = [
  { to: '/', label: 'Oversikt' },
  { to: '/rader', label: 'Rader' },
  { to: '/robotar', label: 'Robotar' },
  { to: '/varsler', label: 'Varsler' },
  { to: '/prognose', label: 'Prognose' },
]

export default function Topbar({ site, alertCount }) {
  return (
    <header className="topbar">
      <Clock />

      {/* NavLink setter aria-current="page" på aktiv side */}
      <nav className="main-nav" aria-label="Hovedmeny">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
            {item.to === '/varsler' && alertCount > 0 && (
              <span className="nav-badge" aria-label={`${alertCount} uleste`}>{alertCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="site-picker">
        <Icon name="house" size={16} />
        {site.name} · {site.crop}
        <Icon name="chevronDown" size={14} />
      </button>
    </header>
  )
}
