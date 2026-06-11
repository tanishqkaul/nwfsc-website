-- North West Fiji Seniors Club — initial schema
-- Tables: announcements, gallery_photos, committee_members
-- Public can read everything; only signed-in admins can write.

create extension if not exists "pgcrypto";

-- ============ ANNOUNCEMENTS (news + events) ============
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null default 'announcement' check (category in ('announcement','event')),
  event_date date,
  event_place text,
  image_url text,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ PHOTO GALLERY ============
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  caption text not null default '',
  image_url text not null,
  created_at timestamptz not null default now()
);

-- ============ COMMITTEE MEMBERS ============
create table if not exists public.committee_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  bio text not null default '',
  phone text,
  email text,
  photo_url text,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

-- ============ ROW LEVEL SECURITY ============
alter table public.announcements enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.committee_members enable row level security;

-- Everyone (even without logging in) can read the website content
create policy "Public can read announcements" on public.announcements
  for select using (true);
create policy "Public can read photos" on public.gallery_photos
  for select using (true);
create policy "Public can read committee" on public.committee_members
  for select using (true);

-- Only signed-in admins can add / change / remove content
create policy "Admins can insert announcements" on public.announcements
  for insert to authenticated with check (true);
create policy "Admins can update announcements" on public.announcements
  for update to authenticated using (true);
create policy "Admins can delete announcements" on public.announcements
  for delete to authenticated using (true);

create policy "Admins can insert photos" on public.gallery_photos
  for insert to authenticated with check (true);
create policy "Admins can update photos" on public.gallery_photos
  for update to authenticated using (true);
create policy "Admins can delete photos" on public.gallery_photos
  for delete to authenticated using (true);

create policy "Admins can insert committee" on public.committee_members
  for insert to authenticated with check (true);
create policy "Admins can update committee" on public.committee_members
  for update to authenticated using (true);
create policy "Admins can delete committee" on public.committee_members
  for delete to authenticated using (true);

-- ============ STORAGE BUCKET for photos ============
insert into storage.buckets (id, name, public)
values ('club-photos', 'club-photos', true)
on conflict (id) do nothing;

create policy "Public can view club photos" on storage.objects
  for select using (bucket_id = 'club-photos');
create policy "Admins can upload club photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'club-photos');
create policy "Admins can delete club photos" on storage.objects
  for delete to authenticated using (bucket_id = 'club-photos');

-- ============ WELCOME SEED ============
insert into public.announcements (title, body, category, pinned)
values (
  'Welcome to our new website!',
  'The North West Fiji Seniors Club now has its own home on the internet. Here you will find all our news, upcoming events, photos from our gatherings, and the contact details of our committee. Bula vinaka and welcome!',
  'announcement',
  true
);
