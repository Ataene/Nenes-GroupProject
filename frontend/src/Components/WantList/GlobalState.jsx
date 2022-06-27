import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from "./AppReducer";


//initial state
const initialState = {
    wishlist: [],
    traded: [],
}

//provider components
export const GlobalState = createContext(initialState);

//provider components
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState); 
    
//actions
    const addItemToWishlist = (data) => {
        dispatch({type: "ADD_ITEM_TO_WISHLIST", payload: data});
    }

    return (
      <GlobalProvider.Provider
        value={{
          wishlist: state.wishlist,
          traded: state.traded,
          addItemToWishlist,
        }}
      >
        {props.children}
      </GlobalProvider.Provider>
    );
}