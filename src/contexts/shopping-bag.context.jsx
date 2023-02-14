import { useState, createContext, useEffect } from "react";

export const ShoppingContext = createContext({
  shoppingBag: false,
  setShoppingBag: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeEntireCart: () => {},
  totalPrice: 0,
});

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
  const [shoppingBag, setShoppingBag] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((prevVal, { quantity }) => {
      return prevVal + quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((prevVal, { price, quantity }) => {
      return price * quantity + prevVal;
    }, 0);

    setTotalPrice(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productId) => {
    setCartItems(removeCartItem(cartItems, productId));
  };

  const removeEntireCart = (productId) => {
    setCartItems(removeEntireCartItem(cartItems, productId));
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
