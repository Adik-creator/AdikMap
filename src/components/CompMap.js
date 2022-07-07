import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../global/styles";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

export default class MapComponent extends Component {
  constructor() {
    super();
    this.state = {};

    this._map = React.createRef(35);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.userDestination.latitude !== null) {
        this._map.current.fitToCoordinates(
          [this.props.userOrigin, this.props.userDestination],
          {
            edgePadding: { top: 450, right: 50, left: 50, bottom: 350 },
            animated: true,
          }
        );
      }
    }, 500);
  }

  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.maps}
          ref={this._map}
          minZoomLevel={4}
          showsUserLocation={true}
          followsUserLocation={true}
          zoomControlEnabled={true}
        >
          {this.props.userOrigin.latitude && (
            <MapView.Marker
              coordinate={this.props.userOrigin}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                source={require("../../assets/location.png")}
                style={styles.markerOriginTwo}
                resizeMode="cover"
              />
            </MapView.Marker>
          )}
          {this.props.userDestination.latitude && (
            <MapView.Marker
              coordinate={this.props.userDestination}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                source={require("../../assets/location.png")}
                style={styles.markerDestination}
                resizeMode="cover"
              />
            </MapView.Marker>
          )}
          {this.props.userDestination.latitude && (
            <MapViewDirections
              origin={this.props.userOrigin}
              destination={this.props.userDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor={colors.blue}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maps: {
    height: "100%",
    width: "100%",
  },
  markerDestination: {
    width: 16,
    height: 16,
  },

  markerOriginTwo: {
    width: 5,
    height: 5,
  },
});
