import Cart from "../../components/merch/Cart";
import Checkout from "../../components/merch/Checkout";
import Vinyls from "../../components/merch/Vinyls";
import Header from "../../components/merch/Header";
import { CartContextProvider } from "../../components/merch/store/CartContext";
import { UserProgressContextProvider } from "../../components/merch/store/UserProgressContext";

function Merch() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Vinyls />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default Merch;
