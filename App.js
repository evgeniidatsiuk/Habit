import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HabitView from './components/Habit/View/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 36,
  },
});

const { container, header, title, text } = styles;

const habits = [
  {
    id: 1,
    title: 'Bimba',
    progress: 0,
  },
  {
    id: 2,
    title: 'Bimba',
    progress: 5,
  },
  {
    id: 3,
    title: 'Bimba',
    progress: 24,
  },
  {
    id: 4,
    title: 'Bimba',
    progress: 75,
  },
  {
    id: 5,
    title: 'Bimba',
    progress: 90,
  },
  {
    id: 6,
    title: 'Bimba',
    progress: 95,
  },
  {
    id: 7,
    title: 'Bimba',
    progress: 100,
  },
  {
    id: 8,
    title: 'Bimba',
    progress: 24,
  },
];


export default function App() {
  return (
    <View style={container}>
      <View style={header}>
        <AntDesign name="menuunfold" size={36} color="black" />
        <AntDesign name="plus" size={36} color="black" />
      </View>
      <View style={header}>
        <Text style={title}>Habit</Text>
        <Text style={text}>2 3 4 5 6</Text>
      </View>
      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitView item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
