import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Calendar} from "react-native-calendars";

export default function ShowHabit({ parentRef, habit }) {
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
  });
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
            <Pressable onPress={() => parentRef.current.snapTo(2)}>
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

        <Calendar/>
      </>

    // <View>
    //     <Pressable><Text>Редагувати</Text></Pressable>
    // </View>
  );
}
