import { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { JournalContext } from "../context/journalContext";

export default function EditEntryScreen({ route, navigation }) {
  const { editEntry, removeEntry } = useContext(JournalContext);
  const { entryId, content: initialContent } = route.params;
  const [content, setContent] = useState(initialContent);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert("Empty Entry", "Please write something before saving.");
      return;
    }
    await editEntry(entryId, content);
    navigation.popToTop();
  };

  const handleDelete = () => {
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeEntry(entryId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Edit your entry..."
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
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
