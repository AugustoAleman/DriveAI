// Import styles
import {
  PageBackground,
  FirstRowContainer,
  StepperDiv,
  CardsHorizontal,
  CardLeftContent,
  ContentRightCard,
  CardRightContent,
} from "./styles";

// Import componentes
import { Card } from "components/Card";
import { IconButtonAdmin } from "components/IconButtonAdmin";
import { StepperAdmin } from "components/StepperAdmin";

// Import icons
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useLocation, useNavigate} from "react-router-dom";

// Import types
import {RequestDocuments} from "../../../../components/RequestDocuments";
import {useEffect, useState} from "react";
import {getUserById} from "../../../../services/User-ms/getUserById";
import {UserObject} from "../../../../store/app-context/types";
import {SendbirdVendorChat} from "../../../../components/SendbirdChat";

// Get sales data from the API
const salesData = {
  client_name: "Ivan",
  client_last_name: "Gonzalez",
  client_email: "ivan@gonzales.com",
  client_phone: "5555555555",
  sales_id: "#SK0118",
  vehicle_brand: "Kia",
  final_price: 200000,
  insurance: "Ninguno",
  finance: "Selectivit",
};

const ModalPage = () => {
  const { state: { type, userId, name, surname, description, status } } = useLocation();
  const [ client, setClient ] = useState<UserObject>();

  const navigate = useNavigate();
  const location = useLocation();

  console.log("State received in modal page:", useLocation);

  useEffect(() => {
    console.log("users", location.state)
    userId && getUserById(location.state.userId)
      .then(data => setClient(data))
      .catch(() => console.error("User not found"))
  }, [userId])

  const handleClick = () => {
    // This function will be called when the icon is clicked
    navigate(-1);
  };

  const DocumentsCard = () => {
    return (
      <Card
        border="None"
        borderRadius="None"
        color="#FFFFFF"
        cursor="default"
        height="auto"
        hoverColor="#CBD0D0"
        margin="0px"
        padding="0 0 0 10px"
        shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
        width="90%"
      >
        <CardLeftContent>
          <h2>Documentos</h2>
          <RequestDocuments operationType={type} userId={userId} />
        </CardLeftContent>
      </Card>
    )
  }

  return (
    <>
      <PageBackground>

        <Card
          width="95%"
          height="auto"
          margin="1.2rem"
          padding="1.2rem"
          borderRadius="None"
          cursor="default"
        >
          {/* El FirstRowContainer es el contenedor de la parte superior de la pagina, donde se encuentra el boton de regresar, el titulo de la pagina y el stepper. */}
          <FirstRowContainer>
            <IconButtonAdmin width="2rem" height="2rem">
              <KeyboardBackspaceIcon
                style={{
                  fontSize: 40,
                  color: "#18181b",
                  cursor: "pointer",
                }}
                onClick={handleClick} // Add the onClick event handler
              />
            </IconButtonAdmin>
            <h2>Venta {userId}</h2>

            <StepperDiv>
              <StepperAdmin
                // Here endpoint to currentStep has to be called
                currentStep={null}
                steps={[
                  "Primer contacto",
                  "Documentos",
                  "Prueba de manejo",
                  "Pago enganche",
                  "Pago final",
                  "Entregado",
                ]}
              />
            </StepperDiv>
          </FirstRowContainer>

          {/* Aqui empieza la parte de la pagina donde se encuentran los documentos y la informacion del cliente y el seguro. */}
          <CardsHorizontal>
            {DocumentsCard()}
            <Card
              border="None"
              borderRadius="None"
              color="#FFFFFF"
              cursor="default"
              height="auto"
              hoverColor="#CBD0D0"
              margin="0px"
              padding="0 0 0 10px"
              shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
              width="90%"
            >
              <ContentRightCard>
                <CardRightContent>
                  <h2>Cliente</h2>
                  <p>{name}</p>
                  <p>{surname}</p>
                </CardRightContent>

                <CardRightContent>
                  <h2>Status</h2>
                  <p>{status}</p>
                </CardRightContent>

                <CardRightContent>
                  <h2>Descripción</h2>
                  <p>{description}</p>
                </CardRightContent>
              </ContentRightCard>
            </Card>
          </CardsHorizontal>

          <Card
            border="none"
            borderRadius="Small"
            color="#FFFFFF"
            cursor="default"
            height="auto"
            hoverColor="#CBD0D0"
            margin="2rem auto 0 auto"
            padding="0px"
            shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
            width="90%"
          >
            {client && <SendbirdVendorChat client={{ id: client.id, nickname: `${client.name} ${client.surname}`}}/>}
          </Card>
        </Card>
      </PageBackground>
    </>
  );
};

export default ModalPage;
