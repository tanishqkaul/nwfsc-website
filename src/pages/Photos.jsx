import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase.js'
import { formatDate } from '../lib/format.js'
import { groupByAlbum } from '../lib/album.js'
import Lightbox from '../components/Lightbox.jsx'

export default function Photos() {
  const [photos, setPhotos] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

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
          groupByAlbum(photos).map(group => {
            const first = group[0]
            return (
              <div className="photo-album" key={first.album_id || first.id}>
                {(first.caption || first.photo_date) && (
                  <div className="photo-album-head">
                    {first.caption && <h3>{first.caption}</h3>}
                    {first.photo_date && <span className="meta">{formatDate(first.photo_date)}</span>}
                  </div>
                )}
                <div className="photo-grid">
                  {group.map(p => (
                    <figure className="photo-tile" key={p.id}>
                      <button type="button" className="photo-tile-btn" onClick={() => setSelectedIndex(photos.indexOf(p))} aria-label="View this picture larger">
                        <img src={p.image_url} alt={p.caption || 'Club photo'} loading="lazy" />
                      </button>
                    </figure>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
      <Lightbox
        photos={photos || []}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(i => (i - 1 + photos.length) % photos.length)}
        onNext={() => setSelectedIndex(i => (i + 1) % photos.length)}
      />
    </main>
  )
}
