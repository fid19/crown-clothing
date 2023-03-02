import Button from "../button/button.component";
import { CartItem } from "../cart-item/cart-item.component";
import { createContext, useContext } from "react";
import { ShoppingContext } from "../../contexts/shopping-bag.context";

import { useNavigate } from "react-router-dom";
import { CartDropDownContainer, CartItems } from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span>Your Cart is Empty</span>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
