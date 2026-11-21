# Yonder

Friend groups save reels, links and places into a shared bucket list, then use AI to plan, vote, go and rate.
**Save → Plan (AI gives ideas) → Vote → Go → Rate.**

Live: https://yonderapp.netlify.app

## What's here
- `yonder/` – the website (plain HTML, CSS and JavaScript; no build step). Maps use MapLibre with OpenFreeMap / OpenStreetMap data.
- `supabase/schema.sql` – database tables, access rules, invite codes, demo seed.
- `supabase/migration-shopping.sql` – adds the Shopping category to an existing database.
- `supabase/functions/ai/index.ts` – the AI server function (Gemini) with the three prompts: plan, ask, extract.
- `prompts.md`, `eval-set-reels.md` – prompts used to build it, and the test links for reel reading.
- `HANDOFF.md`, `groww-apm-assignment-log.md`, `scope-and-flow.md`, `user-story.md`, `market-research.md` – project notes.
- `dist/yonder.html` – a single-file demo build (no server, no live AI).

## Run it
- Demo on your computer: open `yonder/index.html` with the config values empty in `yonder/config.js`.
- Real setup (accounts, shared groups, live AI): follow `yonder-setup.md`. It uses free tiers of Supabase, Google AI Studio (Gemini) and Netlify.

The Supabase anon key in `yonder/config.js` is public by design; the database rules protect the data. The Gemini key lives only as a Supabase secret and is not in this repo.
