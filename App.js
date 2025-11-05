import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import JournalListScreen from "./screens/JournalListScreen";
import JournalEntryScreen from "./screens/JournalEntryScreen";
import EditEntryScreen from "./screens/EditEntryScreen";
import { JournalProvider } from "./context/journalContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <JournalProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "600",
              fontSize: 17,
            },
            cardStyle: { backgroundColor: "#f5f5f5" },
          }}
        >
          <Stack.Screen
            name="JournalList"
            component={JournalListScreen}
            options={{ title: "Journal" }}
          />
          <Stack.Screen
            name="JournalEntry"
            component={JournalEntryScreen}
            options={{ title: "Entry", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="EditEntry"
            component={EditEntryScreen}
            options={{ title: "Edit Entry", headerBackTitle: "Cancel" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
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
