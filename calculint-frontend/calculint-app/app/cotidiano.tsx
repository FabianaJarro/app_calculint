
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

type Modulo = "dinheiro" | "troco" | "medidas" | "compras";

const atividades = [
  {
    id: "dinheiro",
    nome: "Dinheiro",
    descricao: "Reais e centavos",
    simbolo: "R$",
    cor: "#F8E6A4",
    disponivel: true,
  },
  {
    id: "troco",
    nome: "Dinheiro e troco",
    descricao: "Calcule o troco",
    simbolo: "−",
    cor: "#BEE9DA",
    disponivel: true,
  },
  {
    id: "medidas",
    nome: "Medidas",
    descricao: "Litros e mililitros",
    simbolo: "mL",
    cor: "#C7E5F3",
    disponivel: true,
  },
  {
    id: "compras",
    nome: "Compras e troco",
    descricao: "Situações de compra",
    simbolo: "🛒",
    cor: "#E7D6F2",
    disponivel: true,
  },
  {
    id: "relogio",
    nome: "Relógio",
    descricao: "Analógico e digital",
    simbolo: "◷",
    cor: "#E5E5E5",
    disponivel: false,
  },
] as const;

export default function Cotidiano() {
  const router = useRouter();

  function abrirAtividade(modulo: Modulo) {
    router.push({
      pathname: "/exercicio",
      params: {
        nivel: "AVANCADO",
        operacao: "cotidiano",
        modulo,
      },
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>
        Atividades do cotidiano
      </Text>

      <Text style={styles.descricao}>
        A matemática aparece em pequenas
        situações do nosso dia a dia.
      </Text>

      {atividades.map((atividade, index) => (
        <Pressable
          key={atividade.id}
          disabled={!atividade.disponivel}
          onPress={() => {
            if (atividade.disponivel) {
              abrirAtividade(atividade.id as Modulo);
            }
          }}
          style={[
            styles.cartao,
            !atividade.disponivel && styles.desabilitado,
          ]}
        >
          <View
            style={[
              styles.icone,
              { backgroundColor: atividade.cor },
            ]}
          >
            <Text style={styles.simbolo}>
              {atividade.simbolo}
            </Text>
          </View>

          <View style={styles.textos}>
            <Text style={styles.nome}>
              {index + 1}. {atividade.nome}
            </Text>

            <Text style={styles.subtitulo}>
              {atividade.descricao}
            </Text>
          </View>

          <Text style={styles.seta}>
            {atividade.disponivel ? "›" : "Em breve"}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  conteudo: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    padding: 24,
    paddingTop: 38,
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 25,
    color: "#175D51",
    fontWeight: "700",
    marginBottom: 10,
  },
  descricao: {
    fontSize: 15,
    color: "#6D888B",
    lineHeight: 23,
    marginBottom: 32,
  },
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E9E9",
    borderRadius: 15,
    padding: 13,
    marginBottom: 14,
    gap: 12,
  },
  icone: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  simbolo: {
    fontSize: 23,
    fontWeight: "700",
    color: "#436768",
  },
  textos: {
    flex: 1,
    gap: 5,
  },
  nome: {
    fontSize: 16,
    color: "#334F61",
    fontWeight: "700",
  },
  subtitulo: {
    color: "#738B92",
    fontSize: 12,
  },
  seta: {
    color: "#6C8BA3",
    fontSize: 15,
  },
  desabilitado: {
    opacity: 0.55,
  },
});
