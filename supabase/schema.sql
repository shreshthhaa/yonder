-- Yonder database. Paste this whole file into Supabase → SQL Editor → Run.
-- Safe to run once on a new project.

create extension if not exists pgcrypto;

-- ---------- tables ----------
create table if not exists public.profiles (
  id uuid primary key,                       -- = auth user id (bots have fixed ids, no auth row)
  name text not null default 'You',
  color text not null default '#FF5CA8',
  home_area text not null default '',
  taste jsonb not null default '{"like":[],"nope":[]}',
  is_bot boolean not null default false,
  is_guest boolean not null default false,
  onboarded boolean not null default false,
  tour_done boolean not null default false,
  demo_seeded boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#FF5CA8',
  invite_code text not null unique,
  memory text[] not null default '{}',
  is_personal boolean not null default false,
  is_demo boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  name text not null,
  area text not null default '',
  category text not null default 'shows' check (category in ('bars','cafe','food','sunset','shows','workshop','shop')),
  price text not null default '',
  note text not null default '',
  lat double precision, lng double precision,
  source_kind text not null default 'manual',
  source_url text,
  added_by uuid references public.profiles(id) on delete set null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.interests (
  place_id uuid not null references public.places(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  primary key (place_id, user_id)
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  title text not null,
  status text not null default 'voting' check (status in ('voting','confirmed','cancelled')),
  options jsonb not null default '[]',
  prefs jsonb,
  chosen int,
  place_id uuid references public.places(id) on delete set null,
  date date,
  time text,
  who uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  kind text not null check (kind in ('text','share','ai','plan','system')),
  body text not null default '',
  data jsonb,
  created_at timestamptz not null default now()
);
create index if not exists messages_group_time on public.messages (group_id, created_at);

create table if not exists public.votes (
  plan_id uuid not null references public.plans(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  ranking int[] not null default '{}',
  vetoes int[] not null default '{}',
  created_at timestamptz not null default now(),
  primary key (plan_id, user_id)
);

create table if not exists public.ratings (
  place_id uuid not null references public.places(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  went boolean not null,
  stars int check (stars between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (place_id, user_id)
);

create table if not exists public.ai_usage (
  user_id uuid not null,
  day date not null,
  count int not null default 0,
  primary key (user_id, day)
);

-- ---------- demo friends (bots) ----------
insert into public.profiles (id, name, color, home_area, taste, is_bot, onboarded, tour_done, demo_seeded) values
 ('00000000-0000-4000-8000-000000000001','Riya','#FF5CA8','Lower Parel','{"like":["cafes","pottery","standup","sunset"],"nope":["clubs","treks"]}',true,true,true,true),
 ('00000000-0000-4000-8000-000000000002','Kabir','#2B44FF','Bandra','{"like":["speakeasy","livemusic","rooftop","streetfood"],"nope":["heritage"]}',true,true,true,true),
 ('00000000-0000-4000-8000-000000000003','Sana','#FFD60A','Khar','{"like":["cafes","dance","flea","rooftop"],"nope":["clubs"]}',true,true,true,true),
 ('00000000-0000-4000-8000-000000000004','Aman','#9AA8FF','Andheri','{"like":["streetfood","heritage","boardgames"],"nope":["speakeasy"]}',true,true,true,true),
 ('00000000-0000-4000-8000-000000000005','Dev','#111111','Powai','{"like":["boardgames","livemusic","pottery"],"nope":["clubs"]}',true,true,true,true),
 ('00000000-0000-4000-8000-000000000006','Meera','#FF9CCB','Dadar','{"like":["pottery","artcraft","cafes"],"nope":["streetfood"]}',true,true,true,true)
on conflict (id) do nothing;

-- ---------- helper functions ----------
create or replace function public.is_member(gid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from group_members where group_id = gid and user_id = auth.uid());
$$;

create or replace function public.shares_group(other uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from group_members a join group_members b on a.group_id = b.group_id
                 where a.user_id = auth.uid() and b.user_id = other);
$$;

create or replace function public.new_code() returns text
language sql volatile set search_path = public as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random()*32)::int, 1), '') from generate_series(1,6);
$$;

-- ---------- row level security ----------
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.places enable row level security;
alter table public.interests enable row level security;
alter table public.plans enable row level security;
alter table public.messages enable row level security;
alter table public.votes enable row level security;
alter table public.ratings enable row level security;
alter table public.ai_usage enable row level security;   -- no policies: only the server function can touch it

create policy "see self, bots and people you share a group with" on public.profiles for select to authenticated
  using (id = auth.uid() or is_bot or public.shares_group(id));
create policy "create own profile" on public.profiles for insert to authenticated
  with check (id = auth.uid() and is_bot = false);
create policy "edit own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid() and is_bot = false);

create policy "members see group" on public.groups for select to authenticated using (public.is_member(id));
create policy "members edit group" on public.groups for update to authenticated using (public.is_member(id)) with check (public.is_member(id));

create policy "members see members" on public.group_members for select to authenticated using (public.is_member(group_id));
create policy "leave a group" on public.group_members for delete to authenticated using (user_id = auth.uid());

create policy "members read places" on public.places for select to authenticated using (public.is_member(group_id));
create policy "members add places" on public.places for insert to authenticated with check (public.is_member(group_id) and added_by = auth.uid());
create policy "members update places" on public.places for update to authenticated using (public.is_member(group_id)) with check (public.is_member(group_id));
create policy "remove own places" on public.places for delete to authenticated using (public.is_member(group_id) and added_by = auth.uid());

create policy "members read interests" on public.interests for select to authenticated using (public.is_member(group_id));
create policy "mark own interest" on public.interests for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy "unmark own interest" on public.interests for delete to authenticated using (user_id = auth.uid());

create policy "members read plans" on public.plans for select to authenticated using (public.is_member(group_id));
create policy "members start plans" on public.plans for insert to authenticated with check (public.is_member(group_id) and created_by = auth.uid());
create policy "members update plans" on public.plans for update to authenticated using (public.is_member(group_id)) with check (public.is_member(group_id));

create policy "members read messages" on public.messages for select to authenticated using (public.is_member(group_id));
create policy "members post as themselves" on public.messages for insert to authenticated with check (public.is_member(group_id) and user_id = auth.uid());

create policy "members read votes" on public.votes for select to authenticated using (public.is_member(group_id));
create policy "cast own vote" on public.votes for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy "change own vote" on public.votes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "members read ratings" on public.ratings for select to authenticated using (public.is_member(group_id));
create policy "add own rating" on public.ratings for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy "change own rating" on public.ratings for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- actions the app calls ----------
create or replace function public.create_group(p_name text, p_color text) returns public.groups
language plpgsql security definer set search_path = public as $$
declare g groups;
begin
  if auth.uid() is null then raise exception 'Please sign in'; end if;
  insert into groups (name, color, invite_code, created_by) values (left(p_name, 40), coalesce(p_color,'#FF5CA8'), new_code(), auth.uid()) returning * into g;
  insert into group_members (group_id, user_id) values (g.id, auth.uid());
  return g;
end $$;

create or replace function public.join_group(p_code text) returns public.groups
language plpgsql security definer set search_path = public as $$
declare g groups;
begin
  if auth.uid() is null then raise exception 'Please sign in'; end if;
  select * into g from groups where invite_code = upper(trim(p_code)) and not is_personal;
  if g.id is null then raise exception 'No group with that code. Check the letters and try again.'; end if;
  insert into group_members (group_id, user_id) values (g.id, auth.uid()) on conflict do nothing;
  return g;
end $$;

-- Lets the app show "Join <group>?" before anyone is added. Reads only the group's name, colour and head-count for a valid invite code.
create or replace function public.peek_group(p_code text) returns json
language sql security definer set search_path = public stable as $$
  select json_build_object(
    'name', g.name, 'color', g.color,
    'members', (select count(*) from group_members m where m.group_id = g.id),
    'is_member', exists (select 1 from group_members m where m.group_id = g.id and m.user_id = auth.uid()))
  from groups g where g.invite_code = upper(trim(p_code)) and not g.is_personal limit 1
$$;
revoke all on function public.peek_group(text) from public;
grant execute on function public.peek_group(text) to authenticated;

-- Gives a new person their own copy of the demo groups (sent by the app, checked here).
create or replace function public.seed_demo(payload jsonb) returns void
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); gids uuid[]; allowed uuid[];
begin
  if uid is null then raise exception 'Please sign in'; end if;
  if exists (select 1 from profiles where id = uid and demo_seeded) then return; end if;
  allowed := array(select id from profiles where is_bot) || uid;
  gids := array(select (x->>'id')::uuid from jsonb_array_elements(payload->'groups') x);
  if array_length(gids,1) is null or array_length(gids,1) > 5 or exists (select 1 from groups where id = any(gids)) then raise exception 'bad seed'; end if;
  if exists (select 1 from jsonb_populate_recordset(null::group_members, payload->'members') m where not m.group_id = any(gids) or not m.user_id = any(allowed))
  or exists (select 1 from jsonb_populate_recordset(null::places, payload->'places') p where not p.group_id = any(gids) or not p.added_by = any(allowed))
  or exists (select 1 from jsonb_populate_recordset(null::messages, payload->'messages') m where not m.group_id = any(gids) or not m.user_id = any(allowed))
  or exists (select 1 from jsonb_populate_recordset(null::plans, payload->'plans') p where not p.group_id = any(gids) or not p.created_by = any(allowed))
  or exists (select 1 from jsonb_populate_recordset(null::interests, payload->'interests') i where not i.group_id = any(gids) or not i.user_id = any(allowed))
  then raise exception 'bad seed'; end if;

  insert into groups (id, name, color, invite_code, memory, is_personal, is_demo, created_by)
    select id, name, color, invite_code, coalesce(memory,'{}'), coalesce(is_personal,false), coalesce(is_demo,false), created_by
    from jsonb_populate_recordset(null::groups, payload->'groups');
  insert into group_members (group_id, user_id) select group_id, user_id from jsonb_populate_recordset(null::group_members, payload->'members');
  insert into places (id, group_id, name, area, category, price, note, lat, lng, source_kind, source_url, added_by, done, created_at)
    select id, group_id, name, coalesce(area,''), category, coalesce(price,''), coalesce(note,''), lat, lng, coalesce(source_kind,'manual'), source_url, added_by, coalesce(done,false), coalesce(created_at, now())
    from jsonb_populate_recordset(null::places, payload->'places');
  insert into interests (place_id, user_id, group_id) select place_id, user_id, group_id from jsonb_populate_recordset(null::interests, payload->'interests');
  insert into plans (id, group_id, created_by, title, status, options, prefs, chosen, place_id, date, time, who, created_at)
    select id, group_id, created_by, title, status, coalesce(options,'[]'), prefs, chosen, place_id, date, time, coalesce(who,'{}'), coalesce(created_at, now())
    from jsonb_populate_recordset(null::plans, payload->'plans');
  insert into messages (id, group_id, user_id, kind, body, data, created_at)
    select id, group_id, user_id, kind, coalesce(body,''), data, coalesce(created_at, now())
    from jsonb_populate_recordset(null::messages, payload->'messages');
  update profiles set demo_seeded = true where id = uid;
end $$;

-- Demo friends vote / reply in the caller's own groups only.
create or replace function public.bot_vote(p_plan uuid, p_bot uuid, p_ranking int[], p_vetoes int[]) returns void
language plpgsql security definer set search_path = public as $$
declare gid uuid;
begin
  select group_id into gid from plans where id = p_plan;
  if gid is null or not is_member(gid) then raise exception 'not allowed'; end if;
  if not exists (select 1 from profiles where id = p_bot and is_bot) or not exists (select 1 from group_members where group_id = gid and user_id = p_bot) then raise exception 'not a demo friend in this group'; end if;
  insert into votes (plan_id, user_id, group_id, ranking, vetoes) values (p_plan, p_bot, gid, coalesce(p_ranking,'{}'), coalesce(p_vetoes,'{}'))
  on conflict (plan_id, user_id) do update set ranking = excluded.ranking, vetoes = excluded.vetoes, created_at = now();
end $$;

create or replace function public.bot_message(p_group uuid, p_bot uuid, p_kind text, p_body text, p_data jsonb, p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not is_member(p_group) then raise exception 'not allowed'; end if;
  if p_kind <> 'text' or not exists (select 1 from profiles where id = p_bot and is_bot) or not exists (select 1 from group_members where group_id = p_group and user_id = p_bot) then raise exception 'not allowed'; end if;
  insert into messages (id, group_id, user_id, kind, body, data) values (coalesce(p_id, gen_random_uuid()), p_group, p_bot, 'text', left(p_body, 300), null);
end $$;

-- Daily AI allowance per person. Returns the new count, or -1 when the limit is reached. Server-only.
create or replace function public.bump_ai_usage(p_user uuid, p_limit int) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  insert into ai_usage (user_id, day, count) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set count = ai_usage.count + 1
  where ai_usage.count < p_limit
  returning count into n;
  return coalesce(n, -1);
end $$;
revoke execute on function public.bump_ai_usage(uuid, int) from public, anon, authenticated;

-- ---------- live updates ----------
alter publication supabase_realtime add table public.groups, public.group_members, public.places, public.interests, public.plans, public.messages, public.votes, public.ratings;

-- ---------- explicit permissions (newer Supabase projects require these for the API) ----------
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on public.profiles, public.groups, public.group_members, public.places,
  public.interests, public.plans, public.messages, public.votes, public.ratings to authenticated;
grant all on all tables in schema public to service_role;
grant execute on function public.is_member(uuid), public.shares_group(uuid), public.create_group(text, text),
  public.join_group(text), public.seed_demo(jsonb), public.bot_vote(uuid, uuid, int[], int[]),
  public.bot_message(uuid, uuid, text, text, jsonb, uuid) to authenticated;
grant execute on function public.bump_ai_usage(uuid, int) to service_role;
