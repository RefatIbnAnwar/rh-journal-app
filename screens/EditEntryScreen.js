import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function EditEntryScreen() {
  return (
    <View style={styles.container}>
      <Text>Edit Entry screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
