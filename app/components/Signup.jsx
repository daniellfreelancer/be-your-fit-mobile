import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import googleLogo from '../assets/google.png';
import facebookLogo from '../assets/facebook.png';
import { useSignUpUserMutation } from '../data/userApi';
import { useDispatch } from 'react-redux'
export default function Signup() {
    const [signUpUser] = useSignUpUserMutation()
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      password: '',
      from:'app',
      role:'user',
      imgUrl: 'http://images7.memedroid.com/images/UPLOADED894/5f0502441774c.jpeg'
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
          <TouchableOpacity style={styles.touchIn} onPress={handleSignUp}>
            <Text style={styles.textIn}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchGo}>
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
