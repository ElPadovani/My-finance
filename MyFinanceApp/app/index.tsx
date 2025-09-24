import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { Pressable } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
      <VStack sx={{ gap: "$4", width: "100%", maxWidth: 360 }}>
        <Text sx={{ fontSize: 24, fontWeight: "700" }}>Login</Text>

        <Input>
          <InputField placeholder="Email" keyboardType="email-address" />
        </Input>

        <Input>
          <InputField placeholder="Senha" secureTextEntry />
        </Input>

        <Button onPress={() => router.replace("/expenses")}>
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Pressable onPress={() => router.push("/register")}>
          <Text sx={{ color: "$primary600", mt: "$2" }}>Criar Conta</Text>
        </Pressable>
      </VStack>
    </Box>
  );
}