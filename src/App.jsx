import AlertList from './components/AlertList.jsx'
import Forecast from './components/Forecast.jsx'
import HarvestToday from './components/HarvestToday.jsx'
import HourlyHarvest from './components/HourlyHarvest.jsx'
import RipenessMap from './components/RipenessMap.jsx'
import RobotList from './components/RobotList.jsx'
import Topbar from './components/Topbar.jsx'
import {
  alertCount,
  alerts,
  buildRipenessRows,
  forecast,
  greenhouse,
  harvestToday,
  hourly,
  now,
  PLANTS_PER_ROW,
  robots,
} from './data/demo.js'

const rows = buildRipenessRows()

export default function App() {
  return (
    <div className="dashboard">
      <Topbar time={now.time} date={now.date} site={greenhouse} alertCount={alertCount} />

      <div className="dashboard-columns">
        {/* Venstre: kart + dagskurve */}
        <div className="column column-main">
          <RipenessMap rows={rows} plantsPerRow={PLANTS_PER_ROW} />
          <HourlyHarvest hours={hourly} />
        </div>

        {/* Høyre: nøkkeltall, robotar, varsler, prognose */}
        <div className="column column-side">
          <HarvestToday {...harvestToday} />
          <RobotList robots={robots} />
          <AlertList alerts={alerts} />
          <Forecast days={forecast} />
        </div>
      </div>

      <footer className="dashboard-footer">
        Konseptskisse · ING303 · tallene er illustrative, ikke målte verdier
      </footer>
    </div>
  )
}
