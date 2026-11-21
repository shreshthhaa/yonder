# Yonder: handoff for a new conversation

> **Demo groups (latest):** a new guest gets Office gang (Bengaluru: Indiranagar, Koramangala, Bellandur, Marathahalli), Shopping (Bengaluru ethnic wear, with Shruti), Thailand trip (Phuket and Krabi, with a vote in progress) and Bandra Bunch (Mumbai). Needs `supabase/migration-demo-groups.sql` (already run). Coordinates for the new places are approximate (typed from memory), so check store outlets before presenting. Existing guests keep their old copy.

> **Session 21 (latest):** every tab has its own address (`#/home`, `#/groups/<id>/<tab>`, `#/swipe`, `#/profile`) so Back/Forward work; invite links ask 'Join <group>?' first (SQL `supabase/migration-peek-group.sql`, already run in Supabase). Publish with `git push` then `sh tools/deploy_pages.sh`.

> **Session 21 (later): hosting moved to GitHub Pages.** Netlify's free plan is credit-based (300/month; each publish costs 15 to 24, and running out pauses the site). The site is now also served free from **https://shreshthhaa.github.io/yonder/** (repo `shreshthhaa/yonder`, branch `gh-pages`). To publish: commit, `git push`, then `sh tools/deploy_pages.sh`. The Netlify copy is frozen at an older version unless re-published. 'Plan this' now opens a who/when box and puts the place straight on the calendar (no AI, no vote). Tour Groups step is bullets.

> **Session 21 (21 Nov) changes, NOT YET DEPLOYED (also includes Session 20, which was published to Netlify only if you did it):** (1) **World map + any city:** MapLibre + OpenFreeMap (OpenStreetMap data), recoloured cream-and-blue like the old Mumbai map (zoom, pan, pins; mini preview in the Bucket tab; big map in a modal that opens on your saved area, with search, My area, All places and Surprise me). "Where are you usually?" is now a search (OpenStreetMap Nominatim), stored in `profiles.home_area` as `label|lat,lng|CC` (older plain area names still work). Places without coordinates are looked up in the background (`geocodePlaces`, ~1 per second) and saved. Budget chips follow the country's currency. AI prompts are no longer Mumbai-only. (2) **Tour = 4 steps starting on Home and ending back on Home** (taste swipe no longer in the tour). (3) **Shopping category (`shop`)** everywhere (mood, categories, taste card 'Boutiques & shopping', AI prompts). **Needs `supabase/migration-shopping.sql` run once in Supabase**, otherwise saving a shopping place fails. (4) Phone Groups tab now has **New group** and **Join** buttons (also on tablet widths). (5) Save-a-reel modal decluttered: removed the suggested reels and the 'Share → Yonder' tip. (6) Plan options show **Google Maps only** (no in-app map button). (7) **Plan results come in pages of 3 (max 3 pages, 9 ideas)** with 'Show 3 more' (the AI is told what was already shown); ideas can be ticked across pages (max 5) and sent to the group vote; solo planning has 'Lock this in' per idea. (8) AI function now has time limits (12 s per model for plans/questions, 30 s for big lists, 40 s for video; 30/60/75 s ceilings) so a busy model can't cause 100 s waits; Home 'Ideas you'd like' uses the AI outside Mumbai; Home also has a Taste swipe box. **To deploy:** (a) Supabase SQL Editor: run `supabase/migration-shopping.sql`; (b) re-deploy the AI function (`supabase/functions/ai/index.ts` into `super-worker`); (c) publish the `yonder` folder on Netlify (New version).

> **Session 20 (21 Nov) changes, NOT YET DEPLOYED:** (a) website: tour cut to 5 steps, Home plan banner with group chips (circle removed), clean slate for real sign-ups (`buildStarterSeed` in `data.js`; guests still get the demo groups), "Pick all N" in the save list, wheel swipe on laptop + Tinder stack on phone, Profile nav removed (avatar opens it), upload-a-reel-video in the save flow. **Deploy:** drag `yonder/` onto Netlify → Deploys. (b) AI function: `supabase/functions/ai/index.ts` now watches video (YouTube links natively; uploaded recordings as inline video) and tags where each place was found. **Deploy:** `pbcopy < supabase/functions/ai/index.ts`, paste into `super-worker`, Deploy updates → Confirm. The website works without (b), but the video features need it. (c) `dist/yonder.html` rebuilt for the backup artifact (not republished). **Not possible / not done:** reading an Instagram reel's own audio/video from a link (Instagram gives servers no video without login); I was blocked from probing it and did not work around that.

_Last updated: 21 Nov 2026. Read this first, then `groww-apm-assignment-log.md` (full decision log D1–D66 and session history) if you need detail._

---

## 1. What this project is

- **Groww APM placement assignment.** Brief: `Groww-assignment-brief.pdf`.
- **Idea:** friend groups save reels, links and places into shared bucket lists, and AI helps them decide on plans. Flow: **Save → Plan (AI suggests 3 options) → Vote → Go → "Did you go?" + 1–5★ rating**.
- **App name:** **Yonder** (earlier working name: Bucketful).
- **Deliverables and status:**

| # | Deliverable | Status |
|---|---|---|
| 1 | **1-pager (300–700 words)** | ❌ Not started. **Must be written by the user, not AI.** Claude may only give feedback or check facts |
| 2 | **Prompts used to build the tool** | ✅ Ongoing in `prompts.md`: build prompts 0.1–1.6, plus the app's 3 AI prompts |
| 3 | **Evals** | 🟡 `eval-set-reels.md` has 5 links (3 ✅, 2 🟡). Goal: 20–30 links + ~10 plan scenarios, using links not used in the demo |
| 4 | **Link to the app, open to evaluators** | ✅ **https://yonderapp.netlify.app** |

---

## 2. Links

- **Submission link (live):** https://yonderapp.netlify.app. It has real accounts, live AI and reads reel links. It's public (the Netlify site is set to public).
- **Backup demo (Claude artifact):** https://claude.ai/artifact/VKahZszTV1kmvP2ZFs8ADE. This is the demo version: no live AI, it reads only the built-in example links and pasted text, and each visitor gets their own copy. It's private until shared from its Share menu. It's rebuilt with `python3 tools/build_artifact.py` and republished from `dist/yonder.html`.
- **Old Stage 1 prototype (retired):** https://claude.ai/artifact/8fmGK8E4zoxotWLDuqZSEp. This was Bucketful.

---

## 3. Live stack (all free plans; the user's own accounts)

| Piece | Details |
|---|---|
| **Netlify** | Site **yonderapp** → `yonderapp.netlify.app`. Deployed by Netlify Drop (drag the `yonder/` folder). **To update:** drag `yonder/` onto the site's Deploys page |
| **Supabase** | Project **"Yonder"**, ref `ricxyozuvfaqepnkjdzh`, region Mumbai (ap-south-1), Free plan. Dashboard: `https://supabase.com/dashboard/project/ricxyozuvfaqepnkjdzh` |
| Database | `supabase/schema.sql` already run (tables, row-level security, invite codes, demo seeding, bot votes, daily AI limit, explicit grants) |
| Auth settings | Anonymous sign-ins **ON** (powers "Try it now"); Confirm email **OFF**; Site URL = `https://yonderapp.netlify.app` |
| AI server function | Edge Function named **`super-worker`** (not "ai"; the app's config points to it). Code = `supabase/functions/ai/index.ts`. **"Verify JWT with legacy secret" is OFF**: the code checks the user itself, and the project uses the newer keys |
| Function secrets | `GEMINI_API_KEY` (user's free Google AI Studio key: **never ask for it or paste it in chat**) and `GEMINI_MODEL=gemini-3.5-flash-lite` |
| AI | Google **Gemini free tier**. The function asks Google which Flash models exist, tries `GEMINI_MODEL` first, skips busy (503), rate-limited (429) or missing (404) models after ≤20 s, and uses "low thinking". Claude is still supported if `ANTHROPIC_API_KEY` is ever added (the user chose free, so not used) |
| Website config | `yonder/config.js` holds the Supabase URL + **public anon key** (safe to be public) + `aiFunction: 'super-worker'` |

**Measured on the live link (21 Nov):**
- **Plan with AI:** about 8 s.
- **Reel link read:** about 4 s.
- **Ask:** about 8 s.

Each AI reply includes a `timing` object (link fetch ms + each model attempt) for debugging.

**Known limits / upkeep:**
- **Supabase pauses a free project after about 7 days with no visits.** Restore it from the dashboard with one click (Supabase emails first).
- **The Gemini free tier has a daily limit and is often "busy".** The app falls back to "quick picks" (rule-based ranking) and labels them as such.
- **Instagram sometimes shows a login wall to servers**, and **very long captions can be cut short** in the public preview. In both cases the app asks "Which place was it?" or the user pastes the caption.
- **Google retires Gemini model names over time:** 2.5 models are "no longer available to new users". The model discovery code handles this.

---

## 4. Files (project root: `Groww-APM-Assignment/`)

| Path | What |
|---|---|
| `yonder/` | **The website** (what's on Netlify): `index.html`, `app.js` (UI), `data.js` (reference data, demo seed, data layer for local demo + Supabase), `styles.css`, `config.js`, `logo.svg`, icons, `manifest.webmanifest` (installable; Android "Share → Yonder"), `sw.js` |
| `supabase/schema.sql` | Database (already applied) |
| `supabase/functions/ai/index.ts` | AI server function (deployed as `super-worker`). Holds the **3 AI prompts**: `EXTRACT_SYSTEM`, `ASK_SYSTEM`, `PLAN_SYSTEM` |
| `tools/build_artifact.py` → `dist/yonder.html` | Bundles the demo version into one page for the Claude-artifact backup |
| `prompts.md` | Deliverable #2: every build prompt + the app's AI prompts |
| `eval-set-reels.md` | Deliverable #3 (started) |
| `groww-apm-assignment-log.md` | Running log: decisions, open questions, parked items, rejected ideas, enhancements, session history (Sessions 1–19) |
| `yonder-setup.md` | Free set-up guide (marked done; has the status line) |
| `market-research.md`, `scope-and-flow.md`, `user-story.md`, `app-flow.html` | Earlier research and scope docs |
| `bucketful.html` | Old Stage 1 prototype (retired) |
| `.claude/launch.json` | Local preview server: `python3 -m http.server 8765` serving `yonder/` |

**Note:** with `config.js` filled in, opening `yonder/` locally also talks to the live Supabase. For a pure offline demo, empty `supabaseUrl` and `supabaseAnonKey`.

---

## 5. What the app does (current features)

- **Login:**
  - **"Try it now":** a guest (Supabase anonymous auth) gets their own copy of 2 demo groups.
  - **Email + password** sign-up / log-in.
- **Walkthrough:**
  - First sign-in asks for your usual area.
  - A welcome card (Save → Plan → Go), then a 9-step spotlight tour.
  - The **Tour** button replays it.
- **Home:**
  - "Did you go?" strip.
  - Coming up + a nudge for groups with nothing planned.
  - Near you (from your home area).
  - Start planning.
  - Just saved.
  - New for you (from taste swipe).
  - Your groups.
- **Groups:** 3 columns.
  - **Left:** groups + "Just me", New group, Join with code.
  - **Middle:** chat. "Send reels here" hint; **Save a reel** button; pasting a link in chat opens the save flow.
  - **Right:** wider panel with **3 big labelled tabs: Plan with AI · Bucket list · Calendar**.
- **Save a reel:**
  - Paste an Instagram / YouTube / Google Maps link or any text list → the server reads the public preview → AI extracts places as `sure` / `partial`.
  - "Which place was it?" for partial ones.
  - Big guides open as a searchable **pick-list grouped by section**, nothing pre-ticked.
  - Duplicates are marked "Already saved".
  - Save to several groups at once.
  - Demo mode has a list parser and the 5 eval links built in (incl. the 91-place Bandra West guide).
- **Plan with AI:**
  - **Multi-select form:** who's coming, when, moods, budget, where, list/new/both, group memory as tickable reminders, free text.
  - **Result:** 3 options with personal "why" → **Send all 3 to a group vote**.
  - **Vote:** tap to rank 1-2-3, plus "Doesn't work for me".
  - **Demo friends vote automatically** → plan locked → system message → calendar with reminders.
  - A separate "Just ask" box.
- **Bucket list:**
  - **Pins-only map preview** (no labels, no expand icon); tap opens the big map with names.
  - Category filters.
  - Place rows: Google Maps, I'm interested, Plan this, Original post, Remove (own only).
- **Calendar:**
  - Month grid (this group pink, other groups grey).
  - Upcoming with reminders.
  - Sticky note "Let's plan something together!" pointing at the most-wanted saved place.
- **"Did you go?" → 1–5★** rating. It saves to the group's memory ("Loved X (4/5)"), which feeds future AI plans.
- **Taste swipe:**
  - **Laptop:** browse left/right with cards visible on both sides, drag **up = love it**, **down = not for me**, Skip, arrow keys.
  - **Phone:** scroll to browse, swipe **right = love**, **left = not for me**.
  - Poster art (no emoji).
- **Profile:** your own profile only (no "Viewing as"); name, area, colour, taste, groups with codes, places rated, privacy note, replay tour, log out.
- **Look (v2):** neo-brutalist. Yellow `#FFD60A`, cobalt `#2B44FF`, pink `#FF5CA8`, black, white. Archivo (headings) + Space Grotesk (body). Thick borders, hard shadows, chunky pressed buttons, vibration on phones. Old v1 look is recorded in log D58.

---

## 6. What's next (agreed order)

1. **User:** open https://yonderapp.netlify.app in a private window (laptop + phone) as a final check before submitting.
2. **Success metrics:** not done yet. Earlier ideas: % of saved places actually visited, time to agree on a plan, plans confirmed per group per month, share → save conversion.
3. **Eval set:**
   - **Links:** grow `eval-set-reels.md` to 20–30 links (mix of reels, carousels, Hinglish captions, YouTube, Google Maps) not used in the demo. Run them through the live extractor and record found vs expected places, plus time.
   - **Plan scenarios:** add about 10 plan scenarios (constraints like vegetarian, doesn't drink, budget, someone away) and grade the 3 options.
   - **Timings:** the `timing` field in AI replies helps.
4. **Research still on the user:** 4 more friend chats + Reddit searches (`market-research.md` §6).
5. **1-pager:** written **by the user**.
6. Keep logging: every build prompt in `prompts.md`; a session entry + decisions in the log.

**Parked / ideas for later:**
- WhatsApp bot capture.
- Location notifications near saved places.
- Seeing other evaluators' copies (not needed).
- Booking partners (District / Zomato).

---

## 7. How to work with this user

- **Explanations:** plain, simple language; step-by-step guidance; explain *why* when something can't be done.
- **Free only:** not commercial; for evaluators and testers.
- **Doing their part:** prefers Claude to do the work, but the user does their own sign-ins and pastes secret keys. **Never ask for passwords or API keys in chat.**
- **Pasting into web editors:** the browser pane can't read the Mac clipboard for Claude. Put text on the clipboard with `pbcopy < file` and ask the user to click and press **Cmd+A, Cmd+V**. The Supabase **Deploy updates** button opens a **"Confirm to deploy updates"** dialog that also needs clicking.
- **Testing:** test changes in the browser before saying they're done.
- **Privacy:** keep the user's personal details private.
- **Constraints:** never ask for Instagram passwords; only read public link previews.

---

## 8. Quick recipes

- **Change the website:**
  1. Edit `yonder/*`.
  2. Bump `?v=N` in `yonder/index.html`.
  3. Test locally (`preview_start` "yonder" → http://localhost:8765).
  4. Have the user drag `yonder/` onto Netlify → Deploys.
- **Change the AI function:**
  1. Edit `supabase/functions/ai/index.ts`.
  2. `pbcopy < supabase/functions/ai/index.ts`.
  3. Open `…/functions/super-worker/code`; the user pastes (Cmd+A, Cmd+V).
  4. Click Deploy updates → Confirm.
  5. Test with `Y.api.ai('ask'|'plan'|'extract', {...})` in the live site's console and read `timing`.
- **Update the backup demo:** `python3 tools/build_artifact.py`, then republish `dist/yonder.html` to the same artifact URL.
