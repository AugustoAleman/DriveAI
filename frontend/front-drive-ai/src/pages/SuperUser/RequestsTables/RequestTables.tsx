import React, { useEffect } from "react";
import { Container } from "./styles";
import HeaderAdminCards from "../../../components/HeaderAdminCards/HeaderAdminCards";
import { useState } from "react";
import { AllRequestsTable } from "./Partials/AllRequestsTable";

import { useStyles, Client } from "./styles";
import { getRequests } from "services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const RequestTables = () => {
  const [activeTab, setActiveTab] = useState("Todas las solicitudes");
  const [requests, setRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState(0);
  const [pendingRequest, setPendingRequest] = useState(0);
  const [loading, setLoading] = useState(true); // State to track loading

  const tabs = [
    "Todas las solicitudes",
    "Pendientes",
    "Rechazadas",
    "Completadas",
  ];

  const classes = useStyles();

  const handleTabClick = (tab: string) => {
    console.log("Clicked on", tab);

    if (tab === activeTab) {
      return;
    } else {
      console.log("Tab has changed!");
      setActiveTab(tab);
    }
  };

  const getRequestsResponse = async () => {
    try {
      const res = await getRequests();

      if (res && res.data) {
        console.log("Requests: ", res.data);

        const pendingCount: number = res.data.filter(
          (request: any) => request.status === "PENDING"
        ).length;

        console.log("Number of PENDING requests: ", pendingCount);
        setPendingRequest(pendingCount);

        const completedCount: number = res.data.filter(
          (request: any) => request.status === "ACCEPTED"
        ).length;

        console.log("Number of ACCEPTED requests: ", completedCount);
        setNewRequest(completedCount);

        const updatedRequests = res.data.map((request: any) => {
          request.date = request.date.split("T")[0];
          request.date = new Date(request.date).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return request;
        });

        setRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after requests are loaded
    }
  };

  useEffect(() => {
    getRequestsResponse();
  }, []);

  function filterArrayByStatus(array: any, status: string) {
    return array.filter((obj: any) => obj.status === status);
  }

  return (
    <Container>
      <Client>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "20vh",
              height: "100vh",
              background: "linear-gradient(to bottom, #BCBCBC, white)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className={classes.StaticHeader}>
              <HeaderAdminCards
                about="Solicitudes"
                activeTab={activeTab}
                new_requests={newRequest}
                old_requests={pendingRequest}
                onTabClick={handleTabClick}
                tabs={tabs}
                title="Solicitudes de admisión"
              />
            </div>

            {activeTab === "Todas las solicitudes" && (
              <AllRequestsTable request={requests} setRequest={setRequests} />
            )}
            {activeTab === "Pendientes" && (
              <AllRequestsTable
                request={filterArrayByStatus(requests, "PENDING")}
                setRequest={setRequests}
              />
            )}
            {activeTab === "Rechazadas" && (
              <AllRequestsTable
                request={filterArrayByStatus(requests, "REJECTED")}
                setRequest={setRequests}
              />
            )}
            {activeTab === "Completadas" && (
              <AllRequestsTable
                request={filterArrayByStatus(requests, "ACCEPTED")}
                setRequest={setRequests}
              />
            )}
          </>
        )}
      </Client>
    </Container>
  );
};

export default RequestTables;
