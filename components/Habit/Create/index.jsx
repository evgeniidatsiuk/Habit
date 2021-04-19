import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import {styles} from './style'
import {Dimensions, Pressable, Switch, Text, TextInput, View} from "react-native";
import {HorizontalRule} from "../../HorizontalRule";
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import {SelectColor} from "../../Select/Color";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function CreateHabit({parentRef, habit}) {

    console.log('habit create', habit?.id)

    const [expoPushToken, setExpoPushToken] = useState(habit?.expoPushToken || '');
    const [notification, setNotification] = useState(habit?.notification || false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [name, setName] = useState(habit?.name || '')
    const [description, setDescription] = useState(habit?.description || '')
    const [color, setColor] = useState(habit?.color || '#008000')
    const [howMuchRepeat, setHowMuchRepeat] = useState('кожного дня');
    const [isEnabledNotification, setIsEnabledNotification] = useState(habit?.isEnabledNotification || false);
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

    const onSubmit = async () => {
        let notificationId

        try {
            if (isEnabledNotification) {
                notificationId = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: name,
                        body: description,
                        data: { date: 'data'},
                    },
                    trigger: {
                        hour: date.getHours(),
                        minute: date.getMinutes()
                    },
                });
            }

            const id = await v4()

            const data = JSON.stringify({
                id,
                name,
                description,
                color,
                howMuchRepeat,
                isEnabledNotification,
                hour: date.getHours(),
                minute: date.getMinutes(),
                expoPushToken,
                notificationId,
                createdAt: new Date(),
            })

            await AsyncStorage.setItem(id, data)

            alert(data)

            parentRef.current.snapTo(2)
        } catch (e) {
            console.log('e', e)
        }
    }

    const onUpdate = async () => {
        const data = JSON.stringify(Object.assign(habit, {
            name,
            description,
            color,
            howMuchRepeat,
            isEnabledNotification,
            hour: date.getHours(),
            minute: date.getMinutes()
        }))

        await AsyncStorage.mergeItem(habit.id, data)

        alert(data)

        parentRef.current.snapTo(2)

    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            // alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }


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
                    {habit && <Pressable onPress={() => onUpdate()}>
                        <Text style={styles.mainTitle}>Оновити звичку</Text>
                    </Pressable>}

                    {!habit && <Pressable onPress={() => onSubmit()}>
                        <Text style={styles.mainTitle}>Створити звичку</Text>
                    </Pressable>}
                    <Pressable onPress={() => habit ? onUpdate() : onSubmit()}>
                        <Text style={styles.saveTitle}>Зберегти</Text>
                    </Pressable>
                </View>

                <View style={styles.nameContainer}>
                    <Text styles={styles.nameTitle}>Назва</Text>
                    <TextInput styles={styles.nameInput} maxLength={100} autoFocus={true} value={name}
                               placeholder={"Задярка, медитація і т.д."}
                               onChangeText={name => setName(name)}
                               paddingTop={20}
                               paddingBottom={20}
                    />
                </View>
            </View>


            <View style={styles.root}>
                <Text styles={styles.nameTitle}>Мотивуй себе</Text>
                <TextInput styles={styles.nameInput} value={description} maxLength={100}
                           placeholder={"А ну-ка давай !!!"}
                           onChangeText={description => setDescription(description)}
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
                onChange={(e, value) => setDate(value)}
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
