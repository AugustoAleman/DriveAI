import React from "react";
import { Card } from "components/Card";
import { ContainerLoading, TableSecondCard } from "./styles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button } from "components/Button";
import { getDocumentsById } from "services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import AlertTitle from "@mui/material/AlertTitle";

const SecondCardSection = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  const getDocumentsResponse = async () => {
    console.log("Getting documents");
    console.log("-------------------");
    await getDocumentsById(id!)
      .then((res) => {
        if (res && res.data) {
          console.log("Documents: ", res.data);
          setDocuments(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error getting documents: ", err);
      });
  };

  useEffect(() => {
    getDocumentsResponse();
  }, []);

  return (
    <Card
      border="none"
      borderRadius="Medium"
      color="#FFFFFF"
      cursor="default"
      height="100%"
      hoverColor="#CBD0D0"
      hasHoverColor={false}
      margin="0"
      padding="0px"
      shadow="20px 20px 7px rgba(0, 0, 0, 0.3)"
      width="90%"
      children={
        <TableSecondCard>
          {loading ? (
            <ContainerLoading>
              <CircularProgress />
            </ContainerLoading>
          ) : (
            <>
              <tr>
                <th>
                  <h3>Documentos</h3>
                </th>
              </tr>
              <tr>
                <th>Nombre del documento</th>
                <th>Documento adjunto</th>
                <th>Formato</th>
                <th>Fecha</th>
                <th>Estatus</th>
              </tr>
              {documents.length > 0 ? (
                documents.map((document: any) => (
                  <tr key={document.id}>
                    <th>{document.documentRequiredId.documentName}</th>
                    <th>
                      <Button
                        variant="text"
                        onClick={() => console.log("click")}
                      >
                        <FileDownloadOutlinedIcon sx={{ color: "#000000" }} />
                      </Button>
                    </th>
                    <th>{document.documentRequiredId.documentFormat}</th>
                    <th>{document.createdAt.split("T")[0]}</th>
                    {document.status === "pending" ? (
                      <th style={{ color: "#F2994A" }}>Pendiente</th>
                    ) : document.status === "accepted" ? (
                      <th style={{ color: "#43AA8B" }}>Aceptado</th>
                    ) : (
                      <th style={{ color: "#EB5757" }}>Rechazado</th>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Alert severity="info">
                      <AlertTitle>Info</AlertTitle>
                      Los documentos deberán de aparecer aquí —{" "}
                      <strong>¡Cuando se suba alguno!</strong>
                    </Alert>
                  </td>
                </tr>
              )}
            </>
          )}
        </TableSecondCard>
      }
    />
  );
};

export default SecondCardSection;
