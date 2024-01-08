import React from "react";
import { Card } from "components/Card";
import {
  ContentCardContainer,
  ContentCardTitle,
  ContentCardTitleText,
  ContentCardTitleTextRight,
  ContentCardTitleTextLeft,
  TextOfClient,
} from "./styles";
import LinearProgress from "@mui/material/LinearProgress";

const FirstCardSection = ({ request, setRequest }: any) => {
  const formattedDate = request.date
    ? request.date.substring(0, request.date.indexOf("T"))
    : "";

  return (
    <Card
      border="none"
      borderRadius="Small"
      color="#FFFFFF"
      cursor="default"
      height="100%"
      hoverColor="#CBD0D0"
      hasHoverColor={false}
      margin="2rem 0"
      padding="0px"
      shadow=" 20px 20px 7px rgba(0, 0, 0, 0.3)"
      width="90%"
      children={
        <ContentCardContainer>
          <ContentCardTitle>
            <h3>Información del cliente</h3>
          </ContentCardTitle>

          <ContentCardTitleText>
            <ContentCardTitleTextLeft>
              <h4>Nombre</h4>

              {!request.contactName ? (
                <LinearProgress />
              ) : (
                <TextOfClient>{request.contactName}</TextOfClient>
              )}

              <h4>Dirección</h4>

              {!request.direction ? (
                <LinearProgress />
              ) : (
                <TextOfClient>{request.direction}</TextOfClient>
              )}
            </ContentCardTitleTextLeft>

            <ContentCardTitleTextRight>
              <h4>Información de contacto</h4>
              {!request.contactEmail ? (
                <LinearProgress />
              ) : (
                <TextOfClient>{request.contactEmail}</TextOfClient>
              )}
              <h4>Grupo a registrar</h4>
              {!request.groupName ? (
                <LinearProgress />
              ) : (
                <TextOfClient>{request.groupName}</TextOfClient>
              )}

              <h4>Fecha de soliitud</h4>
              {!formattedDate ? (
                <LinearProgress />
              ) : (
                <TextOfClient>{formattedDate}</TextOfClient>
              )}
            </ContentCardTitleTextRight>
          </ContentCardTitleText>
        </ContentCardContainer>
      }
    />
  );
};

export default FirstCardSection;
