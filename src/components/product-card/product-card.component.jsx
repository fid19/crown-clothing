import { ShoppingContext } from "../../contexts/shopping-bag.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useContext } from "react";
import { ProductCardContainer } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(ShoppingContext);

  const addProductToCart = () => addItemToCart(product);

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
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
