import { Stack, Button } from "@mui/material";

export default function ProfileActions({ onEdit, onDelete }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <Button variant="contained" onClick={onEdit}>
        Edit Profile
      </Button>

      <Button variant="outlined" color="error" onClick={onDelete}>
        Delete
      </Button>
    </Stack>
  );
}