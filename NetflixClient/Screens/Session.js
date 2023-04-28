import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  FlatList,
  Image,
  Linking,
} from "react-native";
import AppState from "../Context/AppState";
import axios from "../axios/axios";

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSessions: [],
      loading: true,
      isRefreshing: false,
      topic: "",
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = this.context.userToken;
    axios
      .get("/meeting/")
      .then((res) => {
        this.setState({
          ...this.state,
          currSessions: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.showAlert();
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }

  createSessionHandler = () => {
    axios
      .post("/meeting/", {
        topic: this.state.topic,
      })
      .then((res) => {
        console.log(res)
        Linking.openURL(res.data.start_url);
      })
      .catch((err) => {
        this.showAlert();
      });
  };

  refreshHandler = () => {
    this.setState(
      {
        ...this.state,
        isRefreshing: true,
      },
      () => {
        axios
          .get("/meeting/")
          .then((res) => {
            this.setState({
              ...this.state,
              currSessions: res.data,
              isRefreshing: false,
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              isRefreshing: false,
            });
            this.showAlert();
          });
      }
    );
  };

  showAlert = () => {
    Alert.alert("Something Went Wrong", "Please Try Again!", [
      { text: "OK", onPress: () => {} },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        {(this.state.loading || this.state.isRefreshing) && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#8758FF"
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionHeading}>Ongoing Live Sessions</Text>
          <FlatList
            data={this.state.currSessions}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  Linking.openURL(item.join_url);
                }}
              >
                <Image
                  style={styles.thumb}
                  source={{
                    uri: "https://streamingo-course.s3.ap-south-1.amazonaws.com/thumbnails/session.jpg",
                  }}
                />
                <Text style={styles.sessionHeading}>{item.topic}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            refreshing={this.state.isRefreshing}
            onRefresh={() => this.refreshHandler()}
          />
        </View>

        <View style={styles.section}>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              this.setState({
                ...this.state,
                topic: input
              });
            }}
            value={this.state.topic}
            placeholder="Session Topic"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.createSessionHandler}
          >
            <Text style={styles.btnText}>Start Live Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 18, color: "white" },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#8758FF",
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
  section: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
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
  card: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  thumb: {
    height: 200,
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
  },
  sectionHeading: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  sessionHeading: {
    color: "grey",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    padding: 10,
  },
  loader: {
    zIndex: 10,
    elevation: 10,
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height / 2.25,
    left: Dimensions.get("window").width / 2.25,
  },
});

Session.contextType = AppState;
export default Session;
