import { useState } from "react";
import { service } from "../../api/service";

export default function RegisterPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  async function handleRegister (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(username,password,email)
    await service.registerUser(username,email,password)
  }
    return (
    <div>
      Regisiter
      <form action="" onSubmit={(e) => handleRegister(e)}>
        <div>
          <label htmlFor="username">Nome: </label>
          <input minLength={2} required onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input minLength={8} required onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
        </div>
        <button type="submit">
            Cadastrar
        </button>
      </form>
    </div>
  );
}
