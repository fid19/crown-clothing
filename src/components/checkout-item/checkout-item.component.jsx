import { useContext } from "react";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles";

export const CheckoutItem = ({ cartItem, removeFunc }) => {
  const { addItemToCart, removeEntireCart, removeItemFromCart } =
    useContext(ShoppingContext);

  const { id, name, imageUrl, price, quantity } = cartItem;

  const removeEntireCartHandler = () => removeEntireCart(id);

  const addItemToCartHandler = () => addItemToCart(cartItem);

  const removeItemFromCartHandler = () => removeItemFromCart(id);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>

      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </Quantity>

      <Price>{price}</Price>

      <RemoveButton onClick={removeEntireCartHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
