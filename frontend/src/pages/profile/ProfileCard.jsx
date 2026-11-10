import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../hooks/api/profile/useProfile";

export default function ProfileCard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems:"center" }}>
        <Avatar
          src={profile?.avatar?.url}
          sx={{ width: 64, height: 64 }}
        />

        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={700}>
            {profile?.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {profile?.email}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => navigate("/profile")}
        >
          View Profile
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </Button>
      </Stack>
    </Paper>
  );
}