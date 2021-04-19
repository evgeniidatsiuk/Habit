import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function HabitView({parentRef, item, setHabit}) {

    const styles = StyleSheet.create({
        component: {
            height: 100,
            borderRadius: 25,
            backgroundColor: '#dfdfdf',
            marginVertical: 10,
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
            overflow: 'hidden',
        },
        progress: {
            width: 36 + item.progress * 6.8,
            height: 36 + item.progress * 6.8,
            borderRadius: 18 + item.progress * 10,
            backgroundColor: item.color,
            position: 'absolute',
            top: 10 - item.progress * 3.5,
            left: 12 - item.progress * 3.5,
        },
  });

  const { component, progress } = styles;

  return (
    <>
        <TouchableOpacity
            style={component}
            onPress={() => {
                parentRef.current.snapTo(0)
                setHabit(item)
                // setHabit(Object.assign(habit, { progress: habit.progress + 5 }))
            }}
        >
            <View style={progress}/>
            <Text>{item.progress}%</Text>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    </>
  );
}
