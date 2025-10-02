import { Params } from "@/app/(tabs)/expenses";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, VStack, AlertDialogFooter, Input, InputField, HStack } from "@gluestack-ui/themed";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DateInput, { DateInputHandle } from "./DateInput";

type FilterModalProps = {
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FilterModal({ params: paramsFinal, setParams: setParamsFinal, open, setOpen }: FilterModalProps) {
  if (!open) return null;

  const cancelRef = useRef(null);
  const todayRef = useRef(new Date());

  const [params, setParams] = useState(paramsFinal);
  const [disableRange, setDisableRange] = useState(false);
  const [disableExpense, setDisableExpense] = useState(false);
  const [error, setError] = useState("");

  const expenseRef = useRef<DateInputHandle>(null);
  const startRef = useRef<DateInputHandle>(null);
  const endRef = useRef<DateInputHandle>(null);

  const handleDisableRange = (date: Date | null) => {
    if (date) {
      // escolheu data única → limpar range e desabilitar
      startRef.current?.clear();
      endRef.current?.clear();
      setDisableRange(true);
    } else {
      setDisableRange(false);
    }
  }

  const handleDisableExpense = (date: Date | null) => {
    if (date) {
      // escolheu data única → limpar range e desabilitar
      expenseRef.current?.clear();
      setDisableExpense(true);
    } else {
      setDisableExpense(false);
    }
  }

  const handleExpense = (date: Date | null) => {
    setParams(prev => ({ ...prev, expense_date: date ? date.toISOString() : undefined }));
    handleDisableRange(date);
    setError("");
  }

  const handleStart = (date: Date | null) => {
    setParams(prev => ({ ...prev, start_date: date ? date.toISOString() : undefined }));
    handleDisableExpense(date);
    setError("");
  }

  const handleEnd = (date: Date | null) => {
    setParams(prev => ({ ...prev, end_date: date ? date.toISOString() : undefined }));
    handleDisableExpense(date);
    setError("");
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

              <VStack sx={{ gap: "$1", ...(disableExpense ? { opacity: "$50" } : {}) }}>
                <Text>Data do gasto</Text>

                <DateInput 
                  ref={expenseRef}
                  handle={handleExpense}
                  initialValue={params.expense_date ? new Date(params.expense_date) : null}
                  maxDate={todayRef.current}
                  allowClear
                />
              </VStack>

              <VStack sx={{ gap: "$1", ...(disableRange ? { opacity: "$50" } : {}) }}>
                <Text>Data inicial</Text>

                <DateInput 
                  ref={startRef}
                  handle={handleStart}
                  initialValue={params.start_date ? new Date(params.start_date) : null}
                  maxDate={todayRef.current}
                  allowClear
                />
              </VStack>

              <VStack sx={{ gap: "$1", ...(disableRange ? { opacity: "$50" } : {}) }}>
                <Text>Data final</Text>

                <DateInput 
                  ref={endRef}
                  handle={handleEnd}
                  initialValue={params.end_date ? new Date(params.end_date) : null}
                  maxDate={todayRef.current}
                  allowClear
                />
              </VStack>

              {error.length > 0 && (
                <Text sx={{ color: "$red600" }}>{error}</Text>
              )}
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
                  if (params.start_date || params.end_date) {
                    if (!params.start_date) {
                      setError("Preencha a data inicial");
                      return;
                    }

                    if (!params.end_date) {
                      setError("Preencha a data final");
                      return;
                    }
                  } 
                  
                  const cleanedParams: Params = Object.fromEntries(
                    Object.entries(params).filter(([__, value]) => (value !== undefined && (value as string).length))
                  );

                  setParamsFinal(cleanedParams);

                  handleClose();
                }}
              >
                <Text color="white">Aplicar filtros</Text>
              </Button>
            </VStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};