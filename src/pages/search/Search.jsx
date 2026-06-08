import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import { useLang } from "../../context/LanguageContext";
import scss from "./Search.module.scss";

const Search = () => {
  const navigate = useNavigate();
  const { product } = useProduct();
  const { lang } = useLang();

  // Текст который вводит пользователь
  const [query, setQuery] = useState("");

  // Фильтруем товары по названию
  // .toLowerCase() — делаем всё маленькими буквами чтобы поиск не зависел от регистра
  // .includes() — проверяет есть ли введённый текст в названии товара
  const results = product.filter((item) =>
    item.category.toLowerCase().includes(query.toLowerCase()),
  );

  // Показываем результаты только если что-то введено
  const showResults = query.trim().length > 0;

  return (
    <div className={scss.search}>
      {/* Поле поиска */}
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
          {/* Кнопка очистки */}
          {query && (
            <button className={scss.clearBtn} onClick={() => setQuery("")}>
              ×
            </button>
          )}
        </div>
      </section>

      {/* Результаты */}
      <section className={scss.results}>
        {/* Ничего не введено */}
        {!showResults && (
          <p className={scss.hint}>
            {lang === "ru"
              ? "Начните вводить название товара"
              : "Start typing to search"}
          </p>
        )}

        {/* Введено но ничего не найдено */}
        {showResults && results.length === 0 && (
          <p className={scss.notFound}>
            {lang === "ru"
              ? `По запросу "${query}" ничего не найдено`
              : `No results for "${query}"`}
          </p>
        )}

        {/* Найденные товары */}
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
                  {/* Фото */}
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

                  {/* Инфо */}
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
