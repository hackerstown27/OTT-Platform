import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppState from "../Context/AppState";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      isPasswordValid: false,
      isConfirmPasswordValid: false,
    };
  }

  onChangePasswordHandler = (input) => {
    let isPasswordValid = input.length >= 8;
    this.setState({
      ...this.state,
      password: input,
      isPasswordValid: isPasswordValid,
    });
  };

  onChangeConfirmPasswordHandler = (input) => {
    let isConfirmPasswordValid = input == this.state.password;
    this.setState({
      ...this.state,
      confirmPassword: input,
      isConfirmPasswordValid: isConfirmPasswordValid,
    });
  };

  onLogoutHandler = () => {
    this.context.updateUserToken(null);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>Change Password</Text>
          <TextInput
            style={
              this.state.isPasswordValid
                ? styles.input
                : { ...styles.input, ...styles.errInput }
            }
            onChangeText={this.onChangePasswordHandler}
            value={this.state.password}
            secureTextEntry
            placeholder="Password"
          />
          <TextInput
            style={
              this.state.isConfirmPasswordValid
                ? styles.input
                : { ...styles.input, ...styles.errInput }
            }
            onChangeText={this.onChangeConfirmPasswordHandler}
            value={this.state.confirmPassword}
            secureTextEntry
            placeholder="Confirm Password"
          />
          <TouchableOpacity
            style={styles.button}
            disabled={
              !(this.state.isPasswordValid && this.state.isConfirmPasswordValid)
            }
          >
            <Text style={styles.btnText}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Deactivate Account</Text>
          <Text style={styles.label}>
            Your Account will be permanently deleted!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{ ...styles.button }}
            onPress={this.onLogoutHandler}
          >
            <Text style={{ ...styles.btnText }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 18 },
  section: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
  },
  heading: {
    top: -15,
    left: 15,
    position: "absolute",
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    backgroundColor: "black",
  },
  label: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-Light",
    margin: 15,
    marginBottom: 0,
  },
  input: {
    fontFamily: "Poppins-Light",
    alignSelf: "stretch",
    fontSize: 14,
    width: "100%",
    height: 45,
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#E50914",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  btnText: {
    alignSelf: "center",
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  errInput: {
    color: "#E50914",
    borderColor: "#E50914",
    borderWidth: 1,
  },
});

Setting.contextType = AppState;
export default Setting;
