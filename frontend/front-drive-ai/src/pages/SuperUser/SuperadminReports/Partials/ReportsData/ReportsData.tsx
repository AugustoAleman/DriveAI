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

import { getGroupsTransactions,
    getNewUsersCount,
    getDrivingTestsAG,
    getSuperUserTotals
} from "services";


const ReportsData = () => {
    const [loading, setLoading] = React.useState(false);
    const [soldCars, setSoldCars] = React.useState<any>([]);
    const [newUsers, setNewUsers] = React.useState<any>([]);
    const [driveTests, setDriveTests] = React.useState<any>([]);
    const [totalsData, setTotalsData] = React.useState<any>([]);
    const getSoldCarsData = async () => {
        !loading && setLoading(true);
        await getGroupsTransactions()
            .then((res) => {
                if (res && res.data) {

                    const data = res.data.dealershipsAndTransactions.map((item: any) => {
                        return {
                            dealership: item.dealershipInfo.name,
                            transactions: item.transactions.length,

                        }
                    });

                    setLoading(false);
                    setSoldCars(data);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getTotals = async () => {
        !loading && setLoading(true);
        await getSuperUserTotals()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res.data");

                    setLoading(false);
                    setTotalsData(res.data);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getAllDriveTest = async () => {
        !loading && setLoading(true);
        await getDrivingTestsAG("year")
            .then((res) => {
                if (res && res.data) {

                    setLoading(false);
                    setDriveTests(res.data);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getNewUsers = async () => {
        !loading && setLoading(true);
        await getNewUsersCount()
            .then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    setNewUsers(res.data);
                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };


    useEffect(() => {
        getSoldCarsData();
        getNewUsers();
        getAllDriveTest();
        getTotals();
    }, []);

    const handleImprimir = () => {
        window.print();
    };

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
                                    <b>Ingresos: $</b> {totalsData.income}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Egresos: $</b> {totalsData.loss}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Ventas en progreso:</b> {totalsData.sales_in_progress}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Solicitudes: </b> {totalsData.requests}
                                </TotalsTableCol>
                                <TotalsTableCol>
                                    <b>Ventas: </b> {totalsData.sales}
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
                                <h3>Ingresos por agencia</h3>
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
                                data={newUsers}
                                dataKey="name"
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
                                xData="name"
                                yData="new_users"
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

                                            <h4>Autos vendidos por agencia</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={soldCars}
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
                                                yData="transactions"
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

                                            <h4>Pruebas de manejo completadas por grupo</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={driveTests}
                                                dataKey="Solicitudes de conducción"
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
                                                xData="name"
                                                yData="drive_tests"
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
