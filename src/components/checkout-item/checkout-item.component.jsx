// import { useContext } from "react";
// import { ShoppingContext } from "../../contexts/shopping-bag.context";
import { useDispatch, useSelector } from "react-redux";
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
import {
  addItemToCart,
  removeEntireCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

export const CheckoutItem = ({ cartItem, removeFunc }) => {
  // const { addItemToCart, removeEntireCart, removeItemFromCart } =
  //   useContext(ShoppingContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { id, name, imageUrl, price, quantity } = cartItem;

  const removeEntireCartHandler = () =>
    dispatch(removeEntireCart(cartItems, id));

  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));

  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItems, id));

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
