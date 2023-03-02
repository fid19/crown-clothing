import { useEffect, useContext } from "react";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import { CartItem } from "../cart-item/cart-item.component";
import { CheckoutItem } from "../checkout-item/checkout-item.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkoutpage.styles";

export const CheckoutPage = () => {
  const { cartItems, setShoppingBag, totalPrice } = useContext(ShoppingContext);

  useEffect(() => {
    setShoppingBag(false);
  }, []);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Produce</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cart) => (
        <CheckoutItem key={cart.id} cartItem={cart} />
      ))}
      <Total>Total: ${totalPrice}</Total>
    </CheckoutContainer>
  );
};
