# Market Research: What Already Exists

_Session 2 — 20 Nov 2026. Desk research on the "shared memory + group decision" idea._

> **Method note:** Reddit couldn't be searched or opened from my tools (both blocked). I used product sites, app stores, Product Hunt, Hacker News "Show HN", tech press (TechCrunch, Business Insider, CNBC, Inc42) and published surveys instead. Many "best app" roundups are written by the apps themselves, so treat feature claims as marketing until tested. Section 6 lists Reddit searches you can run yourself.

---

## 1. One-line summary

**Each half of the idea already exists, but they are rarely joined together.** Lots of apps turn reels into saved places, and lots of apps help groups vote on where to eat. Almost none use **a group's own saved collection** as the input to **a group decision** for **everyday local outings**. Most reel-savers are built for travel trips, and most voting apps just show nearby restaurants. That gap is where this idea can stand out. The gap is narrow though, and big platforms (Instagram, Google Maps, Zomato's District) are moving closer to it.

---

## 2. The landscape, by group

### A. "Save places from reels" apps (crowded, mostly travel, mostly solo)
| App | What it does | Who it's for | Group features? | Notes |
|-----|-------------|--------------|-----------------|-------|
| **Corner** (US/Europe) | Social map. Share Instagram/TikTok/Maps links in, AI finds the place, follow friends' maps | Gen Z, city life | Follow friends, share lists by link | Raised ~$7.5M; 250k+ users in 425 cities; iPhone only; no revenue yet |
| **Mapstr** | Personal map of saved places, optional sharing per place | Individuals | Light (add friends) | Free tier capped at 300 places |
| **Beli** | Rank restaurants you've visited, "Want to Try" list, import from Instagram/TikTok, friends' scores, "match score" with friends | Foodies, Gen Z | See friends' lists and taste match | Raised ~$12M (by Jun 2025). Users dislike forced ranking |
| **Triply, Plotline, Via, Rhyme, ReelTrip, Yaay, Wandereel, ReelTravel, Map Your Voyage** | Share a reel, AI pulls out every place and pins it on a map or itinerary | Travellers | Mostly none or basic sharing | Many small, recent apps, a sign of easy-to-build tech and low barriers |
| **Mindtrip** | AI travel planner; build an itinerary from a TikTok, YouTube or Instagram link or a screenshot | Travellers | Trip collaboration | Early version only worked on videos with text overlays, a sign of how hard extraction is |
| **ReelPlans** (India, Android) | Share Instagram reels/posts, saves restaurants, cafés, attractions in one place | Indian users | Unclear | The closest Indian direct competitor on capture |
| **Ready to Echo** | Food-focused; AI finds the place, checks hours; private lists or shared "Spaces" | Foodies | Shared spaces | Close on "shared memory", no decision engine |

### B. Group decision apps (crowded, single-purpose, no memory)
| App | What it does | Notes |
|-----|-------------|-------|
| **Tine, Chewsr, uChoose, SwipeEats, Hangrily, TasteMate, Tonight's Bite, Gochew, GetTogether** | Tinder-style swiping on nearby restaurants; the group's matches win | Common pattern: **share a link and vote without installing anything.** The options are generic nearby places, not things the group actually wanted |
| **Howbout** | Shared calendar so friends see each other's free time | Raised $13M+; claims 4–5M users, mostly under 25. Solves *when*, not *what* |
| **Partiful** | Event invites and RSVPs | ~500k monthly users (Q1 2025, mostly US); valued ~$140M. Solves *inviting*, not *deciding* |
| **OutOut** | Group outings: add/suggest stops, split expenses | Planning + money, no reel capture |

### C. Big platforms moving into the space (the real threat)
| Platform | Feature | Why it matters |
|----------|---------|----------------|
| **Instagram** | **Collaborative Collections** (2023): save posts into a shared folder with friends, including from DMs | Already "shared memory" inside the app people use. But it's an unsorted pile: no map, no categories, no planning |
| **Instagram** | **Instagram Map** (Aug 2025): see friends' locations and location-tagged content; **save places** and share them in DMs | Instagram is building a place layer. If it adds planning, it competes directly |
| **Google Maps** | **Collaborative lists + group voting** (2018 voting, 2023 lists, 2025 teardowns show lists from search results) | Has the place data and the voting. Doesn't capture reels well, and few people use the voting |
| **District by Zomato** (India, Nov 2024) | Dining reservations, events, movies, activities in one "going out" app; **Hotlist** to save things | Owns Indian "going out" supply and booking. A likely partner (or competitor) for the "book it" step |
| **WhatsApp** | Groups + polls | Where Indian plans actually happen today. The default to beat |

---

## 3. What the evidence says about the problem (the user pain)

| Signal | Source | Strength |
|--------|--------|----------|
| People save Instagram posts "with high intent" but rarely go back to them (survey of 75 users) | Medium design case study | Weak (small, informal), but matches what we expected |
| Instagram's Saved has no map and no search by place; everything goes in one pile | Several guides | Factual, about the product |
| 62% of diners check a restaurant's social media before deciding where to eat | Toast diner survey 2024 (US) | Medium. Shows social media drives dining choices |
| Deciding what to eat is the biggest mealtime challenge for 68% (household survey); ~87 hrs/year spent deciding what to eat (Canada); only 22.7% said shared decisions made it easier | Factor/Wakefield; Chefs Plate | Medium/weak (commercial surveys about households, not friend groups) |
| Many funded startups (Corner, Beli, Howbout, Partiful) built around Gen Z social planning | Funding news | Strong signal that the space is real and investors care |
| Dozens of new "reel → place" apps in 2025–26 | App stores, Product Hunt, HN | Strong signal that the capture pain is real, and that capture alone is getting commoditised |

**No good data exists on how often friend-group plans fall through.** That's an opportunity: your own quick survey of friends would be *original* evidence, and the brief rewards exactly that.

---

## 4. Gaps and white space (where this idea can stand out)

1. **Memory → decision bridge.** Reel-savers stop at "saved". Voting apps start from "nearby places". Very few go from "*what our group has saved*" to "*what we should do this Saturday*".
2. **Group-first ownership.** Most savers are personal maps with sharing added on. Few treat the *group* as the owner of the list (who added it, who's interested, who's been).
3. **Everyday local outings, not trips.** Most reel apps are about travel itineraries. The weekly "what do we do this weekend in our city" is under-served.
4. **India context.** Hinglish captions, WhatsApp-first groups, budget sensitivity, "veg only" and similar constraints, Indian supply (District, Zomato, BookMyShow). The global apps aren't built for this; ReelPlans is the only Indian player found, and it's capture-only.
5. **Saved but never done.** No one closes the loop: "you saved this 4 months ago and it's 2 km from your plan, go?"

## 5. What this means for our product (implications)

- **Don't pitch capture as the innovation.** It's crowded and becoming standard. Treat it as table stakes that must be effortless.
- **The hero is the decision step:** using the group's own saved list plus everyone's constraints to produce a shortlist and a quick vote.
- **Borrow proven patterns:** vote by link without installing (Tine, Chewsr, uChoose); AI fills in, user confirms (Corner, Beli).
- **Know the threats:** Instagram (Collaborative Collections + Map) and Google Maps (collab lists + voting) could close the gap. In the interview, say why a focused app can still win: neither platform wants to be a neutral planner that sends you outside its app, and neither is built for the Indian WhatsApp-plus-budget context.
- **District/Zomato is a natural "book it" partner,** and a hint at how this could make money later.

---

## 6. Reddit: searches to run yourself (my tools are blocked from Reddit)

Spend ~20 minutes, screenshot or quote 3–5 posts, and you'll have real evidence in users' own words:
- `r/bangalore`, `r/mumbai`, `r/delhi`, `r/pune`, `r/hyderabad`: search **"weekend plans friends"**, **"what to do this weekend"**, **"cafe recommendations"**, **"saved reels"**
- `r/india`, `r/AskIndia`: **"friends never make plans"**, **"plans get cancelled"**
- `r/productivity`, `r/instagram`: **"organize saved posts"**, **"saved instagram restaurants"**
- `r/AppIdeas`, `r/SideProject`, `r/startups`: **"save places from reels"** (shows who else has tried this and what people said)

Write down: the exact complaint, how many upvotes, and whether people mention a tool they already use.

---

## 7. Sources
- Reel Map: https://reelmap.io/
- Triply roundup of 12 apps: https://triply.au/blog/best-apps-save-travel-places-instagram-tiktok/
- Plotline roundup: https://getplotline.app/blog/best-apps-save-locations-tiktok-instagram
- Via: https://alwaysvia.com/ · Rhyme: https://www.rhyme.travel/ · ReelTrip: https://reeltrip.app/ · Ready to Echo: https://readytoecho.com/
- Map Your Voyage comparison: https://mapyourvoyage.com/blog/best-apps-to-plan-trips-from-social-media
- Corner App Store: https://apps.apple.com/app/id1668282277 · Corner funding: https://app.dealroom.co/news/feed/social-mapping-startup-corner-raises-7-5m-to-help-gen-z-find-restaurants-and-meet-up-irl
- Mapstr App Store: https://apps.apple.com/us/app/id917288465
- Beli App Store: https://apps.apple.com/us/app/-/id1478375386 · Food Network on Beli: https://www.foodnetwork.com/fn-dish/news/beli-app-trend
- Mindtrip (TechCrunch, Jul 2024): https://techcrunch.com/2024/07/31/travel-startup-mindtrips-new-feature-lets-you-build-an-itinerary-from-a-screenshot-youtube-or-tiktok-video
- ReelPlans (India): https://play.google.com/store/apps/details?id=com.reelplans.app&hl=en_US · Yaay: https://apps.apple.com/us/app/yaay-save-places-plan-trips/id6742421480 · OutOut: https://play.google.com/store/apps/details?id=com.outout.social&hl=en_US
- StrollUp (Inc42, older): https://inc42.com/startups/strollup/
- Group voting apps: Tine https://apps.apple.com/us/app/tine-group-dining-planner/id1464574308 · Chewsr https://chewsr.com/ · uChoose https://uchoose.app/ · Hangrily https://hangrily.app/restaurant-voting-app · TasteMate https://tastemate.app/ · GetTogether https://apps.apple.com/us/app/gettogether-meet-eat-repeat/id6752873456
- Howbout funding (TechCrunch): https://techcrunch.com/2024/09/13/howbout-raises-8m-from-goodwater-to-build-a-calendar-that-you-can-share-with-your-friends
- Partiful (CNBC/NBC): https://www.nbcnewyork.com/news/business/money-report/meet-partiful-the-gen-z-party-planning-staple-thats-taking-on-apple/6231135/ · Sacra: https://sacra.com/c/partiful
- Instagram Collaborative Collections (TechCrunch, 2023): https://techcrunch.com/2023/03/29/instagram-now-lets-you-bookmark-posts-with-friends-and-store-them-in-a-dedicated-space
- Instagram Map (TechCrunch, Aug 2025): https://techcrunch.com/2025/08/06/instagram-takes-on-snapchat-with-new-instagram-map
- Google Maps collaborative lists (TechCrunch, 2023): https://techcrunch.com/2023/11/15/google-maps-gets-more-social-feature-help-you-collaborate-with-friends/ · teardown (2025): https://www.androidauthority.com/google-maps-share-list-search-results-apk-teardown-3589963/
- District by Zomato: https://businesstoday.in/technology/news/story/zomato-launches-district-app-for-dining-and-live-events-experiences-see-details-454001-2024-11-16 · https://eternal.com/our-businesses/district
- Show HN posts: https://news.ycombinator.com/item?id=46553993 · https://news.ycombinator.com/item?id=44520916
- Saved-posts behaviour (Medium case study): https://medium.com/design-bootcamp/rethinking-instagram-saved-driving-more-revisits-to-saved-content-d368c30009f2
- Toast diner survey: https://pos.toasttab.com/blog/on-the-line/restaurant-social-media
- Food decision surveys: https://www.gourmetnews.com/factor/ · https://www.psychreg.org/canadians-spend-nearly-full-working-2-weeks-annually-deciding-what-eat/
