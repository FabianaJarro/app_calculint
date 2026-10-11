import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {

    const router = useRouter();

    useEffect(() => {
        async function verificarLogin() {

            const token = await AsyncStorage.getItem("token");

            if (token) {
                router.replace("/inicio");
            } else {
                router.replace("/login");
            }

        }

        verificarLogin();

    }, []);

    return (
        <View>
            <ActivityIndicator />
        </View>
    );
}