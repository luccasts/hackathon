import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/white-logo.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-menu">
      <nav className="container m-auto text-center text-support px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">
          <Link to={"/"} onClick={() => setIsOpen(false)}>
            <img className="h-14 w-auto" src={logo} alt="logo" />
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
        <div
          className={`flex-col md:flex-row md:flex p-2 md:space-y-0 md:space-x-6 absolute md:static left-0 top-15 w-full md:w-auto bg-menu md:bg-transparent transition-all ${isOpen ? "flex" : "hidden"}`}
        >
          <hr className="text-support" />
          <Link
            to="/assistente"
            onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          >
            Assistente
          </Link>
          <Link
            to="/triagem-infantil"
            onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          >
            Triagem
          </Link>
          <Link
            to="/criar-conta"
            onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          >
            Criar Conta
          </Link>
          <Link
            to="/entrar"
            onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
