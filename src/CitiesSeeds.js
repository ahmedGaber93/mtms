import firestore from '@react-native-firebase/firestore';
import faker from 'faker';



const batch = firestore().batch();

export const fillCities = () => {

    const chars = "abcdefghijklm";
    for (let i = 0; i < chars.length; i++) {
        for (let x = 0; x < 30; x++) {
            console.log('chars[i] + " city - " + x', chars[i] + ' city - ' + x);
            batch.set(firestore().collection('Source').doc(), {
                name: chars[i] + " city - " + x,
                latitude: parseFloat(faker.address.latitude()),
                longitude: parseFloat(faker.address.longitude()),
            });
        }
    }


    batch.commit().then(function () {

    }).catch(e => alert(e.toString()));


};




