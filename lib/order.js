"use server";

import fs from "fs/promises";
import path from "path";

function isInvalid(text) {
  return !text || text.trim() === "";
}

export async function placeOrder(prevState, formData) {
  try {
    const customerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      street: formData.get("street"),
      postcode: formData.get("postcode"),
      city: formData.get("city"),
      order: JSON.parse(formData.get("order") || "[]"),
      date: new Date().toISOString(),
    };

    if (
      isInvalid(customerData.name) ||
      isInvalid(customerData.street) ||
      isInvalid(customerData.postcode) ||
      isInvalid(customerData.city) ||
      isInvalid(customerData.email) ||
      !customerData.email.includes("@")
    ) {
      return { message: "Please fill out all required fields correctly." };
    }

    const ordersFile = path.resolve("./orders.json");

    try {
      await fs.access(ordersFile);
    } catch {
      await fs.writeFile(ordersFile, "[]");
    }

    const orders = JSON.parse(await fs.readFile(ordersFile, "utf8"));
    orders.push(customerData);

    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

    return {
      ...prevState,
      message: "✅ Order created successfully!",
    };
  } catch (err) {
    console.error("Order creation failed:", err);
    return {
      ...prevState,
      message: "❌ Failed to create order. Please try again.",
    };
  }
}
