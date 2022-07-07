import {AppState, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import * as location from "expo-location";
import {auth, db, removeUserMap} from "../../firebase";
import {colors, parameters} from "../global/styles";
import {StatusBar} from "expo-status-bar";
import {AppContext} from "../contexts/contexts";
import {LocationAccuracy} from "expo-location";
import {checkPermission, updateMap} from "../common";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = ({navigation}) => {
    const {store, dispatchStore} = useContext(AppContext);
    const _map = useRef(1);
    const appState = useRef(AppState.currentState);


    useEffect(() => {
        const s = AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState === "inactive" || nextAppState === "background") {
                removeUserMap(auth.currentUser?.uid)
            }
            appState.current = nextAppState;
        });

        return () => {s.remove()}
    }, []);

    useEffect(async () => {
        await checkPermission();
        if (auth.currentUser) dispatchStore({type: "LOGIN"})
    }, [])

    const listenUserMap = (data) => {
        const users = data.val()
        dispatchStore({
            type: "SET_USER_MAP",
            payload: {
                usersMap: users !== null ? Object.values(users) : [],
            },
        });
    }


    useEffect(async () => {
        db.ref('users').on('value', listenUserMap)
        let unsubscribe = () => ({remove: () => null})
        if ((auth.currentUser?.displayName || "").includes('route')) {
            unsubscribe = await location.watchPositionAsync({
                accuracy: LocationAccuracy.High,
                distanceInterval: 10
            }, updateMap)
        }

        return () => unsubscribe.remove()
    }, [auth.currentUser])


    const clickHandler = (e) => {
        if (auth.currentUser) {
            navigation.navigate("RequestScreen", {state: 0});
        } else {
            navigation.navigate("LoginScreen");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} style={styles.scrollViev}>
                <TouchableOpacity onPress={clickHandler}>
                    <View style={styles.buttonOne}>
                        <Text style={styles.buttonOneText}>Поездка</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.textFour}>Вокруг тебя</Text>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <MapView
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapHome}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                        {
                            store.usersMap?.length > 0 && store.usersMap.map(item => {
                                if (item.uid === auth.currentUser?.uid || item.uid === 'default')
                                    return null
                                return ((
                                    <MapView.Marker
                                        key={item.uid}
                                        coordinate={{latitude: item.latitude, longitude: item.longitude}}
                                        anchor={{x: 0.2, y: 0.2}}
                                        title={item.displayName || ""}
                                        description={item.number}
                                    >
                                        <View style={styles.markerOriginTwo}/>
                                    </MapView.Marker>
                                ))
                            })
                        }
                    </MapView>
                </View>
            </ScrollView>
            <StatusBar style="light" backgroundColor="#000" translucent={true}/>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 30,
        paddingTop: parameters.statusBarHeight,
    },
    scrollViev: {
        backgroundColor: colors.black,
    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    imageTwo: {height: 60, width: 60, borderRadius: 30},
    markerDestination: {
        width: 16,
        height: 16,
    },
    markerOriginTwo: {
        backgroundColor: '#000',
        width: 15,
        height: 15,
        borderRadius: 50,
    },
    markerOriginTwoMe: {
        backgroundColor: '#3946ff',
        width: 15,
        height: 15,
        borderRadius: 50,
    },
    home: {
        backgroundColor: colors.black,
        paddingLeft: 20,
        paddingRight: 20,
    },

    textOne: {
        color: colors.white,
        fontSize: 21,
        paddingBottom: 20,
        paddingTop: 20,
    },

    viewOne: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 20,
    },

    buttonOne: {
        height: 70,
        width: "100%",
        backgroundColor: colors.blue,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
        marginTop: 40,
    },

    buttonOneText: {
        color: colors.white,
        fontSize: 17,
        marginTop: -2,
    },
    cards: {
        alignItems: "center",
        margin: SCREEN_WIDTH / 22,
    },

    viewTwo: {marginBottom: 5, borderRadius: 15, backgroundColor: colors.grey6},

    titless: {
        color: colors.white,
        fontSize: 16,
    },
    viewThree: {
        flexDirection: "row",
        marginTop: 5,
        height: 50,
        backgroundColor: colors.grey6,
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
    textThree: {marginLeft: 15, fontSize: 20, color: colors.black},

    mapHome: {
        flex: 1,
        height: 401,
        marginVertical: 0,
        width: SCREEN_WIDTH * 0.92,
    },

    textFour: {
        fontSize: 21,
        color: colors.grey,
        marginTop: 15,
        marginLeft: 21,
        marginBottom: 21,
    },

    viewEght: {flex: 4, marginTop: -25},
    carsArrs: {
        width: 28,
        height: 14,
    },
});
