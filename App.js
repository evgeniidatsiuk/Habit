import React, {useEffect, useRef, useState} from 'react';
import 'react-native-get-random-values'
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import HabitView from './components/Habit/View';
import getLast5Days from './hooks/getLast5Days';
import CreateHabit from './components/Habit/Create/index';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowHabit from "./components/Habit/View/show";

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

const {container, header, title, text, primaryDate, secondaryDate} = styles;

const dates = getLast5Days();

export default function App() {
  const [habits, setHabits] = useState([])
  const [habit, setHabit] = useState(undefined)

  useEffect(() => {
    const items = []
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = JSON.parse(store[i][1]);
          items.push({...value, title: value.name, progress: i + 5})

          setHabits(items.sort(sortFunction))
        });
      });
    });
  }, []);

  function sortFunction(a, b) {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? -1 : 1;
  };


  const sheetRef = useRef(null);

  const renderContent = () => (
      <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <CreateHabit parentRef={sheetRef}/>
      </View>
  );

  const showHabitContent = () => (
      <View style={{
        backgroundColor: '#fff', width: '100%',
        height: '100%'
      }}>
        {habit && <ShowHabit parentRef={sheetRef} habit={habit}/>}
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
              renderItem={({item}) => <HabitView parentRef={sheetRef} setHabit={setHabit} item={item}/>}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
          />
        </View>
        <BottomSheetBehavior
            ref={sheetRef}
            snapPoints={[855, 0, 0]}
            borderRadius={10}
            initialSnap={2}
            renderContent={renderContent}
        />

        <BottomSheetBehavior
            ref={sheetRef}
            snapPoints={[855, 0, 0]}
            borderRadius={10}
            initialSnap={2}
            renderContent={showHabitContent}
        />
      </>
  );
}
