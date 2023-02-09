import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './app/components/LoginScreen';
import Ionic from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/components/HomeScreen';
import ProfileScreen from './app/components/ProfileScreen';
import BeYourFit from './app/components/BeYourFitScreen';
import RecipesScreen from './app/components/RecipesScreen';


function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? require('./app/assets/home-outline.png') : require('./app/assets/home.png');
            } else if (route.name === 'Mi Cuenta') {
              iconName = focused ? require('./app/assets/user.png') : require('./app/assets/user-outline.png');
            } else if (route.name === 'Login') {
              iconName = focused ? require('./app/assets/enter-outline.png') : require('./app/assets/enter.png');
            } else if (route.name === 'BeYourFit') {
              iconName = focused ? require('./app/assets/runing-outline.png') : require('./app/assets/runing.png');
            } else if (route.name === 'Recetas') {
              iconName = focused ? require('./app/assets/cocinando-outline.png') : require('./app/assets/cocinando.png');
            }


            return <Image style={{ width: 25, height: 25 }} source={iconName} />;
          },
          tabBarStyle: [
            {
              height: 60,
              borderTopColor: 'gray'
            }
          ]

        })}

      >
        <Tab.Screen name='Inicio' component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Recetas' component={RecipesScreen} options={{ headerShown: false }} />
        <Tab.Screen name='BeYourFit' component={BeYourFit} options={{ headerShown: false }} />
        <Tab.Screen name='Mi Cuenta' component={ProfileScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigatorSection: {
    backgroundColor: 'blue'
  }
});

export default App;
