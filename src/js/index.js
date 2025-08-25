// Import our custom CSS
import "./components/navbar-app.js";
import "./components/story-card.js";
import "./components/story-form.js";
import "./components/profile-card.js";
import "./components/footer-app.js";
import "../sass/main.scss";

console.log("Do your work here!");

fetch("/data/DATA.json")
  .then((response) => response.json())
  .then((data) => {
    // data sekarang isinya array story dari JSON
    console.log(data);

    const container = document.getElementById("story-list");
    data.forEach((story) => {
      const storyCard = document.createElement("story-card");
      storyCard.setAttribute("name", story.name);
      storyCard.setAttribute("photo", story.photoUrl);
      storyCard.setAttribute("desc", story.description);
      storyCard.setAttribute("date", story.createdAt);
      container.appendChild(storyCard);
    });
  })
  .catch((err) => console.error(err));
