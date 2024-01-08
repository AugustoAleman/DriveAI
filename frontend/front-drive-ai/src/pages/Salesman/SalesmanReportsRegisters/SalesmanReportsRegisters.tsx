import React, {useEffect} from "react";
import { Button } from "components/Button"
import { Card } from "components/Card"
import { Graph } from "components/Graph";
import {
    MainContainer, Print, MoreActions,
    Headers, TotalsTable, TotalsTableContent, TotalsTableCol,
    GraphContainer, GraphGroup, GraphHeader, GeneralCardsContainer,
    CardsGroup, DataTable
} from "./styles";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {getSalesmanSales, getSalesmanDemos, getSalesmanTotals } from "services";
import {useAppContext} from "../../../store/app-context/app-context";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id. de usuario', flex: 1, headerClassName: 'header_color' },
    { field: 'agency', headerName: 'Agencia', flex: 1, headerClassName: 'header_color' },
    { field: 'change_hour', headerName: 'Hora de cambio', flex: 1, headerClassName: 'header_color' },
    { field: 'change_date', headerName: 'Fecha de cambio', flex: 1, headerClassName: 'header_color' },
    { field: 'type', headerName: 'Tipo', flex: 1, headerClassName: 'header_color' },
];

const rows = [
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45561, agency: 'Kia Motors -Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45562, agency: 'Mazda - Periferico', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45563, agency: 'Nissan - Centro', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45564, agency: 'Ford - Av. Morelos', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45565, agency: 'Kia Motors - Santa Fe', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45566, agency: 'Toyota - Tlahuac', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
    { id: 45567, agency: 'Toyota - Reforma', change_hour: '06:27:18 am', change_date: '11/03/2023', type: 'Coche registrado' },
];

const SalesmanReportsRegisters = () => {
    //const { tableName, testData } = data;
    //const { title, totals } = totalsData;
    const [totals, setTotals] = React.useState<{ concepto: string; total: any; }[]>([]);
    const [sales, setSales] = React.useState<any[]>([]);
    const [demos, setDemos] = React.useState<any[]>([]);
    const { user: loggedUser } = useAppContext();
    const id = loggedUser?.id || 0;

    useEffect(() => {
            getSalesmanTotalsEndpoint();
            getSalesmanSalesEndpoint();
            getSalesmanDemosEndpoints();
        }
        , []); //totals, sales, demos
    const getSalesmanTotalsEndpoint = async () => {
        const response = await getSalesmanTotals(id || 0);
        setTotals([
            {
                "concepto": "Ingresos",
                "total": response.data.income
            },
            {
                "concepto": "Perdidas",
                "total": response.data.loss
            },
            {
                "concepto": "Ventas en progreso",
                "total": response.data.sales_in_progress
            },
            {
                "concepto": "Soliciudes",
                "total": response.data.requests
            },
            {
                "concepto": "Ventas",
                "total": response.data.sales
            }
        ]);

        console.log(response.data, "TOTALS");
    }
    const getSalesmanSalesEndpoint = async () => {
        const response = await getSalesmanSales(id || 0);
        setSales(response.data);
        console.log(response.data, "SALES");
    }
    const getSalesmanDemosEndpoints = async () => {
        const response = await getSalesmanDemos(id || 0);
        setDemos(response.data);
        console.log(response.data, "DEMOS");
    }



    return <MainContainer>

        <Headers>
            <Button
                color="#050505"
                fontWeight="normal"
                onClick={() => { }}
                variant="text"
                width="13vw"
                children={
                    <Print>
                        <BusinessCenterOutlinedIcon />
                        <span>Imprimir</span>
                    </Print>
                }

            />
            <Button
                color="#050505"
                fontWeight="normal"
                onClick={() => { }}
                variant="text"
                width="13vw"
                children={
                    <MoreActions>
                        <span>Más acciones</span>
                        <ArrowDropDownSharpIcon />
                    </MoreActions>
                }

            />
        </Headers>

        <GeneralCardsContainer>
            <CardsGroup>
                <Card
                    border="none"
                    borderRadius="Medium"
                    color="#FFFFFF"
                    cursor="default"
                    height="40%"
                    hoverColor="#CBD0D0"
                    margin="0px"
                    padding="2rem 2rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="100%"
                    children={
                        <TotalsTable>
                            <h3>Totales:</h3>
                            <TotalsTableContent>
                                {totals.map((total, index) => (
                                    <TotalsTableCol key={index}>
                                        <b>{total.concepto}:</b> {total.total}
                                    </TotalsTableCol>
                                ))}
                            </TotalsTableContent>
                        </TotalsTable>
                    }
                />

                <Card
                    border="none"
                    borderRadius="Medium"
                    color="#FFFFFF"
                    cursor="default"
                    height="60%"
                    hoverColor="#CBD0D0"
                    margin="0px"
                    padding="2rem 3rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="100%"
                    children={
                        <GraphContainer>
                            <GraphHeader>
                                <h3>Registros</h3>
                                <Button
                                    color="#050505"
                                    fontWeight="normal"
                                    onClick={() => { }}
                                    variant="text"
                                    width="auto"
                                    children={
                                        <FileDownloadOutlinedIcon fontSize="large" />
                                    }

                                />
                            </GraphHeader>
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
                                            fontSize: '1rem',
                                        },
                                        flex: 1
                                    }}
                                />
                            </DataTable>

                        </GraphContainer>
                    }
                />
            </CardsGroup>
            <CardsGroup>
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
                    width="auto"
                    children={
                        <>
                            <GraphContainer>
                                <GraphGroup>
                                    <h3>Ventas y demos</h3>
                                    <Button
                                        color="#050505"
                                        fontWeight="normal"
                                        onClick={() => { }}
                                        variant="text"
                                        width="auto"
                                        children={
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        }

                                    />
                                </GraphGroup>
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
                                    width="auto"
                                    children={
                                        <>

                                            <h4>Ventas</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={sales}
                                                dataKey="month"
                                                height={250}
                                                margin={{
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    top: 0
                                                }}
                                                positionLabel="top"
                                                strokeDasharray="4"
                                                typeOfChart="Bar"
                                                width={400}
                                                xData="month"
                                                yData="sales"
                                            />
                                        </>}
                                />
                                <br />
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
                                    width="auto"
                                    children={
                                        <>

                                            <h4>Demos</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={demos}
                                                dataKey="month"
                                                height={250}
                                                margin={{
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    top: 0
                                                }}
                                                positionLabel="top"
                                                strokeDasharray="4"
                                                typeOfChart="Bar"
                                                width={400}
                                                xData="month"
                                                yData="demo"
                                            />
                                        </>} />
                            </GraphContainer>
                        </>
                    }
                />
            </CardsGroup>
        </GeneralCardsContainer>
    </MainContainer >;
};

export default SalesmanReportsRegisters;
