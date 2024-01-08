// React - style imports
import React from "react";
import useStyles, { TitlesDetails } from "./styles";
import { useState, useEffect } from "react";

// Mui imports
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box, Typography, IconButton, Button, AppBar } from "@material-ui/core";

// Component imports
import { Card } from "components/Card";
import { AdministrativeToolbarProps } from "./types";
import {
  Header,
  TabContainer,
  CardContainer,
  InsideCard,
  InsideCardContainer,
  UserSpace,
  OldFont,
  NewFont,
} from "./styles";

import { useAppContext } from "store/app-context/app-context";
import { useNavigate } from "react-router-dom";

const HeaderAdminCards: React.FC<AdministrativeToolbarProps> = ({
  tabs = null,
  activeTab,
  about,
  title,
  details = false,
  dateEvent = null,
  onTabClick,
  new_requests = null,
  old_requests = null,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60 * 60); // update date every hour

    return () => clearInterval(intervalId);
  }, []);

  const appContext = useAppContext();

  const getUserType = (userType: string | undefined) => {
    if (userType === undefined) {
      return "---";
    }
    switch (userType) {
      case "SUPERADMIN":
        return "Super administrador";
      case "AGA":
        return "Administrador de grupo";
      case "MANAGER":
        return "Gerente";
      case "SALESMAN":
        return "Vendedor";
      default:
        return "---";
    }
  };

  const renderTabs = (tabs: null | string[]) => {
    if (tabs !== null) {
      return (
        <TabContainer>
          <ul>
            {tabs.length !== 1 ? (
              tabs.map((tab, index) => (
                <li key={index} style={{ marginRight: "1rem" }}>
                  <Button onClick={() => onTabClick(tab)}>
                    <Box
                      borderBottom={
                        activeTab === tab ? "4px solid #DE4D5A" : "none"
                      }
                    >
                      <Typography
                        color={activeTab === tab ? "secondary" : "initial"}
                      >
                        {tab}
                      </Typography>
                    </Box>
                  </Button>
                </li>
              ))
            ) : (
              <li style={{ marginRight: "1rem" }}>
                <Button>
                  <Box borderBottom="4px solid #DE4D5A">
                    <Typography color="initial">{tabs}</Typography>
                  </Box>
                </Button>
              </li>
            )}
          </ul>
        </TabContainer>
      );
    }

    return null;
  };

  const renderCards = (
    old_requests: null | number,
    new_requests: null | number
  ) => {
    if (old_requests && new_requests) {
      return (
        <CardContainer>
          <Card
            height="7rem"
            width="19rem"
            borderRadius="Small"
            cursor="default"
            color="#CBD0D0"
          >
            <InsideCardContainer>
              <InsideCard>
                <h5>Nuevas solicitudes</h5>
              </InsideCard>
              <InsideCard>
                <NewFont>{new_requests}</NewFont>
                <HorizontalRuleIcon
                  fontSize="large"
                  className={classes.rotatedIcon}
                />
                <h4>
                  Impresión -{" "}
                  {(
                    (new_requests * 100) /
                    (old_requests + new_requests)
                  ).toPrecision(2)}
                  %
                </h4>
              </InsideCard>
            </InsideCardContainer>
          </Card>
          <Card
            height="7rem"
            width="19rem"
            borderRadius="Small"
            cursor="default"
            color="#CBD0D0"
          >
            <InsideCardContainer>
              <InsideCard>
                <h5>Solicitudes pendientes</h5>
              </InsideCard>
              <InsideCard>
                <OldFont>{old_requests}</OldFont>
                <HorizontalRuleIcon
                  fontSize="large"
                  className={classes.rotatedIcon}
                />
                <h4>
                  Impresión -{" "}
                  {(
                    (old_requests * 100) /
                    (old_requests + new_requests)
                  ).toPrecision(2)}
                  %
                </h4>
              </InsideCard>
            </InsideCardContainer>
          </Card>
        </CardContainer>
      );
    } else if (old_requests) {
      return (
        <CardContainer>
          <Card
            height="7rem"
            width="19rem"
            borderRadius="Small"
            cursor="default"
            color="#CBD0D0"
          >
            <InsideCardContainer>
              <InsideCard>
                <h5>Solicitudes pendientes</h5>
              </InsideCard>
              <InsideCard>
                <OldFont>{old_requests}</OldFont>
                <HorizontalRuleIcon
                  fontSize="large"
                  className={classes.rotatedIcon}
                />
                <h4>Impresión - 100%</h4>
              </InsideCard>
            </InsideCardContainer>
          </Card>
        </CardContainer>
      );
    } else if (new_requests) {
      return (
        <CardContainer>
          <Card
            height="7rem"
            width="19rem"
            borderRadius="Small"
            cursor="default"
            color="#CBD0D0"
          >
            <InsideCardContainer>
              <InsideCard>
                <h5>Nuevas solicitudes</h5>
              </InsideCard>
              <InsideCard>
                <NewFont>{new_requests}</NewFont>
                <HorizontalRuleIcon
                  fontSize="large"
                  className={classes.rotatedIcon}
                />
                <h4>Impresión - 100%</h4>
              </InsideCard>
            </InsideCardContainer>
          </Card>
        </CardContainer>
      );
    }

    return null;
  };

  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const result = renderCards(old_requests, new_requests);

  return (
    <>
      <UserSpace>
        <Box borderRight="1px solid #979797" marginRight="3px">
          <Typography variant="h6" className={classes.userName}>
            {date.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Typography variant="h6" className={classes.userName}>
          {appContext.user?.name}
        </Typography>
        <Box
          borderRight="1px solid #979797"
          borderLeft="1px solid #979797"
          marginRight="3px"
        >
          <Typography variant="h6" className={classes.userName}>
            {getUserType(appContext.user?.userType)}
          </Typography>
        </Box>
        <IconButton className={classes.iconButton}>
          <NotificationsRoundedIcon className={classes.bellButton} />
        </IconButton>
      </UserSpace>

      <Header>
        {details === true ? (
          <a onClick={(e) => navigate(-1)}>
            <h3>
              {"<"} {about}
            </h3>
          </a>
        ) : (
          <h3>
            Administración {">"} {about}
          </h3>
        )}
        {details === true ? (
          <TitlesDetails>
            <h1>{title}</h1>
            <h4>{dateEvent}</h4>
          </TitlesDetails>
        ) : (
          <h1>{title}</h1>
        )}
      </Header>
      {/* Adding dual card functionalities inside a component */}
      {result === null ? <div style={{ display: "none" }}></div> : result}

      {tabs === null ? (
        <div style={{ display: "none" }}></div>
      ) : (
        renderTabs(tabs)
      )}
    </>
  );
};

export default HeaderAdminCards;
