import {View, Image, StyleSheet, Text} from "react-native"
import { Card } from "../components/Card"
import { FoodData } from "../interface/FoodData";
import { useFoodData } from "../hooks/useFoodData";

export default function Index(){

// const data: FoodData[]=[];
const {data} =useFoodData();


//uma contante chamada data que é um array do tipeo FoodData,começando vazio
//const algumaCoisa: Tipo = valor;

  return(
    <View style={styles.container}> 
      <Text>test- cardápio</Text>
      
      <View >
        {data?.map(foodData=><Card 
                                title={foodData.title}
                                image={foodData.image}
                                price={foodData.price}
                                />)}

      </View>
    </View>
  )
}

//o foodData (com minuscula) é uma variável (tipo o item (do exemplo lá))



const styles= StyleSheet.create({
  container: {
    backgroundColor:"#FFF" ,
    gap: 80,
    
  }


})