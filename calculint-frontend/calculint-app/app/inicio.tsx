import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


const router=useRouter()

export default function Inicio() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },


})