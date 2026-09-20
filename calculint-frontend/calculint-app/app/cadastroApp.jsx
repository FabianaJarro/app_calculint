import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Text>Tela de Cadastro</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}