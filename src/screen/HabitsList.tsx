import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../utils/Colors';
import { Switch } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Habit = {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completed: boolean;
};

type RootStackParamList = {
  ADD_HABITS: undefined;
  PROGRESS: undefined;
  LOGOUT: undefined;
};

const HabitsList = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selected, setSelected] = useState<'all' | 'daily' | 'weekly'>('all');
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      const stored = await AsyncStorage.getItem('habits');
      if (stored) {
        setHabits(JSON.parse(stored));
      }
    };
    fetchHabits();
  }, []);

  const filterHabits = () => {
    let filtered = [...habits];
    if (selected !== 'all') {
      filtered = filtered.filter(h => h.frequency === selected);
    }
    if (showIncompleteOnly) {
      filtered = filtered.filter(h => !h.completed);
    }
    return filtered;
  };

  const markHabitCompleted = async (id: string) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: true } : habit
    );
    setHabits(updatedHabits);
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const renderHabit: ListRenderItem<Habit> = ({ item }) => (
    <View style={styles.habitItem}>
      <Text
        style={[
          styles.habitText,
          item.completed && {
            textDecorationLine: 'line-through',
            color: 'gray',
          },
        ]}
      >
        • {item.title}
      </Text>
      {!item.completed && (
        <TouchableOpacity onPress={() => markHabitCompleted(item.id)}>
          <Image
            style={styles.markButton}
            source={require('../assets/Done.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const handleAddHabit = () => {
    navigation.navigate('ADD_HABITS');
  };

  const handleLogout = () => {
    navigation.navigate('LOGOUT');
  };

  const handleViewProgress = () => {
    navigation.navigate('PROGRESS');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.addButton}>Add Habits</Text>
        <TouchableOpacity onPress={handleAddHabit}>
          <Image
            style={styles.iconButton}
            source={require('../assets/Add.png')}
          />
        </TouchableOpacity>

        {/* 👇 Progress Navigation Button */}
        <TouchableOpacity onPress={handleViewProgress}>
          <Image
            style={styles.iconButton}
            source={require('../assets/InProgress.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.iconButton}
            source={require('../assets/Logout.png')} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {['all', 'daily', 'weekly'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelected(tab as 'all' | 'daily' | 'weekly')}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                selected === tab && styles.activeTab,
              ]}
            >
              {tab === 'all'
                ? 'All'
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {selected === tab && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Have to do</Text>
        <Switch
          value={showIncompleteOnly}
          onValueChange={() => setShowIncompleteOnly(prev => !prev)}
          thumbColor={showIncompleteOnly ? Colors.secondary : '#ccc'}
          trackColor={{ false: '#888', true: Colors.secondary }}
        />
      </View>

      <FlatList
        data={filterHabits()}
        keyExtractor={item => item.id}
        renderItem={renderHabit}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HabitsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 60,
    alignItems: 'center',
  },
  addButton: {
    color: Colors.white,
    marginLeft: 15,
    fontSize: 24,
    flex: 1,
  },
  iconButton: {
    width: 32,
    height: 32,
    marginHorizontal: 10,
  },
  tabsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    color: Colors.white,
    fontSize: 18,
  },
  activeTab: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  underline: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.secondary,
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 20,
  },
  toggleLabel: {
    color: Colors.white,
    fontSize: 18,
    marginRight: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  habitItem: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.secondary,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitText: {
    color: Colors.white,
    fontSize: 16,
    flex: 1,
  },
  markButton: {
    width: 30,
    height: 20,
    color: Colors.secondary,
    marginLeft: 10,
  },
});
