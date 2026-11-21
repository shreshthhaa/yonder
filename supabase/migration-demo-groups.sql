-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run twice.
-- Demo friend Shruti (for the Shopping demo group), and Bengaluru home areas for Dev and Meera (Office gang).
insert into public.profiles (id, name, color, home_area, taste, is_bot, onboarded, tour_done, demo_seeded) values
 ('00000000-0000-4000-8000-000000000007','Shruti','#FFD60A','Jayanagar, Bengaluru, India|12.9250,77.5938|IN','{"like":["shopping","artcraft","flea","cafes"],"nope":["clubs"]}',true,true,true,true)
on conflict (id) do nothing;
update public.profiles set home_area = 'Bellandur, Bengaluru, India|12.9352,77.6701|IN' where id = '00000000-0000-4000-8000-000000000005';
update public.profiles set home_area = 'Koramangala, Bengaluru, India|12.9352,77.6245|IN' where id = '00000000-0000-4000-8000-000000000006';
