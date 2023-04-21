// import { ShoppingContext } from "../../contexts/shopping-bag.context";
// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

const CartIcon = () => {
  // const { shoppingBag, setShoppingBag } = useContext(ShoppingContext);

  // const { cartCount } = useContext(ShoppingContext);

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  return (
    <CartIconContainer
      onClick={() => {
        dispatch(setIsCartOpen(!isCartOpen));
      }}
    >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
