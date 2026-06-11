import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase.js'

export default function Photos() {
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    let alive = true
    async function load() {
      if (!isConfigured) { setPhotos([]); return }
      const { data } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false })
      if (alive) setPhotos(data || [])
    }
    load()
    return () => { alive = false }
  }, [])

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <h1>Photo Gallery</h1>
        </div>
        <p style={{ maxWidth: '46rem', marginBottom: '28px' }}>
          Memories from our gatherings, outings and celebrations.
        </p>
        {photos === null ? (
          <p>Loading photos…</p>
        ) : photos.length === 0 ? (
          <div className="empty">
            <p><strong>Photos from our club will appear here soon.</strong></p>
            <p>Committee members can add photos from the admin page in just a few taps.</p>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map(p => (
              <figure className="photo-tile" key={p.id}>
                <img src={p.image_url} alt={p.caption || 'Club photo'} loading="lazy" />
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
