import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.contexts";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ShoppingContext } from "../../contexts/shopping-bag.context";

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);
  const { shoppingBag } = useContext(ShoppingContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" to="/signout" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {shoppingBag ? <CartDropdown /> : ""}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
