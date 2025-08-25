import { LitElement, html, css } from "lit";

class StoryCard extends LitElement {
  static properties = {
    name: { type: String },
    photo: { type: String },
    desc: { type: String },
    date: { type: String },
  };

  static styles = css`
    .card {
      margin: 1rem 0;
    }
    img {
      width: 100%;
      border-radius: 8px;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.photo = "";
    this.desc = "";
    this.date = "";
  }

  render() {
    return html`
      <div class="card shadow-sm">
        <img src="${this.photo}" alt="${this.name}" />
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.desc}</p>
          <small class="text-muted">${this.date}</small>
        </div>
      </div>
    `;
  }
}

customElements.define("story-card", StoryCard);
