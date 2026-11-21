# Putting Yonder online (free)

> **Status (21 Nov 2026): done.** Live at **https://yonderapp.netlify.app**. Supabase project "Yonder" (Mumbai); the AI function is named `super-worker` (set in `yonder/config.js` as `aiFunction`). Secrets: `GEMINI_API_KEY`, `GEMINI_MODEL=gemini-3.5-flash-lite`. To update the site later: in Netlify open the site → **New version** (agent run), drop the `yonder` folder, then **Publish**. Also run `supabase/migration-shopping.sql` once in Supabase's SQL Editor (adds the Shopping category) and re-deploy the AI function whenever `supabase/functions/ai/index.ts` changes.

Everything here is on a **free plan, with no card needed**. It's meant for evaluators and testers, not commercial use.

| What | Why | Cost |
|---|---|---|
| **Google AI Studio key (Gemini)** | Yonder's own AI key, so visitors never need an AI account | Free tier, with a daily limit |
| **Supabase** | Logins, database, live updates, the AI server function | Free plan |
| **Netlify** | Hosts the website and gives you the link | Free plan |

**Free-plan catches to know:**
- **Gemini's free tier has a daily limit** (Google shows the exact numbers in AI Studio), and Google may use free-tier requests to improve its products. Only demo data and testers' plan requests go through it. If the limit is hit, Yonder quietly switches to "quick picks" from the bucket list, so nothing breaks.
- **Supabase pauses a free project after about 7 days with no activity.** Open the Yonder link every few days while people are evaluating it. If it does pause, Supabase emails you and you restore it with one click in the dashboard.

---

## Step 1: Free Gemini key
1. Go to **aistudio.google.com** and sign in with a Google account.
2. Click **Get API key → Create API key**, and copy it.
3. **Don't paste it in chat.** It only goes into Supabase in step 4.

## Step 2: Supabase project
1. Go to **supabase.com** and sign up (GitHub or email). Click **New project**.
2. Name it `yonder`, choose region **Mumbai (ap-south-1)**, set a database password (keep it to yourself), and keep the **Free** plan.
3. Wait about 2 minutes.

## Step 3: Database
1. Go to **SQL Editor → New query**.
2. Paste the contents of `supabase/schema.sql` (Claude can copy it to your clipboard) and click **Run**. You should see "Success".
3. Go to **Authentication → Sign In / Providers**:
   - Turn on **Allow anonymous sign-ins**. This powers "Try it now".
   - Under **Email**, turn off **Confirm email**, so testers can sign up and use it straight away.

## Step 4: AI server function
1. Go to **Edge Functions → Deploy a new function → Via Editor**, and name it exactly `ai`.
2. Replace the sample code with `supabase/functions/ai/index.ts` (Claude can copy it to your clipboard), then **Deploy**.
3. Go to **Edge Functions → Secrets** and add `GEMINI_API_KEY` = your key from step 1.

## Step 5: Connect the website
1. Go to **Project Settings → API / Data API**.
2. Send Claude the **Project URL** and the **anon public** key. Both are public by design, and the database rules protect the data. Claude puts them in `yonder/config.js`.

## Step 6: Put it online
1. Go to **app.netlify.com/drop** and sign up. You need to be signed in, or the site disappears after an hour.
2. Drag the **`yonder`** folder onto the page and copy the link it gives you.
3. Optional: **Site configuration → Change site name** (e.g. `yonder-plans`).
4. In Supabase, go to **Authentication → URL Configuration** and set **Site URL** to that link.

## Step 7: Check it like an evaluator
- Open the link in a **private window**, tap **Try it now**, and do the tour.
- Plan something in Bandra Bunch. The results header should say **"Yonder AI"**, not "Quick picks".
- Open the invite link in a second browser and check that messages show up live in both.

---

### What's where
- `yonder/`: the website
- `supabase/schema.sql`: tables, who-can-see-what rules, invite codes, demo copies, daily AI limit
- `supabase/functions/ai/index.ts`: the AI server function and its three prompts. It uses Gemini when `GEMINI_API_KEY` is set, otherwise Claude with `ANTHROPIC_API_KEY`
