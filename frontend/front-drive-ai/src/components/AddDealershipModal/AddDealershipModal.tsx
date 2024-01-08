import React, { useState, useRef, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Button from "@mui/material/Button";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  FormGroup,
  Label,
  ColumnLeft,
  ColumnRight,
} from "./styles";
import { postRequest } from "services/User-ms/Dealership/postRequest";
import "./styles.css";
import { useAppContext } from "store/app-context/app-context";
import { InputStateProps } from "./types";
import { TextField } from "@mui/material";
//import { InputAddressStateProps, InputStateProps } from "../AddManagerModal/types";

const AddDealershipModal = () => {
  const { user: loggedUser } = useAppContext();
  const id = loggedUser?.id || 0;
  //const [ inputsAddress, setInputsAddress ] = useState<InputAddressStateProps>({  userId: 0, state: "", city: "", address: "", postal: 0, isMain: false});
  const addressInput = {
    userId: id,
    state: "",
    city: "",
    address: "",
    postal: "",
    isMain: false,
    latitude: "",
    longitude: "",
  };
  const [inputs, setInputs] = useState<InputStateProps>({
    name: "",
    address: addressInput,
    automotiveGroupId: 0,
  });
  const [status, setStatus] = useState<any[]>([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      componentRestrictions: { country: "mx" },
      fields: ["address_components", "geometry", "icon", "name"],
    };

    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autoCompleteRef.current.addListener("place_changed", () => {
        const selectedPlace = autoCompleteRef.current?.getPlace();

        if (selectedPlace) {
          const addressComponents = selectedPlace.address_components;
          const street = addressComponents?.find((component) =>
            component.types.includes("route")
          )?.long_name;
          const number = addressComponents?.find((component) =>
            component.types.includes("street_number")
          )?.long_name;
          const city = addressComponents?.find((component) =>
            component.types.includes("locality")
          )?.long_name;
          const postalCode = addressComponents?.find((component) =>
            component.types.includes("postal_code")
          )?.long_name;
          const state = addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name;

          const address = `${street || ""} ${number || ""}`;

          const geometry = selectedPlace.geometry;
          const lat = geometry?.location?.lat();
          const lng = geometry?.location?.lng();

          setLatitude(lat?.toString() || "");
          setLongitude(lng?.toString() || "");

            setInputs({
                ...inputs,
                address: {
                    ...inputs.address,
                    state: state || "",
                    city: city || "",
                    address: address || "",
                    postal: postalCode || "",
                    latitude: lat?.toString() || "",
                    longitude: lng?.toString() || "",
                },
            });
            
        }
      });
    }
  }, [inputRef.current]);

  const [open, setOpen] = React.useState(false);
  const createDealership = async () => {
    const response = await postRequest({
      name: inputs.name,
      address: inputs.address,
      automotiveGroupId: inputs.automotiveGroupId,
    });
    if (response.status === 200) {
      setStatus((prev) => [
        ...prev,
        { status: "success", message: "La agencia se ha creado correctamente" },
      ]);
      alert(`La agencia se ha creado correctamente`);
    } else {
      setStatus((prev) => [
        ...prev,
        {
          status: "error",
          message: "La agencia no se ha creado correctamente",
        },
      ]);
      alert(`La agencia no se ha creado correctamente`);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSave = () => {
    createDealership();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="add" onClick={handleOpen}>
        <AddCircleOutlineRounded fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Administración de agencia</ModalTitle>
            <IconButton color="primary" aria-label="add" onClick={handleClose}>
              <HighlightOffOutlinedIcon fontSize="large" />
            </IconButton>
          </ModalHeader>
          <ModalBody>
            <ColumnLeft>
              <FormGroup>
                <Label htmlFor="name">Nombre de agencia:</Label>
                <TextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  placeholder="Nombre de agencia"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      name: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">Estado:</Label>
                <TextField
                  id="state"
                  variant="outlined"
                  fullWidth
                  placeholder="Estado"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      address: {
                        ...inputs.address,
                        state: e.target.value,
                      },
                    })
                  }

                  value={inputs.address.state}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="city">Ciudad:</Label>
                <TextField
                  id="city"
                  variant="outlined"
                  fullWidth
                  placeholder="Ciudad"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      address: {
                        ...inputs.address,
                        city: e.target.value,
                      },
                    })
                  }

                    value={inputs.address.city}
                />
              </FormGroup>
            </ColumnLeft>
            <ColumnRight>
              <FormGroup>
                <Label htmlFor="address">Dirección:</Label>
                <TextField
                  id="address"
                  variant="outlined"
                  inputRef={inputRef}
                  fullWidth
                  placeholder="Dirección"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      address: {
                        ...inputs.address,
                        address: e.target.value,
                      },
                    })
                  }

                    value={inputs.address.address}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="postal">Código postal:</Label>
                <TextField
                  id="postal"
                  variant="outlined"
                  fullWidth
                  placeholder="Código postal"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      address: {
                        ...inputs.address,
                        postal: e.target.value,
                      },
                    })
                  }

                    value={inputs.address.postal}
                />
              </FormGroup>
            </ColumnRight>
          </ModalBody>
          <ModalFooter>
            <Button variant="outlined" onClick={handleOnSave}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default AddDealershipModal;
