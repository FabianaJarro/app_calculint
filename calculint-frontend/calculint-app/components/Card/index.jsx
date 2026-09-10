import { Image, StyleSheet } from "react-native"

export const Card = () => {
    return (
        <Image
            source={require("../../assets/images/kiki.jpg")}
            style={styles.card}
        />



    )
}

const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
    }
})