import { useEffect, lazy, Suspense } from "react";
// import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
// import NavigationBar from "./routes/navigation/navigation.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import { Checkout } from "./routes/checkout/checkout.component";
import { SplashScreen } from "./components/splashscreen/splashscreen.component";

// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener,
// } from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import { GlobalStyle } from "./global.styles";

const NavigationBar = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Home = lazy(() => import("./routes/home/home.component"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;
  }, []);

  return (
    <Suspense fallback={<SplashScreen />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" exact element={<Authentication />} />
          <Route path="checkout" exact element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
