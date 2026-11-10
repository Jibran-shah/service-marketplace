import {
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { lighten } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomToast({
  title,
  message,
  image,
  type = "info",
  closeToast,
}) {
  const colorMap = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "primary",
  };

  const color = colorMap[type] || colorMap.info;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        width: "100%",
        maxWidth: 400,
        p: 1.5,

        bgcolor: (theme) =>
          lighten(theme.palette[color].main, 0.85),

        border: "1px solid",
        borderColor: (theme) =>
          lighten(theme.palette[color].main, 0.7),

        borderRadius: 2,
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
      }}
    >
      {image && (
        <Avatar
          src={image}
          alt={title || "Notification"}
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
          }}
        />
      )}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {title && (
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 0.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        )}

        {message && (
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: 1.45,
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>

      <IconButton
        size="small"
        onClick={closeToast}
        sx={{
          flexShrink: 0,
          color: "text.secondary",
          "&:hover": {
            color: `${color}.main`,
            bgcolor: (theme) =>
              lighten(theme.palette[color].main, 0.8),
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}