import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // se quiser validar expiração do JWT
import { User } from "@/api/types";
import { getToken, getUser, removeToken, removeUser, saveToken, saveUser } from "@/helpers/auth";
import { useRouter } from "expo-router";



type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  saveLogin: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider montado");

    (async () => {
      const savedToken = await getToken();
      const savedUser = await getUser();

      if (savedToken && savedUser) {
        // Se for JWT, valida expiração
        try {
          const decoded: any = jwtDecode(savedToken);
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp > now) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));

            router.replace("/(tabs)/expenses");
          } else {
            // Token expirado → limpar
            await removeToken();
            await removeUser();
          }
        } catch {
          // Token inválido → limpar
          await removeToken();
          await removeUser();
        }
      }

      setLoading(false);
    })();
  }, []);

  const saveLogin = async (token: string, user: User) => {
    await saveToken(token);
    await saveUser(JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  const logout = async () => {
    await removeToken();
    await removeUser()
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, saveLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};