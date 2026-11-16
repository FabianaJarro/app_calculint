
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

type Props = {
  numero1: number;
  numero2: number;
};

const imagemDezena = require(
  "../../app/assets/exercicios/dezena.png"
);

const imagemUnidade = require(
  "../../app/assets/exercicios/unidade.png"
);

function NumeroVisual({ valor }: { valor: number }) {
  const dezenas = Math.floor(valor / 10);
  const unidades = valor % 10;

  return (
    <View
      style={styles.numero}
      accessibilityLabel={`${valor}: ${dezenas} dezenas e ${unidades} unidades`}
    >
      <View style={styles.barras}>
        {Array.from({ length: dezenas }, (_, index) => (
          <Image
            key={`dezena-${index}`}
            source={imagemDezena}
            style={styles.dezena}
            resizeMode="contain"
          />
        ))}
      </View>

      <View style={styles.unidades}>
        {Array.from({ length: unidades }, (_, index) => (
          <Image
            key={`unidade-${index}`}
            source={imagemUnidade}
            style={styles.unidade}
            resizeMode="contain"
          />
        ))}
      </View>
    </View>
  );
}

export default function DezenasVisual({
  numero1,
  numero2,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.operacao}>
        <NumeroVisual valor={numero1} />

        <Text style={styles.sinal}>+</Text>

        <NumeroVisual valor={numero2} />
      </View>

      <Text style={styles.instrucao}>
        Junte as dezenas e as unidades.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
    gap: 18,
  },

  operacao: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  numero: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },

  barras: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
  },

  dezenas: {
    width: 12,
    height: 96,
  },

  unidades: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    maxWidth: 72,
    gap: 2,
  },

  dezena: {
    width: 12,
    height: 96,
  },

  unidade: {
    width: 16,
    height: 16,
  },

  sinal: {
    color: "#EF7950",
    fontSize: 25,
    fontWeight: "700",
  },

  instrucao: {
    color: "#777777",
    fontSize: 13,
    textAlign: "center",
  },
});
