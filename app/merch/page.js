import Cart from "../../components/merch/Cart";
import Checkout from "../../components/merch/Checkout";
import Vinyls from "../../components/merch/Vinyls";
import Header from "../../components/merch/Header";

function Merch() {
  return (
    <>
      <Header />
      <Vinyls />
      <Cart />
      <Checkout />
    </>
  );
}

export default Merch;
