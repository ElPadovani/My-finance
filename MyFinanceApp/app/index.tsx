import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText, Pressable } from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import login from "@/api/resolvers/user/login";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/context/AuthContext";

type UserParams = {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const { loading, saveLogin } = useAuth();

  const [userParams, setUserParams] = useState<UserParams>({ email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);

    console.log(response);

    if (!response || response.error) {
      setError(response?.error || "Erro inesperado");
      return;
    }

    await saveLogin(response.data!.token, response.data!.user);

    router.push("/(tabs)/expenses");
  };

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
          <Text sx={{ fontSize: 24, fontFamily: "Poppins_700Bold" }}>Login</Text>

          <Input>
            <InputField 
              placeholder="Email" 
              keyboardType="email-address"
              onChangeText={(text) => { 
                setError("");
                setUserParams((prev) => ({ ...prev, email: text }))
              }}
            />
          </Input>

          <Input>
            <InputField 
              placeholder="Senha" 
              secureTextEntry={!showPwd}
              autoCapitalize="none"
              onChangeText={(text) => { 
                setError("");
                setUserParams((prev) => ({ ...prev, password: text }));
              }} 
            />

            <Button sx={{ backgroundColor: "transparent" }} onPress={() => setShowPwd(prev => !prev)}>
              <Ionicons name={showPwd ? "eye-off" : "eye"} size={20}/>
            </Button>
          </Input>

          {error.length > 0 && (
            <Text sx={{ color: "$red600" }}>{error}</Text>
          )}

          <Button 
            sx={{ backgroundColor: "#5e3f44ff", ":active": { opacity: "$50" } }}
            isDisabled={!!error.length}
            onPress={() => handleLogin(userParams.email, userParams.password)}
          >
            <ButtonText>Entrar</ButtonText>
          </Button>

          <Pressable onPress={() => router.push("/register")}>
            <Text sx={{ color: "#5e3f44ff", mt: "$2" }}>Criar Conta</Text>
          </Pressable>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}