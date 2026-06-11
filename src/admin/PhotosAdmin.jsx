import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { uploadImage } from '../lib/upload.js'

export default function PhotosAdmin() {
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(0)
  const [photos, setPhotos] = useState([])
  const inputRef = useRef(null)

  async function loadPhotos() {
    const { data } = await supabase
      .from('gallery_photos').select('*')
      .order('created_at', { ascending: false }).limit(60)
    setPhotos(data || [])
  }
  useEffect(() => { loadPhotos() }, [])

  function choose(list) {
    setFiles(Array.from(list || []).filter(f => f.type.startsWith('image/')))
    setDone(0); setError('')
  }

  async function uploadAll() {
    setBusy(true); setError('')
    let count = 0
    try {
      for (const file of files) {
        setProgress(`Uploading picture ${count + 1} of ${files.length}…`)
        const url = await uploadImage(file, 'gallery')
        const { error } = await supabase.from('gallery_photos').insert({
          image_url: url,
          caption: caption.trim(),
        })
        if (error) throw error
        count++
      }
      setDone(count)
      setFiles([])
      setCaption('')
      if (inputRef.current) inputRef.current.value = ''
      loadPhotos()
    } catch (e) {
      setError(`${count} picture(s) were uploaded, then something went wrong. Please try again. (${e.message})`)
    }
    setBusy(false); setProgress('')
  }

  async function remove(p) {
    if (!window.confirm('Remove this photo from the website? This cannot be undone.')) return
    await supabase.from('gallery_photos').delete().eq('id', p.id)
    loadPhotos()
  }

  return (
    <main className="section">
      <div className="container">
        <Link className="back-link" to="/admin">← Back to admin</Link>
        <h1 style={{ marginBottom: '24px' }}>Add photos to the gallery</h1>

        <div className="form-card">
          {error && <div className="notice notice-error">{error}</div>}
          {done > 0 && (
            <div className="notice notice-success">
              ✅ {done} photo{done > 1 ? 's are' : ' is'} now in the gallery.{' '}
              <Link to="/photos">See the gallery</Link>
            </div>
          )}

          <div
            className="upload-zone"
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); choose(e.dataTransfer.files) }}
          >
            <p style={{ fontSize: '2.4rem' }} aria-hidden="true">📷</p>
            <p><strong>Tap here to choose pictures</strong></p>
            <p>You can pick more than one at a time.</p>
            <input
              ref={inputRef} type="file" accept="image/*" multiple hidden
              onChange={e => choose(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <>
              <div className="upload-preview">
                {files.map((f, i) => <img key={i} src={URL.createObjectURL(f)} alt="" />)}
              </div>
              <div className="field" style={{ marginTop: '20px' }}>
                <label htmlFor="caption">A few words about these pictures <span style={{ fontWeight: 400 }}>(optional)</span></label>
                <p className="hint">For example: “Mother’s Day lunch, May 2026”.</p>
                <input id="caption" type="text" value={caption} onChange={e => setCaption(e.target.value)} />
              </div>
              <button className="btn btn-coral btn-block" disabled={busy} onClick={uploadAll}>
                {busy ? progress : `Put ${files.length} picture${files.length > 1 ? 's' : ''} on the website`}
              </button>
            </>
          )}
        </div>

        <h2 style={{ margin: '44px 0 18px' }}>Photos already in the gallery</h2>
        {photos.length === 0 ? (
          <div className="empty">No photos yet — they will appear here after you upload them.</div>
        ) : (
          <div className="photo-grid">
            {photos.map(p => (
              <figure className="photo-tile" key={p.id}>
                <img src={p.image_url} alt={p.caption || 'Club photo'} loading="lazy" />
                <figcaption style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{p.caption || ' '}</span>
                  <button className="btn btn-danger" style={{ minHeight: '44px', padding: '6px 14px' }} onClick={() => remove(p)}>
                    Remove
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
