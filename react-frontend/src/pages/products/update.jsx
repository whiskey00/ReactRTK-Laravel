import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress,
    Alert,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import ProductForm from "../../components/ProductForm";
import {
    useGetProductQuery,
    useUpdateProductMutation,
} from "../../app/apiSlice";
import { useState } from "react";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    const { data, isLoading: isFetching, error: fetchError } = useGetProductQuery(id);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const handleSubmit = async (productData) => {
        try {
            setError(null);
            await updateProduct({ id, ...productData }).unwrap();
            navigate("/products");
        } catch (err) {
            setError(err.data?.message || "Failed to update product. Please try again.");
            console.error("Failed to update product:", err);
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
                            Edit Product
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Update the product details below
                        </Typography>
                    </Box>

                    {/* Loading State */}
                    {isFetching && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Error State */}
                    {fetchError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            Failed to load product. Please try again.
                        </Alert>
                    )}

                    {/* Form */}
                    {data?.data && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                border: "1px solid #e0e0e0",
                            }}
                        >
                            <ProductForm
                                initialValues={{
                                    name: data.data.name || "",
                                    description: data.data.description || "",
                                    price: data.data.price || "",
                                    stock: data.data.stock || "",
                                }}
                                onSubmit={handleSubmit}
                                isLoading={isUpdating}
                                error={error}
                                submitButtonText="Update Product"
                            />
                        </Paper>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default UpdateProduct;
