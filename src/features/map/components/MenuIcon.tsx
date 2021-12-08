import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {
    onPress?: void,
}


const MenuIcon: React.FC<Props> = (
    {
        onPress = () => {}
    }
) => {

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={styles.container}
            onPress={onPress}>
            <Icon
                size={22}
                name="ios-menu"
            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor : '#fff',
        borderRadius : 34,
        height : 34,
        width : 34,
        justifyContent : 'center',
        alignItems : 'center',

    },
});

export default MenuIcon;
