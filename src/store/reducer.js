import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_ITEM,
  UPDATE_CURRENCY,
} from "./actions";
import Cart from "../models/Cart";
import compareAttributes from "../helpers/compareAttributes";

const initialState = {
  cart: [],
  currency: "USD",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const cartItemIndex = state.cart.findIndex(
        (item) =>
          item.prodId === action.cartData.prodId &&
          compareAttributes(
            item.selectedAttributes,
            action.cartData.selectedAttributes
          )
      );
      const newCart = [...state.cart];
      if (cartItemIndex !== -1) {
        newCart[cartItemIndex].amount = newCart[cartItemIndex].amount + 1;
      } else {
        const newCartItem = new Cart(
          1,
          action.cartData.prodId,
          action.cartData.prodBrand,
          action.cartData.prodName,
          action.cartData.prodPrices,
          action.cartData.prodGallery,
          action.cartData.prodAttributes,
          action.cartData.selectedAttributes
        );
        newCart.push(newCartItem);
      }
      return {
        ...state,
        cart: newCart,
      };
    }

    case INCREMENT_CART_ITEM: {
      const cartItemIndex = state.cart.findIndex(
        (item) => item._id === action.cartItemId
      );
      const newCart = [...state.cart];
      newCart[cartItemIndex].amount = newCart[cartItemIndex].amount + 1;
      return {
        ...state,
        cart: newCart,
      };
    }

    case REMOVE_FROM_CART: {
      const cartItemIndex = state.cart.findIndex(
        (item) => item._id === action.cartItemId
      );
      if (state.cart[cartItemIndex].amount > 1) {
        const newCart = [...state.cart];
        newCart[cartItemIndex].amount = newCart[cartItemIndex].amount - 1;
        return {
          ...state,
          cart: newCart,
        };
      } else {
        const newCart = state.cart.filter(
          (item) => item._id !== action.cartItemId
        );
        return {
          ...state,
          cart: newCart,
        };
      }
    }

    case UPDATE_CURRENCY: {
      return {
        ...state,
        currency: action.currency,
      };
    }

    default:
      return state;
  }
};

export default reducer;
