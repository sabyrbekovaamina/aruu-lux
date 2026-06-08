import { createContext, useState, useContext } from "react";

// хранилище языка
const LanguageContext = createContext();

const translations = {
  en: {
    collections: "Collections",
    about: "About",
    lookbook: "Lookbook",
    contact: "Contact",
    newCollection: "NEW COLLECTION · 2026",
    modestLuxury: "Modest Luxury · Wear your light",
    newArrivals: "NEW ARRIVALS",

    addTitle: "Add Product",
    addSubtitle: "ARUU · Admin",
    addName: "Name",
    addPrice: "Price",
    addCategory: "Category",
    addDescription: "Description",
    addSizes: "Sizes",
    addBtn: "Add Product",
    addLoading: "Adding...",
    addPlaceholderName: "Abaya «Sabah»",
    addPlaceholderPrice: "8 500 som",
    addPlaceholderDesc: "Describe the product...",
    addPhotoText: "Click to upload photo",
    cat1: "Abayas",
    cat2: "Dresses",
    cat3: "Hijabs",

    title: "Abayas",
    title2: "Dresses",

    // Footer
    footerShop: "Shop",
    footerCompany: "Company",
    footerContact: "Contact",
    footerDesc:
      "Kyrgyz modest luxury brand. Each piece crafted with love and respect for tradition.",
    footerTagline: "Wear your light",
    footerLocation: "Bishkek, Kyrgyzstan",
    footerEmail: "aruu.modest@gmail.com",
    footerPhone: "+996 704 081 006",
    footerHours: "Mon – Sat · 10:00 – 19:00",
    footerFollow: "Follow us",
    footerAllCollections: "All Collections",
    footerCopy: "© 2026 ARUU. All rights reserved.",
    footerMade: "Made with love in Bishkek 🤍",

    // About
    aboutHeroLabel: "OUR STORY",
    aboutHeroTitle: "About ARUU",
    aboutHeroSubtitle: "Modest Luxury · Wear your light",
    aboutBeginLabel: "THE BEGINNING",
    aboutBeginTitle: "Born from a dream",
    aboutBeginText1:
      "ARUU was born in Bishkek, Kyrgyzstan — from a love of beauty, light, and culture. The name means radiance in Kyrgyz, and that is exactly what we want to give every woman through our clothing.",
    aboutBeginText2:
      "We believe that modesty and elegance are not opposites — they are harmony. Every piece is created with respect for tradition and a vision for the future.",
    aboutPhilLabel: "OUR PHILOSOPHY",
    aboutPhilQuote: '"Clothing that gives you the freedom to be yourself."',
    aboutPhilText:
      "A May morning, sunrise, coffee in hand — and you in clothing you trust. That is the image behind every collection we create.",
    aboutValLabel: "OUR VALUES",
    val1Name: "Modesty",
    val1Text:
      "We celebrate modest fashion as an art form — elegant, purposeful, and powerful.",
    val2Name: "Heritage",
    val2Text:
      "Inspired by Kyrgyz ornaments and traditions, woven into every silhouette.",
    val3Name: "Quality",
    val3Text:
      "Every piece is crafted with care — fabrics chosen for comfort, beauty and longevity.",
    founderLabel: "THE FOUNDER",
    founderName: "Amina Sabyrbekova",
    founderBio:
      "Amina grew up dreaming of becoming a designer. With a passion for modest fashion and a deep love for Kyrgyz culture, she created ARUU — a brand where every woman can feel radiant, free, and herself.",
    founderSign: "— Amina, Founder of ARUU",
    ctaTitle: "Discover the Collection",
    ctaBtn: "Shop Now",

    // Contact
    contactLabel: "GET IN TOUCH",
    contactTitle: "Contact Us",
    contactSubtitle: "We'd love to hear from you",
    contactLocation: "Location",
    contactEmail: "Email",
    contactPhone: "Phone",
    contactHours: "Hours",
    contactFollow: "Follow us",
    contactName: "Your Name",
    contactMessage: "Message",
    contactBtn: "Send via WhatsApp",
    contactSuccess: "Message sent! 🤍",
    contactSuccessText:
      "Thank you for reaching out. We'll get back to you soon via WhatsApp.",
    contactSendAnother: "Send another",

    // category
    abayas: "Abayas",
    dresses: "Dresses",
    hijabs: "Hijabs",

    // basket
    theme: "Basket",
    empty: "Your basket is empty",
    continue: "Continue Shopping",
    items: "items",
    total: "TOTAL",
    order: "Place Order",

    // signup
    sign: "Sign in to your account",
    email: "email",
    password: "password",
    signIn: "Sign In",
    loading: "Loading...",
    google: "Continue with Google",
    acc: "Don't have an account?",
    signUp: "Sign Up",
    create: "Create your account",
    confirmPass: "Confirm Password",
    createAcc: "Create Account",
    or: "or",
    haveAcc: "Already have an account?",
    signin: "Sign In",

    // product
    addBasket: "Add to Basket",
    back: "Back",
    color: "COLOR",
    size: "SIZE",
    som: "som",
  },
  ru: {
    collections: "Коллекции",
    about: "О нас",
    lookbook: "Лукбук",
    contact: "Контакт",
    newCollection: "НОВАЯ КОЛЛЕКЦИЯ · 2026",
    modestLuxury: "Скромная роскошь · Носи свой свет",
    newArrivals: "НОВЫЕ ПОСТУПЛЕНИЯ",

    addTitle: "Добавить товар",
    addSubtitle: "ARUU · Админ",
    addName: "Название",
    addPrice: "Цена",
    addCategory: "Категория",
    addDescription: "Описание",
    addSizes: "Размеры",
    addBtn: "Добавить товар",
    addLoading: "Добавляется...",
    addPlaceholderName: "Абайя «Сабах»",
    addPlaceholderPrice: "8 500 сом",
    addPlaceholderDesc: "Опишите товар...",
    addPhotoText: "Нажми чтобы загрузить фото",
    cat1: "Абайи",
    cat2: "Платья",
    cat3: "Платки",

    title: "Абайи",
    title2: "Платья",

    // Footer
    footerShop: "Магазин",
    footerCompany: "Компания",
    footerContact: "Контакты",
    footerDesc:
      "Кыргызский люкс бренд скромной моды. Каждое изделие создано с любовью и уважением к традициям.",
    footerTagline: "Носи свой свет",
    footerLocation: "Бишкек, Кыргызстан",
    footerEmail: "aruu.modest@gmail.com",
    footerPhone: "+996 704 081 006",
    footerHours: "Пн – Сб · 10:00 – 19:00",
    footerFollow: "Мы в соцсетях",
    footerAllCollections: "Все коллекции",
    footerCopy: "© 2026 ARUU. Все права защищены.",
    footerMade: "Сделано с любовью в Бишкеке 🤍",

    // About
    aboutHeroLabel: "НАША ИСТОРИЯ",
    aboutHeroTitle: "О бренде",
    aboutHeroSubtitle: "Скромная роскошь · Носи свой свет",
    aboutBeginLabel: "НАЧАЛО",
    aboutBeginTitle: "Рождённый из мечты",
    aboutBeginText1:
      "ARUU родился в Бишкеке, Кыргызстан — из любви к красоте, свету и культуре. Название означает сияние на кыргызском, и именно это мы хотим подарить каждой женщине через нашу одежду.",
    aboutBeginText2:
      "Мы верим что скромность и элегантность — не противоречие, а гармония. Каждое изделие создано с уважением к традициям и взглядом в будущее.",
    aboutPhilLabel: "НАША ФИЛОСОФИЯ",
    aboutPhilQuote: '"Одежда которая даёт свободу быть собой."',
    aboutPhilText:
      "Майское утро, рассвет, кофе в руках — и ты в одежде которой доверяешь. Вот образ за каждой нашей коллекцией.",
    aboutValLabel: "НАШИ ЦЕННОСТИ",
    val1Name: "Скромность",
    val1Text:
      "Мы воспринимаем скромную моду как форму искусства — элегантную, осознанную и сильную.",
    val2Name: "Наследие",
    val2Text:
      "Вдохновлённые кыргызскими орнаментами и традициями, вплетёнными в каждый силуэт.",
    val3Name: "Качество",
    val3Text:
      "Каждое изделие создано с заботой — ткани выбраны для комфорта, красоты и долговечности.",
    ctaTitle: "Открыть коллекцию",
    ctaBtn: "Смотреть",

    // Contact
    contactLabel: "СВЯЗАТЬСЯ С НАМИ",
    contactTitle: "Контакты",
    contactSubtitle: "Мы рады вашему сообщению",
    contactLocation: "Адрес",
    contactEmail: "Email",
    contactPhone: "Телефон",
    contactHours: "Часы работы",
    contactFollow: "Мы в соцсетях",
    contactName: "Ваше имя",
    contactMessage: "Сообщение",
    contactBtn: "Написать в WhatsApp",
    contactSuccess: "Сообщение отправлено! 🤍",
    contactSuccessText: "Спасибо что написали нам. Мы ответим вам в WhatsApp.",
    contactSendAnother: "Написать ещё",

    // category
    abayas: "Абайи",
    dresses: "Платья",
    hijabs: "Платки",

    // basket
    theme: "Корзина",
    empty: "Корзина пуста",
    continue: "Продолжить покупки",
    items: "товаров",
    total: "ИТОГО",
    order: "Оформить заказ",

    // signup
    sign: "Войдите в свой аккаунт",
    email: "электронная почта",
    password: "пароль",
    signIn: "Войти",
    loading: "Загрузка...",
    google: "Продолжить с Google",
    acc: "У вас нет аккаунта?",
    signUp: "Зарегистрироваться",
    create: "Создайте свою учетную запись",
    confirmPass: "Подтвердите пароль",
    createAcc: "Зарегистрироваться",
    or: "или",
    haveAcc: "У вас уже есть аккаунт?",
    signin: "Войти",

    // product
    addBasket: "Добавить в корзину",
    back: "Назад",
    color: "ЦВЕТ",
    size: "РАЗМЕР",
    som: "сом",
  },
};

//оборачивает весь сайт
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  const t = translations[lang]; // текущие тексты

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

//чтобы легко использовать в любом компоненте
export const useLang = () => useContext(LanguageContext);
