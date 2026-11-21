# Groww APM Assignment — Working Log

_Running record of the conversation: decisions, open questions, parked topics, rejected ideas and future enhancements. Updated each session._

Last updated: 20 Nov 2026 (Session 13)

**Files in this folder:** `groww-apm-assignment-log.md` (this log) · `market-research.md` (competitor and market deep dive) · `eval-set-reels.md` (link-reading eval set) · `scope-and-flow.md` (scope + screen-by-screen flow) · `user-story.md` · `app-flow.html` (visual flow, also published) · `prompts.md` (deliverable #2 template) · `Groww-assignment-brief.pdf`

---

## 1. The assignment (from Groww.pdf)

**Brief:** Pick a real problem you've seen up close and design a digital app to solve it. Choose something you or someone you know has experienced repeatedly, not something you only know from articles or social media.

**What they want to see:** How you think: who has the problem, why it matters, why an app is the right fix. State your assumptions, and separate what you **verified** (even a 10-minute conversation counts) from what you're **guessing**.

**Deliverables:**
1. A 1-page write-up (~300–700 words) **in your own words** (must not be AI-written) covering:
   a. Your take on the problem
   b. In scope
   c. Out of scope
   d. Your solution and why
2. The prompts used to create the tool
3. The evals used to test the solution
4. A link to the working app (Claude, Lovable, Bolt or similar), with access open to them

**Notes from the brief:** You won't be judged on domain knowledge, so a non-fintech problem is fine.

> ⚠️ Reminder: The 1-pager has to be written by you. This log is your thinking material; the final page should be in your own voice.
> 💡 This log also helps with deliverable #2 (prompts used), so keep it.

---

## 2. The problem (as described by you, Session 1)

**Problem 1: Scattered recommendations.** People keep finding places, restaurants, activities and experiences on Instagram, YouTube and other platforms. They share them with friends ("we should go here someday"), but these end up spread across chats, saved posts and different apps. They get forgotten, never acted on, or can't be found when actually needed.

**Problem 2: Group decision paralysis.** When a group does want to make a plan, deciding is hard. People have different interests, budgets, locations and constraints. The group goes back and forth, often never decides, or falls back on the same repeated plan nobody really wanted.

**The idea:** An app that is a **shared memory + decision-making platform for groups**.
- Create groups with friends.
- Share reels, videos, links and locations into the group (cafés, events, shopping spots, activities and so on).
- The app identifies and organises each item: place or activity, location, category, who shared it, and other details. This builds a shared "want to do" collection.
- At planning time, members enter current preferences (budget, location, interests, date, type of outing).
- The app combines those preferences with the saved collection to recommend options that work for the whole group.

**Goal:** Help groups discover, save, organise and actually experience things together, and make deciding faster and easier.

---

## 3. Analysis: pros, cons and tradeoffs (Session 1)

### Pros
| # | Pro | Why it matters |
|---|-----|----------------|
| P1 | It's a real, personal, frequent problem | Matches the brief's "seen up close" test, and is easy to verify by talking to friends |
| P2 | It fits a habit people already have | People already share reels to friends. The app captures that habit instead of creating a new one |
| P3 | It has two clear "moments" | Save moment (scrolling) and decide moment (planning). Each is easy to explain and demo |
| P4 | It grows through groups | Every group brings in friends, so growth can happen by invitation |
| P5 | AI is genuinely useful here, not decoration | Pulling the place out of a messy reel or caption, and matching many people's preferences, are hard by hand. This also makes the evals deliverable easy to show |
| P6 | Low stakes, no money or sensitive data | Easier trust, fewer compliance worries for a v1 |
| P7 | Works well as a demo | A Lovable/Bolt prototype can show save → organise → plan in a two-minute walkthrough |

### Cons and risks
| # | Con / risk | Severity | Note |
|---|------------|----------|------|
| C1 | **Competing with WhatsApp.** Sharing into a WhatsApp group is one tap and everyone is already there | High | The app must be almost as easy, or people won't switch. This is the #1 risk |
| C2 | **Cold start.** Planning only helps once enough things are saved, and only once friends have joined | High | An empty group gives no value. Single-player value (personal saving) helps |
| C3 | **Extraction is hard.** Many reels name the place only in audio, on-screen text or a vague caption ("this hidden gem in Bandra 😍"). Captions may be in Hinglish | High | Expect errors, so users need an easy way to correct them |
| C4 | **Platform limits.** Instagram limits automated reading of reels, and its APIs have been cut back over time. YouTube is more open | Medium–High | The prototype should rely on link + caption + user confirmation, not scraping |
| C5 | **Low-frequency use.** Groups plan maybe weekly or monthly, so people may forget the app exists | Medium | Retention risk. Reminders and "saved place near you" nudges can help (with privacy cost) |
| C6 | **Same problem moved into the app.** Asking every member to fill in preferences recreates the "waiting on everyone to reply" problem | Medium | Keep inputs to a few taps, allow defaults, let the organiser go ahead without everyone |
| C7 | **Stale data.** Events expire, places close, prices change | Medium | Needs expiry dates on events and live place data |
| C8 | **Two products in one.** A saver and a planner is a lot for one prototype | Medium | Risk of doing both shallowly. Scope must be tight |
| C9 | **No clear business model yet** | Low for the assignment | Worth one line in the 1-pager, not more |
| C10 | **Crowded market, and big platforms are close** (added Session 2 after research) | Medium–High | Dozens of reel-to-place apps; Instagram has Collaborative Collections + Map; Google Maps has collab lists + voting; District (Zomato) has Hotlist. See `market-research.md` |

### How to tackle each risk (Session 2)
| Risk | What to do about it | What to show in the prototype / write-up |
|------|---------------------|------------------------------------------|
| **C1 WhatsApp** | Don't fight WhatsApp, plug into it. Save via the share button (real app) or forwarding to a WhatsApp bot (later). Invite friends by WhatsApp link. Send the final plan back to the WhatsApp group. Let friends vote from a link without installing (as Tine and Chewsr do) | Target: saving takes under 5 seconds. Show a "Share plan to WhatsApp" button |
| **C2 Cold start** | Make it useful alone first (personal saves). Allow pasting several old links at once to fill it up fast. If a group's list is thin, top up with a few curated popular places in the city. Non-installers can still vote. Design for one "planner friend" per group who does most of the work | Show one person getting value before anyone else joins |
| **C3 Extraction errors** | AI suggests, user confirms with one tap. If unsure, ask "Which of these 2 places?" instead of guessing. Always allow typing the name manually. Match the name against a maps service to get the real address | **Build your evals here:** a test set of 30–50 real reels/links (incl. Hinglish captions, vague captions, multi-place reels). Measure % correctly identified |
| **C4 Platform limits** | Only use what's public (link preview, caption, title) plus what the user types. Never scrape, never ask for Instagram login. The app must still work if a platform gives back nothing | Write-up: "designed to degrade gracefully" (if the link reveals nothing, the user types the name) |
| **C5 Low frequency** | Accept it: it's a utility used around plans, like a travel app. Use well-timed nudges: a Thursday "plan your weekend? 3 saved places near you" message, event-ending reminders. Cap notifications | Pick the right success metric: **plans completed per group per month** and **% of saved places actually visited**, not daily active users |
| **C6 Preference fatigue** | The organiser sets date, area and budget. Others give 2–3 taps (mood, veg, max travel) or skip. Remember last time's answers as defaults. Set a voting deadline: "closes in 2 hrs, no vote = fine with anything" | Show the plan flow in under 1 minute per person |
| **C7 Stale data** | Refresh place details (open/closed, hours, price) when a plan is made, not only when saved. Events get an end date and auto-archive. Anyone can mark "closed / not worth it" | Show an "ended" tag on an expired event |
| **C8 Two products in one** | Build one thin end-to-end path: save → auto-organise → plan → shortlist → vote. Make **the decision step the hero** (research shows capture is crowded). Cut everything else to "later" | Clear in-scope / out-of-scope list in the 1-pager |
| **C9 Business model** | One line only: commission on bookings (e.g. via District/restaurant reservations), sponsored "featured" places (careful with trust), or bill-splitting/payments (Groww link) | One line in the 1-pager or keep for the interview |
| **C10 Competition** | Position on the gap: **the group's own saved list → a decision**, for **everyday local outings in India**. Explain why big platforms are unlikely to do it well: Instagram and Google want you to stay in their app, and neither handles WhatsApp-first groups, Hinglish or budget-led planning | One or two lines in the 1-pager: "What exists and why it's not enough" |

### Key tradeoffs (decisions still to make)
| # | Tradeoff | Option A | Option B | Initial recommendation |
|---|----------|----------|----------|------------------------|
| T1 | **How things get in** | Share button from Instagram/YouTube (lowest friction, needs a native app) | Paste a link in the app (easy to build, one extra step) | Paste link for the prototype; describe the share button as the real-product plan. (A WhatsApp-bot option is listed under enhancements) |
| T2 | **Organising** | Fully automatic AI extraction | User tags everything manually | Hybrid: AI fills in the details, user confirms or edits in one tap |
| T3 | **Who it's for first** | Group-first (must invite friends to get value) | Personal-first (useful alone, then share with groups) | Personal-first with groups on top, to soften cold start (C2) |
| T4 | **Where suggestions come from** | Only the group's saved items (true to "shared memory") | Saved items plus new places from Google Maps and similar | Saved items first; outside suggestions only as a fallback when nothing fits |
| T5 | **Final decision** | AI picks one answer | AI gives a ranked shortlist and the group votes | Shortlist (top 3) plus a quick vote: keeps people in control and explains the reasoning |
| T6 | **Preference input** | Every member fills a form | Organiser sets the constraints, members just react | Organiser sets basics (date, area, budget); members optionally add a few taps of input |
| T7 | **Breadth vs depth** | Cover all categories (food, events, shopping, trips) | Go deep on 1–2 (e.g. food and cafés, weekend activities) | Go deep on 1–2 categories for the prototype |
| T8 | **Native app vs web app** | Native (share button, notifications, location) | Web (what Lovable/Bolt produce, quick to share) | Web prototype for the assignment, explain the native features in the write-up |
| T9 | **Visibility in a group** | Everyone sees who shared what | Anonymous adds and votes | Show who shared (social proof, "Riya wanted this"); keep votes anonymous during planning |

---

## 4. Data required (Session 1)

**User & groups**
- Name, phone number or email (for login), optional profile photo
- Groups: name, members, admin/organiser, invite link

**Saved item (the core record)**
- Source link, platform (Instagram/YouTube/Google Maps/other), thumbnail, caption/title text
- Extracted: place or activity name, category (café, restaurant, event, shopping, activity…), area/address, map coordinates
- Enriched (from a maps/places service): rating, price range, opening hours, photos
- For events: date, time, ticket link, expiry
- Who shared it, when, which group, optional note ("for someone's birthday")
- Status: want to go / been there / not interested; reactions ("I'm in")
- Extraction confidence and whether the user confirmed it (useful for evals)

**Planning session**
- Date and time window, area or starting points, budget per person, type of outing, interests or mood, constraints (veg-only, alcohol, accessibility, travel time)
- Who responded, votes, final choice
- Afterwards: did the group go? Did they like it? (improves future suggestions and is a success metric)

**Usage data (for measuring success)**
- Items saved per user/group, % confirmed vs corrected, plans started vs completed, time from "start plan" to decision, % of saved items actually visited

---

## 5. Permissions required (Session 1)

| Permission | Needed? | Why | Recommendation |
|------------|---------|-----|----------------|
| Account login (phone OTP / Google) | Must-have | Identity, groups, syncing | Phone OTP is the norm in India |
| Share-sheet integration (receive links from other apps) | Must-have for the real native app | Lowest-friction capture | Not an OS pop-up, but needs a native app. Not possible in the web prototype |
| Location ("while using the app") | Optional | Distance/travel time for suggestions | Ask only when the user starts a plan; allow typing an area instead. Never ask during onboarding |
| Background location | Avoid in v1 | "You're near a saved place" alerts | High privacy cost and battery use; park as an enhancement |
| Contacts | Avoid | Finding friends | Use a WhatsApp invite link instead: no permission needed, more trust |
| Notifications | Optional (recommended) | "X added a place", vote reminders, event expiry | Ask after the user joins or creates a group, when the value is clear |
| Calendar | Later | Check availability, add the final plan to calendars | Park as an enhancement |
| Clipboard | Optional | Detect a copied link and offer to save it | iOS shows a paste prompt; nice-to-have |
| Photos / media | Later | Save screenshots of places | Park; screenshot extraction is a harder AI problem |
| Instagram / YouTube account login | Avoid | — | Not needed. Public link metadata is enough; asking for Instagram login lowers trust and its personal-account API has been retired |

**Third-party services (no user permission needed, but have limits and cost)**
- Link preview / metadata (title, caption, thumbnail): YouTube is fairly open; Instagram is restricted
- Maps/places service (e.g. Google Places) for address, rating, price, hours: paid per request
- AI model for extraction and matching: cost per request; must be tested (evals)

**Privacy & compliance**
- India's Digital Personal Data Protection (DPDP) Act applies: clear consent, collect only what's needed, let users delete their data
- Location and contacts are the sensitive ones, hence "optional and asked in context"

---

## 6. Decisions log

| # | Decision | Status | Session |
|---|----------|--------|---------|
| D1 | Problem space: scattered recommendations + group plan paralysis | ✅ Decided | 1 |
| D2 | Concept: shared memory + group decision platform | ✅ Decided | 1 |
| D3 | We approach this as a Product Manager (thinking, scope, tradeoffs), not as engineers | ✅ Decided | 1 |
| D4 | Final 1-pager will be written by you, in your own words | ✅ Required by brief | 1 |
| D5 | Recommendations T1–T9 in Section 3 | ⏳ Proposed, awaiting your call | 1 |
| D6 | Market research done (desk research; Reddit not reachable by my tools). Findings in `market-research.md` | ✅ Done | 2 |
| D7 | Make the **decision step** the hero of the product, since capture is crowded | ⏳ Proposed, awaiting your call | 2 |
| D8 | All work files kept together in a new project folder | ✅ Done | 2 |
| D9 | **Stick with this idea or brainstorm a new one?** Recommendation: stick with it, sharpened (narrow user, decision step as hero), and switch only if the friend check (Q13) fails | ⏳ Recommended, awaiting your call | 3 |
| D10 | Friend check: your own answers confirm both problems (1 of 5 done) | ✅ Recorded | 4 |
| D11 | ~~Screenshot + typed name as the main capture method~~ → replaced by D12 after your feedback | ❌ Superseded | 4 |
| D12 | **Saving must happen without leaving Instagram**, with about the same effort as sending a reel to a friend (your requirement) | ✅ Decided | 5 |
| D13 | Capture = share menu + "save now, confirm later"; prototype simulates the share pop-up | ⏳ Recommended, awaiting your call | 5 |
| D14 | ~~App gets only the link, so auto-identification is a bonus~~ → corrected by D15 after testing real links | ❌ Superseded | 7 |
| D15 | Captions are **often** readable (3/5 fully identified in testing). Capture = share pop-up **auto-fills found places (tick/untick)**; fallback = quick pick or "Tell you later". Handle one link → many places | ⏳ Recommended, awaiting your call | 8 |
| D16 | Users: friend groups of 3–6 + individuals, ages ~18–35; plans are per city; product covers **all of India**; demo data = Mumbai | ✅ Decided (you) | 10 |
| D17 | **All categories**, organised into a fixed category list (`scope-and-flow.md` §3) | ✅ Decided (you) / list proposed | 10 |
| D18 | **No single organiser**: any member starts a plan via a **planning thread with the AI**, visible to all | ✅ Decided (you) | 10 |
| D19 | **WhatsApp not part of the product**; only one of the places to share invite links. Replaces the WhatsApp-bot ideas and "send plan to WhatsApp" | ✅ Decided (you) | 10 |
| D20 | Join via link or code; contacts invite optional, never required | ✅ Decided (you) | 10 |
| D21 | Capture from any source: Instagram, YouTube, Pinterest, any link, or plain text lists; save to one or more groups | ✅ Decided (you) | 10 |
| D22 | Two recommendation types: ① from saved places ② new things that fit now | ✅ Decided (you) | 10 |
| D23 | Final plan card stays in the app, with links out for booking/tickets; "Did you go?" crosses items off | ✅ Decided (you) | 10 |
| D24 | Group bucket list: map (pins) + list (by category) | ✅ Decided (you) | 10 |
| D25 | Out for now: booking, payments, bill split, calendar sync, ~~in-app chat~~ (chat now in, see D27) | ✅ Decided (you), updated S11 | 10 |
| D26 | Scope tiers 🟢/🟡/⚪ as in `scope-and-flow.md` §2 | ⏳ Proposed, awaiting your call | 10 |
| D27 | **In-app group chat is IN** (reverses part of D25): shared items appear as cards in the chat; replies/reactions; **@AI** brings in the bot; the planning thread merges into the chat. Keep it light, no WhatsApp-style extras | ✅ Decided (you) | 11 |
| D28 | **Several plans at once** + **group calendar** view + **plan reminders** (no external calendar sync) | ✅ Decided (you) | 11 |
| D29 | Voting = **ranked** (3/2/1 points; tie → most 1st places → AI fit score) + "Doesn't work for me" flag | ✅ Decided (you, flag confirmed S12) | 11 |
| D30 | Leaving member's saves **stay** in the group; their 👍/votes stop counting; name removed if they delete their account | ✅ Decided (you leaned this way S11; rule adopted) | 11 |
| D31 | **Taste swipe moved into the prototype** (🟢) | ✅ Decided (you) | 11 |
| D32 | Group has **4 tabs: Chat · Plan · Bucket list (with map toggle) · Calendar**. AI lives only in the **Plan** tab (replaces @AI in the main chat from D27) | ✅ Decided (you) | 12 |
| D33 | New plans start with **tap-to-answer questions** (who's coming, when, what kind, budget, where, must-haves, ideas from) + free text | ✅ Decided (you) / extra questions proposed | 12 |
| D34 | **Plans only count the people coming** (their preferences, 👍s, votes); only they vote | ✅ Decided (you) / voting part proposed | 12 |
| D35 | Edit/delete **only your own** items | ✅ Decided (you) | 12 |
| D36 | AI **remembers group preferences**, shown in a list each person can edit for themselves | ✅ Decided (you) | 12 |
| D37 | People not coming can **see** a plan but don't vote | ✅ Decided (you) | 13 |
| D38 | Plan tab has a quick **"Ask"** box for questions that aren't a full plan | ✅ Decided (you) | 13 |
| D39 | ~~Build in stages with Lovable~~ → superseded by D40 | ❌ Superseded | 13 |
| D40 | **Claude builds the app** (not Lovable) and publishes it as a shareable Claude link, in stages. Your messages to Claude count as the build prompts and go in `prompts.md` | ✅ Agreed | 14 |
| D41 | Build first (step 4), then success metrics and the bigger eval set (step 3) | ✅ Agreed | 14 |
| D42 | Screen layout follows your sketches: groups list on the left, group chat in the middle, a side panel that switches between AI · Bucket list (map + categories) · Calendar. Replaces the 4 separate tabs in D32 | ✅ Agreed | 14 |
| D43 | Real AI inside the app (Claude, called from the page) for reading captions/lists and for plan suggestions, with a scripted fallback if a viewer can't use it. It runs inside the page (no redirect), but uses the viewer's own Claude account and asks once for permission | ✅ Agreed | 14 |
| D44 | Demo data is per-viewer (each evaluator gets their own fresh copy of Bandra Bunch, plus a reset button), with a "Viewing as" switch to act as Riya, Kabir, Sana or Aman | ✅ Agreed | 14 |
| D45 | Desktop-first as sketched; on a phone the side panel becomes tabs. The share pop-up is shown inside a phone frame over a mock Instagram screen | ✅ Laptop agreed; phone decided later | 14 |
| D46 | Every place (pin, list, plan) has **Open in Google Maps**, like a WhatsApp location | ✅ Agreed | 15 |
| D47 | People with no reels to share can **ask the AI for ideas**; every group chat shows a clear "Send reels here" hint | ✅ Agreed | 15 |
| D48 | After "Did you go?" → Yes, one quick question: **"How did you like it?" 1–5 stars**. No questionnaire | ✅ Agreed | 15 |
| D49 | Working name: **Bucketful**. Look: vibrant, catchy, friendly, not corporate | ✅ Agreed (name may change) | 15 |
| D50 | In the prototype, links can't be read by the page itself (the browser blocks it). The 5 tested links use captions we already read; pasted caption/list text goes to the real AI. In the real product a server reads link previews from Instagram, YouTube, Pinterest etc. | ✅ Noted | 15 |
| D51 | Build a **real website**, not just a prototype: real accounts, shared groups, live updates and its own AI server. Stack: **Supabase** (login, database, live updates, AI server function, free tier) + a static site host (Netlify). Without the server it still runs as a "demo on this device" | ✅ Your call | 16 |
| D52 | **AI runs on Yonder's own server with the app's own Anthropic API key**, not the visitor's Claude account (replaces D43). Nobody needs Claude to use the app. Cost control: a daily limit per person (40 AI calls by default) plus a spending cap set in the Anthropic console. If the AI is busy or the limit is hit, the app falls back to "quick picks" from the bucket list | ✅ Your call | 16 |
| D53 | **Removed "Viewing as".** Everyone sees only their own profile. To show group features to an evaluator, each new person gets their own copy of 2 demo groups with demo friends (Riya, Kabir, Sana, Aman · Dev, Meera) who vote and reply automatically (replaces D44) | ✅ Your call | 16 |
| D54 | **Login:** "Try it now" as a guest (one tap, own demo copy) + email & password sign-up. Invite friends with a link or 6-letter code (no contacts needed) | ✅ Agreed | 16 |
| D55 | **Walkthrough:** welcome card (Save → Plan → Go) + a 9-step spotlight tour over the real screens on first login; "Tour" button at the top replays it | ✅ Your call | 16 |
| D56 | **Map preview:** small map with pins only (no names, no expand icon). Tap it to open the big map with area names and place names | ✅ Your call | 16 |
| D57 | **Taste swipe:** laptop: browse left/right with cards visible on both sides, drag up = love it, down = not for me, Skip allowed. Phone: scroll down to browse, swipe right = love it, left = not for me. Nothing forces an answer. Emoji replaced with bold poster art | ✅ Your call | 16 |
| D58 | **New look (v2):** yellow, cobalt blue, pink, black, white · bold sans (Archivo + Space Grotesk) · thick borders, hard shadows, asymmetric grid · chunky buttons that visibly press · vibration on phones. Old look (v1, Bucketful) kept on record: Bricolage Grotesque + Plus Jakarta Sans; pink, yellow, teal, violet, orange, sky on a lavender-white background | ✅ Your call | 16 |
| D59 | **Plan with AI is now a multi-select form:** who's coming, when, mood (several), budget, where (several), ideas from list/new/both, the group's memory as tickable reminders, and "anything else" free text → one button → 3 options → group vote. A separate "just ask" box stays for quick questions | ✅ Your call | 16 |
| D60 | **Panel tabs made obvious:** 3 big labelled, coloured tabs (Plan with AI · Bucket list · Calendar) with a one-line status each; the panel is now wider than the chat. Opens on Plan with AI | ✅ Your call | 16 |
| D61 | **Name: Yonder**, with a logo (pin with a sunset on a cobalt tile) | ✅ Your call | 16 |
| D62 | **Reading links:** the server reads public link previews only (YouTube title via YouTube's public oEmbed, Instagram's public preview text, Google Maps place names). Never logs in, never asks for passwords. If a preview has no place name, the app asks "Which place was it?" | ✅ Agreed (fits D50) | 16 |
| D63 | **Everything on free plans** (not commercial, only for evaluators and testers): Gemini free tier via Google AI Studio for the AI (replaces the paid Anthropic key in D52; Claude stays supported if a key is ever added), Supabase free plan, Netlify free. Catches: Gemini free tier has a daily limit and Google may use free-tier requests to improve its products; Supabase pauses a free project after ~7 days with no activity (restore with one click) | ✅ Your call | 17 |
| D64 | **Submission link = Yonder demo version** published as a shareable page: https://claude.ai/artifact/VKahZszTV1kmvP2ZFs8ADE. Every visitor gets their own copy with demo friends; plans use built-in matching (no live AI, no cross-device friends). The live version (D51–D63) can replace it later if you do the free sign-ups | ✅ Your call | 18 |
| D65 | **Big guides = pick-list, not auto-save.** A link or pasted caption that lists many places opens as a searchable list grouped by its own sections (type + price band), nothing pre-ticked, places already saved are marked. Any pasted list works (bullets, numbers, commas) | ✅ From your bug report | 18 |
| D66 | **Submission link = https://yonderapp.netlify.app** (live version, replaces D64). Free stack: Netlify + Supabase (project "Yonder", Mumbai) + Gemini free tier. AI function is named `super-worker`; it asks Google which Flash models are available and tries Gemini 3.5 Flash-Lite first (fastest: plan ≈ 8 s, reel link ≈ 4 s), skipping busy models. The Claude-link demo stays as a backup | ✅ Done | 19 |

---

## 7. Open questions

1. **Target user:** College students? Young working professionals in metro cities? Both? (Affects budget ranges, categories, outing types.)
2. **Personal-first or group-first?** (T3)
3. **Which categories for the prototype?** Food and cafés only, or also events, shopping, activities? Are trips/travel out of scope?
4. **Recommend only from saved items, or also new places?** (T4)
5. **How does the group decide:** AI pick, or shortlist + vote? (T5)
6. **Validation:** Who can you talk to this week (3–5 friends or hostel-mates) to verify the problem? What did they say? (The brief explicitly rewards verified vs guessed.)
7. **Which build tool:** Lovable, Bolt or Claude?
8. **App name.**
9. **Success metric:** What one number shows it works? (e.g. % of saved places actually visited, or time to agree on a plan)
10. **Hero feature (D7):** Do you agree the decision step is the main thing to show, with capture kept simple?
11. **Reddit evidence:** Will you run the Reddit searches in `market-research.md` Section 6 and note 3–5 real posts?
12. **Positioning vs Instagram/Google Maps:** Are you comfortable with the "own saved list → decision, India, local outings" angle?
13. **Go / no-go friend check (Session 3):** Talk to 5 friends from different groups for about 10 minutes each. Ask: (a) How many reels/places have you saved or shared that you never went to? (b) Think of your last group outing: how was it decided, and how long did it take? (c) Did it end up being the "usual" place? **Go** if 3+ of 5 describe both problems without prompting. **Rethink** if most say WhatsApp works fine for them.

---

## 8. Parked (to come back to)

| Topic | Why parked | Raised |
|-------|------------|--------|
| Seeing other evaluators' copies (Session 15) | Not needed; each person now has their own account | Session 15 |
| ~~Market / competitor research~~ | ✅ Done in Session 2, see `market-research.md` | Session 1 |
| Reddit evidence | My tools can't reach Reddit; you'll do it yourself using the search list | Session 2 |
| Partnering with District / Zomato for the "book it" step | Interesting for the real product, not needed for the prototype | Session 2 |
| Business model / monetisation | Not needed for the assignment beyond a line | Session 1 |
| Build tool choice | Decide after scope is locked | Session 1 |

---
- **(Session 15)** Let an evaluator switch to see the previous evaluator's copy of the demo. Nice to have, not needed. Would need shared storage.

## 9. Rejected ideas (with reasoning)

_None rejected by you yet. Proposed for rejection (pending your call):_

| Idea | Why we're proposing to drop it |
|------|-------------------------------|
| Asking users to log in with Instagram | Not needed for public links; lowers trust; Instagram's personal-account API has been retired |
| Asking for contacts access to find friends | Privacy-heavy; a WhatsApp invite link does the job |
| Scraping Instagram reels automatically | Against platform rules and unreliable; use link + caption + user confirmation |
| **Connecting the user's Instagram account to read reels** (Session 5) | Doesn't work: the personal-account API was retired in Dec 2024; what's left only reads a business/creator account's *own* posts, not other creators' reels or the Saved folder |
| **WhatsApp as a product channel** (bot capture, plan sharing, bot inside WhatsApp groups) (Session 10, your call) | You want the experience fully inside our app; WhatsApp is only used to share invite links |
| **"No in-app chat" rule** (set Session 10, reversed Session 11 by you) | People naturally reply to shared reels; chat + @AI is simpler than a separate planning thread. Kept light so it doesn't try to replace WhatsApp |
| **@AI inside the main group chat** (Session 11, replaced Session 12 by you) | AI moved to its own Plan tab so the friends' chat stays clean and each plan has its own space |
| **Editing/deleting other people's items** (Session 12, your call) | Only your own; discuss anything else in Chat |
| **A single organiser who controls the plan** (Session 10, your call) | Any member should be able to start a plan; fairer and closer to how friend groups work |
| **Asking for the user's Instagram password** (Session 5) | Against Instagram's rules, a security risk, and destroys trust |
| **Paste link / screenshot as the main capture method** (Session 5, rejected by you) | Makes the user leave Instagram, so people won't bother. Kept only as a fallback |

---

## 10. Enhancements for later

- **WhatsApp bot capture:** forward a reel to a bot number and it gets saved. Meets users where they already are and lowers the C1 risk
- **Bot inside the friends' existing WhatsApp group** (Session 5): collects every reel shared in the group automatically, so nobody changes how they behave. Needs checking whether WhatsApp's official tools allow it
- **Taste swipe profile** (Session 10): Tinder-style swiping on activities to learn each user's taste (🟡 might make the prototype)
- **Location notifications near saved places** (Session 10): opt-in, uses geofences around saved places; plus a "Near you" home strip when the app is open (🟡)
- **Community of like-minded people** (Session 10): match people with similar tastes for events/workshops. Secondary, needs safety and moderation
- **Personal AI assistant** (Session 10): "What can I do this Sunday under ₹800?" (🟡)
- **Photo-based place guessing** (Session 9): AI + image search suggests 2–3 candidates from the cover photo; shown only in the Confirm inbox, never saved automatically
- **Batch confirmation:** "You saved 6 places this week, confirm in 10 seconds"
- **Native share button** from Instagram/YouTube
- **Screenshot capture:** AI reads a screenshot of a place
- **Reel audio / on-screen text reading** for better extraction
- **"You're near a saved place" alerts** (needs background location)
- **Calendar sync** for availability and adding the plan
- **Event expiry reminders** ("this pop-up ends Sunday")
- **Map view** of all saved places
- **Booking links** (restaurant / event ticketing platforms)
- **Bill splitting / pooled budget for a plan:** a natural link to Groww's payments/UPI world. Possibly a good talking point in the interview
- **Post-plan memories:** photos and ratings after the outing, making the "shared memory" literal
- **Learning group taste over time** from past choices and ratings
- **Duplicate detection** when two people share the same place

---

## 11. Session history

### Session 1 — 20 Nov 2026
- Shared the Groww assignment brief and the product idea.
- Asked for: pros, cons, tradeoffs, data and permissions, and this running log.
- Your message also included a line asking for a deep-dive market/competitor search (Reddit and elsewhere). Logged as the next step (see Parked).
- Delivered: Sections 3–5 above; set up this log.

### Session 2 — 20 Nov 2026
- Asked: how to tackle each con/risk; do the market deep dive now; put all files in a new folder.
- Added a mitigation plan for every risk (Section 3, "How to tackle each risk") and a new risk C10 (competition).
- Market research done → `market-research.md`. Key finding: saving places from reels is crowded (Corner, Beli, Mapstr, Triply, Plotline, ReelPlans in India and more) and so are group voting apps (Tine, Chewsr, uChoose). Very few connect a group's own saved list to a group decision for everyday local outings. Big-platform threats: Instagram (Collaborative Collections, Map), Google Maps (collab lists + voting), District by Zomato.
- Reddit couldn't be accessed by my tools; listed searches for you to run.
- Moved all files into a new project folder.

### Session 3 — 20 Nov 2026
- Asked: should we go ahead with this idea, or brainstorm a better one?
- My recommendation: **go ahead, but sharpen it.** Reasons:
  1. It passes the brief's main test strongly: you've lived this problem, and it can be verified this week with friends.
  2. The brief judges thinking, not originality. A crowded market is evidence that the pain is real, and knowing the gap is a PM skill to show.
  3. AI is central to the idea (pulling places out of reels, matching group needs), which makes the evals deliverable meaningful and easy to show.
  4. It can be prototyped by a non-technical person if the scope stays tight.
  5. Switching now throws away the research done and restarts the clock, with no guarantee the next idea is better.
- Concerns noted: crowded space (C10); a Lovable prototype can't reliably read Instagram links, so the prototype may need the user to paste the caption or place name; and it has to be scoped tightly to stay buildable.
- Fintech/Groww-related ideas: not needed (the brief says domain knowledge isn't judged) and risky if the problem isn't one you've lived. The bill-split enhancement already gives a light Groww link.
- Suggested sharpening: a narrow user (e.g. a friend group of 4–6 in a metro, students or early-career) and one moment (deciding this weekend's outing from what the group has already saved).
- Proposed rule (awaiting your call): run the friend check (Open question 13) before building, and only brainstorm alternatives if it fails.

### Session 4 — 20 Nov 2026

**Friend check, response 1 of 5 (you, about your own experience):**
- Reels shared/received to "go here": too many to count, both sending and receiving.
- Last group outing: the idea came from a reel, but it took **a very long discussion** to decide.
- **Ended at the usual place** because of **budget and time constraints**. "Even though we wanted to explore so many places, it just didn't feel worth it to think about them."
- ✅ Both problems confirmed from your side. **Still needed:** 4 more conversations with friends from *other* groups (the brief wants evidence beyond yourself).

> 💡 **Key insight (worth putting in the 1-pager in your own words):** The group didn't lack ideas; it had plenty of saved reels. What stopped them was that **checking whether a new place fits everyone's budget and time felt like too much effort**, so the group fell back on the "safe" usual place. The app's real job is to **do that checking for the group**, which supports making the decision step the hero (D7).

**Question asked:** Why can't the app read a public Instagram reel?

**Answer, in short:** "Public" means any *person* can watch it in Instagram. It doesn't mean other *software* is allowed to collect it. Three separate barriers:
1. **Instagram blocks it on purpose.** When software (not a person) opens a reel link, Instagram usually shows a login wall or very limited information. It detects and blocks automated access.
2. **Instagram's rules forbid it.** Meta's terms don't allow collecting content automatically without permission, and Meta acts against "scrapers". The official route (Meta's embed API) requires registering with Meta, getting approved, and still returns only limited information. It's mainly for displaying the post, not reading it.
3. **The useful information often isn't in text.** The place name is often spoken in the audio, written on screen, or just shown visually. Even with the link and caption, you'd still need to download the video, turn the speech into text and read the on-screen text. That's slow, costly, and again against Instagram's rules.

Other notes:
- **The location tag**, when the creator adds one, is the easiest clue, but many reels don't have it.
- **YouTube is easier.** Its official API gives the title and description of public videos with a simple key.
- **Competitors (Corner, Triply, etc.) don't publish how they do it.** It's likely a mix of the limited preview info, AI on whatever text they get, and asking the user to confirm. Some may use grey-area scraping services.
- **PM framing:** this is a **platform dependency risk** (C4). Don't build the core of the product on something another company can switch off, and don't build a demo that might break while the interviewer is clicking.

**Options for getting a reel into the prototype (decision pending):**
| Option | How it works | Pros | Cons |
|--------|-------------|------|------|
| A. Paste link + type place name | User pastes link, types "Café X, Bandra"; AI fills in category, area, price | Simplest and most reliable | More effort for the user |
| B. Paste link + paste caption | User copies the caption; AI pulls out the place | Less typing | Copying captions in the Instagram app is fiddly; caption may not name the place |
| C. **Paste link + upload a screenshot** | AI reads the screenshot (location tag, on-screen text, caption) | Close to real behaviour; AI image reading works well; good material for evals | Screenshot may not show the place either |
| D. Fallback to all of the above | Try screenshot → caption → ask "which place is this?" | Most robust | Slightly more to build |

Initial recommendation: **C with A as the fallback** (screenshot first; if the AI isn't confident, it asks the user to type the name). In the write-up, describe the real product as "share button + AI reading the reel, with user confirmation".

### Session 5 — 20 Nov 2026

**Your feedback on Session 4's capture options:** Screenshot / paste / type is **not seamless**. If someone scrolling reels has to switch apps, they see it as an extra task and won't do it. **Requirement: saving must happen without leaving Instagram, with about the same effort as sending a reel to a friend.**

**Question asked:** If the user logs in or connects their Instagram to our app, can the app read the reel then?

**Answer: No, connecting Instagram doesn't fix it.**
- Instagram's API for **personal accounts** (Basic Display API) was **retired in Dec 2024**.
- What's left only works for **Business/Creator accounts**, and only lets an app read **that account's own posts**, comments and messages. It **can't** read other creators' reels, the user's Saved folder, or their DMs.
- There's a narrow official route for reading basic public info (e.g. captions) of other **business/creator** accounts. It needs Meta's approval, has strict limits, gives text only (no audio or video), and isn't tied to the user connecting their account. It might help a little later; it isn't a fix.
- **Asking for the user's Instagram password** so the app can log in for them is against Instagram's rules, a security risk, and destroys trust. ❌ Rejected.

**The key reframe:** There are **two separate problems**:
1. **Capture friction:** "Don't make me leave Instagram." Solved by the **share menu**, not by Instagram login.
2. **Reading the reel:** "Which place is this?" Solved by **AI on whatever info we get + a quick confirmation later**, not at the moment of scrolling.

**Seamless capture options:**
| Option | User experience | Leaves Instagram? | Feasible in prototype? |
|--------|----------------|-------------------|------------------------|
| **1. Share menu (native app)** | Tap Share on the reel → pick our app → small pop-up over Instagram: choose group → Save → back to scrolling. ~4 taps, same as sending to a friend on WhatsApp | **No** | Not in Lovable (web apps can't appear in the iPhone share menu). Simulate it in the prototype and describe it in the write-up |
| **2. WhatsApp contact / bot** | WhatsApp already sits in Instagram's share row. Send the reel to a "PlanBot" contact just like sending to a friend | **No** (stays in the familiar share flow) | Possible but needs the WhatsApp Business Platform (cost + setup). Hard for a non-tech prototype |
| **3. Bot inside the existing WhatsApp friends group** | Zero new behaviour: friends keep sharing reels in their group as they already do; the bot quietly collects them | **No** (no change at all) | Needs checking: official WhatsApp tools have historically been limited for bots in normal groups. Strong idea for the vision/roadmap |
| 4. Paste link / screenshot (Session 4) | Switch apps, paste or upload | Yes | ❌ Rejected as the main path (too much friction); kept only as a fallback |

**"Save now, confirm later":** At the moment of sharing, the user does nothing extra. AI works out the place in the background. Only if it's unsure does the user get a quick question later ("Is this Café X, Bandra?"), ideally in a batch when they open the app or start a plan.

**Recommendation:** Product vision = Option 1 (share menu) + "save now, confirm later", with Option 3 as the bold roadmap idea. Prototype = **simulate** the Instagram share pop-up (a mock "Shared from Instagram" screen), then show the AI identifying the place. Clearly label the prototype's limits in the write-up.

### Session 6 — 20 Nov 2026

**Question asked:** Will the AI be able to work out the place even if it can't actually watch the reel?

**Answer: Often, but not always, and the product must be designed for when it can't.** The AI can only work with what it's given. When someone shares a reel, our app receives the **link**. From the link we can usually get a **preview** (the same kind WhatsApp shows when you paste a link). That preview *sometimes* includes the caption, the creator's handle and a cover image, and sometimes just says "Instagram".

**Clues the AI can use (strongest first):**
1. Caption text naming the place or area (incl. hashtags like #bandracafe)
2. Location tag, if the creator added one and it shows up in the preview
3. Text on the cover image (AI can read images)
4. Creator's handle/bio (e.g. @punefoodguide → city)
5. Group context (where the group lives, places they usually go)
6. Then a **maps search** to turn the clues into a real place with address, price and hours

**What it can't do:** hear the audio or watch the video. If the place is only *spoken* in the reel, the AI won't know.

**Design for three outcomes (fail gracefully):**
| Outcome | What the app does |
|---------|-------------------|
| ✅ Confident | Saves it automatically with place, area and category |
| 🟡 Partly sure (e.g. knows the area, not the exact café) | Later shows "Is it one of these 3?" with one-tap options |
| ❓ No idea | Saves the reel with its thumbnail as "Unnamed place"; asks later "Which place was this?" The thumbnail jogs memory |

Plus an **optional** 1–2 word note box in the share pop-up ("Café Mocha"), never required.

**No one publishes accuracy numbers, so measuring it is your eval.** Simple non-technical test:
1. Collect 20–30 real reels friends have sent you.
2. Paste each link into a WhatsApp chat (to yourself) and look at the preview. That's roughly what any app can see without logging in.
3. For each, note: does the preview name the place? The area? Nothing?
4. You now have a realistic baseline and a ready-made eval set for deliverable #3.

**Open question 14:** What accuracy is "good enough"? (e.g. place correctly identified, or offered in the top 3, for 7 out of 10 reels.) Decide after the WhatsApp preview test.

### Session 7 — 20 Nov 2026

**Your test:** Sharing reels on WhatsApp showed **only the link, no preview**. As a person inside Instagram you can see the cover and caption, but the shared link carries nothing.

**My test:** I fetched a public Instagram page the way an outside app's server would. It returned only basic profile info (name, follower count). The **posts and reels themselves weren't in the page**. Instagram loads them only for a real person in the app or a logged-in browser. I couldn't find a sample reel link to test directly.

**Answers:**
1. **Can our app see the cover/caption of a shared reel?** **Not reliably. Assume no.** In practice the app gets **just the link**. Your WhatsApp test confirms it: even WhatsApp, a huge app made by Meta itself, got no preview.
2. **Are posts any easier than reels?** **No.** Photo posts, carousels and reels sit behind the same wall. Meta's official embed route covers both, but needs Meta's approval, and I can't confirm what it returns today. A developer would need to check before relying on it.
3. **Other sources are easier:** **YouTube** (official tools give the title and description) and **Google Maps links** (the place itself) can be identified automatically.

**What this changes (important):**
- Automatically identifying places from Instagram becomes a **bonus when it works**, not the core of the product.
- **New capture design (still inside Instagram, no app switch):** Share → our app's pop-up → **type 2–3 letters and pick the place from suggestions** ("Caf…" → "Café Mocha, Bandra") **or tap "Tell you later"** → Save. ~2 seconds extra, never leaving Instagram.
- "Tell you later" items appear as **"Unnamed place"** cards with the link. Tapping opens the reel to jog memory, then a one-tap pick of the place.
- **The core value stays the decision step**: matching the group's saved places to budget, time, area and preferences. That's where the AI does its real work.
- **Prototype/evals:** test the AI on caption text **you copy by hand** (you can see captions as a person). That checks the AI's skill at pulling out places, separately from the access problem.

**Possible follow-up:** You paste 2–3 real reel links and I run the same "what can an outside app see" check on them, for direct evidence.

## 12. Next steps (agreed order, Session 7)
| # | Step | Owner | Output |
|---|------|-------|--------|
| 1 | Lock the pending decisions: D7 (decision step = hero), D9 (go ahead), D13/D15 (capture design) | You | Decisions table all ✅ |
| 2 | Finish the friend check: 4 more 10-min conversations (Open question 13 script) | You | Notes/quotes from 5 people |
| 3 | **Lock scope:** target user, categories (e.g. food/cafés + weekend activities), in scope vs out of scope | Together | Scope list (feeds the 1-pager) |
| 4 | **Map the core flow and screens:** share pop-up → group list → start plan → preferences → shortlist → vote → plan sent to WhatsApp | Together | Screen-by-screen flow |
| 5 | Define success metrics | Together | 2–3 metrics |
| 6 | Build eval sets: (a) 20–30 captions → correct place; (b) 10 plan scenarios → does the shortlist respect budget, distance, veg, time? | You + me | Eval sheet (deliverable 3) |
| 7 | Pick the build tool (Lovable is likely easiest) and build; **save every prompt** | You + me | App link (deliverable 4) + prompts (deliverable 2) |
| 8 | Write the 1-pager **yourself**, using this log | You | Deliverable 1 |

### Session 8 — 20 Nov 2026

**You shared 5 real Instagram links** (3 reels, 2 photo carousels, all Mumbai food/nightlife). I opened each the way an outside app's server would, without logging in.

**Result: better than I said in Session 7, so I'm correcting that.** All 5 returned a preview with the **full caption**, creator, date and cover image. One hit a login wall on the first try and worked on the second.
- ✅ 3 of 5: place names in the caption (one even lists ~90 Bandra places with price bands)
- 🟡 2 of 5: only city + category ("late-night food in Mumbai", "café hopping"). Covers had text but no place names
- Details in `eval-set-reels.md`, the first 5 rows of your eval set

**Corrected answers to Session 7's questions:**
1. **Can the app see caption/cover?** **Often yes, but not guaranteed.** Instagram sometimes shows a login wall, and doing this at scale without Meta's permission is against their rules and can be blocked. A real product would need an approved route. The prototype should never depend on it working live.
2. **Posts vs reels?** No real difference: both returned captions. Carousels hide places in the later images; reels hide them in the audio/video.
3. **Your WhatsApp "no preview" test:** cause unknown (could be WhatsApp settings or Instagram treating WhatsApp differently). It doesn't change the result above.

**New product insights:**
- **One link → many places** (3 of 5 were lists). The share pop-up should show "Found 3 places: ☑ AER Worli ☑ Dadar Beach ☑ Sea Link" and let you untick before saving. For huge guides (90 places), save it as a "list" and pick favourites later.
- **Captions carry planning data:** cost for two, cover charges, opening days, "book ahead". The AI should pull these out, because they feed budget and time matching directly.
- **Ignore noise:** sponsored brand hashtags and generic tags (#viral, #foryou).

**Capture design (updates D14 → D15):** Share → pop-up **auto-fills the places it found** (tick/untick) → Save. If nothing is found → type 2–3 letters to pick, or "Tell you later". Never leaves Instagram. Closer to your original vision.

### Session 9 — 20 Nov 2026

**Question asked:** If the cover shows a café and we know the city (Mumbai), can the AI search for that café and suggest it for the user to confirm?

**Answer: Yes, as a *suggestion*, not as an automatic answer.**
- How: (a) AI describes what's distinctive in the photo (decor, lights, arches, signage, view) → web/maps search "café Mumbai + those features" → 2–3 candidates; (b) reverse image search (like Google Lens) to find the same photo elsewhere; (c) compare against place photos on Google Maps.
- **My live test on link 5's cover:** I searched for the visible features (arches, butterfly-shaped lights, Mumbai café). I got several *plausible* candidates but **none I could confirm**. This shows the real risk: **plausible but possibly wrong**.
- Works best for distinctive or famous places; poorly for generic interiors.
- Limits: costs more per item, slower, and Google Lens has no simple official API.
- **Privacy rule: the AI identifies places, never people** (covers often show faces).
- **Product rule:** photo-based guesses only appear in the "Confirm" inbox as "Could this be one of these?" with a "None of these" option. They are never saved automatically. Every "None of these" is useful eval data.

**Question asked:** How do we lock scope and map the core flow? What do you need to do? Anything else to brainstorm first?

**Proposed process:**
1. **You** react to the draft scope below (5 quick questions, defaults suggested).
2. **I** write the scope (in/out, persona, assumptions).
3. **Together:** one user story end to end (scrolling → saving → planning → outing → afterwards).
4. **I** map screen by screen: purpose, what's shown, actions, edge cases, plus a visual flow diagram.
5. **You** cut it down: "must show in prototype" vs "describe in write-up".

**Aspects to brainstorm before the flow (added Session 9):**
1. **Persona & core scenario:** who, group size, city, budget range
2. **What the final "plan" looks like:** the output the group walks away with
3. **Organiser vs members:** who does what; can members take part via link without installing?
4. **Planning inputs:** which preferences, who sets them, how many taps
5. **How the shortlist is ranked:** fits budget/time/area, how many members are interested, saved long ago, **"new for the group"** (directly fights the "we always end up at the usual place" problem), and a short **"why this fits"** reason for each
6. **Edge cases:** nobody responds, nothing fits, tied vote, mixed home areas
7. **Vision vs prototype:** what's real vs simulated
8. **Success metrics**
9. **Trust & privacy:** who sees what in a group

**Draft scope (to react to):**
- **In scope (prototype):** friend groups of 4–6, young people in one metro (Mumbai, matching the test data); food & drink + experiences (sunset spots, activities); Instagram (simulated share), Google Maps links; group collection with filters and "I'm interested"; confirm inbox; plan flow (organiser basics + member quick inputs) → AI top-3 shortlist with reasons → vote → final plan card → share to WhatsApp; "Did you go?" follow-up
- **Out of scope:** real native share extension (simulated), booking & payments, bill split, trips/travel itineraries, calendar sync, background location, event ticketing, in-app chat, multiple cities, reading video/audio, public social feed, monetisation

**Draft screen list (to be detailed):** 0 Login + create/join group (WhatsApp invite link) · 1 Share pop-up (found places ☑, pick group, save) · 2 Group collection · 3 Place detail · 4 Confirm inbox · 5 Start a plan (organiser) · 6 Member quick input (works via link) · 7 Shortlist + vote · 8 Final plan card + share to WhatsApp · 9 "Did you go?"

### Session 10 — 20 Nov 2026

**You described your intended flow and answered the 5 scoping questions.** Full scope + screen-by-screen flow is in `scope-and-flow.md` (Draft v1).

**Your flow, in short:**
- Login → create a group (share link / code / optional contacts invite / share link to WhatsApp groups) or join via link/code. Contacts never required.
- Each person can be in **many groups** and can share a reel to any of them, then keep scrolling.
- When they open the app, a **confirm pop-up** appears for places the AI wasn't sure about.
- **Any member** can add: reels, posts, Pinterest, YouTube, any social media, or **plain text lists** of places/events.
- **No single organiser.** Anyone starts planning by talking to the **bot inside the group**; everyone sees inputs and replies.
- **Two kinds of recommendations:** ① from the group's saved places ② new things that fit current preferences.
- Top-3 shortlist + vote → **final plan card stays in the app** with **links out** for booking/tickets → **"Did you go?"** crosses it off the bucket list.
- Group **bucket list** as a **map with pins** and a **list by category** (movies, events, cafés, bars, pubs…).
- **Personal tab:** Tinder-style **swipe on activities** (café, street food, pottery, art & craft, dance/music workshops, concerts…) to learn each user's taste.
- **Community** of like-minded people: secondary, later.
- **Location nudges:** a notification when near saved places, **and** the same on the home screen ("Are you here? Visit these") even if notifications are off.
- **Personal AI:** individuals can ask the bot "What can I do if I want to do X?"

**Your answers:** (1) Friend groups of 3–6 + individuals, ages ~18–35; a plan is about one city. (2) **All of India**; Mumbai links were just your saves. (3) **All categories.** (4) **No organiser**; anyone activates the bot. (5) **Out for now:** booking, payments, bill split, calendar, in-app chat.

**My flags (Session 10):**
- **WhatsApp:** you don't want it in the product. Kept only as one place to share invite links. This replaces earlier ideas (WhatsApp bot capture, sending the plan to WhatsApp).
- **"No in-app chat" vs "bot in the group chat":** resolved as a **planning thread with the AI** (inputs + bot replies), not a chat between friends.
- **"New for you" needs outside data:** maps data works for places; **events/workshops are hard** (no open data from Indian ticketing platforms). Prototype: AI web search or a small hand-picked list.
- **Location notifications** need "always allow" or geofences: opt-in, later. **"Near you" on the home screen** only needs "while using": low cost, can be in the prototype.
- **Scope has grown a lot**, so it's tiered into 🟢 must show / 🟡 if time / ⚪ vision (see `scope-and-flow.md` §2).
- Product = all of India; **demo data = Mumbai**.

### Session 11 — 20 Nov 2026

**Your proposal:** Drop the "no in-app chat" rule. People naturally want to reply to a reel a friend shares. Tag **@AI** to bring the bot in.

**My take: agree, with guardrails.** It also simplifies the design: the separate "planning thread" merges into the group chat.
- **What gets better:** matches real behaviour (share → reply); reactions and comments live next to the place; sharing into a group feels like sending to friends today; the AI gets useful signals ("been there, overpriced"); one screen instead of two.
- **What could get worse:** (1) chat may feel empty if friends keep talking on WhatsApp; (2) bigger build (real-time messages, notifications); (3) more privacy duty (storing private messages under the DPDP Act) and report/block needed; (4) notification noise.
- **Guardrails:** keep chat light and centred on items (cards, replies, reactions, @AI). Don't copy WhatsApp (no calls, voice notes, statuses). The AI only acts when tagged. In the interview, the honest line: "they don't have to move their chatting here; the chat exists around the saved things."

**Your answers to the 4 questions + my suggestions:**
1. **Several plans at once** ✅, shown in a **group calendar** next to the map/list, with **plan reminders**. (Note: this is an in-app calendar; syncing with Google/phone calendars stays out.)
2. **Voting:** you suggested everyone ranks the shortlist. **Recommended: ranked vote** (drag 1-2-3 → 3/2/1 points → highest total wins; tie → more 1st places, then the AI's fit score) + optional **"Doesn't work for me" flag** so nobody gets stuck with a place they can't do (e.g. no veg food). Deadline; non-voters don't block.
3. **Leaving members:** you lean towards keeping their saves. **Recommended: keep them** (group memory), labelled "added by Riya (left)"; their 👍 and votes stop counting; on **account deletion**, the name is removed ("added by a former member"), as the DPDP Act requires.
4. **Taste swipe in the prototype** ✅ (moved to 🟢).

`scope-and-flow.md` updated to **Draft v2**.

### Session 12 — 20 Nov 2026

**Your answers:** (1) Keep the "Doesn't work for me" flag ✅. (2) Members can **edit/delete only their own** items; anything else gets discussed in Chat ✅. (3) The AI **remembers group preferences** ✅.

**Your new ideas:**
- **Plans only count the people coming.** If Aman (vegetarian) isn't coming, a steakhouse is fine. → Adopted. I also suggest **only the people coming vote**.
- **Group tabs restructured:** **Chat** (friends share links and talk) · **Plan** (separate AI chat, visible to everyone, anyone can add input) · **Bucket list** (by category, with the **map in the same tab**) · **Calendar**.
- **Tap-to-answer questions** to start a plan: is everyone coming / who isn't / when / what kind of outing, then "anything else?" as free text.

**My take:**
- Separate Plan tab: **good call.** It keeps the friends' chat clean, gives each plan its own space, and fits "several plans at once". Risk: two chat-like tabs could confuse people. Fix: clear names + a **"Plan this"** button on every card in Chat that opens the Plan tab with the place filled in.
- Tap-to-answer questions: **strong.** Faster for users, and each answer becomes a checkable rule, which makes the **evals** much easier ("did the shortlist respect budget/time/who's coming?").
- Suggested extra questions: **budget per person**, **where** (near me / area / middle for everyone), **must-haves** (auto-filled from group memory for the people coming), **ideas from** bucket list / new / both.

`scope-and-flow.md` updated to **Draft v3**.

### Session 13 — 20 Nov 2026
- **Your answers:** Yes to both: people not coming can still **see** a plan (they just don't vote), and the Plan tab gets a quick **"Ask"** box for questions that aren't a full plan.
- **Delivered:**
  - `user-story.md`: "Bandra Bunch" (Riya, Aman, Kabir, Sana) from sign-up to "Did you go?", plus a table mapping each part of the story to your original problem.
  - `app-flow.html`: visual flow diagram (8-step journey + how the 4 tabs connect + personal space), published as a private page: https://claude.ai/artifact/EjmaKaMkXit9qgz4BZQ87W
  - `prompts.md`: empty template for deliverable #2. Start filling it from your first build prompt.
- **How to begin the next part:** see "Build phase plan" below.

### Session 14 — 20 Nov 2026
- **Your call:** do the build (step 4) before metrics/evals (step 3). Don't use Lovable: Claude builds it and gives the shareable link, in stages.
- **You shared rough sketches:** Home ("Planning something? Explore now!" with cards) · group screen with 3 columns (groups + "Self" on the left, group chat in the middle, a side panel for AI Bot / Bucket list with map / Calendar, switched by 3 icons) · taste swipe carousel (swipe up = like, down = dislike) · Profile. Sticky note: if no plans on the calendar, nudge "let's plan something" with a saved reel.
- **Proposed (awaiting your OK):** D42–D45, an app name, and the build stages below.
- **Build stages (Claude):** (1) shell + sample data from your sketches → (2) saving: share pop-up, paste link/list, AI pulls out places → (3) plan flow in the AI panel: questions → suggestions → ranked vote → plan card → calendar → (4) taste swipe, "Did you go?", Near you, group memory → (5) polish, phone layout, open-access check.

### Session 15 — 20 Nov 2026
- **Your answers:** (1) Real AI, yes. You asked to confirm it doesn't redirect to Claude: it doesn't; it runs inside the app page, but each viewer uses their own Claude account and is asked once to allow it. Evaluators who aren't signed in to Claude get demo answers. (2) Each evaluator gets their own copy. Seeing the previous person's copy would be nice but isn't needed → parked. (3) Laptop first; phone later. (4) Any link: see D50, the page can't open links itself.
- **Your new ideas:** Google Maps link on every pin (D46); "Ask the AI" when you have no reels + a clear "send reels here" hint (D47); one-question 1–5 star rating after "Did you go?" (D48). Name: Bucketful; vibrant and friendly (D49).
- **Stage 1 built and published (private):** https://claude.ai/artifact/8fmGK8E4zoxotWLDuqZSEp — Home (Near you, Coming up, Just saved, New for you), Groups (sidebar + Self, chat with share cards, side panel: AI with live Ask, Bucket list with drawn Mumbai map + categories + place details + Google Maps, Calendar with the "let's plan something" nudge), Taste swipe (15 cards, swipe up/down or arrow keys), Profile with Reset demo. "Viewing as" switch for Riya, Kabir, Sana, Aman.
- **Placeholders until later stages:** sharing a reel / reading links (Stage 2), the New plan builder and voting (Stage 3), "Did you go?" + rating (Stage 4).

### Session 16 — 21 Nov 2026
- **Your feedback on Stage 1:** build a real, working website (logins etc.), not just a nice-looking prototype. Remove profile switching. Add a walkthrough. The map preview should show only pins. Taste swipe: up/down on laptop, right/left on phone, don't force an answer, cards on both sides, vibrant art instead of emoji. New look: yellow/cobalt/pink/black/white, bold sans, strong blocks, chunky buttons, pressed states, quirky. AI planner: pick several options + free text, more personal. Why use the visitor's Claude account at all (limits)? Make the 3 tabs obvious and give the panel more room. Rename to Yonder with a logo.
- **What changed:** D51–D62. Rebuilt as **Yonder** in `yonder/` (website) + `supabase/` (database rules and AI server function). Set-up steps in `yonder-setup.md`.
- **Tested in the browser (demo mode):** guest sign-in, onboarding, welcome + 9-step tour, home, groups, saving the 5 eval links (3 found places; partial ones ask "which place was it?"), planner → 3 quick picks → vote → demo friends vote → plan locked → calendar with reminders, "Did you go?" → 4★ → saved to group memory, big map, taste swipe drag on laptop, phone layout and phone swipe feed.
- **Not tested yet:** the real server (accounts, live updates, live AI). Needs your Supabase project and Anthropic API key first.

### Session 17 — 21 Nov 2026
- **Your call:** keep it completely free; it's only for evaluators and testers (D63). AI switched to Gemini's free tier; added explicit database permissions that newer Supabase projects need. Started the guided set-up (Google AI Studio → Supabase → Netlify).

### Session 18 — 21 Nov 2026
- **Bug you found:** the Bandra West guide link said the place name wasn't in the post. Cause: the demo can't open Instagram, and our eval notes didn't have the 91 names. Fixed (D65) and republished to the same link.
- **You asked for a link you can submit directly.** Published the demo version (D64). It must be shared from the page's Share menu as "anyone with the link" before evaluators can open it.

### Session 19 — 21 Nov 2026
- **Live version set up and tested** (D66). Public link: https://yonderapp.netlify.app. Tested as an evaluator: guest sign-in, own demo copy, live AI plan with personal reasons, pasting a real Instagram reel link (3 places in 4 s).
- **Problems found and fixed during set-up:** new-style Supabase keys; Google retired Gemini 2.5 models for new users; free Gemini 3.x models often busy (503); slow "thinking" by default.
- **To remember:** Supabase free projects pause after ~7 days with no visits (restore in one click); Gemini free tier has a daily limit (the app falls back to quick picks).

## 13. Build phase plan (Session 13)
**Before building (can run in parallel, ~1–2 days):**
1. Finish the friend check: 4 more 10-minute conversations (questions in Open question 13). Note quotes.
2. Grow `eval-set-reels.md` to 20–30 links, and write **~10 plan scenarios** for the recommendation evals (e.g. "3 people, ₹1,000 each, Saturday evening, one non-drinker. Does every option fit?").
3. Pick 2–3 success metrics (e.g. % of saved places visited; time from "New plan" to a decision; % of AI-found places confirmed without edits).

**Building (Lovable recommended: no coding, gives a shareable link):**
4. Build in **stages, one focused prompt at a time**, not one giant prompt: (1) skeleton with sample data → (2) saving → (3) bucket list + map → (4) Plan tab → (5) taste swipe, calendar, "Did you go?" → (6) polish.
5. **Save every prompt** in `prompts.md` as you go.
6. Use the "Bandra Bunch" story as the demo script and seed data.
7. Run both eval sets against the built app; record results.

**Finishing:**
8. Write the 1-pager **yourself** (300–700 words), using the log, story and research as raw material.
9. Make sure the app link opens for anyone (test in a private/incognito window).
