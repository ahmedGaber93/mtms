import React from 'react';
import {View, ActivityIndicator} from 'react-native';



const LoadingView: React.FC<any> = () => {

    return (
        <View style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
            <ActivityIndicator color={"#999"} size={24} />
        </View>
    );
};



export default LoadingView;
