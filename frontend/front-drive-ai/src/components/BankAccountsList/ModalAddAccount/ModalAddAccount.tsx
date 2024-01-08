import React from "react";
import {
  Stack,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { GenericModal } from "components/GenericModal";

interface ModalAddAccountProps {
  open: boolean;
  handleClose: () => void;
  dealershipId: number;
  dealershipName: string | null;
  dealershipBankAccount: string | null;
  interbankClabe: string | null;
  modifiedDate: string | null;
  status: string | null;
}

const ModalAddAccount: React.FC<ModalAddAccountProps> = (props) => {
  const { open, handleClose, dealershipId, dealershipBankAccount, dealershipName, interbankClabe, modifiedDate, status } = props;

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID"
              variant="outlined"
              value={dealershipId}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Agncia vinculada"
              variant="outlined"
              value={dealershipName}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Banco"
              variant="outlined"
              value={dealershipBankAccount}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de modificación"
              variant="outlined"
              value={modifiedDate}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Clave intervancaria"
              variant="outlined"
              value={interbankClabe}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </GenericModal>
  );
};

export default ModalAddAccount;
