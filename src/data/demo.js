// Illustrative demodata for konseptskissen – ikke målte verdier.
// Når det finnes ekte data fra robotene, byttes dette ut.

export const greenhouse = { name: 'Veksthus 2', crop: 'Tomat' }

// Samme faste frø som i designet, slik at kartet ser likt ut ved hver lasting
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export const ROW_COUNT = 14
export const PLANTS_PER_ROW = 28

// Status per plante: ripe | soon | green | done, pluss flagg for avvik og robotposisjon
export function buildRipenessRows() {
  const rnd = seededRandom(7)
  const ripeShare = [0.2, 0.25, 0.3, 0.3, 0.35, 0.4, 0.35, 0.45, 0.6, 0.65, 0.6, 0.4, 0.3, 0.25]

  return ripeShare.map((share, i) => {
    let ripe = 0
    const cells = []
    for (let j = 0; j < PLANTS_PER_ROW; j++) {
      const r = rnd()
      let kind
      if (i < 5) kind = r < 0.82 ? 'done' : 'green'
      else if (i === 5 && j < 17) kind = r < 0.85 ? 'done' : 'green'
      else if (i === 10 && j < 4) kind = 'done'
      else if (r < share) kind = 'ripe'
      else if (r < share + 0.25) kind = 'soon'
      else kind = 'green'

      if (kind === 'ripe') ripe++
      const robot = i === 5 && j === 17 ? 'R1' : i === 10 && j === 4 ? 'R2' : null
      const flagged = i === 9 && j === 20
      cells.push({ kind, robot, flagged })
    }

    const count = (kind) => cells.filter((c) => c.kind === kind).length
    return {
      number: i + 1,
      label: `Rad ${String(i + 1).padStart(2, '0')}`,
      cells,
      ripe,
      soon: count('soon'),
      green: count('green'),
      done: count('done'),
    }
  })
}

export const ripenessRows = buildRipenessRows()

// Status per rad: ferdig, under plukking (med robot) eller plassering i køen.
// Køen sorteres etter andel modne, slik robotene plukker.
const activeRows = { 6: 'R1', 11: 'R2' }
const finishedRows = [1, 2, 3, 4, 5]

export const rowStatus = (() => {
  const queue = ripenessRows
    .filter((r) => !finishedRows.includes(r.number) && !activeRows[r.number])
    .sort((a, b) => b.ripe - a.ripe)
    .map((r) => r.number)

  return Object.fromEntries(
    ripenessRows.map((r) => {
      if (finishedRows.includes(r.number)) return [r.number, { type: 'done' }]
      if (activeRows[r.number]) return [r.number, { type: 'active', robot: activeRows[r.number] }]
      return [r.number, { type: 'queued', position: queue.indexOf(r.number) + 1 }]
    })
  )
})()

// Høstet kg per time. Timene etter "nå" er estimater.
export const CURRENT_HOUR_INDEX = 5
const hourlyKg = [14, 32, 41, 44, 38, 47, 45, 50, 46, 31, 24, 0]
export const hourly = hourlyKg.map((kg, k) => {
  const past = k <= CURRENT_HOUR_INDEX
  return {
    hour: String(6 + k).padStart(2, '0'),
    kg: past ? kg : Math.round(kg * 0.9),
    estimate: !past,
  }
})

export const harvestToday = {
  kg: 412,
  ripeKg: 640,
  stats: [
    { value: '6,8', label: 'klaser / min' },
    { value: '1,2 %', label: 'skadet frukt' },
    { value: '3 t 40', label: 'til ferdig' },
  ],
}

export const robots = [
  {
    id: 'R1',
    state: 'picking',
    status: 'Plukker · rad 06',
    detail: 'Plante 18 av 28 · 182 kg i dag',
    battery: 71,
    stats: [
      { value: '182 kg', label: 'høstet i dag' },
      { value: '2,6', label: 'klaser / min' },
      { value: '0,9 %', label: 'skadet frukt' },
      { value: '5 t 10', label: 'i drift i dag' },
    ],
    log: [
      { time: '11:38', text: 'Startet på rad 06, plante 18' },
      { time: '10:52', text: 'Ferdig med rad 05' },
      { time: '09:30', text: 'Levert kasse 7 til pakkeriet' },
      { time: '06:00', text: 'Startet dagens runde' },
    ],
  },
  {
    id: 'R2',
    state: 'picking',
    status: 'Plukker · rad 11',
    detail: 'Plante 5 av 28 · 164 kg i dag',
    battery: 58,
    stats: [
      { value: '164 kg', label: 'høstet i dag' },
      { value: '2,4', label: 'klaser / min' },
      { value: '1,4 %', label: 'skadet frukt' },
      { value: '5 t 25', label: 'i drift i dag' },
    ],
    log: [
      { time: '11:31', text: 'Startet på rad 11, plante 5' },
      { time: '10:12', text: 'Meldte mulig gråskimmel i rad 10, plante 21' },
      { time: '08:45', text: 'Levert kasse 4 til pakkeriet' },
      { time: '06:00', text: 'Startet dagens runde' },
    ],
  },
  {
    id: 'R3',
    state: 'charging',
    status: 'Lader · stasjon A',
    detail: 'Ferdig 12:30 · 66 kg i dag',
    battery: 22,
    stats: [
      { value: '66 kg', label: 'høstet i dag' },
      { value: '1,8', label: 'klaser / min' },
      { value: '1,3 %', label: 'skadet frukt' },
      { value: '3 t 05', label: 'i drift i dag' },
    ],
    log: [
      { time: '11:20', text: 'Sendt til lading ved 18 % batteri' },
      { time: '10:40', text: 'Ferdig med rad 04' },
      { time: '07:15', text: 'Levert kasse 2 til pakkeriet' },
      { time: '06:00', text: 'Startet dagens runde' },
    ],
  },
]

// De tre første er dagens uleste varsler, som også vises på oversikten
export const alerts = [
  {
    id: 'a1',
    type: 'deviation',
    time: '10:12',
    title: 'Mulig gråskimmel · rad 10, plante 21',
    detail: 'Bilde lagret 10:12 · ikke plukket, sjekk manuelt',
    read: false,
  },
  {
    id: 'a2',
    type: 'priority',
    time: '09:55',
    title: 'Rad 09–11 har mest moden frukt',
    detail: 'Flyttet først i køen for i morgen',
    read: false,
  },
  {
    id: 'a3',
    type: 'info',
    time: '11:20',
    title: 'R3 sendt til lading 11:20',
    detail: 'Tilbake i drift ca. 12:30',
    read: false,
  },
  {
    id: 'a4',
    type: 'info',
    time: '06:00',
    title: 'Dagens runde startet',
    detail: 'Tre robotar i drift fra rad 01',
    read: true,
  },
  {
    id: 'a5',
    type: 'deviation',
    time: 'I går 16:50',
    title: 'Sprukket frukt · rad 03, plante 7',
    detail: 'Plukket og sortert ut i pakkeriet',
    read: true,
  },
]

export const alertTypes = {
  deviation: 'Avvik',
  priority: 'Prioritet',
  info: 'Info',
}

export const forecast = [
  { day: 'Man', date: '26. okt', kg: 520, rows: 'Rad 09–11' },
  { day: 'Tir', date: '27. okt', kg: 610, rows: 'Rad 08–12' },
  { day: 'Ons', date: '28. okt', kg: 690, rows: 'Rad 06–10' },
  { day: 'Tor', date: '29. okt', kg: 640, rows: 'Rad 05–09' },
  { day: 'Fre', date: '30. okt', kg: 580, rows: 'Rad 01–04' },
  { day: 'Lør', date: '31. okt', kg: 470, rows: 'Rad 12–14' },
  { day: 'Søn', date: '1. nov', kg: 430, rows: 'Rad 01–03' },
]

// Omtrentlig kapasitet brukt til å regne ut robottimer i prognosen
export const KG_PER_ROBOT_HOUR = 30
export const ROBOT_HOURS_PER_DAY = 3 * 10
