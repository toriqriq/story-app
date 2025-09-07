import { LitElement, html, css } from "lit";
import { addStory } from "./api.js";

class StoryForm extends LitElement {
  static properties = {
    name: { type: String },
    photo: { type: String },
    desc: { type: String },
    loading: { type: Boolean },
  };

  static styles = css`
    form {
      margin: 1rem 0;
      max-width: 500px;
    }
    #spinner-submit {
      margin-left: 0.5rem;
      display: none;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.photo = "";
    this.desc = "";
    this.loading = false;
  }

  // Pakai DOM biasa supaya Bootstrap CSS berlaku
  createRenderRoot() {
    return this;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    if (!this.photoFile) {
      alert("Harap pilih file foto!");
      return;
    }

    this.loading = true;
    const spinner = this.querySelector("#spinner-submit");
    if (spinner) spinner.classList.remove("d-none"); // tampilkan spinner

    try {
      const formData = new FormData();
      formData.append("description", this.desc);
      formData.append("photo", this.photoFile);

      const result = await addStory(formData);
      console.log("Story berhasil ditambahkan:", result);

      // Emit event agar dashboard reload
      this.dispatchEvent(
        new CustomEvent("story-added", { bubbles: true, composed: true })
      );

      // Reset form
      form.reset();
      this.name = "";
      this.desc = "";
      this.photoFile = null;

      // Tampilkan alert sukses
      const alertBox = this.querySelector("#alert-success");
      if (alertBox) {
        alertBox.classList.remove("d-none");
        setTimeout(() => alertBox.classList.add("d-none"), 3000);
      }
    } catch (err) {
      console.error("Gagal menambahkan story:", err.response?.data || err);
      alert("Gagal menambahkan story. Pastikan file ≤1MB dan deskripsi valid.");
    } finally {
      this.loading = false;
      if (spinner) spinner.classList.add("d-none"); // sembunyikan spinner
    }
  }

  render() {
    return html`
      <form class="needs-validation" novalidate @submit="${this.handleSubmit}">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            placeholder="Nama"
            .value="${this.name}"
            @input="${(e) => (this.name = e.target.value)}"
            required
            minlength="3"
          />
          <div class="invalid-feedback">
            Nama harus diisi minimal 3 karakter.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Foto</label>
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="${(e) => (this.photoFile = e.target.files[0])}"
            required
          />
          <div class="invalid-feedback">
            Harap pilih file gambar yang valid.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Deskripsi</label>
          <textarea
            class="form-control"
            placeholder="Deskripsi"
            .value="${this.desc}"
            @input="${(e) => (this.desc = e.target.value)}"
            required
            minlength="5"
          ></textarea>
          <div class="invalid-feedback">
            Deskripsi harus diisi minimal 5 karakter.
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          ?disabled="${this.loading}"
        >
          Tambah Story
          <span
            id="spinner-submit"
            class="spinner-border spinner-border-sm d-none"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </form>

      <!-- Alert Bootstrap -->
      <div
        id="alert-success"
        class="alert alert-success mt-3 d-none"
        role="alert"
      >
        Story berhasil ditambahkan!
      </div>
    `;
  }
}

customElements.define("story-form", StoryForm);
