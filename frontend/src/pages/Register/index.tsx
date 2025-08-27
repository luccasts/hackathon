import { useState } from "react";
import { service } from "../../api/service";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, email);
    await service.registerUser(username, email, password);
  }
  return (
    <section className="flex items-center justify-center  bg-background px-4 flex-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        {/* Lado esquerdo (Login) */}
        <div className="w-full md:w-1/2 bg-primary text-text flex flex-col items-center justify-center p-8">
          <div className="mb-6 text-center">
            <div className="text-2xl font-bold mb-2">Hackathon</div>
            <p className="text-lg font-semibold">Seja bem-vindo!</p>
            <p>Acesse sua conta agora mesmo.</p>
          </div>
          <button className="border border-support px-6 py-2 rounded-full font-bold hover:bg-support hover:text-text-hover transition">
            ENTRAR
          </button>
          <a href="#" className="mt-4 text-sm underline">
            Esqueci minha senha
          </a>
        </div>

        {/* Lado direito (Cadastro) */}
        <div className="w-full md:w-1/2 bg-support p-8">
          <h2 className="text-xl font-bold text-center text-text">
            Crie sua conta
          </h2>
          <p className="text-sm text-center text-text mb-6">
            Preencha o formulário
          </p>
          <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
            <div>
              <input
                minLength={2}
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="Nome"
                className="w-full px-4 py-2  bg-background text-text-hover placeholder-placeholder rounded-md shadow-md focus:outline-none"
              />
            </div>
            <div>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-background text-text-hover placeholder-placeholder rounded-md shadow-md focus:outline-none"
              />
            </div>
            <div>
              <input
                minLength={8}
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
                className="w-full px-4 py-2 bg-background text-text-hover placeholder-placeholder rounded-md shadow-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-text py-2 rounded-full font-bold hover:bg-secondary-hover transition"
            >
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
