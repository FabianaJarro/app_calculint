import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EmBreve() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const titulo = Array.isArray(section) ? section[0] : section ?? "Em breve";

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✦</Text>
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>
        Estamos preparando essa área para você.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#FFFFFF",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1E8",
    marginBottom: 18,
  },
  icon: {
    color: "#D96E2A",
    fontSize: 30,
  },
  titulo: {
    color: "#638298",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },
  descricao: {
    color: "#6B7E8B",
    fontSize: 15,
    textAlign: "center",
    marginTop: 9,
  },
});
