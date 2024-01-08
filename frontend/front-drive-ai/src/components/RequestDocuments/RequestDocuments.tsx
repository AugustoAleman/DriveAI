import React, {useState, useEffect} from 'react';
import {
    backdropStyles,
    IFrameContainer,
    ModalBox,
    RequestDocumentComponentBox,
    RequestDocumentDocContainer,
    DocumentActionsButtons, OverflowComponent, PaginationStyles
} from "./styles";
import {Alert, Modal, Stack} from "@mui/material";
import {useTheme} from "@mui/material";
import {DemoSaleDocument, LoadingStates, RequestDocumentProps} from "./types";
import Pagination from '@mui/material/Pagination';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from "@mui/icons-material/Description";
import {getDocumentsFrom, updateDocumentStatus} from "../../services/documents";
import {Link} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {Button} from "@material-ui/core";

// Component to get documents from sale or demo - show document in list. When document is click modal to validate document appears.

const RequestDocuments: React.FC<RequestDocumentProps> = props => {
    const { operationType, userId: externalId } = props;
    const { status, palette: { tertiary } } = useTheme();

    const [ clickedDocument, setClickedDocument ] = useState<number>(-1);
    const [ docIndex, setDocIndex ] = useState<number>(0);
    const [ documents, setDocuments ] = useState<DemoSaleDocument[]>([]);
    const [ open, setOpen ] = React.useState(false);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState<LoadingStates>({ validate: false, reject: false, documents: false });

    useEffect(() => {
        const getDocuments = () => {
            const externalTable = operationType === "demo"  || operationType === "Venta" ? "user" : "automotive_group";
            return getDocumentsFrom(externalTable, externalId)
              .then(data => {
                  setError(false);
                  return data
              })
              .catch(() => setError(true))
        }

        getDocuments().then(data => setDocuments(data));
    },[externalId, operationType]);

    const validateDocument = async () => {
        setOpen(true);
        setLoading(prev => ({ ...prev, validate: true }));

        await updateDocumentStatus("approved", documents[clickedDocument])
          .then(data => {
              setDocuments(prevDocuments => {
                  prevDocuments.splice(clickedDocument, 1, data);
                  return prevDocuments;
              })
              setLoading(prev => ({ ...prev, validate: false }));
              handleClose();
          })
          .catch(() => setError(true))
    }

    const rejectDocument = async () => {
        setOpen(true);
        setLoading(prev => ({ ...prev, reject: true }));

        await updateDocumentStatus("rejected", documents[clickedDocument])
          .then(data => {
              setDocuments(prevDocuments => {
                  prevDocuments.splice(clickedDocument, 1, data);
                  return prevDocuments;
              })
              setLoading(prev => ({ ...prev, reject: false }));
              handleClose();
          })
          .catch(() => setError(true))
    }

    const documentList = () => {
        return (
          <>
              {documents.length > 0 && documents.map((document, index) => (
                <>{showDocument(document, index)}</>
              ))}
          </>
        )
    }

    const handleOpen = (index: number) => {
        setClickedDocument(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(prev => ({ ...prev, validate: false, reject: false }));
        setClickedDocument(0);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDocIndex(value - 1);
    }

    const truncateText = (text: string, maxLength: number = 20): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }

    const showDocument = (document: DemoSaleDocument, index: number) => {
        return (
            <>
                {document &&
                    <RequestDocumentDocContainer key={document.documentId.toString()} status={status} verified={document.status}>
                        <div onClick={() => handleOpen(index)}>
                            <DescriptionIcon sx={{ color: "#000000", fontSize: 50 }} />
                            <p>{truncateText(document.documentRequiredId.documentName)}</p>
                        </div>
                    </RequestDocumentDocContainer>}
            </>
        )
    }

    const showError = () => {
        return (
          <Alert severity="error">Hubo un error</Alert>
        )
    }

    const showModal = () => {
        if (clickedDocument !== -1) {
            const document = documents[clickedDocument];

            return (
              <Modal
                open={open}
                onClose={handleClose}
                disableAutoFocus
                slotProps={backdropStyles}
              >
                  <ModalBox tertiary={tertiary}>
                      <div>
                          <h3>Validar la documentación?</h3>
                          <HighlightOffIcon onClick={handleClose}/>
                      </div>
                      <p>{document && document.documentRequiredId.documentName}</p>
                      <IFrameContainer tertiary={tertiary}>
                          <img alt={document.documentRequiredId.documentName} src={document.storageUrl}/>
                          <Link to={documents[clickedDocument].storageUrl} ></Link>
                      </IFrameContainer>
                      <DocumentActionsButtons>
                          {loading.reject ? <CircularProgress/> : <Button onClick={rejectDocument} size="large">Denegar</Button>}
                          {loading.validate ? <CircularProgress/> : <Button onClick={validateDocument} size="large" >Validar</Button>}
                      </DocumentActionsButtons>
                  </ModalBox>
              </Modal>
            )
        }
    }

    return (
        <RequestDocumentComponentBox tertiary={tertiary}>
            <Stack width={"100%"}>
                {error ? showError()
                : (<>
                    {showModal()}
                      <OverflowComponent>
                        <Stack direction="row" alignSelf="flex-start" justifyContent="flex-start" spacing={1}>
                            {documents && documentList()}
                        </Stack>
                      </OverflowComponent>
                    <PaginationStyles>
                        {documents && (<>
                            {showDocument(documents[docIndex], docIndex)}
                          <Pagination size="small" count={documents.length} page={docIndex + 1} onChange={handlePageChange}/>
                        </>)}
                    </PaginationStyles>
                  </>)}
            </Stack>
        </RequestDocumentComponentBox>
    )
}

export default RequestDocuments;
