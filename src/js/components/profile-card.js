import { LitElement, html, css } from "lit";

class ProfileCard extends LitElement {
  static properties = {
    name: { type: String },
    photo: { type: String },
    bio: { type: String },
  };

  static styles = css`
    .profile-card {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      max-width: 200px;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.photo = "";
    this.bio = "";
  }

  render() {
    return html`
      <div class="profile-card">
        <img src="${this.photo}" alt="${this.name}" />
        <h4>${this.name}</h4>
        <p>${this.bio}</p>
      </div>
    `;
  }
}

customElements.define("profile-card", ProfileCard);
