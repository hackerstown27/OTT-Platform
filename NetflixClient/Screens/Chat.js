import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AppState from "../Context/AppState";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import config from "../env";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBoxValue: "",
      msgs: [{ role: "system", content: "Hello! How may I assist you today?" }],
      isLoading: false,
      alert: {
        show: false,
        msg: "",
      },
    };
  }

  onSendHandler = (promt, msg, isPromt) => {
    let sendmsg = [{ role: "user", content: msg }];
    if (isPromt) {
      sendmsg = [...sendmsg, { role: "assistant", content: promt }];
    }
    this.setState(
      {
        ...this.state,
        msgs: [...this.state.msgs, ...sendmsg],
        chatBoxValue: "",
        isLoading: true,
      },
      () => {
        axios
          .post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: this.state.msgs,
              max_tokens: 100,
            },
            {
              headers: { Authorization: `Bearer ${config.OPENAI_API_KEY}` },
            }
          )
          .then((res) => {
            this.setState({
              ...this.state,
              isLoading: false,
              msgs: [
                ...this.state.msgs,
                {
                  role: "system",
                  content: res.data.choices[0].message.content,
                },
              ],
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              alert: {
                show: true,
                msg: "ChatGPT is facing some trouble, Please Try Again Later",
              },
              isLoading: false,
            });
            console.log(err);
          });
      }
    );
  };

  onChangeChatBoxValue = (input) => {
    this.setState({
      ...this.state,
      chatBoxValue: input,
    });
  };
  createMessage = (role, msg, id) => {
    let msgStyle = styles.msgBoxBot;
    if (role == "user") msgStyle = styles.msgBoxUser;
    return (
      <View key={id} style={{ ...styles.msgBox, ...msgStyle }}>
        <Text style={styles.msg}>{msg}</Text>
      </View>
    );
  };
  render() {
    const promts = [
      "Ask me 3 MCQ question, to check my interest in technology fields such as AI, Cyber Security, Ethical Hacking, Cloud Computing, Big Data, Deep Learning, Power BI, Data Analytics, and Tableau. Also include some technical questions related to these fields. & tell me in which technology should i follow my career in based on the answers given, ask me given questions one bye one",
      "Ask me 3 mcq question on the topic specified by me, ask me given questions one bye one",
      "Need to Ask a Doubt",
    ];
    const ShowAlert = (msg) =>
      Alert.alert("ChatGPT Unavailable", msg, [
        {
          text: "OK",
          onPress: () => {
            this.setState({
              alert: {
                show: false,
                msg: "",
              },
            });
          },
        },
      ]);
    return (
      <View style={styles.container}>
        {this.state.alert.show && ShowAlert(this.state.alert.msg)}
        <View style={styles.chatMsg}>
          <ScrollView
            ref={(ref) => (this.scrollView = ref)}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: false });
            }}
          >
            {this.state.msgs
              .filter((msg) => msg.role != "assistant")
              .map((msg, index) => this.createMessage(msg.role, msg.content, index))}
          </ScrollView>
        </View>
        <View style={styles.bubbles}>
          <TouchableOpacity
            style={styles.bubbleBtn}
            onPress={() =>
              this.onSendHandler(promts[0], "Recommend Career Path!", true)
            }
          >
            <Text style={styles.bubbleTxt}>Recommend Career Path!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bubbleBtn}
            onPress={() => this.onSendHandler(promts[1], "Quiz Me!", true)}
          >
            <Text style={styles.bubbleTxt}>Quiz Me!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bubbleBtn}
            onPress={() => this.onSendHandler(promts[2], "Ask Doubts?", true)}
          >
            <Text style={styles.bubbleTxt}>Ask Doubts?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chatBox}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeChatBoxValue}
            value={this.state.chatBoxValue}
            placeholder="Ask Something!!!"
          />
          {!this.state.isLoading ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.onSendHandler(
                  this.state.chatBoxValue,
                  this.state.chatBoxValue,
                  false
                )
              }
            >
              <FontAwesome name="send" size={30} color="#8758FF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.button}>
              <ActivityIndicator size="large" color="#8758FF" />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", padding: 5 },
  chatMsg: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
  },
  chatBox: {
    marginVertical: 15,
    flexDirection: "row",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    color: "black",
    fontFamily: "Poppins-Light",
    fontSize: 18,
    height: 55,
    borderRadius: 5,
    padding: 15,
  },
  button: {
    alignSelf: "center",
    padding: 8,
  },
  msg: {
    color: "white",
    fontFamily: "Poppins-Light",
    fontSize: 18,
  },
  msgBox: { borderRadius: 5, padding: 10, margin: 5, width: "75%" },
  msgBoxBot: { backgroundColor: "#865DFF" },
  msgBoxUser: { backgroundColor: "#4E6E81", alignSelf: "flex-end" },
  bubbles: { flexDirection: "row", flexWrap: "wrap" },
  bubbleBtn: {
    backgroundColor: "#3C79F5",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  bubbleTxt: { fontFamily: "Poppins-Bold", fontSize: 16, color: "white" },
});

Chat.contextType = AppState;
export default Chat;
