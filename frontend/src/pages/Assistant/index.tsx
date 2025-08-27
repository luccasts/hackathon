import { useEffect, useState } from "react";
import ChatBot from "../../components/ChatBot";
import { useSearchParams } from "react-router";

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const pergunta = searchParams.get("pergunta") || "";

  const [initialMessage, setInitialMessage] = useState<string>("");

  useEffect(() => {
    if (pergunta) {
      setInitialMessage(pergunta);
    }
  }, [pergunta]);
  return (
    <main>
      <ChatBot initialMessage={initialMessage} />
    </main>
  );
}
