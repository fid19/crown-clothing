import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles.jsx";
import { signOutUser } from "../../utils/firebase/firebase.utils";
// import { UserContext } from "../../contexts/user.contexts";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ShoppingContext } from "../../contexts/shopping-bag.context";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const NavigationBar = () => {
  // const { currentUser } = useContext(UserContext);
  // const { shoppingBag } = useContext(ShoppingContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen ? <CartDropdown /> : ""}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
