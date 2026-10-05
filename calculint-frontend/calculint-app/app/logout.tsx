import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable, Text } from "react-native";

const router = useRouter();

export default function Logout() {

  async function logout() {

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("name");

    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={logout}>
        <Text>
          sair
        </Text>

      </Pressable>
    </View>




  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },


})
