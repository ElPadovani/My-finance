import { KeyboardAvoidingView, Platform } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Button, Box, Input, InputField, AlertDialogFooter, Text, VStack } from "@gluestack-ui/themed";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Expense } from "@/api/types";
import updateExpense, { UpdateExpenseParams } from "@/api/resolvers/expenses/updateExpense";
import MoneyInput from "./MoneyInput";

export type ContentModalState = {
  isOpen: boolean;
  expense?: Expense;
};

export type ContentModalProps = {
  setModalState: Dispatch<SetStateAction<ContentModalState>>;
  modalState: ContentModalState;
  token: string;
};

export default function ContentModal({ modalState, setModalState, token }: ContentModalProps) {
  if (!modalState.isOpen) return null;
  if (!modalState.expense) return null;

  const router= useRouter();

  const expenseInfo: Expense = modalState.expense;

  const cancelRef = useRef(null);

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
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
          <Text sx={{ fontFamily: "Poppins_500Medium", fontSize: 20 }}>
            Informações de gasto
          </Text>
          
          <AlertDialogCloseButton>
            <Ionicons name="close-circle-outline" size={20} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>

        <AlertDialogBody>
          <VStack sx={{ gap: "$4" }}>
            <VStack sx={{ gap: "$1" }}>
              <Text sx={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Título</Text>

              <Text sx={{ fontSize: 14, pl: "$2" }}>{expenseInfo.title}</Text>
            </VStack>

            <VStack sx={{ gap: "$1" }}>
              <Text sx={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Categoria</Text>

              <Text sx={{ fontSize: 14, pl: "$2" }}>{expenseInfo.category}</Text>
            </VStack>

            <VStack sx={{ gap: "$1" }}>
              <Text sx={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Descrição</Text>

              <Text sx={{ fontSize: 14, pl: "$2" }}>{expenseInfo.description}</Text>
            </VStack>

            <VStack sx={{ gap: "$1" }}>
              <Text sx={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Valor</Text>

              <Text sx={{ fontSize: 14, pl: "$2" }}>{expenseInfo.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Text>
            </VStack>

            <VStack sx={{ gap: "$1" }}>
              <Text sx={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Data</Text>

              <Text sx={{ fontSize: 14, pl: "$2" }}>{new Date(expenseInfo.expense_date).toLocaleDateString("pt-BR")}</Text>
            </VStack>
          </VStack>
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
            onPress={() => {
              router.push({
                pathname: "/expense",
                params: { 
                  ...(({ user_id, creation_date, ...rest }) => rest)(expenseInfo)
                },
              });

              handleClose();
            }}
          >
            <Text color="white">Alterar informações</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};