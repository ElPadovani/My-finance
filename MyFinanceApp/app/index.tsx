import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";

export default function Login() {
  const router = useRouter();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" sx={{ p: '$5' }}>
      <VStack space="md" sx={{ w: '$80' }}>
        <Text size="2xl" bold>
          Login
        </Text>
        <Input>
          <InputField placeholder="Email" />
        </Input>
        <Input>
          <InputField placeholder="Senha" type="password" />
        </Input>
        <Button onPress={() => router.replace("/expenses")}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <Button variant="link" onPress={() => router.push("/register")}>
          <ButtonText>Criar Conta</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
