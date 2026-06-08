import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import scss from "./Dresses.module.scss";
import { useLang } from "../../context/LanguageContext";

const Dresses = () => {
  const { product } = useProduct();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const dresses = product.filter((item) => item.category === "dresses");
  return (
    <div className={scss.dresses}>
      <div className={scss.header}>
        <p className={scss.label}>COLLECTION</p>
        <h1
          className={lang === "ru" ? scss.categoryNameRu : scss.categoryNameEn}
        >
          {t.dresses}
        </h1>
      </div>

      {dresses.length === 0 ? (
        <p className={scss.empty}>No products yet...</p>
      ) : (
        <div className={scss.grid}>
          {dresses.map((item) => (
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
              <p className={scss.category}>DRESSES</p>
              <p className={scss.name}>{item.name}</p>
              <p className={scss.price}>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dresses;
