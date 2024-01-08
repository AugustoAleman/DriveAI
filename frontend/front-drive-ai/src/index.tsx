import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import App from "./App";
import theme from "theme/theme";
import { AppContextProvider } from "store/app-context/app-context";

ReactDOM.render(
  <AppContextProvider>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </AppContextProvider>,
  document.querySelector("#root")
);
