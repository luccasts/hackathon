import { useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900">
        <nav className="container m-auto text-white px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl">Logo</div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
          <div
            className={`flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6 absolute md:static left-0 top-15 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all ${isOpen ? "flex" : "hidden"}`}>
            <Link to="/"className="block px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent">Nav</Link>
            <Link to="/"className="block px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent">Nav</Link>
            <Link to="/"className="block px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent">Nav</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
