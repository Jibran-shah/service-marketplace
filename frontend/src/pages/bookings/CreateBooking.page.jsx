import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCreateBooking } from "../../hooks/api/bookings/bookings.hooks";
import NativeDateTime from "../../components/NativeDateTime";

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  minHeight: "100%",
  px: { xs: 2, md: 3 },
  py: { xs: 3, md: 6 },
};

/** @type {import("@mui/material").SxProps} */
const containerSx = {
  maxWidth: 680,
  mx: "auto",
};

/** @type {import("@mui/material").SxProps} */
const paperSx = {
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const headerSx = {
  p: 2,
  pt: 3,
  pb: 0.5,
};

/** @type {import("@mui/material").SxProps} */
const subtitleSx = {
  mt: 1,
};

/** @type {import("@mui/material").SxProps} */
const formSx = {
  p: 2,
};

/** @type {import("@mui/material").SxProps} */
const buttonSx = {
  mt: 1,
  py: 1.4,
  borderRadius: 1.5,
  textTransform: "none",
  fontWeight: 600,
};

export default function CreateBookingPage() {

  const { service } = useParams();

  const navigate = useNavigate();

  const bookingMutation = useCreateBooking();

  const [form, setForm] = useState({
    description: "",
    scheduledAt: "",
    durationMinutes: 60,
    price: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingMutation.mutate({ service, ...form },{
        onSuccess: () => navigate("/bookings"),
      }
    );
  };

  return (
    <Box sx={pageSx}>
      <Box sx={containerSx}>
        <Paper elevation={0} sx={paperSx}>
          <Box sx={headerSx}>
            <Typography variant="h5" fontWeight={700}>
              Create Booking
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={subtitleSx}
            >
              Provide the details for your service booking.
            </Typography>
          </Box>

          <Stack
            component="form"
            spacing={2.5}
            onSubmit={handleSubmit}
            sx={formSx}
          >
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what you need"
              multiline
              rows={4}
              fullWidth
            />

            <NativeDateTime
              label="Date & Time"
              name="scheduledAt"
              placeholder="Select date and time"
              value={form.scheduledAt}
              onChange={handleChange}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
            />

            <TextField
              label="Duration"
              name="durationMinutes"
              type="number"
              value={form.durationMinutes}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 15,
                  step: 15,
                },
              }}
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 1,
                },
              }}
              fullWidth
            />

            <TextField
              label="Additional Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional information"
              multiline
              rows={3}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={bookingMutation.isPending}
              sx={buttonSx}
            >
              {bookingMutation.isPending
                ? "Creating Booking..."
                : "Confirm Booking"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}