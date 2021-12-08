import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import {Platform} from "react-native";
import Geolocation from "react-native-geolocation-service";

export interface ILocation {
	latitude: any
	longitude: any
}


const LocationPermission = Platform.OS === "ios"
	? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
	: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;



const getCurrentPosition = (
	resolve : (response : ILocation) => void,
) => {
	// @ts-ignore
	Geolocation.getCurrentPosition(
		(position : any) => {
			resolve({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		},
		(error : any) => {
			console.log(error.code, error.message);
		},
		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	);
};




export const getMyLocation : () => Promise<ILocation>  = () => {
	return new Promise( (
		resolve : (response : ILocation) => void,
		reject : (response : any) => void,
	) => {

		check(LocationPermission).then()
			.then((result) => {
				switch (result) {
					case RESULTS.GRANTED:
						getCurrentPosition(resolve);
						break;
					case RESULTS.DENIED:
						request(LocationPermission).then((result) => {
							if(result === 'granted'){
								getCurrentPosition(resolve);
							}
						});
						break;

				}
			});
	})
};








