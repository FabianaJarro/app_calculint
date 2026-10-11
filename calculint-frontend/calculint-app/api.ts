
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("Configure EXPO_PUBLIC_API_URL no arquivo .env.local");
}

export const API_URL = apiUrl;