import React from 'react';
import {View} from "react-native";
import {Color} from "../../Color";

export const SelectColor = () => {
    const colors = ['#7fffd4', '#8a2be2', '#ff4500', '#008000', '#0000FF', '#ffc0cb', '#dfff00', '#fff93e', '#242582'];
    const items = []

    for (const [index, value] of colors.entries()) {
        items.push(<Color key={index} color={value}/>)
    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingTop: 250,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'white'
        }}>
            {items}
        </View>
    )
}
