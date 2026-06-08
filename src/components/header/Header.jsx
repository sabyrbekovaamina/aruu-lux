import { NavLink } from "react-router-dom";
import scss from "./Header.module.scss";
import Search from "@mui/icons-material/Search";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Add from "@mui/icons-material/Add";
import { PersonOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

import { useLang } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { t, lang, toggleLang } = useLang();
  const { user, logout } = useAuth();

  const ADMIN_EMAIL = "sabyrbekovaamina108@gmail.com";

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={scss.header}>
      <div className="container">
        <div className={scss.header2}>
          {/* LOGO */}
          <div className={scss.logo}>
            <NavLink to="/home" onClick={closeMenu}>
              <h1>
                <span className={scss.A}>A</span>
                <span className={scss.RUU}>RUU</span>
              </h1>
            </NavLink>
          </div>

          <div className={scss.menu_icon}>
            {/* BURGER */}
            <button
              className={scss.burger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {/* MENU */}
            <div className={`${scss.menu} ${menuOpen ? scss.active : ""}`}>
              <nav className={scss.nav}>
                <NavLink to="/collections" onClick={closeMenu}>
                  <h5 className={lang === "ru" ? scss.navRu : scss.navEn}>
                    {t.collections}
                  </h5>
                </NavLink>

                <NavLink to="/about" onClick={closeMenu}>
                  <h5 className={lang === "ru" ? scss.navRu : scss.navEn}>
                    {t.about}
                  </h5>
                </NavLink>

                <NavLink to="/lookbook" onClick={closeMenu}>
                  <h5 className={lang === "ru" ? scss.navRu : scss.navEn}>
                    {t.lookbook}
                  </h5>
                </NavLink>

                <NavLink to="/contact" onClick={closeMenu}>
                  <h5 className={lang === "ru" ? scss.navRu : scss.navEn}>
                    {t.contact}
                  </h5>
                </NavLink>
              </nav>
            </div>
            <div className={scss.icons}>
              <NavLink to="/search" onClick={closeMenu}>
                <Search className={scss.icon} />
              </NavLink>

              <NavLink to="/basket" onClick={closeMenu}>
                <ShoppingBag className={scss.icon} />
              </NavLink>

              {user ? (
                <button
                  className={scss.logoutBtn}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <LogoutIcon className={scss.icon} />
                </button>
              ) : (
                <NavLink to="/login" onClick={closeMenu}>
                  <PersonOutlined className={scss.icon} />
                </NavLink>
              )}

              <button onClick={toggleLang} className={scss.langBtn}>
                {lang === "en" ? "RU" : "EN"}
              </button>

              {user && user.email === ADMIN_EMAIL && (
                <NavLink to="/add">
                  <Add className={scss.add} />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
