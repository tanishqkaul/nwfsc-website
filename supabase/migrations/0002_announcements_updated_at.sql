-- Track when an announcement was last modified, separate from when it was first posted.
alter table public.announcements add column if not exists updated_at timestamptz;
update public.announcements set updated_at = created_at where updated_at is null;
alter table public.announcements alter column updated_at set default now();
alter table public.announcements alter column updated_at set not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists announcements_set_updated_at on public.announcements;
create trigger announcements_set_updated_at
  before update on public.announcements
  for each row
  execute function public.set_updated_at();
