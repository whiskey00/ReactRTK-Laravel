import {
	Box,
	Typography,
	Container,
	Button,
	CircularProgress,
} from "@mui/material";
import { useLogoutMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

const dashboard = () => {
	const [logout, { isLoading }] = useLogoutMutation();
	const Navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout().unwrap();
			Navigate("/login");
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	return (
		<Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Typography align="center" variant="h4" gutterBottom>
					Dashboard
				</Typography>
				<Typography align="center" variant="body1">
					Welcome to the dashboard!
				</Typography>
				<Button
					fullWidth
					variant="contained"
					size="large"
					type="submit"
					sx={{ mt: 3, mb: 2 }}
					disabled={isLoading}
					onClick={handleLogout}
				>
					{isLoading ? <CircularProgress size={24} /> : "Logout"}
				</Button>
			</Container>
		</Box>
	);
};

export default dashboard;
