// Import the pages of the application and create the routes
import {
	Home,
	SalesProcessesRoot,
	SalesRepresentativeRoot,
	AccountManagement,
	DealershipAccountAdministration,
	DealershipAccountsAndPlans,
	DealershipAdministration,
	AssignedSalesRoot,
	ManagerAccountManagement,
	BankAccounts,
	DocumentsManagement,
	ManageEmployeesRoot,
	ModalPageRoot,
	InsuranceFinanceRoot,
	RegisterFormulaire,
	RegisterConfirmationCode,
	RegisterFormulaireGroup,
	CompareRoot,
	FavoriteRoot,
	Login,
	Signup,
	SalesProcess,
	PasswordRecover,
	NewPassword,
	Privacy,
	TermsAndConditions,
	Chat,
	ChatClient,
} from "pages";

// Import routes aliases
import { ROUTES } from "routes/constants";

// Import the route object
import { RouteObject, createBrowserRouter } from "react-router-dom";

// Import administration routers
import AGARouter from "routes/AdministrationRouters/AGARouter";
import ManagerRouter from "routes/AdministrationRouters/ManagerRouter";
import SalesmanRouter from "routes/AdministrationRouters/SalesmanRouter";
import SuperAdminRouter from "routes/AdministrationRouters/SuperAdminRouter";

// Import the user routers
import PublicUserRouter from "routes/PublicRouters/PublicUserRouter";
import ProtectedUserRouter from "routes/PublicRouters/ProtectedUserRouter";
import UserSalesProcessRouter from "routes/PublicRouters/UserSalesProcessRouter";
import UserSettingsRouter from "routes/PublicRouters/UserSettingsRouter";

// Import pages
import { VehicleSelectionCard } from "pages/VehicleSelectionCard";
import { AboutUs } from "pages/AboutUs";
import UserSettings from "pages/UserSettings/UserSettings";
import RequestTables from "pages/SuperUser/RequestsTables/RequestTables";
import SuperadminReports from "../pages/SuperUser/SuperadminReports/SuperadminReports";
import {
	AdministrationProfile,
	ApplicationDetails,
	PaymentManagement,
	PriceManagement,
} from "../pages";
import VehicleCatalogueAndAssignationPage from "pages/DealershipManager/VehicleCatalogueAndAssignation/Root/VehicleCatalogueAndAssignation";
import VehiclesCatalogRouter from "pages/VehiclesCatalog/VehiclesCatalog";
import SalesmanReportsRegistersRoot from "../pages/Salesman/SalesmanReportsRegisters/SalesmanReportsRegistersRoot/SalesmanReportsRegistersRoot";
import { AutomotiveGpAdminReports } from "../pages/AutomotiveGroupAdmin/AutomotiveGpAdminReports";
import ManagerReports from "../pages/DealershipManager/ManagerReports/ManagerReports";
//import ManagerReports from "../pages/DealershipManager/ManagerReports/ManagerReports";

const routes: RouteObject[] = [
	{
		path: ROUTES.HOME,
		element: <PublicUserRouter />,
		children: [
			{ index: true, element: <Home /> },
			//{ path: "register-formulaire", element: <RegisterFormulaire /> },
			{
				path: "register-formulaire-group",
				element: <RegisterFormulaireGroup />,
			},
			{
				path: "registration-code",
				element: <RegisterConfirmationCode />,
			},
			{ path: "*", element: <div>Page of error public router</div> },
			{
				path: "/vehicle-selection/:vehicleId",
				element: <VehicleSelectionCard />,
			},
			{ path: "/vehicle-catalog", element: <VehiclesCatalogRouter /> },
			{ path: "/about-us", element: <AboutUs /> },
			{ path: "/terms-and-conditions", element: <TermsAndConditions /> },
			{ path: "/privacy-policy", element: <Privacy /> },
		],
	},
	{
		path: ROUTES.HOME + "/login",
		element: <ProtectedUserRouter />,
		children: [{ index: true, element: <Login /> }],
	},
	{
		path: ROUTES.HOME + "/signup",
		element: <ProtectedUserRouter />,
		children: [{ index: true, element: <Signup /> }],
	},
	{
		path: ROUTES.HOME + "/register-formulaire",
		element: <ProtectedUserRouter />,
		children: [{ index: true, element: <RegisterFormulaire /> }],
	},
	{
		path: ROUTES.HOME + "/password-recover",
		element: <ProtectedUserRouter />,
		children: [
			{ index: true, element: <PasswordRecover /> },
			{ path: "new-password/:token", element: <NewPassword /> },
		],
	},
	{
		path: ROUTES.HOME + "/password-recover",
		element: <ProtectedUserRouter />,
		children: [
			{ index: true, element: <PasswordRecover /> },
			{ path: "new-password/:token", element: <NewPassword /> },
		],
	},
	{
		/* Write any other router you need */
		path: ROUTES.USER_SETTINGS,
		element: <UserSettingsRouter />,
		children: [{ index: true, element: <UserSettings /> }],
	},
	{
		/* Write any other router you need */
		path: "sell-chat/:sellId",
		element: <UserSettingsRouter />,
		children: [{ index: true, element: <ChatClient /> }],
	},
	{
		path: ROUTES.SUPERADMIN,
		element: <SuperAdminRouter />,
		children: [
			{ index: true, element: <AdministrationProfile /> },
			{ path: "requests", element: <RequestTables /> },
			{ path: "paymentMangement", element: <PaymentManagement /> },
			{ path: "priceManagement", element: <PriceManagement /> },
			{ path: "requests/details/:id", element: <ApplicationDetails /> },
			{ path: "reportsAndRegisters", element: <SuperadminReports /> },
			{ path: "*", element: <div>Page of error super user router</div> },
			{ path: "*", element: <div>Page of error admin router</div> },
		],
	},
	{
		path: ROUTES.AUTOMOTIVE_GROUP_ADMIN,
		element: <AGARouter />,
		children: [
			{ index: true, element: <AccountManagement /> },
			{
				path: "dealership-administration",
				element: <DealershipAccountAdministration />,
			},
			{
				path: "dealership-plans",
				element: <DealershipAccountsAndPlans />,
			},
			{
				path: "dealership-general-administration",
				element: <DealershipAdministration />,
			},
			{
				path: "dealership-reports-and-registers",
				element: <AutomotiveGpAdminReports />,
			},
			{
				path: "*",
				element: <div>Page of error automotive-admin router</div>,
			},
		],
	},
	{
		path: ROUTES.MANAGER,
		element: <ManagerRouter />,
		children: [
			{ index: true, element: <ManagerAccountManagement /> },
			{ path: "bank-accounts", element: <BankAccounts /> },
			{
				path: "documentation-management",
				element: <DocumentsManagement />,
			},
			{ path: "manage-employees", element: <ManageEmployeesRoot /> },
			{ path: "sales-processes", element: <SalesProcessesRoot /> },
			{
				path: "vehicle-catalog-and-assignation",
				element: <VehicleCatalogueAndAssignationPage />,
			},
			{
				path: "reports-and-registers",
				element: <ManagerReports />,
			},
			{ path: "*", element: <div>Page of error admin router</div> },
		],
	},
	{
		path: ROUTES.SALES,
		element: <SalesmanRouter />,
		children: [
			{ index: true, element: <SalesRepresentativeRoot /> },
			{ path: "assignedSales", element: <AssignedSalesRoot /> },
			{ path: "insuranceFinance", element: <InsuranceFinanceRoot /> },
			{ path: "assigned-sales", element: <AssignedSalesRoot /> },
			{
				path: "assigned-sales/modal-page/:id",
				element: <ModalPageRoot />,
			},
			{
				path: "chat",
				element: <Chat />,
			},
			{
				path: "reports-and-registers",
				element: <SalesmanReportsRegistersRoot />,
			},
			{ path: "*", element: <div>Page of error admin router</div> },
		],
	},
	/* Write any other router you need */
	{
		path: ROUTES.USER_SALES_PROCESS,
		element: <UserSalesProcessRouter />,
		children: [{ index: true, element: <SalesProcess /> }],
	},
	{
		path: ROUTES.FAVORITES + "/list/",
		element: <PublicUserRouter />,
		children: [
			{ index: true, element: <FavoriteRoot /> },
			{ path: "bank-accounts", element: <BankAccounts /> },
			{
				path: "documentation-management",
				element: <DocumentsManagement />,
			},
			{ path: "manage-employees", element: <ManageEmployeesRoot /> },
			{ path: "sales-processes", element: <SalesProcessesRoot /> },
			{
				path: "vehicle-catalog-and-assingation",
				element: <VehicleCatalogueAndAssignationPage />,
			},
			{ path: "*", element: <div>Page of error admin router</div> },
		],
	},
	{
		path: ROUTES.COMPARISON + "/list/",
		element: <PublicUserRouter />,
		children: [
			{ index: true, element: <CompareRoot /> },
			{ path: "*", element: <div>Page of error admin router</div> },
		],
	},
	/* Write any other router you need */
	{
		path: ROUTES.USER_SALES_PROCESS,
		element: <UserSalesProcessRouter />,
		children: [{ index: true, element: <SalesProcess /> }],
	},
];

export const router = createBrowserRouter(routes);
