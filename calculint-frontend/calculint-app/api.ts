import axios from "axios"

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("Configure EXPO_PUBLIC_API_URL no arquivo .env.local");
}

export const API_URL = apiUrl;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function configurarToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removerToken() {
  delete api.defaults.headers.common.Authorization;
}