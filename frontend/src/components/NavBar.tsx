import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/white-logo.png";
import { useAuth } from "../context/auth/useAuth";
import { CiUser } from "react-icons/ci";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticatedUserOpen, setIsAuthenticatedUserOpen] = useState(false);
  const { authenticatedUser, logout } = useAuth();

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
          {authenticatedUser.user ? (
            <>
              <div className="hidden md:flex relative items-center">
                <CiUser
                  onClick={() =>
                    setIsAuthenticatedUserOpen(!isAuthenticatedUserOpen)
                  }
                  size={28}
                  className="cursor-pointer"
                />
                {isAuthenticatedUserOpen && (
                  <div className="absolute right-0 top-full w-56 rounded-md bg-primary shadow-lg">
                    <div className="flex flex-col p-2">
                      <Link
                        className="hover:bg-menu-hover rounded-md px-2 py-2"
                        to={"/perfil"}
                      >
                        Perfil
                      </Link>
                      <button
                        onClick={logout}
                        className="hover:bg-menu-hover rounded-md px-2 py-2 cursor-pointer"
                      >
                        Sair da conta
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile (<md)*/}
              <div className="flex flex-col md:hidden ">
                <Link
                  className="hover:bg-menu-hover rounded-md px-2 py-2 "
                  to={"/perfil"}
                  onClick={() => setIsOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="hover:bg-menu-hover rounded-md px-2 py-2 cursor-pointer"
                >
                  Sair da conta
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/entrar"
              onClick={() => setIsOpen(false)}
              className="border border-support px-6 py-2 rounded-full hover:bg-support-hover hover:text-primary-hover transition cursor-pointer"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
