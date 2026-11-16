import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function BoasVindas() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topo} />

      <View style={styles.conteudo}>
        <Image
          source={require("./assets/images/logo-calculint.png")}
          style={styles.logo}
          resizeMode="cover"
          accessibilityLabel="Logo do Calculint"
        />

        <Text style={styles.titulo}>
          Seja bem-vindo{"\n"}ao Calculint!
        </Text>

        <Text style={styles.pergunta}>Como deseja iniciar?</Text>

        <TouchableOpacity
          style={[styles.botao, styles.botaoLogin]}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.textoBotao}>Efetuar Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoCadastro]}
          onPress={() => router.replace("/cadastro")}
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
    paddingTop: 74,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 48,
  },
  titulo: {
    color: "#F57C00",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 38,
  },
  pergunta: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 22,
  },
  botao: {
    height: 48,
    width: "100%",
    maxWidth: 264,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
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
