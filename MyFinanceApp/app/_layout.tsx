import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" backgroundColor="#fff" />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
