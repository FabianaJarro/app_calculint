import { Image, StyleSheet, Text} from "react-native"

interface CardProps{
    price: string,
    title: string,
    image: string
}

export const Card = ({price, image, title}: CardProps)=>{
    return (
        <>
        <Image
            source={require("../../app/assets/images/kiki.jpg")}
            style={styles.card}
        />
        
        <Text>{title}</Text>
        <Text>valor: {price}</Text>
        
        </>
    )
}

//   ../       → components/
//   ../../    → calculint-app/



const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
    },
    //camelCase object key

})