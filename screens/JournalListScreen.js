import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
  navigation,
  FlatList,
} from "react-native";
import { JournalContext } from "../context/journalContext";
import { formatDate } from "../utils/dateUtils";

export default function JournalListScreen({ navigation }) {
  const { entries } = useContext(JournalContext);

  const handleNewEntry = () => {
    navigation.navigate("JournalEntry");
  };

  const handleSelectEntry = (entry) => {
    navigation.navigate("JournalEntry", { entryId: entry.id });
  };

  const renderEntry = ({ item }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => handleSelectEntry(item)}
    >
      <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
      <Text style={styles.entryPreview} numberOfLines={3}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>Journal list screen</Text>
  //     <TouchableOpacity style={styles.fab} onPress={handleNewEntry}>
  //       <Text style={styles.fabText}>+</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No entries yet</Text>
          <Text style={styles.emptySubtext}>
            Tap + to create your first entry
          </Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={handleNewEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  entryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  entryPreview: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
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
