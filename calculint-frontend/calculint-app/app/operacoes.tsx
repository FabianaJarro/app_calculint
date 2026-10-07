import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const operacoes = [
  { id: "adicao", nome: "Adição", simbolo: "+", cor: "#D96E2A", fundo: "#FFF1E8" },
  { id: "subtracao", nome: "Subtração", simbolo: "−", cor: "#4D8D9A", fundo: "#EAF6F7" },
  { id: "multiplicacao", nome: "Multiplicação", simbolo: "×", cor: "#D96E2A", fundo: "#FFF1E8" },
  { id: "divisao", nome: "Divisão", simbolo: "÷", cor: "#4D8D9A", fundo: "#EAF6F7" },
  { id: "revisao", nome: "Revisão", simbolo: "✓", cor: "#638298", fundo: "#EEF3F7" },
];

const nomesNiveis: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function Operacoes() {
  const { nivel } = useLocalSearchParams<{ nivel?: string }>();
  const nomeNivel = nivel ? nomesNiveis[nivel] ?? nivel : "";

  function selecionarOperacao(nome: string) {
    Alert.alert(
      "Em breve",
      `Os exercícios de ${nome.toLowerCase()} serão adicionados em uma próxima etapa.`,
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      {nomeNivel ? (
        <View style={styles.tagNivel}>
          <Text style={styles.textoTag}>NÍVEL {nomeNivel.toLocaleUpperCase()}</Text>
        </View>
      ) : null}
      <Text style={styles.titulo}>Escolha uma operação</Text>
      <Text style={styles.subtitulo}>
        Selecione o que você quer praticar.
      </Text>

      <View style={styles.grade}>
        {operacoes.map((operacao) => (
          <Pressable
            key={operacao.id}
            accessibilityRole="button"
            onPress={() => selecionarOperacao(operacao.nome)}
            style={({ pressed }) => [
              styles.cartao,
              { backgroundColor: operacao.fundo },
              pressed && styles.cartaoPressionado,
            ]}
          >
            <View style={[styles.bolhaSimbolo, { backgroundColor: operacao.cor }]}>
              <Text style={styles.simbolo}>{operacao.simbolo}</Text>
            </View>
            <Text style={styles.nomeOperacao}>{operacao.nome}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 36,
  },
  tagNivel: {
    alignSelf: "flex-start",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#EAF6F7",
    marginBottom: 12,
  },
  textoTag: {
    color: "#4D7884",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  titulo: {
    color: "#638298",
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "700",
  },
  subtitulo: {
    color: "#6B7E8B",
    fontSize: 15,
    marginTop: 7,
    marginBottom: 25,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  cartao: {
    width: "48%",
    minHeight: 142,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  cartaoPressionado: {
    opacity: 0.76,
    transform: [{ scale: 0.98 }],
  },
  bolhaSimbolo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },
  simbolo: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "500",
  },
  nomeOperacao: {
    color: "#334F61",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});
