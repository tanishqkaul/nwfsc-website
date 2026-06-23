import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase.js'
import { sampleMembers } from '../lib/sample.js'
import MemberCard from '../components/MemberCard.jsx'

export default function Committee() {
  const [members, setMembers] = useState(null)

  useEffect(() => {
    let alive = true
    async function load() {
      if (!isConfigured) { setMembers(sampleMembers); return }
      const { data } = await supabase
        .from('committee_members')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
      if (alive) setMembers(data || [])
    }
    load()
    return () => { alive = false }
  }, [])

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <h1>Our Committee</h1>
        </div>
        <p style={{ maxWidth: '46rem', marginBottom: '10px' }}>
          Our committee members are here to help. Feel free to call or email
          any of us with questions about the club, our events, or how to join.
        </p>
        <p style={{ maxWidth: '46rem', marginBottom: '28px', fontWeight: 700, fontSize: '1.1rem' }}>
          <a href="mailto:northwestfijiseniorsclub@gmail.com">✉️ northwestfijiseniorsclub@gmail.com</a>
        </p>
        {members === null ? (
          <p>Loading committee members…</p>
        ) : members.length === 0 ? (
          <div className="empty">Committee profiles will appear here once they are added from the admin page.</div>
        ) : (
          <div className="member-grid">
            {members.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
        )}
      </div>
    </main>
  )
}
