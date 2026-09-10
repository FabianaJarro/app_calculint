import {View, Image, StyleSheet, Text} from "react-native"
import { Card } from "../components/Card"


export default function Index(){

const data= [];

  return(
    <View style={styles.container}> 
      <Text>test- cardápio</Text>
      
      <View >
        {data.map(foodData=><Card/>)}

      </View>
      



    </View>
  )
}





const styles= StyleSheet.create({
  container: {
    backgroundColor:"#FFF" ,
    gap: 80,
    
  }


})