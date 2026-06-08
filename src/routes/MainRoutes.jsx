import { Route, Routes } from "react-router-dom";
import Splash from "../pages/splash/Splash";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Basket from "../pages/basket/Basket";
import Lookbook from "../pages/lookbook/Lookbook";
import Collections from "../pages/collections/Collections";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Add from "../pages/add/Add";
import Abayas from "../pages/abayas/Abayas";
import Hijabs from "../pages/hijabs/Hijabs";
import Dresses from "../pages/dresses/Dresses";
import Product from "../pages/product/Product";
import CheckOut from "../pages/check/CheckOut";
import Register from "../pages/signUp/Register";
import Login from "../pages/signUp/Login";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";

const MainRoutes = () => {
  const routes = [
    {
      link: "/",
      element: <Splash />,
    },
    {
      link: "/home",
      element: <Home />,
    },
    {
      link: "/collections",
      element: <Collections />,
    },
    {
      link: "/lookbook",
      element: <Lookbook />,
    },
    {
      link: "/about",
      element: <About />,
    },
    {
      link: "/contact",
      element: <Contact />,
    },
    {
      link: "/basket",
      element: <Basket />,
    },
    {
      link: "/search",
      element: <Search />,
    },
    {
      link: "/add",
      element: (
        <PrivateRoute>
          <Add />
        </PrivateRoute>
      ),
    },
    {
      link: "/abayas",
      element: <Abayas />,
    },
    {
      link: "/hijabs",
      element: <Hijabs />,
    },
    {
      link: "/dresses",
      element: <Dresses />,
    },
    {
      link: "/product/:id",
      element: <Product />,
    },
    {
      link: "/checkout",
      element: (
        <ProtectedRoute>
          <CheckOut />
        </ProtectedRoute>
      ),
    },
    {
      link: "/login",
      element: <Login />,
    },
    {
      link: "/register",
      element: <Register />,
    },
  ];
  return (
    <div>
      <Routes>
        {routes.map((item) => (
          <Route key={item.link} path={item.link} element={item.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
