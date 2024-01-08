import React from "react";
import { Container, Client, useStyles} from "./styles";
import { useState  } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import {ManagerRequiredDocumentationManagement} from "./Partials/MRequiredDocumentation";

const DocumentsManagement = () => {
    const [activeTab, setActiveTab] = useState("Documentos");
    const tabs = ["Documentos"];
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
                            about="Documentación"
                            title="Administración de cuentas por agencia"
                            onTabClick={handleClick}
                        />
                    </div>

                    {activeTab === "Documentos" && (
                    <ManagerRequiredDocumentationManagement />
                    )}
            </Container>
        </>
    );
};

export default DocumentsManagement;
