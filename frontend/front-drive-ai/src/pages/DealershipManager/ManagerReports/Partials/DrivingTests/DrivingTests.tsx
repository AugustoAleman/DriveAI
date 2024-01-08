import React, { useState, useEffect } from 'react'
import { Card } from "components/Card";
import { Graph } from "components/Graph";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from "components/Button";
import { useAppContext } from "store/app-context/app-context";

import {getDrivingTest} from "../../../../../services/ManagerReports/getDrivingTest";
import {getUserById} from "services";

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
    MainContainer, CardContainer,
    DropboxHeader, Dropbox, GraphSection,
    TotalsAndCSV, Totals, CSVDownload
} from "./styles";

import {CircularProgress} from "@mui/material";

const months = {Enero: 1, Febrero: 2, Marzo: 3, Abril: 4, Mayo: 5, Junio: 6,
    Julio: 7, Agosto: 8, Septiembre: 9, Octubre: 10,
    Noviembre: 11, Diciembre: 12};


function getKeyWithValue(dictionary: { [key: string]: number }, value: number): string {
    for (const key_ in dictionary) {
        if (dictionary.hasOwnProperty(key_) && dictionary[key_] === value) {
            return key_;
        }
    }
    return ' '; // Si no se encuentra ninguna coincidencia
}
function setMonth(testData:any[]): any[] {
    const final_data:any[] = [];
    testData.forEach((dato) => {
        const dict = {
            completed: 0,
            canceled: 0,
            month: ""
        };
        dict.completed = dato.completed;
        dict.canceled = dato.canceled;
        dict.month = getKeyWithValue(months, dato.month);

        final_data.push(dict);
    });
    return final_data;
}

const DrivingTests = () => {
    const [dealerships, setDealerships] = useState<any[]>([]);
    const [driveTests, setDriveTests] = useState<any[]>([]);
    const [dealership, setDealership] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [completed, setCompleted] = React.useState(0);
    const [canceled, setCanceled] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const appContext = useAppContext();

    const getDriveTests = async (id: any) => {
        console.log(id, "ID")
        !loading && setLoading(true);
        await getDrivingTest(id)
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "DriveTests");

                    setDriveTests(setMonth(res.data));
                        if (driveTests.length > 0) {
                        const completed = res.data.reduce((a:any, b:any) => a + b.completed, 0);
                        const canceled = res.data.reduce((a:any, b:any) => a + b.canceled, 0);
                        setCompleted(completed);
                        setCanceled(canceled);
                        setTotal(completed + canceled);
                    }


                    setLoading(false);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getUserGroup = async () => {
        setLoading(true);
        await getUserById(appContext.user?.id.toString())
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "User");
                    if (res.data.dealerships.length > 0) {
                        console.log(res.data.dealerships.length, "Dealerships")
                        const dealerships = res.data.dealerships.map((dealership:any) => {
                            console.log(dealership, "dealership")
                            return dealership;
                        })
                        setDealerships(dealerships);
                        getDriveTests(dealerships[0].id);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };


    // Función de manejo de eventos
    const handleDealershipChange = async (event: SelectChangeEvent) => {
        const newValue = event.target.value; //as string; // Nuevo valor seleccionado
        setDealership(newValue);
        await getDriveTests(newValue)
    };


    useEffect(() => {
        getUserGroup();
    }, []);


    return (
        <>
            <MainContainer>
                <Card
                    border="none"
                    borderRadius="Medium"
                    color="#FFFFFF"
                    cursor="default"
                    height="auto"
                    hoverColor="#CBD0D0"
                    margin="0 0 0 0"
                    padding="2rem 3rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="80%"
                    children={
                        <CardContainer>
                            Reportes de solicitudes de pruebas de manejo de autos por agencias.
                            <DropboxHeader>
                                <Dropbox>
                                    <b>Agencia:</b>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Agencia</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={dealership}
                                                label="Agencia"
                                                onChange={handleDealershipChange}
                                            >
                                                {dealerships.length > 0 && dealerships.map((agency) => (
                                                    <MenuItem value={agency.id} >{agency.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Dropbox>
                            </DropboxHeader>
                            <GraphSection>
                                {loading && <CircularProgress />}
                                {!loading && (<>
                                    <TotalsAndCSV>
                                        <Totals>
                                            <div>Total de pruebas agendadas: {total}</div>
                                            <div>Canceladas: {canceled}</div>
                                            <div>Completadas: {completed}</div>
                                        </Totals>

                                        <Button
                                            color="#010101"
                                            onClick={() => { }}
                                            variant="text"
                                            width="14vw"
                                            children={
                                                <CSVDownload>
                                                    Descargar CSV <FileDownloadOutlinedIcon />
                                                </CSVDownload>
                                            }
                                        />

                                    </TotalsAndCSV>
                                    {driveTests.length > 0 ? (
                                        <Graph
                                        color="#e19785"
                                        curveType="monotone"
                                        data={driveTests}
                                        dataKey="completed"
                                        height={500}
                                        margin={{
                                            bottom: 30,
                                            left: 30,
                                            right: 30,
                                            top: 30
                                        }}
                                        positionLabel="center"
                                        strokeDasharray="4"
                                        typeOfChart="Bar"
                                        width={500}
                                        xData="month"
                                        yData="completed"
                                />
                                    ): (<p>No existen registros para mostrar</p>)}
                                </>)}

                            </GraphSection>
                        </CardContainer>

                    }
                />
            </MainContainer >

        </>
    );
};

export default DrivingTests;