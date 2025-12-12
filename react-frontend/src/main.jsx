import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { store } from "./store/store.js";

const theme = createTheme({
	palette: {
		common: {
			black: "#000000",
			white: "#ffffff",
		},
		primary: {
			main: "#018790",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#00B7B5",
		},
		background: {
			default: "#F4F4F4",
			paper: "#ffffff",
		},
		text: {
			primary: "#005461",
			secondary: "#005461",
		},
	},
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
);
