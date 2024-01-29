"use client";

import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <Button className="checkout" textOnly onClick={handleShowCart}>
      <FiShoppingCart className="cart-icon" /> ({totalCartItems})
    </Button>
  );
}
