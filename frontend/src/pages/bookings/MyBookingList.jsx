import { Box, CircularProgress, Typography, Grid } from "@mui/material";

import { useMyBookings } from "../../hooks/api/bookings/bookings.hooks";
import BookingCard from "./BookingCard";

export default function MyBookingsList({
  onViewBooking = () => {},
}) {
  const { data, isLoading, isError } = useMyBookings();

  const bookings = data?.bookings || data || [];

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="error">
          Failed to load bookings
        </Typography>
      </Box>
    );
  }

  if (!bookings.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography>No bookings found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid size={4}>
            <BookingCard
              key={booking._id}
              booking={booking}
              onView={() => onViewBooking(booking)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}