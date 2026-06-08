import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/MainContext";
import { useState } from "react";
import scss from "./Product.module.scss";
import { useLang } from "../../context/LanguageContext";

const Product = () => {
  const { id } = useParams(); // bring id URL
  const { product, addOrder } = useProduct();
  const navigate = useNavigate();
  const { t } = useLang();

  // find important product with id
  const item = product.find((p) => String(p._id) === String(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // if dont have product
  if (!item) {
    return (
      <div className={scss.notFound}>
        <p>Product not found</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div className={scss.product}>
      {/* left side */}
      <div className={scss.imageWrap}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={scss.image} />
        ) : (
          <div className={scss.placeholder}>
            <span>ARUU</span>
          </div>
        )}
      </div>

      {/* right side */}
      <div className={scss.info}>
        <p className={scss.category}>
          {item.category === "abayas" && "ABAYAS"}
          {item.category === "dresses" && "DRESSES"}
          {item.category === "hijabs" && "HIJABS"}
        </p>

        <h1 className={scss.name}>{item.name}</h1>

        <p className={scss.price}>
          {item.price} {t.som}
        </p>

        <div className={scss.line}></div>

        {item.description && (
          <p className={scss.description}>{item.description}</p>
        )}

        {item.sizes && item.sizes.length > 0 && (
          <div className={scss.sizesBlock}>
            <p className={scss.sizesLabel}>{t.size}</p>
            <div className={scss.sizesGrid}>
              {item.sizes.map((size) => (
                <button
                  key={size}
                  className={`${scss.sizeBtn} ${selectedSize === size ? scss.sizeSelected : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {item.colors && item.colors.length > 0 && (
          <div className={scss.colorsBlock}>
            <p className={scss.colorsLabel}>{t.color}</p>
            <div className={scss.colorsGrid}>
              {item.colors.map((colorName) => {
                const colorMap = {
                  Black: "#1a1a1a",
                  White: "#f5f5f0",
                  Beige: "#e8d5b0",
                  Brown: "#6b3a2a",
                  Green: "#4a6741",
                  Navy: "#1a2744",
                  Yellow: "#f1d764",
                  "Dusty Rose": "#c9847a",
                };
                return (
                  <button
                    key={colorName}
                    className={`${scss.colorDot} ${selectedColor === colorName ? scss.colorDotSelected : ""}`}
                    style={{ backgroundColor: colorMap[colorName] }}
                    title={colorName}
                    onClick={() => setSelectedColor(colorName)}
                  />
                );
              })}
            </div>
            {/* show choosing color */}
            {selectedColor && (
              <p className={scss.selectedColorName}>{selectedColor}</p>
            )}
          </div>
        )}

        <button
          className={scss.addToCart}
          onClick={() => {
            if (item.sizes && item.sizes.length > 0 && !selectedSize) {
              alert("Please select a size");
              return;
            }
            if (item.colors && item.colors.length > 0 && !selectedColor) {
              alert("Please select a color");
              return;
            }

            addOrder({
              name: item.name,
              price: item.price,
              image: item.image,
              category: item.category,
              size: selectedSize,
              color: selectedColor,
              productId: item._id,
            });

            navigate("/basket");
          }}
        >
          {t.addBasket}
        </button>

        <button className={scss.backBtn} onClick={() => navigate(-1)}>
          {t.back}
        </button>
      </div>
    </div>
  );
};

export default Product;
