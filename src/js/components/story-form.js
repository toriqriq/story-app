import { LitElement, html, css } from "lit";

class StoryForm extends LitElement {
  static properties = {
    name: { type: String },
    photo: { type: String },
    desc: { type: String },
  };

  static styles = css`
    form {
      margin: 1rem 0;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.photo = "";
    this.desc = "";
  }

  // ⚡ Tambahan ini untuk pakai CSS global (Bootstrap)
  createRenderRoot() {
    return this; // disable shadow DOM
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const eventDetail = {
      id: `story-${Date.now()}`, // bikin id unik sederhana
      name: this.name,
      description: this.desc, // samakan dengan DATA.json
      photoUrl: this.photo, // samakan dengan DATA.json
      createdAt: new Date().toISOString(), // format ISO (bukan locale date)
    };
    this.dispatchEvent(
      new CustomEvent("story-added", {
        detail: eventDetail,
        bubbles: true,
        composed: true,
      })
    );

    // Reset form
    this.name = "";
    this.photo = "";
    this.desc = "";
    form.classList.remove("was-validated");

    // Tampilkan alert
    const alertBox = this.querySelector("#alert-success");
    if (alertBox) {
      alertBox.classList.remove("d-none");
      setTimeout(() => alertBox.classList.add("d-none"), 3000); // sembunyikan otomatis
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
          <label class="form-label">Link Foto</label>
          <input
            type="url"
            class="form-control"
            placeholder="Link Foto"
            .value="${this.photo}"
            @input="${(e) => (this.photo = e.target.value)}"
            required
          />
          <div class="invalid-feedback">Harap masukkan URL yang valid.</div>
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

        <button type="submit" class="btn btn-primary">Tambah Story</button>
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
