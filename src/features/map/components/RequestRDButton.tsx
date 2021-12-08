import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {
    onPress?: () => void,
}


const RequestRDButton: React.FC<Props> = (
    {
        onPress = () => {}
    }
) => {

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={styles.container}
            onPress={onPress}>

            <Text style={{
                fontWeight : 'bold',
                fontSize : 18,
                color : '#fff',
            }}>
                REQUEST RD
            </Text>

        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor : '#0065b3',
        borderRadius : 5,
        height : 40,
        width : 190,
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
});


export default RequestRDButton;
