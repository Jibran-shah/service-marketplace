import { Paper, Stack, Typography } from "@mui/material";

export default function ProviderStats() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Service Overview
      </Typography>

      <Stack direction="row" spacing={2}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6">0</Typography>
          <Typography variant="body2">Services</Typography>
        </Paper>

        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6">0</Typography>
          <Typography variant="body2">Orders</Typography>
        </Paper>

        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6">₨0</Typography>
          <Typography variant="body2">Revenue</Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}