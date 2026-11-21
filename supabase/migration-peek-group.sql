-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run twice.
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
