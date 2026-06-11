import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ marginBottom: '8px' }}>What would you like to do?</h1>
        <p style={{ marginBottom: '30px', color: 'var(--ink-soft)' }}>
          Choose one of the options below. You can always come back to this page.
        </p>
        <div className="big-actions">
          <Link className="big-action" to="/admin/announce">
            <span className="icon" aria-hidden="true">📣</span>
            <h3>Make an announcement</h3>
            <p>Share news or an upcoming event with everyone.</p>
          </Link>
          <Link className="big-action" to="/admin/photos">
            <span className="icon" aria-hidden="true">📷</span>
            <h3>Add photos</h3>
            <p>Put pictures from our gatherings into the gallery.</p>
          </Link>
          <Link className="big-action" to="/admin/committee">
            <span className="icon" aria-hidden="true">👥</span>
            <h3>Manage committee</h3>
            <p>Add or update committee member profiles.</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
