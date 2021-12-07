import { ADD, REMOVE } from "../actions/cartActions";
import Cart from "../../models/Cart";
import compareAttributes from "../../helpers/compareAttributes";

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const cartItemIndex = state.cart.findIndex(
        (item) =>
          item.prodId === action.cartData.prodId &&
          compareAttributes(item.prodAttributes, action.cartData.prodAttributes)
      );
      if (cartItemIndex !== -1) {
        const newCart = [...state.cart];
        newCart[cartItemIndex].amount = newCart[cartItemIndex].amount + 1;
        return {
          cart: newCart,
        };
      } else {
        const newCartItem = new Cart(
          1,
          action.cartData.prodId,
          action.cartData.prodBrand,
          action.cartData.prodName,
          action.cartData.prodPrice,
          action.cartData.prodImage,
          action.cartData.prodAttributes
        );
        return {
          cart: [...state.cart, newCartItem],
        };
      }
    case REMOVE:
      const cartItemInd = state.cart.findIndex(
        (item) => item._id === action.cartItemId
      );
      let newCart = [...state.cart];
      if (newCart[cartItemInd].amount > 1) {
        newCart[cartItemInd].amount = newCart[cartItemInd].amount - 1;
      } else {
        newCart = state.cart.filter((item) => item._id !== action.cartItemId);
      }
      return {
        cart: newCart,
      };
    default:
      return state;
  }
};
