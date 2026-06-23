-- Group photos uploaded together so one caption shows once, not once per photo.
-- Also let admins record which date the pictures are actually from.
alter table public.gallery_photos add column if not exists album_id uuid;
alter table public.gallery_photos add column if not exists photo_date date;
