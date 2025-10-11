"use client";

import { useContext, useRef, useActionState, useEffect } from "react";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
import { currencyFormatter } from "./util/formatting";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./Error";
import { placeOrder } from "../../lib/order";
import FormSubmit from "./FormSubmit";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [state, formAction] = useActionState(placeOrder, { message: null });
  const formRef = useRef();

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
  }

  useEffect(() => {
    if (state.message === "Order created!") {
      formRef.current?.reset();
    }
  }, [state.message]);

  if (state.message === "Order created!") {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          (This store contains fake products; no order has actually been placed.)
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction} ref={formRef}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Post Code" type="text" id="postcode" />
          <Input label="City" type="text" id="city" />
        </div>
        <input
          type="hidden"
          name="order"
          value={JSON.stringify(cartCtx.items)}
        />
        {state.message && state.message !== "Order created!" && (
          <Error title="Failed to submit order" message={state.message} />
        )}
        <p className="modal-actions">
          <Button onClick={handleClose} textOnly type="button">
            Close
          </Button>
          <FormSubmit />
        </p>
      </form>
    </Modal>
  );
}
