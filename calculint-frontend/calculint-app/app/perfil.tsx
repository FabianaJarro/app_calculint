import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "../api";
import { useAuth } from "../contexts/auth";
import type { UserProfile } from "../interface/UserProfile";

const ESCOLARIDADES = [
  "Ensino fundamental I",
  "Ensino fundamental II",
  "Ensino médio",
  "Ensino técnico",
  "Ensino superior",
  "Outro",
];

const NOMES_NIVEIS: Record<string, string> = {
  BASICO: "Básico",
  INTERMEDIARIO: "Intermediário",
  AVANCADO: "Avançado",
};

export default function Perfil() {
  const { atualizarNome } = useAuth();
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;
    api.get<UserProfile>("/user/me")
      .then(({ data }) => {
        if (!ativo) return;
        setPerfil(data);
        setNome(data.name ?? "");
        setIdade(data.idade == null ? "" : String(data.idade));
        setEscolaridade(data.escolaridade ?? "");
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
        if (ativo) Alert.alert("Não foi possível carregar", "Confira sua conexão e tente novamente.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  async function salvarPerfil() {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) {
      Alert.alert("Nome necessário", "Informe seu nome para salvar o perfil.");
      return;
    }
    const idadeNumero = idade.trim() ? Number(idade) : null;
    if (idadeNumero !== null && (!Number.isInteger(idadeNumero) || idadeNumero < 3 || idadeNumero > 120)) {
      Alert.alert("Confira a idade", "Informe uma idade entre 3 e 120 anos ou deixe o campo em branco.");
      return;
    }

    setSalvando(true);
    setMensagem("");
    try {
      const { data } = await api.put<UserProfile>("/user/me", {
        name: nomeLimpo,
        idade: idadeNumero,
        escolaridade: escolaridade || null,
      });
      setPerfil(data);
      setNome(data.name);
      await atualizarNome(data.name);
      setMensagem("Perfil atualizado.");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      Alert.alert("Não foi possível salvar", "Confira sua conexão e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <View style={styles.carregando}><ActivityIndicator size="large" color="#4D8D9A" /></View>;
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Editar perfil</Text>
      <Text style={styles.subtitulo}>Revise seus dados e complete o perfil se quiser.</Text>

      {perfil && (!perfil.idade || !perfil.escolaridade) ? (
        <View style={styles.aviso}>
          <Text style={styles.avisoTitulo}>Complete seu perfil (opcional)</Text>
          <Text style={styles.avisoTexto}>
            Idade e escolaridade são opcionais. Você pode usar os exercícios mesmo sem preencher esses campos.
          </Text>
        </View>
      ) : null}

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        autoCapitalize="words"
        maxLength={120}
        style={styles.input}
      />

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.campoSomenteLeitura}><Text style={styles.valorSomenteLeitura}>{perfil?.email ?? "—"}</Text></View>

      <Text style={styles.label}>Nível atual</Text>
      <View style={styles.campoSomenteLeitura}>
        <Text style={styles.valorSomenteLeitura}>{perfil?.nivelAtual ? NOMES_NIVEIS[perfil.nivelAtual] : "Ainda não escolhido"}</Text>
      </View>

      <View style={styles.separador} />
      <Text style={styles.secaoTitulo}>Informações opcionais</Text>
      <Text style={styles.secaoAjuda}>Preencha apenas o que quiser compartilhar.</Text>

      <Text style={styles.label}>Idade</Text>
      <TextInput
        value={idade}
        onChangeText={(valor) => setIdade(valor.replace(/\D/g, "").slice(0, 3))}
        placeholder="Ex.: 12"
        keyboardType="number-pad"
        maxLength={3}
        style={styles.input}
      />

      <Text style={styles.label}>Nível de escolaridade</Text>
      <View style={styles.opcoesEscolaridade}>
        {ESCOLARIDADES.map((opcao) => {
          const selecionada = escolaridade === opcao;
          return (
            <Pressable
              key={opcao}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionada }}
              onPress={() => setEscolaridade(selecionada ? "" : opcao)}
              style={[styles.opcao, selecionada && styles.opcaoSelecionada]}
            >
              <Text style={[styles.textoOpcao, selecionada && styles.textoOpcaoSelecionada]}>{opcao}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.privacidade}>O Calculint não precisa de CPF ou endereço para você praticar.</Text>
      {mensagem ? <Text style={styles.mensagemSucesso}>{mensagem}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={salvando}
        onPress={salvarPerfil}
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado, salvando && styles.botaoDesativado]}
      >
        {salvando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.textoBotao}>Salvar alterações</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#FFFFFF" },
  carregando: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  conteudo: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 40 },
  titulo: { color: "#638298", fontSize: 28, fontWeight: "700" },
  subtitulo: { color: "#6B7E8B", fontSize: 15, lineHeight: 22, marginTop: 7, marginBottom: 22 },
  aviso: { backgroundColor: "#EAF6F7", borderRadius: 12, padding: 14, marginBottom: 20 },
  avisoTitulo: { color: "#386976", fontSize: 15, fontWeight: "700", marginBottom: 5 },
  avisoTexto: { color: "#50666D", fontSize: 13, lineHeight: 19 },
  label: { color: "#43566A", fontSize: 14, fontWeight: "600", marginBottom: 7, marginTop: 14 },
  input: { minHeight: 50, borderWidth: 1, borderColor: "#CCD7DB", borderRadius: 10, paddingHorizontal: 13, color: "#2F3437", fontSize: 16 },
  campoSomenteLeitura: { minHeight: 48, justifyContent: "center", paddingHorizontal: 13, borderRadius: 10, backgroundColor: "#F3F6F7" },
  valorSomenteLeitura: { color: "#596C74", fontSize: 15 },
  separador: { height: 1, backgroundColor: "#E2E8EA", marginTop: 24, marginBottom: 18 },
  secaoTitulo: { color: "#334F61", fontSize: 18, fontWeight: "700" },
  secaoAjuda: { color: "#6B7E8B", fontSize: 13, marginTop: 5, marginBottom: 8 },
  opcoesEscolaridade: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2 },
  opcao: { borderWidth: 1, borderColor: "#CCD7DB", borderRadius: 18, paddingVertical: 9, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
  opcaoSelecionada: { backgroundColor: "#EAF6F7", borderColor: "#4D8D9A" },
  textoOpcao: { color: "#50666D", fontSize: 13 },
  textoOpcaoSelecionada: { color: "#315F69", fontWeight: "700" },
  privacidade: { color: "#6B7E8B", fontSize: 12, lineHeight: 18, marginTop: 18 },
  mensagemSucesso: { color: "#2D806D", fontSize: 14, fontWeight: "600", marginTop: 16 },
  botao: { minHeight: 50, borderRadius: 10, backgroundColor: "#FF8B27", alignItems: "center", justifyContent: "center", marginTop: 20 },
  botaoPressionado: { opacity: 0.82 },
  botaoDesativado: { opacity: 0.65 },
  textoBotao: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
