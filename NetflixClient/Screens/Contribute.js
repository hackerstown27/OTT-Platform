import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Dropdown from "../Component/Dropdown";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import AppState from "../Context/AppState";
import axios from "../axios/axios";

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courseCategory: "Choose Category",
      thumbnailInput: null,
      videoInput: null,
      isValid: false,
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = this.context.userToken;
  }

  courseNameHandler = (input) => {
    this.setState({
      ...this.state,
      courseName: input,
    }, this.validate);
  };

  courseCategoryHandler = (input) => {
    this.setState({
      ...this.state,
      courseCategory: input,
    }, this.validate);
  };

  thumbnailHandler = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    this.setState({
      ...this.state,
      thumbnailInput: result,
    }, this.validate);
  };

  videoHandler = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "video/*" });
    this.setState({
      ...this.state,
      videoInput: result,
    }, this.validate);
  };

  validate = () => {
    if (
      this.state.courseName != "" &&
      this.state.courseCategory != "Choose Category" &&
      this.state.thumbnailInput != null &&
      this.state.videoInput != null
    ) {
      this.setState({
        ...this.state,
        isValid: true,
      });
    } else {
      this.setState({
        ...this.state,
        isValid: false,
      });
    }
  };

  onUploadHandler = async () => {
    const formData = new FormData();
    formData.append("thumbnail", this.state.thumbnailInput);
    formData.append("video", this.state.videoInput);
    formData.append("courseName", this.state.courseName);
    formData.append("courseCategory", this.state.courseCategory);
    axios
      .put("/course/courses/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>Add Course</Text>
          <Text style={styles.label}>Upload Course Content To Contribute</Text>
          <Dropdown
            options={[
              "Choose Category",
              "CS Subject",
              "Coding",
              "Language",
              "Skill",
            ]}
            onUpdate={this.courseCategoryHandler}
            currentValue={this.state.courseCategory}
          />
          <TextInput
            style={styles.input}
            onChangeText={this.courseNameHandler}
            value={this.state.courseName}
            placeholder="Course Name"
          />
          <TouchableOpacity
            style={styles.uploadbutton}
            onPress={() => {
              this.thumbnailHandler();
            }}
          >
            <EvilIcons
              style={styles.uploadIcon}
              name="image"
              size={60}
              color="white"
            />
            <Text style={styles.uploadbtnText}>Choose Thumbnail</Text>
            {this.state.thumbnailInput != null && (
              <Text style={styles.fileTag}>
                File: {this.state.thumbnailInput.name}{" "}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadbutton}
            onPress={() => {
              this.videoHandler();
            }}
          >
            <MaterialCommunityIcons
              style={styles.uploadIcon}
              name="file-video"
              size={60}
              color="white"
            />
            <Text style={styles.uploadbtnText}>Choose Video File</Text>
            {this.state.videoInput != null && (
              <Text style={styles.fileTag}>
                File: {this.state.videoInput.name}{" "}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.isValid ? styles.button : styles.disbledbutton}
            onPress={() => {
              this.onUploadHandler();
            }}
            disabled={!this.state.isValid}
          >
            <Text style={styles.btnText}>Upload Course</Text>
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
  button: {
    alignSelf: "stretch",
    backgroundColor: "#8758FF",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  disbledbutton: {
    alignSelf: "stretch",
    backgroundColor: "#B2A4FF",
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
  uploadbutton: {
    alignSelf: "stretch",
    backgroundColor: "#BACDDB",
    padding: 10,
    marginTop: 20,
    minheight: 100,
    borderRadius: 5,
  },
  uploadbtnText: {
    alignSelf: "center",
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Light",
  },
  uploadIcon: {
    alignSelf: "center",
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
  fileTag: {
    alignSelf: "center",
    fontSize: 12,
    color: "#DDFFBB",
    fontFamily: "Poppins-Bold",
  },
});

Contribute.contextType = AppState;
export default Contribute;
