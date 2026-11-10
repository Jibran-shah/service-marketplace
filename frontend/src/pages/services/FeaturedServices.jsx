import { Box, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { useServices } from "../../hooks/api/services/services.hooks";
import ServiceCard from "./ServiceCard";

/** @type {import("@mui/material").SxProps} */
const headerStyles = {
  mb: 4,
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  fontWeight: 700,
  lineHeight: 1.2,
};

/** @type {import("@mui/material").SxProps} */
const subtitleStyles = {
  color: "text.secondary",
  lineHeight: 1.6,
};

/** @type {import("@mui/material").GridProps["size"]} */
const serviceGridSize = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 4,
  xl: 3,
};

export default function FeaturedServices() {
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useServices(
    {
      page: 1,
      limit: 8,
    },
    true
  );

  if (isLoading || isError) return null;

  const services = data?.services ?? [];

  return (
    <Box>
      <Stack spacing={1} sx={headerStyles}>
        <Typography variant="h4" sx={titleStyles}>
          Featured Services
        </Typography>

        <Typography sx={subtitleStyles}>
          Explore popular services offered by trusted professionals.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid key={service._id} size={serviceGridSize}>
            <ServiceCard
              service={service}
              isOwn={user?.provider === service.provider?._id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}