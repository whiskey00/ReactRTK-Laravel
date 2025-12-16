import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
    Alert,
    Chip,
    Pagination,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Stack,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import {
    useGetProductsQuery,
    useDeleteProductMutation,
} from "../../app/apiSlice";

const ProductsList = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [page, setPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const { data, isLoading, error } = useGetProductsQuery(page);
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete.id).unwrap();
                setDeleteDialogOpen(false);
                setProductToDelete(null);
            } catch (err) {
                console.error("Failed to delete product:", err);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Render product card for mobile view
    const renderMobileCard = (product) => (
        <Card
            key={product.id}
            elevation={0}
            sx={{
                mb: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s",
                "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {product.name}
                        </Typography>
                    </Box>
                </Box>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Price
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            ${parseFloat(product.price).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Stock
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={product.stock || 0}
                                size="small"
                                color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "error"}
                            />
                        </Box>
                    </Box>
                </Stack>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                        fullWidth
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(product)}
                        fullWidth
                    >
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

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
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        mb: 4,
                        gap: 2,
                    }}
                >
                    <Box>
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
                            Products
                        </Typography>
                        <Typography
                            variant={isMobile ? "body2" : "body1"}
                            color="text.secondary"
                        >
                            Manage your product inventory
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/products/add")}
                        size={isMobile ? "medium" : "large"}
                        fullWidth={isMobile}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* Error State */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Failed to load products. Please try again.
                    </Alert>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        {isMobile ? (
                            <Box>
                                {data?.data?.length === 0 ? (
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            textAlign: "center",
                                            borderRadius: 3,
                                            border: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <Typography color="text.secondary">
                                            No products found. Create your first product to get started.
                                        </Typography>
                                    </Paper>
                                ) : (
                                    data?.data?.map((product) => renderMobileCard(product))
                                )}
                            </Box>
                        ) : (
                            /* Desktop Table View */
                            <TableContainer
                                component={Paper}
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    overflowX: "auto",
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                                            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                                                <Typography fontWeight="bold">ID</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight="bold">Name</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight="bold">Price</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight="bold">Stock</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight="bold">Actions</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.data?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                                    <Typography color="text.secondary">
                                                        No products found. Create your first product to get started.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            data?.data?.map((product) => (
                                                <TableRow
                                                    key={product.id}
                                                    sx={{
                                                        "&:hover": { bgcolor: "#f8f9fa" },
                                                    }}
                                                >
                                                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                                                        {product.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography fontWeight="medium">{product.name}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography fontWeight="medium">
                                                            ${parseFloat(product.price).toFixed(2)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Chip
                                                            label={product.stock || 0}
                                                            size="small"
                                                            color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "error"}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            color="primary"
                                                            size="small"
                                                            onClick={() => navigate(`/products/edit/${product.id}`)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleDeleteClick(product)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {/* Pagination */}
                        {data?.pagination && data.pagination.last_page > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Pagination
                                    count={data.pagination.last_page}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size={isMobile ? "medium" : "large"}
                                />
                            </Box>
                        )}
                    </>
                )}

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete "{productToDelete?.name}"? This action
                            cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            color="error"
                            variant="contained"
                            disabled={isDeleting}
                        >
                            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ProductsList;
