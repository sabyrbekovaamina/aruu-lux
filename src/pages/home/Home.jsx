import scss from "./Home.module.scss";
import video from "../../assets/videos/download (3).mp4";
import { useLang } from "../../context/LanguageContext";
import { useProduct } from "../../context/MainContext";
import abayasImg from "../../assets/images/categories/abaya.png";
import dressesImg from "../../assets/images/categories/dress.png";
import hijabsImg from "../../assets/images/categories/hijab.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const { product } = useProduct();

  const getLastProduct = (category) =>
    [...product].reverse().find((item) => item.category === category);

  const oneAbaya = getLastProduct("abayas");
  const oneDress = getLastProduct("dresses");
  const oneHijab = getLastProduct("hijabs");

  const newItems = [oneAbaya, oneDress, oneHijab].filter(Boolean);

  const categories = [
    {
      id: 1,
      title: "Abayas",
      titleRu: "Абайи",
      category: "abayas",
      link: "/abayas",
      image: abayasImg,
    },
    {
      id: 2,
      title: "Dresses",
      titleRu: "Платья",
      category: "dresses",
      link: "/dresses",
      image: dressesImg,
    },
    {
      id: 3,
      title: "Hijabs",
      titleRu: "Платки",
      category: "hijabs",
      link: "/hijabs",
      image: hijabsImg,
    },
  ];

  return (
    <div className={scss.home}>
      {/* HERO */}
      <section className={scss.hero} onClick={() => navigate("/collections")}>
        <video
          className={scss.video}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />

        <div className={scss.overlay}></div>

        <div className={scss.heroContent}>
          <p className={scss.tag}>{t.newCollection}</p>
          <h1 className={scss.title}>Sabah Collection</h1>
          <div className={scss.line}></div>
          <p className={scss.subtitle}>{t.modestLuxury}</p>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className={scss.newArrivals}>
        <div className={scss.sectionHeader}>
          <h2 className={lang === "ru" ? scss.titleRu : scss.titleEn}>
            {t.newArrivals}
          </h2>
        </div>

        {newItems.length === 0 ? (
          <div className={scss.emptyBlock}>
            <p className={scss.emptyText}>
              {lang === "ru" ? "Пока нет товаров" : "No products yet"}
            </p>
          </div>
        ) : (
          <div className={scss.productsGrid}>
            {newItems.map((el, index) => (
              <div
                key={el._id || `product-${index}`}
                className={scss.productCard}
                onClick={() => navigate(`/product/${el._id}`)}
              >
                <div className={scss.productImg}>
                  {el.image ? (
                    <img src={el.image} alt={el.name || "Product"} />
                  ) : (
                    <div className={scss.placeholder}>
                      <span className={scss.placeholderText}>ARUU</span>
                    </div>
                  )}
                </div>

                <div className={scss.productInfo}>
                  <p className={scss.productCategory}>
                    {el.category === "abayas" && "ABAYAS"}
                    {el.category === "dresses" && "DRESSES"}
                    {el.category === "hijabs" && "HIJABS"}
                  </p>

                  <p className={scss.productName}>{el.name}</p>
                  <p className={scss.productPrice}>{el.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURED */}
      <section className={scss.featured}>
        <div className={scss.featuredOverlay}></div>

        <div className={scss.featuredContent}>
          <p className={scss.featuredLabel}>ARUU SIGNATURE</p>

          <h2 className={scss.featuredTitle}>Crafted for modest femininity</h2>

          <p className={scss.featuredText}>
            {lang === "ru"
              ? "Вневременные силуэты, вдохновленные кыргызской эстетикой и современной женственностью."
              : "Timeless silhouettes inspired by Kyrgyz aesthetics and modern femininity."}
          </p>

          <button
            className={scss.featuredBtn}
            onClick={() => navigate("/collections")}
          >
            {lang === "ru" ? "Открыть коллекцию" : "View Collection"}
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={scss.categories}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={scss.categoryCard}
            onClick={() => navigate(cat.link)}
          >
            <div
              className={scss.categoryImg}
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className={scss.categoryOverlay}></div>

              <div className={scss.categoryContent}>
                <p className={scss.categoryLabel}>ARUU</p>

                <h3
                  className={
                    lang === "ru" ? scss.categoryNameRu : scss.categoryNameEn
                  }
                >
                  {lang === "ru" ? cat.titleRu : cat.title}
                </h3>

                <p className={scss.categoryBtn}>
                  {lang === "ru" ? "Смотреть →" : "Explore →"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section className={scss.about}>
        <p className={scss.aboutLabel}>OUR STORY</p>

        <h2 className={scss.aboutQuote}>
          {lang === "ru"
            ? "“Одежда, которая даёт свободу быть собой.”"
            : "“Clothing that gives you the freedom to be yourself.”"}
        </h2>

        <p className={scss.aboutText}>
          {lang === "ru"
            ? "ARUU — кыргызский бренд modest fashion. Название означает сияние. Каждое изделие создаётся с уважением к традициям, архитектуре формы и женской индивидуальности."
            : "ARUU is a Kyrgyz modest fashion brand. The name means radiance. Each piece is created with respect for traditions, structural architecture, and female individuality."}
        </p>

        <button className={scss.aboutBtn} onClick={() => navigate("/about")}>
          {lang === "ru" ? "Узнать больше" : "Learn More"}
        </button>
      </section>
    </div>
  );
};

export default Home;
