import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Signin from './components/Signin';
import Signup from './components/Signup';

const Login = () => {

  const [loginState, setLoginState] = useState(true)

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardOpen(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardOpen(false);
  });


  return (

    <ImageBackground
      source={require('./assets/background.jpg')}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView
        style={{
          height: '100%',
        }}>
        <View style={{
          flex:1,
          flexDirection:'column',
          alignItems:'center',
          justifyContent: 'center',
        }} >
          <Logo />
          {
            loginState ? <Signin /> : <Signup />
          }
          {!keyboardOpen && (
            <TouchableOpacity style={{marginBottom:50}} onPress={() => setLoginState(!loginState)} >
              {
                loginState ? (<Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#B9BF0B',
                    fontFamily: 'sans-serif-thin',
                    margin: 20,
                    fontWeight: 'bold'
                  }}>
                  Aún sin cuenta? Registrate
                </Text>) : (<Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#B9BF0B',
                    fontFamily: 'sans-serif-thin',
                    margin: 20,
                    fontWeight: 'bold'
                  }}>
                  Tienes cuenta? Inicia Sesión
                </Text>)
              }

            </TouchableOpacity>
          )}

        </View>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default Login;

const styles = StyleSheet.create({

});
