import { useEffect, useState } from "react";
import scss from "./CheckOut.module.scss";
import { useProduct } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLang } from "../../context/LanguageContext";

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

const CheckOut = () => {
  const { check, readCheck, clearCheck, deleteCheck } = useProduct();
  const navigate = useNavigate();
  const { t } = useLang();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    readCheck();
  }, []);

  // total price
  const total = check.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.count || 1);
  }, 0);

  // send order to Tg
  const sendOrder = async () => {
    // check
    if (!name || !address || !city || !phone || !email) {
      alert("Please fill in all fields");
      return;
    }

    if (check.length === 0) {
      alert("Your basket is empty");
      return;
    }

    setLoading(true);

    let message = "🛍 New Order — ARUU\n\n";
    message += `👤 Name: ${name}\n`;
    message += `📍 Address: ${address}, ${city}\n`;
    message += `📞 Phone: ${phone}\n`;
    message += `📧 Email: ${email}\n\n`;
    message += "🛒 Items:\n";

    check.forEach((item, i) => {
      message += `\n${i + 1}. ${item.name}\n`;
      message += `   Price: ${item.price} som × ${item.count || 1}\n`;
      if (item.size) message += `   Size: ${item.size}\n`;
      if (item.color) message += `   Color: ${item.color}\n`;
    });

    message += `\n💰 Total: ${total} som`;

    try {
      //to Tg
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
      });

      // clear
      await clearCheck();

      alert("Order placed successfully! 🤍");
      navigate("/home");
    } catch (error) {
      console.log("sendOrder error:", error);
      alert("Error sending order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.checkout}>
      {/* left side */}
      <div className={scss.form}>
        <p className={scss.label}>ARUU</p>
        <h1 className={scss.title}>{t.check}</h1>
        <div className={scss.line}></div>

        <div className={scss.field}>
          <label className={scss.fieldLabel}>{t.name}</label>
          <input
            className={scss.input}
            placeholder="..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.fieldLabel}>{t.address}</label>
          <input
            className={scss.input}
            placeholder="Street, House"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.fieldLabel}>{t.city}</label>
          <input
            className={scss.input}
            placeholder="Bishkek"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.fieldLabel}>{t.phone}</label>
          <input
            className={scss.input}
            placeholder="+996 700 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.fieldLabel}>{t.emaill}</label>
          <input
            className={scss.input}
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className={scss.orderBtn}
          onClick={sendOrder}
          disabled={loading}
        >
          {loading ? "Sending..." : t.placeorder}
        </button>

        <button className={scss.backBtn} onClick={() => navigate(-1)}>
          ← {t.back}
        </button>
      </div>

      {/* right side */}
      <div className={scss.order}>
        <p className={scss.orderLabel}>{t.yourorder}</p>

        {check.length === 0 ? (
          <p className={scss.empty}>No items</p>
        ) : (
          <>
            {check.map((item) => (
              <div key={item._id} className={scss.item}>
                {/* photo */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={scss.itemImg}
                  />
                )}

                {/* info */}
                <div className={scss.itemInfo}>
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
                  <p className={scss.itemCount}>× {item.count || 1}</p>
                </div>

                {/* price */}
                <p className={scss.itemPrice}>
                  {Number(item.price) * (item.count || 1)} {t.som}
                </p>

                {/* remove */}
                <button
                  className={scss.removeBtn}
                  onClick={() => deleteCheck(item._id)}
                >
                  ×
                </button>
              </div>
            ))}

            {/* total */}
            <div className={scss.total}>
              <p className={scss.totalLabel}>{t.total}</p>
              <p className={scss.totalPrice}>
                {total} {t.som}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
