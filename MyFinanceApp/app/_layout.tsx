import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/AuthContext";
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
import { customConfig } from "@/gluestackConfig";
import { FontAwesome5 } from '@expo/vector-icons'

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
      {/* <StyledProvider config={customConfig}> */}
        <GluestackUIProvider config={customConfig}>
          <AuthProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar style="inverted" backgroundColor="#000" />
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
      {/* </StyledProvider> */}
    </SafeAreaProvider>
  );
}
