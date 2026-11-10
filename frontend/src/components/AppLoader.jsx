import { Box, CircularProgress, Typography } from "@mui/material";

const containerSx = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.default",
};

const contentSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
};

const spinnerSx = {
  width: "42px !important",
  height: "42px !important",
};

const textSx = {
  fontSize: 14,
  color: "text.secondary",
};

export default function AppLoader({
  message = "Wait",
}) {
  return (
    <Box sx={containerSx}>
      <Box sx={contentSx}>
        <CircularProgress
          thickness={4}
          sx={spinnerSx}
        />

        <Typography sx={textSx}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}