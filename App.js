import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JournalProvider } from "./context/journalContext";
import JournalListScreen from "./screens/JournalListScreen";
import JournalEntryScreen from "./screens/JournalEntryScreen";
import EditEntryScreen from "./screens/EditEntryScreen";
import { initializeRealm } from "./utils/realmConfig";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isRealmReady, setIsRealmReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeRealm();
        setIsRealmReady(true);
      } catch (error) {
        console.error("Failed to initialize Realm:", error);
      }
    };
    init();
  }, []);

  if (!isRealmReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
