import Icon from './Icon.jsx'

const navItems = ['Oversikt', 'Rader', 'Robotar', 'Varsler', 'Prognose']

export default function Topbar({ time, date, site, alertCount, active = 'Oversikt' }) {
  return (
    <header className="topbar">
      <div className="topbar-clock">
        <span className="topbar-time">{time}</span>
        <span className="topbar-date">{date}</span>
      </div>

      <nav className="main-nav" aria-label="Hovedmeny">
        {navItems.map((item) => (
          <a key={item} href="#" aria-current={item === active ? 'page' : undefined}>
            {item}
            {item === 'Varsler' && alertCount > 0 && (
              <span className="nav-badge" aria-label={`${alertCount} nye`}>{alertCount}</span>
            )}
          </a>
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
