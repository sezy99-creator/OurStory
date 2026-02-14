/***********************
  GLOBAL PROGRESS
************************/
let progress = {
  travel: false,
  game: false,
  inbox: false
};

/***********************
  TEST MODE (set false when you finish)
************************/
const TEST_MODE = false;

function unlockAllForTest(){
  progress.travel = true;
  progress.game = true;
  progress.inbox = true;

  // nav buttons
  const gameBtn = document.getElementById("gameBtn");
  const inboxBtn = document.getElementById("inboxBtn");
  const finalBtn = document.getElementById("finalBtn");

  if (gameBtn){
    gameBtn.disabled = false;
    gameBtn.innerText = "🎮 Game";
    gameBtn.onclick = () => goToGame();
  }
  if (inboxBtn){
    inboxBtn.disabled = false;
    inboxBtn.innerText = "💌 Inbox";
    inboxBtn.onclick = () => goToInbox();
  }
  if (finalBtn){
    finalBtn.disabled = false;
    finalBtn.innerText = "🎬 Final";
    finalBtn.onclick = () => goToFinal();
  }

  // continue buttons (varsa)
  const tc = document.getElementById("travelContinue");
  if (tc) tc.classList.remove("hidden");
  const ic = document.getElementById("inboxContinue");
  if (ic) ic.classList.remove("hidden");
}





/***********************
  MUSIC
************************/
function safePlay(audioEl){
  const p = audioEl.play();
  if (p && typeof p.catch === "function") p.catch(()=>{});
}
function tryPlayMusic() { safePlay(document.getElementById("bgMusic")); }

function toggleMusic() {
  const bg = document.getElementById("bgMusic");
  const quiz = document.getElementById("quizMusic");
  const btn = document.getElementById("musicToggle");

  const anyPlaying = (!bg.paused) || (!quiz.paused);

  if (anyPlaying) {
    bg.pause(); quiz.pause();
    btn.innerText = "🔇 Music: OFF";
  } else {
    const gameVisible = !document.getElementById("game").classList.contains("hidden");
    if (gameVisible) safePlay(quiz);
    else safePlay(bg);
    btn.innerText = "🔊 Music: ON";
  }
}

/***********************
  LOGIN / INTRO
************************/
function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const err = document.getElementById("loginError");
  const card = document.querySelector(".loginCard");

  if (password === "101222") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");
    if (err) err.innerText = "";
    tryPlayMusic();
  } else {
    if (err) err.innerText = "Wrong password 😜";
    if (card){
      card.classList.remove("shakeX");
      void card.offsetWidth;
      card.classList.add("shakeX");
    }
  }
}

function startJourney() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
  showSection("travel");
  tryPlayMusic();
}

/***********************
  SECTIONS
************************/
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "travel") {
    initMapOnce();
    setTimeout(() => map.invalidateSize(), 200);
  }
}

/***********************
  MAP
************************/
let map;
let mapInitialized = false;

function makeImages(base, count){
  return Array.from({length: count}, (_, i) => `${base}${i+1}.jpg`);
}
function makeNotes(count){
  return Array.from({length: count}, () => "");
}
function imgList(...names){
  return names;
}

const cities = {
  adana: {
    coords:[37.00000, 35.32134],
    title:"Adana 🇹🇷",
    text:"",
    images: imgList("adana1.jpg","adana2.jpg"),
    notes: ["ohhhhhhh do you remember the kebap we had"," when you look again, its kinda scary picture bloooddd"]
  },

  antalya: {
    coords:[36.90812, 30.69556],
    title:"Antalya 🇹🇷",
    text:"",
    images: imgList("antalya1.jpg","antalya2.jpg","antalya3.jpg","antalya4.jpg","antalya5.jpg"),
    notes: ["wedding zamaniii","my eye was soooo bad, do you remember??","kahvalti zamanii miiii","senle ben kumsaldaaa","literally WEDDING ZAMANIII"]
  },

  antep: {
    coords:[37.06622, 37.38332],
    title:"Antep / Gaziantep 🇹🇷",
    text:"",
    images: imgList("antep1.jpg","antep2.jpg"),
    notes: ["It was such a cultural trip","CULTURE I am talking about"]
  },

  barcelona: {
    coords:[41.38879, 2.15899],
    title:"Barcelona 🇪🇸",
    text:"",
    images: imgList("barcelona1.jpg","barcelona2.jpg","barcelona3.jpg","barcelona4.jpg","barcelona5.jpg"),
    notes: ["on our way to EN IYI gezi","Let's go to biiiiic biiiiiic","under the sun just resting","on your right  Antoni Gaudi's masterpiece!!!!","WE ARE NOT(?)ALCOHOLIC"]
  },

  bucharest: {
    coords:[44.43225, 26.10626],
    title:"Bucharest 🇷🇴",
    text:"",
    images: imgList("bucharest1.jpg","bucharest2.jpg"),
    notes: ["I can't write caption you are so bright! Can't see anything!!!!","MY EYEEEES!"]
  },

  amsterdam: {
    coords:[52.37403, 4.88969],
    title:"Amsterdam (Netherlands) 🇳🇱",
    text:"",
    images: imgList("amsterdam1.jpg","amsterdam2.jpg","amsterdam3.jpg","amsterdam4.jpg","amsterdam5.jpg"),
    notes: ["I can't write caption you are so bright! Can't see anything!!!!","MY EYEEEES!"]
  },

  denizli: {
    coords:[37.77652, 29.08639],
    title:"Denizli 🇹🇷",
    text:"",
    images: imgList("denizli1.JPG"),
    notes: ["Why that's our only picture maaaaan?"]
  },

  everglades: {
    coords:[25.28662, -80.89865],
    title:"Everglades 🇺🇸",
    text:"",
    images: imgList("everglades1.JPG"),
    notes: ["yavrumun elinde yavru"]
  },

  florence: {
    coords:[43.77925, 11.24626],
    title:"Floransa / Florence 🇮🇹",
    text:"",
    images: imgList("floransa1.JPG","floransa2.JPG","floransa3.JPG"),
    notes: ["Ama cok ayipppppp","that was hoot","we are not begging for money for reaaaaaal"]
  },

  garda: {
    coords:[45.58060, 10.62050],
    title:"Lake Garda 🇮🇹",
    text:"",
    images: imgList("garda1.JPG","garda2.JPG"),
    notes: ["that was such a amazing hotel","trying to escape from my parents"]
  },

  grandcanyon: {
    coords:[36.10697, -112.11299],
    title:"Grand Canyon 🇺🇸",
    text:"",
    images: imgList("grandcanyon1.JPG","grandcanyon2.JPG","grandcanyon3.JPG"),
    notes: ["Pretty view","Prettier view","En cok pretty view <3"]
  },

  ibiza: {
    coords:[38.90883, 1.43296],
    title:"Ibiza 🇪🇸",
    text:"",
    images: imgList("ibiza1.JPG"),
    notes: ["When you look this picture more than 2 minute, you become dizzy"]
  },

  istria: {
    coords:[45.52778, 13.57056],
    title:"Istria 🇸🇮",
    text:"",
    images: imgList("istria1.jpg"),
    notes: ["Our ilk, birinci geziiiii"]
  },

  ljubljana: {
    coords:[46.05108, 14.50513],
    title:"Ljubljana 🇸🇮",
    text:"",
    images: imgList("ljubljana1.jpg","ljubljana2.jpg","ljubljana3.jpg"),
    notes: ["That's a bridge","I think nice sun view?","COOOOOK soguk"]
  },

  losangeles: {
    coords:[34.05223, -118.24368],
    title:"Los Angeles 🇺🇸",
    text:"",
    images: imgList("losangeles1.JPG","losangeles2.JPG"),
    notes: ["Just chilling in LA , you knooooow"," That pier was so nice, lets go agai1!!!!1"]
  },

  luxembourg: {
    coords:[49.61167, 6.13000],
    title:"Luxembourg 🇱🇺",
    text:"",
    images: imgList("luxembourg1.jpg"),
    notes: ["Can you believe it's the only picture I have??"]
  },

  marostica: {
    coords:[45.74596, 11.66237],
    title:"Marostica 🇮🇹",
    text:"",
    images: imgList("morastica1.JPG","morastica2.JPG","marostica2.JPG","marostica3.JPG"),
    notes: ["That was a HIKE","Ohhhhh my heart","How can I forget that picture, it's always in my hearth","Just 2 hours after maybe 3. That's a special place"]
  },

  metz: {
    coords:[49.11911, 6.17269],
    title:"Metz 🇫🇷",
    text:"",
    images: imgList("mertz1.jpg"),
    notes: ["CAPTION(sen fill). I have nothing to say"]
  },

  miami: {
    coords:[25.76168, -80.19179],
    title:"Miami 🇺🇸",
    text:"",
    images: imgList("miami1.JPG","miami2.jpg","miami3.jpg","miami4.jpg","miami5.jpeg"),
    notes: ["We are not a rock band actually","Delicious!!!!!","Hadi Tavuk!!!!!!!","Yemek zamaniiii","Let's go to biiiiic biiiiiic"]
  },

  milan: {
    coords:[45.46427, 9.18951],
    title:"Milan 🇮🇹",
    text:"",
    images: imgList("milan1.jpg"),
    notes: ["Well, that's the only picture osoooooo just remember our wait time"]
  },

  napoli: {
    coords:[40.85180, 14.26812],
    title:"Napoli 🇮🇹",
    text:"",
    images: imgList("napoli1.JPG","napoli2.JPG","napoli3.JPG","napoli4.JPG","napoli5.JPG"),
    notes: ["word famous pizza chef!!!!","This is the picture of relief","just a nice selfie","My lips really hurt but that's super funny","Word class pasta chef aaaaa benim oooo"]
  },

  padova: {
    coords:[45.40797, 11.88586],
    title:"Padova 🇮🇹",
    text:"",
    images: imgList("padova1.jpg","padova2.jpg","padova3.JPG","padova4.JPG"),
    notes: ["Cok tatlısın","I loook totally different ","Askim neden cooook açsın ","I am free now!!!!(Unemployed:( )"]
  },

  palermo: {
    coords:[38.13205, 13.33561],
    title:"Palermo 🇮🇹",
    text:"",
    images: imgList("palermo1.JPG","palermo2.JPG","palermo3.JPG"),
    notes: ["Another we are not alcoholic caption ","I would live in your eyes , such beautiful view","one of my fav picture "]
  },

  paris: {
    coords:[48.85341, 2.34880],
    title:"Paris 🇫🇷",
    text:"",
    images: imgList("paris1.jpg","paris2.jpg","paris3.jpg","paris4.jpg","paris5.jpg"),
    notes: ["Biz ve Eyfel ","Sen ve Eyfel","Sen ve Memelerim","Klasik bir mirror picture","YOu are happy as always to carry my shiiiit"]
  },

  pisa: {
    coords:[43.70853, 10.40360],
    title:"Pisa 🇮🇹",
    text:"",
    images: imgList("pisa1.JPG","pisa2.JPG"),
    notes: ["I don't know why but you didn't wanted to get picture . Cok ayip!!!!!!1","But we did Pizza sandwich "]
  },

  roma: {
    coords:[41.90278, 12.49636],
    title:"Rome 🇮🇹",
    text:"",
    images: imgList("roma.JPG","roma1.JPG","roma3.JPG"),
    notes: ["Our room was weird lets face that","",""]
  },

  sandiego: {
    coords:[32.71574, -117.16108],
    title:"San Diego 🇺🇸",
    text:"",
    images: imgList("sandiego1.JPG","sandiego2.JPG"),
    notes: ["Askim let's go again I loved here","That was SCARY"]
  },

  seattle: {
    coords:[47.60621, -122.33207],
    title:"Seattle 🇺🇸",
    text:"",
    images: imgList("seattle1.JPG","seattle2.JPG","seattle3.JPG","seattle4.JPG","seattle5.JPG"),
    notes: ["1st Time we cooked for your familya dn that was MESS","Everyone say PEYNIRRRRRR","Clam chowder zamaniiiii","I really enjoyed that day and I looked gooood","Askim o neeee uzay araci miii"]
  },

  venice: {
    coords:[45.43876, 12.32715],
    title:"Venice 🇮🇹",
    text:"",
    images: imgList("venice1.JPG","venice2.JPG","venice3.JPG"),
    notes: ["Venezia","Daha cok Venezia","Sapsal bir Venezia"]
  },

  vicenza: {
    coords:[45.54672, 11.54750],
    title:"Vicenza 🇮🇹",
    text:"",
    images: imgList("vicenza1.jpg","vicenza2.jpg"),
    notes: ["#healthy life","one of the klasik Caroline picture"]
  },

  zadar: {
    coords:[44.11972, 15.24222],
    title:"Zadar 🇭🇷",
    text:"",
    images: imgList("zadar1.jpg"),
    notes: ["Sucha. Nice picture"]
  },

  seoul: {
    coords:[37.56600, 126.97840],
    title:"Seoul 🇰🇷",
    text:"",
    images: imgList(),
    notes: []
  }
};

const routeOrder = [
  "seattle",
  "istria","ljubljana","padova","vicenza","marostica","venice",
  "luxembourg","metz","paris","amsterdam",
  "zadar","milan","roma","pisa","florence","napoli","palermo","garda",
  "barcelona","ibiza",
  "antalya","denizli","adana","antep",
  "bucharest","amsterdam",
  "everglades","miami",
  "grandcanyon","sandiego","losangeles",
  "seoul"
];

let openedCities = [];

function initMapOnce() {
  if (mapInitialized) return;

  map = L.map('map').setView([30, 10], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  const heartIcon = L.icon({ iconUrl: 'images/red.png', iconSize: [35, 35] });
  const blueIcon  = L.icon({ iconUrl: 'images/blue.png', iconSize: [35, 35] });
  const purpleIcon= L.icon({ iconUrl: 'images/purple.png', iconSize: [35, 35] });

  const start = cities.seattle.coords;
  const end   = cities.seoul.coords;

  const lovePath = L.polyline([start, end], {
    color: "#ff4d88",
    weight: 4,
    opacity: 0.9,
    dashArray: "10 10",
    lineCap: "round"
  }).addTo(map);

  Object.keys(cities).forEach(cityKey => {
    const city = cities[cityKey];
    let iconToUse = heartIcon;

    if (cityKey === "seattle") iconToUse = blueIcon;
    if (cityKey === "seoul")   iconToUse = purpleIcon;

    const marker = L.marker(city.coords, { icon: iconToUse }).addTo(map);

    marker.on("click", function() {
      map.flyTo(city.coords, 7);

      document.getElementById("cityTitle").innerText = city.title;
      document.getElementById("cityText").innerHTML = city.text || "💞";

      const gallery = document.getElementById("gallery");
      gallery.innerHTML = "";

      (city.images || []).forEach((img, idx) => {
        const fig = document.createElement("figure");
        fig.className = "photoCard";

        const image = document.createElement("img");
        image.src = "images/" + img;
        image.alt = city.title + " photo " + (idx+1);

        const cap = document.createElement("p");
        cap.className = "photoNote";
        cap.innerText = (city.notes && city.notes[idx]) ? city.notes[idx] : "";

        fig.appendChild(image);
        fig.appendChild(cap);
        gallery.appendChild(fig);
      });

      document.getElementById("cityPanel").classList.remove("hidden");

      if (!openedCities.includes(cityKey)) {
        openedCities.push(cityKey);
        marker.setOpacity(0.55);
      }

      checkTravelCompletion();
    });
  });

  try { map.fitBounds(lovePath.getBounds(), { padding: [30, 30] }); } catch(e){}
  mapInitialized = true;
}

function backToMap() {
  document.getElementById("cityPanel").classList.add("hidden");
  map.setView([30, 10], 2);
}

function checkTravelCompletion() {
  if (openedCities.length === Object.keys(cities).length && !progress.travel) {
    progress.travel = true;

    const gameBtn = document.getElementById("gameBtn");
    gameBtn.disabled = false;
    gameBtn.innerText = "🎮 Game";
    gameBtn.onclick = () => goToGame();

    const cont = document.getElementById("travelContinue");
    cont.classList.remove("hidden");
    cont.classList.add("sparkleOn");

    alert("Travel complete! Mini Game unlocked 🎮❤️");
  }
}

function skipTravel(){
  progress.travel = true;

  const gameBtn = document.getElementById("gameBtn");
  gameBtn.disabled = false;
  gameBtn.innerText = "🎮 Game";
  gameBtn.onclick = () => goToGame();

  const cont = document.getElementById("travelContinue");
  cont.classList.remove("hidden");
  cont.classList.add("sparkleOn");
}

/***********************
  QUIZ
************************/
let quizIndex = 0;
let score = 0;

const quiz = [
  { q:"What is the first dish you told me that you will prepare for me ?", options:["World famous pizza","Cigkofte","Taco"], correct:0 },
  { q:"Who said 'I love you' first?", options:["You","Me","We both same time"], correct:2 },
  { q:"Ben sinirlenince ne yaparım?", options:["Sessiz kalırım","Trip atarım 😏","Gülerim"], correct:1 },
  { q:"Our longest call lasted how long?", options:["1 hour","3 hours","Too long 😅"], correct:2 },
  { q:"Who is more funny?", options:["You","Me","We don’t talk about it 😏"], correct:0 },
  { q:"Ben en çok neyi severim?", options:["Food","Sleep","You ❤️"], correct:2 },
  { q:"Who falls asleep first?", options:["You","Me","Both"], correct:0 },
  { q:"Biz en çok neye güleriz?", options:["Random şeylere","Birbirimize","Her şeye 😂"], correct:2 },
  { q:"My favorite thing about you?", options:["Smile","Eyes","Everything"], correct:2 },
  { q:"Biz kavga edince ne olur?", options:["Susarız","Güleriz","Barışırız ❤️"], correct:2 },
  { q:"What do I miss the most?", options:["Your voice","Your hugs","Everything about you"], correct:2 },
  { q:"Who is more dramatic?", options:["You 😏","Me 😇","Both"], correct:2},
  { q:"En sevdiğim yemek?", options:["Sen","cig köfte ","Both  😂"], correct:2 },
  { q:"What would we do if we were together now?", options:["Eat","Watch something","Just hug ❤️"], correct:2 },
  { q:"Who loves more?", options:["You","Me","We both infinite ❤️"], correct:2 },
  { q:"En çok neyi özlüyorum?", options:["Sesini","Seni","Her şeyini"], correct:2 },
  { q:"Bizim ilişki nasıl?", options:["Normal","Tatlı","Delice güzel 😍"], correct:2 },
  { q:"What are we best at?", options:["Loving","Laughing","Both"], correct:2 },
  { q:"Distance means?", options:["Nothing","Hard","Temporary"], correct:2 },
  { q:"What are we?", options:["Couple","Team","Forever ❤️"], correct:2 }
];

function goToGame(){
  const bg = document.getElementById("bgMusic");
  const qm = document.getElementById("quizMusic");
  bg.pause();
  safePlay(qm);
  document.getElementById("musicToggle").innerText = "🔊 Music: ON";

  showSection("game");

  quizIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const box = document.getElementById("quizBox");
  const current = quiz[quizIndex];

  box.style.animation = "none";
  box.offsetHeight;
  box.style.animation = "fadeSlide 0.6s ease";

  const feedback = document.getElementById("feedback");
  feedback.classList.remove("good","bad","pop");
  feedback.innerText = "";

  const pct = Math.round((quizIndex / quiz.length) * 100);
  const bar = document.getElementById("progressBar");
  bar.classList.remove("pulse");
  void bar.offsetWidth;
  bar.style.width = pct + "%";
  bar.classList.add("pulse");

  const qEl = document.getElementById("question");
  qEl.classList.remove("quizIn");
  void qEl.offsetWidth;
  qEl.innerText = current.q;
  qEl.classList.add("quizIn");

  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((btn, i) => {
    btn.classList.remove("correct","wrong","quizIn","ripple");
    btn.disabled = false;
    btn.innerText = current.options[i];

    setTimeout(() => {
      btn.classList.add("quizIn");
    }, 60 * i);
  });

  document.getElementById("nextQuestionBtn").classList.add("hidden");
}

function answer(i, btnEl, ev) {
  const current = quiz[quizIndex];
  const feedback = document.getElementById("feedback");
  const box = document.getElementById("quizBox");

  if (btnEl){
    const r = btnEl.getBoundingClientRect();
    const cx = ev?.clientX ?? (r.left + r.width/2);
    const cy = ev?.clientY ?? (r.top + r.height/2);
    const x = (cx - r.left) / r.width * 100;
    const y = (cy - r.top) / r.height * 100;
    btnEl.style.setProperty("--x", x + "%");
    btnEl.style.setProperty("--y", y + "%");
    btnEl.classList.add("ripple");
    setTimeout(()=> btnEl.classList.remove("ripple"), 220);
  }

  box.classList.remove("shake","winGlow");
  void box.offsetWidth;

  feedback.classList.remove("good","bad","pop");

  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(b => {
    b.disabled = true;
    b.classList.remove("correct","wrong");
  });

  const correctBtn = buttons[current.correct];

  const goodMsgs = [
    "Correct 😍 Perfect!",
    "Yesss 😏 bunu biliyorsun!",
    "Aşırı iyi ❤️",
    "We are so us 😂✅"
  ];
  const badMsgs = [
    "Wrong 😈 hahaha nope!",
    "Yok yaaaa 😭 tekrar düşün!",
    "Bu nasıl kaçtı 😏❌",
    "Nope 😂 ama yine de seviyorum"
  ];

  if (i === current.correct) {
    if (btnEl) btnEl.classList.add("correct");
    box.classList.add("winGlow");
    score++;

    feedback.innerText = goodMsgs[Math.floor(Math.random()*goodMsgs.length)];
    feedback.classList.add("good","pop");
  } else {
    if (btnEl) btnEl.classList.add("wrong");
    if (correctBtn) correctBtn.classList.add("correct");
    box.classList.add("shake");

    feedback.innerText = badMsgs[Math.floor(Math.random()*badMsgs.length)];
    feedback.classList.add("bad","pop");
  }

  const bar = document.getElementById("progressBar");
  const pctAfter = Math.round(((quizIndex + 1) / quiz.length) * 100);
  setTimeout(() => {
    bar.classList.remove("pulse");
    void bar.offsetWidth;
    bar.style.width = pctAfter + "%";
    bar.classList.add("pulse");
  }, 120);

  document.getElementById("nextQuestionBtn").classList.remove("hidden");
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex < quiz.length) loadQuestion();
  else showQuizResult();
}

function showQuizResult() {
  document.getElementById("progressBar").style.width = "100%";
  progress.game = true;

  const inboxBtn = document.getElementById("inboxBtn");
  inboxBtn.disabled = false;
  inboxBtn.innerText = "💌 Inbox";
  inboxBtn.onclick = () => goToInbox();

  const msg = (score >= 15)
    ? "Okay wow… you actually know us 😍"
    : "I still love you even if you failed 😏";

  document.getElementById("quizBox").innerHTML = `
    <h2>You scored ${score}/${quiz.length} ❤️</h2>
    <p>${msg}</p>
    <button class="sparkleBtn sparkleOn" onclick="goToInbox()">Continue ➜ Love Inbox 💌</button>
  `;
}

/***********************
 /* ---------- LOVE INBOX (MONTHLY + SPECIAL DATES + MODAL + TYPING + CONFETTI) ---------- */

const trMonths = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
function pad2(n){ return String(n).padStart(2,"0"); }
function isoDate(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function formatDateTR(d){ return `${d.getDate()} ${trMonths[d.getMonth()]} ${d.getFullYear()}`; }

function addMonthsKeepDay(dateObj, plusMonths, fixedDay = 10){
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const target = new Date(y, m + plusMonths, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth()+1, 0).getDate();
  target.setDate(Math.min(fixedDay, lastDay));
  return target;
}

// START: 10 Dec 2022
const startDate = new Date(2022, 11, 10);

// “Monthly list end”: this month’s 10th
const nowDate = new Date();
const monthlyEnd = new Date(nowDate.getFullYear(), nowDate.getMonth(), 10);

// number of months inclusive
function monthsBetween(start, end){
  return (end.getFullYear()-start.getFullYear())*12 + (end.getMonth()-start.getMonth()) + 1;
}
const totalMonths = monthsBetween(startDate, monthlyEnd);

const specialByDate = {
  "2024-03-24": {
    tag: "SPECIAL 💍",
    title: "Proposal 💍",
    body: `This day changed everything.<br><br>
           You asked… and my heart and my eyes said YES before my mouth did 😭❤️<br>
           Bu gün: “Evet.” 💍`
  },
  "2024-12-10": {
    tag: "SPECIAL 🎰",
    title: "Vegas Wedding 🎰",
    body: `Vegas… crazy, iconic, unforgettable 😂❤️<br><br>
           We said yes in the most “US” way. 🎰✨<br>
           Vegas düğünü = efsane.`
  },
  "2025-06-06": {
    tag: "SPECIAL 🌊",
    title: "TR Wedding 🌊",
    body: `Sun, sea, and us… officially forever ❤️<br><br>
           Turkiye düğünü… kalbimin en güzel günü. 🌊✨`
  },
  "2026-02-14": {
    tag: "SPECIAL ❤️",
    title: "14 Şubat ❤️",
    body: `Bugün 14 Şubat ❤️<br><br>
           <b>Sen benim en güzel “iyi ki”msin.</b><br><br>
           Mesafe bazen zor ama beni senden uzaklaştıramıyor.<br>
           Sen benim hayatımın anlamı, güneşim, maymunumsun.<br>
           Ben seni her gün yeniden seçiyorum.<br><br>
           <i>14 Şubat 2026</i>`
  }
};

/* Unique monthly bodies (tekrar yok) */

function uniqueMonthlyBody(i, label){
  const monthlyBodies = [
`Some loves begin with fireworks… ours began with a “wait… this feels familiar” moment. 🇮🇹❤️<br><br>
O gün içimde bir şey dedi ki: “Tamam… bu kişi.”<br><br><i>${label}</i>`,

`This month I miss you in a quiet way… like a song playing in the background all day-UNTIL I FOUND YOU-.<br><br>
Özlemek bazen bağırmıyor… içten içe yakıyor.<br><br><i>${label}</i>`,

`If I could press one button today, it would be: <b>Teleport to your arms</b> 😭❤️<br><br>
Seni sarınca bütün dünya susuyor ya… onu özledim.<br><br><i>${label}</i>`,

`I love how we can be silly for hours and then suddenly talk about forever.<br><br>
Biz “gülmek + derinlik” karışımıyız. 😌<br><br><i>${label}</i>`,

`Tiny truth: I still replay our Italy start like it’s the trailer of our movie. 🎬🇮🇹<br><br>
Her şey orada başladı… ve ben “iyi ki” diyorum.<br><br><i>${label}</i>`,

`This month’s message is simple:<br><b>Even when life gets loud, you are my calm.</b><br><br>
Sen benim sakinliğimsin. ❤️<br><br><i>${label}</i>`,

`I miss you even when I see good food… because my first thought is: “We should try this together.” 😭🍝<br><br>
Yemek bile seni hatırlatıyor… normal mi bu? <br><br><i>${label}</i>`,

`If hugs had a currency, I’d be broke… because I’d spend them all on you. 💋<br><br>
Sarılmak istiyorum. Çok.<br><br><i>${label}</i>`,

`This month I’m proud of us.<br>
Because we didn’t choose easy… we chose <b>real</b>.<br><br>
Kolay değildi ama gerçekti. ❤️<br><br><i>${label}</i>`,

`One thing I know for sure: when I picture “home”… I picture you.<br><br>
Cunku sen benim sensin. ❤️<br><br><i>${label}</i>`,

`This month’s mood: <b>soft love</b> + <b>stubborn patience</b>.<br><br>
Sabır var… ama aşk daha çok. 😌<br><br><i>${label}</i>`,

`I love that we’re a team even from far away.<br><br>
Mesafe var diye “biz” gitmiyor. 🫶<br><br><i>${label}</i>`,

`This month I want to tell you something you forget sometimes:<br><b>I believe in you.</b><br><br>
Sana güveniyorum. Hep. ❤️<br><br><i>${label}</i>`,

`I love you in two languages and one heart.<br><br>
İngilizce de desem… Türkçe de desem… aynı yerden: kalbimden. ❤️<br><br><i>${label}</i>`,

`Sometimes I don’t need a big plan…<br>
I just need a normal day with you in it.<br><br>
Normal gün + sen = cennet. ❤️<br><br><i>${label}</i>`,

`This month’s truth:<br>
<b>You are still my best decision.</b> ❤️<br><br>
En doğru kararım sensin. 😌<br><br><i>${label}</i>`,

`All I need is you and Choco and maybe other kids :<br>
<b>But mostly you</b> ❤️<br><br>
Seni seviyorum bitanem 😌<br><br><i>${label}</i>`,

/* ✅ NEW UNIQUE ONES (17 -> 39 tamamlamak için 22 tane) */

`This month’s fantasy:<br>
We find a Italian restaurant, order carbonara, and I steal from your plate like it’s my job 🍝😏<br><br>
Sen de “kızıyorum” gibi yapıp daha çok veriyosun.<br><br><i>${label}</i>`,

`Fortnite moment of the month 🎮:<br>
Even if the whole lobby targets us… we still win(RARELY) because we play as a duo 😌❤️<br><br>
Biz squad değiliz… biz “forever duo”yuz.<br><br><i>${label}</i>`,

`This month I miss your voice the most.<br>
Not the “hello”… the random little sounds you make when you’re thinking 😭❤️<br><br>
O minik anlar var ya… onlar kalbime yapışık.<br><br><i>${label}</i>`,

`I want a day where we do absolutely nothing productive.<br>
Just snacks, blanket, Fortenneightengen and you being annoying in the cutest way 😌😂<br><br>
Plan: tembellik + aşk.<br><br><i>${label}</i>`,

`This month’s “I can’t wait” list:<br>
• your arms<br>
• your smell<br>
• laughing until we cry<br><br>
Üçü de acil ihtiyaç. ❤️<br><br><i>${label}</i>`,

`I saw something funny and my brain instantly went:<br>
“Send to him.”<br><br>
You should checked your instagram . So many funny video waiting for you. 😭😂<br><br><i>${label}</i>`,

`This month I’m grateful for one thing:<br>
Even when we’re far, we still feel close.<br><br>
Mesafe var ama bağ daha güçlü. ❤️<br><br><i>${label}</i>`,

`Fortnite reference #2 😈:<br>
You’re the only person I’d reboot instantly, no questions asked.<br><br>
Benim için “revive” sensin. ❤️<br><br><i>${label}</i>`,

`This month I want to collect little “us” moments again…<br>
like matching smiles, accidental hand touches, and stupid jokes in public 😌❤️<br><br><i>${label}</i>`,

`I miss the way you look at me when you’re proud.<br>
It makes me feel safe… like I can do anything. 🫶<br><br>
Senin bakışın = güç.<br><br><i>${label}</i>`,

`Our dream trip reminder: <b>Iceland</b> 🇮🇸✨<br><br>
Northern lights above us, hot chocolate in our hands, and you saying “soğuk” every 2 minutes 😂❤️<br><br><i>${label}</i>`,

`This month’s promise:<br>
No matter how busy life gets, I won’t stop choosing you.<br><br>
Seçimim sensin. Her seferinde. ❤️<br><br><i>${label}</i>`,

`Some days I don’t even miss “a place”…<br>
I miss <b>your presence</b>.<br><br>
Yanımda olsan yeterdi. 😌❤️<br><br><i>${label}</i>`,

`This month I want a “date” that’s not fancy:<br>
Grocery shopping together and arguing about snacks 😂🛒<br><br>
En romantik şey: normal hayatı birlikte yaşamak.<br><br><i>${label}</i>`,

`I love your mind.<br>
It’s my favorite place to get lost in.<br><br>
Kafanın içi… benim evim gibi. ❤️<br><br><i>${label}</i>`,

`This month’s message is a small one:<br>
<b>Come back to me, okay?</b><br><br>
Dön bana… hep. ❤️<br><br><i>${label}</i>`,

`Restaurant vibe #2 :<br>
We sit by the window, you pretend you’re “not hungry”… then you finish half my dessert 😏🍰<br><br>
Ve ben buna bayılıyorum.<br><br><i>${label}</i>`,

`This month I miss your hands not the tickle monster.<br>
They feel like “home” in a way I can’t explain. 🫶<br><br>
Evim sensin ya… o yüzden.<br><br><i>${label}</i>`,

`If love had a sound, ours would be laughter.<br><br>
Bizim ilişkide en çok “gülüş” var. ❤️😂<br><br><i>${label}</i>`,

`Love means sometimes lie…<br>
Like how I lied you today, you shouldn't know I was working on it but see it worth it  (HOPEFULLY) ❤️ <br><br><i>${label}</i>`,

`I want to take pictures with you again.<br>
Not perfect ones… just real ones.<br><br>
Gerçek anlar… bizim en güzelimiz. ❤️<br><br><i>${label}</i>`,

`This month’s final note:<br>
Even when it’s hard, I still feel lucky.<br><br>
Çünkü “sen” varsın. ❤️<br><br><i>${label}</i>`
  ];

  if (i < monthlyBodies.length) return monthlyBodies[i];

  // fallback (artık teorik olarak gerek kalmayacak ama dursun)
  return `This month’s note is just this:<br><b>I’m here.</b><br><br>
Ben buradayım… ve seni seviyorum. ❤️<br><br><i>${label}</i>`;
}



/* 1) Build a map by date so we can replace monthly with special if same date */
const mailByIso = new Map();

/* Monthly: every month on 10th */
for(let i=0;i<totalMonths;i++){
  const d = addMonthsKeepDay(startDate, i, 10);
  const key = isoDate(d);
  const label = formatDateTR(d);

  mailByIso.set(key, {
    date: new Date(d),
    tag: `Open me #${i+1}`,
    isSpecial: false,
    title: `${label}`,
    body: uniqueMonthlyBody(i, label)
  });
}

/* Specials: add/override at exact dates */
Object.keys(specialByDate).forEach(key => {
  const sp = specialByDate[key];
  const parts = key.split("-").map(Number);
  const d = new Date(parts[0], parts[1]-1, parts[2]);
  const label = formatDateTR(d);

  mailByIso.set(key, {
    date: d,
    tag: sp.tag,
    isSpecial: true,
    title: `${label} — ${sp.title}`,
    body: `${sp.body}<br><br><i>${label}</i>`
  });
});

/* 2) Make final sorted array */
const mails = Array.from(mailByIso.values())
  .sort((a,b) => a.date - b.date);

/* 3) Inbox state */
let openedMails = new Set();
let typingTimer = null;

function renderMailList(){
  const list = document.getElementById("mailList");
  list.innerHTML = "";

  mails.forEach((m, idx) => {
    const btn = document.createElement("button");
    btn.className = "mailBtn";
    btn.onclick = () => openMail(idx);

    const opened = openedMails.has(idx);
    btn.innerHTML = `
      <div class="tag">${m.tag} ${opened ? "✅" : "✉️"}</div>
      <div class="title">${m.title}</div>
    `;
    list.appendChild(btn);
  });
}

function goToInbox(){
  const qm = document.getElementById("quizMusic");
  qm.pause();
  safePlay(document.getElementById("bgMusic"));
  document.getElementById("musicToggle").innerText = "🔊 Music: ON";

  showSection("inbox");
  renderMailList();

  document.getElementById("inboxContinue").classList.add("hidden");
  closeMail();
}

function openMail(i){
  openedMails.add(i);
  renderMailList();

  const m = mails[i];
  document.getElementById("mailMeta").innerText = m.tag;
  document.getElementById("mailTitle").innerText = m.title;

  const modal = document.getElementById("mailModal");
  modal.classList.remove("hidden");

  // typing effect
  typeHTML(document.getElementById("mailBody"), m.body, 16, () => {
    // ✅ confetti for specials (like before)
    if (m.isSpecial) burstConfetti();
  });

  checkInboxCompletion();
}

function closeMail(){
  const modal = document.getElementById("mailModal");
  if (!modal) return;
  modal.classList.add("hidden");

  if (typingTimer) clearInterval(typingTimer);
  typingTimer = null;

  const sp = document.getElementById("mailSparkles");
  if (sp) sp.innerHTML = "";
}

function checkInboxCompletion(){
  if (openedMails.size === mails.length && !progress.inbox){
    progress.inbox = true;

    const finalBtn = document.getElementById("finalBtn");
    finalBtn.disabled = false;
    finalBtn.innerText = "🎬 Final";
    finalBtn.onclick = () => goToFinal();

    const cont = document.getElementById("inboxContinue");
    cont.classList.remove("hidden");
  }
}

/* Typing effect */
function typeHTML(el, html, speedMs = 18, onDone = null){
  if (typingTimer) clearInterval(typingTimer);

  const tmp = document.createElement("div");
  tmp.innerHTML = html.replaceAll("<br>", "\n");
  const text = tmp.textContent || "";

  el.textContent = "";
  let idx = 0;

  typingTimer = setInterval(() => {
    el.textContent += text[idx] || "";
    idx++;

    if (idx >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      el.innerHTML = html;
      if (onDone) onDone();
    }
  }, speedMs);
}

/* Confetti hearts */
function burstConfetti(){
  const wrap = document.getElementById("mailSparkles");
  if (!wrap) return;
  wrap.innerHTML = "";

  const hearts = ["💖","💘","💗","✨","🎉","💞","💓"];
  for(let i=0;i<30;i++){
    const s = document.createElement("span");
    s.className = "confettiHeart";
    s.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    s.style.left = Math.floor(Math.random()*90 + 5) + "%";
    s.style.animationDuration = (1.0 + Math.random()*0.9) + "s";
    s.style.fontSize = (14 + Math.random()*18) + "px";
    wrap.appendChild(s);
  }

  setTimeout(()=>{ wrap.innerHTML=""; }, 1800);
}
/***********************
  FINAL
************************/
function goToFinal(){
  showSection("final");

  const video = document.getElementById("finalVideo");
  if(video){
    video.currentTime = 0;
    video.play().catch(()=>{});
  }
}

// Auto unlock everything for testing
// Auto unlock everything for testing
window.addEventListener("DOMContentLoaded", () => {
  setupFinalVideoConfetti();        // ✅ bunu ekle
  if (TEST_MODE) unlockAllForTest();
});


function setupFinalVideoConfetti(){
  const v = document.getElementById("finalVideo");
  const finalWrap = document.querySelector("#final .finalContainer");
  if (!v || !finalWrap) return;

  // final için confetti container ekle (yoksa)
  let wrap = document.getElementById("finalSparkles");
  if (!wrap){
    wrap = document.createElement("div");
    wrap.id = "finalSparkles";
    finalWrap.appendChild(wrap);
  }

  // final confetti fonksiyonu (mailSparkles yerine finalSparkles’a basar)
  function burstFinalConfetti(){
    wrap.innerHTML = "";
    const hearts = ["💖","💘","💗","✨","🎉","💞","💓"];
    for(let i=0;i<34;i++){
      const s = document.createElement("span");
      s.className = "confettiHeart";
      s.textContent = hearts[Math.floor(Math.random()*hearts.length)];
      s.style.left = Math.floor(Math.random()*90 + 5) + "%";
      s.style.animationDuration = (1.0 + Math.random()*0.9) + "s";
      s.style.fontSize = (14 + Math.random()*18) + "px";
      wrap.appendChild(s);
    }
    setTimeout(()=>{ wrap.innerHTML=""; }, 2000);
  }

  v.addEventListener("ended", () => {
    burstFinalConfetti();
  });
}