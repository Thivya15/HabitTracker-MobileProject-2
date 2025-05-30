import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import AddHabits from './src/screen/AddHabits';
import HabitsList from './src/screen/HabitsList';
import ProgressScreen from './src/screen/ProgressScreen';
import LogoutScreen from './src/screen/LogoutScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HOME" component={HomeScreen}/>
        <Stack.Screen name="LOGIN" component={LoginScreen}/>
        <Stack.Screen name="SIGNUP" component={SignupScreen}/>
        <Stack.Screen name="ADD_HABITS" component={AddHabits}/>
        <Stack.Screen name="HABITSLIST" component={HabitsList}/>
        <Stack.Screen name="PROGRESS" component={ProgressScreen}/>
        <Stack.Screen name="LOGOUT" component={LogoutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({})






