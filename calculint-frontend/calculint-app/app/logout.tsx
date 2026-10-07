import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function sair() {
      await AsyncStorage.multiRemove(["token", "name"]);
      router.replace("/registre_se");
    }

    void sair();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#4D8D9A" />
      <Text style={styles.texto}>Saindo da sua conta...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  texto: {
    color: "#638298",
    fontSize: 15,
  },
});
