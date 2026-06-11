import { supabase } from './supabase.js'

// Uploads one image to the public "club-photos" bucket and
// returns the public web address of the uploaded picture.
export async function uploadImage(file, folder) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('club-photos').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type || 'image/jpeg',
  })
  if (error) throw error
  const { data } = supabase.storage.from('club-photos').getPublicUrl(path)
  return data.publicUrl
}
