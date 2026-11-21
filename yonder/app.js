/* Yonder — UI */
(function(){
'use strict';
const {D, api, MODE, BOTS, BOT_IDS, CATS, AREAS, TASTE_CARDS, TASTE_BY_ID, PLACE_DB, KNOWN_LINKS, COLORS, areaKey, coordsFor, ymd, nextDow} = window.Y;

/* ================= icons ================= */
const ICON = {
  home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  cards:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M3 7v10M21 7v10"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  pin:'<path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  send:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  check:'<path d="M5 12l5 5 9-10"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  maps:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', x:'<path d="M6 6l12 12M18 6L6 18"/>',
  left:'<path d="M15 6l-6 6 6 6"/>', right:'<path d="M9 6l6 6-6 6"/>', up:'<path d="M6 15l6-6 6 6"/>', down:'<path d="M6 9l6 6 6-6"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"/><path d="M12 17.5v.01"/>',
  logout:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  vote:'<path d="M4 13h16v8H4z"/><path d="M8 13V5h8v8"/><path d="M10 9l1.5 1.5L14 8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  glass:'<path d="M4 4h16l-8 9z"/><path d="M12 13v7M8 20h8"/><path d="M15 4l3-2"/>',
  cup:'<path d="M4 8h12v5a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 2.5v3M12 2.5v3"/>',
  bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1.5-1.5 1.5-3M13 7c0-1.5 1.5-1.5 1.5-3"/>',
  sun:'<path d="M2 18h20"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M12 6V3M4.9 10.9L3 9M19.1 10.9L21 9"/><path d="M6 21.5h12"/>',
  mic:'<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  vase:'<path d="M9 3h6"/><path d="M10 3c0 3-5 4.5-5 10a7 7 0 0 0 14 0c0-5.5-5-7-5-10"/><path d="M5.5 12.5h13"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8s-.9-1.4-.9-2.4.9-1.6 2-1.6h2a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15.5" cy="7.5" r="1.2"/>',
  note:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3"/><circle cx="16" cy="8" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="8" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.3"/>',
  mountain:'<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 10.5l1.5 1.5 1.5-1.5"/>',
  disco:'<circle cx="12" cy="14" r="7"/><path d="M5 14h14M12 7v14M7 10h10M7 18h10M12 2v5"/>',
  dance:'<circle cx="14" cy="4" r="2"/><path d="M14 7l-3 6 4 2-2 6"/><path d="M11 13l-5-2M15 9l4 2"/>',
  column:'<path d="M3 21h18M5 21V10M19 21V10M9.5 21V10M14.5 21V10M2 10h20M12 3l9 5H3z"/>',
  skyline:'<path d="M3 21V11h4v10M7 21V5h6v16M13 21V9h4v12M17 21v-6h4v6M2 21h20"/>',
  bag:'<path d="M5 8h14l-1 13H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  ig:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
  yt:'<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6v.01M3.5 12v.01M3.5 18v.01"/>',
};
const ic = (n, cls='') => `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||''}</svg>`;
const LOGO = `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="6" width="40" height="40" rx="11" fill="#111"/><rect x="2" y="2" width="40" height="40" rx="11" fill="#2B44FF" stroke="#111" stroke-width="3"/><path d="M22 37s10-8.6 10-17a10 10 0 0 0-20 0c0 8.4 10 17 10 17z" fill="#FFD60A" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M16.5 21a5.5 5.5 0 0 1 11 0z" fill="#FF5CA8" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/><path d="M15 21h14" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg>`;

/* ================= helpers ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const me = () => D.me;
const prof = id => D.profiles[id] || {id, name:'Someone', color:'#9AA8FF'};
const nm = id => id===me().id ? 'You' : prof(id).name;
const first = s => (s||'?').trim()[0] || '?';
const inkOn = c => ['#111111','#2B44FF','#111'].includes((c||'').toUpperCase()) ? '#fff' : '#111';
const av = (id, cls='') => { const p=prof(id); return `<span class="av ${cls}" style="background:${p.color};color:${inkOn(p.color)}" title="${esc(p.name)}">${esc(first(p.name))}</span>`; };
// Google Maps search for a place. Older Mumbai places only store a neighbourhood, so "Mumbai" is added for those.
const mapsUrl = p => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${p.name}${p.area?', '+p.area:''}${areaKey(p.area) && !/mumbai/i.test(p.area||'') ? ', Mumbai' : ''}`);
const todayYmd = () => ymd(new Date());
const fmtDay = d => new Date(d).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
const fmtDate = s => new Date(s+'T12:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
const fmtTime = iso => new Date(iso).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'}).toLowerCase();
function dayLabel(iso){ const d=ymd(new Date(iso)), t=todayYmd(); const y=new Date(); y.setDate(y.getDate()-1); if(d===t) return 'Today'; if(d===ymd(y)) return 'Yesterday'; return fmtDay(iso); }
function km(a,b){const R=6371,t=x=>x*Math.PI/180;const dLa=t(b[0]-a[0]),dLo=t(b[1]-a[1]);const h=Math.sin(dLa/2)**2+Math.cos(t(a[0]))*Math.cos(t(b[0]))*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(h));}
function perPerson(price){
  if(!price) return null; const s=String(price).toLowerCase(); if(s.includes('free')) return 0;
  const nums = (s.match(/\d[\d,]*/g)||[]).map(x=>+x.replace(/,/g,'')); if(!nums.length) return null;
  const v = nums.length>1 ? (nums[0]+nums[1])/2 : nums[0];
  return s.includes('two') ? Math.round(v/2) : v;
}
const buzz = (ms=12) => { try{ navigator.vibrate && navigator.vibrate(ms); }catch(e){} };
function toast(msg){ const r=$('#toast-root'); r.innerHTML=`<div class="toast" role="status">${esc(msg)}</div>`; clearTimeout(toast.t); toast.t=setTimeout(()=>r.innerHTML='',3200); }
const store = { get(k,d){ try{ const v=localStorage.getItem('yonder-ui-'+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem('yonder-ui-'+k, JSON.stringify(v)); }catch(e){} } };

/* ================= derived data ================= */
// Demo groups in a fixed order (Bengaluru ones first); a person's own groups follow.
const DEMO_ORDER = ['Office gang','Shopping','Thailand trip','Bandra Bunch'];
const groupRank = g => { const i = DEMO_ORDER.indexOf(g.name); return g.is_demo && i>=0 ? i : 50; };
const myGroups = () => D.groups.filter(g=>D.members.some(m=>m.group_id===g.id && m.user_id===me().id)).sort((a,b)=>groupRank(a)-groupRank(b));
const sharedGroups = () => myGroups().filter(g=>!g.is_personal);
const personal = () => myGroups().find(g=>g.is_personal);
const groupById = id => D.groups.find(g=>g.id===id);
const membersOf = gid => D.members.filter(m=>m.group_id===gid).map(m=>m.user_id).sort((a,b)=> a===me().id?-1 : b===me().id?1 : nm(a).localeCompare(nm(b)));
const placesOf = gid => D.places.filter(p=>p.group_id===gid);
const placeById = id => D.places.find(p=>p.id===id);
const interested = pid => D.interests.filter(i=>i.place_id===pid).map(i=>i.user_id);
const plansOf = gid => D.plans.filter(p=>p.group_id===gid);
const votesOf = pid => D.votes.filter(v=>v.plan_id===pid);
const ratingsOf = pid => D.ratings.filter(r=>r.place_id===pid && r.went && r.stars);
const avgStars = pid => { const r=ratingsOf(pid); return r.length ? (r.reduce((a,b)=>a+b.stars,0)/r.length) : null; };
const msgsOf = gid => D.messages.filter(m=>m.group_id===gid).sort((a,b)=>a.created_at.localeCompare(b.created_at));
/* "Where are you usually?" is stored as one text: "Bandra West, Mumbai, India|19.06,72.83|IN". Older values are just an area name. */
function parseHome(s){
  s = String(s||''); const m = s.match(/^(.*)\|(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:\|([A-Za-z]{2}))?$/);
  if(m) return {label:m[1], ll:[+m[2],+m[3]], cc:(m[4]||'').toUpperCase()};
  const k = areaKey(s); return {label:s, ll:k?AREAS[k]:null, cc:k?'IN':''};
}
const encodeHome = pick => !pick ? '' : pick.ll ? `${pick.label}|${pick.ll[0].toFixed(4)},${pick.ll[1].toFixed(4)}${pick.cc?'|'+pick.cc:''}` : pick.label;
const homeOf = p => parseHome((p||me()).home_area);
const homeLL = () => homeOf().ll;
const MUMBAI = [19.058, 72.832];
const nearMumbai = ll => !ll || km(ll, MUMBAI) < 150; // Yonder's built-in demo ideas and neighbourhoods are for Mumbai
const areaLabel = a => String(a||'').split(',')[0].trim();
/* Budget chips follow the currency of the country you're in. */
const EURO = 'DE FR ES IT NL BE PT IE AT FI GR LU'.split(' ');
const CUR = {IN:['₹',500,1000,2000], US:['$',10,25,50], GB:['£',10,25,50], AE:['AED ',40,100,200], SG:['S$',15,40,80], AU:['A$',15,40,80], CA:['C$',15,40,80], JP:['¥',1500,4000,8000]};
function money(){ const h = homeOf(); if(!h.label) return CUR.IN; return CUR[h.cc] || (EURO.includes(h.cc) ? ['€',10,25,50] : h.cc ? ['$',10,25,50] : CUR.IN); }
const fmtMoney = n => { const [sym] = money(); return sym + Number(n).toLocaleString('en-US'); };
function budgetOpts(){ const [s,a,b,c] = money(); return [['u500',`Under ${s}${a.toLocaleString('en-US')}`],['u1000',`${s}${a.toLocaleString('en-US')}–${b.toLocaleString('en-US')}`],['u2000',`${s}${b.toLocaleString('en-US')}–${c.toLocaleString('en-US')}`],['o2000',`${s}${c.toLocaleString('en-US')}+`],['any','Doesn’t matter']]; }
const budgetMax = () => { const [, a,b,c] = money(); return {u500:a, u1000:b, u2000:c, o2000:1e9}; };
/* Home ideas outside Mumbai: one AI call per area + taste, kept in this browser (refreshed monthly). */
const ideaStore = store.get('ideas', {}); const ideaMem = {}; 
function aiIdeasFor(likes, label, have){
  const key = label+'|'+likes.slice().sort().join(',')+'|'+new Date().toISOString().slice(0,7);
  if(ideaStore[key]) return {list:ideaStore[key].filter(x=>!have.has(String(x.name).toLowerCase())).slice(0,2)};
  if(ideaMem[key]) return ideaMem[key];
  const g = personal(); if(MODE!=='cloud' || !g) return {list:[]};
  ideaMem[key] = {list:[], loading:true};
  const taste = likes.map(k=>TASTE_BY_ID[k]&&TASTE_BY_ID[k].label).filter(Boolean).join(', ');
  api.ai('ask', {group_id:g.id, today:todayText(), question:`Suggest 3 new places in or near ${label} for someone who likes: ${taste}. Only places that are not on any of my lists.`}).then(res=>{
    const list = res.ok ? (res.suggestions||[]).filter(x=>!x.place_id && x.name).slice(0,3) : [];
    ideaMem[key] = {list}; if(list.length){ ideaStore[key] = list; store.set('ideas', ideaStore); }
    schedule();
  });
  return ideaMem[key];
}
function pendingDidYouGo(){
  return D.plans.filter(p=>p.status==='confirmed' && p.date && p.date < todayYmd() && (p.who||[]).includes(me().id) && p.place_id && myGroups().some(g=>g.id===p.group_id)
    && !D.ratings.some(r=>r.place_id===p.place_id && r.user_id===me().id));
}
const upcoming = () => D.plans.filter(p=>p.status==='confirmed' && p.date && p.date >= todayYmd() && myGroups().some(g=>g.id===p.group_id)).sort((a,b)=>a.date.localeCompare(b.date));
const votingIn = gid => plansOf(gid).filter(p=>p.status==='voting');

/* ================= UI state ================= */
// A plain link always opens Home; an address with #/… opens that page (see applyRoute).
const S = {
  booted:false, auth:'signedOut', view:'home', gid: store.get('gid',null), panel: store.get('panel','plan'),
  cat:'all', sel:null, calMonth:null, calDay:null, modal:null, prefs:{}, results:{}, busy:null, drafts:{}, swipeIdx:0,
  stick:true, authTab:'guest', authErr:'', joinCode:null, hintClosed: store.get('hints',{}), mobilePane:'chat',
  geo:{q:'', results:[], busy:false, err:'', pick:null},
};
const params = new URLSearchParams(location.search);
if(params.get('join')){ S.joinCode = params.get('join').toUpperCase(); try{ sessionStorage.setItem('yonder-join', S.joinCode); }catch(e){} }
else { try{ S.joinCode = sessionStorage.getItem('yonder-join'); }catch(e){} }
const sharedIn = (params.get('share_url') || params.get('share_text') || params.get('url') || params.get('text')) ? {url: params.get('share_url')||params.get('url')||'', text: params.get('share_text')||params.get('text')||params.get('title')||''} : null;
if(params.toString()){ try{ history.replaceState(null,'',location.pathname); }catch(e){} }

function curGroup(){
  let g = S.gid && myGroups().find(x=>x.id===S.gid);
  if(!g) g = sharedGroups()[0] || personal();
  if(g) S.gid = g.id;
  return g;
}
function go(view){ S.view=view; store.set('view',view); render(); window.scrollTo(0,0); }
function openGroup(gid, panel){ S.gid=gid; store.set('gid',gid); if(panel){ S.panel=panel; store.set('panel',panel); } S.stick=true; S.sel=null; S.cat='all'; S.view='groups'; store.set('view','groups'); render(); }

/* ================= ADDRESSES: each tab has its own URL, so Back and Forward work ================= */
// #/home   #/groups/<group id>/<chat|plan|bucket|calendar>   #/swipe   #/profile
let routeSynced = false;
function routeFromState(){
  if(S.view==='groups'){ const g = curGroup(); return `/groups/${g?g.id:'-'}/${isPhone() && S.mobilePane==='chat' ? 'chat' : S.panel}`; }
  return '/'+S.view;
}
function syncUrl(){
  if(S.auth!=='ready') return;
  const want = '#'+routeFromState();
  if(location.hash !== want){
    // The first address, and the tour's page changes, replace the current entry; everything else adds one, so Back goes to the previous tab.
    try{ history[(!routeSynced || tour.on) ? 'replaceState' : 'pushState'](null, '', location.pathname+want); }catch(e){}
  }
  routeSynced = true;
}
function applyRoute(){ // reads the address into the app's state; false if the address doesn't name a page
  const parts = location.hash.replace(/^#\/?/,'').split('/');
  if(!['home','groups','swipe','profile'].includes(parts[0])) return false;
  S.view = parts[0]; store.set('view', S.view);
  if(S.view==='groups'){
    const g = myGroups().find(x=>x.id===parts[1]); if(g){ S.gid = g.id; store.set('gid', g.id); }
    if(parts[2]==='chat') S.mobilePane = 'chat';
    else if(['plan','bucket','calendar'].includes(parts[2])){ S.panel = parts[2]; store.set('panel', S.panel); S.mobilePane = 'panel'; }
  }
  return true;
}
window.addEventListener('popstate', ()=>{
  if(S.auth!=='ready' || tour.on) return;
  if(applyRoute()){ if(S.modal && !S.modal.noClose) S.modal = null; render(); window.scrollTo(0,0); }
});

/* ================= render loop ================= */
let rq = 0;
function schedule(){ if(rq) return; rq = requestAnimationFrame(()=>{ rq=0; render(); }); }
function render(){
  const ae = document.activeElement, aid = ae && ae.id, sel = (ae && 'selectionStart' in ae) ? [ae.selectionStart, ae.selectionEnd] : null;
  const msgsEl = $('#msgs'); const prevScroll = msgsEl ? msgsEl.scrollTop : 0;
  const keepScroll = ['.modal', '.found.guide', '.pbody', '.bucket-list'].map(sel=>{ const el=$(sel); return [sel, el?el.scrollTop:0]; });
  const app = $('#app');
  if(!S.booted){ app.innerHTML = `<div class="boot">${LOGO}<b>yonder</b></div>`; return; }
  if(S.auth!=='ready'){ app.innerHTML = authView(); }
  else {
    const views = {home, groups:groupsView, swipe:swipeView, profile:profileView};
    app.innerHTML = topBar() + (views[S.view]||home)() + mobileNav();
  }
  $('#modal-root').innerHTML = S.modal ? modalView() : '';
  if(S.modal) render.lastModal = S.modal.type + (S.modal.step||'');
  else render.lastModal = null;
  const ctx = S.view+'|'+S.panel+'|'+S.gid; const same = render.ctx===ctx; render.ctx = ctx;
  keepScroll.forEach(([sel,top])=>{ const el=$(sel); if(el && top && (same || sel==='.modal' || sel==='.found.guide')) el.scrollTop = top; });
  document.body.classList.toggle('modal-open', !!S.modal);
  if(aid){ const el = document.getElementById(aid); if(el){ el.focus({preventScroll:true}); if(sel && 'setSelectionRange' in el){ try{ el.setSelectionRange(sel[0], sel[1]); }catch(e){} } } }
  const m = $('#msgs'); if(m){ m.scrollTop = S.stick ? m.scrollHeight : prevScroll; }
  if(S.sel){ const row = document.querySelector(`[data-row="${S.sel}"]`); if(row && S.scrollToSel){ row.scrollIntoView({block:'nearest'}); S.scrollToSel=false; } }
  if(S.view==='swipe') mountSwipe();
  mountMaps();
  syncUrl();
  if(tour.on) tour.place();
}
api.onChange(()=>{ if(S.auth==='ready') schedule(); });

/* ================= AUTH ================= */
function authView(){
  const cloud = MODE==='cloud';
  const tab = cloud ? S.authTab : 'guest';
  return `<main class="auth">
    <section class="auth-hero">
      <div class="brand big">${LOGO}<span>yonder</span></div>
      <h1>Stop saving reels.<br><mark>Start going.</mark></h1>
      <p class="lead">Your friends send you reels of places you should totally try. Yonder puts them in one shared list, helps the group pick a plan with AI, and gets it on the calendar.</p>
      <ol class="steps3">
        <li class="st st-pink"><b>1 · Save</b><span>Share a reel or link to your group. Yonder pulls out the places.</span></li>
        <li class="st st-yellow"><b>2 · Plan</b><span>Pick who’s coming, budget and vibe. AI gives 3 options that fit.</span></li>
        <li class="st st-blue"><b>3 · Go</b><span>Everyone votes, the plan lands on the calendar, rate it after.</span></li>
      </ol>
    </section>
    <section class="auth-card card">
      ${S.joinCode?`<div class="invite-banner">${ic('users')}<span>You’ve been invited to a group (code <b>${esc(S.joinCode)}</b>). Sign in, then you can choose whether to join.</span></div>`:''}
      ${cloud?`<div class="seg" role="tablist">${[['guest','Try it now'],['login','Log in'],['signup','Sign up']].map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="authTab" data-v="${k}">${l}</button>`).join('')}</div>`:''}
      ${tab==='guest' ? `
        <h2>Jump in. No sign-up.</h2>
        <p class="muted">You get your own copy of a demo friend group, so you can try everything straight away.</p>
        <form data-form="guest" class="stack">
          <label class="lbl" for="g-name">What should your friends call you?</label>
          <input id="g-name" class="input" maxlength="24" placeholder="Your first name" autocomplete="given-name" required>
          <button class="btn yellow xl" type="submit">${ic('spark')} Let’s go</button>
        </form>
        ${cloud?'<p class="tiny muted">Guest accounts stay on this browser. Sign up to use Yonder on your phone too.</p>':'<p class="tiny muted">Running as a demo on this device: your data stays in this browser.</p>'}`
      : `
        <h2>${tab==='login'?'Welcome back':'Make an account'}</h2>
        <form data-form="${tab}" class="stack">
          ${tab==='signup'?`<label class="lbl" for="a-name">Your name</label><input id="a-name" class="input" maxlength="24" required autocomplete="given-name">`:''}
          <label class="lbl" for="a-email">Email</label><input id="a-email" class="input" type="email" required autocomplete="email">
          <label class="lbl" for="a-pw">Password</label><input id="a-pw" class="input" type="password" minlength="6" required autocomplete="${tab==='login'?'current-password':'new-password'}">
          <button class="btn primary xl" type="submit">${tab==='login'?'Log in':'Create account'}</button>
        </form>`}
      ${S.authErr?`<p class="err" role="alert">${esc(S.authErr)}</p>`:''}
    </section>
  </main>`;
}

/* ================= TOP BAR ================= */
function topBar(){
  const nav = [['home','Home','home'],['groups','Groups','chat'],['swipe','Taste swipe','cards']];
  return `<header class="top">
    <button class="brand" data-go="home" aria-label="Yonder home">${LOGO}<span>yonder</span></button>
    ${MODE==='local'?'<span class="badge demo" title="Everyone who opens this gets their own copy with demo friends. Data stays in this browser.">Demo version</span>':''}
    <span class="spacer"></span>
    <nav class="nav" aria-label="Main">${nav.map(([v,l,i])=>`<button data-go="${v}" data-tour="nav-${v}" ${S.view===v?'aria-current="page"':''}>${ic(i)}<span>${l}</span></button>`).join('')}</nav>
    <button class="btn sm tour-btn" data-act="tour" data-tour="help">${ic('help')}<span>Tour</span></button>
    <button class="me-chip" data-go="profile" aria-label="Your profile" title="Your profile" ${S.view==='profile'?'aria-current="page"':''}>${av(me().id)}</button>
  </header>`;
}
function mobileNav(){
  const nav = [['home','Home','home'],['groups','Groups','chat'],['swipe','Taste','cards']];
  return `<nav class="mnav" aria-label="Main">${nav.map(([v,l,i])=>`<button data-go="${v}" ${S.view===v?'aria-current="page"':''}>${ic(i)}<span>${l}</span></button>`).join('')}</nav>`;
}

/* ================= HOME ================= */
function placeTile(cat, size=''){ const c=CATS[cat]||CATS.shows; return `<span class="ptile ${size}" style="background:${c.color};color:${c.ink}">${ic(c.icon)}</span>`; }
const NEAR_KM = 100;
/* The closest well-known place (from Yonder's built-in lists) within reach of the person's area that isn't on one of their lists yet. */
function nearbyIdea(ll, have){
  const pool = [...PLACE_DB.map(x=>({name:x.name, area:x.area+', Mumbai', category:x.category, price:x.price, note:x.note, ll:x.ll})),
    ...WORLD_SPOTS.map(([name,city,la,ln,category,note])=>({name, area:city, category, price:'', note, ll:[la,ln]}))]
    .filter(x=>!have.has(x.name.toLowerCase())).map(x=>({x, d:km(ll,x.ll)})).sort((a,b)=>a.d-b.d)[0];
  return pool && pool.d <= NEAR_KM ? {...pool.x, d:pool.d} : null;
}
function home(){
  const groups = sharedGroups();
  const gids = new Set(myGroups().map(g=>g.id));
  const open = D.places.filter(p=>gids.has(p.group_id) && !p.done);
  const dyg = pendingDidYouGo();
  // near you
  const ll = homeLL();
  let near;
  const withLL = open.filter(p=>p.lat!=null);
  const bestSaved = ll && withLL.length ? withLL.map(p=>({p,d:km(ll,[p.lat,p.lng])})).sort((a,b)=>a.d-b.d)[0] : null;
  S.nearPool = [];
  if(bestSaved && bestSaved.d <= NEAR_KM){
    const best = bestSaved;
    const dist = best.d<1 ? Math.round(best.d*1000/50)*50+' m' : best.d.toFixed(1)+' km';
    near = `<span class="eyebrow">Near you · ${esc(areaLabel(homeOf().label))}</span><div class="big">${dist} to ${esc(best.p.name)}</div>
      <p class="muted">On ${esc(groupById(best.p.group_id).name)}’s list, added by ${esc(nm(best.p.added_by))}.</p>
      <div class="row gap"><a class="btn sm yellow" href="${mapsUrl(best.p)}" target="_blank" rel="noopener">${ic('maps')} Directions</a><button class="btn sm" data-act="openPlace" data-id="${best.p.id}">See it</button></div>`;
  } else {
    const sug = ll ? nearbyIdea(ll, new Set(D.places.filter(p=>gids.has(p.group_id)).map(p=>p.name.toLowerCase()))) : null;
    if(sug) S.nearPool = [sug];
    near = sug ? `<span class="eyebrow">Near you · ${esc(areaLabel(homeOf().label))}</span><div class="big">Try ${esc(sug.name)}</div>
        <p class="muted">${esc(sug.note)}${sug.d>=1?` About ${Math.round(sug.d)} km away.`:''}</p>
        <div class="row gap"><a class="btn sm" href="${mapsUrl({name:sug.name, area:sug.area})}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>
          <select class="mini-select" aria-label="Save ${esc(sug.name)} to a group" data-act-change="saveIdea" data-name="${esc(sug.name)}"><option value="">Add to list…</option>${myGroups().map(g=>`<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></div>`
      : ll ? `<span class="eyebrow">Near you · ${esc(areaLabel(homeOf().label))}</span><div class="big">Nothing saved nearby yet</div><p class="muted">Places you save near you show up here. Try the map’s “Surprise me” in a group’s bucket list.</p>`
      : `<span class="eyebrow">Near you</span><div class="big">Where are you usually?</div><p class="muted">Pick your area or city and we’ll show saved places close by.</p><button class="btn sm yellow" data-go="profile">${ic('pin')} Set my area</button>`;
  }
  const up = upcoming().slice(0,4).map(pl=>{ const d=new Date(pl.date+'T12:00'); const g=groupById(pl.group_id);
    return `<button class="urow" data-act="openGroup" data-id="${g.id}" data-panel="calendar"><span class="datebox"><small>${d.toLocaleDateString('en-IN',{month:'short'})}</small><b>${d.getDate()}</b></span>
      <span class="grow"><b>${esc(pl.title)}</b><span class="muted">${esc(g.name)} · ${esc(pl.time||'')}</span></span><span class="avs">${(pl.who||[]).slice(0,4).map(w=>av(w,'sm')).join('')}</span></button>`; }).join('');
  const noPlan = groups.filter(g=>!plansOf(g.id).some(p=>p.status!=='cancelled' && (p.status==='voting' || (p.date && p.date>=todayYmd()))));
  const nudgeG = noPlan[0];
  const nudge = nudgeG ? (()=>{ const top = placesOf(nudgeG.id).filter(p=>!p.done).sort((a,b)=>interested(b.id).length-interested(a.id).length)[0];
    return `<div class="nudge"><b>${esc(nudgeG.name)} has nothing planned</b><span>${top?`${esc(top.name)} has ${interested(top.id).length} people interested.`:'Start with something from your list.'}</span>
      <button class="btn sm primary" data-act="openGroup" data-id="${nudgeG.id}" data-panel="plan">${ic('spark')} Plan with ${esc(nudgeG.name)}</button></div>`; })() : '';
  const fresh = open.slice().sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,5).map(p=>`<button class="frow" data-act="openPlace" data-id="${p.id}">${placeTile(p.category,'sm')}
      <span class="grow"><b>${esc(p.name)}</b><span class="muted">${esc(nm(p.added_by))} → ${esc(groupById(p.group_id).name)} · ${dayLabel(p.created_at)}</span></span>${ic('right')}</button>`).join('');
  const likes = (me().taste&&me().taste.like)||[];
  const have = new Set(D.places.filter(p=>gids.has(p.group_id)).map(p=>p.name.toLowerCase()));
  const answered = likes.length + ((me().taste&&me().taste.nope)||[]).length;
  const likedCats = [...new Set(likes.map(k=>TASTE_BY_ID[k]&&TASTE_BY_ID[k].cat).filter(Boolean))];
  // Around Mumbai: built-in ideas. Anywhere else: the AI suggests places in your own city (one call, remembered).
  const outside = !nearMumbai(ll);
  const ai = outside && likes.length ? aiIdeasFor(likes, homeOf().label, have) : null;
  const ideas = outside ? (ai && ai.list || []) : PLACE_DB.filter(p=>likedCats.includes(p.category) && !have.has(p.name.toLowerCase())).slice(0,2);
  S.ideaPool = ideas;
  const ideaHtml = !likes.length ? `<p class="muted">Do the taste swipe below and we’ll suggest new places here.</p>`
    : ideas.length ? ideas.map((x,i)=>`<div class="idea">${placeTile(x.category,'sm')}<span class="grow"><b>${esc(x.name)}</b><span class="muted">${[x.area, x.price].filter(Boolean).map(esc).join(' · ')}</span></span>
      <select class="mini-select" aria-label="Save ${esc(x.name)} to a group" data-act-change="saveIdea" data-name="${esc(x.name)}"><option value="">Save to…</option>${myGroups().map(g=>`<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></div>`).join('')
    : outside ? (ai && ai.loading ? `<p class="muted"><span class="spinner sm"></span> Finding places near ${esc(areaLabel(homeOf().label))}…</p>` : '<p class="muted">Ask Yonder AI in a group for ideas near you.</p>')
    : '<p class="muted">You’ve already saved everything we’d suggest. Nice.</p>';
  const dygHtml = dyg.length ? (()=>{ const pl=dyg[0], p=placeById(pl.place_id); return `<section class="tile t-dyg">
      <span class="eyebrow">${fmtDate(pl.date)} · ${esc(groupById(pl.group_id).name)}</span><h2>Did you go to ${esc(p?p.name:pl.title)}?</h2>
      <div class="row gap"><button class="btn yellow" data-act="didGo" data-id="${pl.id}" data-v="yes">${ic('check')} Yes, we went</button><button class="btn" data-act="didGo" data-id="${pl.id}" data-v="no">No, skipped it</button></div></section>`; })() : '';
  return `<main class="home">
    <div class="home-head" data-tour="hero">
      <div><span class="eyebrow">${new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</span>
        <h1>Hey ${esc(me().name)}. <span class="hl">Where to next?</span></h1></div>
    </div>
    <div class="bento" data-tour="home">
      ${dygHtml}
      <section class="tile t-plan" data-tour="home-plan"><div class="tp-main"><span class="eyebrow">Weekend’s coming</span><h2>Plan something</h2>
        <button class="btn yellow" data-act="openGroup" data-id="${(nudgeG||groups[0]||personal()).id}" data-panel="plan">${ic('spark')} Start planning</button></div>
        <div class="tp-groups"><span class="eyebrow">Your groups</span>
          <div class="gchips">${groups.map(g=>`<button class="gchip" data-act="openGroup" data-id="${g.id}" title="${membersOf(g.id).length} people · ${placesOf(g.id).length} saved"><span class="gicon" style="background:${g.color};color:${inkOn(g.color)}">${esc(first(g.name))}</span><span class="gname"><b>${esc(g.name)}</b><small>${membersOf(g.id).length} people · ${placesOf(g.id).length} saved</small></span></button>`).join('')}
            <button class="gchip add" data-act="modal" data-v="newGroup" aria-label="New group"><span class="gicon plus">${ic('plus')}</span><span class="gname"><b>${groups.length?'New':'Create your first group'}</b>${groups.length?'':'<small>Then invite friends with a link</small>'}</span></button></div></div></section>
      <section class="tile t-up"><span class="eyebrow">Coming up</span><h2>Your plans</h2>${up || '<p class="muted">Nothing on the calendar yet.</p>'}${nudge}</section>
      <section class="tile t-near">${near}</section>
      <section class="tile t-fresh"><span class="eyebrow">Fresh in your groups</span><h2>Just saved</h2>${fresh || '<p class="muted">Nothing saved yet. Share a reel to a group to start.</p>'}</section>
      <div class="col-r">
        <section class="tile t-new"><span class="eyebrow">New for you · from your taste swipe</span><h2>Ideas you’d like</h2>${ideaHtml}</section>
        <section class="tile t-swipe"><div class="grow"><span class="eyebrow">Teach it your taste</span><h2>Taste swipe</h2><p class="muted">${answered?`${answered} of ${TASTE_CARDS.length} answered. Plans get more “you”.`:'Swipe what you love. Plans get more “you”.'}</p></div>
          <button class="btn pink" data-go="swipe">${ic('cards')} ${answered?'Keep swiping':'Start swiping'}</button></section>
      </div>
    </div></main>`;
}

/* ================= GROUPS ================= */
function groupsView(){
  const g = curGroup();
  if(!g) return `<main class="empty-page"><h1>No groups yet</h1><button class="btn primary" data-act="modal" data-v="newGroup">${ic('plus')} New group</button></main>`;
  const mp = S.mobilePane==='chat' ? 'chat' : S.panel;
  return `<main class="groups mp-${S.mobilePane}">
    <div class="mswitch">
      <div class="mrow">
        <select class="input sm" data-act-change="mgroup" aria-label="Group">${myGroups().map(x=>`<option value="${x.id}" ${x.id===g.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select>
        <button class="btn sm yellow" data-act="modal" data-v="newGroup">${ic('plus')} New group</button>
        <button class="btn sm icon" data-act="modal" data-v="join" aria-label="Join with a code" title="Join with a code">${ic('link')}</button>
      </div>
      <div class="seg four">${[['chat','Chat'],['plan','Plan'],['bucket','Bucket'],['calendar','Calendar']].map(([k,l])=>`<button aria-selected="${mp===k}" data-act="${k==='chat'?'mpane':'panel'}" data-v="${k}" ${k==='chat'?'':`data-tour="${({plan:'tab-plan',bucket:'tab-bucket',calendar:'tab-cal'})[k]}"`}>${l}</button>`).join('')}</div>
    </div>
    ${sidebar(g)}
    ${chat(g)}
    ${panel(g)}
  </main>`;
}
function sidebar(g){
  const item = x => { const last = msgsOf(x.id).slice(-1)[0];
    const prev = !last ? 'No messages yet' : last.kind==='share' ? (n=>`${nm(last.user_id)} saved ${n} place${n===1?'':'s'}`)(((last.data&&last.data.place_ids)||[]).length) : last.kind==='plan' ? 'Plan update' : last.kind==='ai' ? 'Yonder AI answered' : `${nm(last.user_id)}: ${last.body}`;
    const vote = votingIn(x.id).some(p=>(p.who||[]).includes(me().id) && !votesOf(p.id).some(v=>v.user_id===me().id));
    return `<button class="gitem" data-act="openGroup" data-id="${x.id}" aria-current="${g.id===x.id}"><span class="gicon" style="background:${x.color};color:${inkOn(x.color)}">${esc(first(x.name))}</span>
      <span class="grow"><b>${esc(x.name)}</b><small>${esc(prev)}</small></span>${vote?'<span class="dot-badge" title="Your vote is needed">Vote</span>':''}</button>`; };
  const p = personal();
  return `<aside class="side">
    <button class="btn yellow block" data-act="openGroup" data-id="${g.id}" data-panel="plan">${ic('spark')} Start planning now!</button>
    <div class="glist"><div class="list-head"><span class="eyebrow">Groups</span></div>${sharedGroups().map(item).join('')}</div>
    <div class="row gap wrap"><button class="btn sm" data-act="modal" data-v="newGroup">${ic('plus')} New group</button><button class="btn sm" data-act="modal" data-v="join">${ic('link')} Join with code</button></div>
    ${p?`<div class="glist"><div class="list-head"><span class="eyebrow">Just me</span></div>${item(p)}</div>`:''}
  </aside>`;
}
function srcBadge(kind){ const m={ig:['ig','Instagram'],yt:['yt','YouTube'],list:['list','Pasted list'],manual:['pin','Added by hand'],ai:['spark','Yonder AI'],link:['link','Link'],maps:['maps','Google Maps']}[kind]||['link','Link']; return `<span class="src src-${kind}">${ic(m[0])}<span>${m[1]}</span></span>`; }
function chat(g){
  const msgs = msgsOf(g.id);
  let body='', lastDay='';
  for(const m of msgs){
    const dl = dayLabel(m.created_at); if(dl!==lastDay){ body += `<div class="day"><span>${dl}</span></div>`; lastDay=dl; }
    const mine = m.user_id===me().id;
    let inner;
    if(m.kind==='share'){
      const ps = ((m.data&&m.data.place_ids)||[]).map(placeById).filter(Boolean);
      inner = `<div class="sharecard"><div class="row gap">${srcBadge(m.data.source_kind)}<span class="muted tiny">${mine?'You':esc(nm(m.user_id))} saved ${ps.length} place${ps.length===1?'':'s'}</span></div>
        <b class="sc-title">${esc(m.data.title||'Shared link')}</b>
        <div class="chips">${ps.map(p=>`<button class="pchip" style="--c:${CATS[p.category].color};--ci:${CATS[p.category].ink}" data-act="openPlace" data-id="${p.id}">${ic(CATS[p.category].icon)}${esc(p.name)}</button>`).join('') || '<span class="muted tiny">Place removed</span>'}</div>
        ${m.data.url?`<a class="tiny" href="${esc(m.data.url)}" target="_blank" rel="noopener">Open original ${ic('right')}</a>`:''}</div>`;
    } else if(m.kind==='plan'){
      const pl = D.plans.find(p=>p.id===m.data.plan_id); inner = pl ? planCard(pl, true) : '<div class="bubble muted">Plan</div>';
    } else if(m.kind==='ai'){
      inner = `<div class="aicard"><span class="ai-tag">${ic('spark')} Yonder AI · asked by ${mine?'you':esc(nm(m.user_id))}</span><b>${esc(m.data.q)}</b><span>${esc(m.data.reply||'')}</span>
        <button class="btn sm" data-act="panel" data-v="plan">See the ideas</button></div>`;
    } else if(m.kind==='system'){
      body += `<div class="sys">${esc(m.body)}</div>`; continue;
    } else {
      inner = `<div class="bubble">${mine?'':`<span class="who">${esc(nm(m.user_id))}</span>`}${esc(m.body)}<span class="time">${fmtTime(m.created_at)}</span></div>`;
    }
    body += `<div class="msg ${mine?'mine':''}">${mine?'':av(m.user_id)}${inner}</div>`;
  }
  if(!msgs.length) body = `<div class="empty-chat">${g.is_personal?'<b>Your own space.</b> Save reels just for you, or plan something solo.':'<b>Say hi!</b> Then share a reel or link: we’ll pull out the places.'}</div>`;
  const hintKey = g.id;
  const hint = S.hintClosed[hintKey] ? '' : `<div class="hint"><div class="hint-icons">${ic('ig')}${ic('yt')}${ic('maps')}</div>
    <p><b>Send reels here.</b> Paste an Instagram, YouTube or Google Maps link (or a list of places) and Yonder adds the places to ${g.is_personal?'your':'the group’s'} bucket list. No reels yet? <button class="linkbtn" data-act="panel" data-v="plan">Ask Yonder AI for ideas</button></p>
    <button class="x" data-act="closeHint" data-id="${hintKey}" aria-label="Hide tip">${ic('x')}</button></div>`;
  const others = membersOf(g.id);
  return `<section class="chat" data-tour="chat" aria-label="${esc(g.name)} chat">
    <div class="chat-head">
      <span class="gicon lg" style="background:${g.color};color:${inkOn(g.color)}">${esc(first(g.name))}</span>
      <div class="grow"><h2>${esc(g.name)}</h2><span class="muted tiny">${g.is_personal?'Only you can see this':others.map(nm).join(', ')}</span></div>
      ${g.is_personal?'':`<span class="avs">${others.slice(0,5).map(x=>av(x,'sm')).join('')}</span><button class="btn sm" data-act="modal" data-v="invite">${ic('users')} Invite</button>`}
    </div>
    ${hint}
    <div class="msgs" id="msgs">${body}</div>
    <form class="composer" data-form="chat">
      <button type="button" class="btn pink share-btn" data-act="openSave" data-tour="share">${ic('plus')}<span>Save a reel</span></button>
      <input id="chat-input" class="input" autocomplete="off" placeholder="${g.is_personal?'Note to self, or paste a link…':'Message, or paste a reel link…'}" value="${esc(S.drafts['chat-'+g.id]||'')}" data-draft="chat-${g.id}">
      <button class="btn primary icon" type="submit" aria-label="Send">${ic('send')}</button>
    </form>
  </section>`;
}

/* ---------- side panel with big tabs ---------- */
function panel(g){
  const open = placesOf(g.id).filter(p=>!p.done).length;
  const up = plansOf(g.id).filter(p=>p.status==='voting' || (p.status==='confirmed' && p.date>=todayYmd())).length;
  const tabs = [
    ['plan','Plan with AI', votingIn(g.id).length ? 'Vote in progress' : 'Get 3 ideas that fit', 'spark','tab-plan'],
    ['bucket','Bucket list', `${open} saved place${open===1?'':'s'}`, 'pin','tab-bucket'],
    ['calendar','Calendar', up?`${up} coming up`:'Nothing planned', 'cal','tab-cal'],
  ];
  const body = S.panel==='bucket' ? bucketPanel(g) : S.panel==='calendar' ? calendarPanel(g) : planPanel(g);
  return `<section class="panel p-${S.panel}" aria-label="Planning panel">
    <div class="ptabs" role="tablist">${tabs.map(([k,l,sub,i,t])=>`<button role="tab" class="ptab pt-${k}" data-act="panel" data-v="${k}" data-tour="${t}" aria-selected="${S.panel===k}">
      <span class="pt-ic">${ic(i)}</span><span class="pt-txt"><b>${l}</b><small>${esc(sub)}</small></span></button>`).join('')}</div>
    <div class="pbody">${body}</div>
  </section>`;
}

/* ---------- PLAN WITH AI ---------- */
const WHEN = [['sat','This Saturday'],['sun','This Sunday'],['next','Next weekend'],['weeknight','A weeknight'],['date','Pick a date']];
const MOODS = [['cafe','Cafés'],['food','Food'],['bars','Drinks'],['sunset','Outdoors & sunsets'],['shows','Comedy & gigs'],['workshop','Workshops'],['shop','Shopping'],['chill','Something chill'],['new','Something new'],['celebrate','A celebration']];
const SOURCE = [['list','Only our bucket list'],['new','Only new places'],['both','Mix of both']];
function whenToDate(p){
  const d = p.when==='sat' ? nextDow(6) : p.when==='sun' ? nextDow(0) : p.when==='next' ? (()=>{ const s=nextDow(6); s.setDate(s.getDate()+7); return s; })() : p.when==='weeknight' ? nextDow(3) : (p.date ? new Date(p.date+'T12:00') : nextDow(6));
  if(p.when==='sat' && new Date().getDay()===6) return new Date();
  if(p.when==='sun' && new Date().getDay()===0) return new Date();
  return d;
}
function prefsFor(g){
  if(!S.prefs[g.id]){
    const memory = (g.memory||[]).slice();
    S.prefs[g.id] = {who: membersOf(g.id), when:'sat', date:'', moods:[], budget:'', areas:['near'], source:'both', memory, extra:''};
  }
  return S.prefs[g.id];
}
function chipSet(field, opts, sel, multi){ return `<div class="chips">${opts.map(([k,l])=>{ const on = multi ? sel.includes(k) : sel===k;
  return `<button type="button" class="chip ${on?'on':''}" aria-pressed="${on}" data-act="pref" data-f="${field}" data-v="${esc(k)}" data-multi="${multi?1:0}">${on?ic('check'):''}${esc(l)}</button>`; }).join('')}</div>`; }
function planPanel(g){
  const p = prefsFor(g);
  const members = membersOf(g.id);
  const areaCount = {}; placesOf(g.id).forEach(x=>{ const a=areaLabel(x.area); if(a) areaCount[a]=(areaCount[a]||0)+1; });
  const areas = [['near','Near most of us'], ...Object.keys(areaCount).sort((a,b)=>areaCount[b]-areaCount[a]).slice(0,8).map(a=>[a,a])];
  const res = S.results[g.id];
  const busy = S.busy && S.busy.gid===g.id;
  const voting = votingIn(g.id);
  const dyg = pendingDidYouGo().filter(pl=>pl.group_id===g.id);
  const aiAsks = msgsOf(g.id).filter(m=>m.kind==='ai').slice(-3).reverse();
  return `
    ${dyg.map(pl=>{ const pp=placeById(pl.place_id); return `<div class="dyg-strip"><b>Did you go to ${esc(pp?pp.name:pl.title)} on ${fmtDate(pl.date)}?</b><div class="row gap"><button class="btn sm yellow" data-act="didGo" data-id="${pl.id}" data-v="yes">Yes</button><button class="btn sm" data-act="didGo" data-id="${pl.id}" data-v="no">No</button></div></div>`; }).join('')}
    ${voting.map(pl=>planCard(pl,false)).join('')}
    ${res && !busy ? resultsView(g, res) : ''}
    ${busy ? `<div class="thinking-card"><span class="spinner"></span><div><b>${S.busy.kind==='ask'?'Looking for ideas…':'Finding 3 plans that fit everyone…'}</b><span class="muted tiny">Reading your bucket list, tastes and group memory · <span id="secs">0</span>s</span></div><button class="btn sm" data-act="stopAI">Stop</button></div>`:''}
    <form class="planform" data-form="plan">
      <div class="pf-head"><h3>${ic('spark')} Plan something${g.is_personal?' for yourself':' with '+esc(g.name)}</h3><span class="muted tiny">Pick as many as you like, then hit the button.</span></div>
      ${g.is_personal?'':`<fieldset><legend>Who’s coming?</legend><div class="chips">${members.map(id=>{ const on=p.who.includes(id); return `<button type="button" class="chip person ${on?'on':''}" aria-pressed="${on}" data-act="pref" data-f="who" data-v="${id}" data-multi="1">${av(id,'xs')}${esc(nm(id))}</button>`; }).join('')}</div></fieldset>`}
      <fieldset><legend>When?</legend>${chipSet('when', WHEN, p.when, false)}${p.when==='date'?`<input type="date" class="input sm" id="pf-date" value="${esc(p.date)}" min="${todayYmd()}" data-pref="date">`:''}</fieldset>
      <fieldset><legend>In the mood for</legend>${chipSet('moods', MOODS, p.moods, true)}</fieldset>
      <fieldset><legend>Budget per person</legend>${chipSet('budget', budgetOpts(), p.budget, false)}</fieldset>
      <fieldset><legend>Where?</legend>${chipSet('areas', areas, p.areas, true)}</fieldset>
      <fieldset><legend>Ideas from</legend>${chipSet('source', SOURCE, p.source, false)}</fieldset>
      ${(g.memory||[]).length?`<fieldset><legend>Keep in mind <span class="muted tiny">(from the group’s memory)</span></legend>${chipSet('memory', g.memory.map(m=>[m,m]), p.memory, true)}</fieldset>`:''}
      <fieldset><legend>Anything else?</legend><textarea id="pf-extra" class="input" rows="2" placeholder="e.g. it’s Sana’s birthday, somewhere we can sit for hours, not too loud" data-pref="extra">${esc(p.extra)}</textarea></fieldset>
      <button class="btn yellow xl block" type="submit" ${busy?'disabled':''}>${ic('spark')} ${res?'Start over: find 3 new plans':'Find 3 plans'}</button>
    </form>
    <form class="askform" data-form="ask">
      <label class="lbl" for="ask-input">${ic('chat')} Or just ask <span class="muted tiny">${g.is_personal?'':'· everyone in the group sees the answer'}</span></label>
      <div class="row gap"><input id="ask-input" class="input" placeholder="e.g. cheap fun things in Bandra this Sunday" value="${esc(S.drafts['ask-'+g.id]||'')}" data-draft="ask-${g.id}"><button class="btn primary" type="submit" ${busy?'disabled':''}>Ask</button></div>
    </form>
    ${aiAsks.map(m=>askAnswer(g,m)).join('')}`;
}
const MAX_VOTE = 5;
function optionCard(o, i, opts={}){
  const c = CATS[o.category]||CATS.shows;
  const onList = o.place_id && placeById(o.place_id);
  return `<div class="opt ${opts.picked?'picked':''}" style="--c:${c.color};--ci:${c.ink}">
    <div class="opt-top"><span class="opt-n">${i+1}</span>${placeTile(o.category)}<div class="grow"><b>${esc(o.name)}</b><span class="muted tiny">${esc(o.area||'')}${o.price?' · '+esc(o.price):''}</span></div>
      <span class="badge ${onList?'b-list':'b-new'}">${onList?'On your list':'New idea'}</span></div>
    <p class="why">${esc(o.why||'')}</p>
    ${opts.actionsHtml || `<div class="row gap wrap"><a class="btn sm" href="${mapsUrl(o)}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>${opts.pickHtml||''}</div>`}
  </div>`;
}
/* Results come in pages of 3 (up to 3 pages). Ideas can be picked across pages, then sent to a vote. */
function resultsView(g, res){
  const pg = res.pages[res.page], solo = g.is_personal;
  const base = res.pages.slice(0,res.page).reduce((a,p)=>a+p.options.length,0);
  const chosen = res.sel.length;
  const last = res.page===res.pages.length-1, canMore = last && res.pages.length<3;
  return `<div class="results">
    <div class="res-head"><span class="ai-tag">${ic('spark')} ${pg.mode==='ai'?'Yonder AI':'Quick picks'}</span><button class="linkbtn" data-act="clearResults">Clear</button></div>
    ${res.pages.length>1?`<div class="pager" role="tablist" aria-label="Pages of ideas">${res.pages.map((p,k)=>{ const from=res.pages.slice(0,k).reduce((a,x)=>a+x.options.length,0)+1; return `<button role="tab" class="chip ${k===res.page?'on':''}" aria-selected="${k===res.page}" data-act="resPage" data-v="${k}">${p.options.length>1?`Ideas ${from}–${from+p.options.length-1}`:`Idea ${from}`}</button>`; }).join('')}</div>`:''}
    ${pg.mode!=='ai'?`<p class="note">${MODE==='local'?'In this demo version, Yonder picks plans by matching your choices with the bucket list, who’s interested and everyone’s tastes. The full version adds live AI on Yonder’s server.':'The AI is busy right now, so these quick picks come from your bucket list, tastes and choices.'}</p>`:''}
    ${pg.reply?`<p class="reply">${esc(pg.reply)}</p>`:''}
    ${pg.options.map((o,i)=>{ const k=res.page+'-'+i, on=res.sel.includes(k);
      return optionCard(o, base+i, {picked:!solo&&on, pickHtml: solo ? `<button class="btn sm yellow" data-act="pickSolo" data-k="${k}">${ic('cal')} Lock this in</button>`
        : `<button class="btn sm ${on?'yellow':''}" data-act="optPick" data-k="${k}" aria-pressed="${on}">${on?ic('check')+' In the vote':ic('plus')+' Add to vote'}</button>`}); }).join('')}
    ${pg.options.some(o=>!o.place_id)?'<p class="tiny muted">New ideas come from the AI’s general knowledge. Check timings and prices before you go.</p>':''}
    ${canMore?`<button class="btn xl block more-btn" data-act="moreIdeas" ${res.loading?'disabled':''}>${res.loading?'<span class="spinner sm"></span> Finding 3 more…':ic('spark')+' Not feeling these? Show 3 more'}</button>`:''}
    ${res.pages.length>=3 && last?'<p class="tiny muted center">That’s 9 ideas. Change the mood or area above to start fresh.</p>':''}
    ${solo ? '<p class="tiny muted center">Pick one to put it on your calendar.</p>'
      : `<button class="btn primary xl block" data-act="sendVote" ${chosen>=2?'':'disabled'}>${ic('vote')} ${chosen>=2?`Send ${chosen} to a group vote`:'Pick at least 2 to vote on'}</button>
        <p class="tiny muted center">Pick up to ${MAX_VOTE} from any page. Only the people coming get to vote: rank them, or say “doesn’t work for me”.</p>`}
  </div>`;
}
function askAnswer(g, m){
  const sug = (m.data.suggestions||[]);
  return `<div class="results ask-res"><div class="res-head"><span class="ai-tag">${ic('spark')} ${m.data.mode==='ai'?'Yonder AI':'Quick picks'} · ${esc(nm(m.user_id))} asked</span></div>
    <b>“${esc(m.data.q)}”</b><p class="reply">${esc(m.data.reply||'')}</p>
    ${sug.map((s,i)=>{ const onList = s.place_id && placeById(s.place_id); const added = !onList && placesOf(g.id).some(p=>p.name.toLowerCase()===String(s.name).toLowerCase());
      return optionCard(s,i,{actionsHtml:`<div class="row gap wrap"><a class="btn sm" href="${mapsUrl(s)}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>${onList||added?`<span class="ok">${ic('check')} In bucket list</span>`:`<button class="btn sm yellow" data-act="addSugg" data-mid="${m.id}" data-i="${i}">${ic('plus')} Add to bucket list</button>`}</div>`}); }).join('')}
  </div>`;
}

/* ---------- plan card (vote / confirmed) ---------- */
function tally(pl){
  const n = pl.options.length, score = Array(n).fill(0), vetoes = Array(n).fill(0); const votes = votesOf(pl.id);
  votes.forEach(v=>{ (v.ranking||[]).forEach((oi,rank)=>{ if(oi<n) score[oi] += (n-rank); }); (v.vetoes||[]).forEach(oi=>{ if(oi<n) vetoes[oi]++; }); });
  const order = [...Array(n).keys()].sort((a,b)=> vetoes[a]-vetoes[b] || score[b]-score[a]);
  return {votes, score, vetoes, order, winner:order[0]};
}
function planCard(pl, inChat){
  const g = groupById(pl.group_id); if(!g) return '';
  if(pl.status==='voting'){
    const t = tally(pl), who = pl.who||[], voted = new Set(t.votes.map(v=>v.user_id));
    const mineVoted = voted.has(me().id), canVote = who.includes(me().id);
    return `<div class="plancard voting"><div class="pc-head"><span class="pc-tag">${ic('vote')} Vote</span><b>${esc(pl.title)}</b><span class="muted tiny">${pl.date?fmtDate(pl.date):''}</span></div>
      <ol class="pc-opts">${pl.options.map((o,i)=>`<li><span class="dotc" style="background:${(CATS[o.category]||CATS.shows).color}"></span><span class="grow">${esc(o.name)} <span class="muted tiny">${esc(o.area||'')}</span></span>${mineVoted?`<span class="tiny">${t.score[i]} pts${t.vetoes[i]?` · ${t.vetoes[i]} can’t`:''}</span>`:''}</li>`).join('')}</ol>
      <div class="pc-voters">${who.map(id=>`<span class="voter ${voted.has(id)?'done':''}" title="${esc(nm(id))}${voted.has(id)?' voted':' hasn’t voted'}">${av(id,'xs')}${voted.has(id)?ic('check'):''}</span>`).join('')}<span class="muted tiny">${voted.size}/${who.length} voted</span></div>
      <div class="row gap wrap">${canVote?`<button class="btn ${mineVoted?'':'pink'} sm" data-act="modal" data-v="vote" data-id="${pl.id}">${ic('vote')} ${mineVoted?'Change my vote':'Vote now'}</button>`:'<span class="muted tiny">Only people coming can vote.</span>'}
        ${pl.created_by===me().id && t.votes.length?`<button class="btn sm" data-act="closeVote" data-id="${pl.id}">Close vote now</button>`:''}</div></div>`;
  }
  if(pl.status==='confirmed'){
    const o = pl.options[pl.chosen||0]||{}; const past = pl.date && pl.date < todayYmd();
    return `<div class="plancard confirmed"><div class="pc-head"><span class="pc-tag ok">${ic('check')} ${past?'Done':'Plan locked'}</span><b>${esc(pl.title)}</b></div>
      <div class="pc-when">${ic('cal')}<b>${pl.date?fmtDate(pl.date):'Date to be set'}</b>${pl.time?` · ${esc(pl.time)}`:''}<span class="grow"></span><span class="avs">${(pl.who||[]).map(w=>av(w,'xs')).join('')}</span></div>
      <span class="muted tiny">${esc(o.area||'')}${o.price?' · '+esc(o.price):''}${past?'':' · Reminders: the evening before and 2 hours before'}</span>
      ${inChat?`<div class="row gap wrap"><a class="btn sm" href="${mapsUrl(o)}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>${past?'':`<button class="btn sm" data-act="modal" data-v="editPlan" data-id="${pl.id}">${ic('edit')} Change date</button>`}</div>`:''}</div>`;
  }
  return `<div class="plancard"><b>${esc(pl.title)}</b> <span class="muted tiny">cancelled</span></div>`;
}

/* ---------- LOCATION: search a place or city (OpenStreetMap Nominatim, free, no key) ---------- */
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const NOM = 'https://nominatim.openstreetmap.org';
function shortLabel(a={}, fallback=''){
  const hood = a.neighbourhood||a.suburb||a.city_district||a.quarter||'';
  const city = a.city||a.town||a.village||a.municipality||a.county||a.state_district||a.state||'';
  const parts = [...new Set([hood, city, a.country].filter(Boolean))].slice(0,3);
  return parts.join(', ') || String(fallback).split(',').slice(0,2).join(',').trim();
}
async function nomSearch(q, {limit=5, near}={}){
  const vb = near ? `&viewbox=${near[1]-1.5},${near[0]+1.5},${near[1]+1.5},${near[0]-1.5}` : ''; // lean towards results near the person
  const r = await fetch(`${NOM}/search?format=jsonv2&addressdetails=1&accept-language=en&limit=${limit}${vb}&q=${encodeURIComponent(q)}`);
  if(!r.ok) throw new Error('Search is busy. Try again in a moment.');
  return (await r.json()).map(x=>({label:shortLabel(x.address, x.display_name), ll:[+x.lat, +x.lon], cc:String((x.address||{}).country_code||'').toUpperCase()}));
}
async function nomReverse(lat, lng){
  const r = await fetch(`${NOM}/reverse?format=jsonv2&addressdetails=1&accept-language=en&zoom=14&lat=${lat}&lon=${lng}`);
  if(!r.ok) throw new Error('busy'); const x = await r.json();
  return {label:shortLabel(x.address, x.display_name||'Here'), ll:[lat,lng], cc:String((x.address||{}).country_code||'').toUpperCase()};
}
function geoPicker(){
  const G = S.geo, q = G.q.trim();
  return `<form class="geo" data-form="geoSearch">
    <div class="row gap"><input id="geo-q" class="input" placeholder="Your area or city, e.g. Indiranagar, Bengaluru" value="${esc(G.q)}" autocomplete="off" aria-label="Search for your area or city"><button class="btn" type="submit" ${G.busy?'disabled':''}>${ic('pin')} Search</button></div>
    <button type="button" class="linkbtn" data-act="geoLocate">${ic('pin')} Use my current location</button>
    ${G.busy?'<span class="tiny muted">Searching…</span>':''}${G.err?`<p class="err">${esc(G.err)}</p>`:''}
    <div class="chips geo-res">${G.results.map((r,i)=>`<button type="button" class="chip ${G.pick&&G.pick.i===i?'on':''}" data-act="geoPick" data-i="${i}">${G.pick&&G.pick.i===i?ic('check'):''}${esc(r.label)}</button>`).join('')}
      ${q&&G.searched?`<button type="button" class="chip ${G.pick&&G.pick.i===-1?'on':''}" data-act="geoPick" data-i="-1">Use “${esc(q)}” as typed</button>`:''}</div></form>`;
}
async function geoSearch(){
  const G = S.geo, q = G.q.trim(); if(!q) return;
  G.busy = true; G.err = ''; G.results = []; G.pick = null; G.searched = false; render();
  try{ G.results = await nomSearch(q, {limit:5}); G.searched = true; if(!G.results.length) G.err = 'Nothing found. Try a bigger area, or use it as typed.'; }
  catch(e){ G.err = e.message || 'Search failed.'; G.searched = true; }
  G.busy = false; render();
}
function geoLocate(){
  const G = S.geo;
  if(!navigator.geolocation){ G.err = 'This browser can’t share its location. Search instead.'; return render(); }
  G.busy = true; G.err = ''; render();
  navigator.geolocation.getCurrentPosition(async pos=>{
    try{ const r = await nomReverse(pos.coords.latitude, pos.coords.longitude); G.results = [r]; G.pick = {...r, i:0}; G.q = r.label; G.searched = true; }
    catch(e){ G.err = 'Couldn’t work out where that is. Search instead.'; }
    G.busy = false; render();
  }, ()=>{ G.busy = false; G.err = 'Location is blocked. Search for your area instead.'; render(); }, {timeout:10000});
}
const resetGeo = () => { S.geo = {q:'', results:[], busy:false, err:'', pick:null, searched:false}; };

// Places saved without a map position (anything outside the built-in Mumbai list) are looked up slowly in the background.
const geoCache = store.get('geo', {}); const geoFail = new Set(); let geoBusy = false, geoCount = 0;
async function geocodePlaces(){
  if(geoBusy || S.auth!=='ready' || !navigator.onLine) return;
  const mine = new Set(myGroups().map(g=>g.id));
  const next = () => D.places.find(p=>p.lat==null && mine.has(p.group_id) && !geoFail.has(p.id));
  if(!next()) return;
  geoBusy = true;
  try{
    let p;
    while((p = next()) && geoCount < 200){
      const key = (p.name+'|'+(p.area||'')).toLowerCase(); let ll = geoCache[key];
      if(ll===undefined){
        geoCount++;
        try{
          const near = homeLL(); let hit = (await nomSearch([p.name,p.area].filter(Boolean).join(', '), {limit:1, near}))[0], approx = false;
          if(!hit && p.area){ await sleep(1100); hit = (await nomSearch(p.area, {limit:1, near}))[0]; approx = true; }
          if(hit){ let h=0; for(const ch of key) h=(h*31+ch.charCodeAt(0))|0; ll = approx ? [hit.ll[0]+((h%100)/100-.5)*0.006, hit.ll[1]+(((h>>7)%100)/100-.5)*0.006] : hit.ll; } else ll = 0;
          geoCache[key] = ll; store.set('geo', geoCache);
        }catch(e){ geoFail.add(p.id); await sleep(2500); continue; }
        await sleep(1100); // Nominatim allows about one request a second
      }
      if(ll) await api.setPlaceCoords(p.id, ll[0], ll[1]); else geoFail.add(p.id);
      refreshPins();
    }
  } finally { geoBusy = false; }
}

/* ---------- BUCKET LIST + MAP: a real world map in Yonder's colours (MapLibre + OpenFreeMap/OpenStreetMap) ---------- */
const hasML = () => typeof window.maplibregl !== 'undefined';
const MAP_INK = '#111', MAP_SEA = '#BFD8FF', MAP_LAND = '#FFFBEF';
let mapStylePromise = null;
function getMapStyle(){
  if(!mapStylePromise) mapStylePromise = fetch('https://tiles.openfreemap.org/styles/positron').then(r=>r.json()).then(st=>{
    for(const l of st.layers){
      const p = l.paint = l.paint || {};
      if(l.id==='background') p['background-color'] = MAP_LAND;
      else if(l.id==='water') p['fill-color'] = MAP_SEA;
      else if(l.id==='park' || l.id==='landcover_wood'){ p['fill-color'] = '#E6F2CF'; p['fill-opacity'] = 1; }
      else if(l.id==='landuse_residential') p['fill-color'] = '#FFF3D6';
      else if(l.id==='building'){ p['fill-color'] = '#F4EBD3'; p['fill-outline-color'] = '#E4D9BE'; }
      else if(l.type==='line' && /highway_(major|motorway)_inner|highway_motorway_bridge_inner/.test(l.id)) p['line-color'] = '#FFFFFF';
      else if(l.type==='line' && /casing/.test(l.id)) p['line-color'] = '#6b6b78';
      else if(l.type==='line' && /highway_minor|highway_path/.test(l.id)) p['line-color'] = '#E4D9BE';
      else if(l.type==='symbol'){ const water = /water/.test(l.id); p['text-color'] = water ? '#2B44FF' : MAP_INK; p['text-halo-color'] = water ? MAP_SEA : MAP_LAND; p['text-halo-width'] = 1.6; }
    }
    return st;
  }).catch(e=>{ mapStylePromise = null; throw e; });
  return mapStylePromise;
}
const mapMgr = {mini:null, big:null};
const mapPlaces = () => { const g = curGroup(); return g ? placesOf(g.id).filter(p=>S.cat==='all' || p.category===S.cat) : []; };
const hasPos = p => p.lat!=null && p.lng!=null;
function pinEl(p, sel, big){
  const el = document.createElement('div');
  el.className = 'lpin' + (sel?' sel':'') + (p.done?' done':''); el.style.background = (CATS[p.category]||CATS.shows).color;
  if(big){ el.title = p.name; el.addEventListener('click', ev=>{ ev.stopPropagation(); selectPin(p.id); }); }
  return el;
}
function drawPins(e){
  (e.markers||[]).forEach(m=>m.remove()); e.markers = []; if(e.popup){ e.popup.remove(); e.popup = null; }
  const pts = [];
  mapPlaces().filter(hasPos).forEach(p=>{
    const sel = p.id===S.sel;
    const mk = new maplibregl.Marker({element:pinEl(p, sel, e.big)}).setLngLat([p.lng,p.lat]).addTo(e.map); e.markers.push(mk); pts.push([p.lng,p.lat]);
    if(sel && e.big) e.popup = new maplibregl.Popup({closeButton:false, closeOnClick:false, offset:16, className:'lpin-tip'}).setLngLat([p.lng,p.lat]).setText(p.name).addTo(e.map);
  });
  return pts;
}
function fitTo(e, pts, animate){
  if(pts.length>1){ const b = pts.reduce((bb,pt)=>bb.extend(pt), new maplibregl.LngLatBounds(pts[0],pts[0])); e.map.fitBounds(b, {padding:e.big?60:28, maxZoom:15, animate:!!animate}); }
  else if(pts.length===1) e.map.jumpTo({center:pts[0], zoom:14});
  else e.map.jumpTo({center:[10,20], zoom:1.6});
}
function addHereDot(e, ll){
  if(e.here) e.here.remove(); const d = document.createElement('div'); d.className = 'here-dot'; d.title = 'You';
  e.here = new maplibregl.Marker({element:d}).setLngLat([ll[1],ll[0]]).addTo(e.map);
}
/* The map opens on where the person is, together with the group's places around them (within about 20 km), so pins are visible straight away.
   If the group's places are somewhere else entirely (a trip abroad), it opens on those places instead. Without a saved area it asks for the device location. */
function openingView(e, pts){
  const h = homeLL();
  const around = h ? pts.filter(pt=>km(h,[pt[1],pt[0]]) < 20) : [];
  if(h && around.length){ fitTo(e, [[h[1],h[0]], ...around]); return; }
  if(h && !pts.length){ e.map.jumpTo({center:[h[1],h[0]], zoom:12}); return; }
  fitTo(e, pts);
  if(!h && e.big && navigator.geolocation) navigator.geolocation.getCurrentPosition(pos=>{ if(e.map && !e.gone){ e.map.flyTo({center:[pos.coords.longitude,pos.coords.latitude], zoom:12}); addHereDot(e, [pos.coords.latitude,pos.coords.longitude]); } }, ()=>{}, {timeout:8000, maximumAge:600000});
}
function refreshPins(){
  for(const k of ['mini','big']){ const e = mapMgr[k]; if(!e || !e.map) continue; const pts = drawPins(e); if(k==='mini') openingView(e, pts); }
}
function buildMap(k, el){
  const big = k==='big';
  const e = {big, markers:[], gone:false, el}; mapMgr[k] = e;
  getMapStyle().then(style=>{
    if(e.gone) return;
    const map = new maplibregl.Map({container:e.el, style, interactive:big, attributionControl:false, center:[10,20], zoom:1.6, minZoom:1, maxPitch:0, dragRotate:false, fadeDuration:0});
    map.touchZoomRotate.disableRotation();
    e.map = map;
    map.addControl(new maplibregl.AttributionControl({compact:true}), 'bottom-right');
    if(big) map.addControl(new maplibregl.NavigationControl({showCompass:false}), 'top-left');
    const pts = drawPins(e); openingView(e, pts);
    { const h = homeLL(); if(h) addHereDot(e, h); }
    e.el.classList.remove('loading');
  }).catch(()=>{ if(!e.gone) e.el.innerHTML = '<div class="map-off">The map needs an internet connection.</div>'; });
  return e;
}
function destroyMap(k){ const e = mapMgr[k]; if(!e) return; e.gone = true; try{ e.map && e.map.remove(); }catch(_){} mapMgr[k] = null; }
// Called after every render. The page is rebuilt each time, so an existing map is moved into its new spot instead of being rebuilt (it keeps its zoom and position).
function mountMaps(){
  for(const k of ['mini','big']){
    const ph = document.getElementById(k==='big'?'map-big':'map-mini'); const e = mapMgr[k];
    if(!ph){ if(e) destroyMap(k); continue; }
    if(!hasML()){ ph.innerHTML = '<div class="map-off">The map needs an internet connection.</div>'; continue; }
    if(e && e.el!==ph){ ph.replaceWith(e.el); if(e.map){ e.map.resize(); drawPins(e); } continue; }
    if(!e){ ph.classList.add('loading'); buildMap(k, ph); }
    else if(e.map) drawPins(e);
  }
  geocodePlaces();
}
function mapSelHtml(){
  if(S.spot) return spotHtml();
  const sp = S.sel && placeById(S.sel);
  return sp ? `${placeTile(sp.category,'sm')}<span class="grow"><b>${esc(sp.name)}</b><span class="muted tiny">${esc(sp.area||'')}${sp.price?' · '+esc(sp.price):''}</span></span><a class="btn sm yellow" href="${mapsUrl(sp)}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>`
    : '<span class="tiny muted">Tap a pin to see the place. Every place opens in Google Maps for directions.</span>';
}
function selectPin(id){
  S.sel = id; S.scrollToSel = true; if(S.spot) clearSpot();
  if(S.modal && S.modal.type==='bigMap' && mapMgr.big && mapMgr.big.map){ drawPins(mapMgr.big); showSel(); }
  else render();
}
/* Moving around: search any place, jump back to your area, see all saved places, or visit somewhere at random. */
const WORLD_SPOTS = [ // [name, city, lat, lng, category, why it's worth a stop]
  ['Shibuya Crossing','Tokyo, Japan',35.6595,139.7005,'sunset','The famous scramble crossing. Best at dusk from above.'],
  ['Tsukiji Outer Market','Tokyo, Japan',35.6655,139.7707,'food','Fresh sushi and street snacks, best in the morning.'],
  ['Miradouro da Senhora do Monte','Lisbon, Portugal',38.7197,-9.1325,'sunset','A hilltop viewpoint over the rooftops at golden hour.'],
  ['Pastéis de Belém','Lisbon, Portugal',38.6975,-9.2032,'cafe','The original custard tarts, still warm from the oven.'],
  ['Table Mountain','Cape Town, South Africa',-33.9628,18.4098,'sunset','Hike or take the cable car for the city view.'],
  ['Chatuchak Weekend Market','Bangkok, Thailand',13.7999,100.5504,'shop','Thousands of stalls: clothes, plants, vintage and street food.'],
  ['Grand Bazaar','Istanbul, Türkiye',41.0107,28.9680,'shop','One of the oldest covered markets in the world.'],
  ['Chelsea Market','New York, USA',40.7424,-74.0061,'food','A food hall inside an old factory, with shops upstairs.'],
  ['Brooklyn Bridge Park','New York, USA',40.7003,-73.9967,'sunset','Skyline views across the river at sunset.'],
  ['Mercado de San Telmo','Buenos Aires, Argentina',-34.6204,-58.3733,'shop','Antiques, empanadas and a Sunday street fair.'],
  ['Sydney Opera House','Sydney, Australia',-33.8568,151.2153,'shows','See a show, or just walk around the harbour.'],
  ['Bondi Beach','Sydney, Australia',-33.8908,151.2743,'sunset','Surf, the coastal walk and a sunset swim.'],
  ['Café de Flore','Paris, France',48.8541,2.3326,'cafe','A classic Saint-Germain café for people-watching.'],
  ['Sacré-Cœur & Montmartre','Paris, France',48.8867,2.3431,'sunset','Steps with a sweeping view over Paris.'],
  ['Marché des Enfants Rouges','Paris, France',48.8627,2.3622,'food','The oldest covered market in Paris, great for lunch.'],
  ['Gwangjang Market','Seoul, South Korea',37.5701,126.9996,'food','Bindaetteok, kimbap and tteokbokki at the counters.'],
  ['Bukchon Hanok Village','Seoul, South Korea',37.5826,126.9830,'sunset','Traditional houses on quiet hillside lanes.'],
  ['Jemaa el-Fnaa','Marrakech, Morocco',31.6258,-7.9891,'food','The main square comes alive with food stalls at night.'],
  ['Gardens by the Bay','Singapore',1.2816,103.8636,'sunset','The Supertree light show runs every evening.'],
  ['Maxwell Food Centre','Singapore',1.2804,103.8447,'food','Hawker stalls, including the famous chicken rice.'],
  ['Mauerpark Flea Market','Berlin, Germany',52.5440,13.4020,'shop','Sunday flea market, karaoke and street food.'],
  ['Granville Island Public Market','Vancouver, Canada',49.2712,-123.1347,'food','Local produce, bakeries and a harbour view.'],
  ['Borough Market','London, UK',51.5055,-0.0910,'food','Street food and produce under the railway arches.'],
  ['Primrose Hill','London, UK',51.5395,-0.1608,'sunset','A grassy hill with a skyline view, good at sunset.'],
  ['Camden Market','London, UK',51.5415,-0.1465,'shop','Vintage, crafts and street food by the canal.'],
  ['La Boqueria','Barcelona, Spain',41.3819,2.1716,'food','A huge market off La Rambla: fruit, jamón and tapas.'],
  ['Park Güell','Barcelona, Spain',41.4145,2.1527,'sunset','Gaudí’s mosaic park with views over the city.'],
  ['Testaccio Market','Rome, Italy',41.8760,12.4755,'food','Where locals shop and eat: supplì, pizza and pasta.'],
  ['Noordermarkt','Amsterdam, Netherlands',52.3796,4.8836,'shop','Saturday flea and organic market in the Jordaan.'],
  ['Nyhavn','Copenhagen, Denmark',55.6798,12.5910,'cafe','Colourful canal houses lined with cafés.'],
  ['Gateway of India','Mumbai, India',18.9220,72.8347,'sunset','The harbour landmark, lovely at sundown.'],
];
const spotArea = sp => sp.city;
function spotHtml(){
  const sp = S.spot; const g = curGroup();
  const have = g && placesOf(g.id).some(p=>p.name.toLowerCase()===sp.name.toLowerCase());
  return `${placeTile(sp.category,'sm')}<span class="grow"><b>${esc(sp.name)}</b><span class="muted tiny">${esc(sp.city)}</span><span class="tiny">${esc(sp.note)}</span></span>
    <span class="spot-acts"><a class="btn sm yellow" href="${mapsUrl({name:sp.name, area:sp.city})}" target="_blank" rel="noopener">${ic('maps')} Google Maps</a>
      ${have ? `<span class="ok">${ic('check')} In ${esc(g.name)}</span>` : `<button class="btn sm pink" data-act="spotAdd">${ic('plus')} Add to ${esc(g.name)}</button>`}
      <button class="btn sm" data-act="mapRandom">Another</button></span>`;
}
function showSel(){ const el = $('#map-sel'); if(el){ el.innerHTML = mapSelHtml(); el.classList.toggle('empty', !S.spot && !(S.sel && placeById(S.sel))); el.classList.toggle('spot', !!S.spot); } }
function clearSpot(){ S.spot = null; const e = mapMgr.big; if(e){ if(e.spotMarker){ e.spotMarker.remove(); e.spotMarker = null; } if(e.spotPopup){ e.spotPopup.remove(); e.spotPopup = null; } } }
async function mapSearch(){
  const e = mapMgr.big; const q = (($('#map-q')||{}).value||'').trim(); if(!e || !e.map || !q) return;
  try{ const r = (await nomSearch(q, {limit:1}))[0]; if(!r) return toast('Couldn’t find “'+q+'”. Try a city or area name.'); e.map.flyTo({center:[r.ll[1],r.ll[0]], zoom:12}); toast(r.label); }
  catch(err){ toast(err.message||'Search is busy. Try again in a moment.'); }
}
function mapJump(kind){
  const e = mapMgr.big; if(!e || !e.map) return;
  if(kind==='home'){ const h = homeLL();
    if(h) e.map.flyTo({center:[h[1],h[0]], zoom:12});
    else if(navigator.geolocation) navigator.geolocation.getCurrentPosition(pos=>{ e.map.flyTo({center:[pos.coords.longitude,pos.coords.latitude], zoom:12}); addHereDot(e,[pos.coords.latitude,pos.coords.longitude]); }, ()=>toast('Set your area on your profile to jump back to it.'), {timeout:8000});
    else toast('Set your area on your profile to jump back to it.'); }
  else if(kind==='all'){ const pts = mapPlaces().filter(hasPos).map(p=>[p.lng,p.lat]); if(pts.length) fitTo(e, pts, true); else toast('No saved places have a position yet.'); }
  else {
    let pick; do{ pick = WORLD_SPOTS[Math.floor(Math.random()*WORLD_SPOTS.length)]; }while(S.spot && pick[0]===S.spot.name && WORLD_SPOTS.length>1);
    const [name, city, lat, lng, category, note] = pick;
    clearSpot(); S.spot = {name, city, lat, lng, category, note};
    const el = document.createElement('div'); el.className = 'spot-pin'; el.textContent = '★';
    e.spotMarker = new maplibregl.Marker({element:el}).setLngLat([lng,lat]).addTo(e.map);
    e.spotPopup = new maplibregl.Popup({closeButton:false, closeOnClick:false, offset:22, className:'lpin-tip'}).setLngLat([lng,lat]).setText(name).addTo(e.map);
    e.map.flyTo({center:[lng,lat], zoom:14.5}); showSel();
  }
}
function bucketPanel(g){
  const all = placesOf(g.id).slice().sort((a,b)=> (a.done-b.done) || b.created_at.localeCompare(a.created_at));
  const cats = [...new Set(all.map(p=>p.category))];
  const shown = all.filter(p=>S.cat==='all' || p.category===S.cat);
  const rows = shown.map(p=>{
    const ints = interested(p.id), mineInt = ints.includes(me().id), avg = avgStars(p.id), sel = S.sel===p.id, c = CATS[p.category]||CATS.shows;
    return `<div class="prow ${sel?'sel':''} ${p.done?'done':''}" data-row="${p.id}">
      <button class="prow-main" data-act="selPlace" data-id="${p.id}">${placeTile(p.category)}
        <span class="grow"><b>${esc(p.name)}</b><span class="muted tiny">${esc(p.area||'Location not set')}${p.price?' · '+esc(p.price):''}</span>
        <span class="muted tiny">${srcBadge(p.source_kind)} ${esc(nm(p.added_by))} · ${dayLabel(p.created_at)}</span></span>
        <span class="prow-side">${p.done?`<span class="beenbadge">${ic('check')} Been${avg?` · ${avg.toFixed(1)}★`:''}</span>`:''}${ints.length?`<span class="avs">${ints.slice(0,3).map(u=>av(u,'xs')).join('')}</span>`:''}</span></button>
      ${sel?`<div class="prow-more">${p.note?`<p class="tiny">${esc(p.note)}</p>`:''}
        <div class="row gap wrap"><a class="btn sm yellow" href="${mapsUrl(p)}" target="_blank" rel="noopener">${ic('maps')} Open in Google Maps</a>
        <button class="btn sm ${mineInt?'pink':''}" data-act="interest" data-id="${p.id}" aria-pressed="${mineInt}">${ic('heart')} ${mineInt?'Interested':'I’m interested'}</button>
        ${p.done?'':`<button class="btn sm" data-act="planThis" data-id="${p.id}">${ic('spark')} Plan this</button>`}
        ${p.source_url?`<a class="btn sm" href="${esc(p.source_url)}" target="_blank" rel="noopener">${ic('link')} Original post</a>`:''}
        ${p.added_by===me().id?`<button class="btn sm ghost" data-act="removePlace" data-id="${p.id}">${ic('trash')} Remove</button>`:''}</div></div>`:''}
    </div>`; }).join('');
  return `<div class="bucket">
    <button class="mapprev" data-act="bigMap" aria-label="Open the big map"><div id="map-mini" class="lmap"></div><span class="map-cta">${ic('maps')} Open the world map</span></button>
    <div class="bucket-list">
      <div class="chips cats"><button class="chip ${S.cat==='all'?'on':''}" data-act="cat" data-v="all">All · ${all.length}</button>${cats.map(k=>`<button class="chip ${S.cat===k?'on':''}" data-act="cat" data-v="${k}"><span class="dotc" style="background:${CATS[k].color}"></span>${CATS[k].short} · ${all.filter(p=>p.category===k).length}</button>`).join('')}</div>
      ${rows || `<div class="empty-box"><b>Nothing saved yet.</b><span class="muted">Share a reel in the chat, or ask Yonder AI for ideas.</span><button class="btn sm pink" data-act="openSave">${ic('plus')} Save a reel</button></div>`}
    </div></div>`;
}

/* ---------- CALENDAR ---------- */
function calendarPanel(g){
  const now = new Date(); if(!S.calMonth) S.calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const m = S.calMonth, y = m.getFullYear(), mo = m.getMonth();
  const startDow = (new Date(y,mo,1).getDay()+6)%7, days = new Date(y,mo+1,0).getDate();
  const mine = new Set(myGroups().map(x=>x.id));
  const plans = D.plans.filter(p=>p.status==='confirmed' && p.date && mine.has(p.group_id));
  let cells = ''; for(let i=0;i<startDow;i++) cells += '<span class="cd empty"></span>';
  for(let d=1; d<=days; d++){
    const ds = ymd(new Date(y,mo,d)); const here = plans.filter(p=>p.date===ds);
    const thisG = here.some(p=>p.group_id===g.id), other = here.some(p=>p.group_id!==g.id);
    cells += `<button class="cd ${ds===todayYmd()?'today':''} ${S.calDay===ds?'on':''} ${thisG?'has':''} ${!thisG&&other?'other':''}" data-act="calDay" data-v="${ds}"><span>${d}</span>${here.length?'<i></i>':''}</button>`;
  }
  const list = (S.calDay ? plans.filter(p=>p.date===S.calDay) : plans.filter(p=>p.date>=todayYmd())).sort((a,b)=>a.date.localeCompare(b.date));
  const items = list.map(pl=>{ const gg=groupById(pl.group_id); const o=pl.options[pl.chosen||0]||{};
    return `<div class="calitem ${pl.group_id===g.id?'':'other'}"><span class="datebox"><small>${new Date(pl.date+'T12:00').toLocaleDateString('en-IN',{month:'short'})}</small><b>${new Date(pl.date+'T12:00').getDate()}</b></span>
      <div class="grow"><b>${esc(pl.title)}</b><span class="muted tiny">${esc(gg.name)} · ${esc(pl.time||'')} · ${esc(o.area||'')}</span>
      ${pl.date>=todayYmd()?`<span class="remind">${ic('bell')} Reminders: ${fmtDate(ymd(new Date(new Date(pl.date+'T12:00').getTime()-864e5)))} 7 pm · 2 hours before</span>`:''}</div>
      <a class="btn sm icon" href="${mapsUrl(o)}" target="_blank" rel="noopener" aria-label="Google Maps">${ic('maps')}</a></div>`; }).join('');
  const hasUpcoming = plans.some(p=>p.group_id===g.id && p.date>=todayYmd()) || votingIn(g.id).length;
  const top = placesOf(g.id).filter(p=>!p.done).sort((a,b)=>interested(b.id).length-interested(a.id).length)[0];
  const sticky = hasUpcoming ? '' : `<div class="stickynote"><b>Let’s plan something together!</b><span>${top?`${esc(top.name)} has been on ${esc(g.name)}’s list since ${dayLabel(top.created_at)}${interested(top.id).length?` and ${interested(top.id).length} people want to go`:''}.`:'Your list is empty. Share a reel first.'}</span>
    ${top?`<button class="btn sm primary" data-act="planThis" data-id="${top.id}">${ic('spark')} Plan ${esc(top.name)}</button>`:''}</div>`;
  return `<div class="cal">
    ${sticky}
    <div class="cal-head"><button class="btn sm icon" data-act="calNav" data-v="-1" aria-label="Previous month">${ic('left')}</button><b>${m.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</b><button class="btn sm icon" data-act="calNav" data-v="1" aria-label="Next month">${ic('right')}</button></div>
    <div class="cal-grid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<span class="cdh">${d}</span>`).join('')}${cells}</div>
    <div class="legend"><span><i class="lg-this"></i>${esc(g.name)}</span><span><i class="lg-other"></i>Your other groups</span></div>
    <h3>${S.calDay?fmtDate(S.calDay):'Coming up'}${S.calDay?` <button class="linkbtn" data-act="calDay" data-v="">Show all</button>`:''}</h3>
    ${items || '<p class="muted">Nothing planned.</p>'}
  </div>`;
}

/* ================= TASTE SWIPE ================= */
const isPhone = () => window.matchMedia('(max-width: 760px)').matches;
function poster(card){
  const a = card.art, id = 'pt-'+card.id, fg=a.fg, bg=a.bg;
  const pats = {
    dots:`<pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="4.5" fill="${fg}"/></pattern>`,
    stripes:`<pattern id="${id}" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="11" height="26" fill="${fg}"/></pattern>`,
    zigzag:`<pattern id="${id}" width="28" height="18" patternUnits="userSpaceOnUse"><path d="M0 14 L7 4 L14 14 L21 4 L28 14" fill="none" stroke="${fg}" stroke-width="4"/></pattern>`,
    checker:`<pattern id="${id}" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${fg}"/><rect x="18" y="18" width="18" height="18" fill="${fg}"/></pattern>`,
    waves:`<pattern id="${id}" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="${fg}" stroke-width="4"/></pattern>`,
    rays:'',
  };
  const rays = a.pat==='rays' ? Array.from({length:18},(_,i)=>{ const a1=i*20*Math.PI/180, a2=(i*20+9)*Math.PI/180; return `<path d="M150 170 L${150+400*Math.cos(a1)} ${170+400*Math.sin(a1)} L${150+400*Math.cos(a2)} ${170+400*Math.sin(a2)}Z" fill="${fg}"/>`; }).join('') : '';
  const blob = bg==='#111111' || bg==='#2B44FF' ? '#FFFFFF' : (bg==='#FFFFFF' ? '#FFD60A' : '#FFFFFF');
  return `<svg class="poster" viewBox="0 0 300 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${pats[a.pat]||''}</defs>
    <rect width="300" height="340" fill="${bg}"/>${rays ? `<g opacity=".35">${rays}</g>` : `<rect width="300" height="340" fill="url(#${id})" opacity=".32"/>`}
    <circle cx="158" cy="178" r="92" fill="#111"/><circle cx="150" cy="170" r="92" fill="${blob}" stroke="#111" stroke-width="6"/>
    <g transform="translate(90 110) scale(5)" fill="none" stroke="#111" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[a.icon]}</g>
    <rect x="18" y="20" width="${(CATS[card.cat].short.length*11+28)}" height="30" rx="4" fill="#fff" stroke="#111" stroke-width="3"/><text x="31" y="41" font-family="Archivo, sans-serif" font-weight="800" font-size="15" fill="#111">${esc(CATS[card.cat].short.toUpperCase())}</text>
  </svg>`;
}
function tasteState(id){ const t = me().taste||{like:[],nope:[]}; return t.like.includes(id) ? 'like' : t.nope.includes(id) ? 'nope' : null; }
const cardBadge = st => st ? `<span class="tc-state ${st}">${st==='like'?ic('heart')+' Loved':ic('x')+' Not for me'}</span>` : '';
function swipeCard(c, i, extra='', style=''){
  const st = tasteState(c.id);
  return `<article class="tcard ${extra} ${st?'st-'+st:''}" data-i="${i}" data-id="${c.id}" aria-label="${esc(c.label)}" ${style?`style="${style}"`:''}>
    ${poster(c)}
    <div class="tc-body"><h3>${esc(c.label)}</h3><p>${esc(c.d)}</p></div>
    <span class="stamp like">LOVE IT</span><span class="stamp nope">NOT FOR ME</span>${cardBadge(st)}
  </article>`;
}
/* first card the person hasn't answered yet (so coming back picks up where they left off) */
function swipeStart(){
  if(S.swipeInit) return; S.swipeInit = true;
  const first = TASTE_CARDS.findIndex(c=>!tasteState(c.id));
  S.swipeIdx = first<0 ? (isPhone() ? TASTE_CARDS.length : 0) : first;
}
const WHEEL_STEP = 21;
function wheelOff(k,i,n){ let o=((k-i)%n+n)%n; if(o>n/2) o-=n; return o; }
function wheelPos(o){ const c=Math.max(-3,Math.min(3,o)), a=Math.abs(c); return {transform:`rotate(${c*WHEEL_STEP}deg)`, opacity:a>=3?'0':a===2?'.8':'1', zIndex:String(10-a), pointerEvents:a>2?'none':'auto'}; }
const posCss = o => { const p=wheelPos(o); return `transform:${p.transform};opacity:${p.opacity};z-index:${p.zIndex};pointer-events:${p.pointerEvents}`; };
const swipeCounts = () => { const t=me().taste||{like:[],nope:[]}; return {t, answered:t.like.length+t.nope.length}; };
function swipeHead(phone){
  const {t, answered} = swipeCounts(), n = TASTE_CARDS.length;
  return `<div class="swipe-head"><div><span class="eyebrow" id="sw-count">Taste swipe · ${answered} of ${n} answered</span><h1>What do you like? <span class="hl">Tell us more.</span></h1>
    <p class="muted">${phone?'Swipe <b>right</b> to love it, <b>left</b> if it’s not for you.':'Drag the front card <b>up</b> to love it, <b>down</b> if it’s not for you. Spin the wheel to browse.'}</p></div>
    <div class="taste-sum" id="sw-sum">${t.like.length?`<span class="chip on">${ic('heart')} ${t.like.length} loved</span>`:''}${t.nope.length?`<span class="chip">${ic('x')} ${t.nope.length} not for me</span>`:''}</div></div>`;
}
function swipeView(){
  swipeStart();
  const n = TASTE_CARDS.length, phone = isPhone();
  if(phone){
    const i = S.swipeIdx, {t} = swipeCounts();
    if(i>=n) return `<main class="swipe phone" data-tour="swipe">${swipeHead(true)}<div class="swipe-done card"><h2>${ic('check')} That’s all of them!</h2>
      <p class="muted">You loved <b>${t.like.length}</b> and passed on <b>${t.nope.length}</b>. Yonder will use this to suggest places you’ll like.</p>
      <div class="row gap wrap center"><button class="btn pink" data-act="swipeAgain">${ic('cards')} Swipe again</button><button class="btn yellow" data-go="home">Back to home</button></div></div></main>`;
    const stack = [2,1,0].map(off=>{ const k=i+off; return k<n ? swipeCard(TASTE_CARDS[k], k, 'st'+off+(off===0&&S.swipeAnim?' promote':'')) : ''; }).join('');
    S.swipeAnim = false;
    return `<main class="swipe phone" data-tour="swipe">${swipeHead(true)}
      <div class="sw-progress" aria-label="Card ${i+1} of ${n}"><i style="width:${Math.round(i/n*100)}%"></i><span>${i+1} / ${n}</span></div>
      <div class="tstack" id="tstack">${stack}</div>
      <div class="swipe-round">
        <button class="rbtn nope-btn" data-act="pAnswer" data-v="nope" aria-label="Not for me">${ic('x')}</button>
        <button class="rbtn small" data-act="pAnswer" data-v="skip" aria-label="Skip">${ic('right')}<small>Skip</small></button>
        <button class="rbtn love-btn" data-act="pAnswer" data-v="like" aria-label="Love it">${ic('heart')}</button>
      </div>
      ${i>0?`<button class="linkbtn undo" data-act="pUndo">${ic('left')} Undo last</button>`:''}
    </main>`;
  }
  const i = Math.max(0, Math.min(S.swipeIdx, n-1)), cur = TASTE_CARDS[i];
  const cards = TASTE_CARDS.map((c,k)=>{ const o=wheelOff(k,i,n); return swipeCard(c,k,o===0?'off0':'', posCss(o)); }).join('');
  return `<main class="swipe desk" data-tour="swipe">${swipeHead(false)}
    <div class="stage">
      <button class="arrow" data-act="swipeNav" data-v="-1" aria-label="Previous card">${ic('left')}</button>
      <div class="deck wheel" id="deck"><div class="hint-up">${ic('up')} Love it</div>${cards}<div class="hint-down">${ic('down')} Not for me</div></div>
      <button class="arrow" data-act="swipeNav" data-v="1" aria-label="Next card">${ic('right')}</button>
    </div>
    <div class="swipe-actions">
      <button class="btn xl nope-btn" data-act="taste" data-v="nope">${ic('down')} Not for me</button>
      <button class="btn xl" data-act="swipeNav" data-v="1">Skip ${ic('right')}</button>
      <button class="btn xl pink" data-act="taste" data-v="like">${ic('up')} Love it</button>
    </div>
    <div class="tdots" id="tdots">${TASTE_CARDS.map((c,k)=>`<button class="tdot ${k===i?'cur':''} ${tasteState(c.id)||''}" data-act="swipeGo" data-v="${k}" aria-label="${esc(c.label)}"></button>`).join('')}</div>
  </main>`;
}
function setTaste(id, v){
  const t = {like:[...((me().taste||{}).like||[])], nope:[...((me().taste||{}).nope||[])]};
  t.like = t.like.filter(x=>x!==id); t.nope = t.nope.filter(x=>x!==id);
  if(v) t[v].push(id);
  buzz(v==='like'?[10,40,10]:18);
  api.saveProfile({taste:t}).catch(e=>toast('Couldn’t save: '+e.message));
}

/* ----- laptop: circular wheel, updated in place so the cards actually rotate ----- */
let wheelBusy = false;
function wheelSync(){
  const deck = $('#deck'); if(!deck) return false;
  const n = TASTE_CARDS.length, i = S.swipeIdx;
  deck.querySelectorAll('.tcard').forEach(el=>{
    const k = +el.dataset.i, o = wheelOff(k,i,n), p = wheelPos(o), st = tasteState(el.dataset.id);
    el.className = 'tcard'+(o===0?' off0':'')+(st?' st-'+st:'');
    el.style.transform = p.transform; el.style.opacity = p.opacity; el.style.zIndex = p.zIndex; el.style.pointerEvents = p.pointerEvents;
    if(o===0) el.removeAttribute('data-act'); else { el.setAttribute('data-act','swipeGo'); el.setAttribute('data-v',k); }
    const old = el.querySelector('.tc-state'); if(old) old.remove(); if(st) el.insertAdjacentHTML('beforeend', cardBadge(st));
  });
  const {t, answered} = swipeCounts();
  const cnt = $('#sw-count'); if(cnt) cnt.textContent = `Taste swipe · ${answered} of ${n} answered`;
  const sum = $('#sw-sum'); if(sum) sum.innerHTML = `${t.like.length?`<span class="chip on">${ic('heart')} ${t.like.length} loved</span>`:''}${t.nope.length?`<span class="chip">${ic('x')} ${t.nope.length} not for me</span>`:''}`;
  document.querySelectorAll('#tdots .tdot').forEach((d,k)=>{ d.className = 'tdot '+(k===i?'cur ':'')+(tasteState(TASTE_CARDS[k].id)||''); });
  mountSwipe(); return true;
}
function wheelGo(to, rel){ const n=TASTE_CARDS.length; S.swipeIdx = rel ? ((S.swipeIdx+to)%n+n)%n : ((to%n)+n)%n; if(!wheelSync()) render(); }
function wheelAnswer(v, el){
  el = el || document.querySelector('.deck .tcard.off0'); if(!el || wheelBusy) return;
  wheelBusy = true; const id = el.dataset.id; el.classList.remove('dragging'); el.classList.add(v==='like'?'fly-up':'fly-down');
  setTimeout(()=>{
    setTaste(id, v); S.swipeIdx = (S.swipeIdx+1) % TASTE_CARDS.length;
    el.style.transition = 'opacity .45s ease'; el.classList.remove('fly-up','fly-down'); wheelSync();
    setTimeout(()=>{ el.style.transition=''; wheelBusy=false; }, 480);
  }, 240);
}

/* ----- phone: one card at a time, Tinder style ----- */
let phoneBusy = false;
function phoneAnswer(v){
  const el = document.querySelector('.tstack .tcard.st0'); if(!el || phoneBusy) return;
  phoneBusy = true; const id = el.dataset.id;
  el.classList.remove('dragging'); el.style.transform=''; el.classList.add(v==='like'?'fly-right':v==='nope'?'fly-left':'fly-up');
  setTimeout(()=>{ if(v!=='skip') setTaste(id, v); S.swipeIdx++; S.swipeAnim = true; phoneBusy=false; render(); }, 260);
}
function phoneUndo(){ if(S.swipeIdx<=0) return; S.swipeIdx--; const c = TASTE_CARDS[S.swipeIdx]; if(tasteState(c.id)) setTaste(c.id, null); S.swipeAnim = true; render(); }

let swipeDrag = null;
function mountSwipe(){
  const el = document.querySelector(isPhone() ? '.tstack .tcard.st0' : '.deck .tcard.off0'); if(!el) return;
  el.onpointerdown = e => { if(wheelBusy||phoneBusy) return; swipeDrag = {el, x:e.clientX, y:e.clientY, dx:0, dy:0, t:Date.now()}; try{ el.setPointerCapture(e.pointerId); }catch(err){} el.classList.add('dragging'); };
}
window.addEventListener('pointermove', e=>{
  if(!swipeDrag) return; const d = swipeDrag; d.dx = e.clientX-d.x; d.dy = e.clientY-d.y;
  if(isPhone()){
    d.el.style.transform = `translate(${d.dx}px, ${d.dy*0.35}px) rotate(${d.dx/16}deg)`;
    d.el.classList.toggle('show-like', d.dx>50); d.el.classList.toggle('show-nope', d.dx<-50);
  } else if(Math.abs(d.dx) > Math.abs(d.dy)){ d.el.style.transform = `translateX(${d.dx*0.6}px) rotate(${d.dx/60}deg)`; d.el.classList.remove('show-like','show-nope'); }
  else { d.el.style.transform = `translateY(${d.dy}px) rotate(${d.dy/40}deg)`; d.el.classList.toggle('show-like', d.dy<-60); d.el.classList.toggle('show-nope', d.dy>60); }
});
function endDrag(){
  if(!swipeDrag) return; const d = swipeDrag; swipeDrag = null;
  d.el.classList.remove('dragging','show-like','show-nope');
  if(isPhone()){
    const fast = Math.abs(d.dx) > 40 && (Date.now()-d.t) < 250;
    if(Math.abs(d.dx)>90 || fast) phoneAnswer(d.dx>0?'like':'nope'); else d.el.style.transform='';
    return;
  }
  if(Math.abs(d.dy)>90 && Math.abs(d.dy)>Math.abs(d.dx)) wheelAnswer(d.dy<0?'like':'nope', d.el);
  else if(Math.abs(d.dx)>80){ d.el.style.transform=''; wheelGo(d.dx<0?1:-1, true); }
  else d.el.style.transform = wheelPos(0).transform;
}
window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);

/* ================= PROFILE ================= */
function profileView(){
  const t = me().taste||{like:[],nope:[]};
  const been = D.ratings.filter(r=>r.user_id===me().id && r.went).map(r=>({r, p:placeById(r.place_id)})).filter(x=>x.p);
  return `<main class="profile">
    <section class="tile p-card" data-tour="profile">
      <div class="row gap">${av(me().id,'xl')}<div class="grow"><span class="eyebrow">${me().is_guest?'Guest account':esc(me().email||'')}</span><h1>${esc(me().name)}</h1></div></div>
      <form class="stack" data-form="profile">
        <label class="lbl" for="pf-name">Name</label><input id="pf-name" class="input" maxlength="24" value="${esc(me().name)}">
        <label class="lbl">Your colour</label><div class="chips">${COLORS.map(c=>`<button type="button" class="swatch ${me().color===c?'on':''}" style="background:${c}" data-act="color" data-v="${c}" aria-label="Colour ${c}"></button>`).join('')}</div>
        <button class="btn primary" type="submit">Save</button>
      </form>
    </section>
    <section class="tile"><span class="eyebrow">Your area</span><h2>Where are you usually?</h2>
      <p class="muted">${homeOf().label?`Now: <b>${esc(homeOf().label)}</b>. `:''}Search any area or city in the world. We use it for “Near you” and to suggest places that are easy for everyone.</p>
      ${geoPicker()}
      <button class="btn primary" data-act="saveArea" ${S.geo.pick?'':'disabled'}>${S.geo.pick?`Save ${esc(areaLabel(S.geo.pick.label))}`:'Pick a result to save'}</button></section>
    <section class="tile"><span class="eyebrow">Your taste</span><h2>What you’re into</h2>
      <div class="chips">${t.like.map(k=>TASTE_BY_ID[k]?`<span class="chip on">${ic('heart')}${esc(TASTE_BY_ID[k].label)}</span>`:'').join('') || '<span class="muted">Nothing yet.</span>'}</div>
      ${t.nope.length?`<p class="muted tiny" style="margin-top:10px">Not for you: ${t.nope.map(k=>TASTE_BY_ID[k]?TASTE_BY_ID[k].label:'').join(', ')}</p>`:''}
      <button class="btn pink" data-go="swipe">${ic('cards')} Do the taste swipe</button></section>
    <section class="tile"><span class="eyebrow">Groups</span><h2>Your groups</h2>
      ${sharedGroups().map(g=>`<div class="grow-row"><span class="gicon" style="background:${g.color};color:${inkOn(g.color)}">${esc(first(g.name))}</span><span class="grow"><b>${esc(g.name)}</b><span class="muted tiny">${membersOf(g.id).length} people · code ${esc(g.invite_code)}${g.is_demo?' · demo group':''}</span></span><button class="btn sm" data-act="leave" data-id="${g.id}">Leave</button></div>`).join('') || '<p class="muted">No groups yet.</p>'}
      <div class="row gap"><button class="btn sm" data-act="modal" data-v="newGroup">${ic('plus')} New group</button><button class="btn sm" data-act="modal" data-v="join">${ic('link')} Join with code</button></div></section>
    <section class="tile"><span class="eyebrow">Places you’ve been</span><h2>Done &amp; rated</h2>
      ${been.map(({r,p})=>`<div class="grow-row">${placeTile(p.category,'sm')}<span class="grow"><b>${esc(p.name)}</b><span class="muted tiny">${esc(groupById(p.group_id)?groupById(p.group_id).name:'')}</span></span><span class="stars-s">${'★'.repeat(r.stars||0)}${'☆'.repeat(5-(r.stars||0))}</span></div>`).join('') || '<p class="muted">After a plan, Yonder asks “Did you go?” and you rate it here.</p>'}</section>
    <section class="tile"><span class="eyebrow">Privacy</span><h2>What Yonder sees</h2>
      <p class="muted">Only what you share into Yonder. We never ask for your Instagram password and never read your DMs. Your friends in a group see what’s saved in that group. To put places on the map, place names and areas are looked up on OpenStreetMap.</p>
      <div class="row gap wrap"><button class="btn" data-act="tour">${ic('help')} Replay the walkthrough</button><button class="btn" data-act="signOut">${ic('logout')} ${me().is_guest?'Leave guest session':'Log out'}</button></div>
      ${me().is_guest?'<p class="tiny muted">Leaving a guest session ends it on this browser.</p>':''}</section>
  </main>`;
}

/* ================= MODALS ================= */
function modalView(){
  const m = S.modal; let inner = '';
  if(m.type==='save') inner = saveModal(m);
  else if(m.type==='newGroup') inner = `<h2>New group</h2><form class="stack" data-form="newGroup"><label class="lbl" for="ng-name">Group name</label><input id="ng-name" class="input" maxlength="30" required placeholder="e.g. College gang">
      <label class="lbl">Colour</label><div class="chips">${COLORS.map((c,i)=>`<button type="button" class="swatch ${(m.color||COLORS[0])===c?'on':''}" style="background:${c}" data-act="ngColor" data-v="${c}" aria-label="Colour ${i+1}"></button>`).join('')}</div>
      <button class="btn primary xl" type="submit">Create group</button></form>`;
  else if(m.type==='join') inner = `<h2>Join a group</h2><p class="muted">Ask a friend for their group’s 6-letter code, or open their invite link.</p><form class="stack" data-form="join"><input id="jn-code" class="input code-in" maxlength="6" required placeholder="ABC123" value="${esc(m.code||'')}"><button class="btn primary xl" type="submit">Join</button></form>${m.err?`<p class="err">${esc(m.err)}</p>`:''}`;
  else if(m.type==='invite'){ const g=curGroup(); const link = location.origin+location.pathname+'?join='+g.invite_code;
    inner = `<h2>Invite to ${esc(g.name)}</h2><p class="muted">Send this link on WhatsApp. Friends open it, sign in, and they’re in. No contacts needed.</p>
      <div class="invite-box"><code>${esc(link)}</code><button class="btn sm" data-act="copy" data-v="${esc(link)}">${ic('copy')} Copy link</button></div>
      <div class="invite-code">Or share the code <b>${esc(g.invite_code)}</b></div>
      <a class="btn yellow" href="https://wa.me/?text=${encodeURIComponent('Join our group "'+g.name+'" on Yonder: '+link)}" target="_blank" rel="noopener">${ic('chat')} Share on WhatsApp</a>
      ${MODE==='local'?'<p class="tiny muted">In this demo, data stays in your browser, so friends can’t join yet. Invites work once Yonder is connected to its server.</p>':''}`; }
  else if(m.type==='vote') inner = voteModal(m);
  else if(m.type==='rate') inner = rateModal(m);
  else if(m.type==='bigMap'){ const g=curGroup(); const ps=mapPlaces(); const missing = ps.filter(p=>p.lat==null).length;
    inner = `<h2>${esc(g.name)} · map</h2>
      <form class="map-search" data-form="mapSearch"><div class="map-q">${ic('pin')}<input id="map-q" placeholder="Search a city, area or place" autocomplete="off" aria-label="Search the map for a city, area or place"><button class="btn sm yellow" type="submit">Search</button></div></form>
      <div class="map-jumps"><span class="tiny muted">Or jump to:</span><button type="button" class="btn sm" data-act="mapHome">My area</button><button type="button" class="btn sm" data-act="mapAll">All saved places</button><button type="button" class="btn sm" data-act="mapRandom">Surprise me</button></div>
      <div class="bigmap"><div id="map-big" class="lmap"></div></div>
      <div id="map-sel" class="map-sel ${S.spot?'spot':S.sel&&placeById(S.sel)?'':'empty'}">${mapSelHtml()}</div>
      ${missing?`<p class="tiny muted">${missing} place${missing===1?' is':'s are'} still being located. They appear on the map as they’re found.</p>`:''}`; }
  else if(m.type==='editPlan'){ const pl=D.plans.find(p=>p.id===m.id);
    inner = `<h2>Change date</h2><form class="stack" data-form="editPlan"><label class="lbl" for="ep-date">Date</label><input id="ep-date" type="date" class="input" value="${esc(pl.date||'')}" min="${todayYmd()}" required><label class="lbl" for="ep-time">Time</label><input id="ep-time" class="input" value="${esc(pl.time||'')}" placeholder="8:00 pm"><button class="btn primary" type="submit">Save</button></form>`; }
  else if(m.type==='planPlace') inner = planPlaceModal(m);
  else if(m.type==='joinConfirm') inner = joinConfirmModal(m);
  else if(m.type==='onboard') inner = onboardModal(m);
  else if(m.type==='welcome') inner = `<div class="welcome"><div class="brand big">${LOGO}<span>yonder</span></div><h2>Hi ${esc(me().name)}! Save. Plan. Go.</h2>
      <ol class="steps3 compact"><li class="st st-pink"><b>1 · Save</b><span>Drop in reels. We find the places.</span></li><li class="st st-yellow"><b>2 · Plan</b><span>AI picks 3 that fit your group.</span></li><li class="st st-blue"><b>3 · Go</b><span>Vote, lock a date, rate it.</span></li></ol>
      <p class="muted">${me().is_guest ? 'Your demo has four groups: <b>Office gang</b> and <b>Shopping</b> (Bengaluru), a <b>Thailand trip</b> and <b>Bandra Bunch</b> (Mumbai). Try anything.' : 'Start by making a group and inviting your friends.'}</p>
      <div class="row gap wrap center"><button class="btn yellow xl" data-act="startTour">${ic('spark')} Quick tour (30 sec)</button><button class="btn xl" data-act="skipTour">I’ll explore myself</button></div></div>`;
  const enter = render.lastModal !== m.type + (m.step||'');
  return `<div class="modal-wrap ${enter?'enter':''}" data-act="closeModalBg"><div class="modal card ${m.type} ${enter?'enter':''}" role="dialog" aria-modal="true">${m.noClose?'':`<button class="mclose" data-act="closeModal" aria-label="Close">${ic('x')}</button>`}${inner}</div></div>`;
}
function planPlaceModal(m){
  const p = placeById(m.id); if(!p) return '<p>Place not found.</p>'; const g = groupById(p.group_id);
  const chip = (act, v, on, label, extra='') => `<button type="button" class="chip ${extra} ${on?'on':''}" aria-pressed="${on}" data-act="${act}" data-v="${esc(v)}">${on?ic('check'):''}${label}</button>`;
  return `<h2>${ic('cal')} Plan ${esc(p.name)}</h2>
    <p class="muted">${esc([p.area, p.price].filter(Boolean).join(' · '))}${p.area||p.price?'. ':''}Pick who’s coming and when. It goes straight onto the calendar.</p>
    <form class="stack" data-form="planPlace">
      ${g.is_personal ? '' : `<fieldset><legend>Who’s coming?</legend><div class="chips">${membersOf(g.id).map(id=>chip('ppWho', id, m.who.includes(id), `${av(id,'xs')}${esc(nm(id))}`, 'person')).join('')}</div></fieldset>`}
      <fieldset><legend>When?</legend><div class="chips">${WHEN.map(([k,l])=>chip('ppWhen', k, m.when===k, l)).join('')}</div>
        ${m.when==='date' ? `<input type="date" id="pp-date" class="input sm" value="${esc(m.date)}" min="${todayYmd()}" required>` : ''}</fieldset>
      <label class="lbl" for="pp-time">Time</label><input id="pp-time" class="input" value="${esc(m.time)}" placeholder="8:00 pm" maxlength="20">
      <button class="btn primary xl" type="submit">${ic('check')} Add to the calendar</button>
    </form>`;
}
function onboardModal(m){
  return `<h2>One quick thing</h2><p class="muted">Where are you usually? Any area or city in the world. We use it for “Near you” and to suggest places that are easy for everyone.</p>
    ${geoPicker()}
    <div class="row gap"><button class="btn primary xl" data-act="obDone" ${S.geo.pick?'':'disabled'}>Continue</button><button class="btn xl ghost" data-act="obDone" data-v="skip">Skip</button></div>`;
}

/* ---------- save flow (share a reel / paste link) ---------- */
const isPicked = (m,i) => m.result && m.result.guide ? m.picks[i]===true : m.picks[i]!==false;
// Places in the result that can be ticked right now (not already saved in the chosen groups, and matching the search box).
function pickTargets(m){
  const sure = m.result.places.filter(p=>p.confidence!=='partial');
  const saved = new Set(m.groups.flatMap(gid=>placesOf(gid).map(p=>p.name.toLowerCase())));
  const f = (m.filter||'').toLowerCase();
  return sure.map((p,i)=>i).filter(i=>!saved.has(sure[i].name.toLowerCase()) && (!f || sure[i].name.toLowerCase().includes(f)));
}
/* A reel's video can be added so Yonder can watch and listen (names are often only spoken or shown on screen). Live AI only. */
function readVideo(file){
  return new Promise((ok,bad)=>{
    if(file.size>13.5e6) return bad(new Error(`That video is ${Math.round(file.size/1e6)} MB. Trim it to under a minute (about 13 MB or less) and try again.`));
    const fr = new FileReader();
    fr.onload = () => ok({name:file.name, mime:file.type||'video/mp4', mb:(file.size/1e6).toFixed(1), data:String(fr.result).split(',')[1]});
    fr.onerror = () => bad(new Error('Couldn’t read that file.'));
    fr.readAsDataURL(file);
  });
}
function videoBlock(m, compact){
  if(MODE!=='cloud') return '';
  const picked = m.video ? `<span class="vchip">${ic('yt')}<b>${esc(m.video.name)}</b><span class="tiny muted">${m.video.mb} MB</span><button type="button" class="linkbtn" data-act="videoClear">Remove</button></span>`
    : `<label class="btn sm" for="sv-video">${ic('yt')} ${compact?'Let Yonder watch the reel':'Add a screen recording'}</label>`;
  return `<div class="video-add">${picked}<input id="sv-video" type="file" accept="video/*" hidden data-act-change="videoPick">
    <span class="tiny muted">${compact?'Under a minute. Yonder watches it and listens for place names.':'Names only spoken in the reel? Add a recording (under a minute).'}</span></div>`;
}
function saveModal(m){
  const groups = myGroups();
  if(m.step==='input') return `<h2>${ic('plus')} Save a reel or link</h2>
    <form class="stack" data-form="saveRead">
      <textarea id="sv-in" class="input" rows="3" placeholder="Paste an Instagram, YouTube or Google Maps link, or a list of places" ${m.video?'':'required'}>${esc(m.raw||'')}</textarea>
      ${videoBlock(m,false)}
      <button class="btn pink xl" type="submit">${ic('spark')} Find the places</button>
    </form>`;
  if(m.step==='reading') return `<h2>Reading it…</h2><div class="thinking-card"><span class="spinner"></span><div><b>Looking for places</b><span class="muted tiny">${m.video?'Watching and listening to the video. About 20 seconds.':/youtu/.test(m.raw||'')&&MODE==='cloud'?'Watching the video. Can take 20 seconds.':'Reading the caption and title'}</span></div></div>`;
  const r = m.result || {places:[]};
  const sure = r.places.filter(p=>p.confidence!=='partial');
  const partial = r.places.find(p=>p.confidence==='partial');
  const saved = new Set(m.groups.flatMap(gid=>placesOf(gid).map(p=>p.name.toLowerCase())));
  const picked = sure.filter((p,i)=>isPicked(m,i) && !saved.has(p.name.toLowerCase())).length + (m.extra||[]).length;
  const targets = pickTargets(m), allOn = targets.length>0 && targets.every(i=>isPicked(m,i));
  const pickAllBtn = targets.length>1 ? `<button type="button" class="btn sm ${allOn?'':'yellow'}" data-act="pickAll">${allOn?'Clear all':`Pick all ${targets.length}${m.filter?' shown':''}`}</button>` : '';
  const row = (p,i) => { const dup = saved.has(p.name.toLowerCase()); const f=(m.filter||'').toLowerCase(); if(f && !p.name.toLowerCase().includes(f)) return '';
    return `<label class="frow2 ${dup?'dup':''}"><input type="checkbox" data-act-change="pick" data-i="${i}" ${isPicked(m,i)&&!dup?'checked':''} ${dup?'disabled':''}>${placeTile(p.category,'sm')}<span class="grow"><b>${esc(p.name)}</b><span class="muted tiny">${esc(p.area||'Area unknown')}${p.price?' · '+esc(p.price):''}${p.evidence&&p.evidence!=='list'?' · '+esc(p.evidence):''}</span></span>${dup?'<span class="conf added">Already saved</span>':(r.guide?'':`<span class="conf sure">${ic('check')} Sure</span>`)}</label>`; };
  const sections = [...new Set(sure.map(p=>p.section||''))];
  return `<h2>${sure.length?`Found ${sure.length} place${sure.length===1?'':'s'}${r.guide?' in this guide':''}`:partial?'Almost there':'We couldn’t find a place'}</h2>
    <div class="row gap wrap">${srcBadge(r.source_kind||'link')}<b>${esc(r.title||'Your link')}</b>${r.watched?`<span class="conf sure">${ic('yt')} Watched the video</span>`:''}</div>
    ${r.note?`<p class="tiny muted">${esc(r.note)}</p>`:''}
    ${r.mode==='quick' && MODE==='cloud'?'<p class="tiny muted">AI was busy, so this used quick matching.</p>':''}
    ${r.guide ? `<div class="guide-tools"><input id="gd-filter" class="input" placeholder="Search ${sure.length} places" value="${esc(m.filter||'')}" autocomplete="off"><span class="tiny muted">${picked} picked</span>${pickAllBtn}</div>
      <div class="found guide">${sections.map(sec=>{ const idx = sure.map((p,i)=>i).filter(i=>(sure[i].section||'')===sec); const rows = idx.map(i=>row(sure[i],i)).join(''); if(!rows) return '';
        return `<div class="gsec"><div class="gsec-head"><b>${esc(sec||'Places')}</b><button type="button" class="linkbtn" data-act="pickSection" data-v="${esc(sec)}">${idx.every(i=>isPicked(m,i))?'Clear':'Pick all'}</button></div>${rows}</div>`; }).join('')}</div>`
    : sure.length?`${pickAllBtn?`<div class="guide-tools"><span class="tiny muted">${picked} picked</span>${pickAllBtn}</div>`:''}<div class="found">${sure.map((p,i)=>row(p,i)).join('')}</div>`:''}
    ${(m.extra||[]).map((p,i)=>`<div class="frow2">${placeTile(p.category,'sm')}<span class="grow"><b>${esc(p.name)}</b><span class="muted tiny">${esc(p.area||'Area unknown')}</span></span><span class="conf added">Added by you</span></div>`).join('')}
    ${(partial || !sure.length) ? `<div class="whichplace"><b>${partial?`Looks like ${({bars:'a bar',cafe:'a café',food:'a food spot',sunset:'an outdoor spot',shows:'a show or gig',workshop:'a workshop',shop:'a shop'})[partial.category]||'a place'}${partial.area?' in '+esc(partial.area):''}, but the name isn’t in the post.`:'No place name in the caption.'}</b>
      ${!r.watched?videoBlock(m,true):''}
      <span class="muted tiny">Or type the name yourself (you can add more than one).</span>
      <form class="row gap" data-form="whichPlace"><input id="wp-name" class="input" list="place-names" placeholder="Place name" autocomplete="off"><button class="btn sm" type="submit">${ic('plus')} Add</button></form>
      <datalist id="place-names">${nearMumbai(homeLL()) ? PLACE_DB.map(p=>`<option value="${esc(p.name)}">`).join('') : ''}</datalist></div>`:''}
    <fieldset><legend>Save to</legend><div class="chips">${groups.map(g=>{ const on=m.groups.includes(g.id); return `<button type="button" class="chip ${on?'on':''}" aria-pressed="${on}" data-act="saveGroup" data-v="${g.id}">${on?ic('check'):''}${esc(g.name)}</button>`; }).join('')}</div></fieldset>
    <div class="row gap wrap"><button class="btn pink xl" data-act="saveConfirm" ${picked && m.groups.length?'':'disabled'}>${ic('check')} Save ${picked} place${picked===1?'':'s'}${m.groups.length>1?` to ${m.groups.length} groups`:''}</button>
      <button class="btn xl ghost" data-act="saveBack">Back</button></div>`;
}

/* ---------- vote modal ---------- */
function voteModal(m){
  const pl = D.plans.find(p=>p.id===m.id); if(!pl) return '<p>Plan not found.</p>';
  const rank = m.rank, vetoes = m.vetoes;
  return `<h2>${ic('vote')} Your vote</h2><p class="muted">Tap the options in the order you like them. Mark anything that doesn’t work for you.</p>
    <div class="vote-opts">${pl.options.map((o,i)=>{ const r = rank.indexOf(i), v = vetoes.includes(i);
      return `<div class="vopt ${r>=0?'ranked':''} ${v?'vetoed':''}"><button class="vpick" data-act="vRank" data-i="${i}" ${v?'disabled':''}><span class="vnum">${r>=0?r+1:''}</span>${placeTile(o.category,'sm')}<span class="grow"><b>${esc(o.name)}</b><span class="muted tiny">${esc(o.area||'')}${o.price?' · '+esc(o.price):''}</span><span class="tiny">${esc(o.why||'')}</span></span></button>
        <button class="btn sm ${v?'pink':'ghost'} vveto" data-act="vVeto" data-i="${i}" aria-pressed="${v}">${ic('x')} Doesn’t work for me</button></div>`; }).join('')}</div>
    <div class="row gap"><button class="btn primary xl" data-act="vSubmit" ${rank.length || vetoes.length ? '' : 'disabled'}>Submit vote</button><button class="btn xl ghost" data-act="vReset">Reset</button></div>`;
}
/* ---------- did you go + rating ---------- */
function rateModal(m){
  const pl = D.plans.find(p=>p.id===m.id), p = pl && placeById(pl.place_id);
  if(m.step==='stars') return `<h2>How did you like ${esc(p?p.name:'it')}?</h2><p class="muted">Rate it out of 5. That’s it.</p>
    <div class="stars" role="radiogroup" aria-label="Rating">${[1,2,3,4,5].map(n=>`<button class="star ${m.stars>=n?'on':''}" data-act="star" data-v="${n}" role="radio" aria-checked="${m.stars===n}" aria-label="${n} star${n>1?'s':''}">${ic('star')}</button>`).join('')}</div>
    <button class="btn primary xl" data-act="rateSave" ${m.stars?'':'disabled'}>Save rating</button>`;
  return `<h2>Did you go to ${esc(p?p.name:pl.title)}?</h2><div class="row gap"><button class="btn yellow xl" data-act="didGoYes">Yes, we went</button><button class="btn xl" data-act="didGoNo">No, skipped it</button></div>`;
}

/* ================= QUICK PICKS (used when live AI is off or busy) ================= */
const MOOD_CATS = {chill:['cafe','sunset'], celebrate:['bars','food'], new:[]};
function tasteScore(uid, cat){ const t = prof(uid).taste||{like:[],nope:[]}; let s=0; t.like.forEach(k=>{ if(TASTE_BY_ID[k] && TASTE_BY_ID[k].cat===cat) s+=1; }); t.nope.forEach(k=>{ if(TASTE_BY_ID[k] && TASTE_BY_ID[k].cat===cat) s-=1.5; }); return s; }
function quickPlan(g, p, exclude=[]){
  const who = g.is_personal ? [me().id] : p.who;
  const wantCats = new Set(p.moods.flatMap(k=>CATS[k]?[k]:(MOOD_CATS[k]||[])));
  const skip = new Set(exclude.map(n=>String(n).toLowerCase()));
  const list = placesOf(g.id).filter(x=>!x.done && !skip.has(x.name.toLowerCase())).map(x=>({...x, place_id:x.id, fromList:true}));
  const listNames = new Set(list.map(x=>x.name.toLowerCase()));
  const homes = who.map(u=>homeOf(prof(u)).ll).filter(Boolean);
  const centre = homes.length ? [homes.reduce((a,b)=>a+b[0],0)/homes.length, homes.reduce((a,b)=>a+b[1],0)/homes.length] : MUMBAI;
  // The built-in ideas are Mumbai places: only offer them to groups who are around Mumbai.
  const fresh = !nearMumbai(centre) ? [] : PLACE_DB.filter(x=>!listNames.has(x.name.toLowerCase()) && !skip.has(x.name.toLowerCase())).map(x=>({...x, place_id:null, fromList:false, lat:x.ll[0], lng:x.ll[1]}));
  const pool = p.source==='list' ? list : p.source==='new' ? fresh : [...list, ...fresh];
  const max = budgetMax()[p.budget];
  const extra = (p.extra||'').toLowerCase();
  const scored = pool.map(x=>{
    let s = 0, why = [];
    if(wantCats.size){ if(wantCats.has(x.category)){ s+=5; } else s-=4; }
    if(p.moods.includes('new') && !x.fromList) s+=1.2;
    if(x.fromList){ s+=1; const ints = interested(x.id).filter(u=>who.includes(u)); if(ints.length){ s+=ints.length*1.2; why.push(`${ints.map(nm).join(' and ')} ${ints.length>1?'are':'is'} interested`); } else why.push(`on your list since ${dayLabel(x.created_at)}`); }
    const fans = who.filter(u=>tasteScore(u,x.category)>0), haters = who.filter(u=>tasteScore(u,x.category)<0);
    s += fans.length*0.6 - haters.length*0.8;
    if(fans.length && !x.fromList) why.push(`${fans.map(nm).slice(0,2).join(' and ')} like${fans.length===1?'s':''} this kind of thing`);
    const pp = perPerson(x.price);
    if(max && pp!=null){ if(pp<=max) { s+=1; why.push(pp===0?'free':`about ${fmtMoney(pp)} each`); } else s-=3; }
    if(x.lat!=null){ const k = km(centre,[x.lat,x.lng]); const areaSel = p.areas.filter(a=>a!=='near');
      if(areaSel.length){ if(areaSel.includes(areaLabel(x.area))) { s+=2; why.push(`in ${areaLabel(x.area)}`); } else s-=1; }
      else if(p.areas.includes('near') && k<6){ s+=1.2; why.push('easy for most of you to reach'); } }
    if(extra && (extra.includes(x.name.toLowerCase()) || extra.includes((areaLabel(x.area)||'~').toLowerCase()))) s+=2;
    if(/birthday|celebrat/.test(extra) && (x.category==='bars'||x.category==='food')) { s+=1; why.push('good for a celebration'); }
    if(x.category==='bars' && (p.memory||[]).some(m=>/drink/i.test(m))) why.push('has mocktails for anyone not drinking');
    if(x.category==='food' && (p.memory||[]).some(m=>/vegetarian/i.test(m))) why.push('check veg options');
    return {x, s: s + Math.random()*0.3, why};
  }).sort((a,b)=>b.s-a.s);
  const out = [], seen = new Set();
  for(const c of scored){ if(out.length>=3) break; if(seen.has(c.x.category) && scored.length>6 && out.length<2) continue; seen.add(c.x.category); out.push(c); }
  for(const c of scored){ if(out.length>=3) break; if(!out.includes(c)) out.push(c); }
  return {mode:'quick', reply:'', options: out.map(({x,why})=>({name:x.name, area:x.area, category:x.category, price:x.price, why: (why.slice(0,3).join(' · ') || 'A good fit for the group').replace(/^./,c=>c.toUpperCase()), place_id:x.place_id||null}))};
}
const SYN = {cafe:['coffee','cafe','café','brunch','work from','bakery'], bars:['drink','bar','cocktail','pub','speakeasy','mocktail'], food:['food','eat','dinner','kebab','late-night','late night','street'], sunset:['sunset','beach','walk','outdoor','sea'], shows:['comedy','stand-up','standup','gig','music','show','open mic'], workshop:['workshop','class','pottery','art','craft','dance'], shop:['shop','shopping','store','boutique','mall','market','thrift','vintage','clothes']};
function quickAsk(g, q){
  const s = q.toLowerCase();
  const cats = Object.keys(SYN).filter(k=>SYN[k].some(w=>s.includes(w)));
  const area = areaKey(s);
  const p = {who: membersOf(g.id), moods:cats, budget: /cheap|budget|free/.test(s)?'u500':'', areas: area?[area]:['near'], source:'both', memory:g.memory||[], extra:q};
  const r = quickPlan(g, p);
  return {mode:'quick', reply: cats.length||area ? `Here’s what fits${area?' around '+area:''} from your list and a few well-known spots.` : 'Here are a few ideas from your list.', suggestions:r.options};
}
const CAT_WORDS = [['bars',/\b(bars?|pubs?|cocktails?|speakeasy|brewery)\b/i],['food',/\b(restaurants?|food|street|eat|dinner|lunch|biryani|kebabs?|thali)\b/i],['cafe',/\b(bakery|bakeries|bakehouse|desserts?|caf[eé]s?|coffee|gelato|patisserie|tea)\b/i],
  ['sunset',/\b(sunset|beach|promenade|park|fort|walk|trek|viewpoint|village|reclamation)\b/i],['workshop',/\b(workshops?|class(es)?|pottery|painting)\b/i],['shop',/\b(shop(s|ping)?|stores?|boutiques?|malls?|thrift|vintage|markets?)\b/i],['shows',/\b(comedy|gigs?|music|shows?|things to do|visit|gallery|gaming|church|museum)\b/i]];
const catFromText = t => { for(const [k,re] of CAT_WORDS) if(re.test(t)) return k; return null; };
function parseList(text){
  const lines = String(text||'').split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const out = []; let section='', sCat=null, sPrice='', title='';
  const docArea = areaKey(text) || '';
  const bullet = /^(?:[*\-•·▪►➤→✔✅]|\d{1,3}[.)])\s*(.+)$/u;
  const push = (raw, sec, cat, price) => {
    let name = raw.replace(/\s*[(\[].*$/,'').replace(/^[^\p{L}\d]+/u,'').trim(); let area = '';
    const sp = name.split(/\s+[–—-]\s+|\s*\|\s*|,\s+/);
    if(sp.length>1 && areaKey(sp.slice(1).join(' '))){ area = areaKey(sp.slice(1).join(' ')); name = sp[0].trim(); }
    if(!name || name.length>48 || /^https?:/i.test(name)) return;
    const db = PLACE_DB.find(x=>x.name.toLowerCase()===name.toLowerCase());
    out.push({...(db||{}), name: db?db.name:name, area: area || (db&&db.area) || docArea, category: (db&&db.category) || cat || catFromText(raw) || 'food',
      price: price || (db&&db.price) || '', section: sec, confidence:'sure'});
  };
  for(const l of lines){
    const m = l.match(bullet);
    if(m) push(m[1], section, catFromText(m[1]) && sCat!=='food' && sCat!=='cafe' ? catFromText(m[1]) : sCat, sPrice);
    else if(l.length<=80 && !/^https?:/i.test(l)){
      const clean = l.replace(/^[^\p{L}\d₹]+/u,'').trim();
      if(!title && !out.length) title = clean;
      section = clean; sCat = catFromText(l);
      const pm = l.match(/(?:up to|under|above|below|around|about|~)?\s*₹\s?[\d,]+(?:\s*for\s*(?:2|two))?/i);
      sPrice = pm ? pm[0].trim().replace(/for\s*2\b/i,'for two').replace(/^./,c=>c.toUpperCase()) : '';
    }
  }
  if(!out.length){
    const parts = String(text||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
    if(parts.length>=2 && parts.every(x=>x.length<=40 && x.split(/\s+/).length<=5 && !/^https?:/i.test(x))) parts.forEach(x=>push(x,'',null,''));
  }
  return {places: out, title};
}
function quickExtract(raw){
  const text = String(raw||'').trim();
  const url = (text.match(/https?:\/\/\S+/)||[])[0] || '';
  const ig = url.match(/instagram\.com\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/);
  if(ig && KNOWN_LINKS[ig[1]] && KNOWN_LINKS[ig[1]].caption){ const k = KNOWN_LINKS[ig[1]]; const r = parseList(k.caption);
    return {mode:'quick', title:k.title, source_kind:'ig', url, note:k.note, guide: r.places.length>12, places:r.places}; }
  if(ig && KNOWN_LINKS[ig[1]]){ const k = KNOWN_LINKS[ig[1]];
    const places = k.names ? k.names.map(n=>{ const p=PLACE_DB.find(x=>x.name===n); return {...p, confidence:'sure'}; }) : [{name:'', area:k.area||'', category:k.category, confidence:'partial'}];
    return {mode:'quick', title:k.title, source_kind:'ig', url, note:k.note, places};
  }
  const gm = url.match(/google\.[^/]+\/maps\/place\/([^/@?]+)/);
  if(gm){ const name = decodeURIComponent(gm[1].replace(/\+/g,' ')); const hit = PLACE_DB.find(x=>x.name.toLowerCase()===name.toLowerCase() || name.toLowerCase().includes(x.name.toLowerCase()));
    return {mode:'quick', title:name, source_kind:'maps', url, places:[hit?{...hit,confidence:'sure'}:{name, area:areaKey(name)||'', category:'shows', confidence:'sure'}]}; }
  const listText = url ? text.replace(url,'') : text;
  const pl = parseList(listText);
  if(pl.places.length>=2) return {mode:'quick', title: pl.title || (url?'Shared link':'Your list'), source_kind: ig?'ig':/youtu/.test(url)?'yt':url?'link':'list', url, guide: pl.places.length>12, note: pl.places.length>12?'A big list. Pick the places you actually want to go to.':'', places: pl.places};
  const s = text.toLowerCase();
  const found = PLACE_DB.filter(x=>s.includes(x.name.toLowerCase())).map(x=>({...x, confidence:'sure'}));
  const kind = ig ? 'ig' : /youtu/.test(url) ? 'yt' : url ? 'link' : 'list';
  if(found.length) return {mode:'quick', title: kind==='list'?'Your list':'Shared link', source_kind:kind, url, places:found};
  const cat = Object.keys(SYN).find(k=>SYN[k].some(w=>s.includes(w)));
  const area = areaKey(s);
  if(cat || area) return {mode:'quick', title: url?'Shared link':'Your note', source_kind:kind, url, places:[{name:'', area:area||'', category:cat||'shows', confidence:'partial'}]};
  return {mode:'quick', title: url?'Shared link':'Your note', source_kind:kind, url, note: url && MODE==='local' ? 'In this demo version, Yonder reads the example links and lists of place names. For any other link, type the place name below.' : '', places:[]};
}
function placeFromName(name, hint){
  const n = name.trim(); const hit = PLACE_DB.find(x=>x.name.toLowerCase()===n.toLowerCase()) || PLACE_DB.find(x=>x.name.toLowerCase().includes(n.toLowerCase()) && n.length>3);
  if(hit) return {...hit, confidence:'sure'};
  return {name:n, area:(hint&&hint.area)||areaKey(n)||'', category:(hint&&hint.category)||'shows', price:'', confidence:'sure'};
}
function withCoords(p){
  const db = PLACE_DB.find(x=>x.name.toLowerCase()===String(p.name).toLowerCase());
  if(p.lat!=null) return p;
  if(db) return {...p, lat:db.ll[0], lng:db.ll[1], area:p.area||db.area, price:p.price||db.price};
  // Quick lookup for the built-in Mumbai neighbourhoods (only for people around Mumbai). Everywhere else the
  // position is found on OpenStreetMap in the background (see geocodePlaces).
  const c = nearMumbai(homeLL()) ? coordsFor(p.area, p.name) : null; return {...p, lat:c?c[0]:null, lng:c?c[1]:null};
}

/* ================= AI calls ================= */
let secsTimer = null;
function startBusy(kind, gid){
  S.busy = {kind, gid, t:Date.now(), id:Math.random()}; clearInterval(secsTimer);
  secsTimer = setInterval(()=>{ const el=$('#secs'); if(el && S.busy) el.textContent = Math.round((Date.now()-S.busy.t)/1000); }, 1000);
  render(); return S.busy.id;
}
function endBusy(){ S.busy=null; clearInterval(secsTimer); }
const todayText = () => new Date().toLocaleDateString('en-US',{weekday:'long', day:'numeric', month:'long', year:'numeric'});
function prefsForServer(g, p){
  const who = g.is_personal?[me().id]:p.who;
  return {who, when:(WHEN.find(w=>w[0]===p.when)||[])[1], date: ymd(whenToDate(p)), moods:p.moods.map(k=>(MOODS.find(m=>m[0]===k)||[])[1]),
    budget:(budgetOpts().find(b=>b[0]===p.budget)||[])[1]||'not set', areas:p.areas.map(a=>a==='near'?'near most of us':a), source:p.source, memory:p.memory, extra:p.extra,
    // Where the people coming usually are, so the AI picks places in the right city.
    locations:[...new Set(who.map(u=>homeOf(prof(u)).label).filter(Boolean))].slice(0,6)};
}
/* One page of ideas = 3 options. `exclude` keeps later pages from repeating earlier ones. */
async function fetchPlanPage(g, p, exclude){
  let res = await api.ai('plan', {group_id:g.id, today:todayText(), prefs:{...prefsForServer(g,p), exclude}});
  if(res.ok && Array.isArray(res.options) && res.options.length){
    return {mode:'ai', reply:res.reply||'', options:res.options.slice(0,3).map(o=>({...o, place_id: o.place_id && placeById(o.place_id) ? o.place_id : null}))};
  }
  if(res.reason==='limit') toast('You’ve used today’s AI plans. Here are quick picks instead.');
  return quickPlan(g, p, exclude);
}
async function runPlan(g){
  const p = prefsFor(g);
  if(!g.is_personal && !p.who.length){ toast('Pick at least one person who’s coming'); return; }
  const id = startBusy('plan', g.id);
  const page = await fetchPlanPage(g, p, []);
  if(!S.busy || S.busy.id!==id) return;
  endBusy();
  S.results[g.id] = {prefs:JSON.parse(JSON.stringify(p)), pages:[page], page:0, sel:page.options.map((_,i)=>'0-'+i), loading:false};
  render();
}
async function runMore(g){
  const r = S.results[g.id]; if(!r || r.loading || r.pages.length>=3) return;
  r.loading = true; render();
  const exclude = r.pages.flatMap(pg=>pg.options.map(o=>o.name));
  const page = await fetchPlanPage(g, r.prefs, exclude);
  r.loading = false;
  if(S.results[g.id]!==r) return; // cleared while waiting
  page.options = page.options.filter(o=>!exclude.some(n=>n.toLowerCase()===String(o.name).toLowerCase()));
  if(!page.options.length){ toast('No new ideas right now. Try a different mood or area.'); render(); return; }
  r.pages.push(page); r.page = r.pages.length-1; render();
}
// The ideas ticked across all pages, in page order.
const pickedOptions = r => r.sel.slice().sort((a,b)=>{ const [pa,oa]=a.split('-').map(Number), [pb,ob]=b.split('-').map(Number); return pa-pb || oa-ob; }).map(k=>{ const [pi,oi]=k.split('-').map(Number); return r.pages[pi] && r.pages[pi].options[oi]; }).filter(Boolean);
async function runAsk(g, q){
  const id = startBusy('ask', g.id);
  let res = await api.ai('ask', {group_id:g.id, today:todayText(), question:q});
  if(!S.busy || S.busy.id!==id) return;
  if(res.ok){ res = {mode:'ai', reply:res.reply||'', suggestions:(res.suggestions||[]).slice(0,3).map(s=>({...s, place_id: s.place_id && placeById(s.place_id) ? s.place_id : null}))}; }
  else res = quickAsk(g, q);
  endBusy();
  S.drafts['ask-'+g.id] = '';
  await api.sendMessage(g.id, 'ai', q, {q, reply:res.reply, suggestions:res.suggestions, mode:res.mode});
}
async function runExtract(m){
  m.step = 'reading'; render();
  const raw = (m.raw||'').trim(); const url = (raw.match(/https?:\/\/\S+/)||[])[0] || '';
  const text = url ? raw.replace(url,'').trim() : raw;
  let res = await api.ai('extract', {url, text, group_id:curGroup() && curGroup().id, ...(m.video ? {video:{mime:m.video.mime, data:m.video.data}} : {})});
  if(S.modal!==m) return;
  if(!res.ok && m.video){ toast(res.reason==='limit' ? 'You’ve used today’s AI reads. Try again tomorrow, or type the names.' : (res.message || 'Couldn’t watch that video. Try a shorter one.')); m.step='input'; render(); return; }
  if(res.ok && Array.isArray(res.places)){
    res = {mode:'ai', title:res.title||'Shared link', source_kind:res.source_kind || (/instagram/.test(url)?'ig':/youtu/.test(url)?'yt':url?'link':'list'), url, note:res.note||'', watched:res.watched||'', places:res.places, guide: res.places.filter(p=>p.confidence!=='partial').length>12};
    if(!res.places.length && quickExtract(raw).places.length) res = quickExtract(raw);
  } else res = quickExtract(raw);
  m.result = res; m.picks = {}; m.extra = []; m.step = 'review'; render();
}

/* ================= actions ================= */
const DEFAULT_TIME = {bars:'8:00 pm', cafe:'11:00 am', food:'8:30 pm', sunset:'5:30 pm', shows:'8:00 pm', workshop:'11:00 am', shop:'4:00 pm'};
/* "Plan this" from the bucket list: the group already chose the place, so there are no new ideas and no vote: pick who and when, and it lands on the calendar. */
async function lockPlace(m){
  const p = placeById(m.id); if(!p) return; const gg = groupById(p.group_id);
  if(!m.who.length){ toast('Pick at least one person who’s coming'); return; }
  const date = ymd(whenToDate({when:m.when, date:m.date}));
  const o = {place_id:p.id, name:p.name, area:p.area||'', category:p.category, price:p.price||'', why:p.note||'From your bucket list'};
  const time = (m.time||'').trim() || DEFAULT_TIME[p.category] || '7:00 pm';
  const pl = await api.createPlan(gg.id, {title:p.name, options:[o], prefs:{when:m.when, date}, who:m.who.slice(), date, time});
  await api.sendMessage(gg.id, 'plan', 'Plan locked', {plan_id:pl.id});
  S.modal = null;
  await confirmPlan(D.plans.find(x=>x.id===pl.id) || pl);
  S.gid = gg.id; S.view = 'groups'; S.panel = 'calendar'; S.mobilePane = 'panel'; store.set('view','groups');
  const d = new Date(date+'T12:00'); S.calMonth = new Date(d.getFullYear(), d.getMonth(), 1); S.calDay = date;
  toast(`${p.name} is on the calendar: ${fmtDate(date)} at ${time}`); render();
}
async function confirmPlan(pl){
  const t = tally(pl), o = pl.options[t.winner] || pl.options[0];
  let place_id = o.place_id && placeById(o.place_id) ? o.place_id : null;
  if(!place_id){ const [row] = await api.addPlaces(pl.group_id, [withCoords({name:o.name, area:o.area, category:o.category, price:o.price, note:o.why, source_kind:'ai'})]); place_id = row.id; }
  const time = DEFAULT_TIME[o.category] || '7:00 pm';
  await api.updatePlan(pl.id, {status:'confirmed', chosen:t.winner, place_id, title:o.name, time: pl.time || time});
  await api.sendMessage(pl.group_id, 'system', `Plan locked: ${o.name}, ${fmtDate(pl.date)} at ${pl.time||time}. Reminders set for the evening before and 2 hours before.`);
  const bots = (pl.who||[]).filter(id=>BOT_IDS.has(id));
  if(bots.length){ const b = bots[Math.floor(Math.random()*bots.length)]; setTimeout(()=>api.sendMessage(pl.group_id,'text',['Locked in! See you there','yesss finally','Adding it to my calendar now','Can’t wait'][Math.floor(Math.random()*4)],null,b).catch(()=>{}), 1500); }
}
function botVotes(pl){
  const bots = (pl.who||[]).filter(id=>BOT_IDS.has(id) && !votesOf(pl.id).some(v=>v.user_id===id));
  bots.forEach((b,k)=>setTimeout(async ()=>{
    const sc = pl.options.map((o,i)=>({i, s: tasteScore(b,o.category) + (o.place_id && interested(o.place_id).includes(b) ? 1.5 : 0) + Math.random()}));
    const ranking = sc.slice().sort((a,c)=>c.s-a.s).map(x=>x.i);
    const vetoes = sc.filter(x=>x.s < -1).map(x=>x.i).slice(0,1);
    try{ await api.vote(pl, ranking, vetoes, b); }catch(e){ console.warn(e); }
    maybeClose(pl.id);
  }, 900 + k*900));
}
function maybeClose(planId){
  const pl = D.plans.find(p=>p.id===planId); if(!pl || pl.status!=='voting') return;
  const voted = new Set(votesOf(pl.id).map(v=>v.user_id));
  if((pl.who||[]).every(id=>voted.has(id))) confirmPlan(pl).catch(e=>toast(e.message));
}
async function sendToVote(g){
  const res = S.results[g.id]; if(!res) return;
  const options = pickedOptions(res);
  if(options.length<2){ toast('Pick at least 2 ideas to vote on'); return; }
  const p = res.prefs; const date = ymd(whenToDate(p));
  const title = `${p.when==='weeknight'?'Weeknight':fmtDate(date).split(',')[0]} plan`;
  const pl = await api.createPlan(g.id, {title, options, prefs:p, who:p.who, date, time:null});
  await api.sendMessage(g.id, 'plan', 'Vote started', {plan_id:pl.id});
  delete S.results[g.id];
  S.modal = {type:'vote', id:pl.id, rank:[], vetoes:[]}; render();
}
async function pickSolo(g, key){
  const res = S.results[g.id]; const p = res.prefs; const [pi,oi] = String(key).split('-').map(Number); const o = res.pages[pi].options[oi];
  const pl = await api.createPlan(g.id, {title:o.name, options:[o], prefs:p, who:[me().id], date: ymd(whenToDate(p)), time:null});
  await api.vote(pl, [0], []); delete S.results[g.id]; await confirmPlan(D.plans.find(x=>x.id===pl.id)); S.panel='calendar'; render();
}

/* ================= events ================= */
document.addEventListener('pointerdown', e=>{ if(e.target.closest('.btn,.chip,.ptab,.gitem')) buzz(8); });
document.addEventListener('click', async e=>{
  const goEl = e.target.closest('[data-go]');
  if(goEl){ e.preventDefault(); if(S.modal && S.modal.noClose) return; S.modal=null; go(goEl.dataset.go); return; }
  const el = e.target.closest('[data-act]'); if(!el) return;
  const a = el.dataset.act, v = el.dataset.v, id = el.dataset.id;
  if(a==='closeModalBg'){ if(e.target===el && S.modal && !S.modal.noClose){ S.modal=null; render(); } return; }
  const g = S.auth==='ready' ? curGroup() : null;
  try{ switch(a){
    case 'authTab': S.authTab=v; S.authErr=''; render(); break;
    case 'closeModal': S.modal=null; render(); break;
    case 'modal':
      if(v==='vote'){ const pl=D.plans.find(p=>p.id===id); const mine=votesOf(id).find(x=>x.user_id===me().id); S.modal={type:'vote', id, rank: mine?mine.ranking.slice():[], vetoes: mine?(mine.vetoes||[]).slice():[]}; }
      else S.modal = {type:v, id}; render(); break;
    case 'openGroup': openGroup(id, el.dataset.panel); break;
    case 'panel': S.panel=v; store.set('panel',v); if(S.view!=='groups') S.view='groups'; S.mobilePane='panel'; render(); break;
    case 'mpane': S.mobilePane=v; render(); break;
    case 'closeHint': S.hintClosed[id]=true; store.set('hints',S.hintClosed); render(); break;
    case 'openPlace': { const p=placeById(id); if(!p) return; S.gid=p.group_id; S.view='groups'; S.panel='bucket'; S.sel=id; S.cat='all'; S.scrollToSel=true; S.mobilePane='panel'; store.set('view','groups'); render(); break; }
    case 'selPlace': S.sel = S.sel===id?null:id; render(); break;
    case 'bigMap': S.spot=null; S.modal={type:'bigMap'}; render(); break;
    case 'mapHome': mapJump('home'); break;
    case 'mapAll': mapJump('all'); break;
    case 'mapRandom': mapJump('random'); break;
    case 'spotAdd': { const sp = S.spot; if(!sp || !g) break; await api.addPlaces(g.id, [{name:sp.name, area:sp.city, category:sp.category, price:'', note:sp.note, lat:sp.lat, lng:sp.lng, source_kind:'manual'}]); toast(`Added ${sp.name} to ${g.name}`); showSel(); if(mapMgr.big && mapMgr.big.map) drawPins(mapMgr.big); break; }
    case 'cat': S.cat=v; render(); break;
    case 'interest': await api.toggleInterest(placeById(id)); break;
    case 'removePlace': { const p=placeById(id); if(p && confirmInline(el, 'Remove '+p.name+'?')){ await api.removePlace(id); S.sel=null; toast('Removed '+p.name); } break; }
    case 'joinYes': { const m=S.modal; try{ const jg = await api.joinGroup(m.code); S.modal=null; S.gid=jg.id; S.view='groups'; toast(m.info && m.info.is_member ? 'Opened '+jg.name : 'You joined '+jg.name); }catch(err){ m.err = err.message; render(); break; } continueAfterLogin(); break; }
    case 'joinNo': S.modal=null; toast('No problem. You can still join later with the same link or code.'); continueAfterLogin(); break;
    case 'planThis': { const p0=placeById(id); if(!p0) break; const g0=groupById(p0.group_id);
      S.modal = {type:'planPlace', id, who: g0.is_personal ? [me().id] : membersOf(g0.id), when:'sat', date:'', time: DEFAULT_TIME[p0.category] || '7:00 pm'}; render(); break; }
    case 'ppWho': { const m=S.modal, i=m.who.indexOf(v); if(i>=0) m.who.splice(i,1); else m.who.push(v); render(); break; }
    case 'ppWhen': S.modal.when = v; render(); break;
    case 'calNav': S.calMonth = new Date(S.calMonth.getFullYear(), S.calMonth.getMonth()+(+v), 1); render(); break;
    case 'calDay': S.calDay = v||null; render(); break;
    case 'pref': { const p=prefsFor(g); const f=el.dataset.f; if(el.dataset.multi==='1'){ const arr=p[f]; const i=arr.indexOf(v); if(i>=0) arr.splice(i,1); else arr.push(v);
        if(f==='areas'){ if(v==='near' && arr.includes('near')) p.areas=['near']; else if(v!=='near') p.areas=p.areas.filter(x=>x!=='near'); } }
      else p[f] = (p[f]===v && f!=='when' && f!=='source') ? '' : v; render(); break; }
    case 'clearResults': delete S.results[g.id]; render(); break;
    case 'stopAI': endBusy(); render(); break;
    case 'sendVote': await sendToVote(g); break;
    case 'pickSolo': await pickSolo(g, el.dataset.k); break;
    case 'optPick': { const r=S.results[g.id]; const k=el.dataset.k; const i=r.sel.indexOf(k); if(i>=0) r.sel.splice(i,1); else if(r.sel.length>=MAX_VOTE) toast(`Up to ${MAX_VOTE} ideas per vote. Remove one first.`); else r.sel.push(k); render(); break; }
    case 'resPage': S.results[g.id].page=+v; render(); break;
    case 'moreIdeas': await runMore(g); break;
    case 'addSugg': { const m=D.messages.find(x=>x.id===el.dataset.mid); const s=m.data.suggestions[+el.dataset.i]; await api.addPlaces(m.group_id,[withCoords({name:s.name, area:s.area, category:s.category, price:s.price, note:s.why, source_kind:'ai'})]); toast('Added '+s.name+' to the bucket list'); break; }
    case 'vRank': { const m=S.modal, i=+el.dataset.i; const k=m.rank.indexOf(i); if(k>=0) m.rank.splice(k,1); else m.rank.push(i); render(); break; }
    case 'vVeto': { const m=S.modal, i=+el.dataset.i; const k=m.vetoes.indexOf(i); if(k>=0) m.vetoes.splice(k,1); else { m.vetoes.push(i); m.rank=m.rank.filter(x=>x!==i); } render(); break; }
    case 'vReset': S.modal.rank=[]; S.modal.vetoes=[]; render(); break;
    case 'vSubmit': { const m=S.modal, pl=D.plans.find(p=>p.id===m.id); const rest=[...pl.options.keys()].filter(i=>!m.rank.includes(i)&&!m.vetoes.includes(i)); await api.vote(pl, [...m.rank, ...rest], m.vetoes); S.modal=null; buzz([10,30,10]); toast('Vote saved'); render(); botVotes(pl); maybeClose(pl.id); break; }
    case 'closeVote': { const pl=D.plans.find(p=>p.id===id); await confirmPlan(pl); break; }
    case 'didGo': S.modal={type:'rate', id, step: v==='yes'?'stars':'ask', stars:0}; if(v==='no'){ const pl=D.plans.find(p=>p.id===id); await api.rate(placeById(pl.place_id)||{id:pl.place_id, group_id:pl.group_id}, false, null); S.modal=null; toast('No worries. It stays on your bucket list.'); } render(); break;
    case 'didGoYes': S.modal.step='stars'; render(); break;
    case 'didGoNo': { const pl=D.plans.find(p=>p.id===S.modal.id); await api.rate(placeById(pl.place_id)||{id:pl.place_id, group_id:pl.group_id}, false, null); S.modal=null; toast('No worries. It stays on your bucket list.'); render(); break; }
    case 'star': S.modal.stars=+v; buzz(10); render(); break;
    case 'rateSave': { const pl=D.plans.find(p=>p.id===S.modal.id); const p=placeById(pl.place_id); const stars=S.modal.stars; await api.rate(p, true, stars);
      const gg=groupById(pl.group_id); if(gg && !gg.is_personal){ const line=`${stars>=4?'Loved':stars>=3?'Liked':'Didn’t love'} ${p.name} (${stars}/5)`; await api.updateGroup(gg.id, {memory:[...(gg.memory||[]).filter(x=>!x.includes(p.name)), line]}); }
      S.modal=null; toast('Thanks! Saved to the group’s memory, so future plans get better.'); render(); break; }
    case 'openSave': S.modal={type:'save', step:'input', raw:'', groups:[curGroup().id], picks:{}, extra:[]}; render(); setTimeout(()=>{ const t=$('#sv-in'); t&&t.focus(); },30); break;
    case 'tryLink': S.modal.raw=v; runExtract(S.modal); break;
    case 'videoClear': S.modal.video=null; render(); break;
    case 'pickAll': { const m=S.modal; const t=pickTargets(m); const all=t.every(i=>isPicked(m,i)); t.forEach(i=>m.picks[i]=!all); render(); break; }
    case 'pickSection': { const m=S.modal; const sure=m.result.places.filter(p=>p.confidence!=='partial'); const idx=sure.map((p,i)=>i).filter(i=>(sure[i].section||'')===v); const all=idx.every(i=>isPicked(m,i)); idx.forEach(i=>m.picks[i]=!all); render(); break; }
    case 'saveBack': S.modal.step='input'; render(); break;
    case 'saveGroup': { const m=S.modal; const i=m.groups.indexOf(v); if(i>=0) m.groups.splice(i,1); else m.groups.push(v); render(); break; }
    case 'saveConfirm': await saveConfirm(); break;
    case 'ngColor': S.modal.color=v; render(); break;
    case 'copy': try{ await navigator.clipboard.writeText(v); toast('Link copied'); }catch(err){ toast('Copy didn’t work. Select the link and copy it.'); } break;
    case 'leave': { const gg=groupById(id); if(confirmInline(el,'Leave '+gg.name+'?')){ await api.leaveGroup(id); toast('You left '+gg.name); render(); } break; }
    case 'color': await api.saveProfile({color:v}); render(); break;
    case 'taste': wheelAnswer(v); break;
    case 'swipeNav': wheelGo(+v, true); break;
    case 'swipeGo': wheelGo(+v); break;
    case 'pAnswer': phoneAnswer(v); break;
    case 'pUndo': phoneUndo(); break;
    case 'swipeAgain': S.swipeIdx=0; S.swipeAnim=true; render(); break;
    case 'signOut': if(confirmInline(el, me().is_guest?'Sure? A guest session can’t be recovered.':'Log out?')){ await api.signOut(); S.auth='signedOut'; S.view='home'; render(); } break;
    case 'geoPick': { const i=+el.dataset.i; const G=S.geo; G.pick = i===-1 ? {label:G.q.trim(), ll:null, cc:'', i:-1} : {...G.results[i], i}; render(); break; }
    case 'geoLocate': geoLocate(); break;
    case 'saveArea': { if(!S.geo.pick) break; await api.saveProfile({home_area:encodeHome(S.geo.pick)}); resetGeo(); toast('Area saved'); render(); break; }
    case 'obDone': { const home = v==='skip' ? '' : encodeHome(S.geo.pick); await api.saveProfile({home_area:home||me().home_area||'', onboarded:true}); resetGeo(); S.modal={type:'welcome', noClose:true}; render(); break; }
    case 'startTour': S.modal=null; await api.saveProfile({tour_done:true}).catch(()=>{}); tour.start(); break;
    case 'skipTour': S.modal=null; await api.saveProfile({tour_done:true}).catch(()=>{}); render(); toast('Replay the tour any time from “Tour” at the top.'); break;
    case 'tour': S.modal=null; tour.start(); break;
    case 'tourNext': tour.next(); break;
    case 'tourBack': tour.back(); break;
    case 'tourEnd': tour.end(); break;
  } }catch(err){ console.error(err); toast('Something went wrong: '+(err.message||err)); }
});
function confirmInline(el, msg){
  if(el.dataset.armed==='1') return true;
  el.dataset.armed='1'; const old=el.innerHTML; el.innerHTML=esc(msg)+' Tap again'; el.classList.add('armed');
  setTimeout(()=>{ if(el.isConnected){ el.dataset.armed=''; el.innerHTML=old; el.classList.remove('armed'); } }, 3500);
  return false;
}
document.addEventListener('change', async e=>{
  const el = e.target;
  if(el.dataset.actChange==='saveIdea' && el.value){ const x = (S.ideaPool||[]).concat(S.nearPool||[]).find(p=>p.name===el.dataset.name); if(!x) return; const gid=el.value; await api.addPlaces(gid,[withCoords({...x, note:x.note||x.why||'', lat:x.ll?x.ll[0]:null, lng:x.ll?x.ll[1]:null, source_kind:'ai'})]); toast(`Saved ${x.name} to ${groupById(gid).name}`); }
  if(el.dataset.actChange==='mgroup'){ S.gid=el.value; store.set('gid',el.value); S.stick=true; S.sel=null; render(); }
  if(el.dataset.actChange==='videoPick' && S.modal){ const f = el.files && el.files[0]; if(f){ try{ toast('Loading the video…'); S.modal.video = await readVideo(f); if(S.modal.step==='review') runExtract(S.modal); else render(); }catch(err){ toast(err.message); } } el.value=''; }
  if(el.dataset.actChange==='pick'){ S.modal.picks[+el.dataset.i] = el.checked; render(); }
  if(el.id==='pf-date'){ prefsFor(curGroup()).date = el.value; }
  if(el.id==='pp-date' && S.modal) S.modal.date = el.value;
});
document.addEventListener('input', e=>{
  const el = e.target;
  if(el.dataset.draft) S.drafts[el.dataset.draft] = el.value;
  if(el.dataset.pref) prefsFor(curGroup())[el.dataset.pref] = el.value;
  if(el.id==='sv-in' && S.modal) S.modal.raw = el.value;
  if(el.id==='jn-code' && S.modal) S.modal.code = el.value;
  if(el.id==='geo-q') S.geo.q = el.value;
  if(el.id==='pp-date' && S.modal) S.modal.date = el.value;
  if(el.id==='pp-time' && S.modal) S.modal.time = el.value;
  if(el.id==='gd-filter' && S.modal){ S.modal.filter = el.value; render(); }
});
document.addEventListener('scroll', e=>{ if(e.target && e.target.id==='msgs'){ const m=e.target; S.stick = m.scrollHeight - m.scrollTop - m.clientHeight < 40; } }, true);
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ if(tour.on){ tour.end(); return; } if(S.modal && !S.modal.noClose){ S.modal=null; render(); } }
  if(S.view==='swipe' && !S.modal && !isPhone() && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||'')){
    if(e.key==='ArrowRight') wheelGo(1,true);
    if(e.key==='ArrowLeft') wheelGo(-1,true);
    if(e.key==='ArrowUp'){ e.preventDefault(); wheelAnswer('like'); }
    if(e.key==='ArrowDown'){ e.preventDefault(); wheelAnswer('nope'); }
  }
});
document.addEventListener('submit', async e=>{
  e.preventDefault(); const f = e.target.dataset.form; const g = S.auth==='ready' ? curGroup() : null;
  const btn = e.target.querySelector('[type=submit]');
  try{
    if(f==='guest'){ btn.disabled=true; S.auth = await api.signInGuest($('#g-name').value); await afterLogin(); }
    else if(f==='login'){ btn.disabled=true; S.auth = await api.signIn($('#a-email').value.trim(), $('#a-pw').value); await afterLogin(); }
    else if(f==='signup'){ btn.disabled=true; const r = await api.signUp($('#a-email').value.trim(), $('#a-pw').value, $('#a-name').value.trim()); if(r==='checkEmail'){ S.authErr='Check your inbox to confirm your email, then log in.'; S.authTab='login'; render(); return; } S.auth=r; await afterLogin(); }
    else if(f==='chat'){ const t = (S.drafts['chat-'+g.id]||'').trim(); if(!t) return;
      if(/https?:\/\//.test(t)){ S.drafts['chat-'+g.id]=''; S.modal={type:'save', step:'input', raw:t, groups:[g.id], picks:{}, extra:[]}; runExtract(S.modal); return; }
      S.drafts['chat-'+g.id]=''; S.stick=true; await api.sendMessage(g.id,'text',t); }
    else if(f==='plan'){ await runPlan(g); }
    else if(f==='ask'){ const q=(S.drafts['ask-'+g.id]||'').trim(); if(q) await runAsk(g,q); }
    else if(f==='profile'){ await api.saveProfile({name:$('#pf-name').value.trim()||me().name}); toast('Saved'); render(); }
    else if(f==='planPlace'){ await lockPlace(S.modal); }
    else if(f==='geoSearch'){ await geoSearch(); }
    else if(f==='mapSearch'){ await mapSearch(); }
    else if(f==='newGroup'){ const name=$('#ng-name').value.trim(); if(!name) return; const ng = await api.createGroup(name, S.modal.color||COLORS[0]); S.modal={type:'invite'}; S.gid=ng.id; S.view='groups'; render(); }
    else if(f==='join'){ try{ const jg = await api.joinGroup($('#jn-code').value); S.modal=null; openGroup(jg.id); toast('You joined '+jg.name); }catch(err){ S.modal.err = err.message; render(); } }
    else if(f==='saveRead'){ const m=S.modal; m.raw=$('#sv-in').value; if(m.raw.trim() || m.video) runExtract(m); }
    else if(f==='whichPlace'){ const n=$('#wp-name').value.trim(); if(!n) return; const m=S.modal; const hint=(m.result.places||[]).find(p=>p.confidence==='partial'); m.extra.push(placeFromName(n, hint)); render(); setTimeout(()=>{ const i=$('#wp-name'); i&&i.focus(); },20); }
    else if(f==='editPlan'){ await api.updatePlan(S.modal.id, {date:$('#ep-date').value, time:$('#ep-time').value}); S.modal=null; toast('Date updated'); render(); }
  }catch(err){ console.error(err); if(S.auth!=='ready'){ S.authErr = err.message || String(err); render(); } else toast(err.message||String(err)); if(btn) btn.disabled=false; }
});
async function saveConfirm(){
  const m = S.modal, r = m.result;
  const sure = r.places.filter(p=>p.confidence!=='partial').filter((p,i)=>isPicked(m,i));
  const chosen = [...sure, ...(m.extra||[])].map(withCoords);
  if(!chosen.length || !m.groups.length) return;
  for(const gid of m.groups){
    const have = new Set(placesOf(gid).map(p=>p.name.toLowerCase())); const fresh = chosen.filter(p=>!have.has(p.name.toLowerCase())); if(!fresh.length) continue;
    const rows = await api.addPlaces(gid, fresh.map(p=>({...p, source_kind:r.source_kind==='maps'?'manual':(r.source_kind||'link'), source_url:r.url||null})));
    await api.sendMessage(gid, 'share', '', {title:r.title||'Shared link', source_kind:r.source_kind||'link', url:r.url||null, place_ids:rows.map(x=>x.id)});
  }
  const n = chosen.length; S.modal=null; S.stick=true;
  toast(`Saved ${n} place${n===1?'':'s'} to ${m.groups.length===1?groupById(m.groups[0]).name:m.groups.length+' groups'}`);
  if(m.groups.length===1){ S.gid=m.groups[0]; }
  S.view='groups'; render();
}
async function afterLogin(){
  S.authErr=''; applyRoute();
  // An invite link never adds anyone by itself: show who is inviting and ask first.
  const code = S.joinCode; S.joinCode = null; try{ sessionStorage.removeItem('yonder-join'); }catch(e){}
  if(code){
    const m = S.modal = {type:'joinConfirm', code, info:undefined, loading:true, noClose:true}; render();
    const info = await api.peekGroup(code);
    if(S.modal===m){ m.info = info; m.loading = false; render(); }
    return;
  }
  continueAfterLogin();
}
function continueAfterLogin(){
  if(!me().onboarded){ resetGeo(); S.modal = {type:'onboard', noClose:true}; }
  else if(!me().tour_done) S.modal = {type:'welcome', noClose:true};
  if(sharedIn){ const g = curGroup(); S.modal = {type:'save', step:'input', raw:[sharedIn.text, sharedIn.url].filter(Boolean).join(' '), groups:[g.id], picks:{}, extra:[]}; render(); runExtract(S.modal); return; }
  render();
}
function joinConfirmModal(m){
  const i = m.info;
  if(m.loading) return `<h2>Checking the invite…</h2><div class="thinking-card"><span class="spinner"></span><div><b>One moment</b></div></div>`;
  if(i===null) return `<h2>That invite doesn’t match a group</h2><p class="muted">The link may be old, or the group may have been removed. Ask your friend to send it again.</p>
    <button class="btn primary xl" data-act="joinNo">Continue</button>`;
  const name = i ? esc(i.name) : 'this group';
  if(i && i.is_member) return `<h2>You’re already in ${name}</h2><div class="row gap"><button class="btn primary xl" data-act="joinYes">Open ${name}</button><button class="btn xl ghost" data-act="joinNo">Not now</button></div>`;
  return `<h2>Join ${name}?</h2>
    <p class="muted">${i ? `${i.members} ${i.members===1?'person is':'people are'} in this group. ` : `You’ve been invited with the code <b>${esc(m.code)}</b>. `}If you join, everyone in the group can see your name and the places you save to it.</p>
    ${m.err?`<p class="err">${esc(m.err)}</p>`:''}
    <div class="row gap wrap"><button class="btn primary xl" data-act="joinYes">${ic('users')} Join ${name}</button><button class="btn xl ghost" data-act="joinNo">Not now</button></div>`;
}

/* ================= WALKTHROUGH ================= */
const TOUR = [
  {name:'Home', view:'home', sel:'[data-tour="home-plan"]', title:'Your starting point', text:'Start a plan or jump into a group. Below you’ll see what’s coming up and saved places near you.'},
  {name:'Groups', view:'groups', panel:'plan', sel:'.ptabs, .mswitch .seg', title:'Where the planning happens', bullets:['Chat: talk and drop reels to fill the bucket list','Plan with AI: ideas for the group to vote on','Bucket list: saved places on a zoomable map','Calendar: plans that won, rate them after you go']},
  {name:'Taste swipe', view:'swipe', sel:'[data-tour="swipe"]', title:'Teach it your taste', text:'Swipe what you love and what you don’t. Plans and ideas get more “you”.'},
  {name:'Profile', view:'profile', sel:'[data-tour="profile"]', title:'You and your area', text:'Set your name, colour and where you usually are. See places you’ve rated and replay this tour.'},
];
const tour = {
  on:false, i:0,
  start(){ this.on=true; this.i=0; this.show(); },
  show(){
    const st = TOUR[this.i];
    S.view = st.view; if(st.panel){ S.panel = st.panel; } if(st.view==='groups'){ const bb = sharedGroups().find(x=>x.is_demo) || sharedGroups()[0]; if(bb) S.gid=bb.id; S.mobilePane = st.panel?'panel':'chat'; }
    render();
  },
  place(){
    let ov = $('#tour'); if(!ov){ ov = document.createElement('div'); ov.id='tour'; document.body.appendChild(ov); }
    const st = TOUR[this.i]; const target = [...document.querySelectorAll(st.sel)].find(el=>{ const b=el.getBoundingClientRect(); return b.width>0 && b.height>0; }) || null;
    const r = target ? target.getBoundingClientRect() : {left:innerWidth/2-100, top:innerHeight/2-40, width:200, height:80};
    if(target && (r.top<0 || r.bottom>innerHeight)) { target.scrollIntoView({block:'center'}); }
    const r2 = target ? target.getBoundingClientRect() : r; const pad = 8;
    const hole = {x:r2.left-pad, y:r2.top-pad, w:r2.width+pad*2, h:Math.min(r2.height+pad*2, innerHeight*0.7)};
    const bw = Math.min(340, innerWidth-24);
    let bx = Math.min(Math.max(12, hole.x), innerWidth-bw-12), by = hole.y+hole.h+14;
    if(by + 210 > innerHeight) by = Math.max(12, hole.y - 224);
    if(hole.h > innerHeight*0.55){ bx = Math.min(innerWidth-bw-12, Math.max(12, hole.x + hole.w/2 - bw/2)); by = Math.max(12, hole.y + 24); }
    ov.innerHTML = `<div class="tour-hole" style="left:${hole.x}px;top:${hole.y}px;width:${hole.w}px;height:${hole.h}px"></div>
      <div class="tour-bubble" style="left:${bx}px;top:${by}px;width:${bw}px" role="dialog" aria-label="Walkthrough">
        <span class="eyebrow">${esc(st.name)}</span><h3>${esc(st.title)}</h3>${st.bullets ? `<ul class="tour-list">${st.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>` : `<p>${esc(st.text)}</p>`}
        <div class="tour-dots">${TOUR.map((_,k)=>`<i class="${k===this.i?'on':''}"></i>`).join('')}</div>
        <div class="row gap">${this.i>0?'<button class="btn sm" data-act="tourBack">Back</button>':''}<span class="spacer"></span><button class="btn sm ghost" data-act="tourEnd">Skip</button><button class="btn sm yellow" data-act="tourNext">${this.i===TOUR.length-1?'Let’s go':'Next'}</button></div>
      </div>`;
  },
  next(){ if(this.i>=TOUR.length-1) return this.end(); this.i++; this.show(); },
  back(){ if(this.i>0){ this.i--; this.show(); } },
  end(){ this.on=false; const ov=$('#tour'); if(ov) ov.remove(); S.view='home'; store.set('view','home'); S.modal=null; render(); window.scrollTo(0,0); },
};
window.addEventListener('resize', ()=>{ if(tour.on) tour.place(); else if(S.view==='swipe') schedule(); });

/* ================= boot ================= */
(async function boot(){
  render();
  try{ S.auth = await api.init(); }catch(e){ console.error(e); S.auth='signedOut'; S.authErr='Couldn’t reach the Yonder server. '+(e.message||''); }
  S.booted = true;
  if(S.auth==='ready') await afterLogin(); else render();
  if(!(window.YONDER_CONFIG||{}).bundle && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
})();
