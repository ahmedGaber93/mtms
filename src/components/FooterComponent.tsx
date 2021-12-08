import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';


export type FooterComponentProps = {
    loadingMore?: boolean,
    hasMoreData?: boolean,
    endMessage?: string,
}


const FooterComponent: React.FC<FooterComponentProps> = (
    {
        loadingMore = false,
        hasMoreData = true,
        endMessage,
    }
) => {

    return (
        <View style={{height : 52}} >
            {
                loadingMore &&
                <View style={styles.upActivityIndicator}>
                    <ActivityIndicator size={28} color={"#f55d82"}/>
                </View>
            }
            {!hasMoreData && <Text style={styles.noMoreData}>{endMessage || "No more date"}</Text>}
        </View>
    );
};



const styles = StyleSheet.create({
    noMoreData : {
        textAlign: 'center',
        paddingVertical : 10,
    },
    upActivityIndicator : {
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : 8,
    },
});


export default FooterComponent;
