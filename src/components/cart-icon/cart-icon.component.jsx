import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import "./cart-icon.styles.scss";
import { useContext } from "react";

const CartIcon = () => {
  const { shoppingBag, setShoppingBag } = useContext(ShoppingContext);

  const { cartCount } = useContext(ShoppingContext);

  return (
    <div
      onClick={() => {
        setShoppingBag(!shoppingBag);
      }}
      className="cart-icon-container"
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
