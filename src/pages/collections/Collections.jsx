import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import { useLang } from "../../context/LanguageContext";
import scss from "./Collections.module.scss";

const Collections = () => {
  const navigate = useNavigate();
  const { product } = useProduct();
  const { t, lang } = useLang();

  // filter, show all products
  const [activeFilter, setActiveFilter] = useState("all");

  // filter button
  const filters = [
    { key: "all", label_en: "All", label_ru: "Все" },
    { key: "abayas", label_en: "Abayas", label_ru: "Абайи" },
    { key: "dresses", label_en: "Dresses", label_ru: "Платья" },
    { key: "hijabs", label_en: "Hijabs", label_ru: "Платки" },
  ];

  // filter products
  const filteredProducts =
    activeFilter === "all"
      ? product
      : product.filter((item) => item.category === activeFilter);

  return (
    <div className={scss.collections}>
      {/* title */}
      <section className={scss.hero}>
        <p className={scss.label}>ARUU</p>
        <h1 className={scss.title}>{t.collections}</h1>
        <div className={scss.line}></div>
        <p className={scss.subtitle}>
          {lang === "ru"
            ? "Скромная роскошь · Носи свой свет"
            : "Modest Luxury · Wear your light"}
        </p>
      </section>

      {/* filters */}
      <div className={scss.filters}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`${scss.filterBtn} ${activeFilter === filter.key ? scss.filterActive : ""}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {lang === "ru" ? filter.label_ru : filter.label_en}
          </button>
        ))}
      </div>

      {/* quantity products */}
      <p className={scss.count}>
        {filteredProducts.length} {lang === "ru" ? "товаров" : "items"}
      </p>

      {/* products */}
      {filteredProducts.length === 0 ? (
        <div className={scss.empty}>
          <p>{lang === "ru" ? "Пока нет товаров" : "No products yet"}</p>
        </div>
      ) : (
        <div className={scss.grid}>
          {filteredProducts.map((item, index) => (
            <div
              key={item._id || index}
              className={scss.card}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              {/* photo */}
              <div className={scss.imgWrap}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={scss.img} />
                ) : (
                  <div className={scss.placeholder}>
                    <span>ARUU</span>
                  </div>
                )}

                {/* Hover button */}
                <div className={scss.hoverBtn}>
                  <span>{lang === "ru" ? "Смотреть" : "View"}</span>
                </div>
              </div>

              {/* info */}
              <div className={scss.info}>
                <p className={scss.category}>
                  {item.category === "abayas" &&
                    (lang === "ru" ? "АБАЙИ" : "ABAYAS")}
                  {item.category === "dresses" &&
                    (lang === "ru" ? "ПЛАТЬЯ" : "DRESSES")}
                  {item.category === "hijabs" &&
                    (lang === "ru" ? "ПЛАТКИ" : "HIJABS")}
                </p>
                <p className={scss.name}>{item.name}</p>
                <p className={scss.price}>
                  {item.price} {lang === "ru" ? "сом" : "som"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
