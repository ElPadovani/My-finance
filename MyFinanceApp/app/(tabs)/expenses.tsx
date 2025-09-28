import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Box, VStack, HStack, Text, Input, InputField, Button, ButtonText, View } from "@gluestack-ui/themed";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Expense } from "@/api/types";
import deleteExpense from "@/api/resolvers/expenses/deleteExpense";
import { useAuth } from "@/context/AuthContext";
import getUserExpenses, { GetUserExpensesParams } from "@/api/resolvers/expenses/getUserExpenses";

type Params = Omit<GetUserExpensesParams, "userId">;

export default function Expenses() {
  const router = useRouter();

  const { user, token } = useAuth();

  if (!user || !token) {
    router.replace("/");

    return;
  }

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [params, setParams] = useState<Params>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const GetUserExpenses = async () => {
    const response = await getUserExpenses({ userId: user.id, ...params }, token);

    console.log(response);

    if (!response || response.error) {
      setError(response?.error || "Erro inesperado");
      return;
    }

    if (!response.data) {
      setError("Erro ao buscar gastos.");
      return;
    }

    setExpenses(response.data);
  };

  const handleDelete = async (expenseId: string) => {
    setLoading(true);

    const response = await deleteExpense(expenseId, token);

    console.log(response);

    if (!response || response.error) {
      setError(response?.error || "Erro inesperado");
      setLoading(false);
      return;
    }

    if (!response.data) {
      setError("Erro ao alterar informações");
      setLoading(false);
      return;
    }

    GetUserExpenses();

    setLoading(false);
    // fazer subir toast de conclusao
  };

  useEffect(() => {
    GetUserExpenses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <AntDesign name="loading" size={24} color="black" />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, p: "$5" }}>
      {expenses.length > 0 ? (
        <>
          <FlatList
            data={expenses.sort((a, b) =>
              (new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime())
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View sx={{ height: "$4" }} />}
            renderItem={({ item }) => (
              <VStack sx={{
                alignItems: "flex-start", py: "$2", px: "$2", gap: "$1",
                backgroundColor: "#fff", borderColor: "#2c2c2c", borderRadius: 6
              }}
              >
                <Text
                  sx={{ fontWeight: 600, fontSize: 18 }}
                >
                  {item.title}
                </Text>

                <Text
                  sx={{ fontSize: 14 }}
                >
                  {item.category}
                </Text>

                <Text
                  sx={{ color: "$green600", fontWeight: 500 }}
                >
                  {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>

                <Text
                  sx={{ color: "$warmGray400", fontSize: 12 }}
                >
                  Data: {new Date(item.expense_date).toLocaleDateString("pt-BR")}
                </Text>
              </VStack>
            )}
          />
            
          <Button 
            sx={{ marginTop: "$5", backgroundColor: "#5e3f44ff", ":active": { opacity: "$50" } }} 
            onPress={() => router.push("/chart")}
          >
            <ButtonText>Aplicar Filtros</ButtonText>
          </Button>
        </>
      ) : (
        <Text>Nenhum gasto criado</Text>
      )}
    </Box>
  );
}
