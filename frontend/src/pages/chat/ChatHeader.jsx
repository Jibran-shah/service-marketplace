import { Box, Typography, Stack, IconButton, Avatar, Tooltip } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ChatHeader({
  title = "Chat",
  subtitle, // e.g. "online", "3 members", "last seen 2h ago"
  avatar,
  onOpenMembers,
  onOpenInfo,
}) {

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        borderBottom: "1px solid",
        borderColor: "divider",

        bgcolor: "background.paper",
        backdropFilter: "blur(10px)",

        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left side */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems:"center" }}>
        {avatar && <Avatar src={avatar} sx={{ width: 40, height: 40 }} />}

        <Box>
          <Typography
            fontWeight={600}
            sx={{
              lineHeight: 1.2,
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Right actions */}
      <Stack direction="row" spacing={0.5}>
        {onOpenMembers && (
          <Tooltip title="Members">
            <IconButton
              onClick={onOpenMembers}
              size="small"
              sx={{
                bgcolor: "action.hover",
              }}
            >
              <PeopleAltOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {onOpenInfo && (
          <Tooltip title="Info">
            <IconButton
              onClick={onOpenInfo}
              size="small"
              sx={{
                bgcolor: "action.hover",
              }}
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
}