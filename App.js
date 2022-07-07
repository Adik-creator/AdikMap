import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./src/navigations/RootNavigator";
import {
  AppContextProvider,
  DestinationContextProvider,
} from "./src/contexts/contexts";

const App = () => {
  return (
    <AppContextProvider>
      <DestinationContextProvider>
        <RootNavigator />
      </DestinationContextProvider>
    </AppContextProvider>
  );
};

const Stack = createNativeStackNavigator();

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
