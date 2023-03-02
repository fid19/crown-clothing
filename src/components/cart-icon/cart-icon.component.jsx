import { ShoppingContext } from "../../contexts/shopping-bag.context";
import { useContext } from "react";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { shoppingBag, setShoppingBag } = useContext(ShoppingContext);

  const { cartCount } = useContext(ShoppingContext);

  return (
    <CartIconContainer
      onClick={() => {
        setShoppingBag(!shoppingBag);
      }}
    >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
