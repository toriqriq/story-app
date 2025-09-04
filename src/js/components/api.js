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
export async function addStory({ name, description, photoUrl }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User belum login");

    const response = await axios.post(
      `${BASE_URL}/stories`,
      { name, description, photoUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.story;
  } catch (error) {
    console.error("Gagal menambahkan story:", error);
    throw error;
  }
}
