import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';


type RootStackParamList = {
  SIGNUP: undefined;
  HOME: undefined;
  ADD_HABITS: undefined;
  HABITSLIST: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const storedUser = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (storedUser && storedUser.email == email && storedUser.password === password) {
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('HABITSLIST');
      } else {
      Alert.alert('Error', 'Invalid email or password');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to retrieve user');
    }
  }

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const handleHomePage = () => {
    navigation.navigate('HOME');
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePage}>
        <Image style={styles.backButton} source={require('../assets/GoBack.png')} />
      </TouchableOpacity>

      <View>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require('../assets/Email.png')} />
          <TextInput
            style={[styles.textInput, { fontSize: 24 }]}
            placeholder="Enter your email"
            placeholderTextColor={Colors.gray}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require('../assets/Secure.png')} />
          <TextInput
            style={[styles.textInput, { fontSize: 24 }]}
            placeholder="Enter your password"
            placeholderTextColor={Colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.inputContainer, { backgroundColor: Colors.secondary }]}
          onPress={handleLogin}
        >
          <Text style={styles.submitText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>
        Don’t have an account! 
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.linkText}> Sign up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backButton: {
    marginTop: 80,
    marginBottom: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 20,
    width: 355,
    height: 55,
    borderRadius: 100,
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 30,
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
  },
});
