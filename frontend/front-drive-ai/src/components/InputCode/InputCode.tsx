import React, { useRef, useState } from "react";
import { Card } from "../Card";
import { InputCodeProp } from "./types";
import {
  ButtonInputCode,
  FlexCode,
  InputCodeBox,
  StaticText,
  StaticTextTitle,
  useStyles,
} from "./styles";
import { Button } from "@mui/material";
import { Box } from "@material-ui/core";
import { verifyCode } from "services/Signup/VerifyCode";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import {
  IconButton,
  CircularProgress,
} from "@material-ui/core";

const InputCode: React.FC<InputCodeProp> = ({ email, OnButtonClick }) => {
  const classes = useStyles();

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMesage, setErrorMesage] = useState(
    "Código incompleto, favor de llenar todos los campos"
  );

  const inputCodeRef1 = useRef<HTMLInputElement>(null);
  const inputCodeRef2 = useRef<HTMLInputElement>(null);
  const inputCodeRef3 = useRef<HTMLInputElement>(null);
  const inputCodeRef4 = useRef<HTMLInputElement>(null);
  const inputCodeRef5 = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message: string, severity: string) => {
    setAlert({ open: true, message, severity });
  };

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange1 = (text: string) => {
    if (/^[0-9]{0,1}$/.test(text)) {
      setInput1(text);
      inputCodeRef2.current?.focus();
    } else if (text.length > 1) {
      setInput1(input1);
    }
    setIsValid(true);
  };

  const handleChange2 = (text: string) => {
    if (/^[0-9]{0,1}$/.test(text)) {
      setInput2(text);
      inputCodeRef3.current?.focus();
    } else if (text.length > 1) {
      setInput3(input3);
    }
    setIsValid(true);
  };

  const handleChange3 = (text: string) => {
    if (/^[0-9]{0,1}$/.test(text)) {
      setInput3(text);
      inputCodeRef4.current?.focus();
    } else if (text.length > 1) {
      setInput3(input3);
    }
    setIsValid(true);
  };

  const handleChange4 = (text: string) => {
    if (/^[0-9]{0,1}$/.test(text)) {
      setInput4(text);
      inputCodeRef5.current?.focus();
    } else if (text.length > 1) {
      setInput4(input4);
    }
    setIsValid(true);
  };

  const handleChange5 = (text: string) => {
    if (/^[0-9]{0,1}$/.test(text)) {
      setInput5(text);
    } else if (text.length > 1) {
      setInput5(input5);
    }
    setIsValid(true);
  };

  const handleKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (event.currentTarget.value.length === 0) {
        if (inputCodeRef1.current) {
          inputCodeRef1.current.focus();
        }
      }
    }
  };

  const handleKeyDown3 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (event.currentTarget.value.length === 0) {
        if (inputCodeRef2.current) {
          inputCodeRef2.current.focus();
        }
      }
    }
  };

  const handleKeyDown4 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (event.currentTarget.value.length === 0) {
        if (inputCodeRef3.current) {
          inputCodeRef3.current.focus();
        }
      }
    }
  };
  const handleKeyDown5 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (event.currentTarget.value.length === 0) {
        if (inputCodeRef4.current) {
          inputCodeRef4.current.focus();
        }
      }
    }
  };

  const onSubmit = async () => {
    // validar todos los inputs
    const code = input1 + input2 + input3 + input4 + input5; // concatenar
    if (code.length < 5) {
      setErrorMesage("Código incompleto, favor de llenar todos los campos");
      setIsValid(false);
    } else {
      setLoading(true);
      try {
        const response = await verifyCode(email, code);
        if (response.status >= 200 && response.status < 300) {
          showAlert("Código verificado correctamente", "success");
          setIsValid(true);
          
          if(OnButtonClick){
            OnButtonClick("verified");
          }

        } else {
          showAlert("Código incorrecto", "error");
          if(OnButtonClick){
            OnButtonClick("unverified");
          }
        }
      } catch (error) {
        showAlert("Código incorrecto", "error");
        if(OnButtonClick){
          OnButtonClick("unverified");
        }
      }

      setLoading(false);
    }
  };

  return (
    <Card
      height="50%"
      width="85%"
      shadow=" 2px 2px 12px rgba(0, 0, 0, 0.6)"
      cursor="default"
    >
      <Box>
        <StaticTextTitle>Ingresa tu código de verificación</StaticTextTitle>
        <StaticText>Hemos enviado un código de 5 dígitos a: {email}</StaticText>
        <Collapse
          in={alert.open}
          className={classes.collapse}
        >
          <Alert
            severity={alert.severity as AlertColor}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlert({ ...alert, open: false })}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </Collapse>
        <FlexCode>
          <InputCodeBox
            ref={inputCodeRef1}
            value={input1}
            type="number"
            onChange={(e) => handleChange1(e.target.value)}
          />
          <InputCodeBox
            ref={inputCodeRef2}
            value={input2}
            type="number"
            onKeyDown={handleKeyDown2}
            onChange={(e) => handleChange2(e.target.value)}
          />
          <InputCodeBox
            ref={inputCodeRef3}
            value={input3}
            type="number"
            onKeyDown={handleKeyDown3}
            onChange={(e) => handleChange3(e.target.value)}
          />
          <InputCodeBox
            ref={inputCodeRef4}
            value={input4}
            type="number"
            onKeyDown={handleKeyDown4}
            onChange={(e) => handleChange4(e.target.value)}
          />
          <InputCodeBox
            ref={inputCodeRef5}
            value={input5}
            type="number"
            onKeyDown={handleKeyDown5}
            onChange={(e) => handleChange5(e.target.value)}
          />
        </FlexCode>
        {/* {isValid === false && <StaticText>{errorMesage}</StaticText>} */}

        <ButtonInputCode>
          <Button
            className={classes.submitButton}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Verificar"
            )}
          </Button>
        </ButtonInputCode>
      </Box>
    </Card>
  );
};

export default InputCode;
