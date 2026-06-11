// Sample content shown in preview mode (before Supabase is connected),
// so the club can see exactly how the finished website will look.
export const sampleAnnouncements = [
  {
    id: 's1', category: 'announcement', pinned: true,
    title: 'Welcome to our new website!',
    body: 'The North West Fiji Seniors Club now has its own home on the internet. Here you will find all our news, upcoming events, photos from our gatherings, and the contact details of our committee. Bula vinaka and welcome!',
    created_at: new Date().toISOString(),
  },
  {
    id: 's2', category: 'event', pinned: false,
    title: 'Tai Chi — every last Sunday of the month',
    body: 'NWFSC Tai Chi classes continue every last Sunday of the month at the Meeting Room, Coburg Library. Led by Shiela Kumar, who has been teaching Tai Chi for over 20 years. Tai chi is a mind-body exercise involving slow, gentle movement, breathing and meditation. It improves balance, coordination and helps lower blood pressure. All welcome!',
    event_date: new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10),
    event_place: 'Coburg Library Meeting Room',
    created_at: new Date().toISOString(),
  },
  {
    id: 's3', category: 'event', pinned: false,
    title: 'Sunday Afternoon Get-Together',
    body: 'Join us for our popular Sunday afternoon gathering. Enjoy good company, shared food, and this month we have guest speakers from ECCV on "How To Go Electric." Family and friends are most welcome.',
    event_date: new Date(Date.now() + 18 * 86400000).toISOString().slice(0, 10),
    event_place: 'Community Hall, Coburg',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
]

export const sampleMembers = [
  { id: 'm1', full_name: 'Committee Member', role: 'President', bio: 'Profile details will appear here once added from the admin page.', sort_order: 1 },
  { id: 'm2', full_name: 'Committee Member', role: 'Vice President', bio: 'Profile details will appear here once added from the admin page.', sort_order: 2 },
  { id: 'm3', full_name: 'Committee Member', role: 'Secretary', bio: 'Profile details will appear here once added from the admin page.', sort_order: 3 },
  { id: 'm4', full_name: 'Committee Member', role: 'Treasurer', bio: 'Profile details will appear here once added from the admin page.', sort_order: 4 },
]
