import {Pressable, View} from "react-native";

import React from 'react';

export const Color = ({color, setColor, sheetRef}) => {
    return (
        <Pressable onPress={() => {
            setColor(color)
            sheetRef.current.snapTo(1)
        }}>
            <View
                style={{
                    borderRadius: 50,
                    width: 100,
                    height: 100,
                    margin: 5,
                    backgroundColor: color,
                }}
            />
        </Pressable>
    )
}
