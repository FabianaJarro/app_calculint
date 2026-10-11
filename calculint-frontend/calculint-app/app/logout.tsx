import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");

      router.replace("/registre_se");
    }

    void logout();
  }, [router]);

}


