export function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function shortDay(value) {
  const d = new Date(value)
  return { day: d.getDate(), month: d.toLocaleDateString('en-AU', { month: 'short' }) }
}

export function wasEdited(item) {
  if (!item.created_at || !item.updated_at) return false
  return new Date(item.updated_at).getTime() - new Date(item.created_at).getTime() > 1000
}

export function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
}
