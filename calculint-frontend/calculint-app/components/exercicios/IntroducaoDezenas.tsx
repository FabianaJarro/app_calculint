
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import DezenasVisual from "./DezenasVisual";

type Props = {
  onContinuar: () => void;
};

export default function IntroducaoDezenas({
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
        Dezenas e unidades
      </Text>

      <Text style={styles.subtitulo}>
        Separe os grupos
      </Text>

      <Text style={styles.descricao}>
        Uma dezena vale 10 unidades.
        Primeiro junte as dezenas;
        depois, as unidades.
      </Text>

      <DezenasVisual
        numero1={12}
        numero2={13}
      />

      <Text style={styles.etiqueta}>
        VEJA COMO FAZER
      </Text>

      <Text style={styles.descricao}>
        Para somar 12 + 13, primeiro juntamos
        uma dezena com outra dezena, formando
        2 dezenas. Depois juntamos 2 unidades
        com 3 unidades, formando 5 unidades.
      </Text>

      <Text style={styles.conta}>
        12 + 13 = 25
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
    fontSize: 22,
    fontWeight: "700",
    color: "#21A6A4",
    textAlign: "center",
    marginTop: 5,
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
