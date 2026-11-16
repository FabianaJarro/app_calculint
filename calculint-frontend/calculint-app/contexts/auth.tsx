
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { LoginResponse } from "../interface/LoginResponse";
import type { Nivel as NivelBackend } from "../interface/LoginResponse";
import { api, configurarToken, removerToken } from "../api";

type AuthContextType = {
  usuario: LoginResponse | null;
  carregando: boolean;
  entrar: (dados: LoginResponse) => Promise<void>;
  atualizarNivel: (nivel: NivelBackend) => Promise<void>;
  atualizarNome: (name: string) => Promise<void>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<LoginResponse | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarSessao() {
      try {
        const [tokenItem, nameItem, nivelItem] =
          await AsyncStorage.multiGet([
            "token",
            "name",
            "nivelAtual",
          ]);

        const token = tokenItem[1];
        const name = nameItem[1];
        const nivelSalvo = nivelItem[1];

        if (ativo && token && name) {
          const nivelAtual =
            nivelSalvo === "BASICO" ||
            nivelSalvo === "INTERMEDIARIO" ||
            nivelSalvo === "AVANCADO"
              ? nivelSalvo
              : null;

          configurarToken(token);

          setUsuario({
            token,
            name,
            nivelAtual,
          });
        } else {
          removerToken();
        }
      } catch (error) {
        console.error("Erro ao carregar sessão:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  const entrar = useCallback(async (dados: LoginResponse) => {
    await AsyncStorage.multiSet([
      ["token", dados.token],
      ["name", dados.name],
      ["nivelAtual", dados.nivelAtual ?? ""],
    ]);

    configurarToken(dados.token);

    setUsuario({
      token: dados.token,
      name: dados.name,
      nivelAtual: dados.nivelAtual,
    });
  }, []);

  const sair = useCallback(async () => {
    removerToken();
    setUsuario(null);

    await AsyncStorage.multiRemove([
      "token",
      "name",
      "nivelAtual",
    ]);
  }, []);

  const atualizarNivel = useCallback(async (nivel: NivelBackend) => {
    await api.put("/user/nivel", { nivelAtual: nivel });
    await AsyncStorage.setItem("nivelAtual", nivel);
    setUsuario((atual) => atual ? { ...atual, nivelAtual: nivel } : atual);
  }, []);

  const atualizarNome = useCallback(async (name: string) => {
    await AsyncStorage.setItem("name", name);
    setUsuario((atual) => atual ? { ...atual, name } : atual);
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, entrar, atualizarNivel, atualizarNome, sair }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider."
    );
  }

  return contexto;
}
