import React, {useEffect, useState} from "react";

import {MainContainer, MoreActions} from "./styles";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { Button } from "components/Button"
import { getVehiclesLogs } from "services/index";
import { getUsersLogs } from "services/index";
import { getDocumentsLogs } from "services/index";



const columns: GridColDef[] = [
    { field: 'userId', headerName: 'Id. de usuario', headerClassName: 'header_color', width:120},
    { field: 'title', headerName: 'Título', headerClassName: 'header_color', width:150},
    { field: 'description', headerName: 'Descripción', flex: 1, headerClassName: 'header_color'},
    { field: 'createdAt', headerName: 'Fecha de creación', headerClassName: 'header_color', width:180},
    { field: 'statusCode', headerName: 'Estatus', headerClassName: 'header_color', width:150},
];

let index = 0;

function getValidRegisters(list: any){
    const res = [];

    for (let object of list) {
        if (object.userId > 0) {
            const obj:{userId:string, title: string, description: string, createdAt:string, statusCode: string, id: number} =
            {userId: "", title: "", description: "", createdAt: "", statusCode: "", id: 0};

            obj.id = index + 1;
            index++;
            obj.statusCode = object.statusCode.toString() || "No status";
            obj.userId = object.userId.toString() || "No user";
            obj.title = object.title || "No title";
            obj.description = object.description || "No description";


            const date = new Date(object.createdAt) || new Date();

            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            obj.createdAt = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
            res.push(obj);
        }
    }

    return res;
}

const SystemRegisters = () => {
    const [registersV, setRegistersV] = useState<any[]>([]);
    const [registersD, setRegistersD] = useState<any[]>([]);
    const [registersU, setRegistersU] = useState<any[]>([]);
    const [allRegisters, setAllRegisters] = useState<any[]>([]);

    const getLogs = async () => {

        const vehiclesLogs = await getVehiclesLogs()
            .then((res) => {
                if (res && res.data) {
                    return (res.data.slice(0,200));

                }
            })
            .catch((err) => {
                console.log(err);
            });


        const documentsLogs = await getDocumentsLogs()
            .then((res) => {
                if (res && res.data) {
                    return (res.data.slice(0,200));
                }
            })
            .catch((err) => {
                console.log(err);
            });

        const userLogs = await getUsersLogs()
            //@ts-ignore
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data[0]);
                    return res.data.slice(0,200);

                }
                console.log(res.data[0]);
                console.log(res);
            })
            //@ts-ignore
            .catch((err) => {
                console.log(err);
            });

        console.log(userLogs, 'userLogs')
        if (documentsLogs.length > 0 && userLogs.length > 0 && vehiclesLogs.length > 0) {
            console.log(registersU.length, "Registros usuarios")
            setAllRegisters(getValidRegisters(documentsLogs.concat(userLogs).concat(vehiclesLogs)));
        }

    };

    useEffect(() => {
        getLogs();

    }, [allRegisters, getLogs]);


    console.log(allRegisters);
    return (
        <MainContainer>

            <DataGrid
                slots={{ toolbar: GridToolbar }}
                rows={allRegisters}
                columns={columns}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    '& .header_color': {
                        backgroundColor: 'rgba(217, 217, 217)',
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