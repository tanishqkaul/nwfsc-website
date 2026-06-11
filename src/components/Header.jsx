import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MasiBand } from './Art.jsx'

const SIZES = [
  { key: 'normal', label: 'A', name: 'Normal text size' },
  { key: 'large', label: 'A+', name: 'Large text size' },
  { key: 'xlarge', label: 'A++', name: 'Extra large text size' },
]

export default function Header() {
  const [size, setSize] = useState(() => localStorage.getItem('nwfsc-textsize') || 'normal')

  useEffect(() => {
    if (size === 'normal') document.documentElement.removeAttribute('data-textsize')
    else document.documentElement.setAttribute('data-textsize', size)
    localStorage.setItem('nwfsc-textsize', size)
  }, [size])

  return (
    <header>
      <div className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <img src="/hibiscus.svg" alt="" />
            <span>
              <span className="brand-name">North West Fiji Seniors Club</span><br />
              <span className="brand-sub">Friendship · Wellbeing · Community</span>
            </span>
          </Link>
          <div className="textsize-switch" role="group" aria-label="Text size">
            <span>Text size:</span>
            {SIZES.map(s => (
              <button
                key={s.key}
                aria-pressed={size === s.key}
                aria-label={s.name}
                onClick={() => setSize(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <nav className="site-nav" aria-label="Main">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/news">News &amp; Events</NavLink></li>
          <li><NavLink to="/photos">Photos</NavLink></li>
          <li><NavLink to="/committee">Our Committee</NavLink></li>
        </ul>
      </nav>
      <MasiBand />
    </header>
  )
}
