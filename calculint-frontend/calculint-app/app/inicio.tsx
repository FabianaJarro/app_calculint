import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "../hooks/useLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react"


const router = useRouter()

export default function Inicio() {
    const router = useRouter();
    const [name, setName] = useState("");

    useEffect(() => {
        async function carregarNome() {
            const nomeSalvo = await AsyncStorage.getItem("name");

            if (nomeSalvo) {
                setName(nomeSalvo);
            }
        }

        carregarNome();
    }, []);
    

    return (
        <View style={styles.container}>
            <Text>Oláaaa, {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },


})