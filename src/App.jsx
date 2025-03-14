import { useState } from "react";
import Header from "./componentes/Header";
import Guitar from "./componentes/Guitar";
import { db } from "./data/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(true);

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
    toast.success('Producto agregado!')
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
    toast.error('Producto eliminado!')
  }

  return (
    <>
      <Header
        cart={cart}
        visible={visible}
        setVisible={setVisible}
        incrementar={incrementar}
        decrementar={decrementar}
        removerItem={removerItem}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <Guitar addToCart={addToCart} guitar={item} key={item.id} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
      <ToastContainer />
    </>

  );
}

export default App;
