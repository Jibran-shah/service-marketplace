import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { useMyServices } from "../../hooks/api/services/services.hooks";
import ServiceCard from "./ServiceCard";

const gridSize = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3,
};

export default function MyServices() {
  
  const { data, isLoading, isError } = useMyServices();
  const services = data?.services || [];


  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography
        color="error"
        sx={{ py: 6, textAlign: "center" }}
      >
        Failed to load your services.
      </Typography>
    );
  }

  if (!services.length) {
    return (
      <Typography
        sx={{
          py: 6,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        No services found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {services.map((service) => (
        <Grid key={service._id} size={gridSize}>
          <ServiceCard service={service} isOwn />
        </Grid>
      ))}
    </Grid>
  );
}