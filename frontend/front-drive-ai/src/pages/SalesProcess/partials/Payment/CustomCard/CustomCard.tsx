import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { FiberManualRecord, RadioButtonUnchecked } from "@mui/icons-material";

interface CustomCardProps {
  icon: React.ReactNode;
  text: string;
  selected: boolean;
  onCardClick: () => void;
}

const useStyles = makeStyles({
  card: {
    width: 148,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8%",
    position: "relative",
    borderRadius: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    margin: "2px" // Agregado el margen entre tarjetas
  },
  circle: {
    position: "absolute",
    top: "5%",
    right: "5%",
    cursor: "pointer",
    zIndex: 1,
  },
  icon: {
    marginTop: "25px", // Añade un margen superior automático para empujar el texto hacia abajo
    marginBottom: "4%", // Ajusta el margen inferior según tus necesidades
  },
  text: {
    marginTop: "11px", // Añade un margen superior automático para empujar el texto hacia abajo
    fontSize: "11px",
    textAlign: "center",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const CustomCard: React.FC<CustomCardProps> = ({
  icon,
  text,
  selected,
  onCardClick,
}) => {
  const classes = useStyles();

  const handleIconClick = () => {
    onCardClick();
  };

  return (
    <Card classes={{ root: classes.card }} onClick={onCardClick}>
      <IconButton className={classes.circle} onClick={handleIconClick}>
        {selected ? <FiberManualRecord /> : <RadioButtonUnchecked />}
      </IconButton>
      <CardContent className={classes.content}>
        <div className={classes.icon}>{icon}</div>
        <Typography className={classes.text}>{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
