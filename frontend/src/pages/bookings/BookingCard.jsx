import { Paper, Stack, Typography, Button, Chip } from "@mui/material";
import {
  useAcceptBooking,
  useCancelBooking,
  useCompleteBooking,
  usePayBooking,
} from "../../hooks/api/bookings/bookings.hooks";

export default function BookingCard({ booking, onView }) {
  const { mutate: acceptBooking, isLoading: isAccepting } =
    useAcceptBooking();

  const { mutate: cancelBooking, isLoading: isCancelling } =
    useCancelBooking();

  const { mutate: completeBooking, isLoading: isCompleting } =
    useCompleteBooking();

  const { mutate: payBooking, isLoading: isPaying } =
    usePayBooking();

  const handleAccept = (e) => {
    e.stopPropagation();
    acceptBooking(booking._id);
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    completeBooking(booking._id);
  };

  const handlePay = (e) => {
    e.stopPropagation();
    payBooking(booking._id);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    cancelBooking(booking._id);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography fontWeight={600}>
          {booking.serviceName}
        </Typography>

        <Typography>
          Date: {booking.scheduledAt}
        </Typography>

        <Chip
          label={booking.status || "PENDING"}
          color={
            booking.status === "COMPLETED"
              ? "success"
              : booking.status === "CONFIRMED"
              ? "info"
              : "warning"
          }
        />

        <Typography>
          Price: Rs. {booking.price}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={onView}>
            View
          </Button>

          <Button
            size="small"
            onClick={handleAccept}
            disabled={isAccepting}
          >
            Accept
          </Button>

          <Button
            size="small"
            onClick={handleComplete}
            disabled={isCompleting}
          >
            Complete
          </Button>

          <Button
            size="small"
            onClick={handlePay}
            disabled={isPaying}
          >
            Pay
          </Button>

          <Button
            size="small"
            color="error"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}