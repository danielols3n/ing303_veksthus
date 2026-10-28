import { Link } from 'react-router'
import PageHeading from '../components/PageHeading.jsx'

export default function NotFound() {
  return (
    <PageHeading title="Fant ikke siden">
      Siden finnes ikke. <Link to="/">Gå til oversikten</Link>.
    </PageHeading>
  )
}
