import { Box, Typography } from "@mui/material";

import ReviewList from "../../components/reviews/ReviewList";

export default function ReviewsPage() {
  const reviews = [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
        Reviews
      </Typography>

      <ReviewList reviews={reviews} />
    </Box>
  );
}