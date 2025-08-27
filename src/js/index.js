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

    <!-- Spinner Loading -->
    <div id="loading-spinner" class="d-flex justify-content-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div id="story-list" class="row g-3"></div>
  `;

  const container = document.getElementById("story-list");
  const spinner = document.getElementById("loading-spinner");

  // Fetch data dari file JSON
  fetch("/data/DATA.json")
    .then((response) => response.json())
    .then((data) => {
      spinner.style.display = "none";

      // Gabungkan dengan story dari localStorage
      let stories = JSON.parse(localStorage.getItem("stories") || "[]");
      const allStories = [...stories, ...data.listStory];

      allStories.forEach((story) => {
        const col = document.createElement("div");
        col.className = "col-md-6";

        const storyCard = document.createElement("story-card");
        storyCard.setAttribute("name", story.name);
        storyCard.setAttribute("photo", story.photo || story.photoUrl);
        storyCard.setAttribute("desc", story.desc || story.description);
        storyCard.setAttribute("date", story.date || story.createdAt);

        col.appendChild(storyCard);
        container.appendChild(col);
      });
    })
    .catch((err) => {
      spinner.style.display = "none";
      console.error(err);
      container.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Gagal memuat data story.
        </div>
      `;
    });
}

function renderAddPage() {
  app.innerHTML = `
    <h2 class="mb-3">Tambah Story</h2>
    <story-form></story-form>
  `;

  document.querySelector("story-form").addEventListener("story-added", (e) => {
    const story = e.detail;

    // simpan ke localStorage supaya persist
    let stories = JSON.parse(localStorage.getItem("stories") || "[]");
    stories.unshift(story);
    localStorage.setItem("stories", JSON.stringify(stories));

    alert("Story berhasil ditambahkan!");
    window.location.hash = "#/"; // balik ke dashboard
  });
}

// listen hash change
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
