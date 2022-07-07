import { getStatusBarHeight } from "react-native-status-bar-height";

export const colors = {
  grey: "#bebebe",
  greyOne: "#43484d",
  greyThree: "#86939e",
  greyFour: "#bdc6cf",
  heaherText: "white",
  blue: "#286ef0",
  black: "#000000",
  white: "#ffffff",
};

export const parameters = {
  statusBarHeight: getStatusBarHeight(),
  headerHeight: 70,

  styledButton: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },

  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
};
