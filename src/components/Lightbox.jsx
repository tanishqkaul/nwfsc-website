import { useEffect, useRef } from 'react'
import { formatDate } from '../lib/format.js'

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)
  const photo = index == null ? null : photos[index]

  useEffect(() => {
    if (!photo) return
    closeRef.current?.focus()
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [photo, onClose, onPrev, onNext])

  if (!photo) return null

  const showArrows = photos.length > 1

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Picture viewer" onClick={onClose}>
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close picture">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      {showArrows && (
        <button
          type="button" className="lightbox-arrow lightbox-arrow-prev"
          onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous picture"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
      )}

      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={photo.image_url} alt={photo.caption || 'Club photo'} />
        {(photo.caption || photo.photo_date) && (
          <div className="lightbox-caption">
            {photo.caption && <p>{photo.caption}</p>}
            {photo.photo_date && <p className="meta">{formatDate(photo.photo_date)}</p>}
          </div>
        )}
      </div>

      {showArrows && (
        <button
          type="button" className="lightbox-arrow lightbox-arrow-next"
          onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next picture"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      )}
    </div>
  )
}
