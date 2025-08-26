import Layout from "../components/Layout";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/criar-conta",
        element: <RegisterPage />,
      },
      
      {
        path: "/entrar",
        element: <LoginPage />,
      },
    ],
  },
];
