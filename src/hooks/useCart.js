import { useEffect, useState } from "react";
import {db} from '../data/db'

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitar) {
    const exists = cart.some((item) => item.id === guitar.id);

    if (exists) {
      const updateCart = cart.map((item) => {
        if (item.id == guitar.id) {
          return { ...item, cantidad: item.cantidad + 1 };
        } else {
          return item;
        }
      });
      setCart(updateCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...guitar, cantidad: 1 }]);
    }

    setVisible(false);
  }

  function incrementar(id) {
    const filtro = cart.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCart(filtro);
  }

  function decrementar(id) {
    const filtro = cart.map((item) => {
      if (item.id === id && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    });
    setCart(filtro);
  }

  function removerItem(id) {
    const filtro = cart
      .map((item) => {
        if (item.id === id && item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        } else if (item.id === id) {
          return null;
        }

        return item;
      })
      .filter((item) => item !== null);

    setCart(filtro);
  }

  function vaciarCarrito() {
    setCart([]);
    setVisible(true);
  }

  return {
    data,
    cart,
    addToCart,
    incrementar,
    decrementar,
    removerItem,
    visible,
    setVisible,
    vaciarCarrito
  };
};
