
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

interface EditFormData {
  username?: string;
  birthdate?: string;
  gender?: number;
  phoneNumber?: string;
  password: string;
  passwordRepeated: string;
  pictureFile?: File;
}

interface FormErrors {
  username?: string;
  birthdate?: string;
  gender?: string;
  phoneNumber?: string;
  password?: string;
  passwordRepeated?: string;
  general?: string;
}

export type { User, AuthContextType, EditFormData, FormErrors };