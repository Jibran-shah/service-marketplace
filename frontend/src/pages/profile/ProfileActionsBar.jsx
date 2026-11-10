import { Stack, Button } from "@mui/material";

export default function ProfileActionsBar({
  isOwnProfile,
  onMessage,
  onLogout,
  onDelete,
  isLoggingOut,
  onEdit
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mt: 3,
        flexWrap: "wrap",
      }}
    >
      {!isOwnProfile && (
        <Button variant="contained" onClick={onMessage}>
          Message
        </Button>
      )}

      {isOwnProfile && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onLogout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
          <Button variant="outlined" color="warning" onClick={onDelete}>
            Delete Profile
          </Button>
          <Button variant="outlined" color="info" onClick={onEdit}>
            Edit Profile
          </Button>
        </>
      )}
    </Stack>
  );
}