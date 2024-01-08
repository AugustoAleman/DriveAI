import React from "react";

import {MainContainer, DataTable, MoreActions} from "./styles";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { Button } from "components/Button"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id. de usuario', flex: 1, headerClassName: 'header_color'},
    { field: 'agency', headerName: 'Agencia', flex: 1, headerClassName: 'header_color'},
    { field: 'change_hour', headerName: 'Hora de cambio', flex: 1, headerClassName: 'header_color'},
    { field: 'change_date', headerName: 'Fecha de cambio', flex: 1, headerClassName: 'header_color'},
    { field: 'type', headerName: 'Tipo', flex: 1, headerClassName: 'header_color'},
];

const rows = [
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type:  'Coche registrado'},
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado'},
];

const SystemRegisters = () => {
    return (
        <MainContainer>
            <Button
                color="#050505"
                fontWeight="normal"
                onClick={() => {}}
                variant="text"
                width="12vw"
                children={
                <MoreActions>
                    <span>Más acciones</span>
                    <ArrowDropDownSharpIcon/>
                </MoreActions>
                 }

            />
            <DataTable>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rows={rows}
                    columns={columns}
                    sx={{
                        borderRadius: 2,
                        '& .header_color': {
                            backgroundColor: 'rgba(217, 217, 217, 1)',
                            wordWrap: 'break-word !important',
                        },
                        '& .MuiDataGrid-row': {
                            maxHeight: 'none !important',
                        },
                        fontSize: '0.7rem',
                        '@media (min-width:900px)': {
                            fontSize: '1rem',},
                            flex: 1
                    }}
                />
            </DataTable>

        </MainContainer>
    );
};

export default SystemRegisters;