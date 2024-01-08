import React, { useEffect } from "react";
import { Button } from "components/Button";
import { BoxCardSuccess, CheckIcon, TittleSucces, TextSucces, TextTwoSucces, BoxButton } from "./styles";

interface SuccessProps {
  message: string;
  orderId: string | null; // Updated type to 'string | null'
}

const SuccessfulPayment: React.FC<SuccessProps> = ({
  message,
  orderId,
}) => {
  useEffect(() => {
    // Lógica para llamar a la API cuando se monte el componente
    if (orderId) {
      callApi(orderId);
    }
  }, [orderId]);

  const callApi = async (cardId: string) => {
    try {
      const response = await fetch(`https://example.com/api/orders/${cardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId }),
      });

      if (response.ok) {
        console.log("Solicitud exitosa a la URL después de confirmar el pago");
      } else {
        console.log("Error en la solicitud a la URL después de confirmar el pago");
      }
    } catch (error) {
      console.log("Error en la solicitud a la URL después de confirmar el pago:", error);
    }
  };

  return (
    <BoxCardSuccess>
      <CheckIcon style={{ fontSize: 100 }} />
      <TittleSucces>El pago ha sido exitoso</TittleSucces>
      <TextSucces>{message}</TextSucces>
      <TextTwoSucces>La confirmación la recibirá por correo</TextTwoSucces>
      <BoxButton>
        <Button height="50px" width="12vw">
          Ver mis órdenes
        </Button>
      </BoxButton>
    </BoxCardSuccess>
  );
};

export default SuccessfulPayment;
