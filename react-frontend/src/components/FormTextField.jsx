import { TextField } from "@mui/material";

/**
 * Reusable form text field component with consistent styling
 */
const FormTextField = ({
    name,
    label,
    type = "text",
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    multiline = false,
    rows = 1,
    ...otherProps
}) => {
    return (
        <TextField
            fullWidth
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            margin="normal"
            disabled={disabled}
            required={required}
            multiline={multiline}
            rows={multiline ? rows : 1}
            sx={{
                "& .MuiInputBase-input": {
                    color: "black",
                },
            }}
            {...otherProps}
        />
    );
};

export default FormTextField;
