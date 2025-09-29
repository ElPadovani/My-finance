import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Box, VStack, Text, Input, InputField, Button, ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/context/AuthContext";
import updateUser, { UpdateUserParams } from "@/api/resolvers/user/updateUser";
import { Ionicons } from "@expo/vector-icons";

type ChangePassModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handle: (userParams: Omit<UpdateUserParams, "userId">) => Promise<void>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

function ChangePassModal({ open, setOpen, handle, error, setError }: ChangePassModalProps) {
  const cancelRef = useRef(null);

  const [newPwd, setNewPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);

    await handle({ password: newPwd });

    setLoading(false);
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
          <Text fontWeight="$bold" fontSize="$lg">
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
              <Text>Tem certeza que deseja mudar sua senha?</Text>
    
              <Input sx={{ marginTop: "$4" }}>
                <InputField
                  placeholder="Senha nova"
                  onChangeText={(text) => {
                    setError("");
                    setNewPwd(text);
                  }}
                />
              </Input>

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
            isDisabled={!!error.length || !(!!newPwd.length)}
            onPress={handlePress}
          >
            <Text color="white">Confirmar</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Config() {
  const router = useRouter();

  const { user, saveLogin, token, loading: loginLoading } = useAuth();

  if (!user || !token) {
    router.replace("/");

    return;
  };

  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(loginLoading);

  const handleUpdate = async (userParams: Omit<UpdateUserParams, "userId">) => {
    const response = await updateUser({ userId: user.id, ...userParams });

    console.log(response);

    if (!response || response.error) {
      setError(response?.error || "Erro inesperado");
      return;
    }

    if (!response.data) {
      setError("Erro ao alterar informações");
      return;
    }

    await saveLogin(token, response.data);

    if (openModal) setOpenModal(false);
  };

  useEffect(() => {
    setLoading(loginLoading);
  }, [loginLoading]);

  if (loading) {
    return (
      <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center", p: "$5" }}>
        <AntDesign name="loading" size={24} color="black" />
      </Box>
    );
  }

  return (
    <>
      <ChangePassModal
        open={openModal}
        setOpen={setOpenModal}
        handle={handleUpdate}
        error={error}
        setError={setError}
      />

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

            {(!openModal && error.length > 0) && (
              <Text sx={{ color: "$red600", marginTop: "$2" }}>{error}</Text>
            )}

            <Button
              sx={{ backgroundColor: "#5e3f44ff", ":active": { opacity: "$50" } }}
              isDisabled={!!error.length}
              onPress={async () => {
                setLoading(true);
                await handleUpdate({ name: userInfo.name, email: userInfo.email });
                setLoading(false);
              }}
            >
              <ButtonText>Alterar Informações</ButtonText>
            </Button>

            <Button
              sx={{ backgroundColor: "#5e3f44ff", ":active": { opacity: "$50" } }}
              isDisabled={!!error.length}
              onPress={() => setOpenModal(true)}
            >
              <ButtonText>Trocar senha</ButtonText>
            </Button>

          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </>
  );
}