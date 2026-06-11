import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { uploadImage } from '../lib/upload.js'

const EMPTY = { full_name: '', role: '', bio: '', phone: '', email: '', sort_order: 100 }

export default function MembersAdmin() {
  const [members, setMembers] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null) // {kind, text}

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }))

  async function load() {
    const { data } = await supabase
      .from('committee_members').select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    setMembers(data || [])
  }
  useEffect(() => { load() }, [])

  function startEdit(m) {
    setEditingId(m.id)
    setForm({
      full_name: m.full_name, role: m.role, bio: m.bio || '',
      phone: m.phone || '', email: m.email || '', sort_order: m.sort_order ?? 100,
    })
    setPhoto(null)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null); setForm(EMPTY); setPhoto(null)
  }

  async function save() {
    setBusy(true); setMessage(null)
    try {
      const record = {
        full_name: form.full_name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        sort_order: Number(form.sort_order) || 100,
      }
      if (photo) record.photo_url = await uploadImage(photo, 'committee')
      const result = editingId
        ? await supabase.from('committee_members').update(record).eq('id', editingId)
        : await supabase.from('committee_members').insert(record)
      if (result.error) throw result.error
      setMessage({ kind: 'success', text: editingId ? '✅ Profile updated.' : '✅ New committee member added to the website.' })
      cancelEdit()
      load()
    } catch (e) {
      setMessage({ kind: 'error', text: 'Something went wrong and the profile was not saved. Please try again. (' + e.message + ')' })
    }
    setBusy(false)
  }

  async function remove(m) {
    if (!window.confirm(`Remove ${m.full_name} from the committee page? This cannot be undone.`)) return
    await supabase.from('committee_members').delete().eq('id', m.id)
    load()
  }

  return (
    <main className="section">
      <div className="container">
        <Link className="back-link" to="/admin">← Back to admin</Link>
        <h1 style={{ marginBottom: '24px' }}>
          {editingId ? 'Update a committee member' : 'Manage the committee page'}
        </h1>

        <div className="form-card">
          {message && <div className={`notice notice-${message.kind}`}>{message.text}</div>}
          <div className="field">
            <label htmlFor="full_name">Full name</label>
            <input id="full_name" type="text" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="role">Role in the club</label>
            <p className="hint">For example: President, Secretary, Treasurer, Committee Member.</p>
            <input id="role" type="text" value={form.role} onChange={e => set('role', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="bio">A few words about them <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <textarea id="bio" style={{ minHeight: '110px' }} value={form.bio} onChange={e => set('bio', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <input id="phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="memail">Email address <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <input id="memail" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="mphoto">Their photo <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <input id="mphoto" type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
            {photo && <p className="hint">Photo chosen: {photo.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="sort">Position on the page</label>
            <p className="hint">Smaller numbers appear first. For example: President 1, Vice President 2.</p>
            <input id="sort" type="number" min="1" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-coral" style={{ flex: 1 }} disabled={busy || !form.full_name.trim() || !form.role.trim()} onClick={save}>
              {busy ? 'Saving…' : editingId ? 'Save changes' : 'Add to the website'}
            </button>
            {editingId && <button className="btn btn-quiet" onClick={cancelEdit}>Cancel</button>}
          </div>
        </div>

        <h2 style={{ margin: '44px 0 18px' }}>Committee members on the website</h2>
        <div className="admin-list">
          {members.length === 0 && <div className="empty">No committee members added yet.</div>}
          {members.map(m => (
            <div className="admin-row" key={m.id}>
              <div className="grow">
                <strong>{m.full_name}</strong>
                <div className="meta">{m.role}{m.phone ? ` · ${m.phone}` : ''}</div>
              </div>
              <button className="btn btn-quiet" onClick={() => startEdit(m)}>Update</button>
              <button className="btn btn-danger" onClick={() => remove(m)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
