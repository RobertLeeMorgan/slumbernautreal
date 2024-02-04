"use client";

import { useFormStatus } from "react-dom";
import Button from "./UI/Button";

export default function FormSubmit() {
  const { pending } = useFormStatus();
  return (
      <Button disabled={pending}>{pending ? <span>Sending order data...</span> : 'Submit Order'}</Button>
  );
}
