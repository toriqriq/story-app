import { LitElement, html } from "lit";
import { fetchStories } from "./api.js";
import "./story-card.js";

class StoryDashboard extends LitElement {
  static properties = {
    stories: { type: Array },
    isLoading: { type: Boolean },
  };

  constructor() {
    super();
    this.stories = [];
    this.isLoading = false;
    this.loadStories();
  }

  async loadStories() {
    this.isLoading = true;
    this.stories = await fetchStories();
    this.isLoading = false;
  }

  render() {
    if (this.isLoading) {
      return html`<div class="text-center mt-5">
        <div class="spinner-border" role="status"></div>
      </div>`;
    }

    return html`
      <div>
        ${this.stories.map(
          (story) => html`
            <story-card
              .name="${story.name}"
              .photo="${story.photoUrl}"
              .desc="${story.description}"
              .date="${new Date(story.createdAt).toLocaleString()}"
            ></story-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define("story-dashboard", StoryDashboard);
