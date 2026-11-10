import { Paper, Typography } from "@mui/material";
import { useProfile } from "../../../hooks/api/profile/useProfile";

export default function ProviderHeader() {
  const { data: profile } = useProfile();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Service Provider Dashboard
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Welcome back, {profile?.name}
      </Typography>
    </Paper>
  );
}