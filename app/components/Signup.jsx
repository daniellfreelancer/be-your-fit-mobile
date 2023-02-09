import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import googleLogo from '../assets/google.png';
import facebookLogo from '../assets/facebook.png';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
  
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });
    return (
        <View style={{flexDirection:'column', alignItems:'center', gap:10}}>
            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 35,
                        color: '#0D0D0D',
                        fontFamily: 'sans-serif-thin',
                        marginBottom: 20,
                    }}>
                    Registro
                </Text>
            </View>
            <View
            style={{
              borderBottomColor: '#F5FCFF',
              backgroundColor: '#FFFFFF',
              borderRadius: 30,
              width: 300,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <TextInput
              style={{
                height: 45,
                marginLeft: 16,
                borderBottomColor: '#d3d3d3',
                flex: 1,
                paddingVertical: 8,
              }}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#F5FCFF',
              backgroundColor: '#FFFFFF',
              borderRadius: 30,
              borderBottomWidth: 1,
              width: 300,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <TextInput
              style={{
                height: 45,
                marginLeft: 16,
                borderBottomColor: '#d3d3d3',
                flex: 1,
                paddingVertical: 8,
              }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 20, marginVertical: 40 }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderColor: '#0583F2',
            borderWidth: 0.5,
            paddingVertical: 13,
            paddingHorizontal: 40,
            backgroundColor: '#0583F2',
            borderRadius: 30,
          }} onPress={() => console.log('Login')}>
            <Text style={{color:'#F6FBFD', fontFamily:'sans-serif', fontSize:15}} >Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#0583F2',
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 30,
            }}>
            <Text>Ingresar con</Text>
            <Image
              source={googleLogo}
              alt="img-logo"
              style={styles.socialLogo}
            />
          </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonBe: {
        backgroundColor: '#0583F2',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginVertical: 20,
        color: 'white',
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
        width: 150,
        textAlign: 'center',
      },
      socialLogo: {
        width: 30,
        height: 30,
      },
})