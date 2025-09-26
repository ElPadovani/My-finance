import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();

  const { user } = useAuth();

  if (!user) {
    router.replace("/");

    return;
  };

  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (email: string, password: string) => {
  //   const response = await login(email, password);

  //   console.log(response)

  //   if (response.error && !response.data) {
  //     setError(response.error);

  //     return;
  //   };

  //   router.replace("/(tabs)/expenses");
  // };

  if (loading) {
    return (
      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <AntDesign name="loading" size={24} color="black" />
      </Box>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS sobe com padding, Android ajusta altura
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // ajuste se tiver header
    >

      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <VStack sx={{ gap: "$4", width: "100%", maxWidth: 360 }}>
          <Text sx={{ fontSize: 18, fontWeight: "700" }}>Informações do usuário:</Text>

          <Input>
            <InputField 
              placeholder="Nome" 
              value={userInfo.name}
              onChangeText={(text) => { 
                setError("");
                setUserInfo((prev) => ({ ...prev, name: text }))
              }}
            />
          </Input>

          <Input>
            <InputField 
              placeholder="Email" 
              value={userInfo.email}
              keyboardType="email-address"
              onChangeText={(text) => { 
                setError("");
                setUserInfo((prev) => ({ ...prev, email: text }))
              }}
            />
          </Input>

          <Button 
            disabled={!!error.length}
            // onPress={() => handleLogin(userParams.email, userParams.password)}
          >
            <ButtonText>Alterar Informações</ButtonText>
          </Button>

        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}