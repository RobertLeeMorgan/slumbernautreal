"use client";

import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const form = useRef();

  useEffect(() => emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_KEY), []);

  const sendEmail = async (e) => {
    e.preventDefault();
    await toast
      .promise(
        emailjs.sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE_ID,
          form.current
        ),
        {
          pending: "Subscribing...",
          success: "You have successfully subscribed!",
          error: "There was an issue, please try again later.",
        }
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <footer>
      <form
        ref={form}
        id="newsletter"
        aria-label="newsletter"
        onSubmit={sendEmail}
      >
        <div className="newsletter">
          <label className="label">
            Sign up for the newsletter:
            <input
              className="input"
              type="email"
              name="user_email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
            <button className="submit" type="submit" aria-label="Submit">
              Subscribe
            </button>
          </label>
        </div>
      </form>
      <ToastContainer position="bottom-center" theme="dark" />
      <h4 className="copy">&copy; Slumbernaut 2024</h4>
    </footer>
  );
}
