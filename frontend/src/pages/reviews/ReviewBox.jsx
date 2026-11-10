import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useEntityReviews } from "../../hooks/api/reviews/reviews.hooks";

/** @type {import("@mui/material").SxProps} */
const rootStyles = {
  width: "100%",
};

/** @type {import("@mui/material").SxProps} */
const headerStyles = {
  mb: 2,
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  fontWeight: 700,
};

/** @type {import("@mui/material").SxProps} */
const subtitleStyles = {
  mt: 0.5,
  color: "text.secondary",
};

/** @type {import("@mui/material").SxProps} */
const leaveButtonStyles = {
  alignSelf: "flex-start",
};

 /** @type {import("@mui/material").SxProps} */
const paginationStyles = {
  display: "flex",
  justifyContent: "center",
  pt: 1,
};

export default function ReviewBox({
  entityType,
  entityId,
}) {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const filters = {
    page,
    limit: 10,
    sort: "-createdAt",
  };

  const { data, isLoading } = useEntityReviews(
    entityType,
    entityId,
    filters
  );

  const myReview = data?.own;
  const reviews = data?.reviews;

  console.log(data)

  const totalPages = data?.meta?.pages

  const handleReviewSuccess = () => {
    setShowForm(false);
  };

  return (
    <Box sx={rootStyles}>
      <Stack spacing={3}>
        <Box sx={headerStyles}>
          <Typography variant="h6" sx={titleStyles}>
            Reviews
          </Typography>

          <Typography variant="body2" sx={subtitleStyles}>
            Share your experience and see what reviews think.
          </Typography>
        </Box>

        {!showForm && !myReview && (
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={leaveButtonStyles}
          >
            Leave Review
          </Button>
        )}

        {showForm && (
          <ReviewForm
            entityType={entityType}
            entityId={entityId}
            myReview={myReview}
            onSuccess={handleReviewSuccess}
            onCancel={() => setShowForm(false)}
          />
        )}

        {myReview && !showForm && (
          <Button
            variant="outlined"
            onClick={() => setShowForm(true)}
            sx={leaveButtonStyles}
          >
            Edit Review
          </Button>
        )}

        <Divider />

        <ReviewList
          reviews={reviews}
          loading={isLoading}
        />

        {totalPages > 1 && (
          <Box sx={paginationStyles}>
            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}