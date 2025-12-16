import {
	Box,
	Typography,
	Paper,
	useTheme,
	useMediaQuery,
	Button,
} from "@mui/material";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
			<Sidebar />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: { xs: 2, sm: 3, md: 4 },
					minHeight: "100vh",
					ml: { xs: 0, md: 0 },
					mt: { xs: 7, md: 0 },
					transition: "margin 0.3s",
				}}
			>
				{/* Header Section */}
				<Box
					sx={{
						mb: 4,
						animation: "fadeInDown 0.5s ease-out",
						"@keyframes fadeInDown": {
							from: {
								opacity: 0,
								transform: "translateY(-20px)",
							},
							to: {
								opacity: 1,
								transform: "translateY(0)",
							},
						},
					}}
				>
					<Typography
						variant={isMobile ? "h5" : "h4"}
						fontWeight="bold"
						gutterBottom
						sx={{
							background: "linear-gradient(135deg, #018790 0%, #00b7b5 100%)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Dashboard
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
						Welcome back! Here's your workspace.
					</Typography>
				</Box>

				{/* Quick Actions Section */}
				<Box sx={{ maxWidth: 400 }}>
					<Paper
						elevation={0}
						sx={{
							p: 3,
							borderRadius: 3,
							border: "1px solid",
							borderColor: "divider",
							background:
								"linear-gradient(135deg, rgba(79, 172, 254, 0.05) 0%, rgba(0, 242, 254, 0.05) 100%)",
							animation: "fadeIn 0.6s ease-out 0.1s both",
							"@keyframes fadeIn": {
								from: { opacity: 0 },
								to: { opacity: 1 },
							},
						}}
					>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							Quick Actions
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
							<Button
								onClick={() => {
									"product/add";
								}}
								variant="outlined"
								fullWidth
								sx={{
									py: 1.5,
									borderRadius: 2,
									textTransform: "none",
									fontWeight: 600,
									borderWidth: 2,
									"&:hover": {
										borderWidth: 2,
										transform: "scale(1.02)",
									},
								}}
							>
								Add New Product
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
