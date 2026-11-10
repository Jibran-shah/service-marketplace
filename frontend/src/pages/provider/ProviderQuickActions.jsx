import { Paper, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProviderQuickActions() {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{
        flexWrap:"wrap"
      }}>
        <Button onClick={() => navigate("/services/create")}>
          Add Service
        </Button>

        <Button onClick={() => navigate("/provider/services")}>
          My Services
        </Button>

        <Button onClick={() => navigate("/provider/orders")}>
          Orders
        </Button>

        <Button onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </Stack>
    </Paper>
  );
}