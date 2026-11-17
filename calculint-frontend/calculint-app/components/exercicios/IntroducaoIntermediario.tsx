
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import VisualIntermediario, {
  formatarDecimal,
} from "./VisualIntermediario";

import { formatarMoeda } from "./VisualCotidiano";

interface Props {
  operacao: string;
  onContinuar: () => void;
}

export default function IntroducaoIntermediario({
  operacao,
  onContinuar,
}: Props) {
  const [etapa, setEtapa] = useState<0 | 1>(0);

  const adicao = operacao === "adicao";
  const dinheiro = etapa === 1;

  const numero1 = dinheiro
    ? adicao ? 450 : 2000
    : adicao ? 15 : 58;

  const numero2 = dinheiro
    ? adicao ? 275 : 875
    : 23;

  const simbolo = adicao ? "+" : "-";
  const resposta = adicao
    ? numero1 + numero2
    : numero1 - numero2;

  const resultado = dinheiro
    ? formatarMoeda(resposta)
    : formatarDecimal(resposta);

  function avancar() {
    if (etapa === 0) {
      setEtapa(1);
    } else {
      onContinuar();
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.faixa} />

      <View style={styles.conteudo}>
        <Text style={styles.etiqueta}>
          VAMOS APRENDER
        </Text>

        <Text style={styles.titulo}>
          {dinheiro
            ? adicao
              ? "Adição com dinheiro"
              : "Subtração com dinheiro"
            : adicao
              ? "Adição com vírgula"
              : "Subtração com vírgula"}
        </Text>

        <Text style={styles.subtitulo}>
          {dinheiro
            ? "VALORES EM REAIS E CENTAVOS"
            : "NÚMEROS DECIMAIS"}
        </Text>

        <Text style={styles.explicacao}>
          {dinheiro
            ? adicao
              ? "Podemos somar preços para descobrir quanto gastaremos em uma compra."
              : "Podemos subtrair o preço de um produto para descobrir quanto dinheiro sobra."
            : adicao
              ? "Para somar números com vírgula, alinhamos as vírgulas e somamos cada parte."
              : "Para subtrair números com vírgula, alinhamos as vírgulas e retiramos uma quantidade da outra."}
        </Text>

        <VisualIntermediario
          tipo={dinheiro ? "DINHEIRO_DECIMAL" : "DECIMAL"}
          numero1={numero1}
          numero2={numero2}
          simbolo={simbolo}
        />

        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>
            {dinheiro
              ? formatarMoeda(numero1)
              : formatarDecimal(numero1)}
            {" "}{simbolo}{" "}
            {dinheiro
              ? formatarMoeda(numero2)
              : formatarDecimal(numero2)}
            {" = "}{resultado}
          </Text>
        </View>

        <Text style={styles.lembrete}>
          {dinheiro
            ? "Lembre-se de separar os reais dos centavos."
            : "Alinhe sempre as vírgulas!"}
        </Text>

        <View style={styles.espaco} />

        <Pressable
          style={styles.botao}
          onPress={avancar}
          accessibilityRole="button"
        >
          <Text style={styles.textoBotao}>
            {etapa === 0 ? "Próximo" : "Começar exercícios"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    flexGrow: 1,
  },

  faixa: {
    height: 75,
    backgroundColor: "#41C7C4",
  },

  conteudo: {
    flex: 1,
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 28,
  },

  etiqueta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#009FA7",
    marginBottom: 14,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#294C55",
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#009FA7",
    marginBottom: 22,
  },

  explicacao: {
    fontSize: 15,
    lineHeight: 24,
    color: "#435C61",
  },

  resultado: {
    backgroundColor: "#ECF9F7",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },

  resultadoTexto: {
    fontSize: 17,
    fontWeight: "700",
    color: "#294C55",
    textAlign: "center",
  },

  lembrete: {
    fontSize: 14,
    color: "#5D797D",
    textAlign: "center",
    marginTop: 25,
  },

  espaco: {
    flex: 1,
    minHeight: 35,
  },

  botao: {
    backgroundColor: "#FF8915",
    borderRadius: 10,
    padding: 17,
    alignItems: "center",
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
