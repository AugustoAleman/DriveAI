import React from "react";
import { Container, Client, useStyles } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import {ReportsData} from "./Partials/ReportsData";
import {SystemRegisters} from "./Partials/SystemRegisters";

const AutomotiveGpAdminReports = () => {
    const [activeTab, setActiveTab] = useState("Reportes/Datos");
    const tabs = ["Reportes/Datos", "Registros del sistema"];
    const classes = useStyles();

    const handleClick = (tab: string) => {
        if (tab === activeTab) {
            return;
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <>
            <Container>
                    <div className={classes.StaticHeader}>
                        <HeaderAdminCards
                            tabs={tabs}
                            activeTab={activeTab}
                            about="Reportes y registros"
                            title="Reportes y registros"
                            onTabClick={handleClick}
                        />
                    </div>
                    {activeTab === "Reportes/Datos" && (
                        <ReportsData />
                    )}

                    {activeTab === "Registros del sistema" && (
                        <SystemRegisters />
                    )}
            </Container>
        </>
    );
};
export default AutomotiveGpAdminReports;
