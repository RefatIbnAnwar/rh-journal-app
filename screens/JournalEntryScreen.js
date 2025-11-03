import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default function JournalEntryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Journal Entry screen</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("EditEntry")}
      ></Button>
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
