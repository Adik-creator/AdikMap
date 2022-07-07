import * as geolocation from "react-native-geolocation-service";
import * as location from "expo-location";
import {LocationAccuracy} from "expo-location";
import {auth, writeUserMap} from "../firebase";

const watchPosition = () => {
    const watch = location.watchPositionAsync(
        {accuracy: LocationAccuracy.High, distanceInterval: 10},
        (position) => {
            console.log('position.coords', position.coords)
        },
    );
    console.log('watch', watch)
    return watch
}


const getLocation = async () => {
    try {
        const {granted} = await location.requestForegroundPermissionsAsync();
        if (!granted) return;
        const {
            coords: {latitude, longitude},
        } = await location.getCurrentPositionAsync();
        return {latitude, longitude}
    } catch (err) {
        console.log('err', err)
        return {latitude: null, longitude: null}
    }
};


export const updateMap = async ({coords}) => {
    if (auth.currentUser && coords) {
        const arr = (auth.currentUser.displayName || "").split('=')
        let displayName = ""
        let number = null
        let type = 'route'
        if (arr.length > 1) {
            displayName = arr[0]
            number = arr[1]
            type = arr[2]
        }
        writeUserMap(auth.currentUser.uid, {
            latitude: coords.latitude,
            longitude: coords.longitude,
            uid: auth.currentUser.uid,
            displayName, number, type
        })
    }
}


export const checkPermission = async () => {
    const hasPermission = await location.requestForegroundPermissionsAsync();
    if (hasPermission.status === "granted") {
        return await askPermission();
    }
    return true;
};

const askPermission = async () => {
    const permission = await location.requestForegroundPermissionsAsync();
    return permission.status === "granted";
};