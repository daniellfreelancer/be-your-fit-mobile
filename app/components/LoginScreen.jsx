import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import Signin from './Signin';
import Signup from './Signup';

const Login = () => {
  const [data, setData] = useState({});
  const [loginState, setLoginState] = useState(true)

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardOpen(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardOpen(false);
  });

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setData(jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      if (jsonValue !== null) {
        console.log('DATA init');
        console.log();
        console.log('DATA end');

        return JSON.parse(jsonValue);
      } else {
        console.log('sin data');
      }
      return;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (AsyncStorage.getItem('@storage_Key')) {
      console.log('Data llena');
      setData(AsyncStorage.getItem('@storage_Key'));
    } else {
      console.log('data vacia');
    }
  }, []);

  return (

      <ImageBackground
            source={require('../assets/background.jpg')}
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
      <View
        style={{
          flex: 1,
          flexDirection:'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginVertical: 20,

        }}>
          <Logo/>
          {
            loginState ? <Signin/> : <Signup/>
          }
          

        {/* <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              color="mediumaquamarine"
              style={{borderRadius: 6}}
              title={'Crear cuenta con Google'}
              onPress={() => {
                GoogleSignin.configure({
                  androidClientId:
                    '663413782261-7k306od0to5lcfmfn5l9aaievjbpftst.apps.googleusercontent.com',
                });
                GoogleSignin.hasPlayServices()
                  .then(hasPlayService => {
                    if (hasPlayService) {
                      GoogleSignin.signIn()
                        .then(userInfo => {
                          console.log(JSON.stringify(userInfo));
                          let user = JSON.stringify(userInfo)
                          storeData(user)

                        })
                        .catch(e => {
                          console.log('ERROR IS: ' + JSON.stringify(e));
                        });
                    }
                  })
                  .catch(e => {
                    console.log('ERROR IS: ' + JSON.stringify(e));
                  });
              }}
            />
            <Text> {data?.user}</Text>
          </View> */}




        {!keyboardOpen && (
          <TouchableOpacity onPress={()=>setLoginState(!loginState)} >
            {
              loginState ? (            <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#B9BF0B',
                  fontFamily: 'sans-serif-thin',
                  margin: 20,
                  fontWeight:'bold'
                }}>
                Aún sin cuenta? Registrate
              </Text>) : (            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#B9BF0B',
                fontFamily: 'sans-serif-thin',
                margin: 20,
                fontWeight:'bold'
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

});
