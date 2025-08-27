import { useState } from "react";
import { Link } from "react-router";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    
  return (
    <header className="bg-menu">
      <nav className="container m-auto text-center text-support px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl"><Link to={"/"} onClick={() => setIsOpen(false)} 
        >Logo </Link></div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
        <div
          className={`flex-col md:flex-row md:flex p-2 md:space-y-0 md:space-x-6 absolute md:static left-0 top-15 w-full md:w-auto bg-menu md:bg-transparent transition-all ${isOpen ? "flex" : "hidden"}`}
        >
          <hr className="text-support" />
          <Link to="/" onClick={() => setIsOpen(false)} 
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
            > Home </Link>
          <Link to="/criar-conta" onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          > Criar Contar </Link>
          <Link to="/entrar" onClick={() => setIsOpen(false)}
            className="block px-2 py-2 hover:bg-menu-hover md:hover:bg-menu-hover rounded-md"
          > Entrar </Link>
        </div>
      </nav>
    </header>
  );
}
