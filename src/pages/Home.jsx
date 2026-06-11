import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase.js'
import { sampleAnnouncements } from '../lib/sample.js'
import AnnouncementCard from '../components/AnnouncementCard.jsx'
import { HibiscusArt, MasiBand } from '../components/Art.jsx'

const ACTIVITIES = [
  { icon: '🥋', title: 'Tai Chi', desc: 'Every last Sunday of the month at Coburg Library. Gentle movement, breathing and meditation for balance and wellbeing.' },
  { icon: '☀️', title: 'Sunday Gatherings', desc: 'Monthly afternoon get-togethers with shared food, music, bingo and good company. Family members are always welcome.' },
  { icon: '🎙️', title: 'Guest Speakers', desc: 'Educational talks on health, community services, technology and more — keeping our members informed and connected.' },
  { icon: '🌺', title: 'Cultural Events', desc: 'Celebrating Fijian and multicultural heritage through festivals, traditional activities and community occasions.' },
]

const VALUES = [
  'Respecting and caring for the value and worth of every individual.',
  'Fostering teamwork and friendship.',
  'Providing help and support where possible to those in need.',
  'Bringing joy and pleasure through social interaction.',
  'Promoting multiculturalism, and encouraging participation in cultural and community activities.',
]

export default function Home() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    let alive = true
    async function load() {
      if (!isConfigured) { setItems(sampleAnnouncements.slice(0, 3)); return }
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3)
      if (alive) setItems(data || [])
    }
    load()
    return () => { alive = false }
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Bula vinaka — welcome</span>
            <h1>Good company, good health, and a strong community for our seniors</h1>
            <p className="lead">
              Supporting senior adults to engage, enrich and foster a sense of
              purpose in their lives — through friendship, culture, and
              activities that bring us together.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/news">See news &amp; events</Link>
              <Link className="btn btn-outline" to="/committee">Contact our committee</Link>
            </div>
          </div>
          <div className="hero-art">
            <HibiscusArt />
          </div>
        </div>
      </section>
      <MasiBand />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Latest news &amp; events</h2>
            <Link className="see-all" to="/news">See all news →</Link>
          </div>
          {items === null ? (
            <p>Loading the latest news…</p>
          ) : items.length === 0 ? (
            <div className="empty">No announcements yet. News from the club will appear here.</div>
          ) : (
            <div className="card-grid">
              {items.map(item => <AnnouncementCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>What we do</h2>
          <div className="activities-grid">
            {ACTIVITIES.map(a => (
              <div className="activity-card" key={a.title}>
                <span className="activity-icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our vision</h2>
          <p className="lead" style={{ fontSize: '1.15rem', maxWidth: '44rem', marginTop: '10px' }}>
            Supporting senior adults to engage, enrich and foster a sense of
            purpose in their lives.
          </p>
          <h2 style={{ marginTop: '34px' }}>Our mission</h2>
          <p style={{ maxWidth: '52rem', marginTop: '10px' }}>
            To reduce social isolation, improve the lifestyle, health and
            wellbeing of our seniors, and to empower them to lead meaningful and
            connected lives in which they are engaged. We are committed to
            providing inclusive and interactive programmes that make a
            difference in the lives of our seniors by participating in social
            and cultural activities in our community.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our values</h2>
          <div className="values-grid">
            {VALUES.map(v => <div className="value-item" key={v}>{v}</div>)}
          </div>
        </div>
      </section>
    </main>
  )
}
