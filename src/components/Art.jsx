// The "masi band" — a tapa-cloth inspired geometric pattern used as the
// site's signature element, echoing traditional Fijian masi designs.
export function MasiBand() {
  return (
    <svg className="masi-band" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1200 26" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="masi" width="60" height="26" patternUnits="userSpaceOnUse">
          <rect width="60" height="26" fill="#f3ecdd" />
          <path d="M0 26 L15 4 L30 26 Z" fill="#6e4a26" />
          <path d="M30 26 L45 4 L60 26 Z" fill="#c93a28" />
          <rect x="0" y="0" width="60" height="3" fill="#6e4a26" />
          <circle cx="15" cy="20" r="2.4" fill="#f3ecdd" />
          <circle cx="45" cy="20" r="2.4" fill="#f3ecdd" />
        </pattern>
      </defs>
      <rect width="1200" height="26" fill="url(#masi)" />
    </svg>
  )
}

// A warm hibiscus illustration. Pass bare={true} to remove the circle background (for dark backgrounds).
export function HibiscusArt({ bare = false }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hibiscus flower illustration">
      {!bare && <circle cx="120" cy="120" r="112" fill="#e9f2f2" />}
      {!bare && <circle cx="120" cy="120" r="112" fill="none" stroke="#0e5757" strokeWidth="3" strokeDasharray="4 8" />}
      <g transform="translate(120 120)">
        {petals.map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <ellipse cx="0" cy="-50" rx="34" ry="58" fill="#c93a28" />
            <ellipse cx="0" cy="-50" rx="20" ry="42" fill="#d9503d" />
          </g>
        ))}
        <circle r="22" fill="#e0a93e" />
        <circle r="9" fill="#6e4a26" />
      </g>
    </svg>
  )
}
