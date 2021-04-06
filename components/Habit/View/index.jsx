import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function HabitView({ item }) {
  const [habit, setHabit] = useState(item)
  const styles = StyleSheet.create({
    component: {
      height: 100,
      borderRadius: 25,
      backgroundColor: '#dfdfdf',
      marginVertical: 10,
      padding: 20,
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    progress: {
      width: 36 + item.progress * 6.8,
      height: 36 + item.progress * 6.8,
      borderRadius: 18 + item.progress * 10,
      backgroundColor: 'red',
      position: 'absolute',
      top: 10 - item.progress * 3.5,
      left: 12 - item.progress * 3.5,
    },
  });

  const { component, progress } = styles;
  
  return (
    <TouchableOpacity style={component} onPress={() => setHabit(Object.assign(habit, {progress: habit.progress + 5}))}>
      <View style={progress} />
      <Text>{habit.progress}%</Text>
      <Text>{habit.title}</Text>
    </TouchableOpacity>
  );
}
