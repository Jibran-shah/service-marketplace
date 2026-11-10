import { Box, Typography, Paper } from "@mui/material";

export default function UnauthorizedPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          maxWidth: 400
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          403 - Unauthorized
        </Typography>

        <Typography variant="body1">
          You do not have permission to access this page.
        </Typography>
      </Paper>
    </Box>
  );
}