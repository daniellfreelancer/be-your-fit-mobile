import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import logoInicial from '../assets/iconBe.png';
export default function Logo() {
  return (
    <View
    style={{
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 10,
      marginBottom: 50,
    }}>
    <Text
      style={{
        textAlign: 'center',
        fontSize: 70,
        color: '#0D0D0D',
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
        color: '#0D0D0D',
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