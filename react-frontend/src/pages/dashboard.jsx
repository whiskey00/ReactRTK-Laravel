import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import Sidebar from "../components/Sidebar";
import {
	TrendingUp as TrendingUpIcon,
	People as PeopleIcon,
	Inventory as InventoryIcon,
	AttachMoney as MoneyIcon,
} from "@mui/icons-material";

const dashboard = () => {
	const stats = [
		{
			title: "Total Revenue",
			value: "$12,458",
			change: "+12.5%",
			icon: <MoneyIcon sx={{ fontSize: 40 }} />,
			color: "#4caf50",
		},
		{
			title: "Products",
			value: "156",
			change: "+8.2%",
			icon: <InventoryIcon sx={{ fontSize: 40 }} />,
			color: "#2196f3",
		},
		{
			title: "Customers",
			value: "2,345",
			change: "+15.3%",
			icon: <PeopleIcon sx={{ fontSize: 40 }} />,
			color: "#ff9800",
		},
		{
			title: "Growth",
			value: "24.5%",
			change: "+5.1%",
			icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
			color: "#9c27b0",
		},
	];

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<Sidebar />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: { xs: 2, md: 4 },
					backgroundColor: "#f5f5f5",
					minHeight: "100vh",
					ml: { xs: 0, md: 0 },
				}}
			>
				{/* Header */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h4" fontWeight="bold" gutterBottom>
						Dashboard
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Welcome back! Here's what's happening today.
					</Typography>
				</Box>

				{/* Stats Grid */}
				<Grid container spacing={3} sx={{ mb: 4 }}>
					{stats.map((stat, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Card
								elevation={0}
								sx={{
									height: "100%",
									borderRadius: 2,
									border: "1px solid #e0e0e0",
									transition: "transform 0.2s, box-shadow 0.2s",
									"&:hover": {
										transform: "translateY(-4px)",
										boxShadow: 3,
									},
								}}
							>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 2,
										}}
									>
										<Box
											sx={{
												p: 1.5,
												borderRadius: 2,
												bgcolor: `${stat.color}15`,
												color: stat.color,
											}}
										>
											{stat.icon}
										</Box>
										<Typography
											variant="body2"
											sx={{
												color: stat.color,
												fontWeight: "medium",
											}}
										>
											{stat.change}
										</Typography>
									</Box>
									<Typography variant="h4" fontWeight="bold" gutterBottom>
										{stat.value}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{stat.title}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				{/* Content Section */}
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						<Paper
							elevation={0}
							sx={{
								p: 3,
								borderRadius: 2,
								border: "1px solid #e0e0e0",
								minHeight: 300,
							}}
						>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								Recent Activity
							</Typography>
							<Typography variant="body2" color="text.secondary">
								No recent activity to display.
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper
							elevation={0}
							sx={{
								p: 3,
								borderRadius: 2,
								border: "1px solid #e0e0e0",
								minHeight: 300,
							}}
						>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								Quick Actions
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Your quick actions will appear here.
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default dashboard;
