import { Outlet } from "react-router";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
