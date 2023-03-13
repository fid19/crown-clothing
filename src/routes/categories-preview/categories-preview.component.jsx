import { useContext, Fragment } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { CategoryShop } from "../../components/category-shop/category-shop.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { SplashScreen } from "../../components/splashscreen/splashscreen.component";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);

  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryShop key={title} title={title} products={products} />
            );
          })}
        </>
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
