import { initials } from '../lib/format.js'

export default function MemberCard({ member }) {
  return (
    <article className="member-card">
      {member.photo_url
        ? <img className="member-photo" src={member.photo_url} alt={`Photo of ${member.full_name}`} />
        : <div className="member-photo-fallback" aria-hidden="true">{initials(member.full_name)}</div>}
      <h3>{member.full_name}</h3>
      <p className="member-role">{member.role}</p>
      {member.bio && <p>{member.bio}</p>}
      <p className="member-contact">
        {member.phone && <><a href={`tel:${member.phone.replace(/\s/g, '')}`}>📞 {member.phone}</a><br /></>}
        {member.email && <a href={`mailto:${member.email}`}>✉️ {member.email}</a>}
      </p>
    </article>
  )
}
