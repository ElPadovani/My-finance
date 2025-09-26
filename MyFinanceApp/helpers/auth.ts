import * as SecureStore from "expo-secure-store";

// salvar token
export async function saveToken(token: string) {
  await SecureStore.setItemAsync("auth_token", token);
}

// pegar token
export async function getToken() {
  return await SecureStore.getItemAsync("auth_token");
}

// remover token
export async function removeToken() {
  await SecureStore.deleteItemAsync("auth_token");
}

// salvar user
export async function saveUser(user: string) {
  await SecureStore.setItemAsync("auth_user", user);
}

// pegar user
export async function getUser() {
  return await SecureStore.getItemAsync("auth_user");
}

// remover user
export async function removeUser() {
  await SecureStore.deleteItemAsync("auth_user");
}