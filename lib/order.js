"use server";

import fs from "fs/promises";

function validText(text) {
  return !text || text.trim() === "";
}

export async function placeOrder(prevState, formData) {

  const customerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    street: formData.get("street"),
    postcode: formData.get("postcode"),
    city: formData.get("city"),
    order: JSON.parse(formData.get('order')),
  };

  if (
    validText(customerData.email) ||
    !customerData.email.includes("@") ||
    validText(customerData.name) ||
    validText(customerData.street) ||
    validText(customerData.postcode) ||
    validText(customerData.city)
  ) {
    return {
      message:
        "Missing data: Email, name, street, post code or city is missing.",
    };
  }

  JSON.stringify(customerData)

  const orders = await fs.readFile("./orders.json", "utf8");

  const allOrders = JSON.parse(orders);
  allOrders.push(customerData);
  await fs.writeFile("./orders.json", JSON.stringify(allOrders));
  return prevState, { message: "Order created!" };
}
