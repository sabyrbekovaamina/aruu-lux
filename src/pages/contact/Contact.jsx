import { useState } from "react";
import scss from "./Contact.module.scss";
import { useLang } from "../../context/LanguageContext";

const Contact = () => {
  const { t } = useLang();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const text = `Привет ARUU! %0AИмя: ${name}%0AEmail: ${email}%0AСообщение: ${message}`;
    window.open(`https://wa.me/996704081006?text=${text}`, "_blank");

    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={scss.contact}>
      {/* Hero */}
      <section className={scss.hero}>
        <p className={scss.label}>{t.contactLabel}</p>
        <h1 className={scss.title}>{t.contactTitle}</h1>
        <div className={scss.line}></div>
        <p className={scss.subtitle}>{t.contactSubtitle}</p>
      </section>

      <section className={scss.content}>
        <div className={scss.infoBlock}>
          <div className={scss.infoItem}>
            <p className={scss.infoLabel}>{t.contactLocation}</p>
            <p className={scss.infoText}>{t.footerLocation}</p>
          </div>
          <div className={scss.infoItem}>
            <p className={scss.infoLabel}>{t.contactEmail}</p>
            <p className={scss.infoText}>{t.footerEmail}</p>
          </div>
          <div className={scss.infoItem}>
            <p className={scss.infoLabel}>{t.contactPhone}</p>
            <p className={scss.infoText}>{t.footerPhone}</p>
          </div>
          <div className={scss.infoItem}>
            <p className={scss.infoLabel}>{t.contactHours}</p>
            <p className={scss.infoText}>{t.footerHours}</p>
          </div>

          <div className={scss.socials}>
            <p className={scss.infoLabel}>{t.contactFollow}</p>
            <div className={scss.socialLinks}>
              <a href="#" className={scss.social}>
                Instagram
              </a>
              <a
                href="https://t.me/+_nTulqpUO0lhNGIy"
                target="_blank"
                rel="noreferrer"
                className={scss.social}
              >
                Telegram
              </a>
              <a
                href="https://wa.me/996704081006"
                target="_blank"
                rel="noreferrer"
                className={scss.social}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className={scss.formBlock}>
          {sent ? (
            <div className={scss.success}>
              <p className={scss.successTitle}>{t.contactSuccess}</p>
              <p className={scss.successText}>{t.contactSuccessText}</p>
              <button
                className={scss.successBtn}
                onClick={() => setSent(false)}
              >
                {t.contactSendAnother}
              </button>
            </div>
          ) : (
            <form className={scss.form} onSubmit={handleSubmit}>
              <div className={scss.field}>
                <label className={scss.fieldLabel}>{t.contactName}</label>
                <input
                  className={scss.input}
                  type="text"
                  placeholder="..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={scss.field}>
                <label className={scss.fieldLabel}>{t.contactEmail}</label>
                <input
                  className={scss.input}
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={scss.field}>
                <label className={scss.fieldLabel}>{t.contactMessage}</label>
                <textarea
                  className={scss.textarea}
                  placeholder="..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                />
              </div>

              <button type="submit" className={scss.submitBtn}>
                {t.contactBtn}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
