import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from 'react-router-dom';
import { getVehicleById } from 'services';

export default function Paypal() {
  const location = useLocation();
  const dataVehicleId = location.state?.data.vehicleId;
  const [vehicle, setVehicle] = useState(null);

  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState("");

  const handleGetVehicle = async () => {
    try {
      const response = await getVehicleById(dataVehicleId);
      if (response && response.data) {
        setVehicle(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetVehicle();
  }, []);

  // Crea una orden de PayPal
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Girasol",
            amount: {
              value: vehicle ? vehicle.price : "0.00", // Obtiene el precio del vehículo si está disponible
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // Verifica la aprobación del pago
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  // Captura los errores
  const onError = (data, actions) => {
    setErrorMessage("An Error occurred with your payment");
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AR1h-pZJguurLYd1nuRQTIsQ1OThWOFgRu-IcGjKh70WNn6XvCwKrSGxM56kxNsw4En01ERc3hTsjUjn",
        currency: "MXN",
      }}
    >
      {show && (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      )}
    </PayPalScriptProvider>
  );
}
