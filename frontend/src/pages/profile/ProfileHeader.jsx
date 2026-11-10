import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";

/** @type {import("@mui/material").SxProps} */
const headerSx = {
  height: 280,
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  bgcolor: "grey.300",
};

/** @type {import("@mui/material").SxProps} */
const overlaySx = {
  position: "absolute",
  inset: 0,
  bgcolor: "rgba(0, 0, 0, 0.35)",
};

/** @type {import("@mui/material").SxProps} */
const avatarSx = {
  width: 140,
  height: 140,
  position: "absolute",
  bottom: -70,
  left: 30,
  border: "4px solid",
  borderColor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const infoSx = {
  position: "absolute",
  left: 200,
  bottom: 20,
  color: "common.white",
};

/** @type {import("@mui/material").SxProps} */
const usernameSx = {
  color: "rgba(255, 255, 255, 0.85)",
};

/** @type {import("@mui/material").SxProps} */
const chipsSx = {
  mt: 1,
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

export default function ProfileHeader({
  coverUrl,
  avatarUrl,
  profile,
  user,
  provider,
  shop,
}) {
  const name = profile?.name || user?.username;

  return (
    <Box
      sx={{
        ...headerSx,
        backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
      }}
    >
      <Box sx={overlaySx} />

      <Avatar src={avatarUrl} alt={name} sx={avatarSx}>
        {name?.charAt(0)}
      </Avatar>

      <Box sx={infoSx}>
        <Typography variant="h4" fontWeight={700}>
          {name}
        </Typography>

        <Typography sx={usernameSx}>
          @{user?.username}
        </Typography>

        <Stack sx={chipsSx} direction="row">
          <Chip
            label={user?.role || "User"}
            variant="outlined"
            sx={{
              color: "common.white",
              borderColor: "rgba(255, 255, 255, 0.7)",
            }}
          />

          {provider && <Chip label="Provider" color="success" />}

          {shop && <Chip label="Shop" color="secondary" />}
        </Stack>
      </Box>
    </Box>
  );
}