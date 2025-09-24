import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";

export default function Register() {
  const router = useRouter();

  return (
    <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
      <VStack sx={{ gap: "$4", width: "100%", maxWidth: 360 }}>
        <Text sx={{ fontSize: 24, fontWeight: "700" }}>Criar Conta</Text>

        <Input>
          <InputField placeholder="Nome" />
        </Input>

        <Input>
          <InputField placeholder="Email" keyboardType="email-address" />
        </Input>

        <Input>
          <InputField placeholder="Senha" secureTextEntry />
        </Input>

        <Button onPress={() => router.replace("/expenses")}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
