import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function continuarLogin() {
    // Por enquanto, apenas mostra os valores.
    // Depois vamos trocar isso pela chamada ao seu backend.
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo} />

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>
          Acesse sua conta{"\n"}no Calculint!
        </Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário..."
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={continuarLogin}>
          <Text style={styles.textoBotao}>Avançar</Text>
        </TouchableOpacity>

        <Text style={styles.textoCadastro}>
          Não possui uma conta?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/cadastro")}
          >
            Clique aqui e crie uma conta
          </Text>
        </Text>
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
    paddingTop: 80,
  },

  titulo: {
    color: "#638298",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 64,
  },

  label: {
    color: "#55505A",
    fontSize: 13,
    marginLeft: 14,
    marginBottom: -7,
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#8C8790",
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 16,
  },

  botao: {
    alignSelf: "center",
    backgroundColor: "#D96E2A",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 42,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  textoCadastro: {
    color: "#7C7780",
    textAlign: "center",
    fontSize: 12,
    marginTop: 18,
  },

  link: {
    color: "#202020",
    textDecorationLine: "underline",
  },
});