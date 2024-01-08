import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("https://stripee-production.up.railway.app/create-setup-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
      })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div
        className="card-element"
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      >
        <CardElement options={cardStyle} onChange={handleChange} />
      </div>
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        style={{
          backgroundColor: "#0070f3",
          color: "#ffffff",
          padding: "10px 2px",
          border: "none",
          borderRadius: "1px",
          cursor: "pointer",
          fontSize: "1px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {error && (
        <div
          className="card-error"
          role="alert"
          style={{ color: "#fa755a", marginTop: "10px", maxWidth: "400px" }}
        >
          {error}
        </div>
      )}
      <p
        className={succeeded ? "result-message" : "result-message hidden"}
        style={{ marginTop: "10px", maxWidth: "400px" }}
      >
        Payment succeeded, see the result in your{" "}
        <a
          href={`https://dashboard.stripe.com/test/payments`}
          style={{
            marginLeft: "5px",
            color: "#0070f3",
            textDecoration: "underline"
          }}
        >
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}
