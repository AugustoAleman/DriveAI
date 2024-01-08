import React, { useEffect, useState } from "react";

// Import components
import {
	Box,
	Avatar,
	Stack,
	MenuItem,
	Menu as MUIMenu,
	useTheme,
} from "@mui/material";
import {
	DriveAILogoContainer,
	HeaderAvatarRegister,
	HeaderBox,
	HeaderMobileRoutesMenu,
	HeaderRoutes,
	SignupButtonContainer,
} from "./styles";
import { Menu } from "../Menu";
import { Link } from "react-router-dom";
import { MenuOption } from "../Menu/styles";
import { Button } from "components/Button";

// Import icons
import DriveAILogo from "../../assets/DriveAILogo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppContext } from "store/app-context/app-context";
import { useNavigate } from "react-router-dom";
import { getPendingOrdersFromUser, getProfilePicture } from "services";

const Header: React.FC<{}> = () => {
	// State data
	const [image, setImg] = useState('');
	const appContext = useAppContext();
	const navigate = useNavigate();
	const theme = useTheme();

	// Menu data
	const [anchorElUserMenu, setAnchorElUserMenu] =
		useState<null | HTMLElement>(null);
	const [anchorElNotificationMenu, setAnchorElNotificationMenu] =
		useState<null | HTMLElement>(null);
	const [anchorElMobileRoutesMenu, setAnchorElMobileRoutesMenu] =
		useState<null | HTMLElement>(null);

	// Active sales date
	const [showActiveSales, setShowActiveSales] = useState(false);
	const [adminConsoleLink, setAdminConsoleLink] = useState("");
	const [isUser, setIsUser] = useState(true);

	const {
		status,
		palette: { primary, secondary, tertiary },
	} = theme;

	// Styles
	const boxSx = {
		height: 73,
		backgroundColor: primary.main,
	};


	// Effects
	useEffect(() => {

		const getProfilePictureUrl = async () => {

			if ((appContext.profilePicture !== null) && (appContext.profilePicture !== undefined)) {
				console.log("Picture in app context exist, loading it up");
				setImg(appContext.profilePicture as string);
			} else {
				const profilePicture = await getProfilePicture(appContext.user?.id as number);
				setImg(
					profilePicture.image_url === null
						? "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
						: profilePicture.image_url
				);
				appContext.setProfilePicture(profilePicture.image_url);
			}
		};

		const fetchPendingOrders = () => {
			const { user } = appContext;
			if (user) {
				getPendingOrdersFromUser(user.id)
					.then((data) => {
						const activeSales = data.length > 0;
						setShowActiveSales(activeSales);
						getProfilePictureUrl();
					})
					.catch(() => setShowActiveSales(false));
			}
		};

		const getAdminConsoleLink = () => {
			const { user } = appContext;
			if (user) {
				if (user.userType === "SALESMAN") {
					setAdminConsoleLink("/salesman");
					setIsUser(false);
				} else if (user.userType === "AGA") {
					setAdminConsoleLink("/automotive-group-admin");
					setIsUser(false);
				} else if (user.userType === "MANAGER") {
					setAdminConsoleLink("/manager");
					setIsUser(false);
				} else if (user.userType === "SUPERADMIN") {
					setAdminConsoleLink("/super-admin");
					setIsUser(false);
				} else if (user.userType === "CLIENT") {
					setAdminConsoleLink("/");
					setIsUser(true);
				}
			}
		};

		fetchPendingOrders();
		getAdminConsoleLink();
	}, [appContext]);

	// Menu handlers
	const handleClickMenu = (
		event: React.MouseEvent<HTMLButtonElement>,
		menu: string
	) => {
		menu === "user" && setAnchorElUserMenu(event.currentTarget);
		menu === "notification" &&
			setAnchorElNotificationMenu(event.currentTarget);
		menu === "routes" && setAnchorElMobileRoutesMenu(event.currentTarget);
	};
	const handleCloseMenu = (menu: string) => {
		menu === "user" && setAnchorElUserMenu(null);
		menu === "notification" && setAnchorElNotificationMenu(null);
		menu === "routes" && setAnchorElMobileRoutesMenu(null);
	};

	const userMenu = () => {
		const UserMenuProps = {
			closeSession: appContext.loggedIn,
			anchorEl: anchorElUserMenu,
			setAnchorEl: setAnchorElUserMenu,
			open: Boolean(anchorElUserMenu),
			handleClose: () => handleCloseMenu("user"),
			options: [
				{
					image: image,
					label: appContext.user?.name as string,
					subtext: appContext.user?.email as string,
					onClick: () => navigate("/settings"),
				},
			],
		};

		return (
			<div>
				<Button
					onClick={(e: any) => handleClickMenu(e, "user")}
					variant="text"
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Avatar src={image} sx={{
							transform: 'scaleX(-1)',
						}}/>
					</Stack>
				</Button>
				<Menu {...UserMenuProps} />
			</div>
		);
	};

	const notificationsMenu = () => {
		const NotificationMenuProps = {
			closeSession: false,
			anchorEl: anchorElNotificationMenu,
			setAnchorEl: setAnchorElNotificationMenu,
			open: Boolean(anchorElNotificationMenu),
			handleClose: () => handleCloseMenu("notification"),
			options: [
				{
					label: "Notificacion 1",
					subtext: "Se hizo un cambio en solicitud 20",
					onClick: () => console.log("REDIRECT NOTIFICATION"),
				},
				{
					label: "Notificacion 2",
					subtext: "Se hizo un cambio en solicitud 20",
					onClick: () => console.log("REDIRECT NOTIFICATION"),
				},
				{
					label: "Notificacion 3",
					subtext: "Se hizo un cambio en solicitud 20",
					onClick: () => console.log("REDIRECT NOTIFICATION"),
				},
			],
		};

		return (
			<div>
				<Button
					onClick={(e) => handleClickMenu(e, "notification")}
					variant="text"
				>
					<NotificationsIcon />{" "}
				</Button>
				<Menu {...NotificationMenuProps} />
			</div>
		);
	};

	const mobileRoutesMenu = () => {
		const anchorStyles = {
			textDecoration: "none",
			color: "initial",
		};

		const headerRoutes = {
			routesMenuOptions: [
				{
					label: "Ventas activas",
					to: "/settings",
					show: showActiveSales,
				},
				{
					label: "Compra tu auto",
					to: "/vehicle-catalog",
					show: true,
				},
				{
					label: "Favoritos",
					to: "/favorite/list",
					show: true,
				},
				{
					label: "Compara",
					to: "/compare/list",
					show: true,
				},
				{
					label: "Nosotros",
					to: "/about-us",
					show: true,
				},
				{
					label: "Settings",
					to: isUser ? adminConsoleLink : "/",
					show: !isUser,
				},
			],
		};

		return (
			<HeaderMobileRoutesMenu>
				<Button
					onClick={(e) => handleClickMenu(e, "routes")}
					backgroundColor={"none"}
				>
					<MenuIcon />
				</Button>
				<MUIMenu
					anchorEl={anchorElMobileRoutesMenu}
					open={Boolean(anchorElMobileRoutesMenu)}
					onClose={() => handleCloseMenu("routes")}
				>
					{headerRoutes.routesMenuOptions.map((route) => {
						const { label, to, show } = route;

						if (!show) return <></>;

						return (
							<MenuItem key={label}>
								<MenuOption>
									<Link
										style={anchorStyles}
										to={to}
										state={
											to === "/settings"
												? { tabValue: 4 }
												: null
										}
									>
										{label}
									</Link>
								</MenuOption>
							</MenuItem>
						);
					})}
				</MUIMenu>
			</HeaderMobileRoutesMenu>
		);
	};

	return (
		<Box sx={boxSx}>
			<HeaderBox
				buttonBlue={secondary.main}
				buttonHoverBlue={status.correct}
				white={tertiary.main}
			>
				{mobileRoutesMenu()}
				<DriveAILogoContainer>
					<a href="/">
						<div>
							<img alt="company logo" src={DriveAILogo} />
						</div>
					</a>
				</DriveAILogoContainer>
				<Stack direction="row" alignItems="center" gap="3rem">
					<HeaderRoutes>
						{showActiveSales && (
							<Link to="/settings" state={{ tabValue: 4 }}>
								Ventas activas
							</Link>
						)}
						<Link to="/vehicle-catalog">Compra tu auto</Link>
						<Link to="/compare/list">Compara</Link>
						<Link to="/favorite/list">Favoritos</Link>
						<Link to="/about-us">Nosotros</Link>
						{!isUser ? (
							<Link to={adminConsoleLink}>Admin</Link>
						) : (
							<></>
						)}
						{!appContext.loggedIn ? (
							<SignupButtonContainer>
								<Link to="/signup">Regístrate</Link>
							</SignupButtonContainer>
						) : (
							<></>
						)}
					</HeaderRoutes>
					<HeaderAvatarRegister>
						<>
							{appContext.loggedIn && (
								<>
									{notificationsMenu()}
									{userMenu()}
								</>
							)}
							{!appContext.loggedIn && (
								<Stack
									direction="row"
									alignItems="center"
									spacing={2}
								>
									<Button
										variant="contained"
										borderRadius="5px"
										onClick={() => navigate("/login")}
									>
										<Link to={"/login"}>Inicia sesión</Link>
									</Button>
								</Stack>
							)}
						</>
					</HeaderAvatarRegister>
				</Stack>
			</HeaderBox>
		</Box>
	);
};

export default Header;
