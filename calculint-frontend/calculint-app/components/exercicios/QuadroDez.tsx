
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

type Props = {
  preenchidos: number;
};

const TOTAL = 10;

const bolinha = require("../../app/assets/exercicios/bolinha.png");

export default function QuadroDez({
  preenchidos,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>
        Observe os espaços preenchidos:
      </Text>

      <View style={styles.quadro}>
        {Array.from({ length: TOTAL }, (_, index) => {
          const preenchido = index < preenchidos;

          return (
            <View key={index} style={styles.celula}>
              {preenchido && (
                <Image
                  source={bolinha}
                  style={styles.bolinha}
                  resizeMode="contain"
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 28,
  },

  instrucao: {
    color: "#51848B",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },

  quadro: {
    width: 234,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
  },

  celula: {
    width: 42,
    height: 42,
    borderWidth: 1.5,
    borderColor: "#9CCED1",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  bolinha: {
    width: 30,
    height: 30,
  },
});
