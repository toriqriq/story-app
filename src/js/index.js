import "./components/navbar-app.js";
import "./components/story-card.js";
import "./components/story-form.js";
import "./components/footer-app.js";
import "./components/profile-card.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../sass/main.scss";
import { fetchStories } from "./components/api.js";
import "./components/login-page.js";
import "./components/register-page.js";

const app = document.getElementById("app");

// Router

function router() {
  const hash = window.location.hash || "#/";
  const token = localStorage.getItem("token");

  if (!token && hash !== "#/login" && hash !== "#/register") {
    window.location.hash = "#/login";
    return;
  }

  if (hash === "#/" || hash === "") {
    renderDashboard();
  } else if (hash === "#/add") {
    renderAddPage();
  } else if (hash === "#/login") {
    renderLoginPage();
  } else if (hash === "#/register") {
    renderRegisterPage();
  }
}

function renderRegisterPage() {
  app.innerHTML = `
    <h2 class="mb-3">Daftar Akun</h2>
    <register-page></register-page>
  `;
}

function renderLoginPage() {
  app.innerHTML = `
    <h2 class="mb-3">Login</h2>
    <login-page></login-page>
  `;

  // Listener login sukses
  document.querySelector("login-page").addEventListener("login-success", () => {
    window.location.hash = "#/"; // redirect ke dashboard setelah login
    renderDashboard();
  });
}

async function renderDashboard() {
  app.innerHTML = `
  <h2 class="mb-3">Profil User</h2>
  <div id="profile-container" class="mb-4"></div>

  <h2 class="mb-3">Daftar Story</h2>

  <!-- Spinner Loading -->
  <div id="loading-spinner" class="d-flex justify-content-center my-4">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div id="story-list" class="row g-3"></div>
`;

  // render profile-card
  const profileContainer = document.getElementById("profile-container");
  const profileCard = document.createElement("profile-card");
  profileCard.setAttribute("name", "INI STATIC");
  profileCard.setAttribute("photo", "https://picsum.photos/80");
  profileCard.setAttribute("bio", "Frontend Developer & Story Enthusiast");
  profileContainer.appendChild(profileCard);

  const container = document.getElementById("story-list");
  const spinner = document.getElementById("loading-spinner");

  try {
    const stories = await fetchStories();
    spinner.style.display = "none";

    stories.forEach((story) => {
      const col = document.createElement("div");
      col.className = "col-md-6";

      const storyCard = document.createElement("story-card");
      storyCard.setAttribute("name", story.name);
      storyCard.setAttribute("photo", story.photoUrl);
      storyCard.setAttribute("desc", story.description);
      storyCard.setAttribute(
        "date",
        new Date(story.createdAt).toLocaleString()
      );

      col.appendChild(storyCard);
      container.appendChild(col);
    });
  } catch (err) {
    spinner.style.display = "none";
    console.error(err);
    container.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Gagal memuat data story dari API.
      </div>
    `;
  }
}

function renderAddPage() {
  app.innerHTML = `
    <h2 class="mb-3">Tambah Story</h2>
    <story-form></story-form>
  `;

  document
    .querySelector("story-form")
    .addEventListener("story-added", async () => {
      alert("Story berhasil ditambahkan!");
      window.location.hash = "#/"; // balik ke dashboard
      // otomatis reload dashboard agar story baru tampil
      await renderDashboard();
    });
}

// listen hash change
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
