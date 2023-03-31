import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItems } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItems[]
>;

const removeEntireCartItem = (cartItems: CartItems[], productId: number) => {
  const cart = cartItems.filter((cart: CartItems) => {
    return cart.id !== productId;
  });

  return cart;
};

const removeCartItem = (
  cartItems: CartItems[],
  productId: number
): CartItems[] => {
  const existingCartItem = cartItems.find(
    (cartItem: CartItems): boolean => cartItem.id === productId
  );

  if (!existingCartItem) {
    return cartItems;
  }

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const addCartItem = (
  cartItems: CartItems[],
  productToAdd: CartItems
): CartItems[] => {
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

export const setCartItems = withMatcher(
  (cartItem: CartItems[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItem);
  }
);

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const addItemToCart = (
  cartItems: CartItems[],
  productToAdd: CartItems
) => {
  const add_cart_item = addCartItem(cartItems, productToAdd);
  return setCartItems(add_cart_item);
};

export const removeItemFromCart = (
  cartItems: CartItems[],
  productId: number
) => {
  const remove_from_cart = removeCartItem(cartItems, productId);

  return setCartItems(remove_from_cart);
};

export const removeEntireCart = (cartItems: CartItems[], productId: number) => {
  const remove_entire_cart = removeEntireCartItem(cartItems, productId);

  return setCartItems(remove_entire_cart);
};
