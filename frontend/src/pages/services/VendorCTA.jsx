import { Button, Stack, Typography } from "@mui/material";

/** @type {import("@mui/material").SxProps} */
const contentStyles = {
  maxWidth: 800,
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: { xs: "2rem", md: "2.6rem" },
};

/** @type {import("@mui/material").SxProps} */
const descriptionStyles = {
  maxWidth: 700,
  opacity: 0.9,
  lineHeight: 1.7,
};

/** @type {import("@mui/material").SxProps} */
const actionsStyles = {
  alignItems: { xs: "stretch", sm: "center" },
  mt: 1,
};

/** @type {import("@mui/material").SxProps} */
const buttonStyles = {
  px: 3,
  py: 1.25,
};

/** @type {import("@mui/material").SxProps} */
const primaryButtonStyles = {
  ...buttonStyles,
  bgcolor: "background.paper",
  color: "primary.main",
  "&:hover": {
    bgcolor: "background.paper",
    opacity: 0.9,
  },
};

/** @type {import("@mui/material").SxProps} */
const secondaryButtonStyles = {
  ...buttonStyles,
  color: "inherit",
  borderColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    borderColor: "common.white",
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export default function ProviderCTASection({
  onProviderClick,
  onLearnMoreClick,
}) {
  return (
    <Stack spacing={2} sx={contentStyles}>
      <Typography variant="h3" sx={titleStyles}>
        Grow Your Business With Your Skills
      </Typography>

      <Typography sx={descriptionStyles}>
        Are you a freelancer, skilled professional, or service provider?
        Create your profile, showcase the services you offer, and connect
        with customers who are looking for your expertise.
      </Typography>

      <Typography sx={descriptionStyles}>
        Manage your services, communicate with customers, and build your
        reputation through every successful booking. Start reaching more
        people and turn your skills into new opportunities.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={actionsStyles}
      >
        <Button
          variant="contained"
          size="large"
          onClick={onProviderClick}
          sx={primaryButtonStyles}
        >
          Become a Provider
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={onLearnMoreClick}
          sx={secondaryButtonStyles}
        >
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
}