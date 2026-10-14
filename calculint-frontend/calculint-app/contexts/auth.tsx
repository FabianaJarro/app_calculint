
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Usuario = {
  name: string;
  token: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (dados: Usuario) => Promise<void>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarSessao() {
      try {
        const [token, name] = await AsyncStorage.multiGet([
          "token",
          "name",
        ]);

        if (ativo && token[1] && name[1]) {
          setUsuario({
            token: token[1],
            name: name[1],
          });
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

  const entrar = useCallback(async (dados: Usuario) => {
    await AsyncStorage.multiSet([
      ["token", dados.token],
      ["name", dados.name],
    ]);

    setUsuario({
      token: dados.token,
      name: dados.name,
    });
  }, []);

  const sair = useCallback(async () => {
    // limpa a interface
    setUsuario(null);

    await AsyncStorage.multiRemove(["token", "name"]);
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, entrar, sair }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return contexto;
}
