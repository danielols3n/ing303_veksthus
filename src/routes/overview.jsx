import { useOutletContext } from 'react-router'
import AlertList from '../components/AlertList.jsx'
import Forecast from '../components/Forecast.jsx'
import HarvestToday from '../components/HarvestToday.jsx'
import HourlyHarvest from '../components/HourlyHarvest.jsx'
import RipenessMap from '../components/RipenessMap.jsx'
import RobotList from '../components/RobotList.jsx'
import {
  forecast,
  harvestToday,
  hourly,
  PLANTS_PER_ROW,
  ripenessRows,
  robots,
} from '../data/demo.js'

export default function Overview() {
  const { alerts } = useOutletContext()

  return (
    <div className="dashboard-columns">
      {/* Venstre: kart + dagskurve */}
      <div className="column column-main">
        <RipenessMap rows={ripenessRows} plantsPerRow={PLANTS_PER_ROW} />
        <HourlyHarvest hours={hourly} />
      </div>

      {/* Høyre: nøkkeltall, robotar, varsler, prognose */}
      <div className="column column-side">
        <HarvestToday {...harvestToday} />
        <RobotList robots={robots} />
        <AlertList alerts={alerts.slice(0, 3)} />
        <Forecast days={forecast} />
      </div>
    </div>
  )
}
