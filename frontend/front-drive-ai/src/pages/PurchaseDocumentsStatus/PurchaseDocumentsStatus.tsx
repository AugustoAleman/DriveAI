import React from "react";
import { MainContainer } from "./styles";
import Accepted from "components/AcceptedDocument/AcceptedD";
import { RefuseD } from "components/RefusedDocument";
import { ReviewD } from "components/ReviewDocument";

function renderStatus(status: string) {
    switch (status) {
        case "approved":
            return <Accepted
                bgcolor="#ffffff"
                colorAccepted="#48ac8c"
                colorFour="#78787b"
                colorOne="#000000"
                colorSix="#78787b"
                colorTwo="#000000"
                textEight="Ok"
                textFour="Ya puedes continuar con tu proceso"
                textOne="Confirmación de documentos"
                textSix="Tus documentos han sido verificados"
                textTwo="¡Todo Listo!"
            />;
        case "rejected":
            return <RefuseD
                bgcolor="#ffffff"
                colorFour="#78787b"
                colorOne="#000000"
                colorRefused="#e04c74"
                colorSix="#78787b"
                colorTwo="#000000"
                textEight="Volver a subir documentos"
                textFour="Para más detalles consulta tu correo electrónico"
                textOne="Confirmación de documentos"
                textSix="Tus documentos fueron rechazados"
                textTwo="Lo sentimos"
            />;
        case "pending":
            return <ReviewD
                bgcolor="#ffffff"
                colorFour="#78787b"
                colorOne="#000000"
                colorReview="#383434"
                colorSix="#78787b"
                colorTwo="#000000"
                textEight="Ok"
                textFour="Nos pondremos en contacto contigo una vez que sean validados"
                textOne="Confirmación de documentos"
                textSix="Hemos recibido tus documentos"
                textTwo="Tus documentos están en revisión"
            />;
        default:
            return "Invalid status";
    }
}

const PurchaseDocumentsStatus = () => {
    // pending approved rejected
    const status = "rejected"

    return <div className="MainContainer">
        {renderStatus(status)}
    </div>;
};

export default PurchaseDocumentsStatus;
