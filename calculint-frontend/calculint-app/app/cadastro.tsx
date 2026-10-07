import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  function continuarCadastro() {
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo} />

      <KeyboardAvoidingView
        style={styles.areaFormulario}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.titulo}>Crie sua conta no Calculint! É grátis!</Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome..."
              placeholderTextColor="#29262B"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu E-mail..."
              placeholderTextColor="#29262B"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Crie um Usuário..."
              placeholderTextColor="#29262B"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Crie uma senha..."
              placeholderTextColor="#29262B"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              returnKeyType="next"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme a senha..."
              placeholderTextColor="#29262B"
              value={confirmacaoSenha}
              onChangeText={setConfirmacaoSenha}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={continuarCadastro}
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={continuarCadastro}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>Avançar</Text>
          </TouchableOpacity>

          <Text style={styles.textoLogin}>
            Já possui uma conta?{" "}
            <Text style={styles.link} onPress={() => router.push("/login")}>
              Clique aqui e faça Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
  areaFormulario: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 34,
    paddingTop: 76,
    paddingBottom: 28,
  },
  titulo: {
    color: "#638298",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "bold",
    marginBottom: 24,
  },
  campo: {
    marginBottom: 16,
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
    height: 52,
    borderWidth: 1,
    borderColor: "#8C8790",
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#202020",
  },
  botao: {
    alignSelf: "center",
    backgroundColor: "#D96E2A",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 4,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textoLogin: {
    color: "#7C7780",
    textAlign: "center",
    fontSize: 12,
    marginTop: 16,
  },
  link: {
    color: "#202020",
    textDecorationLine: "underline",
  },
});
