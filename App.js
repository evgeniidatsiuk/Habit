import React, {useRef} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import HabitView from './components/Habit/View';
import getLast5Days from './hooks/getLast5Days';
import CreateHabit from './components/Habit/Create/index';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

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
  dates: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  primaryDate: {
    color: '#000',
  },
  secondaryDate: {
    color: '#515151',
  },
});

const { container, header, title, text, primaryDate, secondaryDate } = styles;

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

const dates = getLast5Days();

export default function App() {
  const sheetRef = useRef(null);

  const renderContent = () => (
      <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <CreateHabit parentRef={sheetRef}/>
      </View>
  );


  return (
      <>
        <View style={container}>
          <View style={header}>
            <AntDesign name="menuunfold" size={36} color="black"/>
            <Pressable onPress={() => sheetRef.current.snapTo(0)}>
              <AntDesign name="plus" size={36} color="black"/>
            </Pressable>
        </View>
        <View style={header}>
          <Text style={title}>Habit</Text>
          <Text style={text}>
            {dates.map((date, index) => (
                <View style={styles.dates} key={index}>
                  <Text
                      style={
                        index !== dates.length - 1 ? secondaryDate : primaryDate
                      }
                  >
                    {date.date}
                  </Text>
                  <Text
                      style={
                        index !== dates.length - 1 ? secondaryDate : primaryDate
                  }
                >
                  {date.weekday}
                </Text>
              </View>
            ))}
          </Text>
        </View>
        <FlatList
          data={habits}
          renderItem={({ item }) => <HabitView item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <BottomSheetBehavior
          ref={sheetRef}
          snapPoints={[850, 100, 0]}
          borderRadius={10}
          initialSnap={2}
          renderContent={renderContent}
      />
    </>
  );
}
