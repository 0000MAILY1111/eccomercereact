import { useEffect, useMemo, useState } from "react";
import {db} from "../data/db";

const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart());

    const min_items = 1;


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addTocart(item) {

        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExist >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function incrementFromCart(id) {
        // if (cart [itemExist].quantity >= max_items) return
        //min_items = 1     "actuaizar si se quiere poner limite"

        const updatedCart = cart.map(
            item => {
                if (item.id === id) {
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
        const updatedCart = cart.map(
            item => {
                if (item.id === id && item.quantity > min_items) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
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

    const isEmpty = useMemo(() => cart.length === 0, [cart])
        const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    
        const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

    return {
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
        


    }

}

export default useCart;