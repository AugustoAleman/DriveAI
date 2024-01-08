import { Compositor,  useStyles } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { NavbarVertical } from "components/NavbarVertical";
import { useState } from "react";
import { SalesmanReportsRegisters} from "pages/Salesman/SalesmanReportsRegisters";

const SalesmanReportsRegistersRoot = () => {
    // const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Reportes y registros");
    const classes = useStyles();
    const tabs = ["Reportes y registros"];

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
            <Compositor>
                    <div className={classes.StaticHeader}>
                        <HeaderAdminCards
                            tabs={tabs}
                            activeTab={activeTab}
                            about="Reportes y registros"
                            title="Reportes y registros"
                            onTabClick={handleTabClick}
                        />
                    </div>
                    {activeTab === "Reportes y registros" && (
                        <SalesmanReportsRegisters />
                    )}
            </Compositor>
        </>
    );
};

export default SalesmanReportsRegistersRoot;
