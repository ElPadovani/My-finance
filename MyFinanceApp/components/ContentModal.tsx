import { Expense } from "@/api/types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Button, Box, Input, InputField, AlertDialogFooter, Text, VStack } from "@gluestack-ui/themed";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import MoneyInput from "./MoneyInput";
import { UpdateExpenseParams } from "@/api/resolvers/expenses/updateExpense";

export type ContentModalState = {
  isOpen: boolean;
  expense?: Expense;
};

export type ContentModalProps = {
  setModalState: Dispatch<SetStateAction<ContentModalState>>;
  modalState: ContentModalState;
};

export default function ContentModal({ modalState, setModalState }: ContentModalProps) {
  if (!modalState.isOpen || !modalState.expense) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expenseInfo, setExpenseInfo] = useState<UpdateExpenseParams>(
    (({ id, user_id, creation_date, ...rest }) => rest)(modalState.expense)
  );

  const cancelRef = useRef(null);

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const updateValue = (val: number) => {
    setExpenseInfo(prev => ({ ...prev, value: val }));
  }

  const handleUpdate = async () => {
    // setLoading(true);

    // const response = await deleteExpense(expenseId, token);

    // console.log(response);

    // if (!response || response.error) {
    //   setError(response?.error || "Erro inesperado");
    //   handleClose();
    //   return;
    // }

    // if (!response.data) {
    //   setError("Erro ao alterar informações");
    //   handleClose();
    //   return;
    // }

    setLoading(false);
    // fazer subir toast de conclusao
  };

  return (
    <AlertDialog
      isOpen={modalState.isOpen}
      onClose={handleClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text fontWeight="$bold" fontSize="$lg">
            Informações de gasto
          </Text>
          
          <AlertDialogCloseButton>
            <Ionicons name="close-circle-outline" size={20} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>

        <AlertDialogBody>
          {loading ? (
            <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
              <AntDesign name="loading" size={24} color="black" />
            </Box>
          ) : (
            <VStack sx={{ gap: "$4" }}>
              <VStack sx={{ gap: "$1" }}>
                <Text>Título</Text>

                <Input>
                  <InputField
                    placeholder="Titulo"
                    value={expenseInfo.title}
                  //   onChangeText={(text) => {
                  //     setError("");
                  //     setUserInfo((prev) => ({ ...prev, name: text }))
                  //   }}
                  />
                </Input>
              </VStack>

              <VStack sx={{ gap: "$1" }}>
                <Text>Categoria</Text>

                <Input>
                  <InputField
                    placeholder="Categoria"
                    value={expenseInfo.category}
                  //   onChangeText={(text) => {
                  //     setError("");
                  //     setUserInfo((prev) => ({ ...prev, name: text }))
                  //   }}
                  />
                </Input>
              </VStack>

              <VStack sx={{ gap: "$1" }}>
                <Text>Descrição</Text>

                <Input>
                  <InputField
                    placeholder="Descrição"
                    value={expenseInfo.description}
                  //   onChangeText={(text) => {
                  //     setError("");
                  //     setUserInfo((prev) => ({ ...prev, name: text }))
                  //   }}
                  />
                </Input>
              </VStack>

              <VStack sx={{ gap: "$1" }}>
                <Text>Valor</Text>

                <MoneyInput handle={updateValue} initialValue={expenseInfo.value}/>
              </VStack>
            </VStack>
          )}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            sx={{
              flex: 1,
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};