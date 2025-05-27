import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';


type RootStackParamList = {
  LOGIN: undefined;
  HOME: undefined;
};

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const handleHomePage = () => {
    navigation.navigate('HOME');
  };

  const handleSignup = async () => {
    if (email && password) {
      const user = { email, password };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('HOME');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong while saving user');
      }
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };
  
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleHomePage}>
        <Image style={styles.backButton} source={require("../assets/GoBack.png")} />
      </TouchableOpacity>

      <View>
        <Text style={styles.headingText}>Let’s</Text>
        <Text style={styles.headingText}>Start Your</Text>
        <Text style={styles.headingText}>Journey</Text>
      </View>
      
      <View style={styles.formContainer}>

        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require("../assets/Name.png")} />
          <TextInput 
            style={[styles.textInput, { fontSize: 24 }]}
            placeholder='Enter your name'
            placeholderTextColor={Colors.gray}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require("../assets/Email.png")} />
          <TextInput 
            style={[styles.textInput, { fontSize: 24 }]}
            placeholder='Enter your email'
            placeholderTextColor={Colors.gray}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require("../assets/Secure.png")} />
          <TextInput 
            style={[styles.textInput, { fontSize: 24 }]}
            placeholder='Enter your password'
            placeholderTextColor={Colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.inputContainer, { backgroundColor: Colors.secondary }]}
          onPress={handleSignup}
        >
          <Text style={styles.submitText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Already have an account!
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.linkText}> Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backButton: {
    marginTop: 60,
    marginBottom: 10,
    width: 63,
    height: 46,
  },
  headingText: {
    color: Colors.secondary,
    fontSize: 40,
    marginLeft: 15,
    fontFamily: Fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 20,
    width: 355,
    height: 55,
    borderRadius: 100,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 40,
  },
  icon: {
    margin: 5,
  },
  textInput: {
    color: Colors.white,
    flex: 1,
  },
  submitText: {
    color: Colors.white,
    fontSize: 32,
    marginLeft: 100,
    fontFamily: Fonts.SemiBold,
  },
  text: {
    fontSize: 24,
    color: Colors.white,
    marginLeft: 15,
    fontFamily: Fonts.Regular,
  },
  linkText: {
    color: Colors.secondary,
    fontSize: 24,
    fontFamily: Fonts.SemiBold,
  }
})