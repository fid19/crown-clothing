import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const removeEntireCartItem = (cartItems, productId) => {
  const cart = cartItems.filter((cart) => {
    return cart.id !== productId;
  });

  return cart;
};

const removeCartItem = (cartItems, productId) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const setCartItems = (cartItem) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItem);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const add_cart_item = addCartItem(cartItems, productToAdd);
  return setCartItems(add_cart_item);
};

export const removeItemFromCart = (cartItems, productId) => {
  const remove_from_cart = removeCartItem(cartItems, productId);

  return setCartItems(remove_from_cart);
};

export const removeEntireCart = (cartItems, productId) => {
  const remove_entire_cart = removeEntireCartItem(cartItems, productId);

  return setCartItems(remove_entire_cart);
};
