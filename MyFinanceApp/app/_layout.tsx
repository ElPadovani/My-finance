import { Stack } from "expo-router";
import { GluestackUIProvider, StyledProvider, Text, View, HStack, Pressable } from "@gluestack-ui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/AuthContext";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { customConfig } from "@/gluestackConfig";
import { AntDesign } from "@expo/vector-icons";

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
      <StyledProvider config={customConfig}>
        <GluestackUIProvider config={customConfig}>
          <AuthProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar style="inverted" backgroundColor="#000" />
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen name="register" options={{ headerShown: false }} />

                <Stack.Screen name="expense" options={{
                  header: (props) => (
                    <HStack
                      sx={{
                        height: 60, // altura fixa tipo Material Design
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        gap: 6
                      }}
                    >
                      <Pressable
                        onPress={() => props.navigation.goBack()}
                      >
                        <AntDesign name="left" size={14} color="black" />
                      </Pressable>

                      <Text sx={{ fontFamily: "Poppins_700Bold", fontSize: 26, color: "#5e3f44ff" }}>
                        Gasto
                      </Text>
                    </HStack>
                  ),
                }}/>

                <Stack.Screen
                  name="(tabs)"
                  options={{
                    header: () => (
                      <View
                        sx={{
                          height: 60, // altura fixa tipo Material Design
                          justifyContent: "center",
                          paddingHorizontal: 20,
                          paddingTop: 20
                        }}
                      >
                        <Text sx={{ fontFamily: "Poppins_700Bold", fontSize: 26, color: "#5e3f44ff" }}>
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
      </StyledProvider>
    </SafeAreaProvider>
  );
}
