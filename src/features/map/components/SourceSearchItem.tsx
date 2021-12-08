import React, {useState} from 'react';
import {View, Text, StyleSheet, I18nManager, TouchableOpacity} from 'react-native';


type Props = {
    navigation?: any,
    onPress?: () => void,
    title?: string,
}


const SourceSearchItem: React.FC<Props> = (
    {
        navigation,
        onPress = () => {},
        title,
    }
) => {

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={styles.container}
            onPress={onPress}>


            <Text style={styles.title}>
                {title}
            </Text>


        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container : {
        borderRadius : 5,
        justifyContent : 'center',
        marginHorizontal : 16,
        paddingVertical : 16,
        borderBottomWidth : 1,
        borderBottomColor : "#e3e3e3",
    },
    title : {
        fontSize : 15,
        textAlign: 'left',
        paddingHorizontal : 8,
    },

    subTitle : {
        textAlign: 'center',
        fontSize : 16,
        color : '#666',
        paddingHorizontal : 16,
    },
});

export default SourceSearchItem;
