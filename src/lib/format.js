export function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function shortDay(value) {
  const d = new Date(value)
  return { day: d.getDate(), month: d.toLocaleDateString('en-AU', { month: 'short' }) }
}

export function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
}
