import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";

type Nivel = "BASICO" | "INTERMEDIARIO" | "AVANCADO";
type Operacao = "adicao" | "subtracao" | "multiplicacao" | "divisao";

type ProgressoItem = {
  nivel: Nivel;
  operacao: Operacao;
  modulo: string;
  acertos: number;
  totalQuestoes: number;
};

const ICONES = {
  adicao: require("./assets/operacoes/adicao.png"),
  subtracao: require("./assets/operacoes/subtracao.png"),
  multiplicacao: require("./assets/operacoes/multiplicacao.png"),
  divisao: require("./assets/operacoes/divisao.png"),
};

const NOMES_OPERACOES: Record<Operacao, string> = {
  adicao: "Adição",
  subtracao: "Subtração",
  multiplicacao: "Multiplicação",
  divisao: "Divisão",
};

const TOTAL_MODULOS_BASICO: Record<Operacao, number> = {
  adicao: 4,
  subtracao: 4,
  multiplicacao: 4,
  divisao: 4,
};

export default function Progresso() {
  const [progresso, setProgresso] = useState<ProgressoItem[]>([]);
  const [nivelAberto, setNivelAberto] = useState<Nivel | null>(null);

  useEffect(() => {
    async function carregarProgresso() {
      try {
        const response = await axios.get("http://localhost:8080/progresso");
        setProgresso(response.data);
      } catch (error) {
        console.log("Erro ao buscar progresso", error);
      }
    }

    carregarProgresso();
  }, []);

  function alternarNivel(nivel: Nivel) {
    setNivelAberto((anterior) => (anterior === nivel ? null : nivel));
  }

  function contarModulosFeitos(nivel: Nivel, operacao: Operacao) {
    const registros = progresso.filter(
      (item) => item.nivel === nivel && item.operacao === operacao
    );

    const modulosUnicos = new Set(registros.map((item) => item.modulo));
    return modulosUnicos.size;
  }

  function renderBarra(quantidadeFeita: number, total: number) {
    return (
      <View style={styles.barraContainer}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segmento,
              index < quantidadeFeita
                ? styles.segmentoPreenchido
                : styles.segmentoVazio,
            ]}
          />
        ))}
      </View>
    );
  }

  function renderNivel(nivel: Nivel, titulo: string) {
    const aberto = nivelAberto === nivel;

    return (
      <View style={styles.blocoNivel}>
        <Pressable
          onPress={() => alternarNivel(nivel)}
          style={styles.linhaNivel}
        >
          <Text style={styles.textoNivel}>{titulo}</Text>
          <Text style={styles.seta}>{aberto ? "⌃" : "⌄"}</Text>
        </Pressable>

        {aberto && (
          <View style={styles.caixaProgresso}>
            {(["adicao", "subtracao", "multiplicacao", "divisao"] as Operacao[]).map(
              (operacao) => {
                const feitos = contarModulosFeitos(nivel, operacao);
                const total =
                  nivel === "BASICO" ? TOTAL_MODULOS_BASICO[operacao] : 4;

                return (
                  <View key={operacao} style={styles.linhaOperacao}>
                    <Image source={ICONES[operacao]} style={styles.icone} />
                    {renderBarra(feitos, total)}
                  </View>
                );
              }
            )}
          </View>
        )}

        <View style={styles.divisor} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.topo} />

      <Text style={styles.titulo}>Progresso</Text>
      <Text style={styles.subtitulo}>Confira seu progresso em cada nível!</Text>

      {renderNivel("BASICO", "Nível básico")}
      {renderNivel("INTERMEDIARIO", "Nível intermediário")}
      {renderNivel("AVANCADO", "Nível avançado")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  conteudo: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingBottom: 40,
  },

  topo: {
    height: 80,
    backgroundColor: "#26C6C8",
    marginBottom: 28,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0C6B61",
    marginHorizontal: 30,
  },

  subtitulo: {
    fontSize: 14,
    color: "#6D8B8B",
    marginHorizontal: 30,
    marginTop: 4,
    marginBottom: 28,
  },

  blocoNivel: {
    marginHorizontal: 24,
  },

  linhaNivel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },

  textoNivel: {
    fontSize: 18,
    color: "#365B63",
  },

  seta: {
    fontSize: 20,
    color: "#365B63",
  },

  divisor: {
    height: 1,
    backgroundColor: "#D9D9D9",
  },

  caixaProgresso: {
    backgroundColor: "#D9D9D9",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  linhaOperacao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 14,
  },

  icone: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },

  barraContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
  },

  segmento: {
    flex: 1,
    height: 22,
    borderWidth: 1,
    borderColor: "#6EC7AF",
    borderRadius: 3,
  },

  segmentoPreenchido: {
    backgroundColor: "#A8DFC8",
  },

  segmentoVazio: {
    backgroundColor: "#EAF7F1",
  },
});