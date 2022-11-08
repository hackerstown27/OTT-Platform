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
import VideoPlayer from "../Component/VideoPlayer";
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
      videoSrc: null,
      isRefreshing: false,
      currCourseId: null,
    };
  }

  initialization() {
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

  componentDidMount() {
    this.initialization();
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
      .get("/course/courses/" + query)
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

  addToWatchHandler = (id) => {
    axios.post("/course/courses/watch", { id: id });
  };

  removeFromWatchHandler = (id) => {
    axios.delete("/course/courses/watch/" + id);
  };

  addBookmarkHandler = (id) => {
    axios.post("/course/courses/bookmark", { id: id });
    Alert.alert("Bookmark Added", "Course Added To Your WishList", [
      { text: "OK", onPress: () => {} },
    ]);
  };

  refreshHandler = () => {
    this.setState({
      ...this.state,
      isRefreshing: true,
    });
    this.initialization();
    this.setState({
      ...this.state,
      isRefreshing: false,
    });
  };

  render() {
    let renderMovie = ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            this.setState({
              ...this.state,
              videoSrc: item.videoSrc,
              currCourseId: item._id,
            });
            this.addToWatchHandler(item._id);
          }}
        >
          {item.watching && (
            <Ionicons
              style={styles.play}
              name="play-circle-outline"
              size={100}
              color="white"
            />
          )}
          <TouchableOpacity
            style={styles.bookmark}
            onPress={() => this.addBookmarkHandler(item._id)}
          >
            <Ionicons name="bookmarks" size={20} color="white" />
          </TouchableOpacity>

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
      if (this.state.courses[item].length != 0)
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
            placeholder="Search for Course"
          />
        </View>
        {this.state.videoSrc != null && (
          <VideoPlayer
            src={this.state.videoSrc}
            onDismiss={() => {
              this.setState({
                ...this.state,
                videoSrc: null,
                currCourseId: null,
              });
            }}
            onRemoveFromWatch={() =>
              this.removeFromWatchHandler(this.state.currCourseId)
            }
          />
        )}
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
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.refreshHandler()}
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
    left: 100,
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
  bookmark: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 10,
    backgroundColor: "#6B728E",
    padding: 10,
    borderRadius: 10,
  },
});
Home.contextType = AppState;
export default Home;
