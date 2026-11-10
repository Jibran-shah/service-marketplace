import { TextField, Box } from "@mui/material";

export function InputField({
  label,
  type = "text",
  name,
  register,
  error,
  placeholder,
  disabled = false,
  fullWidth = true,
  ...rest
}) {
  // supports BOTH patterns:
  const registerProps = register
    ? register(name)
    : rest;

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth={fullWidth}
        label={label}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        helperText={error?.message || ""}
        {...registerProps}
      />
    </Box>
  );
}