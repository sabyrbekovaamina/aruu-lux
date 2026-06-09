import scss from "./Basket.module.scss";
import { useLang } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import { useEffect } from "react";

const Basket = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { order, readOrder, deleteOrder, changeCount, addCheck, clearOrder } =
    useProduct();

  useEffect(() => {
    readOrder();
  }, []);

  // total price
  const totalPrice = order.reduce((sum, item) => {
    return sum + Number(item.price) * (item.count || 1);
  }, 0);

  // Переход на оформление заказа
  // Копируем товары из order в check, потом переходим
  const handleCheckout = () => {
    // Копируем каждый товар в check
    order.forEach((item) => {
      addCheck({
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        size: item.size,
        color: item.color,
        count: item.count || 1,
      });
    });

    clearOrder();
    navigate("/checkout");
  };

  const getCategory = (category) => {
    if (category === "abayas") return lang === "ru" ? "АБАЙИ" : "ABAYAS";
    if (category === "dresses") return lang === "ru" ? "ПЛАТЬЯ" : "DRESSES";
    if (category === "hijabs") return lang === "ru" ? "ПЛАТКИ" : "HIJABS";
    return category;
  };

  if (order.length === 0) {
    return (
      <div className={scss.basket}>
        <section className={scss.hero}>
          <h1 className={scss.title}>{t.theme}</h1>
        </section>
        <div className={scss.empty}>
          <p className={scss.emptyTitle}>{t.empty}</p>
          <button
            className={scss.shopBtn}
            onClick={() => navigate("/collections")}
          >
            {t.continue}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.basket}>
      {/* title */}
      <section className={scss.hero}>
        <h1 className={scss.title}>{t.theme}</h1>
        <p className={scss.count}>
          {order.length} {t.items}
        </p>
      </section>

      <div className={scss.content}>
        {/* products */}
        <div className={scss.items}>
          {order.map((item) => (
            <div key={item._id} className={scss.item}>
              {/* photo */}
              <div className={scss.itemImg}>
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className={scss.noImg}>ARUU</div>
                )}
              </div>

              {/* info */}
              <div className={scss.itemInfo}>
                <div className={scss.iteminfo}>
                  <p className={scss.itemCategory}>
                    {getCategory(item.category)}
                  </p>
                  <p className={scss.itemName}>{item.name}</p>
                  {item.size && (
                    <p className={scss.itemMeta}>
                      {t.size}: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className={scss.itemMeta}>
                      {t.color}: {item.color}
                    </p>
                  )}
                </div>

                {/* quantity */}
                <div className={scss.counter}>
                  <p className={scss.itemPrice}>
                    {Number(item.price) * (item.count || 1)} {t.som}
                  </p>
                  <button onClick={() => changeCount(item._id, "dec")}>
                    −
                  </button>
                  <span>{item.count || 1}</span>
                  <button onClick={() => changeCount(item._id, "inc")}>
                    +
                  </button>
                </div>
              </div>

              <button
                className={scss.removeBtn}
                onClick={() => deleteOrder(item._id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* total */}
        <div className={scss.summary}>
          <p className={scss.summaryLabel}>{t.total}</p>
          <p className={scss.summaryTotal}>
            {totalPrice} {t.som}
          </p>

          <button className={scss.orderBtn} onClick={handleCheckout}>
            {t.order}
          </button>

          <button
            className={scss.continueBtn}
            onClick={() => navigate("/collections")}
          >
            {toolbar.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
