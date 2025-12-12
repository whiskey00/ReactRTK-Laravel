import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import ProductForm from "../../components/ProductForm";
import { useCreateProductMutation } from "../../app/apiSlice";
import { useState } from "react";

const AddProduct = () => {
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [error, setError] = useState(null);

    const handleSubmit = async (productData) => {
        try {
            setError(null);
            await createProduct(productData).unwrap();
            navigate("/products");
        } catch (err) {
            setError(err.data?.message || "Failed to create product. Please try again.");
            console.error("Failed to create product:", err);
        }
    };

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
                }}
            >
                <Container maxWidth="md">
                    {/* Header */}
                    <Box sx={{ mb: 4 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate("/products")}
                            sx={{ mb: 2 }}
                        >
                            Back to Products
                        </Button>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Add New Product
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Fill in the details below to create a new product
                        </Typography>
                    </Box>

                    {/* Form */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        <ProductForm
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            error={error}
                            submitButtonText="Create Product"
                        />
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default AddProduct;
