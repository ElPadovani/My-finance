import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Box, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { Expense as ExpenseType } from "@/api/types";
import updateExpense, { UpdateExpenseParams } from "@/api/resolvers/expenses/updateExpense";
import MoneyInput from "@/components/MoneyInput";
import { useAuth } from "@/context/AuthContext";
import DateInput from "@/components/DateInput";

type ExpenseLocalParams = 
  Pick<ExpenseType, "id" | "title" | "category" | "description" | "value" | "expense_date">;

export default function Expense() {
  const router = useRouter();
  const { token } = useAuth();
  const expense = useLocalSearchParams() as unknown as ExpenseLocalParams;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expenseInfo, setExpenseInfo] = useState<Required<UpdateExpenseParams>>(
    (({ id, ...rest }) => rest)(expense)
  );

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  if (!token) return null;

  const handleValue = (val: number) => {
    setExpenseInfo(prev => ({ ...prev, value: val }));
    setError("");
  };

  const handleDate = (date: Date | null) => {
    if (date) {
      setExpenseInfo(prev => ({...prev, expense_date: date.toString() }));
      setError("");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    console.log(expenseInfo);

    const response = await updateExpense(expense.id, expenseInfo, token);

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

    setLoading(false);

    router.replace("/(tabs)/expenses");
    // // fazer subir toast de conclusao
  };

  if (loading) {
    return (
      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <AntDesign name="loading" size={24} color="black" />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, p: "$5" }}>
      <Text sx={{ fontFamily: "Poppins_700Bold", fontSize: 24, mb: "$4" }}>
        Informações de gasto
      </Text>
      
      <VStack sx={{ flex: 1, justifyContent: "space-between" }}>
        <VStack sx={{ gap: "$4" }}>
          <VStack sx={{ gap: "$1" }}>
            <Text>Título</Text>

            <Input>
              <InputField
                placeholder="Titulo"
                value={expenseInfo.title}
                onChangeText={(text) => {
                  setError("");
                  setExpenseInfo((prev) => ({ ...prev, title: text }))
                }}
              />
            </Input>
          </VStack>

          <VStack sx={{ gap: "$1" }}>
            <Text>Categoria</Text>

            <Input>
              <InputField
                placeholder="Categoria"
                value={expenseInfo.category}
                onChangeText={(text) => {
                  setError("");
                  setExpenseInfo((prev) => ({ ...prev, category: text }))
                }}
              />
            </Input>
          </VStack>

          <VStack sx={{ gap: "$1" }}>
            <Text>Descrição</Text>

            <Input>
              <InputField
                placeholder="Descrição"
                value={expenseInfo.description}
                onChangeText={(text) => {
                  setError("");
                  setExpenseInfo((prev) => ({ ...prev, description: text }))
                }}
              />
            </Input>
          </VStack>

          <VStack sx={{ gap: "$1" }}>
            <Text>Valor</Text>

            <MoneyInput handle={handleValue} initialValue={expenseInfo.value}/>
          </VStack>

          <VStack sx={{ gap: "$1" }}>
            <Text>Data</Text>

            <DateInput 
              handle={handleDate}
              initialValue={new Date(expenseInfo.expense_date)}
              maxDate={new Date()}
            />
          </VStack>

          {error.length > 0 && (
            <Text sx={{ color: "$red600" }}>{error}</Text>
          )}
        </VStack>
      </VStack>

      <VStack sx={{ gap: "$4" }}>
        <Button
          isDisabled={!!error.length}
          sx={{
            backgroundColor: "#5e3f44ff", 
            ":active": { opacity: "$50" },
            // sombra iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08, // bem suave
            shadowRadius: 6,

            // sombra Android
            elevation: 3,
          }}
          onPress={handleUpdate}
        >
          <Text color="white">Alterar informações</Text>
        </Button>

        <Button
          isDisabled={!!error.length}
          sx={{
            backgroundColor: "#5e3f44ff", 
            ":active": { opacity: "$50" },
            // sombra iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08, // bem suave
            shadowRadius: 6,

            // sombra Android
            elevation: 3,
          }}
          onPress={handleUpdate}
        >
          <Text color="white">Deletar</Text>
        </Button>
      </VStack>
    </Box>
  );
};