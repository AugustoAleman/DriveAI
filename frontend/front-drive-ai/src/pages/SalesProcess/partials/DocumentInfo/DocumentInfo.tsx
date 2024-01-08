import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UploadSharpIcon from '@mui/icons-material/UploadSharp';
import CheckIcon from '@mui/icons-material/Check';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useStyles } from './styles';
import httpInstance from 'services/httpInstance';
import { useAppContext } from 'store/app-context/app-context';
import {CircularProgress} from "@material-ui/core";
import ocrINE from 'services/documents/ocrINE';
import createUpdateDocument from 'services/documents/createUpdateDocumentOCR';
// import createUpdateDocument from './createUpdateDocument';



interface DocumentInfoProps {
  id: number;
  // Resto de las propiedades...
}

interface Document {
  documentRequiredId: number;
  documentName: string;
  documentFormat: string;
  createdAt: string;
}




const DocumentInfo: React.FC<DocumentInfoProps> = (props) => {
  const classes = useStyles();
  const { user: loggedUser } = useAppContext();
  const UserId = loggedUser?.id;
  const [documentList, setDocumentList] = useState<Document[]>([]);
  const [ success, setSuccess ] = useState<(boolean | null)[]>([])
  const [ loading, setLoading ] = useState<(boolean)[]>([])
  const [ineError, setineError] = useState<boolean>(false);

  useEffect(() => {
    const handleOCRCheck = async () => {
      if (ineError) {
        // Realizar acciones adicionales cuando ineError cambia a true
        console.log('ineError es true');
      } else {
        // Realizar acciones adicionales cuando ineError cambia a false
        console.log('ineError es false');
      }
    };
  
    handleOCRCheck();
  }, [ineError]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data  } = await httpInstance.get(`/v1/document-required/get-documents-required-for-sale/${1}`);
        setSuccess(Array(data.length).fill(null));
        setLoading(Array(data.length).fill(false));
        setDocumentList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    changeSuccessValue(index, null)
    changeLoadingValue(index, true)

    if (file) {
      try {
        const formData = new FormData();
        const ineString = documentList[index].documentName;
        formData.append('newFile', file);

        const documentData = {
          filePath: 'documents/',
          newFile: formData,
          externalTable: 'user',
          externalId: UserId,
          reqDocId: Number(event.target.id.split('-')[2]),
        };

        if (ineString.toLowerCase() === "ine"){
          const ineFormData = new FormData();
          ineFormData.append("image", file);

          const { ocrCheck } = await ocrINE(ineFormData);
          setineError(!ocrCheck);
          !ocrCheck ? changeSuccessValue(index, false) : uploadDocument(documentData, index);
        } else {
          uploadDocument(documentData, index);
        }

      } catch (error) {
        changeLoadingValue(index, false)
        changeSuccessValue(index, false);
      }
    }
  };

  const uploadDocument = (documentData: any, index: number) => {
    createUpdateDocument(documentData) // TODO: SWITCH NAME WITH SERVICE NAME
      .then(() => {
        changeLoadingValue(index, false);
        changeSuccessValue(index, true);
      })
      .catch(() => {
        changeLoadingValue(index, false);
        changeSuccessValue(index, false);
      })
  }

  

  const changeLoadingValue = (index: number, value: boolean) => {
    setLoading(prev => {
      const loadingList = [...prev];
      loadingList[index] = value;
      return loadingList;
    });
  }

  const changeSuccessValue = (index: number, value: boolean | null) => {
    setSuccess(prev => {
      const loadingList = [...prev];
      loadingList[index] = value;
      return loadingList;
    });
  }

    
  // const createUpdateDocument = async (documentData: any) => {
  //   const endpoint = `/v1/s3/create-update-document?filePath=${documentData.filePath}&externalTable=${documentData.externalTable}&externalId=${documentData.externalId}&reqDocId=${documentData.reqDocId}`;

  //   return httpInstance
  //     .post(endpoint, documentData.newFile)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // };

  return (
    <div>
      <h1 className={classes.principalHeader}>Revisemos tus documentos</h1>
      <div className={classes.tablediv}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Documento requerido</TableCell>
              <TableCell className={classes.TableCells}>Cargar</TableCell>
              <TableCell className={classes.TableCells}>Formato</TableCell>
              <TableCell className={classes.TableCells}>Fecha</TableCell>
              <TableCell className={classes.TableCells}>Estatus</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {documentList.map((document, index) => (
              <TableRow key={document.documentRequiredId}>
                <TableCell className={classes.tableDivider}>{document.documentName}</TableCell>
                <TableCell className={classes.iconCell}>
                  <label htmlFor={`file-input-${document.documentRequiredId}`}>
                    <UploadSharpIcon />
                    <input
                      id={`file-input-${document.documentRequiredId}`}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={event => handleFileSelect(event, index)}
                    />
                  </label>
                </TableCell>
                <TableCell>{document.documentFormat}</TableCell>
                <TableCell>{document.createdAt.slice(0, 10)}</TableCell>
                <TableCell className={classes.iconCell}>
                  {loading[index] && <CircularProgress />}
                  {!loading[index] && success[index] === false ? <CloseSharpIcon/> : success[index] === true ? <CheckIcon/> : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default DocumentInfo;