import { LitElement, html, css } from "lit";

class NavbarApp extends LitElement {
  static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #4f46e5;
      color: white;
    }
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `;

  render() {
    return html`
      <nav>
        <h1>Story App</h1>
        <div>
          <slot name="nav-links"></slot>
        </div>
      </nav>
    `;
  }
}

customElements.define("navbar-app", NavbarApp);
