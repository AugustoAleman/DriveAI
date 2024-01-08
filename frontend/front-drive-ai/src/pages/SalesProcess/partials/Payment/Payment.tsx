import { useState, useEffect } from "react";
import CustomCard from "./CustomCard/CustomCard";
import { Grid, Container } from "@material-ui/core";
import { PaypalIcon } from "./CreditCardExp/IconsSvgBrands/IconsBRands";
import CardAdd from "./CardAdd/CardAdd";
import Paypal from "./Stripe/Stripe/SetupIntent/PayPal";
import { fetchPaymentMethods } from "./CreditCard/fetchPaymentMethods";
import { Credit, Transfer } from "./CreditCardExp/IconsSvgBrands/IconsBRands";
import Paymentt from "./Stripe/Stripe/PayIntent/Paymentt";
import Payment2 from "./Stripe/Stripe/SetupIntent/Payment";
import { useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { CreditCardExp } from "./CreditCardExpSelect/CreditCardExpSelect";
import { PaymentSummaryy } from "../PaymentSummaryy";
import { ButtonContainer } from "../PaymentSummaryy/styles";
import { SummaryContainer } from './styles';
import { SuccessfulPayment } from '../SuccessfulPayment';
import { useAppContext } from "store/app-context/app-context";
import { Button } from "@mui/material";


const PositionedContainer = styled(Container)`
  margin-top: 1rem;
  float: center;
`;

const SummaryWrapper = styled.div`
  margin-right: -190px; /* Ajusta el margen derecho según tus necesidades */
  width: fit-content;
  margin-left: 70px; /* Ajusta el margen derecho según tus necesidades */

`;

interface Card {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  customerName: string;
  icon: string;
  iconColor: string;
  paymenId: string;
}

function Payment() {
  const isSmallScreen = useMediaQuery("(max-width:769px)");
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetch("https://gateway-rdewcgcrza-uw.a.run.app/v1/sales-process/pay/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const [selectedCard, setSelectedCard] = useState<number | null>(1); // Inicializar con 1
  const [cards, setCards] = useState<Card[]>([]);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const appContext = useAppContext();
  const customerName = appContext.user?.name;
  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    // Llamar a la función fetchPaymentMethods solo cuando sea necesario
    if (selectedCard === 1 || selectedCard === 2) {
      fetchPaymentMethods(setCards);
    }
  }, [selectedCard]);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== cardIndex) {
      setSelectedCard(cardIndex);
      setShowPayment(false);
    }
  };

  const handleAddCard = () => {
    setShowPayment(true);
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };
  const showButtonContainer = false;
  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  return (
    <>
      <PositionedContainer maxWidth="md" style={{ marginTop: "55px" }}>
      <div style={{ display: "flex" }}>
          <div style={{ flex: 10 }}>
            
          <Grid container spacing={10} style={{ maxWidth: "900px" }}>
            <Grid item xs={2} sm={9} md={4}>
                <CustomCard
                  icon={<Credit />}
                  text="Crédito / Débito "
                  selected={selectedCard === 1}
                  onCardClick={() => handleCardClick(1)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomCard
                  icon={<PaypalIcon />}
                  text="PayPal T"
                  selected={selectedCard === 2}
                  onCardClick={() => handleCardClick(2)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomCard
                  icon={<Transfer />}
                  text="Ficha de depósito"
                  selected={selectedCard === 3}
                  onCardClick={() => handleCardClick(3)}
                />
              </Grid>
            </Grid>

            <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
              width: "100%",
              marginLeft: "-8px",
              marginRight: "auto",
              maxWidth: "900px",
            }}
          >
              <div style={{ maxWidth: "900px", flex: 1, marginLeft: "20px" }}>
                {selectedCard === 1 && (
                  <div>
                    <Grid container spacing={2} style={{ justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <div style={{ width: "100%", maxWidth: "600px" }}>
                          {!showPayment && (
        <>
          {cards.map((card) => ({
            ...card,
            customerName: customerName?.toString(),
          })).map((updatedCard) => (
            <div key={updatedCard.id} style={{ marginBottom: "24px" }}>
              <CreditCardExp
                cards={[updatedCard]}
                onDeleteCard={handleDeleteCard}
              />
            </div>
          ))}
          <div style={{ marginBottom: "80px" }}>
            <CardAdd onAddCard={handleAddCard} showPayment={handleAddCard} />
          </div>
        </>
      )}
                            {showPayment && (
                              <div style={{ marginTop: "40px" }}>
                                <div style={{ marginBottom: "40px" }}>
                                  <Payment2 />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}

                {selectedCard === 2 && (
                  <div>
                    <Grid container spacing={2} style={{ justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <div style={{ width: "100%", maxWidth: "990px" }}>
                            {!showPayment && <Paypal />}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}

                {selectedCard === 3 && (
                  <div>
                    <Grid container spacing={2} style={{ justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <div style={{ width: "100%", maxWidth: "600px" }}>
                            {!showPayment && <Paymentt />}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          </div>

          <SummaryWrapper>
            <SummaryContainer>
              <PaymentSummaryy showButtonContainer={showButtonContainer} />
            </SummaryContainer>
          </SummaryWrapper>
        </div>
        {selectedCard && (
          <Button
            onClick={handleOpenPopover}
            style={{ marginLeft: 300, marginTop: 10 }}
            variant="contained"
            color="secondary"
          >
            Realizar Pago
          </Button>
        )}
        {openPopover && (
          <div
            style={{
              width: "600px",
              height: "500px",
              bottom: "990px",
              zIndex: 9000,
              marginTop: 50,
            }}
          > 
            <SuccessfulPayment />
          </div>
        )}
      </PositionedContainer>
    </>
  );
}

export default Payment;
