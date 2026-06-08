import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "https://api-crud.elcho.dev";

const PRODUCT_API = `${BASE_URL}/api/v1/0f9b2-c0dc4-d415d/aruu`;
const BASKET_API = `${BASE_URL}/api/v1/1fd78-5ece4-1cf1c/basket`;
const CHECK_API = `${BASE_URL}/api/v1/7dc53-7af65-780c7/checkout`;

const productContext = createContext();
export const useProduct = () => useContext(productContext);

const MainContext = ({ children }) => {
  const [product, setProduct] = useState([]);
  // basket bringing products in the browser
  const [order, setOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("basket");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("LocalStorage error:", error);
      return [];
    }
  });
  const [check, setCheck] = useState([]);

  // every time the basket changes, we save it in the browser's memory.
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(order));
  }, [order]);

  useEffect(() => {
    readProduct();
  }, []);

  // ── items ──

  // get all items from the server
  async function readProduct() {
    try {
      const { data } = await axios.get(PRODUCT_API);
      setProduct(data.data || []);
    } catch (error) {
      console.log("readProduct error:", error);
    }
  }

  // add new items
  async function addProduct(newProduct) {
    try {
      await axios.post(PRODUCT_API, newProduct);
      await readProduct();
    } catch (error) {
      console.log("addProduct error:", error);
    }
  }

  // remove items
  async function deleteProduct(id) {
    try {
      await axios.delete(`${PRODUCT_API}/${id}`);
      await readProduct(); //
    } catch (error) {
      console.log("deleteProduct error:", error);
    }
  }

  // ── basket ──

  // get basket from the server
  async function readOrder() {
    try {
      const { data } = await axios.get(BASKET_API);
      setOrder(data.data || []);
    } catch (error) {
      console.log("readOrder error:", error);
    }
  }

  // Add item to basket
  async function addOrder(newItem) {
    try {
      await axios.post(BASKET_API, newItem);
      await readOrder(); // обновляем корзину
    } catch (error) {
      console.log("addOrder error:", error);
    }
  }

  // remove item from basket
  async function deleteOrder(id) {
    try {
      await axios.delete(`${BASKET_API}/${id}`);
      // remove a product from the list immediately without a request to the server
      setOrder(order.filter((item) => item._id !== id));
    } catch (error) {
      console.log("deleteOrder error:", error);
    }
  }

  // change the quantity of the product (+ or -)
  async function changeCount(id, type) {
    // find the right product
    const currentItem = order.find((item) => item._id === id);
    if (!currentItem) return;

    // we count the new quantity
    let newCount = currentItem.count || 1;
    if (type === "inc") newCount = newCount + 1;
    if (type === "dec" && newCount > 1) newCount = newCount - 1;

    // we are updating the list
    const newOrder = order.map((item) => {
      if (item._id === id) {
        return { ...item, count: newCount };
      }
      return item;
    });
    setOrder(newOrder);

    // save to the server
    try {
      await axios.patch(`${BASKET_API}/${id}`, { count: newCount });
    } catch (error) {
      console.log("changeCount error:", error);
    }
  }

  // clear all basket
  async function clearOrder() {
    try {
      // delete every product from the server
      for (const item of order) {
        await axios.delete(`${BASKET_API}/${item._id}`);
      }
      setOrder([]);
      localStorage.removeItem("basket"); // clearing browser memory
    } catch (error) {
      console.log("clearOrder error:", error);
    }
  }

  // ── placing an order ──

  // get a list of orders
  async function readCheck() {
    try {
      const { data } = await axios.get(CHECK_API);
      setCheck(data.data || []);
    } catch (error) {
      console.log("readCheck error:", error);
    }
  }

  // add item to order
  async function addCheck(newCheck) {
    try {
      await axios.post(CHECK_API, newCheck);
      await readCheck();
    } catch (error) {
      console.log("addCheck error:", error);
    }
  }

  // remove one item from the order
  async function deleteCheck(id) {
    try {
      await axios.delete(`${CHECK_API}/${id}`);
      await readCheck();
    } catch (error) {
      console.log("deleteCheck error:", error);
    }
  }

  // clear all order
  async function clearCheck() {
    try {
      for (const item of check) {
        await axios.delete(`${CHECK_API}/${item._id}`);
      }
      setCheck([]);
    } catch (error) {
      console.log("clearCheck error:", error);
    }
  }

  const values = {
    product,
    order,
    check,
    readProduct,
    addProduct,
    deleteProduct,
    readOrder,
    addOrder,
    deleteOrder,
    changeCount,
    clearOrder,
    readCheck,
    addCheck,
    deleteCheck,
    clearCheck,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default MainContext;
