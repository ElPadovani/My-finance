import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Box, VStack, HStack, Text, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

type Expense = { id: string; title: string; amount: number };

export default function Expenses() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", title: "Mercado", amount: 150 },
    { id: "2", title: "Transporte", amount: 50 },
  ]);
  const [newExpense, setNewExpense] = useState("");

  function addExpense() {
    if (!newExpense.trim()) return;
    setExpenses((prev) => [...prev, { id: Date.now().toString(), title: newExpense.trim(), amount: 0 }]);
    setNewExpense("");
  }

  function deleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <Box sx={{ flex: 1, p: "$5" }}>
      <HStack sx={{ gap: "$2", mb: "$4" }}>
        <Input sx={{ flex: 1 }}>
          <InputField placeholder="Novo gasto" value={newExpense} onChangeText={setNewExpense} />
        </Input>
        <Button onPress={addExpense}>
          <ButtonText>Adicionar</ButtonText>
        </Button>
      </HStack>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#eee" }} />}
        renderItem={({ item }) => (
          <HStack sx={{ justifyContent: "space-between", alignItems: "center", py: "$2" }}>
            <Text>{item.title} - R${item.amount}</Text>
            <Pressable onPress={() => deleteExpense(item.id)} hitSlop={8}>
              <Ionicons name="trash" size={20} color="#d11" />
            </Pressable>
          </HStack>
        )}
      />

      <Button mt="$5" onPress={() => router.push("/chart")}>
        <ButtonText>Ver Gráfico</ButtonText>
      </Button>
    </Box>
  );
}
