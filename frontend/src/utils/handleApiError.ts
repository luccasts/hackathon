import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiError(error: AxiosError | unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message || "Erro desconhecido.";
    console.error(error)
    switch (status) {
      case 400:
        toast.error(`Erro de validação: ${message}`);
        break;
      case 401:
        toast.error("Não autorizado.");
        break;
      case 403:
        toast.error("Acesso negado.");
        break;
      case 409:
        toast.error("Usuário já existe.");
        break;
      case 500:
        toast.error("Erro interno do servidor.");
        break;
      default:
        toast.error(`Erro: ${message}`);
    }
  } else {
    toast.error("Erro inesperado ao comunicar com o servidor.");
  }
}
