import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

type RootStackParamList = {
  LOGIN: undefined;
};

const LogoutScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // ✅ Clear all AsyncStorage data
        await AsyncStorage.clear();

        Alert.alert('Logged Out', 'You have been logged out successfully.');

        // Redirect to LOGIN screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'LOGIN' }],
        });

      } catch (error) {
        Alert.alert('Error', 'Something went wrong during logout.');
      }
    };

    logoutUser();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
      <Text style={styles.text}>Logging you out...</Text>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.Medium,
  },
});
