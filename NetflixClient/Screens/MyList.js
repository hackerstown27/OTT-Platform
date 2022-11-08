import React from "react";
import { View, Text } from "react-native";
import AppState from "../Context/AppState";
import axios from "../axios/axios";

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: true,
      isRefreshing: false,
    };
  }

  removeBookmarkHandler = (id) => {
    axios.delete("/course/courses/bookmark/" + id);
  };

  componentDidMount() {
    console.log("moutn");
    axios.defaults.headers.common["Authorization"] = this.context.userToken;
    axios
      .get("/course/courses/bookmark")
      .then((res) => {
        this.setState({
          ...this.state,
          courses: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.showAlert();
      });
  }

  showAlert = () => {
    Alert.alert("Something Went Wrong", "Please Try Again!", [
      { text: "OK", onPress: () => {} },
    ]);
  };

  render() {
    return (
      <View>
        <Text>MyList</Text>
      </View>
    );
  }
}

MyList.contextType = AppState;
export default MyList;
