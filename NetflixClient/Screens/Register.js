import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "../assets/icons/netflix.png";
import AppState from "../Context/AppState";
import axios from "../axios/axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isEmailValid: false,
      isPasswordValid: false,
      isConfirmPasswordValid: false,
      alert: {
        show: false,
        msg: ""
      }
    };
  }

  onChangeEmailHandler = (input) => {
    let re = /\S+@\S+\.\S+/;
    let isEmailValid = re.test(input);
    this.setState({
      ...this.state,
      email: input,
      isEmailValid: isEmailValid,
    });
  };

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

  onRegisterHandler = () => {
    axios
      .post("/auth/register", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        this.context.updateUserToken(res.headers["x-auth-token"]);
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          alert: {
            show: true,
            msg: err.response.data
          }
        });
      });
  };

  render() {

    const ShowAlert = (msg) =>
      Alert.alert(
        "Authentication Failed",
        msg,
        [
          {
            text: "OK", onPress: () => {
              this.setState({
                email: "",
                password: "",
                confirmPassword: "",
                isEmailValid: false,
                isPasswordValid: false,
                isConfirmPasswordValid: false,
                alert: {
                  show: false,
                  msg: ""
                }
              });
            }
          }
        ]
      );

    return (
      <View style={styles.container}>
        {this.state.alert.show && ShowAlert(this.state.alert.msg)}
        <Image style={styles.logo} source={Icon} />
        <TextInput
          style={
            this.state.isEmailValid
              ? styles.input
              : { ...styles.input, ...styles.errInput }
          }
          onChangeText={this.onChangeEmailHandler}
          value={this.state.email}
          placeholder="Email"
        />
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
            !(
              this.state.isEmailValid &&
              this.state.isPasswordValid &&
              this.state.isConfirmPasswordValid
            )
          }
          onPress={this.onRegisterHandler}
        >
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
        <Text
          style={styles.label}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          Already on Netflix? Sign in now
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  logo: {
    width: 200,
    height: 80,
  },
  label: {
    alignSelf: "stretch",
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins-Light",
    alignSelf: "center",
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    fontFamily: "Poppins-Light",
    alignSelf: "stretch",
    fontSize: 18,
    width: "100%",
    height: 55,
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
    fontSize: 24,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  errInput: {
    color: "#E50914",
    borderColor: "#E50914",
    borderWidth: 2,
  },
});

Register.contextType = AppState;
export default Register;
