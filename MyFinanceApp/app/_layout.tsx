import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.replace("/(tabs)/expenses");
      } else {
        router.replace("/"); // tela de login
      }
    }
  }, [loading, token]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="#000" />
            <Stack
              screenOptions={{
                headerTintColor: "#000",
                headerTitle: "My Finance",
              }}
            />
          </SafeAreaView>
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
