import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Alert,
	CircularProgress,
	Link,
	Paper,
} from "@mui/material";
import { useLoginMutation } from "../app/apiSlice";

const login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const validateForm = () => {
		const newErrors = {};
		if (!email) newErrors.email = "Email is required";
		if (!password) newErrors.password = "Password is required";
		if (email && !/\S+@\S+\.\S+/.test(email))
			newErrors.email = "Invalid email format";
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			setErrors({});
			await login({ email, password }).unwrap();
			navigate("/dashboard");
		} catch (err) {
			setErrors({ api: err.data?.message || "Login failed. Please try again." });
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				maxWidth: "100vw",
				backgroundColor: "#f5f5f5",
			}}
		>
			<Container maxWidth="xs">
				<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
					<Typography
						variant="h5"
						align="center"
						gutterBottom
						sx={{ color: "Black" }}
					>
						Login
					</Typography>

					{errors.api && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{errors.api}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit}>
						<TextField
							fullWidth
							type="email"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{
								"& .MuiInputBase-input": {
									color: "black",
								},
							}}
							error={!!errors.email}
							helperText={errors.email}
							margin="normal"
							disabled={isLoading}
						/>

						<TextField
							fullWidth
							type="password"
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={{
								"& .MuiInputBase-input": {
									color: "black",
								},
							}}
							error={!!errors.password}
							helperText={errors.password}
							margin="normal"
							disabled={isLoading}
						/>

						<Button
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							type="submit"
							sx={{ mt: 3, mb: 2 }}
							disabled={isLoading}
						>
							{isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
						</Button>
					</Box>

					<Typography align="center" sx={{ mt: 2, color: "black" }}>
						Don't have an account?{" "}
						<Link component={RouterLink} to="/register" underline="hover">
							Register here
						</Link>
					</Typography>
				</Paper>
			</Container>
		</Box>
	);
};

export default login;
