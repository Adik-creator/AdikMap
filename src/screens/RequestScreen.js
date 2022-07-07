import * as location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useContext, useEffect } from "react";
import { parameters, colors } from "../global/styles";
import MapComponent from "../components/CompMap";
import { DestinationContext } from "../contexts/contexts";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function RequestScreen({ navigation }) {
  const [userOrigin, setUserOrigin] = useState({
    latitude: null,
    longitude: null,
  });
  const { destination, dispatchDestination } = useContext(DestinationContext);

  const getLocation = async () => {
    try {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (!granted) return {};
      const {
        coords: { latitude, longitude },
      } = await location.getCurrentPositionAsync();
      return { latitude, longitude };
    } catch (err) {
      return {};
    }
  };

  const init = async () => {
    const origin = await getLocation();
    setUserOrigin(origin);
  };

  useEffect(() => {
    init();

    return () => {
      dispatchDestination({
        type: "ADD_DESTINATION",
        payload: {
          latitude: null,
          longitude: null,
          address: null,
          name: null,
        },
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewTwo}>
        <View style={styles.viewOne}>
          <Icon
            type="material-community"
            name="arrow-left"
            color={colors.white}
            size={31}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.viewFour}>
          <View style={styles.requestTextInput}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DestinationScreen")}
            >
              <View style={styles.viewSixs}>
                <Text style={styles.textOne}>Куда вы хотите ?</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MapComponent
        userOrigin={userOrigin}
        userDestination={{
          latitude: destination.latitude,
          longitude: destination.longitude,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  requestTextInput: { marginTop: 20 },
  viewOne: {
    position: "absolute",
    left: 12,
    top: 25,
    backgroundColor: colors.blue,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    zIndex: 5,
  },

  viewTwo: {
    height: SCREEN_HEIGHT * 0.15,
    alignItems: "center",
    zIndex: 9,
    backgroundColor: colors.blue,
  },

  viewFour: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewSixs: {
    backgroundColor: colors.greyFour,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.7,
    height: 41,
    justifyContent: "center",
    marginTop: 11,
    paddingLeft: 1,
  },
  textOne: {
    marginLeft: 11,
    fontSize: 18,
    color: colors.greyOne,
  },
});
