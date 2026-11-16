
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  LoginResponse, Nivel
} from "../interface/LoginResponse";

import { configurarToken, removerToken } from "../api";
import { api } from "../api";



type AuthContextType = {
  usuario: LoginResponse | null;
  carregando: boolean;
  entrar: (dados: LoginResponse) => Promise<void>;
  sair: () => Promise<void>;
  atualizarNivel: (nivel: Nivel) => Promise<void>;
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

  const atualizarNivel = useCallback(async (nivel: Nivel) => {


    console.log(
      "Token configurado?",
      Boolean(api.defaults.headers.common.Authorization)
    );

    //envia pro backend
    const resposta = await api.put<{ nivelAtual: Nivel }>(
      "/user/nivel",
      { nivelAtual: nivel }
    );

    const nivelSalvo = resposta.data.nivelAtual;

    //salva local
    await AsyncStorage.setItem("nivelAtual", nivelSalvo);

    //atualiza o contexto
    setUsuario((usuarioAnterior) =>
      usuarioAnterior ? { ...usuarioAnterior, nivelatual: nivelSalvo } : null)
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

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, entrar, sair, atualizarNivel }}
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
