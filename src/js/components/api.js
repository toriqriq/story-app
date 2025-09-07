// src/api.js
import axios from "axios";

const BASE_URL = "https://story-api.dicoding.dev/v1";

// Ambil semua stories
export async function fetchStories() {
  try {
    const response = await axios.get(`${BASE_URL}/stories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    return response.data.listStory || [];
  } catch (error) {
    console.error("Gagal memuat stories:", error);
    return [];
  }
}

// Tambah story baru
export async function addStory(formData) {
  try {
    const response = await axios.post(
      "https://story-api.dicoding.dev/v1/stories",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Gagal menambahkan story:", err);
    throw err;
  }
}
