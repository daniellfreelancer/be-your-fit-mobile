import { StyleSheet, Text, View, ImageBackground, SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TrainingScreen() {

  const eraseData = async ()  => {
    if(AsyncStorage.getItem('@storage_Key')){
      AsyncStorage.removeItem('@storage_Key')
      console.log('async storage limpio')
    }
  }

  const setData = async () =>{

    const myData = await AsyncStorage.setItem('token', 'Data user')

    if(myData){
      console.log(myData)
    }

  }

  const getData = async ()=>{
    console.log(JSON.parse(AsyncStorage.getItem('token')) )
  }
  
  return (





    <ImageBackground
      source={require('./assets/background02.jpg')}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'#EAF205'}}>Training Screen</Text>
          <TouchableOpacity onPress={eraseData} style={{backgroundColor:'#EAF205', padding:20, borderRadius:30, margin:20}} >
            <Text>Borrar AsyncStorage</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={setData} style={{backgroundColor:'#EAF205', padding:20, borderRadius:30, margin:20}} >
            <Text>setear AsyncStorage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getData} style={{backgroundColor:'#EAF205', padding:20, borderRadius:30, margin:20}} >
            <Text>obtener AsyncStorage</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({})