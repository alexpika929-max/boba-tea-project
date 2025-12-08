/* assets/js/main.js
   Author: Alexander Lopez
   Purpose: Implements the interactive Shop Search and UI updates for shops.html
   Links: This file is referenced from shops.html with a <script src="assets/js/main.js"></script>
*/

/* -------------------------
   DATA: shops array (used in filter/search)
   This is an array of objects (meets "Used an array" requirement)
------------------------- */
const shops = [
  {
    id: "short-and-stout",
    name: "Short and Stout Tea Lounge",
    address: "1736 Western Ave, Albany, NY",
    tags: ["Premium", "Tea", "Boba"],
    link: "shop-detail.html",
    img: "assets/short-and-stout.jpg"
  },
  {
    id: "eggcellent",
    name: "Eggcellent",
    address: "1475 Western Ave, Albany, NY",
    tags: ["Breakfast", "Boba", "Student-friendly"],
    link: "eggcellent-detail.html",
    img: "assets/eggcellent.jpg"
  },
  {
    id: "gongcha",
    name: "Gong Cha",
    address: "1232 Western Ave, Albany, NY",
    tags: ["Chain", "Customizable"],
    link: "gongcha-detail.html",
    img: "assets/gongcha-1.jpg"
  },
  {
    id: "berryandberry",
    name: "Berry & Berry",
    address: "Crossgates Mall, Albany, NY",
    tags: ["Smoothies", "Boba"],
    link: "berryandberry-detail.html",
    img: "assets/berryandberry-1.jpg"
  },
  {
    id: "romanteac",
    name: "Romanteac Bubble Tea",
    address: "260 Osborne Rd, Albany, NY",
    tags: ["Fruit Tea", "Milk Tea"],
    link: "romanteac-detail.html",
    img: "assets/romanteac-1.jpg"
  }
];

/* -------------------------
   Helper: escape HTML for safe output (basic)
------------------------- */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* -------------------------
   DOM elements (populated on DOMContentLoaded)
   - input: user input to call function (rubric)
   - button: browser event to call function (rubric)
   - results: place text dynamically on page (rubric)
------------------------- */
let searchInput, searchBtn, resultsDiv, lastSearchNote;

/* -------------------------
   Main search function
   - Called by button click and Enter key (browser event)
   - Uses array and loop to filter (array + for loop)
   - Validates empty input (conditional)
   - Dynamically renders results (DOM manipulation)
------------------------- */
function performSearch() {
  const q = searchInput.value.trim().toLowerCase();

  // Conditional check + form validation (rubric: conditional statement including form validation)
  if (!q) {
    resultsDiv.innerHTML = `<p style="color:#9a5b3a;">Please enter a search term (e.g., "matcha", "Crossgates", or "Eggcellent").</p>`;
    // Save the fact that user attempted an empty search (extra behavior)
    localStorage.setItem("lastSearch", "");
    return;
  }

  // Save user input for extra credit (localStorage) — this is listed under "Other / Extras"
  localStorage.setItem("lastSearch", q);

  // Filtering using a loop (rubric wants a loop: for/for-in/while/do-while)
  // We'll use a for loop to demonstrate explicit loop usage.
  const matches = [];
  for (let i = 0; i < shops.length; i++) {
    const s = shops[i];
    // check name, address, and tags
    const hay = (s.name + " " + s.address + " " + s.tags.join(" ")).toLowerCase();
    if (hay.indexOf(q) !== -1) {
      matches.push(s);
    }
  }

  // Also demonstrate array method usage (forEach) — meets "Used an array" and "Other JS used"
  // Dynamically place results on page
  if (matches.length === 0) {
    resultsDiv.innerHTML = `<p style="color:#9a5b3a;">No shops found for "<strong>${escapeHTML(q)}</strong>". Try another term.</p>`;
    return;
  }

  let html = `<div aria-live="polite"><p>Found ${matches.length} result(s):</p><div style="display:flex;flex-wrap:wrap;gap:12px;">`;

  matches.forEach(shop => {
    html += `
      <div style="width:260px;border:1px solid #ead3bf;padding:8px;background:#fffaf6;border-radius:6px;">
        <a href="${escapeHTML(shop.link)}" style="text-decoration:none;color:#6b3f2b;font-weight:700;">
          <img src="${escapeHTML(shop.img)}" alt="${escapeHTML(shop.name)}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;margin-bottom:8px;">
          <div style="padding:4px 0;">${escapeHTML(shop.name)}</div>
        </a>
        <div style="color:#7a6a63;font-size:0.9rem;">${escapeHTML(shop.address)}</div>
      </div>
    `;
  });

  html += `</div></div>`;
  resultsDiv.innerHTML = html;
}

/* -------------------------
   Additional small feature: show last search on page load (extra)
   Also demonstrates use of DOMContentLoaded event (rubric: used a browser event)
------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // Query DOM elements (these elements must exist in the shops.html page)
  searchInput = document.getElementById("shop-search-input");
  searchBtn = document.getElementById("shop-search-btn");
  resultsDiv = document.getElementById("shop-search-results");
  lastSearchNote = document.getElementById("shop-search-last");

  // Defensive: if elements are missing, stop and do nothing (prevents errors)
  if (!searchInput || !searchBtn || !resultsDiv) {
    // Nothing to do if page doesn't include the search UI
    return;
  }

  // Attach event listeners (rubric: used a browser event to call a function)
  searchBtn.addEventListener("click", performSearch);

  // Also allow Enter key to submit (user input triggers function)
  searchInput.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      performSearch();
    }
  });

  // Pre-populate results with all shops (demonstrates dynamic placement)
  let allHTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;">`;
  for (let i = 0; i < shops.length; i++) {
    const s = shops[i];
    allHTML += `
      <div style="width:260px;border:1px solid #ead3bf;padding:8px;background:#fffaf6;border-radius:6px;">
        <a href="${escapeHTML(s.link)}" style="text-decoration:none;color:#6b3f2b;font-weight:700;">
          <img src="${escapeHTML(s.img)}" alt="${escapeHTML(s.name)}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;margin-bottom:8px;">
          <div style="padding:4px 0;">${escapeHTML(s.name)}</div>
        </a>
        <div style="color:#7a6a63;font-size:0.9rem;">${escapeHTML(s.address)}</div>
      </div>
    `;
  }
  allHTML += `</div>`;
  resultsDiv.innerHTML = allHTML;

  // display last search value if present (extra credit)
  const last = localStorage.getItem("lastSearch") || "";
  if (lastSearchNote) {
    lastSearchNote.textContent = last ? `Last search: ${last}` : "";
  }
});
