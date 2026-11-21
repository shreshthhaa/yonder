/* Yonder — reference data, demo seed and the data layer (local demo or Supabase). */
(function(){
'use strict';

const CFG = window.YONDER_CONFIG || {};
const MODE = (CFG.supabaseUrl && CFG.supabaseAnonKey && window.supabase && window.supabase.createClient) ? 'cloud' : 'local';

/* ---------------- reference data ---------------- */
const COLORS = ['#FF5CA8','#2B44FF','#FFD60A','#111111','#9AA8FF','#FF9CCB'];

// Demo friends (bots). Same fixed ids are created by supabase/schema.sql.
const BOTS = {
  riya:  {id:'00000000-0000-4000-8000-000000000001', name:'Riya',  color:'#FF5CA8', home_area:'Lower Parel', taste:{like:['cafes','pottery','standup','sunset'], nope:['clubs','treks']}},
  kabir: {id:'00000000-0000-4000-8000-000000000002', name:'Kabir', color:'#2B44FF', home_area:'Bandra', taste:{like:['speakeasy','livemusic','rooftop','streetfood'], nope:['heritage']}},
  sana:  {id:'00000000-0000-4000-8000-000000000003', name:'Sana',  color:'#FFD60A', home_area:'Khar', taste:{like:['cafes','dance','flea','rooftop'], nope:['clubs']}},
  aman:  {id:'00000000-0000-4000-8000-000000000004', name:'Aman',  color:'#9AA8FF', home_area:'Andheri', taste:{like:['streetfood','heritage','boardgames'], nope:['speakeasy']}},
  dev:   {id:'00000000-0000-4000-8000-000000000005', name:'Dev',   color:'#111111', home_area:'Powai', taste:{like:['boardgames','livemusic','pottery'], nope:['clubs']}},
  meera: {id:'00000000-0000-4000-8000-000000000006', name:'Meera', color:'#FF9CCB', home_area:'Dadar', taste:{like:['pottery','artcraft','cafes'], nope:['streetfood']}},
};
const BOT_IDS = new Set(Object.values(BOTS).map(b=>b.id));

const CATS = {
  bars:     {label:'Bars & pubs',      short:'Bars',      color:'#FF5CA8', ink:'#111', icon:'glass'},
  cafe:     {label:'Cafés',            short:'Cafés',     color:'#FFD60A', ink:'#111', icon:'cup'},
  food:     {label:'Food',             short:'Food',      color:'#2B44FF', ink:'#fff', icon:'bowl'},
  sunset:   {label:'Outdoors & sunsets',short:'Outdoors', color:'#FFFFFF', ink:'#111', icon:'sun'},
  shows:    {label:'Comedy, gigs & shows',short:'Shows',  color:'#111111', ink:'#fff', icon:'mic'},
  workshop: {label:'Workshops',        short:'Workshops', color:'#9AA8FF', ink:'#111', icon:'vase'},
  shop:     {label:'Shopping',         short:'Shopping',  color:'#FF9CCB', ink:'#111', icon:'bag'},
};

const AREAS = {
  'Colaba':[18.915,72.828],'Fort':[18.932,72.835],'Kala Ghoda':[18.929,72.832],'Churchgate':[18.935,72.826],'Marine Drive':[18.943,72.823],
  'Nariman Point':[18.925,72.822],'Girgaon':[18.955,72.818],'Malabar Hill':[18.955,72.803],'Tardeo':[18.970,72.815],'Mahalaxmi':[18.983,72.822],
  'Worli':[19.008,72.817],'Lower Parel':[18.998,72.828],'Prabhadevi':[19.015,72.829],'Dadar':[19.019,72.843],'Matunga':[19.027,72.855],
  'Mahim':[19.040,72.840],'Bandra':[19.058,72.832],'Khar':[19.071,72.837],'Santacruz':[19.082,72.840],'Juhu':[19.102,72.828],
  'Vile Parle':[19.100,72.845],'Andheri':[19.115,72.850],'Powai':[19.118,72.906],'Mohammed Ali Road':[18.958,72.832],
};
function areaKey(a){
  if(!a) return null; const s = String(a).toLowerCase();
  // "Fort Lauderdale, USA" is not Mumbai's Fort: if a city is given and it isn't Mumbai, there is no match.
  const rest = s.split(',').slice(1).join(','); if(rest && !/mumbai|bombay|maharashtra/.test(rest)) return null;
  let best=null; for(const k of Object.keys(AREAS)){ if(new RegExp('\\b'+k.toLowerCase()+'\\b').test(s) && (!best || k.length>best.length)) best=k; }
  return best;
}
function coordsFor(area, seed){
  const k = areaKey(area); if(!k) return null;
  const [la,ln] = AREAS[k]; let h=0; const s=String(seed||area); for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0;
  return [la + ((h%100)/100-0.5)*0.006, ln + (((h>>7)%100)/100-0.5)*0.006];
}

// Taste cards: art = poster colours + pattern + icon (no emoji).
const TASTE_CARDS = [
  {id:'pottery',   label:'Pottery & clay',        cat:'workshop', d:'Get your hands muddy at a weekend wheel class.', art:{bg:'#9AA8FF', fg:'#111', pat:'dots',   icon:'vase'}},
  {id:'standup',   label:'Stand-up comedy',       cat:'shows',    d:'Open mics and big-name specials.',               art:{bg:'#111111', fg:'#FFD60A', pat:'rays', icon:'mic'}},
  {id:'speakeasy', label:'Speakeasy bars',        cat:'bars',     d:'Hidden doors, secret menus.',                    art:{bg:'#FF5CA8', fg:'#111', pat:'stripes', icon:'glass'}},
  {id:'sunset',    label:'Sunset spots',          cat:'sunset',   d:'Sea-facing promenades and rooftops at golden hour.', art:{bg:'#FFD60A', fg:'#FF5CA8', pat:'waves', icon:'sun'}},
  {id:'streetfood',label:'Street food crawls',    cat:'food',     d:'Night markets and late-night street food.',      art:{bg:'#2B44FF', fg:'#FFD60A', pat:'zigzag', icon:'bowl'}},
  {id:'artcraft',  label:'Art & craft workshops', cat:'workshop', d:'Block printing, resin art, candle making.',       art:{bg:'#FF9CCB', fg:'#2B44FF', pat:'checker', icon:'palette'}},
  {id:'livemusic', label:'Live music gigs',       cat:'shows',    d:'Indie bands and jazz nights.',                   art:{bg:'#2B44FF', fg:'#FF5CA8', pat:'rays', icon:'note'}},
  {id:'boardgames',label:'Board-game cafés',      cat:'cafe',     d:'Coffee, snacks and Catan till late.',            art:{bg:'#FFD60A', fg:'#2B44FF', pat:'checker', icon:'dice'}},
  {id:'treks',     label:'Day treks',             cat:'sunset',   d:'Hills, trails and day trips out of town.',       art:{bg:'#FFFFFF', fg:'#2B44FF', pat:'zigzag', icon:'mountain'}},
  {id:'clubs',     label:'Clubbing',              cat:'bars',     d:'Big DJs, late nights.',                          art:{bg:'#111111', fg:'#FF5CA8', pat:'dots', icon:'disco'}},
  {id:'dance',     label:'Dance workshops',       cat:'workshop', d:'Bollywood, salsa, hip-hop drop-ins.',            art:{bg:'#FF5CA8', fg:'#FFD60A', pat:'waves', icon:'dance'}},
  {id:'cafes',     label:'Café hopping',          cat:'cafe',     d:'Specialty coffee and bakeries.',                 art:{bg:'#FFD60A', fg:'#111', pat:'stripes', icon:'cup'}},
  {id:'heritage',  label:'Heritage walks',        cat:'shows',    d:'Old towns, landmarks and local history.',        art:{bg:'#9AA8FF', fg:'#FFFFFF', pat:'stripes', icon:'column'}},
  {id:'rooftop',   label:'Rooftop hangouts',      cat:'bars',     d:'City views, mocktails and music.',               art:{bg:'#2B44FF', fg:'#FFFFFF', pat:'dots', icon:'skyline'}},
  {id:'flea',      label:'Flea markets',          cat:'shop',     d:'Pop-ups, thrift and makers’ markets.',           art:{bg:'#FF9CCB', fg:'#111', pat:'zigzag', icon:'bag'}},
  {id:'shopping',  label:'Boutiques & shopping',  cat:'shop',     d:'Indie stores, concept shops and shopping streets.', art:{bg:'#FFD60A', fg:'#FF5CA8', pat:'dots', icon:'bag'}},
];
const TASTE_BY_ID = Object.fromEntries(TASTE_CARDS.map(t=>[t.id,t]));

// Well-known Mumbai places used by demo mode (link reading without a server, and quick picks).
const PLACE_DB = [
  {name:'PCO', area:'Lower Parel', category:'bars', price:'~₹2,500 for two', note:'Speakeasy behind a hidden door', ll:[18.9988,72.8268]},
  {name:'Slink & Bardot', area:'Worli', category:'bars', price:'~₹3,000 for two', note:'Moody bar, opens in the evening', ll:[18.9915,72.8228]},
  {name:'Ocho', area:'Santacruz', category:'bars', price:'~₹3,000 for two', note:'Good for celebrations', ll:[19.0822,72.8372]},
  {name:'Charlee', area:'Santacruz', category:'bars', price:'~₹2,800 for two', note:'Small, cosy cocktail bar', ll:[19.0800,72.8395]},
  {name:'Harbour Bar', area:'Colaba', category:'bars', price:'~₹4,000 for two', note:'Old-school bar at the Taj', ll:[18.9217,72.8331]},
  {name:'AER', area:'Worli', category:'sunset', price:'~₹4,000 for two', note:'Rooftop with sunset views', ll:[18.9946,72.8195]},
  {name:'Dadar Chowpatty', area:'Dadar', category:'sunset', price:'Free', note:'Beach at sunset', ll:[19.0215,72.8380]},
  {name:'Sea Link promenade', area:'Bandra', category:'sunset', price:'Free', note:'Walk under the Bandra-Worli Sea Link', ll:[19.0440,72.8190]},
  {name:'Bandra Fort', area:'Bandra', category:'sunset', price:'Free', note:'Best around sunset', ll:[19.0418,72.8190]},
  {name:'Carter Road promenade', area:'Bandra', category:'sunset', price:'Free', note:'Sea-facing walk and food stalls', ll:[19.0660,72.8215]},
  {name:'Marine Drive', area:'Marine Drive', category:'sunset', price:'Free', note:'The classic sea-face walk', ll:[18.9430,72.8230]},
  {name:'Juhu Beach', area:'Juhu', category:'sunset', price:'Free', note:'Beach, sunset and chaat', ll:[19.0990,72.8265]},
  {name:'Subko', area:'Bandra', category:'cafe', price:'~₹800 for two', note:'Specialty coffee and bakes', ll:[19.0645,72.8290]},
  {name:'Kala Ghoda Café', area:'Kala Ghoda', category:'cafe', price:'~₹1,200 for two', note:'All-day café near the galleries', ll:[18.9290,72.8322]},
  {name:'Candies', area:'Bandra', category:'cafe', price:'~₹900 for two', note:'Multi-level café, big menu', ll:[19.0560,72.8262]},
  {name:'Prithvi Café', area:'Juhu', category:'cafe', price:'~₹700 for two', note:'Café at Prithvi Theatre', ll:[19.1060,72.8270]},
  {name:'Leopold Café', area:'Colaba', category:'cafe', price:'~₹1,500 for two', note:'Iconic Colaba café', ll:[18.9226,72.8318]},
  {name:'Kitab Khana', area:'Fort', category:'cafe', price:'~₹800 for two', note:'Bookshop with a café inside', ll:[18.9327,72.8340]},
  {name:'Bademiya', area:'Colaba', category:'food', price:'~₹600 for two', note:'Late-night kebabs and rolls', ll:[18.9232,72.8326]},
  {name:'Britannia & Co.', area:'Fort', category:'food', price:'~₹1,200 for two', note:'Parsi café, berry pulao', ll:[18.9347,72.8389]},
  {name:'Café Madras', area:'Matunga', category:'food', price:'~₹500 for two', note:'South Indian breakfast classic', ll:[19.0275,72.8555]},
  {name:'Mohammed Ali Road food walk', area:'Mohammed Ali Road', category:'food', price:'~₹600 per person', note:'Best in Ramzan evenings', ll:[18.9580,72.8320]},
  {name:'The Habitat', area:'Khar', category:'shows', price:'~₹500 per ticket', note:'Stand-up and open mics', ll:[19.0702,72.8340]},
  {name:'NCPA', area:'Nariman Point', category:'shows', price:'₹500–2,000 per ticket', note:'Theatre, music and dance', ll:[18.9254,72.8202]},
  {name:'Canvas Laugh Club', area:'Lower Parel', category:'shows', price:'~₹600 per ticket', note:'Comedy club', ll:[18.9945,72.8255]},
  {name:'Kala Ghoda heritage walk', area:'Kala Ghoda', category:'shows', price:'Free–₹500', note:'Morning walk, about 2 hours', ll:[18.9300,72.8330]},
  {name:'Weekend pottery wheel class', area:'Bandra', category:'workshop', price:'~₹1,800 per person', note:'Beginner-friendly, 2 hours', ll:[19.0600,72.8350]},
  {name:'Block-printing workshop', area:'Fort', category:'workshop', price:'~₹1,500 per person', note:'Make your own tote', ll:[18.9330,72.8360]},
  {name:'Bollywood dance drop-in class', area:'Andheri', category:'workshop', price:'~₹700 per person', note:'No experience needed', ll:[19.1180,72.8470]},
  {name:'Linking Road', area:'Bandra', category:'shop', price:'Free to browse', note:'Street shopping and bargains', ll:[19.0655,72.8350]},
  {name:'Colaba Causeway', area:'Colaba', category:'shop', price:'Free to browse', note:'Street stalls, jewellery and books', ll:[18.9188,72.8316]},
  {name:'Fashion Street', area:'Churchgate', category:'shop', price:'Free to browse', note:'Budget clothes market', ll:[18.9358,72.8280]},
  {name:'Chor Bazaar', area:'Girgaon', category:'shop', price:'Free to browse', note:'Antiques and vintage finds', ll:[18.9570,72.8290]},
  {name:'Phoenix Palladium', area:'Lower Parel', category:'shop', price:'Varies', note:'Big mall with high-street and luxury', ll:[18.9937,72.8258]},
];

// Instagram links from the eval set. A server can read these captions; demo mode uses what we already read.
const KNOWN_LINKS = {
  'Deyb-zQMJcS': {title:'Sunset spots in Mumbai', kind:'ig', confidence:'sure', names:['AER','Dadar Chowpatty','Sea Link promenade'], note:'Caption lists 3 sunset spots with area and cover charges'},
  'DebylfgExy0': {title:'Speakeasy bars in Mumbai', kind:'ig', confidence:'sure', names:['PCO','Slink & Bardot','Ocho','Charlee','Harbour Bar'], note:'Caption lists 5 bars with area, cost for two and timings'},
  'DbvFP7kt0Qu': {title:'Complete guide to Bandra West', kind:'ig', note:'A big guide. Pick the places you actually want to go to.', caption:`Bandra – Complete Guide to Bandra West
Bakeries
* Hearsch Bakery
* A1 Bakery
* American Express
* National Bakery
* Magnolia Bakery
* Suchali’s Artisan Bakehouse
* Bawa Zest
* Twenty Seven Bakehouse
* Kalpana Snacks Mart
* Love Crummbs
* D’Costa Bakery
* Country of Origin
Best Bars & Pubs
* Toto’s Garage
* Yacht
* Janata
* Old Street Bar & Cafe
* The Irish House
* PJ’s
* The Den
* Bonobo
* The Daily All Day
* Escobar
* The Little Easy
* 145 Bandra
* Monkey Bar
* GIGI
* Socials
Cafés, Restaurants & Street Food (Up to ₹500 for 2)
* Cafe Andora
* Candies
* Cafe Delight
* Gokul Refreshments
* Duke Restaurant
* Imlee Chaat Gully
* Ranjeet Pani Puri
* Amrut Sagar Fast Food
* The Family Table by Joseph
* Coulsons Milkshake
* The South Spice
Cafés & Restaurants (Under ₹1000 for 2)
* Mountain Goat
* Imbiss Meeting Joint
* Brevé
* Grounded
* Madras Diaries
* Rays Cafe and Pizzeria
* Jimis Burger
* Frisbees
* Eat Around the Corner
* Tiger Yaki
* Project Hum
* Mini Punjab
Cafés & Restaurants (Under ₹2000 for 2)
* Veronica’s
* Boojee
* Taj Mahal Tea House
* The Bandstand Pantry
* Steps Cafe
* Jamjar Diner
* Suzette
* Woodside Inn
* The Fatty Bao
* Kuuraku
* Tao Kitchen
* Jhelum
* Greenr
* Subko
* Truefit Gourmet
* Perch
Cafés & Restaurants (Above ₹2000 for 2)
* Izumi
* Seefah
* Akina
* Mizu
* Veranda
* Pali Village Cafe
* Smoke House Deli
* Napoli by Shatranj
Best Desserts
* Coppetto Artisan Gelato
* The Dessert Therapy
* Chantilly
* Bombay Sweet Shop
* The Gelato Bar
* Theobroma
* Le 15 Patisserie
* Kunafa World
Places to Visit & Things to Do
* Mount Mary Church
* Art and Charlie Art Gallery
* Ranwar Village
* Reclamation
* Jogger’s Park
* Bandra Fort
* Hill Road & Linking Road (Shopping)
* The Comic Book Store
* Olympus Gaming Lounge`},
  'DePAnAPE9hv': {title:'Where to eat in Mumbai after 1 AM', kind:'ig', confidence:'partial', category:'food', note:'Names are only in the photos, not the caption'},
  'DUyNR6sjHp6': {title:'Café hopping in Mumbai', kind:'ig', confidence:'partial', category:'cafe', note:'The place is only shown in the video'},
};

/* ---------------- helpers ---------------- */
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return (c==='x'?r:(r&3|8)).toString(16);}));
const code6 = () => Array.from({length:6},()=> 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
const daysFrom = (n,h=12,m=0) => { const d=new Date(); d.setDate(d.getDate()+n); d.setHours(h,m,0,0); return d; };
const isoAt = (n,h,m) => { const d = daysFrom(n,h,m); if(d.getTime() > Date.now()) d.setTime(Date.now() - (90 + (h*7+m)%60)*60000); return d.toISOString(); };
const ymd = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function nextDow(dow, minAhead=1){ const d=new Date(); d.setHours(12,0,0,0); let n=0; do{ d.setDate(d.getDate()+1); n++; } while(d.getDay()!==dow || n<minAhead); return d; }

/* ---------------- demo seed (each new person gets their own copy) ---------------- */
function buildDemoSeed(meId){
  const B = BOTS, ids = {};
  const gPersonal = uuid(), gBB = uuid(), gOG = uuid();
  const groups = [
    {id:gPersonal, name:'Just me', color:'#111111', invite_code:code6(), memory:[], is_personal:true, is_demo:false, created_by:meId},
    {id:gBB, name:'Bandra Bunch', color:'#FF5CA8', invite_code:code6(), is_personal:false, is_demo:true, created_by:B.riya.id,
      memory:['Aman is vegetarian','Sana doesn’t drink, loves good mocktails','Kabir loves live music','Usually ₹1,000–2,000 each','Saturday evenings work best']},
    {id:gOG, name:'Office gang', color:'#2B44FF', invite_code:code6(), is_personal:false, is_demo:true, created_by:B.dev.id,
      memory:['Sunday mornings work best','Meera: no seafood']},
  ];
  const members = [
    [gPersonal,meId],[gBB,meId],[gBB,B.riya.id],[gBB,B.kabir.id],[gBB,B.sana.id],[gBB,B.aman.id],[gOG,meId],[gOG,B.dev.id],[gOG,B.meera.id],
  ].map(([group_id,user_id])=>({group_id,user_id}));
  const P = (key, gid, name, by, dayOff, h, src, extra={}) => {
    const base = PLACE_DB.find(p=>p.name===name) || {};
    const row = {id:uuid(), group_id:gid, name, area:extra.area||base.area, category:extra.category||base.category, price:extra.price||base.price||'',
      note:extra.note||base.note||'', lat:(extra.ll||base.ll)[0], lng:(extra.ll||base.ll)[1], source_kind:src, source_url:extra.url||null,
      added_by:by, done:false, created_at:isoAt(dayOff,h,4)};
    ids[key]=row.id; return row;
  };
  const places = [
    P('p1',gBB,'PCO',B.riya.id,-3,23,'ig',{url:'https://www.instagram.com/p/DebylfgExy0/'}),
    P('p2',gBB,'Slink & Bardot',B.riya.id,-3,23,'ig',{url:'https://www.instagram.com/p/DebylfgExy0/'}),
    P('p3',gBB,'Ocho',B.riya.id,-3,23,'ig',{url:'https://www.instagram.com/p/DebylfgExy0/'}),
    P('p4',gBB,'Charlee',B.riya.id,-3,23,'ig',{url:'https://www.instagram.com/p/DebylfgExy0/'}),
    P('p5',gBB,'Subko',B.sana.id,-2,13,'list'),
    P('p6',gBB,'Kala Ghoda Café',B.sana.id,-2,13,'list'),
    P('p7',gBB,'Candies',B.sana.id,-2,13,'list'),
    P('p8',gBB,'Bademiya',B.riya.id,-1,9,'ig'),
    P('p9',gBB,'Bandra Fort',B.kabir.id,-1,12,'yt'),
    P('p10',gBB,'The Habitat',meId,0,10,'manual'),
    P('p11',gBB,'Carter Road promenade',B.aman.id,-12,18,'manual'),
    P('o1',gOG,'PCO',B.dev.id,-6,23,'ig'),
    P('o2',gOG,'Weekend pottery wheel class',B.meera.id,-8,10,'ig'),
    P('o3',gOG,'AER',meId,-5,20,'ig'),
  ];
  const interests = [['p1',B.kabir.id],['p1',B.riya.id],['p3',B.kabir.id],['p5',B.riya.id],['p7',B.aman.id],['p8',B.kabir.id],['p9',B.sana.id],['p9',B.riya.id],['p10',B.sana.id],['o1',B.dev.id],['o2',B.dev.id],['o2',meId]]
    .map(([k,u])=>({place_id:ids[k], user_id:u, group_id: places.find(p=>p.id===ids[k]).group_id}));
  const M = (gid, by, dayOff, h, m, kind, body, data=null) => ({id:uuid(), group_id:gid, user_id:by, kind, body, data, created_at:isoAt(dayOff,h,m)});
  const share = (title, src, keys, extra={}) => ({title, source_kind:src, place_ids:keys.map(k=>ids[k]), ...extra});
  // Past plan (Carter Road, 6 days ago) → triggers "Did you go?". Upcoming plan for Office gang.
  const plCarter = uuid(), plPottery = uuid();
  const sun = nextDow(0, 2);
  const plans = [
    {id:plCarter, group_id:gBB, created_by:B.aman.id, title:'Sunset walk at Carter Road', status:'confirmed', place_id:ids.p11,
      options:[{name:'Carter Road promenade', area:'Bandra', category:'sunset', price:'Free', why:'Everyone free on Saturday; Aman is back from Pune', place_id:ids.p11}], chosen:0,
      date:ymd(daysFrom(-6)), time:'5:30 pm', who:[meId,B.riya.id,B.kabir.id,B.sana.id,B.aman.id], prefs:{}, created_at:isoAt(-9,11,0)},
    {id:plPottery, group_id:gOG, created_by:B.meera.id, title:'Pottery wheel class', status:'confirmed', place_id:ids.o2,
      options:[{name:'Weekend pottery wheel class', area:'Bandra', category:'workshop', price:'~₹1,800 per person', why:'Meera and Dev both want to try it', place_id:ids.o2}], chosen:0,
      date:ymd(sun), time:'11:00 am', who:[meId,B.dev.id,B.meera.id], prefs:{}, created_at:isoAt(-7,10,40)},
  ];
  const messages = [
    M(gBB,B.aman.id,-9,11,0,'plan','Plan confirmed',{plan_id:plCarter}),
    M(gBB,B.sana.id,-4,21,12,'text','guys we NEED to do something new this weekend. not the same café again'),
    M(gBB,B.kabir.id,-4,21,15,'text','agreed. someone find a place'),
    M(gBB,B.riya.id,-3,23,4,'share','',share('Mumbai’s hidden speakeasies','ig',['p1','p2','p3','p4'],{url:'https://www.instagram.com/p/DebylfgExy0/'})),
    M(gBB,B.kabir.id,-3,23,10,'text','PCO has been on my list forever'),
    M(gBB,B.sana.id,-2,13,20,'share','',share('cafés to try (from my notes)','list',['p5','p6','p7'])),
    M(gBB,B.riya.id,-1,9,40,'share','',share('Where to eat in Mumbai after 1 AM','ig',['p8'],{confirmed_by:B.riya.id})),
    M(gBB,B.aman.id,-1,11,2,'text','I’m in Pune for work next weekend btw, go without me if it’s then'),
    M(gBB,B.kabir.id,-1,12,15,'share','',share('Best sunset spots in Bandra','yt',['p9'])),
    M(gBB,meId,0,10,2,'share','',share('The Habitat (open mics on Fridays)','manual',['p10'])),
    M(gOG,B.meera.id,-8,10,0,'share','',share('Pottery classes for total beginners','ig',['o2'])),
    M(gOG,B.dev.id,-8,10,30,'text','Sunday? I’m in'),
    M(gOG,B.meera.id,-7,10,40,'plan','Plan confirmed',{plan_id:plPottery}),
    M(gOG,meId,-5,20,0,'share','',share('AER rooftop at sunset','ig',['o3'])),
  ];
  return {groups, members, places, interests, messages, plans, votes:[], ratings:[]};
}

/* A real sign-up starts with a clean slate: only their private "Just me" space, no demo friends or places. */
function buildStarterSeed(meId){
  const g = {id:uuid(), name:'Just me', color:'#111111', invite_code:code6(), memory:[], is_personal:true, is_demo:false, created_by:meId};
  return {groups:[g], members:[{group_id:g.id, user_id:meId}], places:[], interests:[], messages:[], plans:[], votes:[], ratings:[]};
}

/* ---------------- in-memory store ---------------- */
const D = {me:null, profiles:{}, groups:[], members:[], messages:[], places:[], interests:[], plans:[], votes:[], ratings:[]};
const TABLES = ['groups','members','messages','places','interests','plans','votes','ratings'];
let listeners = [];
const emit = (why) => listeners.forEach(f=>{ try{ f(why); }catch(e){ console.error(e); } });
for(const b of Object.values(BOTS)) D.profiles[b.id] = {...b, is_bot:true};

function keyOf(table, r){
  if(table==='members') return r.group_id+'|'+r.user_id;
  if(table==='interests') return r.place_id+'|'+r.user_id;
  if(table==='votes') return r.plan_id+'|'+r.user_id;
  if(table==='ratings') return r.place_id+'|'+r.user_id;
  return r.id;
}
function upsertLocal(table, row){
  const arr = D[table], k = keyOf(table,row), i = arr.findIndex(r=>keyOf(table,r)===k);
  if(i>=0) arr[i] = {...arr[i], ...row}; else arr.push(row);
}
function removeLocal(table, pred){ D[table] = D[table].filter(r=>!pred(r)); }

/* ================= LOCAL MODE (demo on this device) ================= */
const LKEY = 'yonder-local-v1';
const local = {
  save(){ try{ const {profiles, ...rest} = D; const mine = {}; for(const [k,v] of Object.entries(profiles)) if(!BOT_IDS.has(k)) mine[k]=v; localStorage.setItem(LKEY, JSON.stringify({...rest, profiles:mine})); }catch(e){} },
  load(){ try{ const raw = localStorage.getItem(LKEY); if(!raw) return false; const s = JSON.parse(raw); if(!s || !s.me) return false;
    Object.assign(D, s, {profiles:{...D.profiles, ...(s.profiles||{})}}); return true; }catch(e){ return false; } },
};

/* ================= CLOUD MODE (Supabase) ================= */
let sb = null, channel = null;
const FROM = {groups:'groups', members:'group_members', messages:'messages', places:'places', interests:'interests', plans:'plans', votes:'votes', ratings:'ratings'};
const TO = Object.fromEntries(Object.entries(FROM).map(([a,b])=>[b,a]));

async function cloudLoadAll(){
  const uid = D.me.id;
  const {data:mem, error:e1} = await sb.from('group_members').select('group_id').eq('user_id', uid);
  if(e1) throw e1;
  const gids = (mem||[]).map(r=>r.group_id);
  for(const t of TABLES) D[t] = [];
  if(!gids.length) return;
  const q = (t) => sb.from(FROM[t]).select('*').in(t==='groups'?'id':'group_id', gids);
  const results = await Promise.all(TABLES.map(t => t==='messages' ? q(t).order('created_at',{ascending:true}).limit(2000) : q(t)));
  results.forEach((r,i)=>{ if(r.error) throw r.error; D[TABLES[i]] = r.data||[]; });
  const pids = [...new Set(D.members.map(m=>m.user_id))].filter(id=>!BOT_IDS.has(id));
  if(pids.length){ const {data:ps} = await sb.from('profiles').select('id,name,color,home_area,taste,is_bot').in('id', pids); (ps||[]).forEach(p=>{ D.profiles[p.id] = {...(D.profiles[p.id]||{}), ...p}; }); }
}
function cloudSubscribe(){
  if(channel) sb.removeChannel(channel);
  channel = sb.channel('yonder-'+D.me.id);
  for(const table of Object.values(FROM)){
    channel.on('postgres_changes', {event:'*', schema:'public', table}, (ev)=>{
      const t = TO[table];
      if(ev.eventType==='DELETE'){ const o = ev.old||{}; const k = keyOf(t,o); if(k && !k.includes('undefined')) removeLocal(t, r=>keyOf(t,r)===k); else if(o.id) removeLocal(t, r=>r.id===o.id); }
      else upsertLocal(t, ev.new);
      if(t==='members' && ev.eventType!=='DELETE' && ev.new && !D.profiles[ev.new.user_id]) loadProfile(ev.new.user_id);
      if(t==='members' && ev.eventType==='INSERT' && ev.new && ev.new.user_id===D.me.id) { cloudLoadAll().then(()=>emit('reload')); return; }
      emit(t);
    });
  }
  channel.subscribe();
}
async function loadProfile(id){ const {data} = await sb.from('profiles').select('id,name,color,home_area,taste,is_bot').eq('id',id).maybeSingle(); if(data){ D.profiles[id]=data; emit('profiles'); } }
function check(r){ if(r && r.error) throw r.error; return r ? r.data : null; }

/* ================= PUBLIC API ================= */
const api = {
  mode: MODE,
  onChange(f){ listeners.push(f); },

  async init(){
    if(MODE==='local'){ return local.load() ? 'ready' : 'signedOut'; }
    sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {auth:{persistSession:true, autoRefreshToken:true}});
    const {data:{session}} = await sb.auth.getSession();
    if(!session) return 'signedOut';
    return await api._afterAuth(session.user);
  },
  async _afterAuth(user){
    let {data:prof} = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    if(!prof){
      const name = (user.user_metadata && user.user_metadata.name) || 'You';
      prof = check(await sb.from('profiles').upsert({id:user.id, name, color:COLORS[Math.floor(Math.random()*3)], is_guest: !!user.is_anonymous}).select().single());
    }
    D.me = {...prof, email:user.email||null, is_guest: !!user.is_anonymous};
    D.profiles[user.id] = D.me;
    if(!prof.demo_seeded){
      // Guests ("Try it now") get the demo friend groups. Real accounts start empty.
      const seed = user.is_anonymous ? buildDemoSeed(user.id) : buildStarterSeed(user.id);
      const r = await sb.rpc('seed_demo', {payload: seed});
      if(r.error) console.warn('seed_demo failed', r.error);
    }
    await cloudLoadAll();
    cloudSubscribe();
    return 'ready';
  },

  async signInGuest(name){
    name = (name||'').trim() || 'Guest';
    if(MODE==='local'){
      const id = uuid();
      D.me = {id, name, color:'#FF5CA8', home_area:'', taste:{like:[],nope:[]}, is_guest:true, onboarded:false, tour_done:false};
      D.profiles[id] = D.me;
      const s = buildDemoSeed(id); for(const t of TABLES) D[t] = s[t];
      local.save(); return 'ready';
    }
    const r = await sb.auth.signInAnonymously({options:{data:{name}}}); if(r.error) throw r.error;
    await sb.from('profiles').upsert({id:r.data.user.id, name, color:'#FF5CA8', is_guest:true});
    return await api._afterAuth(r.data.user);
  },
  async signUp(email, password, name){
    if(MODE==='local') throw new Error('Accounts need the Yonder server. In this demo, continue as a guest.');
    const r = await sb.auth.signUp({email, password, options:{data:{name}, emailRedirectTo: location.origin + location.pathname}});
    if(r.error) throw r.error;
    if(!r.data.session) return 'checkEmail';
    await sb.from('profiles').upsert({id:r.data.user.id, name, color:'#2B44FF'});
    return await api._afterAuth(r.data.user);
  },
  async signIn(email, password){
    if(MODE==='local') throw new Error('Accounts need the Yonder server. In this demo, continue as a guest.');
    const r = await sb.auth.signInWithPassword({email, password}); if(r.error) throw r.error;
    return await api._afterAuth(r.data.user);
  },
  async signOut(){
    if(MODE==='local'){ localStorage.removeItem(LKEY); }
    else { if(channel) sb.removeChannel(channel); await sb.auth.signOut(); }
    D.me = null; for(const t of TABLES) D[t] = [];
  },

  async saveProfile(patch){
    Object.assign(D.me, patch); D.profiles[D.me.id] = D.me;
    if(MODE==='local'){ local.save(); return; }
    const {email, is_guest, ...rest} = patch;
    check(await sb.from('profiles').update(rest).eq('id', D.me.id));
  },

  async createGroup(name, color){
    if(MODE==='local'){
      const g = {id:uuid(), name, color, invite_code:code6(), memory:[], is_personal:false, is_demo:false, created_by:D.me.id};
      D.groups.push(g); D.members.push({group_id:g.id, user_id:D.me.id}); local.save(); emit('groups'); return g;
    }
    const g = check(await sb.rpc('create_group', {p_name:name, p_color:color}));
    upsertLocal('groups', g); upsertLocal('members', {group_id:g.id, user_id:D.me.id}); emit('groups'); return g;
  },
  async joinGroup(code){
    code = String(code||'').trim().toUpperCase();
    if(MODE==='local'){
      const g = D.groups.find(x=>x.invite_code===code);
      if(!g) throw new Error('No group with that code on this device. Invite codes work across phones once Yonder is connected to its server.');
      return g;
    }
    const g = check(await sb.rpc('join_group', {p_code:code}));
    await cloudLoadAll(); emit('reload'); return g;
  },
  async leaveGroup(gid){
    if(MODE==='local'){ removeLocal('members', r=>r.group_id===gid && r.user_id===D.me.id); local.save(); emit('groups'); return; }
    check(await sb.from('group_members').delete().eq('group_id',gid).eq('user_id',D.me.id));
    await cloudLoadAll(); emit('reload');
  },
  async updateGroup(gid, patch){
    const g = D.groups.find(x=>x.id===gid); Object.assign(g, patch); emit('groups');
    if(MODE==='local'){ local.save(); return; }
    check(await sb.from('groups').update(patch).eq('id', gid));
  },

  async sendMessage(gid, kind, body, data=null, asUser){
    const row = {id:uuid(), group_id:gid, user_id: asUser || D.me.id, kind, body, data, created_at:new Date().toISOString()};
    upsertLocal('messages', row); emit('messages');
    if(MODE==='local'){ local.save(); return row; }
    if(asUser && asUser!==D.me.id){ check(await sb.rpc('bot_message', {p_group:gid, p_bot:asUser, p_kind:kind, p_body:body, p_data:data, p_id:row.id})); return row; }
    check(await sb.from('messages').insert(row)); return row;
  },
  async addPlaces(gid, places){
    const rows = places.map(p=>({id:uuid(), group_id:gid, name:p.name, area:p.area||'', category:CATS[p.category]?p.category:'shows', price:p.price||'', note:p.note||'',
      lat:p.lat, lng:p.lng, source_kind:p.source_kind||'manual', source_url:p.source_url||null, added_by:D.me.id, done:false, created_at:new Date().toISOString()}));
    rows.forEach(r=>upsertLocal('places', r)); emit('places');
    if(MODE==='local'){ local.save(); return rows; }
    check(await sb.from('places').insert(rows)); return rows;
  },
  // Saves a place's map position found later (quiet: the map redraws itself, no full re-render).
  async setPlaceCoords(id, lat, lng){
    const p = D.places.find(x=>x.id===id); if(!p) return; p.lat = lat; p.lng = lng;
    if(MODE==='local'){ local.save(); return; }
    try{ await sb.from('places').update({lat, lng}).eq('id', id); }catch(e){ /* the position still shows for this session */ }
  },
  async removePlace(id){
    removeLocal('places', r=>r.id===id); emit('places');
    if(MODE==='local'){ local.save(); return; }
    check(await sb.from('places').delete().eq('id', id));
  },
  async toggleInterest(place){
    const has = D.interests.some(i=>i.place_id===place.id && i.user_id===D.me.id);
    if(has) removeLocal('interests', i=>i.place_id===place.id && i.user_id===D.me.id);
    else upsertLocal('interests', {place_id:place.id, user_id:D.me.id, group_id:place.group_id});
    emit('interests');
    if(MODE==='local'){ local.save(); return; }
    if(has) check(await sb.from('interests').delete().eq('place_id',place.id).eq('user_id',D.me.id));
    else check(await sb.from('interests').insert({place_id:place.id, user_id:D.me.id, group_id:place.group_id}));
  },
  async createPlan(gid, plan){
    const row = {id:uuid(), group_id:gid, created_by:D.me.id, status:'voting', chosen:null, place_id:null, date:null, time:null, created_at:new Date().toISOString(), ...plan};
    upsertLocal('plans', row); emit('plans');
    if(MODE==='local'){ local.save(); return row; }
    check(await sb.from('plans').insert(row)); return row;
  },
  async updatePlan(id, patch){
    const p = D.plans.find(x=>x.id===id); Object.assign(p, patch); emit('plans');
    if(MODE==='local'){ local.save(); return; }
    check(await sb.from('plans').update(patch).eq('id', id));
  },
  async vote(plan, ranking, vetoes, asUser){
    const row = {plan_id:plan.id, user_id: asUser || D.me.id, group_id:plan.group_id, ranking, vetoes, created_at:new Date().toISOString()};
    upsertLocal('votes', row); emit('votes');
    if(MODE==='local'){ local.save(); return; }
    if(asUser && asUser!==D.me.id) check(await sb.rpc('bot_vote', {p_plan:plan.id, p_bot:asUser, p_ranking:ranking, p_vetoes:vetoes}));
    else check(await sb.from('votes').upsert(row));
  },
  async rate(place, went, stars){
    const row = {place_id:place.id, user_id:D.me.id, group_id:place.group_id, went, stars: went?stars:null, created_at:new Date().toISOString()};
    upsertLocal('ratings', row); emit('ratings');
    if(went && !place.done){ place.done = true; }
    if(MODE==='local'){ local.save(); return; }
    check(await sb.from('ratings').upsert(row));
    if(went) check(await sb.from('places').update({done:true}).eq('id', place.id));
  },

  /* AI: cloud → server function (app's own key). local → null (caller uses quick picks). */
  async ai(task, payload){
    if(MODE==='local') return {ok:false, reason:'offline'};
    try{
      const {data, error} = await sb.functions.invoke(CFG.aiFunction || 'ai', {body:{task, ...payload}});
      if(error){
        let detail = null; try{ detail = error.context && await error.context.json(); }catch(e){}
        return {ok:false, reason:(detail && detail.reason) || 'error', message:(detail && detail.message) || error.message};
      }
      return data && data.ok ? data : {ok:false, reason:(data&&data.reason)||'error', message:data&&data.message};
    }catch(e){ return {ok:false, reason:'error', message:String(e && e.message || e)}; }
  },
};

window.Y = { D, api, MODE, BOTS, BOT_IDS, CATS, AREAS, TASTE_CARDS, TASTE_BY_ID, PLACE_DB, KNOWN_LINKS, COLORS,
  areaKey, coordsFor, uuid, ymd, daysFrom, nextDow };
})();
