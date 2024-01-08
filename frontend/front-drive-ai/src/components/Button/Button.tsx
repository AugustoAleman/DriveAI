import { ButtonProp } from "./types";
import { Button as ButtonMUI } from "@mui/material";
import theme from "theme/theme";

const Button: React.FC<ButtonProp> = ({
    children,
    backgroundColor = theme.palette.secondary.main,
    hoverColor = "none",
    hoverShadow = false,
    color = theme.palette.background.default,
    width = "fit-content",
    height = "fit-content",
    fontSize = "0.875rem",
    fontWeight = "medium",
    borderRadius = "4px",
    variant = "contained",
    disabled = false,
    href = "",
    startIcon,
    endIcon,
    shadow = false,
    onClick = () => {},
}) => {
	const shdw = shadow
		? "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);"
		: "none";
	const hvrShdw = hoverShadow
		? "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);"
		: "none";
	backgroundColor = variant === "contained" ? backgroundColor : "transparent";
	return (
        <ButtonMUI
            variant={variant} 
            disabled={disabled}
            onClick={onClick}
            {...(href === "" ? {} : { href: href })}
            sx={{
                backgroundColor: `${backgroundColor} !important`,
                color: `${color} !important`,
				"&:hover":
					hoverColor === "none"
						? {
								backgroundColor: `${backgroundColor} !important`,
								boxShadow: `${hvrShdw} !important`,
						  }
						: { backgroundColor: `${hoverColor} !important`, boxShadow: `${hvrShdw} !important` },
                width: `${width} !important`,
                height: `${height} !important`,
                fontSize: `${fontSize} !important`,
                fontWeight: `${fontWeight} !important`,
                borderRadius: `${borderRadius} !important`,
                boxShadow: `${shdw} !important`,
                padding: '6px 16px !important',
            }}
            startIcon={startIcon}
            endIcon={endIcon}
		>
            {children}
        </ButtonMUI>
    );
};

export default Button;