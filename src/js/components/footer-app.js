import { LitElement, html, css } from "lit";

class FooterApp extends LitElement {
  static styles = css`
    footer {
      text-align: center;
      padding: 1rem;
      background-color: #f3f4f6;
      color: #333;
      margin-top: 2rem;
    }
  `;

  render() {
    return html`
      <footer>
        &copy; ${new Date().getFullYear()} Story App. All rights reserved.
      </footer>
    `;
  }
}

customElements.define("footer-app", FooterApp);
