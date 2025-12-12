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
import { useRegisterMutation } from "../app/apiSlice";

const register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name) newErrors.name = "Name is required";
		if (!formData.email) newErrors.email = "Email is required";
		if (!formData.password) newErrors.password = "Password is required";
		if (!formData.password_confirmation)
			newErrors.password_confirmation = "Please confirm your password";

		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Invalid email format";
		if (formData.password && formData.password.length < 8)
			newErrors.password = "Password must be at least 8 characters";
		if (formData.password !== formData.password_confirmation)
			newErrors.password_confirmation = "Passwords do not match";

		return newErrors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
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
			await register(formData).unwrap();
			navigate("/login", {
				state: { message: "Registration successful! Please login." },
			});
		} catch (err) {
			if (err.data?.errors) {
				setErrors(err.data.errors);
			} else {
				setErrors({
					api: err.data?.message || "Registration failed. Please try again.",
				});
			}
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundColor: "#f5f5f5",
			}}
		>
			<Container maxWidth="xs">
				<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
					<Typography
						variant="h5"
						align="center"
						gutterBottom
						sx={{ color: "text.primary" }}
					>
						Register
					</Typography>

					{errors.api && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{errors.api}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							sx={{
								"& .MuiInputBase-input": {
									color: "black",
								},
							}}
							error={!!errors.name}
							helperText={errors.name}
							margin="normal"
							disabled={isLoading}
						/>

						<TextField
							fullWidth
							type="email"
							label="Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
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
							name="password"
							value={formData.password}
							onChange={handleChange}
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

						<TextField
							fullWidth
							type="password"
							label="Confirm Password"
							name="password_confirmation"
							value={formData.password_confirmation}
							onChange={handleChange}
							sx={{
								"& .MuiInputBase-input": {
									color: "black",
								},
							}}
							error={!!errors.password_confirmation}
							helperText={errors.password_confirmation}
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
							{isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
						</Button>
					</Box>

					<Typography align="center" sx={{ mt: 2, color: "black" }}>
						Already have an account?{" "}
						<Link component={RouterLink} to="/login" underline="hover">
							Login here
						</Link>
					</Typography>
				</Paper>
			</Container>
		</Box>
	);
};

export default register;
