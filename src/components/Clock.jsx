import { useEffect, useState } from 'react'

const dateFormat = new Intl.DateTimeFormat('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })

function formatTime(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function formatDate(date) {
  const text = dateFormat.format(date)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Live klokke. Oppdateres hvert sekund så minuttskiftet kommer med en gang.
export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="topbar-clock">
      <time className="topbar-time" dateTime={now.toISOString()}>{formatTime(now)}</time>
      <span className="topbar-date">{formatDate(now)}</span>
    </div>
  )
}
