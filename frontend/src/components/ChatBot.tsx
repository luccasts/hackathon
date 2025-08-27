import { useEffect, useState } from "react";
import { service } from "../api/service";

type Mensagem = {
  type: "user" | "ia";
  text: string;
};
interface ChatBotProps {
  initialMessage?: string;
}
export default function ChatBot({ initialMessage }: ChatBotProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Mensagem[]>([]);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setHistory((prev) => [...prev, { type: "user", text }]);

    try {
      const res = await service.postMessage(text);
      const resposta =
        res?.data.answer ||
        "Não consegui entender muito bem. Tente reformular sua pergunta.";

      setHistory((prev) => [...prev, { type: "ia", text: resposta }]);
    } catch (err) {
      console.error(err);
      const erroMsg =
        "Ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.";
      setHistory((prev) => [...prev, { type: "ia", text: erroMsg }]);
    }

    setLoading(false);
  };

  const sendQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div
      className="max-w-lg mx-auto mt-10 p-6 border rounded-md font-sans"
      style={{
        borderColor: "var(--color-primary)",
        backgroundColor: "var(--color-support)",
      }}
    >
      <h2
        className="text-center text-2xl font-semibold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        Assistente Virtual
      </h2>

      <div
        className="mb-4 h-64 overflow-y-auto rounded p-4 flex flex-col gap-3"
        style={{
          backgroundColor: "var(--color-background)",
          border: `1px solid var(--color-primary)`,
        }}
      >
        {history.map((msg, idx) => (
          <div
            key={idx}
            className="max-w-[75%] p-3 rounded-lg text-sm"
            style={{
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.type === "user"
                  ? "var(--color-primary)"
                  : "var(--color-support)",
              color:
                msg.type === "user"
                  ? "var(--color-texto)"
                  : "var(--color-primary)",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <p
            className="text-sm italic"
            style={{ color: "var(--color-primary-hover)" }}
          >
            Carregando resposta...
          </p>
        )}
      </div>

      <form
        className="flex gap-3"
        method="post"
        onSubmit={(e) => sendQuestion(e)}
      >
        <input
          required
          minLength={3}
          type="text"
          placeholder="Descreva o que está acontecendo com seu filho(a)..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded px-4 py-2 focus:outline-none"
          disabled={loading}
          style={{
            border: `1px solid var(--color-primary)`,
            color: "var(--color-primary-hover)",
            backgroundColor: "var(--color-support)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded text-white cursor-pointer disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-primary)",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
