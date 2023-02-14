import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import { Checkout } from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" exact element={<Shop />} />
        <Route path="auth" exact element={<Authentication />} />
        <Route path="checkout" exact element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
