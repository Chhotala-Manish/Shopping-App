import { createContext, useContext } from "react"
import faker from 'faker';
import { useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const Context = ({children}) => {
    const Product = [...Array(20)].map(() => ({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        image:faker.random.image(),
        fastDelivery:faker.datatype.boolean(),
        instock:faker.random.arrayElement([0, 3, 5, 6, 7]),
        rating:faker.random.arrayElement([1, 2, 3, 4, 5]),

    }))
    const [state, dispatch] = useReducer(cartReducer, {
        product: Product,
        Cart: []
    });


    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    });


  return ( <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
    {children}
  </Cart.Provider>
    
  )
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}