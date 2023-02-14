import { useContext } from "react";
import "./checkout-item.styles.scss";
import { ShoppingContext } from "../../contexts/shopping-bag.context";

export const CheckoutItem = ({ cartItem, removeFunc }) => {
  const { addItemToCart, removeEntireCart, removeItemFromCart } =
    useContext(ShoppingContext);

  const { id, name, imageUrl, price, quantity } = cartItem;

  const removeEntireCartHandler = () => removeEntireCart(id);

  const addItemToCartHandler = () => addItemToCart(cartItem);

  const removeItemFromCartHandler = () => removeItemFromCart(id);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <div className="remove-button" onClick={removeEntireCartHandler}>
        &#10005;
      </div>
    </div>
  );
};
