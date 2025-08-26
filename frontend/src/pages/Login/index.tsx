import { useState } from "react";
import { service } from "../../api/service";

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  async function handleRegister (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(password,email)
    await service.loginUser(email,password)
  }
    return (
    <div>
      Login Page
      <form action="" onSubmit={(e) => handleRegister(e)}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input minLength={8} required onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
        </div>
        <button type="submit">
            Entrar
        </button>
      </form>
    </div>
  );
}
