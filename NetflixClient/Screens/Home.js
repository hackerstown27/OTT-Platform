import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import AppState from "../Context/AppState";
import { Ionicons } from "@expo/vector-icons";
import axios from "../axios/axios";
import config from "../env";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: {},
      loading: true,
      query: "",
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = this.context.userToken;
    axios
      .get("/course/courses")
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

  onSearchHandler = (query) => {
    this.setState({
      ...this.state,
      loading: true,
      query: query,
    });
    axios
      .get("/course/courses/"+query)
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
  };

  render() {
    let renderMovie = ({ item }) => {
      return (
        <TouchableOpacity style={styles.card}>
          {item.watching && (
            <Ionicons
              style={styles.play}
              name="play-circle-outline"
              size={70}
              color="white"
            />
          )}
          <Image
            style={styles.thumb}
            source={{
              uri: config.SERVER_URL + "courseThumbnails/" + item.thumbnail,
            }}
          />
        </TouchableOpacity>
      );
    };
    let renderSection = ({ item }) => {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{item}</Text>
          <FlatList
            horizontal
            data={this.state.courses[item]}
            renderItem={renderMovie}
            keyExtractor={(i) => i.name}
          />
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={30} color="#8758FF" />
          <TextInput
            onChangeText={this.onSearchHandler}
            value={this.state.query}    
            style={styles.searchInput}
            placeholder="Search for Movie"
          />
        </View>
        {this.state.loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#8758FF"
          />
        )}
        <FlatList
          data={Object.keys(this.state.courses)}
          renderItem={renderSection}
          keyExtractor={(i) => i}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    zIndex: 10,
    elevation: 10,
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height / 2.25,
    left: Dimensions.get("window").width / 2.25,
  },
  play: {
    position: "absolute",
    zIndex: 10,
    top: 40,
    left: 30,
  },
  container: {
    margin: 2,
    marginBottom: "15%",
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  thumb: {
    height: 175,
    width: 300,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  movieHeading: {
    color: "white",
    fontFamily: "Poppins-Light",
    fontSize: 18,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
  searchInput: {
    width: "90%",
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
  section: {
    margin: 10,
    marginTop: 20,
  },
  sectionHeading: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
});
Home.contextType = AppState;
export default Home;
