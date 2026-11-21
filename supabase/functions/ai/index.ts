// Yonder AI server function (Supabase Edge Function, Deno).
// The app's own AI key lives here as a secret, so people using Yonder never need an AI account of their own.
// Free setup: GEMINI_API_KEY (Google AI Studio, free tier). Optional: GEMINI_MODEL (default gemini-flash-latest).
// Alternative: ANTHROPIC_API_KEY (+ optional AI_MODEL, default claude-opus-5-5) is used if no Gemini key is set.
// AI_DAILY_LIMIT (optional, default 40 calls per person per day).
// Tasks: "plan" (3 options for a group), "ask" (free question), "extract" (places from a shared link or text).

import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// Newer projects also expose keys as JSON dictionaries; use the legacy key if present, otherwise the first new key.
const firstKey = (name: string) => { const v = Deno.env.get(name); if (!v) return ""; try { const j = JSON.parse(v); if (j && typeof j === "object") return String(Object.values(j)[0] || ""); } catch { /* plain string */ } return v; };
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || firstKey("SUPABASE_PUBLISHABLE_KEYS");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || firstKey("SUPABASE_SECRET_KEYS");
const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") || "";
// Models are discovered from Google at start-up (names change as Google retires old ones).
// They are tried in order; if one is busy (503), rate-limited (429) or missing (404), the next one is used.
const GEMINI_FALLBACK = ["gemini-3.6-flash", "gemini-3.8-flash", "gemini-flash-latest", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
let geminiModels: string[] | null = null;
let attempts: { model: string; ms: number; status: number }[] = []; // timing info returned with each answer
async function geminiModelList(): Promise<string[]> {
  if (geminiModels) return geminiModels;
  let found: string[] = [];
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", { headers: { "x-goog-api-key": GEMINI_KEY }, signal: AbortSignal.timeout(8000) });
    if (r.ok) {
      const j = await r.json();
      const ver = (n: string) => Number((n.match(/gemini-(\d+(?:\.\d+)?)/) || [])[1] || 0);
      found = (j.models || [])
        .filter((m: any) => (m.supportedGenerationMethods || []).includes("generateContent"))
        .map((m: any) => String(m.name || "").replace(/^models\//, ""))
        .filter((n: string) => /^gemini-.*flash/.test(n) && !/image|tts|audio|live|embed|exp|thinking/.test(n))
        .sort((a: string, b: string) => (/lite/.test(a) ? 1 : 0) - (/lite/.test(b) ? 1 : 0) || (/preview/.test(a) ? 1 : 0) - (/preview/.test(b) ? 1 : 0) || ver(b) - ver(a))
        .slice(0, 5);
    }
  } catch { /* use the fallback list */ }
  const env = Deno.env.get("GEMINI_MODEL");
  geminiModels = [...new Set([...(env ? [env] : []), ...found, ...GEMINI_FALLBACK])].slice(0, 7);
  return geminiModels;
}
const CLAUDE_MODEL = Deno.env.get("AI_MODEL") || "claude-opus-5-5";
let MODEL = GEMINI_KEY ? "gemini" : CLAUDE_MODEL; // updated to the model that actually answered
const DAILY_LIMIT = Number(Deno.env.get("AI_DAILY_LIMIT") || "40");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const CATEGORIES = ["bars", "cafe", "food", "sunset", "shows", "workshop", "shop"];
const TASTE: Record<string, string> = {
  pottery: "pottery & clay", standup: "stand-up comedy", speakeasy: "speakeasy bars", sunset: "sunset spots", streetfood: "street food crawls",
  artcraft: "art & craft workshops", livemusic: "live music gigs", boardgames: "board-game cafés", treks: "day treks", clubs: "clubbing",
  dance: "dance workshops", cafes: "café hopping", heritage: "heritage walks", rooftop: "rooftop hangouts", flea: "flea markets", shopping: "boutiques & shopping",
};

/* ---------------- prompts (kept here so they can be versioned and evaluated) ---------------- */
const PLAN_SYSTEM = `You are Yonder's planner. A group of friends wants to go out together. They can be anywhere in the world: work out the city from "locations" (where the people coming usually are), the areas they chose and the bucket list, and suggest places in that city. Suggest exactly 5 options that fit what they chose.

How to choose:
1. Hard limits come first: who is coming, when, budget per person, areas, everything under "keep_in_mind" and "anything_else". Never suggest something that breaks one (for example a meat-only place when someone coming is vegetarian, a drinks-only bar when someone doesn't drink unless it is known for good mocktails, or something clearly above the budget).
2. "ideas_from": "list" means only places from the bucket list; "new" means only places that are not on the list; "both" means include at least one bucket-list place if any fits.
3. Prefer places that the people coming marked as interested, and kinds of things the people coming like. Avoid kinds of things they marked "not for me".
4. Use past ratings: lean towards things like what they loved. Don't suggest a place they've already been to unless asked.
5. Make the 5 options different from each other (kind of place, area or price), so the vote is a real choice.
6. New places must be real, well-known places in the group's city that are very likely still open. If you are not sure a place exists, pick from the list instead. Never invent a place.
7. Only people in "coming" matter for tastes and limits. Ignore people who are not coming.
8. "already_shown" lists places you suggested earlier in this session. Never suggest any of them again: this is a request for different ideas, so vary the kind of place and the area as well.
9. Category "shop" is shopping: stores, boutiques, markets, malls, thrift and vintage shops. If they are in the mood for shopping, suggest those.
10. "areas" can include "near most of us", "anywhere in the city" (no area limit) or places the people typed themselves. Respect them. If a typed place is small or unfamiliar, choose real, well-known places in and around it.

For "why", write one or two short sentences that name the people it suits and the concrete reasons, e.g. "Kabir and Riya both saved it; about ₹1,250 each, inside your budget; good mocktails for Sana." Say "about" for prices and use the local currency of the group's city (budget_per_person shows the currency symbol to use). Never state exact opening hours, availability or bookings.

Reply with JSON only, no markdown, in exactly this shape:
{"reply": "<one friendly sentence about the 5 picks>", "options": [{"place_id": "<exact id from the bucket list, or null for a new place>", "name": "<place name>", "area": "<neighbourhood, city>", "category": "bars|cafe|food|sunset|shows|workshop|shop", "price": "<e.g. about 1,200 per person in local currency, or Free>", "why": "<1-2 sentences>"}]}`;

const ASK_SYSTEM = `You are Yonder's assistant inside a friend group's planning space. The group can be anywhere in the world: work out the city from where the people usually are and the bucket list. Answer the person's question in one or two friendly sentences and suggest up to 3 places.

Rules: prefer places from the group's bucket list when they fit (copy the exact place_id). You may add at most 2 new places, and only real, well-known places in the group's city that are very likely still open; never invent one. Respect the group's memory (diets, who doesn't drink, budgets). Say "about" for prices; never state exact opening hours or availability.

Reply with JSON only, no markdown:
{"reply": "<1-2 sentences>", "suggestions": [{"place_id": "<exact id or null>", "name": "", "area": "<neighbourhood, city>", "category": "bars|cafe|food|sunset|shows|workshop|shop", "price": "", "why": "<one sentence>"}]}`;

const EXTRACT_SYSTEM = `You read something a person shared into Yonder and pull out the specific places to go that it names. It can be a social media link preview (caption), a video title, a Google Maps link, text from their notes, and sometimes the VIDEO itself.

When a video is attached, WATCH and LISTEN to all of it. Places are often only spoken (Hindi, English or Hinglish: "Bandra mein ek kaafi accha café hai, Subko"), shown as on-screen text or captions, or visible on signs, menus, cups and maps. Use the audio, the on-screen text, the visuals and the caption together.

Rules:
- Only include places that are actually named (said, shown or written). Don't guess a name from the vibe, the creator's handle, hashtags, sponsors or product brands.
- If it is clearly about a kind of place or an area but names none, return exactly one entry with "name": "" and "confidence": "partial", with the category and area you can tell.
- If nothing usable is there, return "places": [].
- If it is a guide or list, return every place it names (up to 100), each with the "section" heading it sits under (e.g. "Bakeries", "Under 1000 for 2"). Use a section's price band as the price of the places in it.
- "area" is the neighbourhood AND city (e.g. "Bandra, Mumbai", "Shoreditch, London", "Marais, Paris") if stated or obvious for a famous place; otherwise "". Places can be anywhere in the world. Always include the city when you know it, because the app uses it to find the place on a map.
- "category" "shop" is for shopping: stores, boutiques, markets, malls, thrift and vintage shops.
- "price" only if it is stated (e.g. "₹2,500 for two", "$30 per person"), keeping the currency as written; otherwise "".
- "evidence" says where you found the name: "caption", "heard in video", "on screen" or "list". Prefer the clearest one.

Reply with JSON only, no markdown:
{"title": "<short title for what was shared>", "note": "<optional, under 15 words>", "places": [{"name": "", "area": "<neighbourhood, city>", "category": "bars|cafe|food|sunset|shows|workshop|shop", "price": "", "note": "<under 10 words>", "section": "<heading it was listed under, or empty>", "evidence": "caption|heard in video|on screen|list", "confidence": "sure|partial"}]}`;

/* ---------------- model call (Gemini free tier, or Claude) ---------------- */
function parseJson(text: string) {
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a < 0 || b < a) throw new Error("no json");
  return JSON.parse(text.slice(a, b + 1));
}
type Media = { fileData?: { fileUri: string }; inlineData?: { mimeType: string; data: string } };
async function callGemini(system: string, user: string, maxTokens: number, media: Media[] = []): Promise<any> {
  let lastErr = "";
  const hasMedia = media.length > 0;
  // Watching a video takes longer than reading text: allow more time, but try fewer models.
  const models = (await geminiModelList()).slice(0, hasMedia ? 3 : 7);
  // Time limits, so one busy model can't make people wait minutes: each model gets a short turn, and the whole call has a ceiling.
  // Plans and questions answer in about 5 s; reading a big list or a video takes longer.
  const big = maxTokens >= 8000;
  const perModel = hasMedia ? 40000 : big ? 30000 : 12000, budget = hasMedia ? 75000 : big ? 60000 : 30000, started = Date.now();
  for (const model of models) {
    const left = budget - (Date.now() - started);
    if (left < 4000) { lastErr = lastErr || "ran out of time"; break; }
    // Low thinking keeps answers fast; if a model doesn't accept that setting (400), ask again without it.
    const send = (lowThinking: boolean) => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [...media, { text: user }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.4, maxOutputTokens: Math.max(maxTokens, 8192),
          ...(lowThinking ? { thinkingConfig: { thinkingLevel: "low" } } : {}),
          ...(hasMedia && lowThinking ? { mediaResolution: "MEDIA_RESOLUTION_LOW" } : {}) }, // fewer tokens per video frame: faster, and kinder to the free tier
      }),
      signal: AbortSignal.timeout(Math.min(perModel, left)),
    }).catch((e) => ({ ok: false, status: 0, text: async () => String(e) } as any));
    const t = Date.now();
    let r: any = await send(true);
    if (r.status === 400) r = await send(false);
    attempts.push({ model, ms: Date.now() - t, status: r.status });
    if (!r.ok) {
      lastErr = `gemini ${model} ${r.status}: ${(await r.text()).slice(0, 160)}`;
      if ([0, 404, 429, 500, 503].includes(r.status)) continue; // busy or missing: try the next model
      throw new Error(lastErr);
    }
    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("");
    if (!text) { lastErr = "empty answer" + (data?.promptFeedback?.blockReason ? ` (${data.promptFeedback.blockReason})` : ""); continue; }
    MODEL = model;
    return parseJson(text);
  }
  throw new Error(lastErr || "no gemini model");
}
async function callClaude(system: string, user: string, maxTokens: number): Promise<any> {
  const { default: Anthropic } = await import("npm:@anthropic-ai/sdk");
  const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY
  const base = { model: CLAUDE_MODEL, max_tokens: maxTokens, system, messages: [{ role: "user" as const, content: user }], output_config: { effort: "low" } };
  const supportsFallback = /^claude-(opus-5|sonnet-5-5|fable)/.test(CLAUDE_MODEL); // server-side refusal fallback
  const msg: any = supportsFallback
    ? await anthropic.beta.messages.create({ ...base, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" } as any)
    : await anthropic.messages.create(base as any);
  if (msg.stop_reason === "refusal") throw new Error("refused");
  return parseJson((msg.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join(""));
}
const callAI = (system: string, user: string, maxTokens = 4000, media: Media[] = []) => GEMINI_KEY ? callGemini(system, user, maxTokens, media) : callClaude(system, user, maxTokens); // only Gemini can watch video

const str = (v: unknown, n = 200) => (typeof v === "string" ? v : v == null ? "" : String(v)).slice(0, n);
const cat = (v: unknown) => (CATEGORIES.includes(String(v)) ? String(v) : "shows");
function cleanOption(o: any, validIds: Set<string>) {
  const id = typeof o?.place_id === "string" && validIds.has(o.place_id) ? o.place_id : null;
  return { place_id: id, name: str(o?.name, 80), area: str(o?.area, 60), category: cat(o?.category), price: str(o?.price, 40), why: str(o?.why, 300) };
}

/* ---------------- group context ---------------- */
async function groupContext(admin: any, gid: string, uid: string) {
  const { data: mem } = await admin.from("group_members").select("user_id").eq("group_id", gid);
  if (!mem || !mem.some((m: any) => m.user_id === uid)) throw new Error("not a member");
  const ids = mem.map((m: any) => m.user_id);
  const [g, profiles, places, interests, ratings] = await Promise.all([
    admin.from("groups").select("id,name,memory,is_personal").eq("id", gid).single(),
    admin.from("profiles").select("id,name,home_area,taste").in("id", ids),
    admin.from("places").select("id,name,area,category,price,note,done,added_by,created_at").eq("group_id", gid).order("created_at", { ascending: false }).limit(80),
    admin.from("interests").select("place_id,user_id").eq("group_id", gid),
    admin.from("ratings").select("place_id,user_id,went,stars").eq("group_id", gid),
  ]);
  const names: Record<string, string> = {};
  (profiles.data || []).forEach((p: any) => (names[p.id] = p.id === uid ? `${p.name} (the person asking)` : p.name));
  const people = (profiles.data || []).map((p: any) => ({
    name: names[p.id], usually_in: String(p.home_area || "").split("|")[0] || "unknown", // stored as "label|lat,lng|CC"
    likes: (p.taste?.like || []).map((k: string) => TASTE[k] || k), not_for_them: (p.taste?.nope || []).map((k: string) => TASTE[k] || k),
  }));
  const list = (places.data || []).map((p: any) => ({
    place_id: p.id, name: p.name, area: p.area, category: p.category, price: p.price, note: p.note,
    already_been: p.done, saved_by: names[p.added_by] || "someone",
    interested: (interests.data || []).filter((i: any) => i.place_id === p.id).map((i: any) => names[i.user_id]).filter(Boolean),
    ratings: (ratings.data || []).filter((r: any) => r.place_id === p.id && r.went && r.stars).map((r: any) => `${names[r.user_id]}: ${r.stars}/5`),
  }));
  return { group: g.data, names, people, list, validIds: new Set<string>(list.map((p: any) => p.place_id)) };
}

/* ---------------- link previews (public metadata only, allow-listed hosts) ---------------- */
function youtubeId(u: URL): string {
  const host = u.hostname.replace(/^(www|m)\./, "");
  const id = host === "youtu.be" ? u.pathname.slice(1).split("/")[0] : u.searchParams.get("v") || (u.pathname.match(/^\/(?:shorts|live|embed)\/([\w-]{6,})/) || [])[1] || "";
  return /^[\w-]{6,20}$/.test(id) ? id : "";
}
async function readLink(raw: string): Promise<{ kind: string; text: string; url: string; watch?: string } | null> {
  let u: URL; try { u = new URL(raw); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.replace(/^(www|m)\./, "");
  const get = (url: string) => fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; YonderLinkPreview/1.0)", "Accept-Language": "en" }, redirect: "follow", signal: AbortSignal.timeout(6000) });
  try {
    if (host === "youtube.com" || host === "youtu.be") {
      const r = await get(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(raw)}`);
      const vid = youtubeId(u);
      const watch = vid ? `https://www.youtube.com/watch?v=${vid}` : "";
      if (r.ok) { const j = await r.json(); return { kind: "yt", url: raw, watch, text: `YouTube video title: ${j.title}\nChannel: ${j.author_name}` }; }
      return { kind: "yt", url: raw, watch, text: "" };
    }
    if (host === "instagram.com") {
      const r = await get(raw); const html = r.ok ? (await r.text()).slice(0, 300000) : "";
      const meta = (p: string) => (html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']*)["']`, "i")) || [])[1] || "";
      const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
      const text = [meta("og:title"), meta("og:description") || meta("description")].filter(Boolean).map(decode).join("\n");
      return { kind: "ig", url: raw, text: text ? `Instagram post preview:\n${text}` : "" };
    }
    if (host === "maps.app.goo.gl" || host === "goo.gl") {
      const r = await get(raw); return readMaps(r.url) || { kind: "maps", url: raw, text: "" };
    }
    if (host.startsWith("google.") && u.pathname.startsWith("/maps")) return readMaps(raw);
  } catch { /* fall through */ }
  return { kind: "link", url: raw, text: `Link: ${raw}` };
}
function readMaps(url: string) {
  const m = url.match(/\/maps\/place\/([^/@?]+)/);
  if (!m) return null;
  return { kind: "maps", url, text: `Google Maps place: ${decodeURIComponent(m[1].replace(/\+/g, " "))}` };
}

/* ---------------- handler ---------------- */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const userClient = createClient(SUPABASE_URL, req.headers.get("apikey") || ANON_KEY, { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ ok: false, reason: "auth", message: "Please sign in" });
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const body = await req.json().catch(() => ({}));
    const task = body.task;
    attempts = []; const t0 = Date.now(); let linkMs = 0;
    const timing = () => ({ total_ms: Date.now() - t0, link_ms: linkMs, attempts });
    if (!["plan", "ask", "extract"].includes(task)) return json({ ok: false, reason: "bad_task" });

    const { data: used } = await admin.rpc("bump_ai_usage", { p_user: user.id, p_limit: DAILY_LIMIT });
    if (used === -1) return json({ ok: false, reason: "limit", message: "Daily AI limit reached" });

    const today = str(body.today, 60) || new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); // the person's own date

    if (task === "extract") {
      const url = str(body.url, 600), text = str(body.text, 12000);
      const tl = Date.now(); const link = url ? await readLink(url) : null; linkMs = Date.now() - tl;
      // Video: either one the person uploaded (screen recording of a reel), or a public YouTube video that Gemini can watch itself.
      const media: Media[] = []; let watched = "";
      const up = body.video;
      if (up && typeof up.data === "string" && /^(video|audio)\//.test(String(up.mime))) {
        if (up.data.length > 19_000_000) return json({ ok: false, reason: "too_big", message: "That video is too big. Trim it to under a minute and try again." });
        media.push({ inlineData: { mimeType: String(up.mime).slice(0, 40), data: up.data } }); watched = "upload";
      } else if (GEMINI_KEY && link?.watch) { media.push({ fileData: { fileUri: link.watch } }); watched = "youtube"; }
      const content = [link?.text, text ? `Text the person shared:\n${text}` : "", media.length ? "A video is attached. Watch and listen to it, and use it together with the text above." : ""].filter(Boolean).join("\n\n");
      if (!content.trim() || content.trim() === `Link: ${url}`) return json({ ok: true, title: "Shared link", source_kind: link?.kind || "link", places: [], note: "Couldn't read this link. Type the place name or add the video.", watched: "" });
      let out: any;
      try { out = await callAI(EXTRACT_SYSTEM, content, 12000, media); }
      catch (e) {
        if (!media.length || watched === "upload") throw e; // an uploaded video is the whole point, so report the failure
        watched = ""; out = await callAI(EXTRACT_SYSTEM, content, 6000); // YouTube video couldn't be opened: fall back to the title (short time limit)
      }
      const places = (Array.isArray(out.places) ? out.places : []).slice(0, 100).map((p: any) => ({
        section: str(p.section, 60),
        name: str(p.name, 80), area: str(p.area, 60), category: cat(p.category), price: str(p.price, 40), note: str(p.note, 80),
        evidence: ["caption", "heard in video", "on screen", "list"].includes(String(p.evidence)) ? String(p.evidence) : "",
        confidence: p.confidence === "partial" || !str(p.name) ? "partial" : "sure",
      }));
      return json({ ok: true, title: str(out.title, 80) || "Shared link", note: str(out.note, 120), source_kind: link?.kind || (url ? "link" : "list"), places, watched, model: MODEL, timing: timing() });
    }

    const ctx = await groupContext(admin, str(body.group_id, 60), user.id);
    if (task === "plan") {
      const p = body.prefs || {};
      const coming = (Array.isArray(p.who) ? p.who : []).map((id: string) => ctx.names[id]).filter(Boolean);
      const input = {
        today, group: ctx.group?.is_personal ? "Planning solo" : ctx.group?.name,
        coming: coming.length ? coming : ["just the person asking"],
        when: p.when ? `${p.when} (${p.date})` : p.date, in_the_mood_for: p.moods || [], budget_per_person: p.budget, areas: p.areas || [],
        locations: (Array.isArray(p.locations) ? p.locations : []).slice(0, 6).map((x: unknown) => str(x, 80)),
        already_shown: (Array.isArray(p.exclude) ? p.exclude : []).slice(0, 20).map((x: unknown) => str(x, 80)),
        ideas_from: p.source || "both", keep_in_mind: p.memory || [], anything_else: str(p.extra, 500),
        people: ctx.people, bucket_list: ctx.list,
      };
      const out = await callAI(PLAN_SYSTEM, JSON.stringify(input, null, 1));
      const options = (Array.isArray(out.options) ? out.options : []).slice(0, 5).map((o: any) => cleanOption(o, ctx.validIds)).filter((o: any) => o.name);
      if (options.length < 1) throw new Error("no options");
      return json({ ok: true, reply: str(out.reply, 300), options, model: MODEL, timing: timing() });
    }
    // ask
    const input = { today, group: ctx.group?.name, group_memory: ctx.group?.memory || [], people: ctx.people, bucket_list: ctx.list, question: str(body.question, 500) };
    const out = await callAI(ASK_SYSTEM, JSON.stringify(input, null, 1));
    const suggestions = (Array.isArray(out.suggestions) ? out.suggestions : []).slice(0, 3).map((o: any) => cleanOption(o, ctx.validIds)).filter((o: any) => o.name);
    return json({ ok: true, reply: str(out.reply, 400), suggestions, model: MODEL, timing: timing() });
  } catch (e) {
    console.error(e);
    return json({ ok: false, reason: "error", message: String((e as Error)?.message || e), attempts });
  }
});
