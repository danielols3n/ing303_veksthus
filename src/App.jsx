import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Alerts from './routes/alerts.jsx'
import Forecast from './routes/forecast.jsx'
import NotFound from './routes/not-found.jsx'
import Overview from './routes/overview.jsx'
import Robots from './routes/robots.jsx'
import Rows from './routes/rows.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="rader" element={<Rows />} />
        <Route path="robotar" element={<Robots />} />
        <Route path="varsler" element={<Alerts />} />
        <Route path="prognose" element={<Forecast />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
