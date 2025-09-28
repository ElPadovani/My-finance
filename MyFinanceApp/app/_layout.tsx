import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/AuthContext";
import { Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { customConfig } from "@/gluestackConfig";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Carregando fontes...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={customConfig}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="inverted" backgroundColor="#000" />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />

              <Stack.Screen name="register" options={{ headerShown: false }} />

              <Stack.Screen
                name="(tabs)"
                options={{
                  header: () => (
                    <View
                      style={{
                        height: 60, // altura fixa tipo Material Design
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        paddingTop: 20
                      }}
                    >
                      <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 26, color: "#5e3f44ff" }}>
                        My Finance
                      </Text>
                    </View>
                  ),
                }}
              />
            </Stack>
          </SafeAreaView>
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
