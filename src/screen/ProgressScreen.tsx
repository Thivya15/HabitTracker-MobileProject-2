import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../utils/Colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type Habit = {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completed: boolean;
};

type RootStackParamList = {
  HABITSLIST: undefined;
};

const ProgressScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [completion, setCompletion] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const stored = await AsyncStorage.getItem('habits');
        if (stored) {
          const habits: Habit[] = JSON.parse(stored);
          const dailyHabits = habits.filter(h => h.frequency === 'daily');
          const done = dailyHabits.filter(h => h.completed);
          const percent =
            dailyHabits.length === 0
              ? 0
              : Math.round((done.length / dailyHabits.length) * 100);
          setCompletion(percent);
        }
      };
      fetchData();
    }, [])
  );

  const handleHabitsList = () => {
    navigation.navigate('HABITSLIST');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHabitsList}>
        <Image style={styles.backButton} source={require('../assets/GoBack.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>Today's Completion</Text>
      <Text style={styles.percentage}>{completion}% Completed</Text>
    </View>
  );
};

export default ProgressScreen;

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
  title: {
    color: Colors.white,
    fontSize: 24,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  percentage: {
    fontSize: 48,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});
