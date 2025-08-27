import "./components/navbar-app.js";
import "./components/story-card.js";
import "./components/story-form.js";
import "./components/footer-app.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../sass/main.scss";

const app = document.getElementById("app");

// Router
function router() {
  const hash = window.location.hash || "#/";

  if (hash === "#/" || hash === "") {
    renderDashboard();
  } else if (hash === "#/add") {
    renderAddPage();
  }
}

function renderDashboard() {
  app.innerHTML = `
    <h2 class="mb-3">Daftar Story</h2>
    <div id="story-list" class="row g-3"></div>
  `;

  const container = document.getElementById("story-list");

  // Fetch data
  fetch("/data/DATA.json")
    .then((response) => response.json())
    .then((data) => {
      data.listStory.forEach((story) => {
        // Bungkus pakai col agar bisa responsive grid
        const col = document.createElement("div");
        col.className = "col-md-6"; // 2 kolom di desktop, 1 di mobile

        const storyCard = document.createElement("story-card");
        storyCard.setAttribute("name", story.name);
        storyCard.setAttribute("photo", story.photoUrl);
        storyCard.setAttribute("desc", story.description);
        storyCard.setAttribute("date", story.createdAt);

        col.appendChild(storyCard);
        container.appendChild(col);
      });
    })
    .catch((err) => console.error(err));
}

function renderAddPage() {
  app.innerHTML = `
    <h2 class="mb-3">Tambah Story</h2>
    <story-form></story-form>
  `;

  document.querySelector("story-form").addEventListener("story-added", (e) => {
    // simpan data ke localStorage atau push ke list story
    console.log("Story baru:", e.detail);
    alert("Story berhasil ditambahkan!");
    window.location.hash = "#/"; // balik ke dashboard
  });
}

// listen hash change
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
