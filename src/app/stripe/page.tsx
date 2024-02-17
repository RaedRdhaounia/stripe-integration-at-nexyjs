"use client"
import React from "react";
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";


const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, {locale: "fr"});

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    async function getStripeElements() {
      try {
        const response = await axios.post("/api/create-payment-intent", { items: [{ id: "xl-tshirt" }] }, {headers:{ "Content-Type": "application/json" }})
        console.log(response.data)
        setClientSecret(response.data.data[0].client_secret)
      } catch (error) {
        console.log(error)
      }
    }
    getStripeElements()
  }, []);

  const appearance: Appearance = {
    theme: 'flat',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}