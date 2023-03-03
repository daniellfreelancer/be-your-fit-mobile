import React from 'react';
import {  Image} from 'react-native';
import Login from './app/LoginScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app//HomeScreen';
import TrainingScreen from './app/TrainingeScreen';
import BeYourFit from './app/BeYourFitScreen';
import RecipesScreen from './app/RecipesScreen';
import { Provider } from 'react-redux';
import store from './app/data/store';
import { ToastProvider } from 'react-native-toast-notifications'


function App() {

  const Tab = createBottomTabNavigator();

  return (
    <ToastProvider 
    placement='top'
    duration={3000}
    animationType='zoom-in'
    offsetTop={10}
    swipeEnabled={true}
    style={{
      width:'80%',
      height:50
    }}>
    <Provider store={store}>

    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Inicio'
        screenOptions={({ route }) => ({
        
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? require('./app/assets/home-outline.png') : require('./app/assets/home.png');
            } else if (route.name === 'Rutina') {
              iconName = focused ? require('./app/assets/rutina-outline.png') : require('./app/assets/rutina.png');
            } else if (route.name === 'Login') {
              iconName = focused ? require('./app/assets/enter-outline.png') : require('./app/assets/enter.png');
            } else if (route.name === 'BeYourFit') {
              iconName = focused ? require('./app/assets/runing-outline.png') : require('./app/assets/runing.png');
            } else if (route.name === 'Recetas') {
              iconName = focused ? require('./app/assets/cocinando-outline.png') : require('./app/assets/cocinando.png');
            }


            return <Image style={{ width: 30, height: 30 }} source={iconName}  />;
          },
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              height: 70,
              borderTopColor: '#262626',
              backgroundColor:'#262626',
            }
          ],
          tabBarHideOnKeyboard: true,

        })}

      >
        <Tab.Screen name='Inicio' component={HomeScreen} options={{ headerShown: false, }} />
        <Tab.Screen name='Recetas' component={RecipesScreen} options={{ headerShown: false }} />
        <Tab.Screen name='BeYourFit' component={BeYourFit} options={{ headerShown: false }} />
        <Tab.Screen name='Rutina' component={TrainingScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Tab.Navigator>

    </NavigationContainer>
    
    </Provider>
    </ToastProvider>
  );
}

export default App;
