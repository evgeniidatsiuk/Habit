import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {Calendar} from "react-native-calendars";
import {LineChart} from "react-native-chart-kit";
import {HorizontalRule} from "../../HorizontalRule";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ShowHabit({parentRef, habit, setHabit}) {
  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelTitle: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    mainTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveTitle: {
      fontSize: 16,
      fontWeight: '200',
    },
    nameContainer: {
      paddingTop: 60,
    },
    nameTitle: {
      fontSize: 14,
    },
    nameInput: {
      fontSize: 14,
    },
    repeatContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingBottom: 20,
    },
    repeatTitle: {
      fontSize: 14,
    },
    colorContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingBottom: 20,
    },
    colorTitle: {
      fontSize: 14,
    },
    remindContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
    },
    remindTitle: {
      fontSize: 14,
      paddingBottom: 25,
    },
    remindSwitch: {
      alignItems: 'center',
    },

    removeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    removeTitle: {
      fontSize: 16,
      fontWeight: 'bold'
    }
  });

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => habit.color, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ['Графік розвитку привички'] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
      <>
        <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              backgroundColor: habit.color,
            }}
        >
          <View style={styles.container}>
            <Pressable onPress={() => {
              parentRef.current.snapTo(2)
            }}>
              <Text style={styles.cancelTitle}>Повернутись</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.mainTitle}>{habit.title}</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.saveTitle}>Редагувати</Text>
            </Pressable>
          </View>


          <View style={styles.container} paddingTop={40}>
            <View>
              <View>
                <Text style={styles.mainTitle}>Регульність</Text>
              </View>
              <View>
                <Text style={styles.mainTitle}>{habit.howMuchRepeat}</Text>
              </View>
            </View>
            <View style={{paddingBottom: 20}}>
              <View>
                <Text style={styles.mainTitle}>Нагадати мені</Text>
              </View>
              <View>
                <Text style={styles.mainTitle}>{habit.hour}:{habit.minute}</Text>
              </View>
            </View>
          </View>

        </View>
        <HorizontalRule/>
        <View>
          <LineChart
              data={data}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={chartConfig}
          />
        </View>
        <HorizontalRule/>
        <Calendar
            style={{
              borderWidth: 1,
              height: 350
            }}
            theme={{
              selectedDayBackgroundColor: habit.color,
              todayTextColor: habit.color,
              dotColor: habit.color,
              arrowColor: habit.color,
            }}/>
        <HorizontalRule/>
        <View style={styles.removeContainer}>
          <Pressable onPress={async () => {
            await AsyncStorage.removeItem(habit.id)
            parentRef.current.snapTo(2)
          }}>
            <Text style={styles.removeTitle}>Видалити привичку</Text></Pressable>
        </View>
        <HorizontalRule/>
      </>

  );
}
