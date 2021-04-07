import React, {useState} from 'react';
import {Switch, Text, TextInput, View} from "react-native";
import {styles} from './style'
import {HorizontalRule} from "../../HorizontalRule";

export const CreateHabit = () => {
    const [color, setColor] = useState('green')

    const [isEnabledNotification, setIsEnabledNotification] = useState(false);

    const toggleSwitchNotification = () => setIsEnabledNotification(previousState => !previousState);

    return (
        <>
            <View
                style={{
                    paddingTop: 60,
                    paddingHorizontal: 20,
                    backgroundColor: color
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.cancelTitle}>Відмінити!</Text>
                    <Text style={styles.mainTitle}>Створити звичку</Text>
                    <Text style={styles.saveTitle}>Зберегти</Text>
                </View>

                <View style={styles.nameContainer}>
                    <Text styles={styles.nameTitle}>Назва</Text>
                    <TextInput styles={styles.nameInput} maxLength={100} autoFocus={true}
                               placeholder={"Задярка, медитація і т.д."}
                               paddingTop={20}
                               paddingBottom={20}
                    />
                </View>
            </View>


            <View style={styles.root}>
                <Text styles={styles.nameTitle}>Мотивуй себе</Text>
                <TextInput styles={styles.nameInput} maxLength={100} autoFocus={true}
                           placeholder={"А ну-ка давай !!!"}
                           paddingTop={20}
                           paddingBottom={10}

                />

                <HorizontalRule/>

                <View style={styles.repeatContainer}>
                    <Text style={styles.repeatTitle}>Повторяти</Text>
                    <Text style={styles.repeatTitle}>кожного дня ></Text>
                </View>

                <HorizontalRule/>

                <View style={styles.colorContainer}>
                    <Text style={styles.colorTitle}>Виберіть колір</Text>
                    <Text style={styles.colorTitle}>()</Text>
                </View>

                <HorizontalRule/>

                <View style={styles.remindContainer}>
                    <Text style={styles.remindTitle}>Нагадати мені</Text>
                    <Switch style={styles.remindSwitch} onValueChange={toggleSwitchNotification}
                            value={isEnabledNotification}/>
                </View>

                <HorizontalRule/>

            </View>
        </>
    );
}
