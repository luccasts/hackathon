import { useNavigate } from "react-router";
import ChildScreeningForm from "../../components/ChildScreeningForm";
import { useAuth } from "../../context/auth/useAuth";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ChildScreeningPage() {
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedUser?.user) {
      toast.error("Precisa estar logado para acessar a Triagem", {
        id: "auth-error",
      });
      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  return (
    <div className="flex-1 flex justify-center items-center">
      <ChildScreeningForm />
    </div>
  );
}
