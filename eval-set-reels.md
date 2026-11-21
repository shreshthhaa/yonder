# Eval Set: Can the app identify places from a shared link?

_Started Session 8 (20 Nov 2026). Goal: 20–30 real links. This becomes part of deliverable #3 ("evals you used")._

**How each row was tested:** The link was opened the way an outside app's server would, without logging in. We recorded what Instagram returned (caption, creator, date, cover image) and judged whether the place(s) could be identified from that alone.

**Scoring:**
- ✅ **Identifiable:** the exact place name(s) are in the caption
- 🟡 **Partial:** only city, area or category (e.g. "late-night food, Mumbai")
- ❌ **None:** no usable clue, or Instagram showed a login wall

| # | Link | Type | Preview returned? | What it revealed | Places expected | Score | Notes for the product |
|---|------|------|-------------------|------------------|-----------------|-------|-----------------------|
| 1 | instagram.com/p/Deyb-zQMJcS | Reel | Yes (login wall on 1st try, worked on 2nd) | Caption lists 3 sunset spots with area + cost/tips | AER (Worli), Dadar Beach / Shivaji Park, under Bandra-Worli Sea Link | ✅ | Multi-place reel. Cover charge mentioned → budget data. Sponsored hashtags (phone brand) = noise to ignore |
| 2 | instagram.com/p/DbvFP7kt0Qu | Reel | Yes | Caption is a full Bandra West guide: ~90 places grouped by type and **price band** (≤₹500, ≤₹1000, ≤₹2000, >₹2000 for two) | 91 places in 8 sections: bakeries (12), bars & pubs (15), cafés/restaurants by price band up to ₹500 (11), under ₹1000 (12), under ₹2000 (16), above ₹2000 (8), desserts (8), things to do (9) | ✅ | A "guide" reel. Saving all 90 is noise, so the user should pick a few or save it as a list. Price bands are gold for budget matching |
| 3 | instagram.com/p/DebylfgExy0 | Photo carousel | Yes | Caption lists 5 speakeasy bars with area, cost for two, timings, booking rules | PCO (Lower Parel), Slink & Bardot (Worli), Ocho (Santacruz), Charlee (Santacruz), Harbour Bar (Taj, Colaba) | ✅ | Rich: price, opening days, "book ahead". Perfect input for the planner |
| 4 | instagram.com/p/DePAnAPE9hv | Photo carousel | Yes | Caption: only "where to eat in Mumbai after 1 AM". Cover: text overlay, no names. Places are in later carousel images, which we can't see | Unknown | 🟡 | City + category + time ("late night") only. Needs "Tell you later" / quick pick |
| 5 | instagram.com/p/DUyNR6sjHp6 | Reel | Yes | Caption: city + vibe ("café hopping", reservations) + generic hashtags. Cover: person in a café, no name | Unknown | 🟡 | Place likely spoken or shown in the video only. Needs quick pick |

**Running score (5 links):** ✅ 3 · 🟡 2 · ❌ 0. Login wall seen once (then worked on retry).

**Patterns so far:**
1. **3 of 5 posts are lists, not single places.** The product must handle **one link → many places**.
2. **Captions often include price, area and timings**, exactly what the planner needs for budget and time matching.
3. **Carousels hide places in later images,** and **reels hide them in audio/video**. Those become 🟡.
4. **Access isn't guaranteed:** one link hit a login wall on the first try. For your WhatsApp test (no preview), the cause is unknown.

## Still to add
- 15–25 more links from your real chats (mix of reels, carousels, single-place posts, Hinglish captions, YouTube and Google Maps links)
- For each: what *you* (as a person) know the place is, so we can compare it with what the AI finds
