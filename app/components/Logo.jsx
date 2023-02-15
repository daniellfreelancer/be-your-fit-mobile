import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import logoInicial from '../assets/running.png';
export default function Logo() {
  return (
    <View
    style={{
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 20,
      marginBottom: 50,
    }}>
    <Text
      style={{
        textAlign: 'center',
        fontSize: 70,
        color: '#B9BF0B',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
      }}>
      Be
    </Text>
    <Text
      style={{
        textAlign: 'center',
        fontSize: 70,
        fontWeight: '200',
        fontFamily: 'sans-serif-thin',
        color: '#B9BF0B',
      }}>
      YourFit
    </Text>
    <Image source={logoInicial} alt="img-logo" style={styles.imgLogo} />
  </View>
  )
}

const styles = StyleSheet.create({
    imgLogo: {
        width: 50,
        height: 50,
        marginLeft: 10,
      }
})