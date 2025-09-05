import { useLocation, useNavigate } from "react-router";

import { toast } from "sonner";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "../context/auth/useAuth";

interface isLoginProps {
  children: ReactNode;
}
export default function ProtectedRoute({ children }: isLoginProps) {
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authenticatedUser?.user) {
      if (location.pathname === "/triagem-infantil") {
        toast.error("Precisa estar logado para acessar a triagem", {
          id: "auth-error-triagem",
        });
      } else {
        toast.error("Precisa estar logado para acessar a página de perfil", {
          id: "auth-error-perfil",
        });
      }

      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  return (
    <main className="flex justify-center items-center flex-1 ">{children}</main>
  );
}
