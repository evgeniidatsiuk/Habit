import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import ShowHabit from './show'

export default function HabitView({ item }) {
  const [habit, setHabit] = useState(item);
  const sheetRef = useRef(null);

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
      backgroundColor: 'red',
      position: 'absolute',
      top: 10 - item.progress * 3.5,
      left: 12 - item.progress * 3.5,
    },
  });

  const { component, progress } = styles;

  const renderContent = () => (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <ShowHabit parentRef={sheetRef} habit={habit}/>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={component}
        onPress={() =>
          sheetRef.current.snapTo(0)
          // setHabit(Object.assign(habit, { progress: habit.progress + 5 }))
        }
      >
        <View style={progress} />
        <Text>{habit.progress}%</Text>
        <Text>{habit.title}</Text>
      </TouchableOpacity>
      <BottomSheetBehavior
        ref={sheetRef}
        snapPoints={[855, 0, 0]}
        borderRadius={10}
        initialSnap={2}
        renderContent={renderContent}
      />
    </>
  );
}
