import { useEffect, useContext } from "react";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import "./checkoutpage.styles.scss";
import { CartItem } from "../cart-item/cart-item.component";
import { CheckoutItem } from "../checkout-item/checkout-item.component";

export const CheckoutPage = () => {
  const { cartItems, setShoppingBag, totalPrice } = useContext(ShoppingContext);

  useEffect(() => {
    setShoppingBag(false);
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Produce</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cart) => (
        <CheckoutItem key={cart.id} cartItem={cart} />
      ))}
      <span className="total">Total: ${totalPrice}</span>
    </div>
  );
};
