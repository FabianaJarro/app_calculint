import { Image, StyleSheet, Text, View } from "react-native"

interface CardProps {
    price: string,
    title: string,
    image: string
}

export const Card = ({ title, price, image}: CardProps) => {
    return (
        <View style={styles.card}>
            {/* <Image
            source={require("../../app/assets/images/kiki.jpg")}
            style={styles.card}
        /> */}
            <Text>{title}</Text>
            <Text>valor: {price}</Text>
            <Image
                source={{ uri: image }}
                style={styles.card}
            />
        </View>
    )
}

//   ../       → components/
//   ../../    → calculint-app/



const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 150,
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
    },
    //camelCase object key

})