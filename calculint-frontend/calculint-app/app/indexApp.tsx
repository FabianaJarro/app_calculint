import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Inicio() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topo} />

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>
          Seja Bem-vindo{"\n"}ao Calculint!
        </Text>

        <Text style={styles.pergunta}>Como deseja iniciar?</Text>

        <TouchableOpacity
          style={[styles.botao, styles.botaoLogin]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.textoBotao}>Efetuar Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoCadastro]}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.textoBotao}>Efetuar Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topo: {
    height: 105,
    backgroundColor: "#99D1D3",
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 260,
  },
  titulo: {
    color: "#F57C00",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 46,
  },
  pergunta: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 22,
  },
  botao: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  botaoLogin: {
    backgroundColor: "#99D1D3",
  },
  botaoCadastro: {
    backgroundColor: "#D96E2A",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});