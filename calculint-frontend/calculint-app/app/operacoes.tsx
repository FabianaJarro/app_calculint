import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CATEGORIAS, type Categoria, type Nivel } from "../data/exercises";

const nomesNiveis: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function Operacoes() {
  const router = useRouter();
  const { nivel } = useLocalSearchParams<{ nivel?: string }>();
  const nivelValido = nivel && nivel in nomesNiveis ? nivel as Nivel : "basico";
  const nomeNivel = nomesNiveis[nivelValido];

  function selecionarCategoria(categoria: Categoria) {
    router.push({ pathname: "/exercicio", params: { nivel: nivelValido, categoria } });
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
      <Text style={styles.titulo}>O que você quer praticar?</Text>
      <Text style={styles.subtitulo}>
        Escolha um assunto. Você pode praticar no seu ritmo.
      </Text>

      <View style={styles.grade}>
        {CATEGORIAS.map((operacao) => (
          <Pressable
            key={operacao.id}
            accessibilityRole="button"
            onPress={() => selecionarCategoria(operacao.id)}
            style={({ pressed }) => [
              styles.cartao,
              operacao.id === "cotidiano" && styles.cartaoCotidiano,
              { backgroundColor: operacao.fundo },
              pressed && styles.cartaoPressionado,
            ]}
          >
              <View style={[styles.bolhaSimbolo, operacao.id === "cotidiano" && styles.cartaoCotidianoBolha, { backgroundColor: operacao.cor }]}>
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
  cartaoCotidiano: {
    width: "100%",
    minHeight: 112,
    flexDirection: "row",
    gap: 14,
  },
  cartaoCotidianoBolha: {
    marginBottom: 0,
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
