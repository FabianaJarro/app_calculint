import { View, Image, StyleSheet, Text, Pressable, ScrollView } from "react-native"
import { Card } from "../components/Card"
import { FoodData } from "../interface/FoodData";
import { useFoodData } from "../hooks/useFoodData";
import { useState } from "react"
import { CreateModal } from "../components/CreateModal";

export default function Index() {

  // const data: FoodData[]=[];
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal=()=>{
    setIsModalOpen(prev=>!prev)
  }


  //uma contante chamada data que é um array do tipeo FoodData,começando vazio
  //const algumaCoisa: Tipo = valor;

  return (
    <View style={styles.container}>
      <Text>test- cardápio</Text>

      <ScrollView style={styles.scroll}>
        {data?.map((foodData )=> (<Card
          key={foodData.id}
          title={foodData.title}
          image={foodData.image}
          price={foodData.price}
        />))}

      </ScrollView>
      {isModalOpen && <CreateModal/>}
      <Pressable onPress= {handleOpenModal}>
        <Text>
          novo
        </Text>
        
      </Pressable>
    </View>
  )
}

//o foodData (com minuscula) é uma variável (tipo o item (do exemplo lá))



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    gap: 80,

  },

  scroll: {
    flex: 1,
    width: "100%",
  },


})