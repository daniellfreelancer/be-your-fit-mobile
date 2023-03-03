import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import googleLogo from '../assets/google.png';
import { useSignInUserMutation } from '../data/userApi';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from "react-native-toast-notifications";
import { setUserLogin } from '../data/userAuth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Logo from './Logo';
export default function Signin() {

  const toast = useToast()

  const [signInUser] = useSignInUserMutation()
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    from: "form"
  });

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const clientH2 = "1025685732537-pg22av19ur5btsjn8cdmvnvau5gnvr4t.apps.googleusercontent.com";

  const [userDataFirebase, setUserDataFirebase] = useState({
    email: '',
    password: '',
    from: 'google',
  })

  const myAlert = useToast()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: clientH2
    });
  }, [])

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const handleSignIn = async () => {

    signInUser(userInfo)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          Alert.alert(dataMessage)
          toast.show(dataMessage, {type: 'normal'})

        } else {

          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          toast.show(dataSuccess,{ type: 'success'})
          dispatch(setUserLogin(res.data.response.user))
          AsyncStorage.setItem('token',JSON.stringify(res.data.response.token))

        }
      })
      .catch((error) => {
        console.log(error);
      });

      const myToken = await AsyncStorage.getItem('token')

    setUserInfo({
      email: '',
      password: '',
      from: "form"
    })

  }




  return (
    <View style={styles.globalView}>
      <Logo/>
      
        <Text style={styles.loginText}>Iniciar sesión</Text>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={value => handleOnChangeText(value, 'email')}
            value={email}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => handleOnChangeText(value, 'password')}
            value={password}
          />
        </View>
        <View style={styles.globalView2}>
          <TouchableOpacity style={styles.touchIn} onPress={handleSignIn}>
            <Text style={styles.textIn} >Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.touchGo}
          onPress={() => onGoogleButtonPress()
            .then((res) => {
              console.log(res.user)
              let userFirebase = {
                email: res.user.email,
                password: res.user.uid,
                from: 'google',
              }
              if (userDataFirebase.email !== null) {
                signInUser(userFirebase)
                  .then((res) => {
                    if (res.error) {
                      let dataError = res.error;
                      let dataMessage = dataError.data;
                      toast.show(dataMessage, {type:'danger'})
                      // Alert.alert(res.error.data.message)
                      console.log(res.error)
                    } else {
                      let dataResponse = res.data;
                      let dataSuccess = dataResponse.message;
                      console.log(dataSuccess)
                      toast.show(dataSuccess, {type:'success'})
                      // Alert.alert("Success")
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

            }).catch((error) => {
              console.log(error)
            })}
          >
            <Text style={styles.textGo} >Ingresar con</Text>
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
  globalView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap:10
  },
  globalView2: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop:40,
    gap:10
  },
  loginText: {
    textAlign: 'center',
    fontSize: 35,
    color: '#EAF205',
    fontFamily: 'sans-serif',
    marginBottom: 40,
    marginTop: 40
  },
  socialLogo: {
    width: 30,
    height: 30,
  },
  viewInput: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: '85%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 2
  },
  textInput: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#d3d3d3',
    flex: 1,
    paddingVertical: 8,
  },
  touchIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#EAF205',
    borderWidth: 1,
    height: 45,
    width: '40%',
    backgroundColor: '#B9BF0B',
    borderRadius: 30,
  },
  textIn: {
    color: '#262626',
    fontFamily: 'sans-serif',
    fontSize: 15,

  },
  touchGo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#EAF205',
    borderWidth: 1,
    height: 45,
    width: '40%',
    borderRadius: 30,

  },
  textGo: {
    color: '#EAF205',
    fontFamily: 'sans-serif',
    fontSize: 15,

  }
})
