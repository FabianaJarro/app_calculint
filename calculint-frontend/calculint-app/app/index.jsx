import {View, Image, StyleSheet, Text} from "react-native"
import { Card } from "../components/Card"


export default function Index(){
  return(
    <View style={styles.container}> 
      <Text>teste</Text>
      <Card/>
    </View>
  )
}





const styles= StyleSheet.create({
  container: {
    backgroundColor:"#FFF" ,
    gap: 80,
    
  }


})