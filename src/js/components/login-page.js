import { LitElement, html, css } from "lit";
import axios from "axios";

class LoginPage extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
  };

  static styles = css`
    form {
      max-width: 400px;
      margin: 2rem auto;
    }
  `;

  constructor() {
    super();
    this.email = "";
    this.password = "";
    this.createRenderRoot = () => this; // pakai DOM biasa
  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://story-api.dicoding.dev/v1/login",
        { email: this.email, password: this.password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.loginResult.token;
      localStorage.setItem("token", token);

      this.dispatchEvent(
        new CustomEvent("login-success", {
          bubbles: true,
          composed: true,
        })
      );
    } catch (err) {
      alert("Login gagal, cek email & password.");
      console.error(err);
    }
  }

  render() {
    return html`
      <form @submit="${this.handleLogin}">
        <div class="mb-3">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            .value="${this.email}"
            @input="${(e) => (this.email = e.target.value)}"
            required
          />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            .value="${this.password}"
            @input="${(e) => (this.password = e.target.value)}"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>

      <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
    `;
  }
}

customElements.define("login-page", LoginPage);
