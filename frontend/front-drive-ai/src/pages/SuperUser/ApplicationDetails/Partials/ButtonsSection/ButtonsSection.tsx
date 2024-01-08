import { ContainerButtons } from "./styles";
import { useNavigate } from "react-router-dom";
import { putRequest, activateAutomotiveGroup } from "services";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const ButtonsSection = ({ request, setRequest }: any) => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const sendEmail = async () => {
    await activateAutomotiveGroup(id!).then((res) => {
      if (res && res.data) {
        console.log("Email sent: ", res.data);
      }
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }

  const handleSend = async () => {
    console.log("Saving request");
    console.log(request)


    //if th request is in the local storage then you have to delete it
    if (localStorage.getItem("request") !== null) {
      localStorage.removeItem("request");
    }

    await putRequest(request)
      .then((res) => {
        if (res && res.data) {
          console.log("Request saved: ", res.data);
          sendEmail();
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //save request in the local storage if it is not already in the local storage
  const saveRequest = () => {
    if (localStorage.getItem("request") === null) {
      localStorage.setItem("request", JSON.stringify(request));
    }
    //if it is in the local storage, then you have to update the request in the local storage
    else {
      localStorage.removeItem("request");
      localStorage.setItem("request", JSON.stringify(request));
    }
    navigate(-1);
  };

  console.log("Local storage: ", localStorage.getItem("request"));

  return (
    <ContainerButtons>
      <Button
        style={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
          width: "min-content", // Use 'min-content' to set the width of the button to the width of the text
          padding: '0.5rem',
          border: '1px solid #000000' // Add black border color
        }}
        variant="outlined"
        onClick={saveRequest}
      >
        Guardar
      </Button>
      <Button
        style={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
          width: "min-content", // Use 'min-content' to set the width of the button to the width of the text
          padding: '0.5rem',
          border: '1px solid #000000' // Add black border color
        }}
        variant="outlined"
        onClick={() => {
          navigate(-1);
        }}
      >
        Descartar
      </Button>

      <Button
        style={{
          backgroundColor: "#4251F5",
          color: "#FFFFFF",
          width: "min-content", // Use 'min-content' to set the width of the button to the width of the text
          padding: '0.5rem',
          border: '1px solid #000000' // Add black border color
        }}
        variant="contained"
        onClick={handleSend}
      >
        Enviar
      </Button>
    </ContainerButtons>
  );
};

export default ButtonsSection;
