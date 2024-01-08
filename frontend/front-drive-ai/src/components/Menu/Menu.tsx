import React from "react";
import { Divider, Menu as MUIMenu, MenuItem, Stack } from "@mui/material";
import { MenuProps } from "./types";
import { Avatar } from "@mui/material";
import { MenuOption, OptionLabel, OptionSubtext, OptionText } from "./styles";
import { useAppContext } from "store/app-context/app-context";
import { useNavigate } from "react-router-dom";

const Menu: React.FC<MenuProps> = (props) => {
	const {
		closeSession = false,
		anchorEl,
		open,
		handleClose,
		options,
	} = props;
	const navigation = useNavigate();
	const appContext = useAppContext();

	const logout = () => {
		// Set app context to null
		appContext.setUser(null);
		appContext.setLoggedIn(false);
		appContext.setProfilePicture(null);

		sessionStorage.clear();
		localStorage.clear();
		navigation("/");
	};

	return (
		<MUIMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
			{options.map((option) => {
				const {
					image,
					icon,
					label,
					subtext,
					onClick: callback,
				} = option;
				return (
					<MenuItem onClick={callback} key={label}>
						<MenuOption>
							<Stack
								direction="row"
								alignItems="center"
								spacing={2}
							>
								{image && (
									<Avatar
										src={option.image}
										sx={{
											transform: "scaleX(-1)",
										}}
									/>
								)}
								{icon && icon()}
								<OptionText>
									<OptionLabel>{label}</OptionLabel>
									{subtext && (
										<OptionSubtext>{subtext}</OptionSubtext>
									)}
								</OptionText>
							</Stack>
						</MenuOption>
					</MenuItem>
				);
			})}
			{closeSession && (
				<div>
					<React.Fragment>
						<Divider />
						<MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
					</React.Fragment>
				</div>
			)}
		</MUIMenu>
	);
};

export default Menu;
