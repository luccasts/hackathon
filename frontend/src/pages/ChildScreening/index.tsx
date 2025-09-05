import ChildScreeningForm from "../../components/ChildScreeningForm";
import { useAuth } from "../../context/auth/useAuth";
export default function ChildScreeningPage() {
  const { authenticatedUser } = useAuth();

  if (authenticatedUser.user) {
    return <ChildScreeningForm />;
  }
}
