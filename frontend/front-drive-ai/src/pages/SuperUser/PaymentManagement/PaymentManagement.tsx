import { Container, HaederContainer } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { Filters } from "./Partials/Filters";
import { PaymentManagementTable } from "./Partials/PaymentManagementTable";
import { useStyles } from "./styles";

const PaymentManagement = () => {
  const classes = useStyles();

  return (
    <Container>
      <HaederContainer>
        <div className={classes.StaticHeader}>
          <HeaderAdminCards
            about="Gestón de cuentas"
            activeTab="general"
            onTabClick={() => {}}
            tabs={["Todas las cuentas"]}
            title="Gestión de cuentas de pagos y facturación"
          />
        </div>
      </HaederContainer>
        <PaymentManagementTable/>
    </Container>
  );
};

export default PaymentManagement;
