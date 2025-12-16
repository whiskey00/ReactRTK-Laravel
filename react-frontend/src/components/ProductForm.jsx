import { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import FormTextField from "./FormTextField";

/**
 * Reusable product form component for both create and update operations
 */
const ProductForm = ({
    initialValues = { name: "", description: "", price: "", stock: "" },
    onSubmit,
    isLoading = false,
    error = null,
    submitButtonText = "Submit",
}) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(initialValues);
    }, [JSON.stringify(initialValues)]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Product name is required";
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (formData.stock !== "" && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
            newErrors.stock = "Stock must be a non-negative number";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Convert to proper types
        const submitData = {
            name: formData.name.trim(),
            description: formData.description?.trim() || "",
            price: parseFloat(formData.price),
            stock: formData.stock ? parseInt(formData.stock) : 0,
        };

        onSubmit(submitData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <FormTextField
                name="name"
                label="Product Name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={isLoading}
                required
            />

            <FormTextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                disabled={isLoading}
                multiline
                rows={4}
            />

            <FormTextField
                name="price"
                label="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                disabled={isLoading}
                required
                inputProps={{ step: "0.01", min: "0" }}
            />

            <FormTextField
                name="stock"
                label="Stock Quantity"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                disabled={isLoading}
                inputProps={{ min: "0" }}
            />

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ mt: 3 }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : submitButtonText}
            </Button>
        </Box>
    );
};

export default ProductForm;
