import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CreditCardExp } from "../../../CreditCardExpSelect/CreditCardExpSelect";
import { CardAdd } from "../../../CardAdd";
import { useAppContext } from "store/app-context/app-context";
import { fetchPaymentMethods } from "../../../CreditCard/fetchPaymentMethods";

import "./Payment.css"; // Importa el archivo CSS personalizado

const stripePromise = loadStripe("pk_live_51N53qTAW1QMD0rARICgZskJ3J7kiq1iVMZyJNyldKDo8OxP6dTcBt518JgfJaDJR2nqTTDtBjheHlXTBpSJsFfQ100bveJgXxG");

const SetupForm = ({ options, handlePaymentConfirmed }) => {
  const stripe = useStripe();
  
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    const { error, setupIntent } = await stripe.confirmCardSetup(options.clientSecret, {
      payment_method: {
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          // Billing details if needed
        },
      },
      confirmParams: {
        return_url: null, // Set the return_url to null to avoid redirection
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      handlePaymentConfirmed(setupIntent.payment_method);
    }
  };

  return (
    <form className="setup-form" onSubmit={handleSubmit}>
      <CardElement options={options} />
      <button type="submit" disabled={!stripe}>
        Confirm
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga de datos

  useEffect(() => {
    fetch("https://stripee-production.up.railway.app/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const cardStyle = {
    style: {
      base: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
    },
  };
  const appearance = {
    theme: "stripe",
  };
  const options = {
    cardStyle,
    clientSecret,
    appearance,
  };

  const handlePaymentConfirmed = (paymentMethod) => {
    // Handle payment confirmation logic here
    console.log("Payment confirmed:", paymentMethod);
    setPaymentConfirmed(true);
    setShowCards(true);
  };

  const handleAddCard = (card) => {
    setCards((prevCards) => [...prevCards, card]);
  };

  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const appContext = useAppContext();
  const customerName = appContext.user?.name;
  useEffect(() => {
    // Llamar a la función fetchPaymentMethods solo cuando sea necesario
    if (showCards) {
      fetchPaymentMethods(setCards);
    }
  }, [showCards]);

  return (
    <div className="payment-container">
      {clientSecret && !paymentConfirmed && (
        <Elements options={options} stripe={stripePromise}>
          <SetupForm options={options} handlePaymentConfirmed={handlePaymentConfirmed} />
        </Elements>
      )}
      {paymentConfirmed && (
        <div className="cards-container">
          {showCards && (
            <div className="cards-wrapper">
              {cards.map((card) => ({
                ...card,
                customerName: customerName?.toString(),
              })).map((updatedCard) => (
                <div key={updatedCard.id} className="card-wrapper">
                  <CreditCardExp cards={[updatedCard]} onDeleteCard={handleDeleteCard} />
                </div>
              ))}
              
            </div>
          )}
          {loading && <div className="loader">Loading...</div>} {/* Mostrar el loader mientras se carga */}
        </div>
      )}
      {error && <div>Error fetching client secret</div>}
    </div>
  );
}
