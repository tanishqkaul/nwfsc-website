import { Link } from 'react-router-dom'
import { MasiBand, HibiscusArt } from './Art.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <MasiBand />
      <div className="footer-inner">
        <div>
          <h3>North West Fiji Seniors Club</h3>
          <p>
            Supporting senior adults to engage, enrich and foster a sense of
            purpose in their lives.
          </p>
          <p className="footer-contact">
            <a href="mailto:northwestfijiseniorsclub@gmail.com">✉️ northwestfijiseniorsclub@gmail.com</a>
          </p>
        </div>
        <div>
          <h3>Quick links</h3>
          <p>
            <Link to="/news">News &amp; Events</Link><br />
            <Link to="/photos">Photo Gallery</Link><br />
            <Link to="/committee">Our Committee</Link><br />
            <Link to="/admin">Committee sign in</Link>
          </p>
        </div>
        <div className="footer-hibiscus" aria-hidden="true">
          <HibiscusArt bare ring="#fdfaf3" />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} North West Fiji Seniors Club</span>
        <span className="footer-reg">Reg. A0058545X &nbsp;·&nbsp; ABN 90993906566 &nbsp;·&nbsp; Est. November 2012</span>
      </div>
    </footer>
  )
}
