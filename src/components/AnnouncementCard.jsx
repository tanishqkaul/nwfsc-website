import { formatDate, shortDay } from '../lib/format.js'

export default function AnnouncementCard({ item }) {
  const isEvent = item.category === 'event'
  return (
    <article className={`card ${isEvent ? 'is-event' : ''} ${item.pinned ? 'is-pinned' : ''}`}>
      {item.image_url && <img className="card-img" src={item.image_url} alt="" />}
      <div className="card-body">
        <div className="card-tags">
          {item.pinned && <span className="tag tag-pinned">Important</span>}
          <span className={`tag ${isEvent ? 'tag-event' : 'tag-announcement'}`}>
            {isEvent ? 'Event' : 'Announcement'}
          </span>
        </div>
        <h3>{item.title}</h3>
        {isEvent && item.event_date && (
          <div className="event-when">
            <span className="cal">
              <span className="d">{shortDay(item.event_date).day}</span>
              <span className="m">{shortDay(item.event_date).month}</span>
            </span>
            <span>
              {formatDate(item.event_date)}
              {item.event_place ? <><br />{item.event_place}</> : null}
            </span>
          </div>
        )}
        <p className="card-text">{item.body}</p>
        <p className="card-date">Posted {formatDate(item.created_at)}</p>
      </div>
    </article>
  )
}
