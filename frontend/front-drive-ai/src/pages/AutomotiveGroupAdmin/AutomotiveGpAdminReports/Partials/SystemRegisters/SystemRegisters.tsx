import React, { useState, useEffect } from 'react';

import {MainContainer, MoreActions} from "./styles";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { Button } from "components/Button"
import { getVehiclesLogs } from "../../../../../services/AGARegisters/getVehiclesLogs";


const columns: GridColDef[] = [
    { field: 'userId', headerName: 'Id. de usuario', headerClassName: 'header_color', width:150},
    { field: 'userEmail', headerName: 'Email de usuario', headerClassName: 'header_color', width:150},
    { field: 'description', headerName: 'Descripción', flex: 1, headerClassName: 'header_color'},
    { field: 'createdAt', headerName: 'Fecha de creación', headerClassName: 'header_color', width:180},
    { field: 'statusCode', headerName: 'Estatus', headerClassName: 'header_color', width:150},
];

function getValidRegisters(list: any) {
    const res = [];
    let index = 0;

    for (let object of list) {
        if (object.userId > 0) {
            object.id = index + 1;
            index++;

            const date = new Date(object.createdAt);

            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const dateFormat = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

            object.createdAt = dateFormat;

            res.push(object);
            console.log(object.title, index)
        }
    }

    return res;
}

const SystemRegisters = () => {
    const [registers, setRegisters] = useState<any[]>([]);
    const getVehiclesRegisters = async () => {
        await getVehiclesLogs()
            .then((res) => {
                if (res && res.data) {
                    setRegisters(getValidRegisters(res.data.slice(0,200)));

                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getVehiclesRegisters();
    }, []);

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
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rows={registers}
                    columns={columns}
                    sx={{
                        width: '100%',
                        backgroundColor: 'white',
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

        </MainContainer>
    );
};

export default SystemRegisters;