import { StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HABITSLIST: undefined;
};

const AddHabits = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [addHabit, setAddHabit] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleAddHabit = async () => {
        if (!addHabit || !frequency) return;

        const newHabit = {
            id: Date.now().toString(), // ✅ unique ID
            title: addHabit,
            frequency,
            completed: false,
        };

        try {
            const storedHabits = await AsyncStorage.getItem('habits');
            const parsedHabits = storedHabits ? JSON.parse(storedHabits) : [];
            parsedHabits.push(newHabit);
            await AsyncStorage.setItem('habits', JSON.stringify(parsedHabits));
            navigation.navigate('HABITSLIST');
        } catch (error) {
            console.log("Error in saving habit: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Image style={styles.icon} source={require('../assets/Goal.png')} />
                    <TextInput
                        style={[styles.textInput, { fontSize: 24 }]}
                        placeholder="Add a new habit..."
                        placeholderTextColor={Colors.gray}
                        value={addHabit}
                        onChangeText={setAddHabit}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.icon} source={require('../assets/Frequency.png')} />
                    <Picker
                        selectedValue={frequency}
                        onValueChange={(itemValue) => setFrequency(itemValue)}
                        style={styles.picker}
                        dropdownIconColor={Colors.secondary}
                    >
                        <Picker.Item label="Select frequency..." value="" enabled={false} color={Colors.gray} />
                        <Picker.Item label="Daily Habit" value="daily" color={Colors.primary} />
                        <Picker.Item label="Weekly Habit" value="weekly" color={Colors.primary} />
                    </Picker>
                </View>

                <TouchableOpacity
                    style={styles.GoIcon}
                    onPress={handleAddHabit}
                >
                    <Image source={require('../assets/Circled-Right.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddHabits;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    formContainer: {
        marginTop: 50,
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
        margin: 15,
    },
    icon: {
        margin: 5,
    },
    textInput: {
        color: Colors.white,
        flex: 1,
    },
    picker: {
        flex: 1,
        color: Colors.white,
        backgroundColor: Colors.primary,
        fontSize: 24,
    },
    GoIcon: {
        alignItems: "flex-end",
        marginRight: 15,
    },
});
