export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_CART_ITEM = "INCREMENT_CART_ITEM";
export const UPDATE_CURRENCY = "UPDATE_CURRENCY";

export const addToCart = (cartData) => ({
  type: ADD_TO_CART,
  cartData,
});

export const incrementCartItem = (cartItemId) => ({
  type: INCREMENT_CART_ITEM,
  cartItemId,
});

export const removeFromCart = (cartItemId) => ({
  type: REMOVE_FROM_CART,
  cartItemId,
});

export const updateCurrency = (currency) => ({
  type: UPDATE_CURRENCY,
  currency,
});
