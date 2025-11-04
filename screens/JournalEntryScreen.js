import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function JournalEntryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView styles={styles.scrollView}>
        <Text style={styles.dateHeader}>Date: 2nd November, 2025</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Writting...."
          placeholderTextColor="#999"
          multiline
          value=""
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    minHeight: 300,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 16,
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: "#007AFF",
    borderRadius: 16,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
