import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LOGIN: undefined;
  SIGNUP: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedButton, setSelectedButton] = useState<'login' | 'signup'>('login');


  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoText}>
        <Image source={require('../assets/logo.png') as ImageSourcePropType} style={styles.logo} />
        <Text style={styles.text}>Habit Tracker</Text>
      </View>
      <Image source={require('../assets/blueImg.png') as ImageSourcePropType} style={styles.bannerImage} />
      <Text style={styles.title1}>
        Build <Text style={styles.title2}>Good Habits,</Text>
      </Text>
      <Text style={[styles.title1, { marginBottom: 80 }]}>
        Break <Text style={styles.title2}>Bad Ones!</Text>
      </Text>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={[
            styles.ButtonWrapper,
            selectedButton === 'login' && { backgroundColor: Colors.secondary },
          ]}
          onPress={() => {
            setSelectedButton('login');
            handleLogin();
          }}
        >
        <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ButtonWrapper,
            selectedButton === 'signup' && { backgroundColor: Colors.secondary },
          ]}
          onPress={() => {
            setSelectedButton('signup');
            handleSignup();
          }}
        >
        <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText:{
    flexDirection: 'row',
  },
  logo: {
    width: 54,
    height: 56,
    marginBottom: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  text:{
    fontSize: 30,
    color: Colors.secondary,
  },
  bannerImage: {
    width: 356,
    height: 319,
    marginBottom: 50,
  },
  title1: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: Fonts.Regular,
    paddingHorizontal: 20,
  },
  title2: {
    color: Colors.secondary,
    fontSize: 36,
    fontWeight: '700' as '700',
    fontFamily: Fonts.SemiBold,
  },
  ButtonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: '90%',
    height: 60,
    borderRadius: 100,
  },
  ButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 100,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Fonts.SemiBold,
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Fonts.Regular,
  },
});
