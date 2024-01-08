import React, { useEffect, useRef, useState } from 'react'
import { QuoterWizard } from './partials/QuoterWizard'
import { VehicleSelectionInformation } from './partials/VehicleSelectionInformation'
import { DrivingTestWizard } from './partials/DrivingTestWizard'
import { Modal } from '@mui/material'

import { CardContainer, CardContent, ElementsQWT, QuoterWizardTitleWrapper, QuoterWizardWrapper, SectionTitle, WizardDividerWrapper, ConfirmationInfoWrapper, DivTicket, RowConfirmation, TicketHeader, TicketImage, TicketInfo, TicketTitle } from './styles'

import { Card } from 'components/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { getVehicleInfoById } from 'services'
import { VehicleDto } from './types'
import { Button } from 'components/Button';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink  } from '@react-pdf/renderer';
import { GeneratorPDF } from './partials/GeneratorTicket';
        
import {SendbirdClientChat} from "../../components/SendbirdChat";
import {useAppContext} from "store/app-context/app-context";

const VehicleSelectionCard = () => {
  
  const [showModal, setShowModal] = React.useState(false);
  const [showModalTicket, setShowModalTicket] = React.useState(false);

  const [vehicleData, setVehicleData] = useState<VehicleDto>();

  const refToQuote = useRef<HTMLDivElement>(null);
  const { vehicleId } = useParams();
  const { loggedIn } = useAppContext();

  const [data, setData] = useState<any>(null);

  const handleClickToQuote = () => {
    if (refToQuote.current) {
      refToQuote.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleGetVehicle = async () => {
    await getVehicleInfoById(vehicleId).then((res: any) => {
      if (res && res.data) {
        console.log("THIS IS THE OBJ");
        console.log(res.data);
        setVehicleData(res.data);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  const onSendDrivingTest = (ticket:any) => {
    setData(ticket);
    console.log(data)
    console.log(ticket)
    

    //navigate(`/driving-test-ticket/${6}`, {state:{data: ticket}})


    //wait three seconds
    const timeout = setTimeout(() => {
      setShowModal(false);
      setShowModalTicket(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }

  const checkForNullDate = () => {
    if(data.fecha == null) return "NaN";
    return data.fecha.format('DD/MM/YYYY HH:mm').toString();
};

  useEffect(() => {
    handleGetVehicle();
  }, [])

  return (
    <div>
      <VehicleSelectionInformation
        onClickDrivinTest={() => {
          setShowModal(true);
        }}
        onClickQuote={() => {
          handleClickToQuote();
        }}
        vehicleObj={vehicleData}
      />

      <QuoterWizardWrapper>
        <WizardDividerWrapper>
          <QuoterWizardTitleWrapper>
            <ElementsQWT>
              <SectionTitle>Cotiza tus pagos - ¡Conoce nuestra herramienta!</SectionTitle>
            </ElementsQWT>
          </QuoterWizardTitleWrapper>
          
        </WizardDividerWrapper>
        <div ref={refToQuote}>
            <QuoterWizard isLoggedIn={loggedIn} vehicleId={ vehicleId ? parseInt(vehicleId, 10) : 0 } />
        </div>
      </QuoterWizardWrapper>

      <div>
        <Modal
          open={showModal}
          onClose={() => { setShowModal(false) }}
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CardContainer>
            <Card
              height='100%'
              width='100%'
              hasHoverColor={false}
              cursor='default'
              borderRadius='None'
            >
              <CardContent>
                <DrivingTestWizard 
                  carInfo={{ 
                    id: vehicleData?.vehicleId, 
                    brand: vehicleData?.brand, 
                    subBrand: vehicleData?.subBrand, 
                    model: vehicleData?.model + "", 
                    imageUrl: (vehicleData?.imageList[0]) ? 
                    vehicleData?.imageList[0].url
                    : "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png"}} 
                  onSend={onSendDrivingTest}
                ></DrivingTestWizard>
              </CardContent>
            </Card>
          </CardContainer>
        </Modal>
      </div>

      <div>
      {
          data !== null ? (
            <Modal
          /*open={showModalTicket}*/
          open={showModalTicket}
          onClose={() => { setShowModalTicket(false) }}
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          
            <Card
              height='80vh'
              width='50%'
              hasHoverColor={false}
              cursor='default'
              borderRadius='None'
            >
              <DivTicket>
                <TicketTitle>Confirmacion de prueba de manejo </TicketTitle>
                <TicketImage src={data.image}></TicketImage>
                <ConfirmationInfoWrapper>
                  <RowConfirmation>
                    <TicketHeader>Fecha</TicketHeader>
                    <TicketInfo>{checkForNullDate()}</TicketInfo>
                  </RowConfirmation>
                  <RowConfirmation>
                    <TicketHeader>Marca</TicketHeader>
                    <TicketInfo>{data.marca}</TicketInfo>
                  </RowConfirmation>
                  <RowConfirmation>
                    <TicketHeader>Submarca</TicketHeader>
                    <TicketInfo>{data.submarca}</TicketInfo>
                  </RowConfirmation>
                  <RowConfirmation>
                    <TicketHeader>Modelo</TicketHeader>
                    <TicketInfo>{data.modelo}</TicketInfo>
                  </RowConfirmation>
                </ConfirmationInfoWrapper>
                <PDFDownloadLink document={<GeneratorPDF dealershipvehicleId={vehicleData?.vehicleId} image={data.image} fecha={checkForNullDate()} marca={data.marca} submarca={data.submarca} modelo={data.modelo} />} fileName="ticket.pdf">
                  <Button >Descargar ticket</Button>
                </PDFDownloadLink>
              </DivTicket>

              
            </Card>
        
          
        </Modal>
          ): null
      }
      
      </div>
      <SendbirdClientChat vendorId={vehicleData?.salesManId} />

    </div>
  )
}

export default VehicleSelectionCard;