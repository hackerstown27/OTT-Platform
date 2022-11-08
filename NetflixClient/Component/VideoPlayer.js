import React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "../axios/axios";

export default function VideoPlayer(props) {
  const video = React.useRef(null);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: props.src,
        }}
        useNativeControls
        onPlaybackStatusUpdate={({ didJustFinish }) => {
          if (didJustFinish == true) {
            props.onRemoveFromWatch();
          }
        }}
      />
      <TouchableOpacity onPress={() => props.onDismiss()}>
        <Ionicons
          style={styles.btn}
          name="close-circle"
          size={45}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 250,
  },
  btn: {
    textAlign: "center",
  },
});
