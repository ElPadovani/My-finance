import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useRouter } from "expo-router";
import { Box, VStack, Text, Input, InputField, Button, ButtonText, 
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter, } from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/context/AuthContext";
import login from "@/api/resolvers/user/login";

type ChangePassModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handle: () => void;
}

function ChangePassModal({ open, setOpen, handle }: ChangePassModalProps) {
  const cancelRef = useRef(null);

  const [error, setError] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const handleChange = () => {};

  return (
    <AlertDialog
      isOpen={open}
      onClose={() => setOpen(false)}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text fontWeight="$bold" fontSize="$lg">
            Confirmação
          </Text>
          <AlertDialogCloseButton />
        </AlertDialogHeader>

        <AlertDialogBody>
          <Text>Tem certeza que deseja mudar sua senha?</Text>

          <Input>
            <InputField 
              placeholder="Senha nova" 
              onChangeText={(text) => { 
                setError("");
                setNewPwd(text)
              }}
            />
          </Input>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            action="secondary"
            ref={cancelRef}
            mr="$3"
            onPress={() => setOpen(false)}
          >
            <Text>Cancelar</Text>
          </Button>
          <Button action="primary" onPress={handleChange}>
            <Text color="white">Confirmar</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Config() {
  const router = useRouter();

  const { user } = useAuth();

  if (!user) {
    router.replace("/");

    return;
  };
  
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <AntDesign name="loading" size={24} color="black" />
      </Box>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS sobe com padding, Android ajusta altura
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // ajuste se tiver header
    >

      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <VStack sx={{ gap: "$4", width: "100%", maxWidth: 360 }}>
          <Text sx={{ fontSize: 18, fontWeight: "700" }}>Informações do usuário:</Text>

          <Input>
            <InputField 
              placeholder="Nome" 
              value={userInfo.name}
              onChangeText={(text) => { 
                setError("");
                setUserInfo((prev) => ({ ...prev, name: text }))
              }}
            />
          </Input>

          <Input>
            <InputField 
              placeholder="Email" 
              value={userInfo.email}
              keyboardType="email-address"
              onChangeText={(text) => { 
                setError("");
                setUserInfo((prev) => ({ ...prev, email: text }))
              }}
            />
          </Input>

          <Button 
            disabled={!!error.length}
            // onPress={() => handleLogin(userParams.email, userParams.password)}
          >
            <ButtonText>Alterar Informações</ButtonText>
          </Button>

        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}