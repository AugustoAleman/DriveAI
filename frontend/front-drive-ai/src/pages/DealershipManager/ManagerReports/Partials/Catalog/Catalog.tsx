import React, {useEffect} from "react";
import { Card } from "components/Card";
import { Graph } from "components/Graph";
import { Button } from "components/Button";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
    MainContainer,
    CardContainer,
    GraphSection,
    TotalsAndCSV,
    CSVDownload
} from "./styles";

import { getVehiclesByDealershipId } from "services";
import { getUserById } from "services";
import { useAppContext } from "store/app-context/app-context";
import {CircularProgress} from "@mui/material";

const Catalog = () => {
    const [vehiclesByDealership, setVehiclesByDealership] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [vehiclesCount,setVehiclesCount] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    const appContext = useAppContext();

    const getVehiclesByDealership = async (id: any) => {
        console.log(id, "ID")
        await getVehiclesByDealershipId(id)
            .then((res: any) => {
                if (res && res.data) {

                    console.log(res.data, "Vehicles")

                    const vehicles = res.data.map((vehicle:any) => {
                        return vehicle;
                    });

                    console.log(vehicles.length, "Vehicles Length")
                    setVehiclesCount(vehicles.length);

                }
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getDealershipsIds = async () => {
        setLoading(true);
        await getUserById(appContext.user?.id.toString())
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "User");
                    if (res.data.dealerships.length > 0) {

                        !loading && setLoading(true);
                        console.log(res.data.dealerships.length, "Dealerships")

                        const dealerships = res.data.dealerships.map((dealership:any) => {
                            console.log(dealership, "dealership")
                            return dealership;
                        })

                        const vehicles:any[] = [];

                        dealerships.map((dealership:any) => {
                            !loading && setLoading(true);
                            getVehiclesByDealership(dealership.id).then(() => {
                                const obj = {name: dealership.name, value: vehiclesCount}
                                vehicles.push(obj);

                                setVehiclesByDealership(vehicles);
                                console.log(vehiclesByDealership, "Vehicles By Dealership");
                                setLoading(false);

                                if (vehicles.length > 0) {
                                    setVisible(true);
                                }
                            });

                        })



                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDealershipsIds()
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
                    margin="15rem 0 0 0"
                    padding="2rem 3rem"
                    shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                    width="80%"
                    children={
                        <CardContainer>
                            Reportes de distribución de autos por agencia.

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

                                {loading && <CircularProgress />}
                                {!loading && visible && (vehiclesByDealership.length > 1 && vehiclesByDealership[0].value > 0)?(<Graph
                                color="#e19785"
                                curveType="monotone"
                                data={vehiclesByDealership}
                                dataKey="value"
                                height={500}
                                margin={{
                                    bottom: 30,
                                    left: 30,
                                    right: 30,
                                    top: 30
                                }}
                                positionLabel="center"
                                strokeDasharray="4"
                                typeOfChart="Pie"
                                width={500}
                                xData="name"
                                yData="value"
                            />): (<p>No hay datos para mostrar</p>)}

                            </GraphSection>
                        </CardContainer>

                    }
                />
            </MainContainer >

        </>
    );
};

export default Catalog;