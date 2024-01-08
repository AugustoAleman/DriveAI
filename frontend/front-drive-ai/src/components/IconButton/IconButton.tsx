import React, {useEffect, useState} from "react";
import { IconButtonProp } from "./types";
import { IconButton as IconButtonMUI } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const IconButton: React.FC<IconButtonProp> = ({
    children = <ReportProblemIcon/>,
    backgroundColor = "transparent",
    hoverColor = "none",
    color = "black",
    width = "fit-content",
    height = "fit-content",
    borderRadius = "50%",
    href = "",
    shadow = false,
    hoverShadow = false,
    onClick = () => {},
}) => {
    const shdw = shadow? "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);" : "none";
    const hvrShdw = hoverShadow? "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);" : "none";
    return (
        <IconButtonMUI
        href={href}    
        onClick={onClick}
            sx={{
                color: color,
                backgroundColor: backgroundColor,
                width: width,
                height: height,
                borderRadius: borderRadius,
                shadow: shdw,
                "&:hover": hoverColor == "none"? 
                    {backgroundColor: backgroundColor, boxShadow: hvrShdw}:
                    {backgroundColor: hoverColor, boxShadow: hvrShdw},
            }}>
        {children}
        </IconButtonMUI>
    )
}

export default IconButton;