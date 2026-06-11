import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase.js'
import { sampleAnnouncements } from '../lib/sample.js'
import AnnouncementCard from '../components/AnnouncementCard.jsx'

export default function News() {
  const [items, setItems] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let alive = true
    async function load() {
      if (!isConfigured) { setItems(sampleAnnouncements); return }
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
      if (alive) setItems(data || [])
    }
    load()
    return () => { alive = false }
  }, [])

  const shown = (items || []).filter(i => filter === 'all' || i.category === filter)

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <h1>News &amp; Events</h1>
        </div>
        <div className="choice-row" style={{ maxWidth: '640px', marginBottom: '28px' }}>
          <label><input type="radio" name="filter" checked={filter === 'all'} onChange={() => setFilter('all')} /> Show everything</label>
          <label><input type="radio" name="filter" checked={filter === 'event'} onChange={() => setFilter('event')} /> Events only</label>
          <label><input type="radio" name="filter" checked={filter === 'announcement'} onChange={() => setFilter('announcement')} /> Announcements only</label>
        </div>
        {items === null ? (
          <p>Loading news…</p>
        ) : shown.length === 0 ? (
          <div className="empty">Nothing here yet. New announcements and events will appear on this page.</div>
        ) : (
          <div className="card-grid">
            {shown.map(item => <AnnouncementCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </main>
  )
}
