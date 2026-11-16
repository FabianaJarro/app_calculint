import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";

export default function NivelIntermediario() {
  const router = useRouter();
  useEffect(() => {
    router.replace({ pathname: "/operacoes", params: { nivel: "intermediario" } });
  }, [router]);
  return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator color="#4D8D9A" /></View>;
}
