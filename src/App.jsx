import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import {db} from "./data/db";

function App() { 

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
     return localStorageCart ? JSON.parse(localStorageCart) : []  
  }

  const [data, setData] = useState(db);
  const  [cart, setCart] = useState(initialCart());

  const min_items = 1;


  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addTocart(item) {
    const itemExist = cart.findIndex(guitar=>guitar.id === item.id);
  
    if (itemExist >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart (id){
    setCart (prevCart =>  prevCart.filter(guitar=> guitar.id !== id ))
  }

  function incrementFromCart (id) {
    // if (cart [itemExist].quantity >= max_items) return
    //min_items = 1     "actuaizar si se quiere poner limite"

    const updatedCart = cart.map(
      item => {
        if (item.id === id)  {
          /// && item.quantity <100 "limitar cantidad de productos a comprar"
          return {
            ...item,
            quantity: item.quantity + 1 
          }
        }
        return item
      })
      setCart(updatedCart)
    }
    function decreaseFromCart(id) {
      const updatedCart = cart.map (
        item => {
          if (item.id === id && item.quantity > min_items) {
              return {
                ...item,
                quantity: item.quantity -1
              }
          }
          return item
        }
      )
      setCart(updatedCart)
    }

    function clearCart() {
      setCart([])
    }
    
  
  
                    ///
  return (
    <>
      <Header 
      cart={cart} 
      removeFromCart={removeFromCart}
      incrementFromCart={incrementFromCart}
      decreaseFromCart={decreaseFromCart}
      clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nueva Coleccion de Guitarra</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key = {guitar.id}
              guitar={guitar}
              setCart = {setCart}
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