import { LitElement, html } from "lit";

class NavbarApp extends LitElement {
  createRenderRoot() {
    return this; // pakai global CSS Bootstrap
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#/">Story App</a>
          <div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#/">Dasbor</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/add">Tambah Story</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("navbar-app", NavbarApp);
