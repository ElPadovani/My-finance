import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import login from "@/api/resolvers/user/login";
import { Ionicons } from "@expo/vector-icons";

type UserParams = {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [userParams, setUserParams] = useState<UserParams>({ email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);

    console.log(response)

    if (response.error) setError(response.error);
  };

  return (
    <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
      <VStack sx={{ gap: "$4", width: "100%", maxWidth: 360 }}>
        <Text sx={{ fontSize: 24, fontWeight: "700" }}>Login</Text>

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
          disabled={!!error.length}
          onPress={() => handleLogin(userParams.email, userParams.password)}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Pressable onPress={() => router.push("/register")}>
          <Text sx={{ color: "$primary600", mt: "$2" }}>Criar Conta</Text>
        </Pressable>
      </VStack>
    </Box>
  );
}