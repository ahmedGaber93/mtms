import React from 'react';
import {View, Text} from 'react-native';



const EmptyView: React.FC<any> = () => {

    return (
        <View style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
            <Text>Empty!</Text>
        </View>
    );
};



export default EmptyView;
