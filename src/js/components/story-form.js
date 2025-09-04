import { LitElement, html, css } from "lit";
import { addStory } from "./api.js";

class StoryForm extends LitElement {
  // ... properties, styles, constructor sama seperti sebelumnya

  createRenderRoot() {
    return this; // pakai DOM biasa supaya Bootstrap berlaku
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    try {
      // Panggil API untuk tambah story
      await addStory({
        name: this.name,
        description: this.desc,
        photoUrl: this.photo,
      });

      // Reset form
      this.name = "";
      this.photo = "";
      this.desc = "";
      form.classList.remove("was-validated");

      // Tampilkan alert
      const alertBox = this.querySelector("#alert-success");
      if (alertBox) {
        alertBox.classList.remove("d-none");
        setTimeout(() => alertBox.classList.add("d-none"), 3000);
      }

      // Bisa juga emit event agar dashboard reload stories
      this.dispatchEvent(
        new CustomEvent("story-added", {
          bubbles: true,
          composed: true,
        })
      );
    } catch (error) {
      alert("Gagal menambahkan story. Cek console untuk detail.");
    }
  }

  // ... render() tetap sama
}

customElements.define("story-form", StoryForm);
