import { View, Text, TextInput, StyleSheet, Pressable, Modal } from "react-native"
import { useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

interface InputProps {
    label: string,
    value: string
    //  |value
    updateValue(value: string): void

}


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text>{label}</Text>
            <TextInput value={value} style={styles.input} onChangeText={text => updateValue(text)} />
        </View>
    )
}

//no react native é diferente o onChangeText?
//pesquisar event.target.value (não usar)

export function CreateModal() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const { mutate } = useFoodDataMutate()
    //const [estado, setEstado]= useState('valor')

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <Text>Cadastre um novo item</Text>

                <View style={styles.modalContent}>
                    <Input
                        label="title"
                        value={title}
                        updateValue={setTitle}
                    />

                    <Input
                        label="price"
                        value={price}
                        updateValue={setPrice}
                    />

                    <Input
                        label="image"
                        value={image}
                        updateValue={setImage}
                    />

                    <Pressable onPress={submit} style={styles.button} >

                        <Text>
                            novo
                        </Text>
                    </Pressable>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        width: '80%',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    modalContent: {
        width: "85%",
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 16,

        elevation: 10,
    },


    button: {
        marginTop: 8,
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
    },

    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingHorizontal: 10,
    },

    inputContainer: {
        marginBottom: 16,
    },





})