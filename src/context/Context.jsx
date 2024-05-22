import { createContext, useState, useEffect, useContext, useReducer } from "react";
import reducer from "../reducer/Reducer";
// import cartItems from "../assets/data/Data";
import { getTotals } from "../utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

import { 
    CLEAR_CART, 
    REMOVE, 
    INCREASE, 
    DECREASE, 
    LOADING, 
    DISPLAY_ITEMS,
  } from "../reducer/actions";

const AppContext = createContext();

const initialState = {
  isLoading: true,
  cart: new Map(),
}

export const AppProvider = ({ children }) => {
 const [state, dispatch] = useReducer(reducer, initialState)
 const { totalAmount, totalCost } = getTotals(state.cart);

 const clearCart = () => {
  dispatch({ type: CLEAR_CART })
 }

 const remove = (id) => {
  dispatch({ type: REMOVE, payload: { id }})
 }

 const increase = (id) => {
  dispatch({ type: INCREASE, payload: { id } })
 }

 const decrease = (id) => {
  dispatch({ type: DECREASE, payload: { id } })
 }

 const fetchData = async() => {
  try {
    dispatch({ type: LOADING })
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } })
  } catch(error)
  {
    console.log(error)
  }

 }

 useEffect(() => {
  fetchData();
 }, [])

  return (
    <AppContext.Provider value={
      {
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
        
      }
    }>
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => useContext(AppContext);