// import children from "../../assets/hug-children.png";
// import { Search, Video, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";
import hero from "../../assets/hero.png";
import { FcSearch, FcVideoFile } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
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
      <div className="flex-1">
        <section className=" text-center py-20 bg-background-hover px-2">
          <div className="container flex flex-col sm:flex-row items-center gap-3 m-auto">
            <div className="flex-1">
              <img
                src={hero}
                alt="Um adulto conversando com uma criança"
                className="hidden sm:block w-full sm:w-[300px] md:w-[400px] lg:w-[440px] xl:w-[600px] rounded-[300px]"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-text">
                Entenda melhor o comportamento do seu filho
              </h1>
              <p className="mt-4 md:text-lg text-text max-w-2xl mx-auto sm:mx-0">
                Receba orientações confiáveis e conteúdos personalizados com
                base nas suas dúvidas.
              </p>

              <form
                className="mt-6 flex justify-center sm:justify-start items-center flex-col md:flex-row gap-2 md:gap-0"
                onSubmit={(e) => sendAssistant(e)}
              >
                <input
                  type="text"
                  className="p-3 w-full md:w-96 border border-primary rounded-md md:rounded-l-lg md:rounded-r-none placeholder:text-placeholder text-text h-12"
                  placeholder="Digite uma palavra-chave: atraso na fala, agressividade..."
                  onChange={(e) => setValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full md:w-fit md:h-12 bg-primary hover:bg-primary-hover text-support px-4 py-2 rounded-md md:rounded-r md:rounded-l-none text-center cursor-pointer"
                >
                  Buscar conteúdos
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20 text-center px-6">
          <h2 className="text-3xl text-text font-bold mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                <FcSearch className="size-10" />
              </div>
              <p className="text-text">
                Você digita uma dúvida ou comportamento da criança.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                <FcVideoFile className="size-10" />
              </div>
              <p className="text-text">
                O sistema busca vídeos e conteúdos explicativos confiáveis.
              </p>
            </div>

            <div className="p-6  rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4 text-primary">
                <CiUser className="size-10" />
              </div>
              <p className="text-text">
                Se quiser, pode se cadastrar para um teste mais completo <br />
                (sem diagnóstico).
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background-hover text-center px-6">
          <h2 className="text-3xl text-text font-bold mb-12">
            Destaques dos Conteúdos
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 border border-primary  rounded-xl shadow-sm bg-background hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-text">
                Atraso na fala: quando se preocupar?
              </h3>
            </div>
            <div className="p-6 border border-primary rounded-xl shadow-sm bg-white hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-text">
                Como lidar com birras frequentes
              </h3>
            </div>
            <div className="p-6 border border-primary rounded-xl shadow-sm bg-white hover:shadow-md transition">
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
