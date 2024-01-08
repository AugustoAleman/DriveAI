import React, { useState } from 'react'
import { InputVerification, MainContent, MainWrapper, ModalContent, ModalTitle, TitleAndExit } from './styles'
import { Button } from 'components/Button'
import { ValidateRemoveModalProps } from './types'
import MuiAlert from "@mui/material/Alert";
import { CloseSharp } from '@mui/icons-material';
import { IconButton } from 'components/IconButton';

const ValidateRemoveModal: React.FC<ValidateRemoveModalProps> = ({
    onClickDelete = () => {
        console.log("deleting");
    },
    onClickClose = () => {
        console.log("close")
    }
}) => {

    const [deleteConfirmation, setDeleteConfirmation] = useState<string>();
    const [mesageHolder, setMessageHolder] = useState<string>("Escriba ELIMINAR para confirmar");

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    })


    const showAlert = (message: string, severity: string) => {
        setAlert({ open: true, message, severity})
    }
 
    function Alert(props: any) {
        return <MuiAlert elevation={6} variant='filled' {...props}/>
    }

    const onClickSummit = async () => {
        console.log(deleteConfirmation);
        if(deleteConfirmation === "ELIMINAR"){
            onClickDelete();
        }else{
            setMessageHolder("Error, favor de escribir ELIMINAR en mayúsculas")
        }
    }

    const onInputChange = (text: string) => {
        setDeleteConfirmation(text)
    }

    return (
        <MainWrapper>
            <ModalContent>
                <MainContent>
                    <TitleAndExit>
                        <ModalTitle>Eliminar vehiculo</ModalTitle>
                        <IconButton
                            onClick={() =>{
                                onClickClose();
                            }}>
                            <CloseSharp></CloseSharp>
                        </IconButton>
                    </TitleAndExit>
                    <h3>¿Estas seguro de eliminar el vehiculo?</h3>
                    <h3>{mesageHolder}</h3>
                    <InputVerification value={deleteConfirmation} onChange={(e) => onInputChange(e.target.value)}/>
                    <Button onClick={onClickSummit}>
                        Confirmar
                    </Button>
                </MainContent>
            </ModalContent>
        </MainWrapper>
    )
}
export default ValidateRemoveModal