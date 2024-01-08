import React, { ReactNode } from "react";
import { MenuProps as MUIMenuProps } from "@mui/material";
interface Option {
    image?: string | undefined,
    icon?: () => ReactNode | undefined,
    label?: string,
    subtext?: string,
    onClick?: () => void,
}

export interface MenuProps extends MUIMenuProps {
    closeSession?: boolean | undefined,
    logoutCallback?: () => void,
    anchorEl: null | HTMLElement,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    handleClose: () => void,
    options: Option[]
}
