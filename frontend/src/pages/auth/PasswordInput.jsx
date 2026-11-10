import { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordInput({
  label = "Password",
  register,
  name = "password",
  error
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        type={showPassword ? "text" : "password"}
        {...register(name)}
        error={!!error}
        helperText={error?.message}
        slotProps={{
          input:{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
}