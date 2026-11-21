-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Lets places use the new "Shopping" category (stores, boutiques, markets). Safe to run twice.
alter table public.places drop constraint if exists places_category_check;
alter table public.places add constraint places_category_check
  check (category in ('bars','cafe','food','sunset','shows','workshop','shop'));
