# Scope & Screen-by-Screen Flow (Draft v3)

_v1 Session 10; **v2 Session 11** (added group chat with @AI, several plans + calendar, ranked voting, rule for members who leave, taste swipe moved into the prototype); **v3 Session 12** (AI moved to its own **Plan** tab with tap-to-answer questions, bucket list + map merged into one tab, plans that know who's coming, edit-own-only, group memory). Items marked ❓ need your call._

---

## 1. Who it's for
- **Primary:** friend groups of **3–6**, aged **~18–35** (college students to young professionals), anywhere in **India**
- **Secondary:** individuals using it on their own (personal saves, taste profile, personal AI questions)
- Each person can be in **many groups** (e.g. college friends, office gang, flatmates, cousins)
- A plan happens in **one city at a time**, but the product works across India
- **Demo data:** Mumbai (because your test links are Mumbai). This is a prototype choice, not a product limit

## 2. Scope in three tiers
The brief asks for "in scope / out of scope". These tiers are that, and they keep the prototype buildable.

### 🟢 Must show in the prototype (the core loop)
1. Login
2. Create a group / join via **link or code**; invite by sharing the link anywhere
3. Home with **all my groups**
4. **Capture from anywhere** (simulated share pop-up): Instagram, YouTube, Pinterest, any link, or **plain text** ("cafés we want to try: X, Y, Z"). AI pulls out the place(s); can save to **one or more groups**
5. **Confirm pop-up** when the AI isn't sure
6. **Group bucket list**: **list by category** with a **map toggle in the same tab** (v3)
7. **Each group has 4 tabs (v3): Chat · Plan · Bucket list · Calendar.** **Chat** = friends share links and talk (shared items appear as cards you can reply to/react to). **Plan** = a separate AI planning chat everyone can see and add to, started with **tap-to-answer questions**. Several plans can run at once
8. **Two kinds of recommendations:** ① from the group's saved places ② new places/activities that fit right now
9. **Top-3 shortlist + ranked vote** (everyone orders the 3; points decide; see E3)
10. **Final plan card** with **links out** for booking/tickets (no booking inside the app)
11. **"Did you go?"** → cross it off the bucket list
12. **Group calendar** tab of upcoming plans + **reminders** before each plan (v2)
13. **Taste swipe** (moved up from 🟡 in v2, your call): Tinder-style cards during onboarding and anytime from the profile tab. Also solves cold start

### 🟡 Should show if time allows
14. **"Near you" on the home screen**, using location only while the app is open ("You're in Bandra: 4 places from your lists are within 2 km")
15. **Personal AI ask:** "What can I do on Sunday under ₹800 near Andheri?"
16. **Invite from contacts** (optional; permission asked only when tapped)

### ⚪ Vision only: describe in the write-up, don't build
- **Location notifications when the app is closed** ("You're near a place you saved"). Needs "always allow" location, so it's handled carefully (see §5)
- **Community:** connect with people who like similar activities (secondary; safety and moderation needed)
- Photo-based place guessing; real share-menu integration (native app)
- **Out for now (your call):** booking, payments, bill split, **syncing with Google/phone calendars** (the in-app group calendar is in). ~~In-app chat~~ is now **in** (v2)

## 3. Category list (so "everything" stays organised)
The AI sorts every item into one of these. Each one has its own tab in the list view and pin colour on the map.
| Group | Categories |
|-------|-----------|
| 🍽️ Food & drink | Cafés · Restaurants · Street food · Bakeries & desserts · Bars & pubs |
| 🎟️ Events | Concerts & gigs · Comedy · Theatre · Festivals & pop-ups · Sports screenings |
| 🎨 Workshops & classes | Pottery · Art & craft · Dance · Music · Cooking |
| 🌅 Outdoors & sights | Sunset spots · Beaches · Treks · Heritage walks · Parks |
| 🎳 Activities | Gaming · Bowling / escape rooms · Adventure · Wellness |
| 🎬 Movies | Movies · Special screenings |
| 🛍️ Shopping | Markets · Stores · Flea markets |

---

## 4. Screen-by-screen flow

### A. Getting in
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **A1 Login** | Phone number (OTP) or Google | Log in | 🟢 |
| **A2 Taste swipe** | 15–20 activity cards with images | Swipe right (like) / left (not for me); skip anytime | 🟢 |
| **A3 Home city** | City picker; optional "use my location while using the app" | Set city; allow or skip location | 🟢 (city) / 🟡 (location) |

### B. Home & groups
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **B1 Home** | My groups (e.g. 4 cards: name, members, # saved, any plan in progress) · "Confirm 2 places" badge · "Near you" strip 🟡 · "Ask AI" button 🟡 | Open a group, create/join, confirm places | 🟢 |
| **B2 Create group** | Name, emoji/photo | Create → **share invite link** (to any app incl. WhatsApp) · show **code** · invite from contacts 🟡 | 🟢 |
| **B3 Join group** | Group preview (name, members) | Join via link or by typing code | 🟢 |

### C. Saving things
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **C1 Share pop-up** (simulated over Instagram/YouTube/Pinterest) | "Found 3 places: ☑ AER, Worli ☑ Dadar Beach ☑ Sea Link" · group picker (**multi-select**) · optional note | Untick, pick groups, Save → back to scrolling | 🟢 |
| **C2 Add manually** (in-app) | Paste a link **or** type/paste a list ("Places to try: Subko, Kala Ghoda Café…") | AI pulls out each place → same tick list as C1 | 🟢 |
| **C3 Confirm pop-up** (appears when the app opens) | "Is this the place?" with the source thumbnail · options: ✅ Yes / pick from 2–3 / search / "Not a place" / "Later" | Confirm in one tap | 🟢 |

### G. Inside a group: 4 tabs (v3)
**Chat · Plan · Bucket list · Calendar**

| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **G1 Chat tab** (opens by default) | Messages + **shared items as rich cards** (place, area, price, source icon, "Saved to bucket list ✓"). **No AI here**: just friends | Share links, reply to a card, react 👍/😍, mark "I'm interested", tap **"Plan this"** on a card → opens the Plan tab with that place pre-filled | 🟢 |
| Notes | Sharing from Instagram into a group **posts the card in its Chat** (like sending to friends today) *and* files it into the bucket list | | |

### D. The group's bucket list
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **D1 Bucket list tab: list mode** | Category chips (§3) · cards: name, area, price for two, who added it, 👍 count, source icon, "Been there ✓" · filters: area, budget, category, not yet visited · **List / Map toggle** at the top | 👍 "I'm interested", open details, switch to map | 🟢 |
| **D2 Bucket list tab: map mode** (same tab, v3) | Pins coloured by category · same filters | Tap pin → mini card → details | 🟢 |
| **D3 Place details** | Photos/info, hours, price, address · "Open original post" link · who added it, who's interested, notes | 👍, add note, mark visited, "Plan this" · **edit/delete only if you added it** (v3) | 🟢 |
| **D4 Calendar tab** (v2) | Upcoming plans by date (several at once), each with place, time, who's going | Open plan card; get **reminders** (e.g. the day before + 2 hours before) | 🟢 |

### E. Planning together (inside the group)
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **E0 Plan tab home** (v3) | **"Ask" box** for quick questions ("any brunch spots in our list?") · list of this group's plans (in progress / decided / done) · **"+ New plan"** | Open a plan or start one. **Anyone** can start | 🟢 |
| **E1 New plan: tap-to-answer questions** (v3) | **Who's coming?** member chips, all on by default; untick who can't · **When?** Today / Tomorrow / This weekend / pick a date + Morning / Afternoon / Evening / Late night · **What kind?** category chips, multi-select · **Budget per person** <₹500 / ₹500–1,000 / ₹1,000–2,000 / ₹2,000+ · **Where?** near me / pick an area / middle for everyone · **Must-haves** (veg, non-alcoholic, indoors, accessible), **auto-filled from group memory for the people coming** · **Ideas from** our bucket list / new ideas / both · **Anything else?** free text | Tap answers → AI replies in this plan's thread, visible to all. Others add their own input in the thread ("I can only do after 7") | 🟢 |
| **E2 Recommendations** | **① From your bucket list** (ranked, "why it fits", "Riya & Aman wanted this") · **② New for you** (not saved yet but fits; "new for the group" tag) | Add to shortlist; ask the bot to change something ("cheaper", "closer") | 🟢 |
| **E3 Top 3 + ranked vote** | 3 options with photo, price, distance, reason · voting deadline (e.g. 3 hours) · **only people coming can vote** (v3) | **Drag to order 1-2-3** → points (1st = 3, 2nd = 2, 3rd = 1); highest total wins. **"Doesn't work for me"** flag on one option (e.g. no veg food); a flagged option can't win unless nothing else is left. Tie → more 1st-place votes, then the AI's fit score. Non-voters don't block after the deadline | 🟢 |
| **E4 Final plan card** | Place, date/time, est. cost per person, who's going, **directions link**, **booking/ticket link** (opens the external site/app) · shown in the Plan tab, a short note posted in Chat, and added to the **Calendar** | Open links; mark "we're going"; reminders follow | 🟢 |
| **E5 Did you go?** (after the plan date) | "Did you go to AER?" | ✅ Yes → crossed off + quick rating · ❌ No → stays on the list | 🟢 |

### Rules the AI and app follow (v3)
- **Plans only count the people who are coming.** If Aman (vegetarian) isn't coming, a steakhouse is fine. His preferences, 👍s and vote don't apply to that plan
- **Group memory:** the AI remembers group preferences between plans ("Aman: vegetarian", "Riya: no late nights on weekdays"). Shown in a **group preferences** list anyone can see; each person edits their own
- **Edit/delete:** you can only edit or delete what **you** added. To remove someone else's item, talk about it in Chat and they remove it
- **Leaving members:** their saves stay ("added by Riya (left)"); their 👍s and votes stop counting; name removed if they delete their account

### F. Personal space
| Screen | What's on it | What you can do | Tier |
|--------|-------------|-----------------|------|
| **F1 Profile & taste** | Taste profile summary ("loves cafés, workshops; not into clubs") · swipe deck to refine · my saves across all groups | Swipe more, edit preferences | 🟡 |
| **F2 Ask AI (personal)** | Chat with the bot about your own plans | "What can I do this Sunday under ₹800?" | 🟡 |

---

## 5. Things to keep in mind (tradeoffs from your choices)
| Your choice | Tradeoff / how we handle it |
|-------------|-----------------------------|
| No WhatsApp in the product (only to share invite links) | Simpler and fully ours. But people have to open our app to plan, so the planning thread must be quick and useful |
| No single organiser; anyone starts a plan; **several plans at once** (v2) | Fairer and flexible. Each plan has its own card, deadline and calendar entry so they don't get mixed up. Risk: nobody pushes a plan to a decision, so the AI nudges once when the voting deadline passes |
| **In-app group chat** (v2) + **separate AI Plan tab** (v3) | Natural: people reply to reels they share; keeping the AI in its own tab keeps the friends' chat clean and gives each plan its own space. Risks: chat may feel empty if friends keep talking on WhatsApp; **two chat-like tabs could confuse people** ("where do I post?"); bigger build; more privacy duty (storing private messages); needs report/block. **Handled by:** clear names (Chat vs Plan), a **"Plan this"** button on every card in Chat, chat kept light (no calls, voice notes, statuses) |
| **Tap-to-answer planning questions** (v3) | Faster for users, and structured answers make the AI's job and its **evals** much easier (each answer is a checkable rule: budget, time, who's coming). Free text at the end catches anything else |
| "New for you" recommendations | Needs place/event data beyond what users saved. Places: maps data (e.g. Google Places). **Events/workshops are harder**: Indian ticketing platforms don't offer open data. Prototype: AI web search or a small hand-picked list |
| Location: "Near you" + notifications | **Home-screen "Near you" (app open)** only needs "while using" permission: easy, low privacy cost. **Notifications when the app is closed** need "always allow" or geofences around saved places (the phone watches a few saved spots, lighter on battery). Opt-in only, and later |
| **Member leaves a group** (v2) | Their saved places **stay** (group memory, like messages in a WhatsApp group). Card shows "added by Riya (left)". Their 👍 **no longer counts** in recommendations or votes. If they **delete their account**, their name is removed: "added by a former member" (required under India's DPDP Act) |
| Contacts invite | Optional, asked only when tapped. Many people decline, so link/code must always work |
| All of India, all categories | Fine for the product. The AI's sorting must be tested across cities and categories in the evals |

## 6. Questions
**Resolved in Session 11:** several plans at once + calendar + reminders ✅ · ranked voting ✅ · leaving members' saves stay ✅ · taste swipe in prototype ✅
**Resolved in Session 12:** "Doesn't work for me" flag ✅ · edit/delete only your own ✅ · AI remembers group preferences ✅ · plans only count the people coming ✅ · AI in its own Plan tab with tap-to-answer questions ✅ · bucket list + map in one tab ✅

**Resolved in Session 13:** people not coming can see a plan but don't vote ✅ · quick "Ask" box at the top of the Plan tab ✅

**Still open:** none for now.
