import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const ShoppingContext = createContext({
  shoppingBag: false,
  setShoppingBag: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeEntireCart: () => {},
  totalPrice: 0,
});

const INITIAL_STATE = {
  shoppingBag: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

export const USER_ACTION_TYPES = {
  SET_SHOPPING_BAG: "SET_SHOPPING_BAG",
  SET_ITEMS: "SET_ITEMS",
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_ITEMS:
      return {
        ...state,
        ...payload,
      };
    // case USER_ACTION_TYPES.SET_CART_COUNT:
    //   return {
    //     ...state,
    //     cartCount: payload,
    //   };

    // case USER_ACTION_TYPES.SET_TOTAL_PRICE:
    //   return {
    //     ...state,
    //     totalPrice: payload,
    //   };

    // case USER_ACTION_TYPES.SET_CART_ITEMS:
    //   return {
    //     ...state,
    //     cartItems: payload,
    //   };

    case USER_ACTION_TYPES.SET_SHOPPING_BAG:
      return {
        ...state,
        shoppingBag: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in shopReducer`);
  }
};

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

export const ShoppingProvider = ({ children }) => {
  // const [shoppingBag, setShoppingBag] = useState(false);

  // const [cartItems, setCartItems] = useState([]);

  // const [cartCount, setCartCount] = useState(0);

  // const [totalPrice, setTotalPrice] = useState(0);

  const [{ shoppingBag, cartItems, cartCount, totalPrice }, dispatch] =
    useReducer(shopReducer, INITIAL_STATE);

  // const setCartCount = (count) => {
  //   dispatch({ type: USER_ACTION_TYPES.SET_CART_COUNT, payload: count });
  // };

  // const setTotalPrice = (price) => {
  //   dispatch({ type: USER_ACTION_TYPES.SET_TOTAL_PRICE, payload: price });
  // };

  const setCartItems = (items) => {
    const newCartCount = items.reduce((prevVal, { quantity }) => {
      return prevVal + quantity;
    }, 0);

    const newCartTotal = items.reduce((prevVal, { price, quantity }) => {
      return price * quantity + prevVal;
    }, 0);

    dispatch(
      createAction(USER_ACTION_TYPES.SET_ITEMS, {
        cartItems: items,
        cartCount: newCartCount,
        totalPrice: newCartTotal,
      })
    );
  };

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((prevVal, { quantity }) => {
  //     return prevVal + quantity;
  //   }, 0);

  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce((prevVal, { price, quantity }) => {
  //     return price * quantity + prevVal;
  //   }, 0);

  //   setTotalPrice(newCartTotal);
  // }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productId) => {
    setCartItems(removeCartItem(cartItems, productId));
  };

  const removeEntireCart = (productId) => {
    setCartItems(removeEntireCartItem(cartItems, productId));
  };

  const setShoppingBag = (shoppingBag) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_SHOPPING_BAG, shoppingBag));
  };

  const value = {
    shoppingBag,
    setShoppingBag,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    removeEntireCart,
    totalPrice,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};
