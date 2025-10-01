import { Params } from "@/app/(tabs)/expenses";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, VStack, AlertDialogFooter, Input, InputField } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import DateInput from "./DateInput";

type FilterModalProps = {
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FilterModal({ params: paramsFinal, setParams: setParamsFinal, open, setOpen }: FilterModalProps) {
  const router= useRouter();

  if (!open) return null;

  const cancelRef = useRef(null);
  const todayRef = useRef(new Date());

  const [params, setParams] = useState(paramsFinal);

  const handleExpense = (date: Date | null) => {
    if (!date) return;
    
    setParams(prev => ({ ...prev, expense_date: date ? date.toString() : undefined }));
  }

  const handleStart = (date: Date | null) => {
    if (!date) return;
    
    setParams(prev => ({ ...prev, start_date: date ? date.toString() : undefined }));
  }

  const handleEnd = (date: Date | null) => {
    if (!date) return;
    
    setParams(prev => ({ ...prev, end_date: date ? date.toString() : undefined }));
  }

  const handleClose = () => setOpen(false);

  return (
    <>
      <AlertDialog
        isOpen={open}
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
                <Text>Título</Text>

                <Input>
                  <InputField
                    placeholder="Titulo"
                    value={params.title}
                    onChangeText={(text) => {
                      setParams((prev) => ({ ...prev, title: text }))
                    }}
                  />
                </Input>
              </VStack>

              <VStack sx={{ gap: "$1" }}>
                <Text>Categoria</Text>

                <Input>
                  <InputField
                    placeholder="Categoria"
                    value={params.category}
                    onChangeText={(text) => {
                      setParams((prev) => ({ ...prev, category: text }))
                    }}
                  />
                </Input>
              </VStack>

              <VStack sx={{ gap: "$1" }}>
                <Text>Data do gasto</Text>

                <DateInput 
                  handle={}
                  initialValue={todayRef.current}
                  maxDate={todayRef.current}
                />
              </VStack>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <VStack sx={{ gap: "$2", w: "$full" }}>
              <Button
                sx={{
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
                  setP

                  handleClose();
                }}
              >
                <Text color="white">Alterar informações</Text>
              </Button>
            </VStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};