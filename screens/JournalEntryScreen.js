import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { JournalContext } from "../context/journalContext";
import { formatDate } from "../utils/dateUtils";

export default function JournalEntryScreen({ route, navigation }) {
  const { createEntry, removeEntry, getEntryByDate, getEntryById } =
    useContext(JournalContext);
  const date = route?.params?.date ?? new Date().toISOString();
  const entryId = route?.params?.entryId ?? Date.now().toString();
  const [content, setContent] = useState("");
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    loadEntry();
  }, []);

  const loadEntry = () => {
    if (entryId) {
      const entry = getEntryById(entryId);
      if (entry) {
        setCurrentEntry(entry);
        setContent(entry.content);
      }
    }
    // else if (date) {
    //   const existingEntry = getEntryByDate(date);
    //   if (existingEntry) {
    //     setCurrentEntry(existingEntry);
    //     setContent(existingEntry.content);
    //   }
    // }
  };

  const handleSave = () => {
    console.log(content);
    if (!content.trim()) {
      Alert.alert("Empty Entry", "Please write something before saving.");
      return;
    }
    if (currentEntry) {
      navigation.navigate("EditEntry", { entryId: currentEntry.id, content });
    } else {
      createEntry(date, content);
      setContent("");
      setCurrentEntry(null);
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    if (!currentEntry) return;
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          removeEntry(currentEntry.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.dateHeader}>
          {currentEntry ? formatDate(currentEntry.date) : formatDate(date)}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Start writing..."
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </ScrollView>
      <View style={styles.footer}>
        {currentEntry && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
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
