
import {
  View,
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

type Props = {
  imagem: ImageSourcePropType;
  total: number;
  retirar: number;
};

export default function ObjetosRetirados({
  imagem,
  total,
  retirar,
}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, index) => {
        const retirado = index >= total - retirar;

        return (
          <View key={index} style={styles.objeto}>
            <Image
              source={imagem}
              style={[
                styles.imagem,
                retirado && styles.imagemRetirada,
              ]}
              resizeMode="contain"
            />

            {retirado && (
              <View style={styles.risco} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    marginVertical: 30,
  },

  objeto: {
    width: 44,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  imagem: {
    width: 37,
    height: 37,
  },

  imagemRetirada: {
    opacity: 0.4,
  },

  risco: {
    position: "absolute",
    width: 49,
    height: 3,
    backgroundColor: "#EF7950",
    borderRadius: 3,
    transform: [{ rotate: "-48deg" }],
  },
});
