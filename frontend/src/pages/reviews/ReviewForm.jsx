import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  useCreateReview,
  useUpdateReview,
} from "../../hooks/api/reviews/reviews.hooks";

/** @type {import("@mui/material").SxProps} */
const formStyles = {
  p: { xs: 2, sm: 3 },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const titleStyles = {
  fontWeight: 700,
};

/** @type {import("@mui/material").SxProps} */
const ratingStyles = {
  alignSelf: "flex-start",
};

/** @type {import("@mui/material").SxProps} */
const actionsStyles = {
  alignSelf: "flex-start",
};

export default function ReviewForm({
  entityType,
  entityId,
  myReview,
  onSuccess,
  onCancel,
}) {
  const { mutate: createReview, isPending: creating } =
    useCreateReview();

  const { mutate: updateReview, isPending: updating } =
    useUpdateReview();

  const [draft, setDraft] = useState({
    rating: 0,
    comment: "",
  });

  const loading = creating || updating;

  useEffect(() => {
    if (!myReview) return;

    setDraft({
      rating: myReview.rating ?? 0,
      comment: myReview.comment ?? "",
    });
  }, [myReview?._id]);

  const handleChange = (field) => (event) => {
    setDraft((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleRatingChange = (_, value) => {
    setDraft((prev) => ({
      ...prev,
      rating: value ?? 0,
    }));
  };

  const handleSubmit = () => {
    if (draft.rating < 1) return;

    if (myReview) {
      updateReview(
        {
          id: myReview._id,
          data: draft,
        },
        {
          onSuccess,
        }
      );

      return;
    }

    createReview(
      {
        entityType,
        entityId,
        ...draft,
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <Paper elevation={0} sx={formStyles}>
      <Stack spacing={2}>
        <Typography sx={titleStyles}>
          {myReview ? "Your Review" : "Write a Review"}
        </Typography>

        <Rating
          value={draft.rating}
          onChange={handleRatingChange}
          disabled={loading}
          sx={ratingStyles}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          value={draft.comment}
          onChange={handleChange("comment")}
          placeholder="Share your experience..."
          disabled={loading}
        />

        <Stack direction="row" spacing={1} sx={actionsStyles}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || draft.rating < 1}
          >
            {myReview ? "Update Review" : "Submit Review"}
          </Button>

          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}