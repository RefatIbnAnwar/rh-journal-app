import { useEffect, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { JournalProvider } from "./context/journalContext";
import { initializeRealm } from "./utils/realmConfig";

import JournalListScreen from "./screens/JournalListScreen";
import JournalEntryScreen from "./screens/JournalEntryScreen";
import EditEntryScreen from "./screens/EditEntryScreen";
import AuthScreen from "./screens/AuthScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Journal Stack Navigator
function JournalStack() {
  return (
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
  );
}

// Tab Navigator (Journal + Profile)
function AppTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "JournalStack") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e0e0e0",
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        name="JournalStack"
        component={JournalStack}
        options={{ title: "Journal" }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator - Conditionally shows Auth or App based on user
function RootNavigator() {
  const { user, checkAuth, isLoading: authLoading } = useContext(AuthContext);
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

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isRealmReady || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return user ? <AppTabs /> : <AuthScreen />;
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <JournalProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </JournalProvider>
    </AuthProvider>
  );
}
