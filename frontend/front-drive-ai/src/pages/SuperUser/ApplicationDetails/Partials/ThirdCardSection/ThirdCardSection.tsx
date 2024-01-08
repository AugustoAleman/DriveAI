import React from "react";
import { Card } from "components/Card";
import {
  ContentCardContainer3,
  ContentCardTitle3,
  ContentCardContainerDown,
} from "./styles";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";

const label = { inputProps: { "aria-label": "Checkbox1" } };
const label2 = { inputProps: { "aria-label": "Checkbox2" } };
const label3 = { inputProps: { "aria-label": "Checkbox3" } };

const ThirdCardSection = ({ request, setRequest }: any) => {
  
  const [requests, setRequests] = useState<any>([]);

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  useEffect(() => {
    if (request.status === "PENDING") {
      setCheckbox1(true);
      setCheckbox2(false);
      setCheckbox3(false);
    } else if (request.status === "REJECTED") {
      setCheckbox1(false);
      setCheckbox2(true);
      setCheckbox3(false);
    } else if (request.status === "ACCEPTED") {
      setCheckbox1(false);
      setCheckbox2(false);
      setCheckbox3(true);
    }
  }, [request.status]);
  
  console.log(checkbox1, checkbox2, checkbox3);

  const handleCheckbox1Change = (e: any) => {
    setCheckbox1(e.target.checked);
    if (e.target.checked) {
      setCheckbox2(false);
      setCheckbox3(false);
      requests.status = "PENDING";
      console.log("Status: ", requests.status);
      console.log(requests);

      setRequest((prevRequest: any) => ({
        ...prevRequest,
        status: "PENDING",
      }));
    }
  };

  const handleCheckbox2Change = (e: any) => {
    setCheckbox2(e.target.checked);
    if (e.target.checked) {
      setCheckbox1(false);
      setCheckbox3(false);
      requests.status = "REJECTED";
      console.log("Status: ", requests.status);
      console.log(requests);

      setRequest((prevRequest: any) => ({
        ...prevRequest,
        status: "REJECTED",
      }));
    }
  };

  const handleCheckbox3Change = (e: any) => {
    setCheckbox3(e.target.checked);
    if (e.target.checked) {
      setCheckbox1(false);
      setCheckbox2(false);
      requests.status = "ACCEPTED";
      console.log("Status: ", requests.status);
      console.log(requests);

      setRequest((prevRequest: any) => ({
        ...prevRequest,
        status: "ACCEPTED",
      }));
    }
  };

  return (
    <Card
      border="none"
      borderRadius="Medium"
      color="#FFFFFF"
      cursor="default"
      height="auto"
      hoverColor="#CBD0D0"
      hasHoverColor={false}
      margin="2rem 0"
      padding="0px"
      shadow=" 20px 20px 7px rgba(0, 0, 0, 0.3)"
      width="90%"
      children={
        <ContentCardContainer3>
          <ContentCardTitle3>
            <h3>Acciones a tomar</h3>
          </ContentCardTitle3>
          <ContentCardContainerDown>
            <h4>Mandar a revisión</h4>
            <Checkbox
              checked={checkbox1}
              onChange={handleCheckbox1Change}
              {...label}
            />{" "}
          </ContentCardContainerDown>
          <ContentCardContainerDown>
            <h4>Rechazar</h4>
            <Checkbox
              checked={checkbox2}
              onChange={handleCheckbox2Change}
              {...label2}
            />{" "}
          </ContentCardContainerDown>
          <ContentCardContainerDown>
            <h4>Aceptar</h4>
            <Checkbox
              checked={checkbox3}
              onChange={handleCheckbox3Change}
              {...label3}
            />{" "}
          </ContentCardContainerDown>
        </ContentCardContainer3>
      }
    />
  );
};

export default ThirdCardSection;
