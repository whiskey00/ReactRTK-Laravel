import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress,
    Alert,
    useTheme,
    useMediaQuery,
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3, md: 4 },
                    minHeight: "100vh",
                    mt: { xs: 7, md: 0 },
                    transition: "margin 0.3s",
                    width: { xs: "100%", md: "auto" },
                }}
            >
                <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 } }}>
                    {/* Header */}
                    <Box sx={{ mb: { xs: 3, md: 4 } }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate("/products")}
                            sx={{
                                mb: 2,
                                fontSize: { xs: "0.875rem", sm: "1rem" },
                            }}
                        >
                            Back to Products
                        </Button>
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Edit Product
                        </Typography>
                        <Typography
                            variant={isMobile ? "body2" : "body1"}
                            color="text.secondary"
                        >
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
                                p: { xs: 2, sm: 3, md: 4 },
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)",
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
