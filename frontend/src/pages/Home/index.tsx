// import children from "../../assets/hug-children.png";
// import { Search, Video, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";
import hero from "../../assets/hero.png";
export default function Home() {
  const [value, setValue] = useState("");
  const { authenticatedUser } = useAuth();
  console.log("user", authenticatedUser);
  const navigate = useNavigate();
  function sendAssistant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim() !== "") {
      navigate(`/assistente?pergunta=${encodeURIComponent(value)}`);
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 bg-background-hover px-6 flex items-center">
          <img
            src={hero}
            alt="Um adulto conversando com uma criança"
            width={600}
            className="rounded-2xl"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-text">
              Entenda melhor o comportamento do seu filho
            </h1>
            <p className="mt-4 text-lg text-text max-w-2xl mx-auto">
              Receba orientações confiáveis e conteúdos personalizados com base
              nas suas dúvidas.
            </p>

            <form
              className="mt-6 flex justify-center"
              onSubmit={(e) => sendAssistant(e)}
            >
              <input
                type="text"
                className="p-3 w-80 md:w-96 border-border-black border rounded-l-lg placeholder:text-placeholder text-text"
                placeholder="Digite uma palavra-chave: atraso na fala, agressividade..."
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-support px-6 rounded-r"
              >
                Buscar conteúdos
              </button>
            </form>
          </div>
        </section>

        <section id="como-funciona" className="py-20 text-center px-6">
          <h2 className="text-3xl text-text font-bold mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Passo 1 */}
            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                {/* <Search size={40} /> */}
              </div>
              <p className="text-text">
                Você digita uma dúvida ou comportamento da criança.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                {/* <Video size={40} /> */}
              </div>
              <p className="text-text">
                O sistema busca vídeos e conteúdos explicativos confiáveis.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="p-6  rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                {/* <UserPlus size={40} /> */}
              </div>
              <p className="text-text">
                Se quiser, pode se cadastrar para um teste mais completo <br />
                (sem diagnóstico).
              </p>
            </div>
          </div>

          <button className="mt-10 bg-primary hover:bg-primary-hover text-support px-6 py-3 rounded-lg">
            Saiba mais sobre o processo
          </button>
        </section>

        <section className="py-20 bg-background-hover text-center px-6">
          <h2 className="text-3xl text-text font-bold mb-12">
            Destaques dos Conteúdos
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 border rounded-xl shadow-sm bg-background hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-text">
                Atraso na fala: quando se preocupar?
              </h3>
            </div>
            <div className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-text">
                Como lidar com birras frequentes
              </h3>
            </div>
            <div className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-text">
                Dificuldade de interação: o que observar?
              </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
