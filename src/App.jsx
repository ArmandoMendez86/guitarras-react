import Header from "./componentes/Header";
import Guitar from "./componentes/Guitar";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    data,
    cart,
    addToCart,
    incrementar,
    decrementar,
    removerItem,
    visible,
    setVisible,
    vaciarCarrito
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        visible={visible}
        setVisible={setVisible}
        incrementar={incrementar}
        decrementar={decrementar}
        removerItem={removerItem}
        vaciarCarrito={vaciarCarrito}
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
    </>
  );
}

export default App;
