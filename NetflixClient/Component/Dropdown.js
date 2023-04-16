import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

class Dropdown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={this.props.currentValue}
          onValueChange={(itemValue, itemIndex) =>
            this.props.onUpdate(itemValue)
          }
        >
          {this.props.options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#BACDDB",
    borderRadius: 5,
    height: 55,
  },
  pickerItem: {
    height: 55,
    color: "white",
  },
  container: {
    paddingTop: 10,
  },
});

export default Dropdown;
