import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import scss from "./Hijabs.module.scss";
import { useLang } from "../../context/LanguageContext";

const Hijabs = () => {
  const { product } = useProduct();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const hijabs = product.filter((item) => item.category === "hijabs");
  return (
    <div className={scss.hijabs}>
      <div className={scss.header}>
        <p className={scss.label}>COLLECTION</p>
        <h1
          className={lang === "ru" ? scss.categoryNameRu : scss.categoryNameEn}
        >
          {t.hijabs}
        </h1>
      </div>

      {hijabs.length === 0 ? (
        <p className={scss.empty}>No products yet...</p>
      ) : (
        <div className={scss.grid}>
          {hijabs.map((item) => (
            <div
              key={item._id}
              className={scss.card}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <div className={scss.img}>
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className={scss.placeholder}>ARUU</div>
                )}
              </div>
              <p className={scss.category}>HIJABS</p>
              <p className={scss.name}>{item.name}</p>
              <p className={scss.price}>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hijabs;
