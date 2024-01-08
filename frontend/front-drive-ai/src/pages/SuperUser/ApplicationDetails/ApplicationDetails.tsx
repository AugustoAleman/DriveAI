import React, { useState } from "react";
import {
  Content,
  Container,
  Filters,
  ContainerCards,
  Client,
  ContainerCardsRow,
} from "./styles";
import { ButtonsSection } from "./Partials/ButtonsSection";
import { FourthCardSection } from "./Partials/FourthCardSection";
import { ThirdCardSection } from "./Partials/ThirdCardSection";
import { SecondCardSection } from "./Partials/SecondCardSection";
import { FirstCardSection } from "./Partials/FirstCardSection";
import { HeaderAdminCards } from "components/HeaderAdminCards";

import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";

import { Button } from "components/Button";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useParams } from "react-router-dom";
import { useStyles } from "./styles";
import { getRequestsById } from "services";
import { useEffect } from "react";

const ApplicationDetails = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const classes = useStyles();
  const { id } = useParams<string>();
  const [status, setStatus] = useState("");
  const [severityMessage, setSeverity] = useState<AlertColor | undefined>(
    "info"
  );

  const getRequestsResponse = async () => {
    console.log("Getting request by id in main section");
    await getRequestsById(id!)
      .then((res) => {
        if (res && res.data) {
          console.log("Request by id: ", res.data);

          setRequests(res.data);

          setStatus(res.data.status);

          if (res.data.status === "PENDING") {
            setSeverity("warning");
          } else if (res.data.status === "REJECTED") {
            setSeverity("error");
          } else if (res.data.status === "ACCEPTED") {
            setSeverity("success");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //If the id that you receive is already in the local storage, then you have to get the request from the local storage
    if (localStorage.getItem("request") !== null) {
      console.log("Getting request from local storage");
      //print local storage
      console.log(localStorage.getItem("request"));

      const request = localStorage.getItem("request");
      if (request) {
        setRequests(JSON.parse(request));
      }
    } else {
      getRequestsResponse();
    }
  }, []);

  return (
    <Container>
      <div className={classes.StaticHeader}>
        <HeaderAdminCards
          about="requests"
          activeTab="general"
          onTabClick={() => {}}
          tabs={[]}
          details={true}
          title={`#${id!}`}
          dateEvent="12 de Enero del 2023"
        />
      </div>

      <Content>
        <Filters>
          <BusinessCenterOutlinedIcon />

          <Button
            onClick={() => {
              console.log(requests);
            }}
            variant="text"
            width="max-content"
            color="#000000"
          >
            Imprimir Solicitud
          </Button>

          <Alert severity={severityMessage}>
            La alerta actualmente esta definida en {status}
          </Alert>
        </Filters>

        <ContainerCards>
          <ContainerCardsRow>
            <FirstCardSection request={requests} setRequest={setRequests} />

            <SecondCardSection />
          </ContainerCardsRow>

          <ContainerCardsRow>
            <ThirdCardSection request={requests} setRequest={setRequests} />

            <FourthCardSection request={requests} setRequest={setRequests} />
          </ContainerCardsRow>
        </ContainerCards>

        <ButtonsSection request={requests} setRequest={setRequests} />
      </Content>
    </Container>
  );
};

export default ApplicationDetails;
