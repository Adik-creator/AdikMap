import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput, Picker,
} from "react-native";
import {useNavigation} from "@react-navigation/core";
import React, {useState, useEffect, useContext} from "react";
import {auth} from "../../firebase";
import {colors} from "../global/styles";
import {Icon} from "react-native-elements";
import {AppContext} from "../contexts/contexts";

const LoginScreen = () => {
        const [email, setEmail] = useState("");
        const [activeTab, setActiveTab] = useState("login");
        const [type, setType] = useState("user");
        const [password, setPassword] = useState("");
        const [displayName, setDisplayName] = useState("");
        const [number, setNumber] = useState(0);
        const navigation = useNavigation();
        const {store, dispatchStore} = useContext(AppContext)

        const handleSignUp = async () => {
            try {
                const userCredentials = await auth.createUserWithEmailAndPassword(email, password)
                await userCredentials.user.updateProfile({displayName: `${displayName}=${number}=${type}`})
                dispatchStore({type: "LOGIN"});
                navigation.navigate("HomeScreen");
            } catch (error) {
                alert(error.message)
            }
        }


        const handleLogin = async () => {
            try {
                await auth.signInWithEmailAndPassword(email, password)
                dispatchStore({type: "LOGIN"});
                navigation.navigate("HomeScreen");
            } catch (error) {
                alert(error.message)
            }
        };

    console.log(auth.currentUser)

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.viewOne}>
                    <Icon
                        type="material-community"
                        name="arrow-left"
                        color={colors.greyOne}
                        size={31}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.tabsContainer}>
                    <View>
                        <TouchableOpacity onPress={() => setActiveTab('login')} style={styles.button}>
                            <Text style={styles.buttonText}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setActiveTab('registration')}
                                          style={[styles.button, styles.buttonRegister]}>
                            <Text style={styles.buttonText}>Регистарция</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.autorithation}>
                    {activeTab === 'registration' && <View>
                        <Picker
                            selectedValue={type}
                            onValueChange={type => setType(type)}
                            mode="dropdown"
                            itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
                            <Picker.Item label="Маршрут" value="route" />
                            <Picker.Item label="Пользователь" value="user" />
                        </Picker>
                        <TextInput
                            placeholder="Имя Фамилия"
                            value={displayName}
                            onChangeText={(text) => setDisplayName(text)}
                            style={styles.input}
                        />
                        {type === 'route' && <TextInput
                            keyboardType='numeric'
                            placeholder="Номер маршрутки"
                            value={number}
                            onChangeText={(text) => setNumber(text)}
                            style={styles.input}
                        />}
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Пароль"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>}
                    {
                        activeTab === 'login' && <View>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Пароль"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={styles.input}
                                secureTextEntry
                            />
                            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                                <Text style={styles.buttonText}>Войти</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
;

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    autorithation: {width: "80%", marginTop: 100},
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    tabsContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 200,
        marginBottom: -80,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "blue",
        width: 130,
        marginTop: 15,
        marginRight: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonRegister: {
        marginRight: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    viewOne: {
        position: "absolute",
        left: 20,
        top: 40,
    },
});
