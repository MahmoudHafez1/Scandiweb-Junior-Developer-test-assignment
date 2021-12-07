export const ADD = "ADD";
export const REMOVE = "REMOVE";

export const addToCart = (cartData) => {
  return {
    type: ADD,
    cartData,
  };
};

export const removeFromCart = (cartItemId) => {
  return {
    type: REMOVE,
    cartItemId,
  };
};
