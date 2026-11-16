import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { obterExercicios, nomeNivel, type Categoria, type Nivel } from "../data/exercises";

type EstadoResposta = "pergunta" | "certo" | "tentar" | "fim";

const NIVEIS: Nivel[] = ["basico", "intermediario", "avancado"];
const CATEGORIAS: Categoria[] = ["adicao", "subtracao", "multiplicacao", "divisao", "cotidiano"];
const NOMES_CATEGORIAS: Record<Categoria, string> = {
  adicao: "adição",
  subtracao: "subtração",
  multiplicacao: "multiplicação",
  divisao: "divisão",
  cotidiano: "atividades do cotidiano",
};

export default function Exercicio() {
  const params = useLocalSearchParams<{ nivel?: string; categoria?: string }>();
  const nivel: Nivel = NIVEIS.includes(params.nivel as Nivel) ? params.nivel as Nivel : "basico";
  const categoria: Categoria = CATEGORIAS.includes(params.categoria as Categoria)
    ? params.categoria as Categoria
    : "adicao";

  return <SessaoExercicio key={`${nivel}:${categoria}`} nivel={nivel} categoria={categoria} />;
}

function SessaoExercicio({ nivel, categoria }: { nivel: Nivel; categoria: Categoria }) {
  const router = useRouter();
  const exercicios = useMemo(() => obterExercicios(nivel, categoria), [nivel, categoria]);
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [estado, setEstado] = useState<EstadoResposta>("pergunta");
  const exercicio = exercicios[indice];

  function conferirResposta() {
    if (selecionada === null) return;
    setEstado(selecionada === exercicio.resposta ? "certo" : "tentar");
  }

  function tentarNovamente() {
    setSelecionada(null);
    setEstado("pergunta");
  }

  function avancar() {
    if (indice + 1 >= exercicios.length) {
      setEstado("fim");
      return;
    }
    setIndice((atual) => atual + 1);
    setSelecionada(null);
    setEstado("pergunta");
  }

  function voltarParaCategorias() {
    router.replace({ pathname: "/operacoes", params: { nivel } });
  }

  if (estado === "certo" || estado === "tentar" || estado === "fim") {
    const terminou = estado === "fim";
    const acertou = estado === "certo";
    return (
      <SafeAreaView style={styles.telaFeedback}>
        <View style={styles.faixa} />
        <Pressable accessibilityRole="button" onPress={voltarParaCategorias} style={styles.voltarLink}>
          <Text style={styles.voltarTexto}>‹ Voltar aos assuntos</Text>
        </Pressable>
        <View style={styles.feedbackCentral}>
          <View style={[styles.iconeFeedback, estado === "tentar" && styles.iconeTentar]}>
            <Text style={[styles.iconeTexto, estado === "tentar" && styles.coracao]}>
              {terminou ? "★" : acertou ? "✓" : "♥"}
            </Text>
          </View>
          <Text style={styles.tituloFeedback}>
            {terminou ? "Você concluiu!" : acertou ? "Muito bem!" : "Quase lá!"}
          </Text>
          <Text style={styles.mensagemFeedback}>
            {terminou
              ? `Você concluiu a sequência de ${NOMES_CATEGORIAS[categoria]} no nível ${nomeNivel(nivel)}. Escolha outro assunto ou mude de nível quando quiser.`
              : acertou
                ? "Você encontrou a resposta! Continue aprendendo no seu ritmo."
                : "Vamos tentar novamente. Você pode fazer isso no seu ritmo."}
          </Text>
          {acertou ? <Text style={styles.explicacao}>{exercicio.explicacao}</Text> : null}
        </View>
        <View style={styles.acoesFeedback}>
          {estado === "tentar" ? (
            <Botao titulo="Tentar novamente" onPress={tentarNovamente} />
          ) : terminou ? (
            <Botao titulo="Voltar aos assuntos" onPress={voltarParaCategorias} />
          ) : (
            <Botao titulo="Continuar" onPress={avancar} />
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <View style={styles.faixa} />
      <Pressable accessibilityRole="button" onPress={voltarParaCategorias} style={styles.voltarLink}>
        <Text style={styles.voltarTexto}>‹ Voltar aos assuntos</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.topo}>
          <View>
            <Text style={styles.rotulo}>HORA DE PRATICAR · {nomeNivel(nivel).toLocaleUpperCase()}</Text>
            <Text style={styles.titulo}>{exercicio.titulo}</Text>
          </View>
          <Text style={styles.progresso}>{indice + 1} de {exercicios.length}</Text>
        </View>

        <Text style={styles.instrucao}>Observe e responda:</Text>
        <Text style={styles.pergunta}>{exercicio.enunciado}</Text>

        {exercicio.visual ? (
          <View style={styles.visual}>
            <Text style={styles.visualTexto}>{exercicio.visual}</Text>
          </View>
        ) : null}
        {exercicio.apoio ? <Text style={styles.apoio}>{exercicio.apoio}</Text> : null}

        <Text style={styles.instrucaoAlternativas}>Escolha uma resposta:</Text>
        <View style={styles.listaAlternativas}>
          {exercicio.alternativas.map((alternativa, alternativaIndice) => {
            const ativa = selecionada === alternativa;
            return (
              <Pressable
                key={`${alternativa}-${alternativaIndice}`}
                accessibilityRole="button"
                accessibilityState={{ selected: ativa }}
                onPress={() => setSelecionada(alternativa)}
                style={({ pressed }) => [
                  styles.alternativa,
                  ativa && styles.alternativaAtiva,
                  pressed && styles.alternativaPressionada,
                ]}
              >
                <View style={[styles.radio, ativa && styles.radioAtivo]}>
                  {ativa ? <View style={styles.radioPonto} /> : null}
                </View>
                <Text style={styles.textoAlternativa}>{alternativa}</Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={selecionada === null}
          onPress={conferirResposta}
          style={({ pressed }) => [styles.botao, selecionada === null && styles.botaoDesativado, pressed && styles.botaoPressionado]}
        >
          <Text style={styles.textoBotao}>Conferir resposta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Botao({ titulo, onPress }: { titulo: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
      <Text style={styles.textoBotao}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#FFFFFF" },
  faixa: { height: 34, backgroundColor: "#69C5C6" },
  conteudo: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 32, flexGrow: 1 },
  topo: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 },
  rotulo: { fontSize: 10, color: "#17869A", fontWeight: "700", letterSpacing: 0.4, marginBottom: 6 },
  titulo: { color: "#2F3437", fontSize: 23, fontWeight: "700" },
  progresso: { color: "#687983", fontSize: 12, paddingTop: 2 },
  instrucao: { color: "#71818A", fontSize: 14, marginBottom: 8 },
  pergunta: { color: "#252D32", fontSize: 18, lineHeight: 26, fontWeight: "700" },
  visual: { minHeight: 88, borderRadius: 14, borderWidth: 1, borderColor: "#D5E5E5", backgroundColor: "#F4F9F8", alignItems: "center", justifyContent: "center", padding: 18, marginTop: 22 },
  visualTexto: { color: "#386976", fontSize: 25, fontWeight: "700", textAlign: "center" },
  apoio: { color: "#687983", fontSize: 13, lineHeight: 19, marginTop: 12 },
  instrucaoAlternativas: { color: "#71818A", fontSize: 12, marginTop: 26, marginBottom: 9 },
  listaAlternativas: { gap: 8 },
  alternativa: { minHeight: 48, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, borderWidth: 1, borderColor: "#D9E0E2", borderRadius: 9, backgroundColor: "#FFFFFF" },
  alternativaAtiva: { borderColor: "#1688B7", borderWidth: 2, backgroundColor: "#F5FBFD" },
  alternativaPressionada: { opacity: 0.75 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "#91A0A6", alignItems: "center", justifyContent: "center", marginRight: 12 },
  radioAtivo: { borderColor: "#1688B7" },
  radioPonto: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#1688B7" },
  textoAlternativa: { color: "#334850", fontSize: 16, flexShrink: 1 },
  botao: { minHeight: 50, borderRadius: 10, backgroundColor: "#FF8B27", alignItems: "center", justifyContent: "center", paddingHorizontal: 16, marginTop: 22 },
  botaoDesativado: { backgroundColor: "#D7DEE0" },
  botaoPressionado: { opacity: 0.8 },
  textoBotao: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", textAlign: "center" },
  telaFeedback: { flex: 1, backgroundColor: "#FFFFFF" },
  voltarLink: { alignSelf: "flex-start", paddingHorizontal: 22, paddingVertical: 10 },
  voltarTexto: { color: "#4D7884", fontSize: 14, fontWeight: "600" },
  feedbackCentral: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 35 },
  iconeFeedback: { width: 124, height: 124, borderRadius: 62, backgroundColor: "#E2F2EC", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  iconeTentar: { backgroundColor: "#E3F3F3" },
  iconeTexto: { color: "#318D78", fontSize: 72, fontWeight: "400", lineHeight: 82 },
  coracao: { color: "#408F8A", fontSize: 64 },
  tituloFeedback: { color: "#285C51", fontSize: 28, fontWeight: "700", textAlign: "center" },
  mensagemFeedback: { color: "#50666D", fontSize: 17, lineHeight: 26, textAlign: "center", marginTop: 22 },
  explicacao: { color: "#48666B", fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 18, paddingHorizontal: 10 },
  acoesFeedback: { paddingHorizontal: 28, paddingBottom: 24 },
});
