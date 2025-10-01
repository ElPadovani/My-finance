import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { Button, Box, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import MoneyInput from "@/components/MoneyInput";
import DateInput from "@/components/DateInput";
import createExpense, { CreateExpenseParams } from "@/api/resolvers/expenses/createExpense";


export default function CreateExpense() {
  const router = useRouter();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      router.replace("/");
    }
  }, [token, user, router]);

  if (!token || !user) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expenseInfo, setExpenseInfo] = useState<CreateExpenseParams>({
    user_id: user.id, title: "", category: "", description: "", expense_date: "", value: 0
  });

  const todayRef = useRef(new Date());

  const handleValue = useCallback((val: number) => {
    setExpenseInfo(prev => (prev.value === val ? prev : { ...prev, value: val }));
    setError("");
  }, []);

  const handleDate = useCallback((date: Date | null) => {
    if (!date) return;
    const iso = date.toISOString();
    setExpenseInfo(prev => (prev.expense_date === iso ? prev : { ...prev, expense_date: iso }));
    setError("");
  }, []);

  const handleUpdate = async () => {
    setLoading(true);

    const response = await createExpense(expenseInfo, token);

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

    router.push("/(tabs)/expenses");
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
              initialValue={todayRef.current}
              maxDate={todayRef.current}
            />
          </VStack>

          {error.length > 0 && (
            <Text sx={{ color: "$red600" }}>{error}</Text>
          )}
        </VStack>
      </VStack>


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
        <Text color="white">Adicionar</Text>
      </Button>
    </Box>
  );
};