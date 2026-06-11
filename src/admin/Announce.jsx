import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { uploadImage } from '../lib/upload.js'
import { formatDate } from '../lib/format.js'

const EMPTY = { title: '', body: '', category: 'announcement', event_date: '', event_place: '', pinned: false }

export default function Announce() {
  const [form, setForm] = useState(EMPTY)
  const [photo, setPhoto] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [published, setPublished] = useState(false)
  const [existing, setExisting] = useState([])

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }))

  async function loadExisting() {
    const { data } = await supabase
      .from('announcements').select('*')
      .order('created_at', { ascending: false }).limit(20)
    setExisting(data || [])
  }
  useEffect(() => { loadExisting() }, [])

  async function publish() {
    setBusy(true); setError('')
    try {
      let image_url = null
      if (photo) image_url = await uploadImage(photo, 'announcements')
      const { error } = await supabase.from('announcements').insert({
        title: form.title.trim(),
        body: form.body.trim(),
        category: form.category,
        event_date: form.category === 'event' && form.event_date ? form.event_date : null,
        event_place: form.category === 'event' ? form.event_place.trim() || null : null,
        pinned: form.pinned,
        image_url,
      })
      if (error) throw error
      setPublished(true)
      loadExisting()
    } catch (e) {
      setError('Something went wrong and the announcement was not published. Please try again. (' + e.message + ')')
    }
    setBusy(false)
  }

  async function remove(item) {
    if (!window.confirm(`Remove "${item.title}" from the website? This cannot be undone.`)) return
    await supabase.from('announcements').delete().eq('id', item.id)
    loadExisting()
  }

  async function togglePin(item) {
    await supabase.from('announcements').update({ pinned: !item.pinned }).eq('id', item.id)
    loadExisting()
  }

  if (published) {
    return (
      <main className="section"><div className="container"><div className="form-card success-screen" style={{ margin: '0 auto' }}>
        <div className="big-tick" aria-hidden="true">✅</div>
        <h2>Your announcement is now on the website</h2>
        <p>Everyone who visits the website can see it.</p>
        <div className="actions">
          <Link className="btn btn-primary" to="/news">See it on the website</Link>
          <button className="btn btn-outline" onClick={() => { setForm(EMPTY); setPhoto(null); setPublished(false) }}>
            Write another one
          </button>
          <Link className="btn btn-quiet" to="/admin">Back to admin</Link>
        </div>
      </div></div></main>
    )
  }

  return (
    <main className="section">
      <div className="container">
        <Link className="back-link" to="/admin">← Back to admin</Link>
        <h1 style={{ marginBottom: '24px' }}>Make an announcement</h1>
        <div className="form-card">
          {error && <div className="notice notice-error">{error}</div>}

          <div className="field">
            <label>What kind of post is this?</label>
            <div className="choice-row">
              <label>
                <input type="radio" name="category" checked={form.category === 'announcement'}
                  onChange={() => set('category', 'announcement')} />
                📣 An announcement
              </label>
              <label>
                <input type="radio" name="category" checked={form.category === 'event'}
                  onChange={() => set('category', 'event')} />
                📅 An upcoming event
              </label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="title">Title</label>
            <p className="hint">A short headline, for example: “Diwali celebration this Saturday”.</p>
            <input id="title" type="text" value={form.title} onChange={e => set('title', e.target.value)} />
          </div>

          {form.category === 'event' && (
            <>
              <div className="field">
                <label htmlFor="event_date">When is the event?</label>
                <input id="event_date" type="date" value={form.event_date} onChange={e => set('event_date', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="event_place">Where is it? <span style={{ fontWeight: 400 }}>(optional)</span></label>
                <input id="event_place" type="text" placeholder="For example: Community Hall" value={form.event_place} onChange={e => set('event_place', e.target.value)} />
              </div>
            </>
          )}

          <div className="field">
            <label htmlFor="body">What would you like to say?</label>
            <textarea id="body" value={form.body} onChange={e => set('body', e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="photo">Add a picture <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <input id="photo" type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
            {photo && <p className="hint">Picture chosen: {photo.name}</p>}
          </div>

          <div className="field">
            <div className="choice-row">
              <label>
                <input type="checkbox" checked={form.pinned} onChange={e => set('pinned', e.target.checked)} />
                Mark as important (keeps it at the top)
              </label>
            </div>
          </div>

          <button className="btn btn-coral btn-block" disabled={busy || !form.title.trim() || !form.body.trim()} onClick={publish}>
            {busy ? 'Publishing…' : 'Publish announcement'}
          </button>
        </div>

        <h2 style={{ margin: '44px 0 18px' }}>Already on the website</h2>
        <div className="admin-list">
          {existing.length === 0 && <div className="empty">No announcements yet.</div>}
          {existing.map(item => (
            <div className="admin-row" key={item.id}>
              <div className="grow">
                <strong>{item.title}</strong>
                <div className="meta">
                  {item.category === 'event' ? 'Event' : 'Announcement'}
                  {item.pinned ? ' · marked important' : ''} · posted {formatDate(item.created_at)}
                </div>
              </div>
              <button className="btn btn-quiet" onClick={() => togglePin(item)}>
                {item.pinned ? 'Remove “important”' : 'Mark important'}
              </button>
              <button className="btn btn-danger" onClick={() => remove(item)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
