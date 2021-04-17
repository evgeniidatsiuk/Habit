import React, {useRef, useState} from 'react';
import {styles} from './style'
import {Dimensions, Pressable, Switch, Text, TextInput, View} from "react-native";
import {HorizontalRule} from "../../HorizontalRule";
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import {SelectColor} from "../../Select/Color";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateHabit({parentRef}) {
    const [color, setColor] = useState('#008000')
    const [howMuchRepeat, setHowMuchRepeat] = useState('кожного дня');
    const [isEnabledNotification, setIsEnabledNotification] = useState(false);
    const [date, setDate] = useState(new Date());
    const sheetRef = useRef(null);

    const renderContent = () => (
        <View style={{
            backgroundColor: '#fff', width: '100%', height: '100%'
        }}>
            <SelectColor sheetRef={sheetRef} setColor={setColor}/>
        </View>
    );

    const toggleSwitchNotification = () => setIsEnabledNotification(previousState => !previousState);

    return (
        <>
            <View
                style={{
                    paddingTop: 20,
                    paddingHorizontal: 20,
                    backgroundColor: color
                }}
            >
                <View style={styles.container}>
                    <Pressable onPress={() => parentRef.current.snapTo(2)}>
                        <Text style={styles.cancelTitle}>Відмінити!</Text>
                    </Pressable>
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
                <TextInput styles={styles.nameInput} maxLength={100}
                           placeholder={"А ну-ка давай !!!"}
                           paddingTop={20}
                           paddingBottom={10}

                />

                <HorizontalRule/>

                <View style={styles.repeatContainer}>
                    <Text style={styles.repeatTitle}>Повторяти</Text>
                    <Pressable onPress={() => sheetRef.current.snapTo(0)}>
                        <Text style={styles.repeatTitle}>{howMuchRepeat}</Text>
                    </Pressable>
                </View>

                <HorizontalRule/>

                <View style={styles.colorContainer}>
                    <Text style={styles.colorTitle}>Виберіть колір</Text>
                    <Pressable onPress={() => sheetRef.current.snapTo(0)}>
                        <View
                            style={{
                                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                                width: 25,
                                height: 25,
                                backgroundColor: color,
                            }}
                        >
                        </View>
                    </Pressable>
                </View>

                <HorizontalRule/>

                <View style={styles.remindContainer}>
                    <Text style={styles.remindTitle}>Нагадати мені</Text>
                    <Switch style={styles.remindSwitch} trackColor={{true: color, false: 'white'}}
                            onValueChange={toggleSwitchNotification}
                            value={isEnabledNotification}/>
                </View>


                <HorizontalRule/>

            </View>

            {isEnabledNotification && <DateTimePicker
                value={date}
                mode='countdown'
                display="default"
                is24Hour={true}
                onChange={(e, value) => {
                    console.log('value', value)
                    setDate(value)
                }}
            />}

            <BottomSheetBehavior
                ref={sheetRef}
                snapPoints={[855, 100, 0]}
                borderRadius={10}
                initialSnap={1}
                renderContent={renderContent}
            />
        </>
    );
}
