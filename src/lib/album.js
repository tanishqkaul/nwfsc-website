// Groups photos uploaded together (same album_id) so a shared
// caption and date can be shown once instead of once per photo.
export function groupByAlbum(photos) {
  const order = []
  const groups = new Map()
  for (const p of photos) {
    const key = p.album_id || p.id
    if (!groups.has(key)) { groups.set(key, []); order.push(key) }
    groups.get(key).push(p)
  }
  return order.map(key => groups.get(key))
}
