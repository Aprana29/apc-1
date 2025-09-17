// adminDashboard.js - Frontend-only version (no backend calls)
// - It checks sessionStorage for 'sessionTokenAdmin'.
// - Renders mock laundry history items (replace mockData with API results later).
// - Supports search by laundry id, toggle details, and logout.

// -------------------------------
// Mock data (replace with real data later)
const mockData = [
  {
    id: "LAU-1001",
    status: 4,
    statusText: "Out for Delivery",
    submittedAt: "2025-01-10 14:00",
    message: "Please handle the red saree carefully.",
    pantsPhotos: [], // use image URLs if available
    shirtsPhotos: []
  },
  {
    id: "LAU-1002",
    status: 2,
    statusText: "Shipped",
    submittedAt: "2025-02-01 10:30",
    message: "Deliver after 5pm only.",
    pantsPhotos: [],
    shirtsPhotos: []
  },
  {
    id: "LAU-2001",
    status: 5,
    statusText: "Delivered",
    submittedAt: "2025-03-15 09:15",
    message: "Customer called — ring twice.",
    pantsPhotos: [],
    shirtsPhotos: []
  }
];

// -------------------------------
// DOM references
const historySection = document.getElementById("history-section");
const template = document.getElementById("history-item-template");
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");
const logoutBtn = document.getElementById("logout-btn");

// -------------------------------
// Session check (frontend-only)
function checkSession() {
  const token = sessionStorage.getItem("sessionTokenAdmin");
  if (!token) {
    // No token: redirect to homepage (similar to original behavior)
    window.location.href = "../HomePage/home.html";
    return false;
  }
  return true;
}

// -------------------------------
// Render list (filter optional)
function renderList(list = []) {
  historySection.innerHTML = "";
  if (!list.length) {
    historySection.innerHTML = `<div class="history-item"><p style="color:var(--muted)">No records found.</p></div>`;
    return;
  }

  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const root = clone.querySelector(".history-item");
    clone.querySelector(".laundry-id").textContent = `Laundry ID: ${item.id}`;
    clone.querySelector(".status-line").textContent = `Status: ${item.statusText}`;
    clone.querySelector(".submitted-time").textContent = item.submittedAt;
    clone.querySelector(".message").textContent = `Message: ${item.message || "—"}`;

    // images (if available)
    const pantsGallery = clone.querySelector(".pants-gallery");
    const shirtsGallery = clone.querySelector(".shirts-gallery");
    if (item.pantsPhotos && item.pantsPhotos.length) {
      item.pantsPhotos.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "pants";
        pantsGallery.appendChild(img);
      });
    } else {
      pantsGallery.innerHTML = `<small style="color:var(--muted)">No pants photos</small>`;
    }
    if (item.shirtsPhotos && item.shirtsPhotos.length) {
      item.shirtsPhotos.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "shirt";
        shirtsGallery.appendChild(img);
      });
    } else {
      shirtsGallery.innerHTML = `<small style="color:var(--muted)">No shirts photos</small>`;
    }

    // status tracker activation
    const steps = root.querySelectorAll(".step");
    steps.forEach(s => s.classList.remove("active"));
    steps.forEach(s => {
      const stepNum = Number(s.getAttribute("data-step"));
      if (stepNum <= item.status) s.classList.add("active");
    });

    // toggle details button
    const toggle = root.querySelector(".toggle-details");
    const details = root.querySelector(".details-section");
    const tracker = root.querySelector(".status-tracker");
    let visible = false;
    toggle.addEventListener("click", () => {
      visible = !visible;
      if (visible) {
        details.classList.add("visible");
        details.setAttribute("aria-hidden", "false");
        tracker.setAttribute("aria-hidden", "false");
      } else {
        details.classList.remove("visible");
        details.setAttribute("aria-hidden", "true");
        tracker.setAttribute("aria-hidden", "true");
      }
    });

    historySection.appendChild(clone);
  });
}

// -------------------------------
// Events: search, reset, logout
searchBtn.addEventListener("click", () => {
  const q = (searchBar.value || "").trim();
  if (!q) {
    renderList(mockData);
    return;
  }
  const filtered = mockData.filter(it => it.id.toLowerCase().includes(q.toLowerCase()));
  renderList(filtered);
});

resetBtn.addEventListener("click", () => {
  searchBar.value = "";
  renderList(mockData);
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("sessionTokenAdmin");
  sessionStorage.removeItem("jwtTokenAdmin");
  window.location.href = "../HomePage/home.html";
});

// -------------------------------
// Initialization
(function init() {
  if (!checkSession()) return;
  // If you want to load from real API later, replace the following line with a fetch
  renderList(mockData);
})();
