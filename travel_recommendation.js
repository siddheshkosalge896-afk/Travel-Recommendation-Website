let travelData = {};
let currentView = [];
let currentSort = "default";
let currentCurrency = "INR"; // INR or USD

const FAVORITES_KEY = "travelExplorerFavorites";
const PLAN_KEY      = "travelExplorerPlan";
const THEME_KEY     = "travelExplorerTheme";
const CURRENCY_KEY  = "travelExplorerCurrency";

/* ── Category icons ── */
const CATEGORY_ICONS = {
  "Beach":   "fa-umbrella-beach",
  "Temple":  "fa-place-of-worship",
  "Country": "fa-earth-americas"
};

/* ── Facts ── */
const FACTS = {
  "Maldives Beach":              "Made up of over 1,000 coral islands.",
  "Goa Beach":                   "Best visited November – February for sunny skies.",
  "Bora Bora Beach":             "Famous for its iconic overwater bungalow resorts.",
  "Whitehaven Beach":            "98% pure silica sand — stays cool even in summer.",
  "Navagio Beach":               "Only reachable by boat — no road access at all.",
  "Copacabana Beach":            "Stretches nearly 4 km along Rio's Atlantic coastline.",
  "Radhanagar Beach":            "Voted Asia's best beach by Time magazine.",
  "Varkala Beach":               "Natural mineral springs flow directly onto the beach.",
  "Palolem Beach":               "One of Goa's quietest and most picturesque shores.",
  "Marina Beach":                "13 km long — second longest urban beach in the world.",
  "Golden Temple":               "Serves free langar (meals) to 100,000 people daily.",
  "Meenakshi Temple":            "Has over 33,000 sculptures across its gopurams.",
  "Angkor Wat":                  "The largest religious monument in the world.",
  "Kinkaku-ji (Golden Pavilion)":"Top two floors are covered in real gold leaf.",
  "Borobudur":                   "Built from 2 million stone blocks without any mortar.",
  "Prambanan":                   "Its main tower rises over 47 metres into the sky.",
  "Tirupati Balaji Temple":      "Receives around 100,000 pilgrims every single day.",
  "Somnath Temple":              "Destroyed and rebuilt six times throughout history.",
  "Kedarnath Temple":            "Sits at 3,583 m — open only May to November.",
  "Brihadeeswarar Temple":       "The shadow of its tower never falls on the ground.",
  "Japan":                       "Has more than 6,800 islands.",
  "Switzerland":                 "Home to over 1,500 lakes.",
  "Italy":                       "Has more UNESCO World Heritage Sites than any country.",
  "New Zealand":                 "Two main islands span nearly every climate zone.",
  "Iceland":                     "Runs almost entirely on renewable energy.",
  "Greece":                      "Has over 6,000 islands, about 200 inhabited."
};

/* ── Ratings ── */
const RATINGS = {
  "Maldives Beach":5,"Goa Beach":4,"Bora Bora Beach":5,"Whitehaven Beach":5,
  "Navagio Beach":4,"Copacabana Beach":4,
  "Radhanagar Beach":5,"Varkala Beach":4,"Palolem Beach":4,"Marina Beach":4,
  "Golden Temple":5,"Meenakshi Temple":5,"Angkor Wat":5,
  "Kinkaku-ji (Golden Pavilion)":5,"Borobudur":4,"Prambanan":4,
  "Tirupati Balaji Temple":5,"Somnath Temple":5,"Kedarnath Temple":5,"Brihadeeswarar Temple":5,
  "Japan":5,"Switzerland":5,"Italy":5,"New Zealand":4,"Iceland":4,"Greece":5
};

/* ── Best time ── */
const BEST_TIME = {
  "Maldives Beach":"Nov – Apr","Goa Beach":"Nov – Feb","Bora Bora Beach":"May – Oct",
  "Whitehaven Beach":"Jun – Aug","Navagio Beach":"Jun – Sep","Copacabana Beach":"Dec – Mar",
  "Radhanagar Beach":"Oct – May","Varkala Beach":"Oct – Mar","Palolem Beach":"Nov – Feb",
  "Marina Beach":"Nov – Feb",
  "Golden Temple":"Oct – Mar","Meenakshi Temple":"Oct – Feb","Angkor Wat":"Nov – Feb",
  "Kinkaku-ji (Golden Pavilion)":"Mar – May","Borobudur":"May – Sep","Prambanan":"May – Oct",
  "Tirupati Balaji Temple":"Sep – Feb","Somnath Temple":"Oct – Feb",
  "Kedarnath Temple":"May – Nov","Brihadeeswarar Temple":"Oct – Feb",
  "Japan":"Mar – May","Switzerland":"Jun – Sep","Italy":"Apr – Jun",
  "New Zealand":"Dec – Feb","Iceland":"Jun – Aug","Greece":"May – Oct"
};

/* ── Prices in INR & USD ── */
const PRICE_INR = {
  "Maldives Beach":"₹₹₹₹","Goa Beach":"₹","Bora Bora Beach":"₹₹₹₹",
  "Whitehaven Beach":"₹₹₹","Navagio Beach":"₹₹","Copacabana Beach":"₹₹",
  "Radhanagar Beach":"₹₹","Varkala Beach":"₹","Palolem Beach":"₹","Marina Beach":"₹",
  "Golden Temple":"₹","Meenakshi Temple":"₹","Angkor Wat":"₹₹",
  "Kinkaku-ji (Golden Pavilion)":"₹₹₹","Borobudur":"₹₹","Prambanan":"₹₹",
  "Tirupati Balaji Temple":"₹","Somnath Temple":"₹","Kedarnath Temple":"₹₹",
  "Brihadeeswarar Temple":"₹",
  "Japan":"₹₹₹","Switzerland":"₹₹₹₹","Italy":"₹₹₹",
  "New Zealand":"₹₹₹","Iceland":"₹₹₹₹","Greece":"₹₹"
};

const PRICE_USD = {
  "Maldives Beach":"$$$$","Goa Beach":"$","Bora Bora Beach":"$$$$",
  "Whitehaven Beach":"$$$","Navagio Beach":"$$","Copacabana Beach":"$$",
  "Radhanagar Beach":"$$","Varkala Beach":"$","Palolem Beach":"$","Marina Beach":"$",
  "Golden Temple":"$","Meenakshi Temple":"$","Angkor Wat":"$$",
  "Kinkaku-ji (Golden Pavilion)":"$$$","Borobudur":"$$","Prambanan":"$$",
  "Tirupati Balaji Temple":"$","Somnath Temple":"$","Kedarnath Temple":"$$",
  "Brihadeeswarar Temple":"$",
  "Japan":"$$$","Switzerland":"$$$$","Italy":"$$$",
  "New Zealand":"$$$","Iceland":"$$$$","Greece":"$$"
};

/* Approximate trip cost per person in both currencies */
const TRIP_COST_INR = {
  "Maldives Beach":"₹1,50,000+","Goa Beach":"₹8,000–₹20,000",
  "Bora Bora Beach":"₹2,00,000+","Whitehaven Beach":"₹80,000–₹1,20,000",
  "Navagio Beach":"₹40,000–₹70,000","Copacabana Beach":"₹50,000–₹80,000",
  "Radhanagar Beach":"₹15,000–₹30,000","Varkala Beach":"₹5,000–₹12,000",
  "Palolem Beach":"₹6,000–₹15,000","Marina Beach":"₹3,000–₹8,000",
  "Golden Temple":"₹3,000–₹8,000","Meenakshi Temple":"₹4,000–₹10,000",
  "Angkor Wat":"₹30,000–₹60,000","Kinkaku-ji (Golden Pavilion)":"₹70,000–₹1,20,000",
  "Borobudur":"₹25,000–₹50,000","Prambanan":"₹25,000–₹50,000",
  "Tirupati Balaji Temple":"₹2,000–₹6,000","Somnath Temple":"₹5,000–₹12,000",
  "Kedarnath Temple":"₹8,000–₹20,000","Brihadeeswarar Temple":"₹4,000–₹8,000",
  "Japan":"₹1,00,000–₹1,80,000","Switzerland":"₹1,50,000–₹2,50,000",
  "Italy":"₹90,000–₹1,60,000","New Zealand":"₹1,10,000–₹1,80,000",
  "Iceland":"₹1,20,000–₹2,00,000","Greece":"₹55,000–₹1,00,000"
};

const TRIP_COST_USD = {
  "Maldives Beach":"$1,800+","Goa Beach":"$100–$250",
  "Bora Bora Beach":"$2,400+","Whitehaven Beach":"$960–$1,440",
  "Navagio Beach":"$480–$840","Copacabana Beach":"$600–$960",
  "Radhanagar Beach":"$180–$360","Varkala Beach":"$60–$144",
  "Palolem Beach":"$72–$180","Marina Beach":"$36–$96",
  "Golden Temple":"$36–$96","Meenakshi Temple":"$48–$120",
  "Angkor Wat":"$360–$720","Kinkaku-ji (Golden Pavilion)":"$840–$1,440",
  "Borobudur":"$300–$600","Prambanan":"$300–$600",
  "Tirupati Balaji Temple":"$24–$72","Somnath Temple":"$60–$144",
  "Kedarnath Temple":"$96–$240","Brihadeeswarar Temple":"$48–$96",
  "Japan":"$1,200–$2,160","Switzerland":"$1,800–$3,000",
  "Italy":"$1,080–$1,920","New Zealand":"$1,320–$2,160",
  "Iceland":"$1,440–$2,400","Greece":"$660–$1,200"
};

const PRICE_LABELS = { "₹":"Budget","₹₹":"Mid-range","₹₹₹":"Premium","₹₹₹₹":"Luxury","$":"Budget","$$":"Mid-range","$$$":"Premium","$$$$":"Luxury" };

/* ════════════════════════════════
   CURRENCY TOGGLE
════════════════════════════════ */
function getCurrentPrice(name) {
  return currentCurrency === "INR" ? (PRICE_INR[name]||"₹₹") : (PRICE_USD[name]||"$$");
}
function getCurrentCost(name) {
  return currentCurrency === "INR" ? (TRIP_COST_INR[name]||"Contact us") : (TRIP_COST_USD[name]||"Contact us");
}

function setCurrency(cur) {
  currentCurrency = cur;
  localStorage.setItem(CURRENCY_KEY, cur);
  // Update toggle button UI
  document.querySelectorAll(".currency-btn").forEach(b => b.classList.toggle("active", b.dataset.currency === cur));
  // Re-render cards if results are showing
  if (currentView.length > 0) renderCards(currentView, false);
}

/* ════════════════════════════════
   THEME
════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML = theme === "light" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  btn.title = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(cur === "dark" ? "light" : "dark");
}

/* ════════════════════════════════
   HELPERS
════════════════════════════════ */
function cssEscape(s) { return s.replace(/(["\\])/g,"\\$1"); }

function buildStars(name, size) {
  const r = RATINGS[name] || 4;
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<i class="${i<=r?"fa-solid":"fa-regular"} fa-star"></i>`;
  return `<div class="star-row"${size?` style="font-size:${size}"`:""}>` + s + `</div>`;
}

function buildBestTimeBadge(name) {
  const t = BEST_TIME[name]; if (!t) return "";
  return `<div class="best-time-badge"><i class="fa-solid fa-calendar-days"></i> Best: ${t}</div>`;
}

function buildPriceBadge(name) {
  const p = getCurrentPrice(name); if (!p) return "";
  return `<div class="price-badge">${p}</div>`;
}

function isIndian(place) {
  return place.country === "India";
}

/* ════════════════════════════════
   FAVOURITES
════════════════════════════════ */
function getFavorites() { try { return JSON.parse(localStorage.getItem(FAVORITES_KEY))||[]; } catch(e) { return []; } }
function saveFavorites(l) { localStorage.setItem(FAVORITES_KEY, JSON.stringify(l)); }
function isFavorite(n) { return getFavorites().includes(n); }

function toggleFavorite(name) {
  let f = getFavorites();
  f = f.includes(name) ? f.filter(n => n !== name) : [...f, name];
  saveFavorites(f);
  refreshFavoriteButtons(name);
}

function refreshFavoriteButtons(name) {
  const active = isFavorite(name);
  document.querySelectorAll(`.fav-btn[data-name="${cssEscape(name)}"]`).forEach(btn => {
    btn.classList.toggle("active", active);
    btn.innerHTML = active ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
  });
  const mb = document.getElementById("modalFavBtn");
  if (mb && mb.dataset.name === name) {
    mb.classList.toggle("active", active);
    mb.innerHTML = active ? '<i class="fa-solid fa-heart"></i> Saved' : '<i class="fa-regular fa-heart"></i> Save to Favorites';
  }
}

/* ════════════════════════════════
   TRIP PLAN ("Add to Plan" cart)
════════════════════════════════ */
function getPlan() { try { return JSON.parse(localStorage.getItem(PLAN_KEY))||[]; } catch(e) { return []; } }
function savePlan(l) { localStorage.setItem(PLAN_KEY, JSON.stringify(l)); }
function isInPlan(n) { return getPlan().some(p => p.name === n); }

function findPlaceByName(name) {
  return buildAllItems().find(it => it.place.name === name) || null;
}

function togglePlan(name) {
  let plan = getPlan();
  const already = plan.some(p => p.name === name);
  let justAdded = false;
  if (already) {
    plan = plan.filter(p => p.name !== name);
  } else {
    const found = findPlaceByName(name);
    const tagLabel = found ? found.tagLabel : "Destination";
    plan.push({ name, category: tagLabel });
    justAdded = true;
  }
  savePlan(plan);
  refreshPlanButtons(name);
  updatePlanBadge();
  if (justAdded) {
    showSuccessToast("Added to your trip plan!", `${name} is now in your trip plan. Tap the suitcase icon in the nav to review it.`);
  }
}

function refreshPlanButtons(name) {
  const inPlan = isInPlan(name);
  document.querySelectorAll(`.plan-btn[data-name="${cssEscape(name)}"]`).forEach(btn => {
    btn.classList.toggle("active", inPlan);
    btn.innerHTML = inPlan ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-suitcase-rolling"></i>';
    btn.title = inPlan ? "Remove from trip plan" : "Add to trip plan";
  });
  document.querySelectorAll(`.card-plan-cta[data-name="${cssEscape(name)}"]`).forEach(btn => {
    btn.classList.toggle("in-plan", inPlan);
    btn.innerHTML = inPlan
      ? '<i class="fa-solid fa-check"></i> Added to Plan'
      : '<i class="fa-solid fa-suitcase-rolling"></i> Add to Trip Plan';
  });
  const mp = document.getElementById("modalPlanBtn");
  if (mp && mp.dataset.name === name) {
    mp.classList.toggle("active", inPlan);
    mp.innerHTML = inPlan ? '<i class="fa-solid fa-check"></i> Added to Trip Plan' : '<i class="fa-solid fa-suitcase-rolling"></i> Add to Trip Plan';
  }
}

function updatePlanBadge() {
  const count = getPlan().length;
  const badge = document.getElementById("planCountBadge");
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle("zero", count === 0);
  const sendBtn = document.getElementById("planSendBtn");
  if (sendBtn) sendBtn.disabled = count === 0;
}

function togglePlanFromModal() {
  const n = document.getElementById("modalPlanBtn").dataset.name;
  if (n) togglePlan(n);
}

function renderPlanDrawer() {
  const plan = getPlan();
  const body = document.getElementById("planDrawerBody");
  document.getElementById("planTotalCount").textContent = plan.length;
  updatePlanBadge();

  if (!plan.length) {
    body.innerHTML = `<div class="plan-empty"><i class="fa-solid fa-suitcase-rolling"></i>Your trip plan is empty.<br>Tap "Add to Trip Plan" on any destination to start building your itinerary.</div>`;
    return;
  }

  body.innerHTML = plan.map(p => {
    const found = findPlaceByName(p.name);
    const img = found ? found.place.imageUrl : "";
    const cat = found ? found.tagLabel : p.category;
    return `
      <div class="plan-item">
        <img src="${img}" alt="${p.name}" loading="lazy">
        <div class="plan-item-info">
          <h4>${p.name}</h4>
          <span><i class="fa-solid ${CATEGORY_ICONS[cat]||"fa-tag"}"></i> ${cat}</span>
        </div>
        <button class="plan-item-remove" onclick="removeFromPlan('${cssEscape(p.name)}')" aria-label="Remove from plan"><i class="fa-solid fa-trash"></i></button>
      </div>`;
  }).join("");
}

function removeFromPlan(name) {
  let plan = getPlan().filter(p => p.name !== name);
  savePlan(plan);
  refreshPlanButtons(name);
  renderPlanDrawer();
}

function clearPlan() {
  if (!getPlan().length) return;
  if (!confirm("Remove all destinations from your trip plan?")) return;
  const names = getPlan().map(p => p.name);
  savePlan([]);
  names.forEach(refreshPlanButtons);
  renderPlanDrawer();
}

function openPlanDrawer() {
  renderPlanDrawer();
  document.getElementById("planOverlay").classList.add("open");
}
function closePlanDrawer() { document.getElementById("planOverlay").classList.remove("open"); }
function closePlanOnBackdrop(e) { if (e.target.id === "planOverlay") closePlanDrawer(); }

function goToContactWithPlan() {
  if (!getPlan().length) return;
  closePlanDrawer();
  showPage("contact");
  renderPlanSummaryChip();
  setTimeout(() => document.getElementById("message")?.focus(), 350);
}

/* ════════════════════════════════
   SORT
════════════════════════════════ */
function sortItems(items) {
  if (currentSort === "az")  return [...items].sort((a,b) => a.place.name.localeCompare(b.place.name));
  if (currentSort === "za")  return [...items].sort((a,b) => b.place.name.localeCompare(a.place.name));
  if (currentSort === "top") return [...items].sort((a,b) => (RATINGS[b.place.name]||0)-(RATINGS[a.place.name]||0));
  return items;
}

function setSortAndRefresh(val) {
  currentSort = val;
  document.querySelectorAll(".sort-btn").forEach(b => b.classList.toggle("active", b.dataset.sort === val));
  if (currentView.length > 0) renderCards(currentView, false);
}

/* ════════════════════════════════
   SKELETON LOADERS
════════════════════════════════ */
function showSkeletons(count = 6) {
  const r = document.getElementById("results");
  r.innerHTML = "";
  for (let i = 0; i < count; i++) {
    r.innerHTML += `<div class="skeleton"><div class="skel-img"></div><div class="skel-body"><div class="skel-line short"></div><div class="skel-line medium"></div><div class="skel-line"></div></div></div>`;
  }
}

/* ════════════════════════════════
   RENDER CARDS
════════════════════════════════ */
function renderCards(items, saveToView = true) {
  if (saveToView) currentView = items;
  const sorted = sortItems(items);
  const r = document.getElementById("results");
  r.innerHTML = "";

  if (!sorted || sorted.length === 0) {
    r.innerHTML = "<p class='empty-msg'>No destinations found here yet.</p>";
    return;
  }

  document.querySelector(".hero").style.display = "none";
  document.getElementById("sortToolbar").style.display = "flex";

  sorted.forEach(({ place, tagLabel }, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = (e) => { if (!e.target.closest(".fav-btn") && !e.target.closest(".plan-btn") && !e.target.closest(".card-plan-cta")) openModal(index); };
    const favActive = isFavorite(place.name);
    const planActive = isInPlan(place.name);
    const indiaBadge = isIndian(place) ? `<div class="india-badge"><i class="fa-solid fa-flag"></i> India</div>` : "";

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${place.imageUrl}" alt="${place.name}" loading="lazy">
        <button class="fav-btn ${favActive?"active":""}" data-name="${place.name}" aria-label="Save to favorites">
          <i class="${favActive?"fa-solid":"fa-regular"} fa-heart"></i>
        </button>
        <button class="plan-btn ${planActive?"active":""}" data-name="${place.name}" aria-label="Add to trip plan" title="${planActive?"Remove from trip plan":"Add to trip plan"}">
          <i class="fa-solid ${planActive?"fa-check":"fa-suitcase-rolling"}"></i>
        </button>
        ${buildBestTimeBadge(place.name)}
        ${buildPriceBadge(place.name)}
        ${indiaBadge}
      </div>
      <div class="card-content">
        <span class="tag"><i class="fa-solid ${CATEGORY_ICONS[tagLabel]||"fa-tag"}"></i> ${tagLabel}</span>
        <h3>${place.name}</h3>
        ${buildStars(place.name)}
        <p>${place.description}</p>
        <div class="card-add-row">
          <button class="card-plan-cta ${planActive?"in-plan":""}" data-name="${place.name}">
            <i class="fa-solid ${planActive?"fa-check":"fa-suitcase-rolling"}"></i> ${planActive?"Added to Plan":"Add to Trip Plan"}
          </button>
        </div>
      </div>`;

    card.querySelector(".fav-btn").addEventListener("click", () => toggleFavorite(place.name));
    card.querySelector(".plan-btn").addEventListener("click", () => togglePlan(place.name));
    card.querySelector(".card-plan-cta").addEventListener("click", () => togglePlan(place.name));
    r.appendChild(card);
  });
  currentView = sorted;
}

/* ════════════════════════════════
   BUILD ITEM LISTS
════════════════════════════════ */
function buildItems(cat) {
  if (cat === "beaches")   return (travelData.beaches||[]).map(p => ({ place:p, tagLabel:"Beach" }));
  if (cat === "temples")   return (travelData.temples||[]).map(p => ({ place:p, tagLabel:"Temple" }));
  if (cat === "countries") return (travelData.countries||[]).map(p => ({ place:p, tagLabel:"Country" }));
  return [];
}
function buildAllItems() {
  return [...buildItems("beaches"),...buildItems("temples"),...buildItems("countries")];
}
function buildIndiaItems() {
  return buildAllItems().filter(({ place }) => isIndian(place));
}

/* ════════════════════════════════
   STATS COUNTER
════════════════════════════════ */
function animateCounter(el, target, duration = 1200) {
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(p * target);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function updateStats() {
  const all = buildAllItems();
  const fiveStars = all.filter(({ place }) => (RATINGS[place.name]||0) === 5);
  const indiaCount = buildIndiaItems().length;
  animateCounter(document.getElementById("stat-destinations"), all.length);
  animateCounter(document.getElementById("stat-categories"), 3);
  animateCounter(document.getElementById("stat-india"), indiaCount);
  animateCounter(document.getElementById("stat-rated"), fiveStars.length);
}

/* ════════════════════════════════
   FILTER BUTTONS
════════════════════════════════ */
function filterByCategory(cat) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  // Find the matching button by its data-cat attribute
  const btn = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
  if (btn) btn.classList.add("active");

  document.getElementById("searchInput").value = "";
  showSkeletons();

  setTimeout(() => {
    let items = [];
    if (cat === "all")       items = buildAllItems();
    else if (cat === "india") items = buildIndiaItems();
    else if (cat === "favorites") {
      const names = getFavorites();
      items = buildAllItems().filter(({ place }) => names.includes(place.name));
      if (!items.length) {
        document.querySelector(".hero").style.display = "none";
        document.getElementById("sortToolbar").style.display = "none";
        document.getElementById("results").innerHTML = "<p class='empty-msg'>No favorites yet — tap the ♥ on any card to save it here.</p>";
        currentView = []; return;
      }
    } else items = buildItems(cat);
    renderCards(items);
  }, 600);
}

/* ════════════════════════════════
   FUZZY SEARCH
════════════════════════════════ */
function fuzzyMatch(query, text) {
  const q = query.toLowerCase(), t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) if (t[i] === q[qi]) qi++;
  return qi === q.length && q.length >= 3;
}

function searchRecommendation() {
  const kw = document.getElementById("searchInput").value.trim().toLowerCase();
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

  const catMap = { beach:"beaches",beaches:"beaches",temple:"temples",temples:"temples",country:"countries",countries:"countries",india:"india" };
  if (catMap[kw]) { filterByCategory(catMap[kw]); return; }

  showSkeletons();
  setTimeout(() => {
    const all = buildAllItems();
    const matches = all.filter(({ place }) =>
      fuzzyMatch(kw, place.name) ||
      fuzzyMatch(kw, place.description) ||
      fuzzyMatch(kw, place.country || "")
    );
    if (!matches.length) {
      document.querySelector(".hero").style.display = "none";
      document.getElementById("sortToolbar").style.display = "none";
      document.getElementById("results").innerHTML = "<p class='empty-msg'>No results found. Try a destination name, country, or category.</p>";
      currentView = []; return;
    }
    renderCards(matches);
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById("searchInput");
  if (inp) {
    inp.addEventListener("input", () => { if (inp.value.trim().length >= 2) searchRecommendation(); });
    inp.addEventListener("keydown", e => { if (e.key === "Enter") searchRecommendation(); });
  }
  populateBookingDestinationsFromData();
});

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
  document.querySelector(".hero").style.display = "flex";
  document.getElementById("sortToolbar").style.display = "none";
  document.querySelectorAll(".filter-btn,.sort-btn").forEach(b => b.classList.remove("active"));
  currentView = []; currentSort = "default";
}

/* ════════════════════════════════
   DETAIL MODAL
════════════════════════════════ */
function openModal(index) {
  const item = currentView[index]; if (!item) return;
  const { place, tagLabel } = item;

  document.getElementById("modalImg").src = place.imageUrl;
  document.getElementById("modalImg").alt = place.name;
  document.getElementById("modalTag").innerHTML = `<i class="fa-solid ${CATEGORY_ICONS[tagLabel]||"fa-tag"}"></i> ${tagLabel}`;
  document.getElementById("modalTitle").textContent = place.name;
  document.getElementById("modalDesc").textContent = place.description;
  document.getElementById("modalCategory").textContent = tagLabel;
  document.getElementById("modalCountry").textContent = place.country || "—";
  document.getElementById("modalBestTime").textContent = BEST_TIME[place.name] || "Year-round";

  const price = getCurrentPrice(place.name);
  const label = PRICE_LABELS[price] || "Mid-range";
  const cost  = getCurrentCost(place.name);
  document.getElementById("modalPrice").innerHTML = `<strong>${price}</strong> ${label}`;
  document.getElementById("modalCost").textContent = cost + " per person (approx.)";

  document.getElementById("modalFact").textContent = FACTS[place.name] || "A wonderful place worth visiting.";
  document.getElementById("modalStars").innerHTML = buildStars(place.name, "16px");

  const fb = document.getElementById("modalFavBtn");
  fb.dataset.name = place.name;
  const fav = isFavorite(place.name);
  fb.classList.toggle("active", fav);
  fb.innerHTML = fav ? '<i class="fa-solid fa-heart"></i> Saved' : '<i class="fa-regular fa-heart"></i> Save to Favorites';

  const mp = document.getElementById("modalPlanBtn");
  mp.dataset.name = place.name;
  const inPlan = isInPlan(place.name);
  mp.classList.toggle("active", inPlan);
  mp.innerHTML = inPlan ? '<i class="fa-solid fa-check"></i> Added to Trip Plan' : '<i class="fa-solid fa-suitcase-rolling"></i> Add to Trip Plan';

  // Recommended
  const same = currentView.filter(it => it.tagLabel === tagLabel && it.place.name !== place.name);
  const picks = same.sort(() => Math.random()-0.5).slice(0,2);
  const recEl = document.getElementById("modalRecommended");
  recEl.innerHTML = picks.length ? `
    <h4><i class="fa-solid fa-thumbs-up"></i> You might also like</h4>
    <div class="rec-grid">
      ${picks.map(it => `
        <div class="rec-card" onclick="openModalByName('${cssEscape(it.place.name)}')">
          <img src="${it.place.imageUrl}" alt="${it.place.name}" loading="lazy">
          <div class="rec-card-name">${it.place.name}</div>
        </div>`).join("")}
    </div>` : "";

  document.getElementById("modalOverlay").classList.add("open");
}

function openModalByName(name) {
  const idx = currentView.findIndex(it => it.place.name === name);
  if (idx !== -1) openModal(idx);
}

function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }
function closeModalOnBackdrop(e) { if (e.target.id === "modalOverlay") closeModal(); }
function toggleFavoriteFromModal() { const n = document.getElementById("modalFavBtn").dataset.name; if (n) toggleFavorite(n); }

/* ════════════════════════════════
   SHARE
════════════════════════════════ */
function shareDestination() {
  const name = document.getElementById("modalTitle").textContent;
  const text = `Check out ${name} on Travel Explorer! ${window.location.href}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(showToast);
  } else {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy");
    document.body.removeChild(ta); showToast();
  }
}
function showToast() {
  const t = document.getElementById("shareToast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

/* ════════════════════════════════
   GLOBAL SUCCESS NOTIFICATION
════════════════════════════════ */
let successToastTimer = null;
function showSuccessToast(title, text) {
  const t = document.getElementById("successToast");
  document.getElementById("successToastTitle").textContent = title;
  document.getElementById("successToastText").textContent = text;
  t.classList.add("show");
  clearTimeout(successToastTimer);
  successToastTimer = setTimeout(hideSuccessToast, 4200);
}
function hideSuccessToast() {
  document.getElementById("successToast").classList.remove("show");
}

/* ════════════════════════════════
   LIGHTBOX
════════════════════════════════ */
function openLightbox(src, alt) {
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightboxImg").alt = alt;
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox() { document.getElementById("lightbox").classList.remove("open"); }

/* ════════════════════════════════
   BOOKING MODAL
════════════════════════════════ */
function populateBookingDestinationsFromData() {
  const sel = document.getElementById("b-dest");
  if (!sel) return;
  sel.innerHTML = '<option value="">Choose a destination…</option>';
  buildAllItems().forEach(({ place }) => {
    const opt = document.createElement("option");
    opt.value = place.name;
    opt.textContent = place.name + (isIndian(place) ? " 🇮🇳" : "");
    sel.appendChild(opt);
  });
}

function openBooking(destName) {
  populateBookingDestinationsFromData();
  if (destName) {
    const sel = document.getElementById("b-dest");
    const opt = [...sel.options].find(o => o.value === destName);
    if (opt) sel.value = destName;
  }
  document.getElementById("bookingStatus").style.display = "none";
  document.getElementById("bookingOverlay").classList.add("open");
}
function closeBooking() { document.getElementById("bookingOverlay").classList.remove("open"); }
function closeBookingOnBackdrop(e) { if (e.target.id === "bookingOverlay") closeBooking(); }

function submitBooking() {
  const name  = document.getElementById("b-name").value.trim();
  const email = document.getElementById("b-email").value.trim();
  const dest  = document.getElementById("b-dest").value;
  const status = document.getElementById("bookingStatus");
  if (!name || !email || !dest) {
    status.textContent = "Please fill in your name, email and destination.";
    status.className = "booking-status";
    status.style.cssText = "display:block;color:var(--coral-deep);background:rgba(227,89,47,0.1);padding:12px 16px;border-radius:10px;margin-top:16px;font-weight:600;font-size:14px;";
    return;
  }
  console.log("Booking:", { name, email, dest });
  status.textContent = `🎉 Thanks ${name}! Your trip to ${dest} is being arranged. We'll email ${email} shortly.`;
  status.className = "booking-status success";
  status.style.display = "block";
  setTimeout(closeBooking, 3000);
}

/* ════════════════════════════════
   NEWSLETTER
════════════════════════════════ */
function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail").value.trim();
  const btn = document.querySelector(".newsletter-btn");
  if (!email || !email.includes("@")) {
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Valid email needed!';
    btn.style.background = "var(--coral-deep)";
    setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Subscribe'; btn.style.background = ""; }, 2200);
    return;
  }
  console.log("Newsletter:", email);
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
  btn.style.background = "#1e7d4a";
  document.getElementById("newsletterEmail").value = "";
  setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Subscribe'; btn.style.background = ""; }, 3000);
}

/* ════════════════════════════════
   SCROLL TO TOP
════════════════════════════════ */
window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (btn) btn.classList.toggle("visible", window.scrollY > 400);
});

/* ════════════════════════════════
   PAGE NAV
════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
  document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
  const nl = document.getElementById(`nav-${id}`); if (nl) nl.classList.add("active");
  if (id === "contact") renderPlanSummaryChip();
}

/* ════════════════════════════════
   CONTACT FORM
════════════════════════════════ */
function renderPlanSummaryChip() {
  const chip = document.getElementById("planSummaryChip");
  if (!chip) return;
  const plan = getPlan();
  if (!plan.length) { chip.innerHTML = ""; return; }
  const names = plan.map(p => p.name).join(", ");
  chip.innerHTML = `<div class="plan-summary-chip"><i class="fa-solid fa-suitcase-rolling"></i>
    <span><strong>${plan.length}</strong> destination${plan.length>1?"s":""} from your Trip Plan will be included: ${names}.
    <a onclick="openPlanDrawer()">Edit plan</a></span></div>`;
  // Pre-fill the message field if it's still empty, so the consultant sees the chosen plan
  const msgBox = document.getElementById("message");
  if (msgBox && !msgBox.value.trim()) {
    msgBox.value = `Hi! I'd like to plan a trip covering: ${names}. Please share itinerary and pricing options.`;
  }
}

function submitContactForm(e) {
  e.preventDefault();
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status  = document.getElementById("formStatus");
  if (!name || !email || !message) {
    status.textContent = "Please fill in every field before submitting.";
    status.className = "form-status error";
    status.style.display = "block";
    return;
  }

  const plan = getPlan();
  console.log("Contact:", { name, email, message, planItems: plan.map(p => p.name) });

  const planNote = plan.length ? ` Your plan with ${plan.length} destination${plan.length>1?"s":""} was sent along with your message.` : "";
  status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thanks, ${name}! Your message has been sent successfully.${planNote}`;
  status.className = "form-status success";
  status.style.display = "block";

  showSuccessToast(
    "Message sent successfully!",
    plan.length
      ? `We received your trip plan (${plan.length} destination${plan.length>1?"s":""}) and message. Our travel desk will email you at ${email} shortly.`
      : `Our travel desk will get back to you at ${email} shortly.`
  );

  document.getElementById("contactForm").reset();
  document.getElementById("planSummaryChip").innerHTML = "";
  status.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ════════════════════════════════
   KEYBOARD
════════════════════════════════ */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); closeLightbox(); closeBooking(); closePlanDrawer(); }
});

/* ════════════════════════════════
   INIT
════════════════════════════════ */
(function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || "dark");
  currentCurrency = localStorage.getItem(CURRENCY_KEY) || "INR";
  document.querySelectorAll(".currency-btn").forEach(b => b.classList.toggle("active", b.dataset.currency === currentCurrency));
  updatePlanBadge();
})();

fetch("travel_recommendation_api.json")
  .then(r => r.json())
  .then(data => {
    travelData = data;
    updateStats();
    populateBookingDestinationsFromData();
    console.log("Data loaded ✅");
  })
  .catch(err => console.log("Error:", err));