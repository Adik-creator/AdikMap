export const OriginReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORIGIN":
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        address: action.payload.address,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export const DestinationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DESTINATION":
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        address: action.payload.address,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        usersMap: []
      };
    case "SET_USER_MAP":
      return {
        ...state,
        usersMap: action.payload.usersMap,
      };
    default:
      return state;
  }
};
