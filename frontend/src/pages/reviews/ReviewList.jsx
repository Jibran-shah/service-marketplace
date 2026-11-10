import { Stack, Typography } from "@mui/material";

import ReviewCard from "./ReviewCard";

/** @type {import("@mui/material").SxProps} */
const rootStyles = {
  gap: 0.5,
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  fontWeight: 700,
};

/** @type {import("@mui/material").SxProps} */
const emptyStyles = {
  color: "text.secondary",
};

export default function ReviewList({ reviews = [] }) {
  return (
    <Stack spacing={1} sx={rootStyles}>
      <Typography sx={titleStyles}>
        Other Reviews
      </Typography>

      {reviews.length ? (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
          />
        ))
      ) : (
        <Typography variant="body2" sx={emptyStyles}>
          No reviews yet
        </Typography>
      )}
    </Stack>
  );
}