import { RouterProvider } from "react-router-dom";
import { router } from "routes/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import {useAppContext} from "./store/app-context/app-context";

const App = () => {
	const { user } = useAppContext();

	if (user) {
		return (
			<SendbirdProvider
				appId={process.env.REACT_APP_SENDBIRD_APP_ID || ""}
				userId={`${user.id}`}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<RouterProvider router={router}/>
				</LocalizationProvider>
			</SendbirdProvider>
		)
	}

	return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<RouterProvider router={router} />
			</LocalizationProvider>
	);
};

export default App;
