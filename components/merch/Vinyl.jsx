"use client";

import { useContext } from "react";
import { currencyFormatter } from "./util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "./store/CartContext.jsx";
import Image from "next/image.js";

export default function Vinyl({ vinyl }) {
  const cartCtx = useContext(CartContext);
  function handleAddVinylToCart() {
    cartCtx.addItem(vinyl);
  }

  return (
    <li className="vinyl holder">
      <article>
        <div className="vinyl-bg">
          <Image
            src={vinyl.image}
            alt={vinyl.name}
            className="record"
            style={{
              width: "80%",
              height: "auto",
              objectFit: "cover",
            }}
            width={500}
            height={500}
          />
        </div>
        <div>
          <h3>{vinyl.name}</h3>
          <p className="vinyl-price">{currencyFormatter.format(vinyl.price)}</p>
          <p className="vinyl-description">{vinyl.description}</p>
        </div>
        <p>
          <Button className="vinyl-actions" onClick={handleAddVinylToCart}>
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
