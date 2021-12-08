import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Animated, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {getMyLocation, ILocation} from "../../../utils/LocationUtil";
import LoadingView from "../../../components/LoadingView";
import MenuIcon from "../components/MenuIcon";
import InputView from "../components/InputView";
import RequestRDButton from "../components/RequestRDButton";
import SearchSourceModal from "../modals/SearchSourceModal";
import SearchDestinationModal from "../modals/SearchDestinationModal";
import getDistance from 'geolib/es/getDistance';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



type Props = {
    navigation?: any,
}


const MapScreen: React.FC<Props> = (
    {
        navigation
    }
) => {


    const [loading, setLoading] = React.useState(true);
    const [currentLocation, setCurrentLocation] = React.useState<ILocation>();
    const [source, setSource] = React.useState<any>();
    const [destination, setDestination] = React.useState<any>();
    const [isSourceModalVisible, setSourceModalVisibility] = React.useState(false);
    const [isDestinationModalVisible, setDestinationModalVisibility] = React.useState(false);



    React.useEffect(() => {
        getMyLocation().then((current : ILocation) => {
            setCurrentLocation(current);
            setLoading(false);
        });
    }, []);


    const onRequestRDPress = () => {
        if (!source || !destination) {
            Alert.alert("Error!", "Please select source/destination");
        }else {
            const distanceInMeters = getDistance(
                { latitude: source.latitude, longitude: source.longitude },
                { latitude: destination.lat, longitude: destination.lng }
            );
            if (distanceInMeters < 1000) {
                Alert.alert("distance In Meters", distanceInMeters.toString() + " M")
            }else{
                Alert.alert("distance In KM", (distanceInMeters/ 1000).toString() + " KM")
            }
        }
    };




    if (loading) {
        return <LoadingView />
    }



    return (
        <View style={styles.container}>


            <Animated
                provider={PROVIDER_GOOGLE}
                style={{ height: "100%", width: "100%", flex : 1}}
                initialRegion={{
                    latitude: currentLocation?.latitude,
                    longitude: currentLocation?.longitude,
                    latitudeDelta: 0.49,
                    longitudeDelta: 0.49 * (windowWidth / windowHeight),
                }}
            >
                <Marker
                    coordinate={{
                        latitude: currentLocation?.latitude,
                        longitude: currentLocation?.longitude
                    }}
                />

            </Animated>






            <View style={styles.formSection}>
                <View style={styles.form}>

                    <MenuIcon onPress={navigation.toggleDrawer}/>

                    <View style={{height: 10}}/>

                    <InputView
                        value={source?.name}
                        onPress={() => setSourceModalVisibility(true)}
                        placeholder={"Your location"}/>

                    <View style={{height: 10}}/>

                    <InputView
                        value={destination?.name}
                        onPress={() => setDestinationModalVisibility(true)}
                        placeholder={"Destination"}/>

                </View>
            </View>







            <View style={styles.requestRDButtonSection}>
                <RequestRDButton onPress={onRequestRDPress}/>
            </View>






            {isSourceModalVisible &&

                <SearchSourceModal
                    onSelect={(item: any) => {
                        setSource(item);
                        setSourceModalVisibility(false);
                    }}
                    onClose={() => setSourceModalVisibility(false)}
                    visible={true}/>
            }

            {isDestinationModalVisible &&
                <SearchDestinationModal
                    onSelect={(item: any) => {
                        setDestination(item);
                        setDestinationModalVisibility(false);
                    }}
                    onClose={() => setDestinationModalVisibility(false)}
                    visible={true}/>
            }



        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formSection : {
        position : 'absolute',
        top: 50,
        width : '100%',
    },
    form : {
        backgroundColor : '#e5e4e9',
        margin : 16,
        overflow : 'hidden',
        borderRadius : 10,
        padding : 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    requestRDButtonSection : {
        position : 'absolute',
        bottom : 0,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 12,
        paddingBottom : 0,

    },






});

export default MapScreen;
