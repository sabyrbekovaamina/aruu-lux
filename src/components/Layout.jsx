import Header from "./header/Header";
import Footer from "./footer/Footer";
import MainRoutes from "../routes/MainRoutes";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const isSplash = location.pathname === "/";

  return (
    <div>
      {!isSplash && <Header />}
      <MainRoutes />
      {!isSplash && <Footer />}
    </div>
  );
};

export default Layout;
