import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProductsList from "./pages/products/index.jsx";
import AddProduct from "./pages/products/add.jsx";
import UpdateProduct from "./pages/products/update.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<ProtectedRoute>
							<ProductsList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/products/add"
					element={
						<ProtectedRoute>
							<AddProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/products/edit/:id"
					element={
						<ProtectedRoute>
							<UpdateProduct />
						</ProtectedRoute>
					}
				/>
			</Routes>

		</Router>
	);
}

export default App;
