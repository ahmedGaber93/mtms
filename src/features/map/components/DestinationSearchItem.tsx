import React, {useState} from 'react';
import {View, Text, StyleSheet, I18nManager, TouchableOpacity} from 'react-native';


type Props = {
    navigation?: any,
    onPress?: () => void,
    cityName?: string,
    countryName?: string,
}


const DestinationSearchItem: React.FC<Props> = (
    {
        navigation,
        onPress = () => {},
        cityName,
        countryName,
    }
) => {

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={styles.container}
            onPress={onPress}>


            <Text style={styles.title}>
                {cityName}
            </Text>

            <View style={{height: 5}}/>

            <Text style={styles.subTitle}>
                country: {countryName}
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
        fontSize : 14,
        color : '#666',
        paddingHorizontal : 8,
    },
});

export default DestinationSearchItem;
