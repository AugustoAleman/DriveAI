import React, {useEffect} from "react";
import { Button } from "components/Button"
import { Card } from "components/Card"
import { Graph } from "components/Graph";
import {
    MainContainer, Print,
    Headers, TotalsTable, TotalsTableContent, TotalsTableCol,
    GraphContainer, GraphGroup, GraphHeader, GeneralCardsContainer,
    CardsGroup
} from "./styles";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { useAppContext } from "store/app-context/app-context";
import {
    getAGAdemos,
    getAGASales,
    getAGATotals,
    getAGSales
} from "services";

const data1 =
    {
        tableName: "Nuevos usuarios al mes",
        testData: [
            {
                new_users: 120,
                name: 'Enero',
                sales: 400,
                vehicles: 300
            },
            {
                new_users: 59,
                name: 'Febrero',
                sales: 200,
                vehicles: 800
            },
            {
                new_users: 73,
                name: 'Marzo',
                sales: 900,
                vehicles: 69
            },
            {
                new_users: 56,
                name: 'Abril',
                sales: 1500,
                vehicles: 489
            },
            {
                new_users: 102,
                name: 'Mayo',
                sales: 1500,
                vehicles: 489
            }],
    }

const handleImprimir = () => {
    window.print();
};

const ReportsData = () => {
    const [loading, setLoading] = React.useState(false);
    const [driveTests, setDriveTests] = React.useState<any[]>([]);
    const [sales, setSales] = React.useState<any[]>([]);
    const [totals, setTotals] = React.useState<any>([]);
    const [salesAG, setSalesAG] = React.useState<any[]>([]);
    const appContext = useAppContext();

    const getDriveTests = async () => {
        !loading && setLoading(true);
        await getAGAdemos(appContext.user?.agId.toString() || "")
            .then((res: any) => {
                if (res && res.data) {

                    setDriveTests(res.data);
                    setLoading(false);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getAGMonthSales = async () => {
        !loading && setLoading(true);
        await getAGSales(appContext.user?.agId.toString() || "")
            .then((res) => {
                if (res && res.data) {

                    setSalesAG(res.data);
                    setLoading(false);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getTotals = async () => {
        !loading && setLoading(true);
        await getAGATotals(appContext.user?.agId.toString() || "")
            .then((res) => {
                if (res && res.data) {

                    setTotals(res.data);
                    setLoading(false);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getSales = async () => {
        !loading && setLoading(true);
        await getAGASales(appContext.user?.agId.toString() || "")
            .then((res) => {
                if (res && res.data) {

                    setSales(res.data);
                    setLoading(false);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDriveTests();
        getSales();
        getTotals();
        getAGMonthSales();
    }, []);

    return <MainContainer>

        <Headers>
            <Button
                color="#050505"
                fontWeight="normal"
                onClick={() => {handleImprimir()}}
                variant="text"
                width="13vw"
                children={
                    <Print>
                        <BusinessCenterOutlinedIcon />
                        <span>Imprimir</span>
                    </Print>
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
                            <h3>Totales</h3>
                            <TotalsTableContent>
                                <TotalsTableCol>
                                    <b>Ingresos: $</b> {totals.income}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Egresos: $</b> {totals.loss}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Ventas en progreso:</b> {totals.sales_in_progress}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Solicitudes: </b> {totals.requests}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Ventas: </b> {totals.sales}
                                </TotalsTableCol>
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
                    padding="2rem 2rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="100%"
                    children={
                        <GraphContainer>
                            <GraphHeader>
                                <h3>Ventas</h3>
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
                            <Graph
                                color="#855CF8"
                                curveType="monotone"
                                data={salesAG}
                                dataKey="month"
                                height={400}
                                margin={{
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    top: 0
                                }}
                                positionLabel="top"
                                strokeDasharray="4"
                                typeOfChart="Area"
                                width={500}
                                xData="month"
                                yData="sales"
                            />
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
                    padding="2rem 2rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="80%"
                    children={
                        <>
                            <GraphContainer>
                                <GraphGroup>
                                    <h3>Pruebas de manejo y Autos vendidos</h3>
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
                                    margin="0px 4rem 0px 4rem"
                                    padding="2rem 2rem"
                                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                                    width="auto"
                                    children={
                                        <>

                                            <h4>Autos vendidos</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={sales}
                                                dataKey="dealership"
                                                height={300}
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
                                                xData="dealership"
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
                                    margin="0px 3rem 0px 3rem"
                                    padding="2rem 2rem"
                                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                                    width="auto"
                                    children={
                                        <>

                                            <h4>Solicitudes de conducción</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={driveTests}
                                                dataKey="dealership"
                                                height={300}
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
                                                xData="dealership"
                                                yData="demos"
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

export default ReportsData;
