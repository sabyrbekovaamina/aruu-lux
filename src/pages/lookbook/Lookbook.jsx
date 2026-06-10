import scss from "./Lookbook.module.scss";
import { useLang } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const Lookbook = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  // LOOKBOOK = отдельная сущность (как у брендов)
  const looks = [
    {
      _id: 1,
      name: "MOON Veil",
      image:
        "https://i.pinimg.com/1200x/ef/94/f6/ef94f6d8fe16768825ed4e2ab2e8ae87.jpg",
      description: "Minimal evening elegance",
    },
    {
      _id: 2,
      name: "HAYA Signature",
      image:
        "https://i.pinimg.com/1200x/1c/1e/8f/1c1e8fad8f3717d7f0c1283d79441e26.jpg",
      description: "Soft luxury identity",
    },
    {
      _id: 3,
      name: "HAYA Signature",
      image:
        "https://i.pinimg.com/736x/0c/9d/e0/0c9de0ba98493ee994517dc399b15de7.jpg",
      description: "Soft luxury identity",
    },
    {
      _id: 4,
      name: "HAYA Signature",
      image:
        "https://i.pinimg.com/1200x/33/ae/74/33ae741d713b599383826975b743349f.jpg",
      description: "Soft luxury identity",
    },
    {
      _id: 5,
      name: "HAYA Signature",
      image:
        "https://i.pinimg.com/736x/f8/ca/22/f8ca2214b82714273a3a668a8b46b63e.jpg",
      description: "Minimal evening elegance",
    },
    {
      _id: 6,
      name: "MOON Veil",
      image:
        "https://res.cloudinary.com/dwznb7skm/image/upload/v1781029427/woziyv0dbjvjzzsg9nve.jpg",
      description: "Soft luxury identity",
    },
    {
      _id: 8,
      name: "MOON Veil",
      image:
        "https://i.pinimg.com/1200x/c6/e6/24/c6e624d371c12f23651092fbf1e885d7.jpg",
      description: "Minimal evening elegance",
    },
    {
      _id: 9,
      name: "MOON Veil",
      image:
        "https://i.pinimg.com/736x/7b/e3/d3/7be3d36bf4948033f801c4e7886cc496.jpg",
      description: "Minimal evening elegance",
    },
  ];

  return (
    <div className={scss.lookbook} onClick={() => navigate("/collections")}>
      <section className={scss.hero}>
        <p className={scss.label}>ARUU · 2026</p>
        <h1 className={scss.title}>{t.lookbook}</h1>
        <div className={scss.line}></div>
        <p className={scss.subtitle}>
          {lang === "ru" ? "Образы которые вдохновляют" : "Looks that inspire"}
        </p>
      </section>

      {looks.length === 0 ? (
        <div className={scss.empty}>
          <p>{lang === "ru" ? "Скоро появятся образы" : "Coming soon"}</p>
        </div>
      ) : (
        <div className={scss.grid}>
          {looks.map((item, index) => (
            <div
              key={item._id}
              className={`${scss.item} ${index % 3 === 0 ? scss.large : scss.small}`}
            >
              <div className={scss.imgWrap}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={scss.img} />
                ) : (
                  <div className={scss.placeholder}>
                    <span className={scss.placeholderText}>ARUU</span>
                  </div>
                )}

                <div className={scss.overlay}>
                  <p className={scss.lookSubtitle}>ARUU</p>
                  <p className={scss.lookTitle}>{item.name}</p>

                  {item.description && (
                    <p className={scss.description}>{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className={scss.bottom}>
        <p className={scss.bottomLabel}>ARUU MODEST LUXURY</p>
        <h2 className={scss.bottomTitle}>
          {lang === "ru" ? '"Носи свой свет"' : '"Wear your light"'}
        </h2>
      </section>
    </div>
  );
};

export default Lookbook;
