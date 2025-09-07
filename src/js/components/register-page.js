import { LitElement, html, css } from "lit";
import axios from "axios";

class RegisterPage extends LitElement {
  static properties = {
    name: String,
    email: String,
    password: String,
    loading: Boolean,
  };

  constructor() {
    super();
    this.name = "";
    this.email = "";
    this.password = "";
    this.loading = false;
    this.createRenderRoot = () => this; // pakai DOM biasa
  }

  static styles = css`
    form {
      max-width: 400px;
      margin: 2rem auto;
    }
  `;

  async handleRegister(e) {
    e.preventDefault();

    this.loading = true; // tampilkan loading
    try {
      await axios.post(
        "https://story-api.dicoding.dev/v1/register",
        { name: this.name, email: this.email, password: this.password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Registrasi berhasil! Silakan login.");
      window.location.hash = "#/login";
    } catch (err) {
      alert("Gagal daftar, cek console.");
      console.error(err);
    } finally {
      this.loading = false; // sembunyikan loading
    }
  }

  render() {
    return html`
      <form @submit="${this.handleRegister}">
        <div class="mb-3">
          <label>Nama</label>
          <input
            type="text"
            class="form-control"
            .value="${this.name}"
            @input="${(e) => (this.name = e.target.value)}"
            required
            minlength="3"
          />
        </div>
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
            minlength="6"
          />
        </div>

        <button
          type="submit"
          class="btn btn-success w-100"
          ?disabled=${this.loading}
        >
          ${this.loading
            ? html`<span class="spinner-border spinner-border-sm me-2"></span>
                Loading...`
            : "Daftar"}
        </button>
      </form>

      <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
    `;
  }
}

customElements.define("register-page", RegisterPage);
