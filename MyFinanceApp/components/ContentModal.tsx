import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter, Router } from "expo-router";
import { Portal, Box, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Button, AlertDialogFooter, Text, VStack } from "@gluestack-ui/themed";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { deleteExpense } from "@/api/resolvers/expenses/deleteExpense";
import { Expense } from "@/api/types";

export type ContentModalState = {
  isOpen: boolean;
  expense?: Expense;
};

export type ContentModalProps = {
  setModalState: Dispatch<SetStateAction<ContentModalState>>;
  modalState: ContentModalState;
  token: string;
};

type ConfirmationDeleteModalProps = {
  expenseId: string;
  token: string;
  router: Router;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function ConfirmationDeleteModal({ open, setOpen, expenseId, token, router }: ConfirmationDeleteModalProps) {
  const cancelRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
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

    setLoading(false);

    router.push("/(tabs)/expenses");
  };

  return (
    <AlertDialog
      isOpen={open}
      onClose={() => setOpen(false)}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text sx={{ fontFamily: "Poppins_500Medium", fontSize: 20 }}>
            Confirmação
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
            <>
              <Text>Tem certeza que deseja deletar?</Text>

              {error.length > 0 && (
                <Text sx={{ color: "$red600", marginTop: "$2" }}>{error}</Text>
              )}
            </>
          )}
        </AlertDialogBody>

        <AlertDialogFooter
          sx={{ justifyContent: "space-between" }}
        >
          <Button
            backgroundColor="red"
            ref={cancelRef}
            sx={{ width: "45%" }}
            onPress={() => setOpen(false)}
          >
            <Text color="white">Cancelar</Text>
          </Button>

          <Button
            sx={{ width: "45%" }}
            isDisabled={!!error.length}
            onPress={handleDelete}
          >
            <Text color="white">Confirmar</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ContentModal({ modalState, setModalState, token }: ContentModalProps) {
  const router= useRouter();

  if (!modalState.isOpen) return null;
  if (!modalState.expense) return null;

  const expenseInfo: Expense = modalState.expense;

  const cancelRef = useRef(null);

  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
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

          <AlertDialogFooter sx={{ flexDirection: "column", gap: "$2" }}>
            <Button
              sx={{
                flex: 1,
                w: "$full",
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

            <Button
              sx={{
                flex: 1,
                w: "$full",
                backgroundColor: "red", 
                ":active": { opacity: "$50" },
                // sombra iOS
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08, // bem suave
                shadowRadius: 6,

                // sombra Android
                elevation: 3,
              }}
            >
              <Text color="white">Deletar Gasto</Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
      <Portal>
        <ConfirmationDeleteModal 
          open={modal} setOpen={setModal}
          expenseId={expenseInfo.id} token={token} router={router}
        />
      </Portal>
    </>
  );
};