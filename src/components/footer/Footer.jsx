import { NavLink } from "react-router-dom";
import scss from "./Footer.module.scss";
import { useLang } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className={scss.footer}>
      {/* Верхняя часть */}
      <div className={scss.top}>
        {/* Логотип */}
        <div className={scss.logoBlock}>
          <h2 className={scss.logo}>
            <span className={scss.A}>A</span>
            <span className={scss.RUU}>RUU</span>
          </h2>
          <p className={scss.tagline}>{t.footerTagline}</p>
          <p className={scss.desc}>{t.footerDesc}</p>
        </div>

        {/* Магазин */}
        <div className={scss.col}>
          <p className={scss.colTitle}>{t.footerShop}</p>
          <NavLink to="/abayas" className={scss.link}>
            Abayas
          </NavLink>
          <NavLink to="/dresses" className={scss.link}>
            Dresses
          </NavLink>
          <NavLink to="/hijabs" className={scss.link}>
            Hijabs
          </NavLink>
          <NavLink to="/collections" className={scss.link}>
            {t.footerAllCollections}
          </NavLink>
        </div>

        {/* Компания */}
        <div className={scss.col}>
          <p className={scss.colTitle}>{t.footerCompany}</p>
          <NavLink to="/about" className={scss.link}>
            {t.about}
          </NavLink>
          <NavLink to="/lookbook" className={scss.link}>
            {t.lookbook}
          </NavLink>
          <NavLink to="/contact" className={scss.link}>
            {t.contact}
          </NavLink>
        </div>

        {/* Контакты */}
        <div className={scss.col}>
          <p className={scss.colTitle}>{t.footerContact}</p>
          <p className={scss.contactText}>{t.footerLocation}</p>
          <p className={scss.contactText}>{t.footerEmail}</p>
          <p className={scss.contactText}>{t.footerPhone}</p>
          <p className={scss.contactText}>{t.footerHours}</p>

          <div className={scss.socials}>
            <p className={scss.socialsLabel}>{t.footerFollow}</p>
            <div className={scss.socialLinks}>
              <a href="#" className={scss.social}>
                IG
              </a>
              <a
                href="https://t.me/+_nTulqpUO0lhNGIy"
                target="_blank"
                rel="noreferrer"
                className={scss.social}
              >
                TG
              </a>
              <a
                href="https://wa.me/996704081006"
                target="_blank"
                rel="noreferrer"
                className={scss.social}
              >
                WA
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className={scss.bottom}>
        <p className={scss.copy}>{t.footerCopy}</p>
        <p className={scss.made}>{t.footerMade}</p>
      </div>
    </footer>
  );
};

export default Footer;
