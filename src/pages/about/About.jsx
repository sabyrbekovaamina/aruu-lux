import { useNavigate } from "react-router-dom";
import scss from "./About.module.scss";
import { useLang } from "../../context/LanguageContext";
import about from "../../assets/images/categories/aruu-no-text-version-Picsart-AiImageEnhancer.png";

const About = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className={scss.about}>
      {/* Hero */}
      <section className={scss.hero}>
        <div className={scss.heroContent}>
          <p className={scss.label}>{t.aboutHeroLabel}</p>
          <h1 className={scss.title}>{t.aboutHeroTitle}</h1>
          <div className={scss.line}></div>
          <p className={scss.subtitle}>{t.aboutHeroSubtitle}</p>
        </div>
      </section>

      {/* story */}
      <section className={scss.story}>
        <div className={scss.storyText}>
          <p className={scss.storyLabel}>{t.aboutBeginLabel}</p>
          <h2 className={scss.storyTitle}>{t.aboutBeginTitle}</h2>
          <p className={scss.storyBody}>{t.aboutBeginText1}</p>
          <p className={scss.storyBody}>{t.aboutBeginText2}</p>
        </div>
        <div className={scss.storyImage}>
          <div className={scss.imagePlaceholder}>
            <img src={about} alt="ARUU" />
          </div>
        </div>
      </section>

      <section className={scss.philosophy}>
        <p className={scss.philosophyLabel}>{t.aboutPhilLabel}</p>
        <h2 className={scss.philosophyQuote}>{t.aboutPhilQuote}</h2>
        <p className={scss.philosophyText}>{t.aboutPhilText}</p>
      </section>

      {/* values */}
      <section className={scss.values}>
        <p className={scss.valuesLabel}>{t.aboutValLabel}</p>
        <div className={scss.valuesGrid}>
          <div className={scss.valueCard}>
            <p className={scss.valueNum}>01</p>
            <h3 className={scss.valueName}>{t.val1Name}</h3>
            <p className={scss.valueText}>{t.val1Text}</p>
          </div>
          <div className={scss.valueCard}>
            <p className={scss.valueNum}>02</p>
            <h3 className={scss.valueName}>{t.val2Name}</h3>
            <p className={scss.valueText}>{t.val2Text}</p>
          </div>
          <div className={scss.valueCard}>
            <p className={scss.valueNum}>03</p>
            <h3 className={scss.valueName}>{t.val3Name}</h3>
            <p className={scss.valueText}>{t.val3Text}</p>
          </div>
        </div>
      </section>

      <section className={scss.cta}>
        <h2 className={scss.ctaTitle}>{t.ctaTitle}</h2>
        <button
          className={scss.ctaBtn}
          onClick={() => navigate("/collections")}
        >
          {t.ctaBtn}
        </button>
      </section>
    </div>
  );
};

export default About;
