
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

export type { User, AuthContextType };