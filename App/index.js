// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Push Ups', reps: 20 },
    { id: 2, name: 'Squats', reps: 15 },
    { id: 3, name: 'Planks', duration: '1 min' },
  ]);

  return (
    <ScrollView style={styles.workoutList}>
      {workouts.map(workout => (
        <View key={workout.id} style={styles.workoutBox}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutDetails}>
            {workout.reps ? `Reps: ${workout.reps}` : `Duration: ${workout.duration}`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const AddWorkout = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = () => {
    console.log(`Workout Added: ${name}, Reps: ${reps}, Duration: ${duration}`);
    setName('');
    setReps('');
    setDuration('');
  };

  return (
    <View style={styles.addWorkoutContainer}>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <Button title="Add Workout" onPress={handleAddWorkout} />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <WorkoutList />
      <AddWorkout />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  workoutList: {
    flex: 1,
    marginBottom: 20,
  },
  workoutBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  addWorkoutContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: '1px solid #cccccc',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
    width: '100%',
  },
});

export default App;