import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="#000" />
            <Stack>
              <Stack.Screen 
                name="index"
                options={{ headerShown: false }}
              />

              <Stack.Screen 
                name="register"
                options={{ headerShown: false }}
              />

              <Stack.Screen 
                name="(tabs)"
                options={{
                  headerTintColor: "#000",
                  headerTitle: "My Finance",
                }}
              />
            </Stack>
          </SafeAreaView>
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
