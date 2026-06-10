import { useState } from "react";
import { useProduct } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import scss from "./Add.module.scss";
import { useLang } from "../../context/LanguageContext";

const CLOUD_NAME = "dwznb7skm";
const UPLOAD_PRESET = "products_upload";

const Add = () => {
  const { addProduct, product, deleteProduct } = useProduct();
  const navigate = useNavigate();
  const { lang } = useLang();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("abayas");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const allColors = [
    { name: "Black", hex: "#1a1a1a" },
    { name: "White", hex: "#f5f5f0" },
    { name: "Beige", hex: "#e8d5b0" },
    { name: "Brown", hex: "#6b3a2a" },
    { name: "Green", hex: "#4a6741" },
    { name: "Navy", hex: "#1a2744" },
    { name: "Yellow", hex: "#f1d764" },
    { name: "Dusty Rose", hex: "#c9847a" },
  ];

  // choosing size
  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // choosing color
  const toggleColor = (colorName) => {
    if (colors.includes(colorName)) {
      setColors(colors.filter((c) => c !== colorName));
    } else {
      setColors([...colors, colorName]);
    }
  };

  // download photo in CLoudinary
  const handleImageUpload = async (e) => {
    console.log("FILE:", e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (data.secure_url) {
        setImage(data.secure_url); // save photo
      } else {
        alert("Ошибка загрузки. Проверь upload_preset в Cloudinary");
        console.log("Cloudinary error:", data);
      }
    } catch (error) {
      console.log("Upload error:", error);
      alert("Ошибка загрузки изображения");
    } finally {
      setLoading(false);
    }
  };

  // add product
  const handleClick = async () => {
    if (!name.trim()) {
      alert("Введите название");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("Введите правильную цену");
      return;
    }
    if (!image) {
      alert("Загрузите изображение");
      return;
    }

    // Сначала создаём объект
    const newProduct = {
      name: name.trim(),
      price: price,
      image: image,
      description: description.trim(),
      category: category,
      sizes: sizes,
      colors: colors,
    };
    console.log("Отправляем товар:", newProduct);
    // Потом включаем загрузку
    setLoading(true);

    try {
      await addProduct(newProduct);

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setCategory("abayas");
      setSizes([]);
      setColors([]);

      navigate(`/${category}`);
    } catch (error) {
      console.log("addProduct error:", error);
      alert("Ошибка при добавлении товара");
    } finally {
      setLoading(false);
    }
  };
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
    <div className={scss.add}>
      <div className={scss.container}>
        <h1 className={scss.title}>Add Product</h1>
        <p className={scss.subtitle}>ARUU · Admin</p>

        <div className={scss.form}>
          {/* photo */}
          <div className={scss.field}>
            <label className={scss.label}>Product Image</label>
            <input
              className={scss.input}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {image && (
              <img src={image} alt="preview" className={scss.preview} />
            )}
          </div>

          {/* name */}
          <div className={scss.field}>
            <label className={scss.label}>Name</label>
            <input
              className={scss.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* price */}
          <div className={scss.field}>
            <label className={scss.label}>Price</label>
            <input
              className={scss.input}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* categories */}
          <div className={scss.field}>
            <label className={scss.label}>Category</label>
            <select
              className={scss.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="abayas">Abayas</option>
              <option value="dresses">Dresses</option>
              <option value="hijabs">Hijabs</option>
              <option value="collections">Collections</option>
            </select>
          </div>

          {/* description */}
          <div className={scss.field}>
            <label className={scss.label}>Description</label>
            <textarea
              className={scss.textarea}
              placeholder="Describe the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* sizes */}
          <div className={scss.field}>
            <label className={scss.label}>Sizes</label>
            <div className={scss.sizesGrid}>
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`${scss.sizeBtn} ${sizes.includes(size) ? scss.sizeSelected : ""}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* colors */}
          <div className={scss.field}>
            <label className={scss.label}>Colors</label>
            <div className={scss.colorsGrid}>
              {allColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={`${scss.colorBtn} ${colors.includes(color.name) ? scss.colorSelected : ""}`}
                  onClick={() => toggleColor(color.name)}
                  title={color.name}
                  style={{ backgroundColor: color.hex }}
                >
                  {colors.includes(color.name) && (
                    <span className={scss.colorCheck}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            className={scss.submitBtn}
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </div>
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
            </div>
            <button
              className={scss.delete}
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(item._id);
              }}
            >
              Delete
            </button>

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
    </div>
  );
};

export default Add;
