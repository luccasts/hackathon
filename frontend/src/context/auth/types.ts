import type { ReactNode } from "react"

export interface AuthContextType {
    authenticatedUser: AuthType;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode
}

type User = {
  id: number;
  name: string;
  email: string;
};
export type AuthType = {
  user: User | null;
  token: string | null;
};
