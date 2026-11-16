import { ScrollView, StyleSheet, Text } from "react-native";

export default function Progresso() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Seu progresso</Text>
      <Text style={styles.texto}>O histórico das atividades aparecerá aqui.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 28, backgroundColor: "#FFFFFF" },
  titulo: { color: "#638298", fontSize: 26, fontWeight: "700", marginBottom: 12 },
  texto: { color: "#50666D", fontSize: 16, lineHeight: 24 },
});
