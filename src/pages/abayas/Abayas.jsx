import { useProduct } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import scss from "./Abayas.module.scss";
import { useEffect } from "react";
import { useLang } from "../../context/LanguageContext";

const Abayas = () => {
  const { product, readProduct } = useProduct();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  useEffect(() => {
    readProduct();
  }, []);

  // only abaya!
  const abayas = product.filter((item) => item.category === "abayas");

  return (
    <div className={scss.abayas}>
      <div className={scss.header}>
        <p className={scss.label}>COLLECTION</p>
        <h1
          className={lang === "ru" ? scss.categoryNameRu : scss.categoryNameEn}
        >
          {t.abayas}
        </h1>
      </div>

      {abayas.length === 0 ? (
        <p className={scss.empty}>No products yet...</p>
      ) : (
        <div className={scss.grid}>
          {abayas.map((item) => (
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
              <p className={scss.category}>ABAYAS</p>
              <p className={scss.name}>{item.name}</p>
              <p className={scss.price}>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Abayas;
