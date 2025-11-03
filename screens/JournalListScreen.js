import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
  navigation,
} from "react-native";

export default function JournalListScreen({ navigation }) {
  const handleNewEntry = () => {
    navigation.navigate("JournalEntry", { date: new Date().toISOString() });
  };

  return (
    <View style={styles.container}>
      <Text>Journal list screen</Text>
      <TouchableOpacity style={styles.fab} onPress={handleNewEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "600",
  },
});
