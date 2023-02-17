import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import googleLogo from '../assets/google.png';
import { useSignUpUserMutation } from '../data/userApi';
import { useDispatch } from 'react-redux'
import auth from '@react-native-firebase/auth';
import {  GoogleSignin,  GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useToast } from "react-native-toast-notifications";

export default function Signup() {

  const clientH1 = "1025685732537-q5d08uknp7varhlat51csfe94t9vvtr8.apps.googleusercontent.com";
  const clientH2 = "1025685732537-pg22av19ur5btsjn8cdmvnvau5gnvr4t.apps.googleusercontent.com";

  const [userDataFirebase, setUserDataFirebase] = useState({
    name: 'null',
    email: '',
    password: '',
    from:'google',
    role:'user',
    imgUrl: ''
  })

  const myAlert = useToast()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:clientH2
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


    const [signUpUser] = useSignUpUserMutation()
    const dispatch = useDispatch()
    

    const [userInfo, setUserInfo] = useState({
      name: '',
      email: null,
      password: '',
      from:'form',
      role:'user',
      imgUrl: 'http://images7.memedroid.com/images/UPLOADED894/5f0502441774c.jpeg'
    })

    const [userGmail, setUserGmail] = useState({
      name: null,
      email: '',
      password: '',
      from:'google',
      role:'user',
      imgUrl: ''
    })

    const { name, email, password } = userInfo;

    const handleOnChangeText = (value, fieldName) => {
      setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleSignUp = async ()  =>{
    signUpUser(userInfo)
    .then((res) => {
      if (res.error) {
        let dataError = res.error;
        let dataMessage = dataError.data;
        myAlert.show(res.error.data.message, {type:'normal'})
        console.log(res.error)
      } else {
        let dataResponse = res.data;
        let dataSuccess = dataResponse.message;
        console.log(dataResponse)
        setUserInfo({name:'',email:'', password:''})
        myAlert.show(dataSuccess, {type:'success'})
        // Alert.alert("Success")
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

const handleGoogle = async () => {
  GoogleSignin.configure({
    androidClientId:'1025685732537-0f70mj46mn3832dv0uk0322rv8mg6oq9.apps.googleusercontent.com',
  });
  GoogleSignin.hasPlayServices()
    .then(hasPlayService => {
      if (hasPlayService) {
        GoogleSignin.signIn()
          .then(userInfo => {
            setUserGmail({
              name: userInfo.user.name,
              email: userInfo.user.email,
              password: userInfo.user.id,
              from:'google',
              role:'user',
              imgUrl: 'http://images7.memedroid.com/images/UPLOADED894/5f0502441774c.jpeg'
            })
            console.log(userInfo)

          })
          .catch(e => {
            console.log('ERROR IS: ' + JSON.stringify(e));
          });
      }
    })
    .catch(e => {
      console.log('ERROR IS: ' + JSON.stringify(e));
    });
}

  async function handleGoogleSignUp(){
    GoogleSignin.configure({
      androidClientId:'1025685732537-0f70mj46mn3832dv0uk0322rv8mg6oq9.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let photo = userInfo.user.photo === null ? 'http://images7.memedroid.com/images/UPLOADED894/5f0502441774c.jpeg' : userInfo.user.photo; 
      setUserGmail({
        name:userInfo.user.name,
        email: userInfo.user.email,
        password: userInfo.user.id,
        from:'google',
        role:'user',
        imgUrl: photo
      })
      if (userGmail.name !== null ){
        signUpUser(userGmail).then((res) => {
          if (res.error) {
            let dataError = res.error;
            let dataMessage = dataError.data;
            Alert.alert(res.error.data.message)
            console.log(res.error)
          } else {
            let dataResponse = res.data;
            let dataSuccess = dataResponse.message;
            console.log(dataResponse)
            setUserInfo({name:'',email:'', password:''})
            Alert.alert("Success")
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }


      
    } catch (error) {
       console.log('Error al iniciar sesión con Google', error);
    }
  }

  const signOutFirebase = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('Signout Succesfull')
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <View style={styles.globalView}>
        <Text style={styles.loginText}>Registro</Text>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={value => handleOnChangeText(value, 'name')}
          placeholder="Usuario"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="off"
        />
      </View>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={value => handleOnChangeText(value, 'email')}
          value={email}
          autoCompleteType="off"

        />
      </View>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => handleOnChangeText(value, 'password')}
          value={password}
          autoCompleteType="off"
        />
      </View>
      <View>
          <Button onPress={()=>{myAlert.show("Hola soy toast",{type:'success'})}} title='Signout firebase'/>
        </View>
      <View style={styles.globalView2}>
          <TouchableOpacity style={styles.touchIn} onPress={handleSignUp}>
            <Text style={styles.textIn}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.touchGo} 
          onPress={ () => onGoogleButtonPress()
            .then((res)=>{
            console.log(res.user)
            setUserDataFirebase({
              name: res.user.displayName,
              email: res.user.email,
              password: res.user.uid,
              from:'google',
              role:'user',
              imgUrl: 'http://images7.memedroid.com/images/UPLOADED894/5f0502441774c.jpeg'
            })
            if(userDataFirebase.email !== null){
              signUpUser(userDataFirebase)
              .then((res) => {
                if (res.error) {
                  let dataError = res.error;
                  let dataMessage = dataError.data;
                  Alert.alert(res.error.data.message)
                  console.log(res.error)
                } else {
                  let dataResponse = res.data;
                  let dataSuccess = dataResponse.message;
                  console.log(dataResponse)
                  setUserInfo({name:'',email:'', password:''})
                  Alert.alert("Success")
                }
              })
              .catch((error) => {
                console.log(error);
              });
            }

            }).catch((error)=>{
              console.log(error)
              })} >
            <Text style={styles.textGo} >Registro con</Text>
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
    justifyContent: 'center',
    gap: 10
  },
  globalView2: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginVertical: 20
  },
  loginText: {
    textAlign: 'center',
    fontSize: 35,
    color: '#EAF205',
    fontFamily: 'sans-serif',
    marginBottom: 20,
    marginTop: 20
  },
  socialLogo: {
    width: 30,
    height: 30,
  },
  viewInput: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
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
