import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from './Logo'

export default function BeYourFit() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Be YourFit</Text>
      <Logo/>
    </View>
  )
}

const styles = StyleSheet.create({})