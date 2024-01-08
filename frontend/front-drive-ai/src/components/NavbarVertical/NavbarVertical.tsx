import React, { useEffect, useState } from "react";

// Importing icons
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupsIcon from "@mui/icons-material/Groups";
import Person2Icon from "@mui/icons-material/Person2";
import StartIcon from "@mui/icons-material/Start";
import GppGoodIcon from "@mui/icons-material/GppGood";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WalletIcon from "@mui/icons-material/Wallet";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "components/IconButton";
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';


// Importing nav bar data
import { NavbarVerticalProp } from "./types";
import { ShowNavbarVertical } from "./styles";

// Importing others
import theme from "theme/theme";
import logo from "assets/logoAlone.png";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppContext } from "store/app-context/app-context";

const NavbarVertical: React.FC<NavbarVerticalProp> = ({
	color = theme.palette.primary.main,
	width = "70px",
	rol = "",
	marginIconButt = "8px",
	iconSize = "1.5rem",
	position = "fixed",
}) => {
	const location = useLocation();
	const navigation = useNavigate();
	const appContext = useAppContext();
	const [activeIcon, setActiveIcon] = useState(location.pathname);

	useEffect(() => {
		setActiveIcon(location.pathname);
	}, [location.pathname]);

	const getIconColor = (pathname: string) => {
		return activeIcon === pathname ? "#DE4D5A" : "#FFFFFF";
	};

	const logout = () => {
		// TODO: tokens

		// Set app context
		appContext.setUser(null);
		appContext.setLoggedIn(false);
		appContext.setProfilePicture(null);

		// Erase localStorage
		sessionStorage.clear();
		localStorage.clear();
		navigation("/");
	};

	if (rol === "SALESMAN") {
		return (
			<ShowNavbarVertical
				color={color}
				width={width}
				marginIconButt={marginIconButt}
				iconSize={iconSize}
			>
				{/* Logo */}
				<div>
					<img
						src={logo}
						alt="Descripcion"
						width="35px"
						height="35px"
						style={{ marginTop: "20px", marginBottom: "50px" }}
					/>
				</div>

				{/* Buttons for options to the user */}
				<div className="divIconUser">
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<HomeIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/"),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log(
									"GOING TO /salesman/reports-and-registers"
								);
								navigation("/salesman/reports-and-registers");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<BarChartIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/salesman/reports-and-registers"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log(
									"GOING TO /salesman/insuranceFinance"
								);
								navigation("/salesman/insuranceFinance");
							}}
							width="4vw"
						>
							<InsertDriveFileOutlinedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/salesman/insuranceFinance"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log(
									"GOING TO /salesman/assigned-sales"
								);
								navigation("/salesman/assigned-sales");
							}}
							width="4vw"
						>
							<GroupsIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/salesman/assigned-sales"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log("GOING TO /salesman");
								navigation("/salesman");
							}}
							width="4vw"
						>
							<Person2Icon
								style={{
									fontSize: iconSize,
									color: getIconColor("/salesman"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log("GOING TO /chat");
								navigation("/salesman/chat");
							}}
							width="4vw"
						>
							<ChatIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/salesman/chat"),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={logout}
							width="4vw"
						>
							<LogoutIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>

				{/* Buttons for help */}
				<div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<GppGoodIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<QuestionAnswerRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>
			</ShowNavbarVertical>
		);
	} else if (rol === "MANAGER") {
		return (
			<ShowNavbarVertical
				color={color}
				width={width}
				marginIconButt={marginIconButt}
			>
				{/* Logo */}
				<div>
					<img
						src={logo}
						alt="Descripcion"
						width="35px"
						height="35px"
						style={{ marginTop: "20px", marginBottom: "50px" }}
					/>
				</div>

				{/* Buttons for options to the user */}
				<div className="divIconUser">
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<HomeIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/"),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								console.log("GOING TO /manager/reports");
								navigation("/manager/reports-and-registers");
							}}
							width="4vw"
						>
							<BarChartIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/reports-and-registers"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/manager/sales-processes");
							}}
							width="4vw"
						>
							<ShoppingCartOutlinedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/sales-processes"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => navigation("/manager/bank-accounts")}
							width="4vw"
						>
							<WalletIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/bank-accounts"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation(
									"/manager/vehicle-catalog-and-assignation"
								)
							}
							width="4vw"
						>
							<DirectionsCarIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/vehicle-catalog-and-assignation"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/manager/manage-employees");
							}}
							width="4vw"
						>
							<GroupsIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/manage-employees"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation("/manager/documentation-management")
							}
							width="4vw"
						>
							<FolderIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/manager/documentation-management"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => navigation("/manager")}
							width="4vw"
						>
							<Person2Icon
								style={{
									fontSize: iconSize,
									color: getIconColor("/manager"),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={logout}
							width="4vw"
						>
							<LogoutIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>

				{/* Buttons for help */}
				<div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<GppGoodIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<QuestionAnswerRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>
			</ShowNavbarVertical>
		);
	} else if (rol === "AGA") {
		return (
			<ShowNavbarVertical
				color={color}
				width={width}
				marginIconButt={marginIconButt}
			>
				{/* Logo */}
				<div>
					<img
						src={logo}
						alt="Descripcion"
						width="35px"
						height="35px"
						style={{ marginTop: "20px", marginBottom: "50px" }}
					/>
				</div>

				{/* Buttons for options to the user */}
				<div className="divIconUser">
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<HomeIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/"),
								}}
							/>
						</IconButton>
					</div>

					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation(
									"/automotive-group-admin/dealership-reports-and-registers"
								);
							}}
							width="4vw"
						>
							<BarChartIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/automotive-group-admin/dealership-reports-and-registers"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation(
									"/automotive-group-admin/dealership-plans"
								)
							}
							width="4vw"
						>
							<ShoppingCartOutlinedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/automotive-group-admin/dealership-plans"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation(
									"/automotive-group-admin/dealership-administration"
								)
							}
							width="4vw"
						>
							<WalletIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/automotive-group-admin/dealership-administration"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation(
									"/automotive-group-admin/dealership-general-administration"
								)
							}
							width="4vw"
						>
							<GroupsIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/automotive-group-admin/dealership-general-administration"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() =>
								navigation("/automotive-group-admin")
							}
							width="4vw"
						>
							<Person2Icon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/automotive-group-admin"
									),
								}}
							/>
						</IconButton>
					</div>
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={logout}
							width="4vw"
						>
							<LogoutIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>

				{/* Buttons for help */}
				<div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<GppGoodIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<QuestionAnswerRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>
			</ShowNavbarVertical>
		);
	} else if (rol === "SUPERADMIN") {
		return (
			<ShowNavbarVertical
				color={color}
				width={width}
				marginIconButt={marginIconButt}
				position={position}
			>
				{/* Logo */}
				<div>
					<img
						src={logo}
						alt="Descripcion"
						width="35px"
						height="35px"
						style={{ marginTop: "20px", marginBottom: "50px" }}
					/>
				</div>

				{/* Buttons for options to the user */}
				<div className="divIconUser">
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<HomeIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/"),
								}}
							/>
						</IconButton>
					</div>
					{/*Boton de reportes*/}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={() => {
								navigation("/super-admin/reportsAndRegisters");
							}}
							width="4vw"
						>
							<BarChartIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/super-admin/reportsAndRegisters"
									),
								}}
							/>
						</IconButton>
					</div>

					{/* Este es el boton de Gestion de precios*/}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={() => {
								navigation("/super-admin/priceManagement");
							}}
							width="4vw"
						>
							<ShoppingCartOutlinedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/super-admin/priceManagement"
									),
								}}
							/>
						</IconButton>
					</div>

					{/* Este es el boton de cuentasPago*/}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={() => {
								navigation("/super-admin/paymentMangement");
							}}
							width="4vw"
						>
							<WalletIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/super-admin/paymentMangement"
									),
								}}
							/>
						</IconButton>
					</div>

					{/* Este es el boton de tablas */}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={() => {
								navigation("/super-admin/requests");
							}}
							width="4vw"
						>
							<DescriptionRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor(
										"/super-admin/requests"
									),
								}}
							/>
						</IconButton>
					</div>

					{/* Este es el boton de account */}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={() => {
								navigation("/super-admin");
							}}
							width="4vw"
						>
							<Person2Icon
								style={{
									fontSize: iconSize,
									color: getIconColor("/super-admin"),
								}}
							/>
						</IconButton>
					</div>

					{/* Este es el boton de exit */}
					<div className="iconButton">
						<IconButton
							color={"#FFFFFF"}
							onClick={logout}
							width="4vw"
						>
							<LogoutIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>

				{/* Buttons for help */}
				<div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<GppGoodIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<QuestionAnswerRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>
			</ShowNavbarVertical>
		);
	} else {
		return (
			<ShowNavbarVertical
				color={color}
				width={width}
				marginIconButt={marginIconButt}
			>
				{/* Logo */}
				<div>
					<img
						src={logo}
						alt="Descripcion"
						width="35px"
						height="35px"
						style={{ marginTop: "20px", marginBottom: "50px" }}
					/>
				</div>

				{/* Buttons for options to the user */}
				<div className="divIconUser">
					<div className="iconButton">
						<IconButton
							color="#FFFFFF"
							onClick={() => {
								navigation("/");
							}}
							borderRadius="30%"
							width="4vw"
						>
							<HomeIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/"),
								}}
							/>
						</IconButton>
					</div>

					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						></IconButton>
					</div>
				</div>

				{/* Buttons for help */}
				<div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<GppGoodIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
					<div>
						<IconButton
							color="#FFFFFF"
							onClick={() => {}}
							width="4vw"
						>
							<QuestionAnswerRoundedIcon
								style={{
									fontSize: iconSize,
									color: getIconColor("/logout"),
								}}
							/>
						</IconButton>
					</div>
				</div>
			</ShowNavbarVertical>
		);
	}
};

export default NavbarVertical;
