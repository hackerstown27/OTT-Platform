import React from "react";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import * as Font from "expo-font";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppState from "./Context/AppState";
import Home from "./Screens/Home";
import Setting from "./Screens/Setting";
import Chat from "./Screens/Chat";
import Contribute from "./Screens/Contribute";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserToken = (input) => {
      this.setState({ ...this.state, userToken: input });
    };
    this.state = {
      fontsLoaded: false,
      userToken: null,
      updateUserToken: this.handleUserToken,
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    let loginNav = (
      <NavigationContainer initialRouteName="Login" theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    let homeNav = (
      <NavigationContainer initialRouteName="Home" theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Chat") {
                iconName = focused ? "chatbox" : "chatbox-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              } else if (route.name === "Contribute") {
                iconName = focused ? "videocam" : "videocam-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Contribute" component={Contribute} />
          <Tab.Screen name="Settings" component={Setting} />
        </Tab.Navigator>
      </NavigationContainer>
    );
    if (this.state.fontsLoaded) {
      return (
        <AppState.Provider value={this.state}>
          {this.state.userToken == null ? loginNav : homeNav}
        </AppState.Provider>
      );
    } else {
      return null;
    }
  }
}
export default App;
