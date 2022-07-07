import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useRef, useContext, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Avatar, Icon } from "react-native-elements";
import { colors } from "../global/styles";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { DestinationContext } from "../contexts/contexts";

navigator.geolocation = require("react-native-geolocation-service");

const DestinationScreen = ({ navigation }) => {
  const { dispatchDestination } = useContext(DestinationContext);
  const textInput2 = useRef(5);

  return (
    <>
      <View style={styles.viewTwo}>
        <View style={styles.viewOne}>
          <Icon
            type="material-community"
            name="arrow-left"
            color={colors.greyOne}
            size={32}
            onPress={() => navigation.goBack()}
          />
        </View>
        <TouchableOpacity>
          <View style={{ top: 26, alignItems: "center" }}>
            <View style={styles.viewThree}>
              <Avatar
                rounded
                avatarStyle={{}}
                size={30}
                source={require("../../assets/Profileblank.jpg")}
              />
              <Text style={{ marginLeft: 5 }}>Ползователь</Text>
              <Icon
                type="material-community"
                name="chevron-down"
                color={colors.greyOne}
                size={28}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder="Куда вы хотите ехать ..."
        listViewDisplayed="auto"
        debounce={400}
        ref={textInput2}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        autoFocus={true}
        styles={autoComplete}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "ru",
        }}
        onPress={(data, details = {}) => {
          dispatchDestination({
            type: "ADD_DESTINATION",
            payload: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: details.formatted_address,
              name: details.name,
            },
          });

          navigation.goBack();
        }}
      />
    </>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  viewOne: {
    position: "absolute",
    top: 30,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 10,
  },

  viewThree: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    height: 30,
    zIndex: 10,
  },

  viewTwo: { backgroundColor: colors.white, zIndex: 4, paddingBottom: 10 },
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.greyFour,
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
  },

  textInputContainer: {
    flexDirection: "row",
  },
};
