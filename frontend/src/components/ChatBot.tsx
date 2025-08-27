import { useEffect, useState } from "react";
import { service } from "../api/service";

type Mensagem = {
  type: "user" | "ia";
  text: string;
};

interface ChatBotProps {
  initialMessage?: string;
}

const videosRecomendados = [
  {
    titulo: "Sinais de autismo em crianças",
    url: "https://youtu.be/9EbqqBhJXyI",
  },
  {
    titulo: "Entenda o TEA",
    url: "https://youtu.be/Ve6EZ4PejWU",
  },
  {
    titulo: "Como lidar com o autismo na infância",
    url: "https://youtu.be/D4StEQbBeEc",
  },
];

const confirmarSuspeita = (texto: string) => {
  const t = texto.toLowerCase();
  return (
    t.includes("suspeita de tea") ||
    t.includes("suspeita de autismo") ||
    t.includes("transtorno do espectro autista") ||
    t.includes("indícios de autismo") ||
    t.includes("pode estar relacionado ao tea")
  );
};

export default function ChatBot({ initialMessage }: ChatBotProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Mensagem[]>([]);
  const [mostrarVideos, setMostrarVideos] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setHistory((prev) => [...prev, { type: "user", text }]);
    setMostrarVideos(false);

    try {
      const res = await service.postMessage(text);
      const resposta =
        res?.data.answer ||
        "Não consegui entender muito bem. Tente reformular sua pergunta.";

      setHistory((prev) => [...prev, { type: "ia", text: resposta }]);
      setMostrarVideos(confirmarSuspeita(resposta));
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
    <div className="max-w-4xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 border rounded-xl shadow-md font-sans border-primary bg-support">
      <h2 className="text-center text-2xl font-semibold mb-6 text-primary">
        Assistente Virtual
      </h2>

      <div className="mb-4 h-120 overflow-y-auto rounded p-4 flex flex-col gap-3 bg-background border border-primary">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] p-3 rounded-lg text-sm ${
              msg.type === "user"
                ? "self-end bg-primary text-text"
                : "self-start bg-support text-primary"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <p className="text-sm italic text-[var(--color-primary-hover)]">
            Carregando resposta...
          </p>
        )}
      </div>

      {mostrarVideos && (
        <div>
          <h3>Vídeos recomendados:</h3>
          {videosRecomendados.map((video, index) => (
            <div key={index}>
              <a href={video.url} target="_blank" rel="noreferrer">
                {video.titulo}
              </a>
            </div>
          ))}
        </div>
      )}

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
          disabled={loading}
          className="flex-1 rounded px-4 py-2 focus:outline-none border border-primary text-[var(--color-primary-hover)] bg-support"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded text-white cursor-pointer disabled:cursor-not-allowed bg-primary"
          style={{
            opacity: loading ? 0.6 : 1, // só esse continua inline porque depende de JS
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
