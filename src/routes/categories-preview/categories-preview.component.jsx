import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { CategoryShop } from "../../components/category-shop/category-shop.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryShop key={title} title={title} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
