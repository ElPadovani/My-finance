import React, { useState } from "react";
import { Box, Button, FlatList, HStack, IconButton, Input, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ExpensesScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState([
    { id: "1", title: "Mercado", amount: 150 },
    { id: "2", title: "Transporte", amount: 50 },
  ]);
  const [newExpense, setNewExpense] = useState("");

  const addExpense = () => {
    if (!newExpense) return;
    setExpenses([...expenses, { id: Date.now().toString(), title: newExpense, amount: 0 }]);
    setNewExpense("");
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <Box flex={1} safeArea p={5}>
      <HStack space={2}>
        <Input flex={1} placeholder="Novo gasto" value={newExpense} onChangeText={setNewExpense} />
        <Button onPress={addExpense}>Adicionar</Button>
      </HStack>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HStack justifyContent="space-between" alignItems="center" p={2} borderBottomWidth={1}>
            <Text>{item.title} - R${item.amount}</Text>
            <IconButton
              icon={<Ionicons name="trash" size={20} color="red" />}
              onPress={() => deleteExpense(item.id)}
            />
          </HStack>
        )}
      />

      <Button mt={5} onPress={() => router.push("/chart")}>
        Ver Gráfico
      </Button>
    </Box>
  );
}
