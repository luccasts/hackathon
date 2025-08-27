import { useState } from "react";
import { service } from "../api/service";

// Lista de perguntas
const questions = [
  "Seu filho gosta de brincar de esconde-esconde (sumir e reaparecer)?",
  "Seu filho aponta para mostrar interesse em algo?",
  "Seu filho responde quando é chamado pelo nome?",
  "Seu filho gosta de brincar com outros?",
  "Seu filho prefere brincar sozinho ou de forma diferente dos outros?",
  "Seu filho usa brinquedos do jeito esperado (por exemplo, empurrar um carrinho)?",
  "Seu filho imita o que você faz?",
  "Seu filho gosta de olhar nos seus olhos quando você está conversando com ele?",
  "Seu filho se incomoda com barulhos altos?",
  "Seu filho gosta de brincar com bonecos ou com brinquedos que representam pessoas?",
  "Seu filho gosta de jogar jogos simples com regras?",
  "Seu filho gosta de ouvir histórias ou músicas?",
  "Seu filho tem dificuldade para entender quando você fala com ele?",
  "Seu filho repete palavras ou frases que ouve (ecolalia)?",
  "Seu filho prefere objetos a pessoas?",
  "Seu filho reage quando está triste ou com dor?",
  "Seu filho demonstra afeto físico (abraços, beijos)?",
  "Seu filho tem dificuldade para se adaptar a novas pessoas ou lugares?",
  "Seu filho responde com um sorriso quando você sorri para ele?",
  "Seu filho se interessa por brinquedos que têm luzes ou sons?",
];

export default function ChildScreeningForm() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null),
  );
  const [finalizado, setFinalizado] = useState(false);

  function handleResposta(valor: boolean) {
    const novasRespostas = [...answers];
    novasRespostas[index] = valor;
    setAnswers(novasRespostas);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinalizado(true);
    }
  }

  function classificarRisco(): "baixo" | "médio" | "alto" {
    const respostasNegativas = answers.filter((r) => r === false).length;
    if (respostasNegativas >= 8) return "alto";
    if (respostasNegativas >= 3) return "médio";
    return "baixo";
  }

  async function enviarResultado() {
    console.log(answers);
    try {
      await service.postChildScreening(answers);
    } catch (err) {
      console.error("Erro ao enviar resultado:", err);
    }
  }

  if (!started) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white text-black shadow rounded flex flex-col">
        <h1 className="text-2xl font-bold mb-4">
          Triagem Inicial - M-CHAT-R/F
        </h1>
        <p className="mb-4">
          Este questionário tem como objetivo ajudar a identificar sinais
          precoces do espectro autista em crianças. Ele não fornece diagnóstico,
          mas pode indicar a necessidade de procurar um profissional.
        </p>
        <p className="mb-6 text-sm text-gray-600">
          Indicado para crianças de 16 a 30 meses. Responda com base no
          comportamento típico da criança.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover cursor-pointer"
        >
          Iniciar Questionário
        </button>
      </div>
    );
  }

  if (finalizado) {
    const risco = classificarRisco();
    let mensagemFinal = "";

    if (risco === "baixo") {
      mensagemFinal =
        "Os resultados não indicam sinais preocupantes no momento. Continue acompanhando o desenvolvimento da criança.";
    } else if (risco === "médio") {
      mensagemFinal =
        "Foram observadas algumas respostas que podem merecer atenção. Recomendamos conversar com um profissional para uma avaliação mais detalhada.";
    } else {
      mensagemFinal =
        "Os resultados indicam um risco elevado de sinais relacionados ao espectro autista. É fortemente recomendado buscar um profissional especializado.";
    }

    enviarResultado();

    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded flex flex-col">
        <h2 className="text-xl font-bold mb-4">Resultado da Triagem</h2>
        <p className="mb-2">
          <strong>Classificação:</strong> Risco {risco.toUpperCase()}
        </p>
        <p>{mensagemFinal}</p>

        <div className="mx-auto p-5 w-full flex justify-center">
          <button
            onClick={() => {
              setIndex(0);
              setAnswers(Array(questions.length).fill(null));
              setFinalizado(false);
              setStarted(false);
            }}
            className="w-full sm:w-auto  font-semibold bg-blue-600 text-white px-12 py-2 rounded hover:bg-blue-700 transition"
          >
            Refazer Teste
          </button>
        </div>
        <div className="p-4 mx-auto text-center">
          <b>
            Fonte oficial do M-CHAT-R/F:{" "}
            <a
              className="text-black hover:caret-emerald-50"
              target="_blank"
              href="https://mchatscreen.com"
            >
              https://mchatscreen.com
            </a>
          </b>
        </div>
      </div>
    );
  }

  return (
    <div className="md:min-w-xl sm:max-w-xl mx-auto p-6 bg-background shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        Pergunta {index + 1} de {questions.length}
      </h2>
      <p className="mb-6">{questions[index]}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={() => handleResposta(true)}
            className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover cursor-pointer"
            aria-label="Responder Sim"
          >
            Sim
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={() => handleResposta(false)}
            className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover cursor-pointer"
            aria-label="Responder Não"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
