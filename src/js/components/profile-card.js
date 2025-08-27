import { LitElement, html } from "lit";

class ProfileCard extends LitElement {
  static properties = {
    name: { type: String },
    photo: { type: String },
    bio: { type: String },
  };

  createRenderRoot() {
    return this; // pakai DOM biasa supaya Bootstrap bisa diterapkan
  }

  constructor() {
    super();
    this.name = "";
    this.photo = "";
    this.bio = "";
  }

  render() {
    return html`
      <div class="card text-center" style="width: 18rem; margin: 1rem;">
        <img
          src="${this.photo}"
          class="card-img-top rounded-circle mx-auto mt-3"
          style="width: 100px; height: 100px; object-fit: cover;"
          alt="${this.name}"
        />
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.bio}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("profile-card", ProfileCard);
