import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


type Props = {
    onPress?: () => void,
    placeholder?: string,
    value?: string,
}


const InputView: React.FC<Props> = (
    {
        onPress = () => {},
        placeholder,
        value
    }
) => {

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={styles.container}
            onPress={onPress}>

            {
                (value && value.length > 0) ?
                    <Text style={styles.input}>{value}</Text>
                    :
                    <Text style={styles.placeholder}>{placeholder}</Text>
            }


        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container : {
        height : 38,
        justifyContent : 'center',
        backgroundColor : '#fff',
        paddingHorizontal : 12,
        borderRadius : 5,
    },
    placeholder : {
        backgroundColor : '#fff',
        color : '#999',
    },
    input : {
        backgroundColor : '#fff',
        color : '#444',
    },
});

export default InputView;
