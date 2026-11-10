import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

/** @type {import("@mui/material").SxProps} */
const footerStyles = {
  px: { xs: 2, sm: 3, md: 4 },
  py: 4,
  borderTop: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const contentStyles = {
  width: "100%",
  maxWidth: 1440,
  mx: "auto",
};

/** @type {import("@mui/material").SxProps} */
const brandStyles = {
  fontWeight: 800,
  letterSpacing: "-0.8px",
};

/** @type {import("@mui/material").SxProps} */
const taglineStyles = {
  maxWidth: 500,
  color: "text.secondary",
  lineHeight: 1.6,
};

/** @type {import("@mui/material").SxProps} */
const dividerStyles = {
  my: 1,
};

/** @type {import("@mui/material").SxProps} */
const copyrightStyles = {
  color: "text.secondary",
};

export default function Footer() {
  return (
    <Box component="footer" sx={footerStyles}>
      <Stack spacing={2.5} sx={contentStyles}>
        <Typography variant="h5" sx={brandStyles}>
          Service
          <Box component="span" sx={{ color: "primary.main", ml: 0.6 }}>
            Marketplace
          </Box>
        </Typography>

        <Typography variant="body2" sx={taglineStyles}>
          Discover trusted professionals, find the services you need,
          and connect with service providers in one place.
        </Typography>

        <Divider sx={dividerStyles} />

        <Typography variant="body2" sx={copyrightStyles}>
          © {new Date().getFullYear()} Service Marketplace. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
}