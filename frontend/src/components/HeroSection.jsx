import { Box, Stack, Typography } from "@mui/material";

/** @type {import("@mui/material").SxProps} */
const rootStyles = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  minHeight: { xs: 320, md: 400 },
  px: { xs: 3, sm: 5, md: 8 },
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

/** @type {import("@mui/material").SxProps} */
const overlayStyles = {
  position: "absolute",
  inset: 0,
  bgcolor: "rgba(0, 0, 0, 0.5)",
};

/** @type {import("@mui/material").SxProps} */
const contentStyles = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  alignItems: "flex-start",
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  color: "common.white",
  fontWeight: 700,
  lineHeight: 1.15,
  fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
};

/** @type {import("@mui/material").SxProps} */
const subtitleStyles = {
  color: "rgba(255, 255, 255, 0.85)",
  fontSize: { xs: "1rem", md: "1.15rem" },
  lineHeight: 1.6,
  maxWidth: 600,
};

/** @type {import("@mui/material").SxProps} */
const actionsStyles = {
  mt: 1,
  alignItems: { xs: "stretch", sm: "center" },
};

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  actions,
  children,
}) {
  return (
    <Box
      sx={(theme) => ({
        ...rootStyles,
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      })}
    >
      <Box sx={overlayStyles} />

      <Stack spacing={2} sx={contentStyles}>
        {title && (
          <Typography variant="h2" sx={titleStyles}>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography sx={subtitleStyles}>
            {subtitle}
          </Typography>
        )}

        {actions && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={actionsStyles}
          >
            {actions}
          </Stack>
        )}

        {children}
      </Stack>
    </Box>
  );
}