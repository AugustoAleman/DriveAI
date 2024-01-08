import React from "react";
import { AlertWindowProps } from "./types";
import { StyledAlert } from "./styles";

const AlertWindow: React.FC<AlertWindowProps> = ({
    message,
    severity,
})=> {
    return (
            <StyledAlert severity={severity} variant="filled"  >{message}</StyledAlert>
    );
}
export default AlertWindow;