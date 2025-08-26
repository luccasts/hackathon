import Home from "../pages/Home";
import RegisterPage from "../pages/Register";


export const  routes = [
    {
        path: "/",
        element: <Home/>
    }, {
        path: "/criar-conta",
        element: <RegisterPage/>
    }

]