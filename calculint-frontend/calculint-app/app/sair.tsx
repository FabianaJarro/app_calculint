import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const router = useRouter();

async function sair() {

  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("name");

  router.replace("/login");
}