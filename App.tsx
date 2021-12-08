import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Platform, Dimensions, I18nManager} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Animated} from 'react-native-maps';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from "./src/features/map/screens/MapScreen";


import {fillCities} from "./src/CitiesSeeds"
//fillCities();








const App = () => {




    const Drawer = createDrawerNavigator();




    return (

        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen options={{headerShown: false}} name="map" component={MapScreen} />
            </Drawer.Navigator>
        </NavigationContainer>

    );



};



export default App;
