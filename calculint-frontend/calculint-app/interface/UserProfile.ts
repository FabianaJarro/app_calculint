import type { Nivel } from "./LoginResponse";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  nivelAtual: Nivel | null;
  idade: number | null;
  escolaridade: string | null;
};
