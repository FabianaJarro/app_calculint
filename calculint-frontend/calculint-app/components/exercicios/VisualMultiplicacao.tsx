
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

interface Props {
  grupos: number;
  objetosPorGrupo: number;
}

const FLOR = require("../../app/assets/basico/flor.png");

export default function VisualMultiplicacao({
  grupos,
  objetosPorGrupo,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>
        Observe os grupos e conte os objetos.
      </Text>

      <View style={styles.listaGrupos}>
        {Array.from({ length: grupos }, (_, i) => (
          <View key={i} style={styles.grupo}>
            <View style={styles.flores}>
              {Array.from(
                { length: objetosPorGrupo },
                (_, j) => (
                  <Image
                    key={j}
                    source={FLOR}
                    style={styles.flor}
                    resizeMode="contain"
                  />
                )
              )}
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.legenda}>
        {grupos} grupos de {objetosPorGrupo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
    gap: 18,
  },

  instrucao: {
    color: "#6D888B",
    fontSize: 13,
    textAlign: "center",
  },

  listaGrupos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },

  grupo: {
    width: 105,
    minHeight: 105,
    backgroundColor: "#F3FAF9",
    borderWidth: 1,
    borderColor: "#B6E6E2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
  },

  flores: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },

  flor: {
    width: 32,
    height: 32,
  },

  legenda: {
    color: "#347A89",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
