
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCart from "./hooks/useCart";


function App() { 

  const {

    data,
    cart,
    addTocart,
    removeFromCart,
    decreaseFromCart,
    incrementFromCart,
    clearCart,
    isEmpty,
    cartTotal,
    totalItems
  

   } = useCart();

  
                    ///
  return (
    <>
      <Header 
      cart={cart} 
      removeFromCart={removeFromCart}
      incrementFromCart={incrementFromCart}
      decreaseFromCart={decreaseFromCart}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
      totalItems={totalItems}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nueva Coleccion de Guitarra</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key = {guitar.id}
              guitar={guitar}
              addTocart={addTocart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos reservados &copy; 2025
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;