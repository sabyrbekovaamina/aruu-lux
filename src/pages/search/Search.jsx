import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import { useLang } from "../../context/LanguageContext";
import scss from "./Search.module.scss";

const Search = () => {
  const navigate = useNavigate();
  const { product } = useProduct();
  const { lang } = useLang();

  const [query, setQuery] = useState("");

  const results = product.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const showResults = query.trim().length > 0;

  return (
    <div className={scss.search}>
      <section className={scss.hero}>
        <p className={scss.label}>ARUU</p>
        <h1 className={scss.title}>{lang === "ru" ? "Поиск" : "Search"}</h1>

        <div className={scss.inputWrap}>
          <input
            className={scss.input}
            type="text"
            placeholder={
              lang === "ru" ? "Введите название..." : "Search products..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className={scss.clearBtn} onClick={() => setQuery("")}>
              ×
            </button>
          )}
        </div>
      </section>

      <section className={scss.results}>
        {!showResults && (
          <p className={scss.hint}>
            {lang === "ru"
              ? "Начните вводить название товара"
              : "Start typing to search"}
          </p>
        )}

        {showResults && results.length === 0 && (
          <p className={scss.notFound}>
            {lang === "ru"
              ? `По запросу "${query}" ничего не найдено`
              : `No results for "${query}"`}
          </p>
        )}

        {showResults && results.length > 0 && (
          <>
            <p className={scss.count}>
              {results.length} {lang === "ru" ? "результатов" : "results"}
            </p>

            <div className={scss.grid}>
              {results.map((item) => (
                <div
                  key={item._id}
                  className={scss.card}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <div className={scss.imgWrap}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={scss.img}
                      />
                    ) : (
                      <div className={scss.placeholder}>
                        <span>ARUU</span>
                      </div>
                    )}
                  </div>

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
                    <p className={scss.price}>{item.price} som</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
