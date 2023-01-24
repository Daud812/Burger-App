import React, { useReducer } from "react";
import CartContext from "./cart-context";
const deafultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exixtingCartitemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exixtingCartItem = state.items[exixtingCartitemIndex];
    let updatedItems;

    if (exixtingCartItem) {
      const updatedItem = {
        ...exixtingCartItem,
        amount: exixtingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exixtingCartitemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const exixtingCartitemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exixtingCartItem = state.items[exixtingCartitemIndex];
    const updatedTotalAmount = state.totalAmount - exixtingCartItem.price;
    let updatedItems;

    if (exixtingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exixtingCartItem,
        amount: exixtingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exixtingCartitemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return deafultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    deafultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
