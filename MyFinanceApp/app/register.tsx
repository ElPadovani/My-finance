import { Box, Button, Input, Text, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <Box flex={1} safeArea p={5} justifyContent="center">
      <VStack space={4}>
        <Text fontSize="2xl" bold>Criar Conta</Text>
        <Input placeholder="Nome" />
        <Input placeholder="Email" />
        <Input placeholder="Senha" type="password" />
        <Button onPress={() => router.replace("/expenses")}>Cadastrar</Button>
      </VStack>
    </Box>
  );
}
