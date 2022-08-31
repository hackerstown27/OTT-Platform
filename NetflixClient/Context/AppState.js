import React from "react";
const AppState = React.createContext({
  userToken: null,
  updateUserToken: (input) => {
    this.userToken = input;
  },
});
export default AppState;
