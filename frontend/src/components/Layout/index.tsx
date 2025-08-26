import { Outlet } from "react-router";
import NavBar from "../NavBar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <Outlet />
    </div>
  );
}
