import React from "react";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import {ReportsData} from "./Partials/ReportsData";
import {SystemRegisters} from "./Partials/SystemRegisters";
import {Container } from "./styles";
import { useStyles } from "./styles";

const SuperadminReports = () => {
    const [activeTab, setActiveTab] = useState("Reportes/Datos");
    const classes = useStyles();
    const tabs = ["Reportes/Datos", "Registros del sistema"];

    const handleTabClick = (tab: string) => {
        console.log("Clicked on", tab);

        if (tab === activeTab) {
            return;
        } else {
            console.log("Tab has changed!");
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
                            onTabClick={handleTabClick}
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

export default SuperadminReports;
