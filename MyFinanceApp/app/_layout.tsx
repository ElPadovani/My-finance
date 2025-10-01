import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { FontAwesome5 } from '@expo/vector-icons'
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { AuthProvider } from "@/context/AuthContext";
import { customConfig } from "@/gluestackConfig";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
  });

  useEffect(() => {
    // NavigationBar escondida (a parte que funciona em edge-to-edge)
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

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
          <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
            <StatusBar translucent style="inverted" backgroundColor="transparent" />

            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />

              <Stack.Screen name="register" options={{ headerShown: false }} />

              <Stack.Screen name="expense" options={{
                header: (props) => (
                  <View
                    style={{
                      flexDirection: "row",
                      height: 60, // altura fixa tipo Material Design
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      gap: 12
                    }}
                  >
                    <Pressable
                      onPress={() => props.navigation.goBack()}
                    >
                      <FontAwesome5 name="chevron-left" size={22} color="#5e3f44ff" />
                    </Pressable>

                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 26, color: "#5e3f44ff" }}>
                      Gasto
                    </Text>
                  </View>
                ),
              }}/>

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
