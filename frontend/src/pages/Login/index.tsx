import { useState } from "react";
import { service } from "../../api/service";
import { useAuth } from "../../context/auth/useAuth";
import { axiosInstance } from "../../api/instance";

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const {login} = useAuth()
  async function handleRegister (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(password,email)
    await login( email, password)
  }
    return (
    <section className="flex items-center justify-center min-h-screen bg-background px-4">
  <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">

    {/* Lado esquerdo (agora com o estilo do lado direito) */}
    <div className="w-full md:w-1/2 bg-support p-8">
      <h2 className="text-xl font-bold text-center text-secondary">
        Entrar na conta
      </h2>
      <p className="text-sm text-center text-secondary mb-6">
        Preencha o formulário
      </p>
      <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
        <div>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-background text-texto-hover placeholder-placeholder rounded-md shadow-md focus:outline-none"
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
            className="w-full px-4 py-2 bg-background text-texto-hover placeholder-placeholder rounded-md shadow-md focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-texto py-2 rounded-full font-bold hover:bg-secondary-hover transition"
        >
          Entrar
        </button>
      </form>
    </div>

    {/* Lado direito (agora com o estilo do lado esquerdo) */}
    <div className="w-full md:w-1/2 bg-secondary text-texto flex flex-col items-center justify-center p-8">
      <div className="mb-6 text-center">
        <div className="text-2xl font-bold mb-2">Hackathon</div>
        <p className="text-lg font-semibold">Seja bem-vindo!</p>
        <p>Acesse crie sua conta agora mesmo.</p>
      </div>
      <button className="border border-background px-6 py-2 rounded-full font-bold hover:bg-background hover:text-secondary-hover transition">
        Criar conta
      </button>
      <a href="#" className="mt-4 text-sm underline">
        Esqueci minha senha
      </a>
    </div>

  </div>
</section>
  );
}
