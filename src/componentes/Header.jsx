function Header({
  cart,
  visible,
  setVisible,
  incrementar,
  decrementar,
  removerItem,
  vaciarCarrito,
}) {
  const cartTotal = () =>
    cart.reduce((total, item) => {
      return total + item.price * item.cantidad;
    }, 0);

  function ocultarCarrito(e) {
    if (e.target.classList.contains("img-fluid")) {
      setVisible(true);
    }
  }

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito" onClick={(e) => ocultarCarrito(e)}>
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div
                id="carrito"
                className={
                  visible
                    ? "bg-white p-3 ocultarCarrito"
                    : "bg-white p-3 mostrarCarrito"
                }
              >
                {cart.length === 0 ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <div>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${item.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="fw-bold">${item.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decrementar(item.id)}
                              >
                                -
                              </button>
                              {item.cantidad}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => incrementar(item.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removerItem(item.id)}
                                className="btn btn-danger"
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar:{" "}
                      <span className="fw-bold">${cartTotal()}</span>
                    </p>
                  </div>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
