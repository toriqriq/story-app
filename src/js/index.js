import "./components/navbar-app.js";
import "./components/story-card.js";
import "./components/story-form.js";
import "./components/profile-card.js";
import "./components/footer-app.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // opsio
import "../sass/main.scss";
// CSS Bootstrap

const container = document.getElementById("story-list");

// Fungsi render story dari data
function renderStory(story) {
  const storyCard = document.createElement("story-card");
  storyCard.setAttribute("name", story.name);
  storyCard.setAttribute("photo", story.photoUrl);
  storyCard.setAttribute("desc", story.description);
  storyCard.setAttribute("date", story.createdAt);
  container.appendChild(storyCard);
}

// Fetch data awal
fetch("/data/DATA.json")
  .then((response) => response.json())
  .then((data) => {
    data.listStory.forEach(renderStory);
  })
  .catch((err) => console.error(err));

// Tangkap event dari story-form
document.querySelector("story-form").addEventListener("story-added", (e) => {
  const newStory = {
    name: e.detail.name,
    photoUrl: e.detail.photo, // disesuaikan dengan property story-card
    description: e.detail.desc,
    createdAt: e.detail.date,
  };
  renderStory(newStory);
});
