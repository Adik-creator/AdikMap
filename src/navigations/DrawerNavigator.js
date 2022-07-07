import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import HomeStack from "./StackNavigator";
import {Icon} from "react-native-elements";
import {colors} from "../global/styles";
import RequestScreen from "../screens/RequestScreen";
import DestinationScreen from "../screens/DestinationScreen";
import {auth, removeUserMap} from "../../firebase";
import {useContext, useState} from "react";
import {AppContext} from "../contexts/contexts";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const {store, dispatchStore} = useContext(AppContext)

    const logout = async () => {
        removeUserMap(auth.currentUser?.uid)
        await auth.signOut();
        dispatchStore({type: "LOGOUT"});
    };

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        {store.isAuth ? (
                            <DrawerItem label="Выйти" onPress={logout}/>
                        ) : (
                            <DrawerItem
                                label="Авторизация"
                                onPress={() => props.navigation.navigate("LoginScreen")}
                            />
                        )}
                    </DrawerContentScrollView>
                );
            }}
        >
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: "Главный",
                    drawerIcon: ({focussed, size}) => (
                        <Icon
                            type="material-community"
                            name="home"
                            color={focussed ? "#7cc" : colors.greyFour}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{
                    title: "Экран запроса",
                    drawerIcon: ({focussed, size}) => (
                        <Icon
                            type="material-community"
                            name="map"
                            color={focussed ? "#7cc" : colors.greyFour}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="DestinationScreen"
                component={DestinationScreen}
                options={{
                    title: "Маршрут",
                    drawerIcon: ({focussed, size}) => (
                        <Icon
                            type="material-community"
                            name="car"
                            color={focussed ? "#7cc" : colors.greyFour}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
}
