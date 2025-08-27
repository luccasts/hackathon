import { useState, useEffect, useMemo, useCallback } from "react";
import type { AuthType, AuthProviderProps } from "./types";
import { AuthContext } from "./auth";
import { useNavigate } from "react-router";
import { axiosPublic } from "../../api/axiosPublic";
import { service } from "../../api/service";
import { toast } from "sonner";
import { handleApiError } from "../../utils/handleApiError";
export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthType>({
    user: null,
    token: null,
  });

  useEffect(() => {
    async function loadUser() {
      const access = localStorage.getItem("access");

      if (access) {
        try {
          axiosPublic.defaults.headers.common["Authorization"] =
            `Bearer ${access}`;

          const userRes = await service.getUserData();
          setAuthenticatedUser({
            user: userRes?.data,
            token: access,
          });
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
          localStorage.clear();
          setAuthenticatedUser({ user: null, token: null });
        }
      }
    }
    loadUser();
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await service.loginUser(username, password);

        if (res?.data) {
          const { access, refresh } = res.data;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);

          axiosPublic.defaults.headers.common["Authorization"] =
            `Bearer ${access}`;
          const userRes = await service.getUserData();
          console.log(userRes, "userRes");
          setAuthenticatedUser({
            user: userRes?.data,
            token: access,
          });
          navigate("/");
        }
      } catch (error) {
        handleApiError(error);
        console.error("Erro no login: ", error);
      }
    },
    [navigate],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthenticatedUser({ user: null, token: null });
    navigate("/");
    toast.success("Usuário Deslogado");
  }, [setAuthenticatedUser, navigate]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      authenticatedUser,
    }),
    [login, authenticatedUser, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
