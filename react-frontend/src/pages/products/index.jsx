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
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Products
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage your product inventory
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/products/add")}
                        size="large"
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
                        {/* Products Table */}
                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                border: "1px solid #e0e0e0",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                                        <TableCell>
                                            <Typography fontWeight="bold">ID</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold">Name</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold">Description</Typography>
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
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell>
                                                    <Typography fontWeight="medium">{product.name}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            maxWidth: 300,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {product.description || "—"}
                                                    </Typography>
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

                        {/* Pagination */}
                        {data?.pagination && data.pagination.last_page > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Pagination
                                    count={data.pagination.last_page}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
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
