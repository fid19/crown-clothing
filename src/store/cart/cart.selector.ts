import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";


const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce((acc, { quantity, price }) => {
      return acc + quantity * price;
    }, 0)
);
