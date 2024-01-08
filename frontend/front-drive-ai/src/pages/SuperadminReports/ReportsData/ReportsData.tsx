import React from "react";
import { Button } from "components/Button"
import { Card } from "components/Card"
import { Graph } from "components/Graph";
import {
    MainContainer, Print, MoreActions,
    Headers, TotalsTable, TotalsTableContent, TotalsTableCol,
    GraphContainer, GraphGroup, GraphHeader, GeneralCardsContainer,
    CardsGroup
} from "./styles";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const data =
{
    tableName: "Pérdidas",
    testData: [
        {
            loses: 2400,
            name: 'Page A',
            sales: 400,
            vehicles: 300
        },
        {
            loses: 2800,
            name: 'Page B',
            sales: 700,
            vehicles: 800
        },
        {
            loses: 1500,
            name: 'Page C',
            sales: 900,
            vehicles: 69
        },
        {
            loses: 400,
            name: 'Page D',
            sales: 1500,
            vehicles: 489
        },
        {
            loses: 400,
            name: 'Page D',
            sales: 1500,
            vehicles: 489
        }]
}


const totalsData = {
    title: "Totales",

    totals: [
        {
            concepto: "Ganancias",
            total: "$ 184,260.30"
        },
        {
            concepto: "Ventas en progreso",
            total: "16(+3)"
        },
        {
            concepto: "Egresos",
            total: "$ 54,000.00"
        },
        {
            concepto: "Solicitudes",
            total: "32(-2)"
        },
        {
            concepto: "Ventas",
            total: 3
        }

    ]
}

const ReportsData = () => {
    const { tableName, testData } = data;
    const { title, totals } = totalsData;
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
                            <h3>{title}</h3>
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
                                <h3>{tableName}</h3>
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
                                data={testData}
                                dataKey="Solicitudes de conducción"
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
                                width={400}
                                xData="agency"
                                yData="loses"
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
                    padding="2rem 3rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="auto"
                    children={
                        <>
                            <GraphContainer>
                                <GraphGroup>
                                    <h3>{tableName}</h3>
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

                                            <h4>{tableName}</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={testData}
                                                dataKey="Solicitudes de conducción"
                                                height={400}
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
                                                xData="agency"
                                                yData="loses"
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

                                            <h4>{tableName}</h4>

                                            <Graph
                                                color="#855CF8"
                                                curveType="monotone"
                                                data={testData}
                                                dataKey="Solicitudes de conducción"
                                                height={400}
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
                                                xData="agency"
                                                yData="loses"
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
