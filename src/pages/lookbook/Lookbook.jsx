import scss from "./Lookbook.module.scss";
import { useLang } from "../../context/LanguageContext";
import { useProduct } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

const Lookbook = () => {
  const { lang } = useLang();
  const { product } = useProduct();
  const navigate = useNavigate();

  // bring only lookbook photo from API
  const looks = product.filter((item) => item.category === "lookbook");

  return (
    <div className={scss.lookbook} onClick={() => navigate("/collections")}>
      <section className={scss.hero}>
        <p className={scss.label}>ARUU · 2026</p>
        <h1 className={scss.title}>Lookbook</h1>
        <div className={scss.line}></div>
        <p className={scss.subtitle}>
          {lang === "ru" ? "Образы которые вдохновляют" : "Looks that inspire"}
        </p>
      </section>

      {/* if dont have photo */}
      {looks.length === 0 ? (
        <div className={scss.empty}>
          <p>{lang === "ru" ? "Скоро появятся образы" : "Coming soon"}</p>
        </div>
      ) : (
        <div className={scss.grid}>
          {looks.map((item, index) => (
            <div
              key={item._id}
              // each second photo big — through index
              className={`${scss.item} ${index % 3 === 0 ? scss.large : scss.small}`}
            >
              <div className={scss.imgWrap}>
                {/* photo from API */}
                {item.image ? (
                  <img src={item.image} alt={item.name} className={scss.img} />
                ) : (
                  <div className={scss.placeholder}>
                    <span className={scss.placeholderText}>ARUU</span>
                  </div>
                )}

                {/* Overlay */}
                <div className={scss.overlay}>
                  <p className={scss.lookSubtitle}>ARUU</p>
                  <p className={scss.lookTitle}>{item.name}</p>
                  {item.description && (
                    <p className={scss.description}>{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <section className={scss.bottom}>
        <p className={scss.bottomLabel}>ARUU MODEST LUXURY</p>
        <h2 className={scss.bottomTitle}>
          {lang === "ru" ? '"Носи свой свет"' : '"Wear your light"'}
        </h2>
      </section>
    </div>
  );
};

export default Lookbook;
