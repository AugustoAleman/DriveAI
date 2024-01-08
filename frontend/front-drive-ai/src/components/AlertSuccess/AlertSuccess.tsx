import React, { useEffect, useState } from "react";
import { AlertSuccessProps } from "./types";
import { Alert } from "@mui/material";

const AlertSuccess : React.FC<AlertSuccessProps> = ({
    message,
    type_message,
    button_clicked,
}) => {
    const [showAlert, setShowAlert] = useState(true);
    const [SMS, setSMS] = useState("");
    const [severity, setSeverity] = useState<"error" | "success">("error");

    /**
     * 1 - prueba de manejo guardada
     * 2 - Intentar más tarde
     * 3 - campos faltantes
     * 4 - None
     */
    const setMessage = () => {
        switch(type_message){
            case 1:
                setSMS("Prueba de manejo guardada");
                setSeverity("success");
                setShowAlert(true);
                break;
            case 2:
                setSMS("Intentar más tarde");
                setSeverity("error");
                setShowAlert(true);
                break;
            case 3:
                setSMS("Ocurrió un error");
                setSeverity("error");
                setShowAlert(true);
                break;
            case 4:
                setShowAlert(false);
                break;
        }
    }


    useEffect(() => {
        setMessage();
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    
        return () => {
            clearTimeout(timeout);
        };
    }, [button_clicked]);

    return showAlert ? <Alert severity={severity}>{SMS}</Alert> : null;
}
export default AlertSuccess;