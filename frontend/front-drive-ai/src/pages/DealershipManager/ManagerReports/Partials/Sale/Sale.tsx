import React, {useEffect} from "react";
import { Card } from "components/Card";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from "components/Button";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
    MainContainer, CardContainer,
    DropboxHeader, Dropbox, GraphSection,
    TotalsAndCSV, CSVDownload
} from "./styles";
import { getDealershipsByManagerId } from "services/User-ms/Dealership/getDealershipsByManagerId";
import { useAppContext } from "store/app-context/app-context";
import { getTransactionsByDealershipId } from "services";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Sale = () => {
    const [dealership, setDealership] = React.useState('');
    const [agencias, setAgencias] = React.useState<any[]>([]);
    const [testData, setTestData] = React.useState<any[]>([]);
    const { user: loggedUser } = useAppContext();
    const id = loggedUser?.id || 0;

    useEffect(() => {
            getSalesEndpoint();
            getDealershipsByManagerIdEndpoint();
        }
        , [dealership, testData]);

    const getDealershipsByManagerIdEndpoint = async () => {
        const response = await getDealershipsByManagerId(id || 0);
        setAgencias(response);
        console.log(response, "AGENCIAS");
    }
    const getSalesEndpoint = async () => {
        const response = await getTransactionsByDealershipId( dealership || "1");
        setTestData(response.data.transactions);
    }

    const handleChangeDealership = (event: SelectChangeEvent) => {
        setDealership(event.target.value as string);
    };

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
                                                    <MenuItem value={agency.id}>{agency.name}</MenuItem>
                                                ))}
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
                                <h3>TRANSACCIONES</h3>
                                <LineChart
                                    width={700}
                                    height={400}
                                    data={testData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="vehicleInfo.name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="vehicleInfo.price" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>

                            </GraphSection>
                        </CardContainer>

                    }
                />
            </MainContainer >

        </>
    );
};

export default Sale;