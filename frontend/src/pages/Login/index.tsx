import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { Link } from "react-router";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(email, password);
  }
  return (
    <section className="flex items-center justify-center  bg-background px-4 flex-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 bg-support p-8">
          <h2 className="text-xl font-bold text-center text-text">
            Entrar na conta
          </h2>
          <p className="text-sm text-center text-text mb-6">
            Preencha o formulário
          </p>
          <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
            <div>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-background text-text placeholder-placeholder rounded-md shadow-md focus:outline-none"
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
                className="w-full px-4 py-2 bg-background text-text placeholder-placeholder rounded-md shadow-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-support py-2 rounded-full font-bold hover:bg-primary-hover transition"
            >
              Entrar
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-primary text-support flex flex-col items-center justify-center p-8">
          <div className="mb-6 text-center">
            <div className="text-2xl font-bold mb-2">Compreender é Cuidar</div>
            <p className="text-lg font-semibold">Seja bem-vindo!</p>
            <p>Crie sua conta agora mesmo.</p>
          </div>
          <Link
            to={"/criar-conta"}
            className="border border-support px-6 py-2 rounded-full font-bold hover:bg-support-hover hover:text-primary-hover transition"
          >
            Criar conta
          </Link>
          {/* Featured soon
          <Link to={"/"} className="mt-4 text-sm underline">
            Esqueci minha senha
          </Link> */}
        </div>
      </div>
    </section>
  );
}
