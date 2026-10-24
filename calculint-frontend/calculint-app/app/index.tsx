
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth";

export default function Index() {
  const router = useRouter();
  const { usuario, carregando } = useAuth();

  useEffect(() => {
    if (carregando) return;

    if (!usuario) {
      router.replace("/registre_se");
      return;
    }

    if (usuario.nivelAtual) {
      const rotas = {
        BASICO: "/operacoes?nivel=basico",
        INTERMEDIARIO: "/operacoes?nivel=intermediario",
        AVANCADO: "/operacoes?nivel=avancado",
      } as const;

      router.replace(rotas[usuario.nivelAtual]);
    } else {
      router.replace("/selecionar_nivel");
    }
  }, [carregando, usuario, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#99D1D3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
