import React, {FormEvent, useEffect, useState} from 'react';
import {
  AddManagerModalBox, AssignedItems,
  backdropStyles, DealershipsLists, FormButtonContainer,
  FormContainer,
  ModalInput,
  ModalTitle,
  ResponsiveStack, UnassignedItems
} from "./styles";
import {AddManagerModalProps, AgencyObj, FetchHandlingType, InputStateProps} from "./types";
import {Alert, Button, Modal, Stack, TextField, useTheme} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import {IconButton} from "@material-ui/core";
import {ExpandLess, ExpandMore, Visibility, VisibilityOff} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import {useAppContext} from "../../store/app-context/app-context";
import {getAvailableAGDealerships} from "../../services/User-ms/AGA/getAvailableAGDealerships";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddManagerModal: React.FC<AddManagerModalProps> = props => {
  const { open = false, handleClose, handleOnSave, onSuccess } = props;
  const { user: loggedUser } = useAppContext();
  const theme = useTheme();

  const [ inputs, setInputs ] = useState<InputStateProps>({ name: "", surname: "", email: "", password: "", cellphone: 0, telephone: 0, dateOfBirth: "", dealershipsIds: []});
  const [showPassword, setShowPassword] = useState(true);
  const [ assignedDealerships, setAssignedDealerships ] = useState<AgencyObj[]>([]);
  const [ unAssignedDealerships, setUnAssignedDealerships ] = useState<AgencyObj[]>([]);
  const [ openCollapse, setOpenCollapse ] = useState(false);

  const [ loading, setLoading ] = useState<FetchHandlingType>({ agency: false, save: false});
  const [ error, setError ] = useState<FetchHandlingType>({ agency: false, save: false })

  useEffect(() => {
    const getDealerships = () => {
      setError({ save: false, agency: false });
      setLoading(prev => ({ ...prev, agency: true }));
      if (loggedUser) {
        getAvailableAGDealerships(loggedUser.agId)
          .then(data => {
            setLoading(prev => ({ ...prev, agency: false }));
            setUnAssignedDealerships(data);
          })
          .catch(() => {
            setError(prev => ({ ...prev, agency: true }))
          })
      }
    }

    if (open) {
      setAssignedDealerships([]);
      setUnAssignedDealerships([]);
      getDealerships();
    }
  }, [loggedUser, open])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setInputs(prev => ({...prev, [target.name]: target.value}));
  }

  const handleOpenCollapse = () => setOpenCollapse(prev => !prev);

  const handleDeleteDealershipInState = (value: number) => {
    const dealership = assignedDealerships.find((dealershipEl) => dealershipEl.value === value);
    if (dealership) {
      setAssignedDealerships((prevState) =>
        prevState.filter((dealershipEl) => dealershipEl.value !== value)
      );
      setUnAssignedDealerships((prevState) => [...prevState, dealership]);
    }
  };

  const handleAddDealershipInState = (value: number) => {
    const dealership = unAssignedDealerships.find((dealershipEl) => dealershipEl.value === value);
    if (dealership) {
      setUnAssignedDealerships((prevState) =>
        prevState.filter((dealershipEl) => dealershipEl.value !== value)
      );
      setAssignedDealerships((prevState) => [...prevState, dealership]);
    }
  };

  const assignedDealershipsList = () => {
    if (error.agency) return <Alert severity="error">Algo salió mal, intenta de nuevo</Alert>
    if (loading.agency) return <CircularProgress />

    return (
      <DealershipsLists>
        <List>
          <Stack spacing={1}>
            {assignedDealerships.length === 0 && (<Alert severity="warning">No tiene agencias asignadas</Alert>)}
            {assignedDealerships.length > 0 && assignedDealerships.map((dealership: AgencyObj) => (
              <AssignedItems>
                <ListItem
                  key={dealership.value}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDeleteDealershipInState(dealership.value)}>
                      <DeleteIcon/>
                    </IconButton>
                  }
                >
                  {dealership.label}
                </ListItem>
              </AssignedItems>
            ))}
          </Stack>
        </List>
      </DealershipsLists>
    )
  }


  const unassignedDealershipsList = () => {
    return (
      <DealershipsLists>
        <Stack>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleOpenCollapse}>
              <ListItemText primary="Agencias no asignadas" />
              {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Stack maxHeight={"15rem"} overflow={"scroll"}>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Stack spacing={1}>
                    {unAssignedDealerships.length > 0 && unAssignedDealerships.map((dealership: AgencyObj) => (
                      <UnassignedItems>
                        <ListItem
                          key={dealership.value}
                          secondaryAction={
                            <IconButton edge="end" onClick={() => handleAddDealershipInState(dealership.value)}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          }
                        >
                          {dealership.label}
                        </ListItem>
                      </UnassignedItems>
                    ))}
                  </Stack>
                </List>
              </Collapse>
            </Stack>
          </List>
        </Stack>
      </DealershipsLists>
    )
  }

  const onClickSaveButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, save: true }));

    const dealershipsList = assignedDealerships.map((dealership) => dealership.value)
    handleOnSave({ ...inputs, dealershipsIds: dealershipsList })
      .then(() => {
        setLoading(prev => ({ ...prev, save: false }));
        setError(prev => ({ ...prev, save: false }));
        onSuccess && onSuccess();
        handleClose();
      })
      .catch(() => {
        setLoading(prev => ({ ...prev, save: false }));
        setError(prev => ({ ...prev, save: true }));
      });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      disableAutoFocus
      slotProps={backdropStyles}
    >
      <AddManagerModalBox>
        <ModalTitle>
          <h3>Administración de gerente</h3>
          <HighlightOffIcon onClick={handleClose}/>
        </ModalTitle>
        <form onSubmit={onClickSaveButton}>
          <FormContainer>
            <ResponsiveStack>
              <ModalInput>
                <label>Nombre(s)</label>
                <TextField name="name" required variant="outlined" onChange={handleInputs} size="small"/>
              </ModalInput>
              <ModalInput>
                <label>Apellido</label>
                <TextField name="surname"  required variant="outlined" onChange={handleInputs} size="small"/>
              </ModalInput>
            </ResponsiveStack>
            <ResponsiveStack>
              <ModalInput>
                <label>Correo</label>
                <OutlinedInput type="email" required name="email" label="Correo" onChange={handleInputs} size="small"/>
              </ModalInput>
              <ModalInput>
                <label>Teléfono</label>
                <OutlinedInput type="tel" required name="telephone" label="Teléfono" onChange={handleInputs} size="small"/>
              </ModalInput>
            </ResponsiveStack>
            <ResponsiveStack>
              <ModalInput>
                <label>Celular</label>
                <OutlinedInput type="tel" required name="cellphone" label="Celular" onChange={handleInputs} size="small"/>
              </ModalInput>
              <ModalInput>
                <label>Fecha de nacimiento</label>
                <OutlinedInput type="date" required name="dateOfBirth" label="Fecha de nacimiento" onChange={handleInputs} size="small"/>
              </ModalInput>
            </ResponsiveStack>
            <ResponsiveStack>
              <ModalInput>
                <label>Contraseña</label>
                <OutlinedInput
                  name="password"
                  required
                  onChange={handleInputs}
                  type={showPassword ? 'text' : 'password'}
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ModalInput>
            </ResponsiveStack>
            <div>
                <label>Asigna agencia al gerente</label>
                {assignedDealershipsList()}
                {unassignedDealershipsList()}
            </div>
            <FormButtonContainer>
              {loading.save && <CircularProgress />}
              {!loading.save && (
                <Button type="submit"
                 variant="contained"
                 sx={{
                  hoverColor:"none",
                  color: theme.palette.background.default,
                  width: "fit-content",
                  height: "fit-content",
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  borderRadius: "4px",
                }}>Guardar</Button>
              )}
            </FormButtonContainer>
          </FormContainer>
        </form>
        <div>
          {error.save && <Alert severity="error">Algo salió mal al guardar, intente de nuevo</Alert>}
        </div>
      </AddManagerModalBox>
    </Modal>
  )

};

export default AddManagerModal;