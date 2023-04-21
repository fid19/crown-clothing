import { useDispatch, useSelector } from "react-redux";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import { useContext } from "react";
import { ProductCardContainer } from "./product-card.styles";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(ShoppingContext);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        {" "}
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
