
import { Redirect } from "expo-router";

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/auth";

export default function Index() {
  const { usuario, carregando } = useAuth();

  // Aguarda o AuthContext carregar a sessão
  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#99D1D3"
        />
      </View>
    );
  }

  // Usuário não autenticado
  if (!usuario) {
    return <Redirect href="/registre_se" />;
  }

  // Usuário ainda não escolheu um nível
  if (!usuario.nivelAtual) {
    return <Redirect href="/selecionar_nivel" />;
  }

  // Usuário já possui um nível salvo
  return (
    <Redirect
      href={{
        pathname: "/operacoes",
        params: {
          nivel: usuario.nivelAtual,
        },
      }}
    />
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
