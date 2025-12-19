import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username?: string;
  birthdate?: string;
  gender?: number;
  isPremium: boolean;
  phoneNumber?: number;
  pictureMediaPath?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Récupérer les données utilisateur depuis l'API
  const fetchUserData = async () => {
    const currentToken = localStorage.getItem("authToken");
    if (!currentToken) return;

    try {
      const response = await axios.get("/api/User/me", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Si l'erreur est 401, le token est invalide, on déconnecte
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout();
      }
    }
  };

  // Charger le token depuis localStorage au montage
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      // Récupérer les données utilisateur si un token existe
      fetchUserData();
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      logout,
      setUser,
      fetchUserData,
    }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
