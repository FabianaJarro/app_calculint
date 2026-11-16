
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import QuadroDez from "./QuadroDez";

type Props = {
  onContinuar: () => void;
};

export default function IntroducaoCompletar10({
  onContinuar,
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <View style={styles.faixa} />

      <Text style={styles.etiqueta}>
        VAMOS APRENDER
      </Text>

      <Text style={styles.titulo}>
        Completando 10
      </Text>

      <Text style={styles.subtitulo}>
        Formando uma dezena
      </Text>

      <Text style={styles.descricao}>
        Uma dezena tem 10 unidades. Vamos descobrir
        quantas bolinhas faltam para completar
        todos os espaços.
      </Text>

      <QuadroDez preenchidos={7} />

      <Text style={styles.etiqueta}>
        VEJA COMO FAZER
      </Text>

      <Text style={styles.descricao}>
        Temos 7 bolinhas preenchidas e 3 espaços
        vazios. Portanto, faltam 3 bolinhas
        para completar 10.
      </Text>

      <Text style={styles.conta}>
        7 + 3 = 10
      </Text>

      <Pressable
        style={styles.botao}
        onPress={onContinuar}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>
          Próximo
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 35,
  },

  faixa: {
    height: 75,
    backgroundColor: "#37C7C5",
    marginHorizontal: -24,
    marginBottom: 25,
  },

  etiqueta: {
    color: "#008DA3",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "700",
    color: "#252B2E",
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: "#252B2E",
    marginBottom: 12,
  },

  descricao: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444444",
    marginBottom: 24,
  },

  conta: {
    fontSize: 21,
    color: "#21A6A4",
    fontWeight: "700",
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#FF8915",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
