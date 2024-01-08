import React, {useState, PureComponent, useEffect} from "react";
import { Card } from "components/Card";
import { Graph } from "components/Graph";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from "components/Button";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import {
    MainContainer, CardContainer,
    DropboxHeader, Dropbox, GraphSection,
    TotalsAndCSV, CSVDownload, GraphsNSalesmen, SalesmenNames
} from "./styles";
import { useAppContext } from "store/app-context/app-context";
import { getSalesmanSales } from "services/ManagerReports/getSalesmanSales";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDealershipsByManagerId } from "services/User-ms/Dealership/getDealershipsByManagerId";

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

const years = [
    '2021', '2022', '2023', '2024', '2025'
];

const Salesmen = () => {
    const [dealership, setDealership] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [format, setFormat] = React.useState('');
    const [testData, setTestData] = React.useState<any[]>([]);
    const [agencias, setAgencias] = React.useState<any[]>([]);
    const [year, setYear] = React.useState('');

    const { user: loggedUser } = useAppContext();
    const id = loggedUser?.id || 0;

    const getDealershipsByManagerIdEndpoint = async () => {
        const response = await getDealershipsByManagerId(id || 0);
        setAgencias(response);
        console.log(response, "AGENCIAS");
    }

    const getSalesmanSalesEndpoint = async () => {
        const response = await getSalesmanSales({
            "groupBy":format,
            "agency":dealership,
            "month":month,
            "year":year
        })
        setTestData(response.data);
        console.log(response.data, "SALESMAN_SALES");
    }


    useEffect(() => {
        getSalesmanSalesEndpoint();
        getDealershipsByManagerIdEndpoint();
    }
    , [testData, dealership, month, format, year]);


    const handleChangeDealership = (event: SelectChangeEvent) => {
        setDealership(event.target.value as string);
    };
    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(event.target.value as string);
    };
    const handleChangeFormat = (event: SelectChangeEvent) => {
        setFormat(event.target.value as string);
    };
    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    }

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
                    margin="0px"
                    padding="2rem 3rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="80%"
                    children={
                        <CardContainer>
                            Reportes de ventas e ingresos.
                            <DropboxHeader>
                                <Dropbox>
                                    <b>Mes:</b>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={month}
                                                label="Mes"
                                                onChange={handleChangeMonth}
                                            >
                                                {months.map((month) => (
                                                    <MenuItem value={month}>{month}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Dropbox>
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
                                                onChange={handleChangeDealership}
                                            >
                                                {agencias.map((agency) => (
                                                    <MenuItem value={agency.name}>{agency.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Dropbox>
                                <Dropbox>
                                    <b>Año:</b>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Año</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={year}
                                                label="Formato"
                                                onChange={handleChangeYear}
                                            >
                                                {years.map((year) => (
                                                    <MenuItem value={year}>{year}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Dropbox>
                                <Dropbox>
                                    <b>Formato:</b>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Formato</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={format}
                                                label="Formato"
                                                onChange={handleChangeFormat}
                                            >
                                                <MenuItem value={'Year'}>Mes</MenuItem>
                                                <MenuItem value={'Month'}>Año</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Dropbox>
                            </DropboxHeader>
                            <GraphSection>
                                <TotalsAndCSV>

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

                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={testData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="salesman" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="completed" fill="#8884d8" />
                                        <Bar dataKey="open" fill="#82ca9d" />
                                    </BarChart>

                            </GraphSection>
                        </CardContainer>

                    }
                />
            </MainContainer >

        </>
    );
};

export default Salesmen;