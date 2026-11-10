import { Paper, Stack, Typography, Avatar, Rating, Box } from "@mui/material";

export default function ReviewCard({ review }) {
  const user = review?.user;
  const name = user?.profile?.name || "Anonymous User";
  const avatar = user?.profile?.avatar?.file?.url || "";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          boxShadow: 2
        }
      }}
    >
      <Stack spacing={1.5}>

        {/* HEADER */}
        <Stack direction="row" spacing={1.5} sx={{
          alignItems:"center"
        }}>

          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 42, height: 42 }}
          >
            {name?.charAt(0)}
          </Avatar>

          <Box>
            <Typography fontWeight={600} lineHeight={1.2}>
              {name}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Verified reviewer
            </Typography>
          </Box>

        </Stack>

        {/* RATING */}
        <Rating
          value={review?.rating || 0}
          precision={0.5}
          readOnly
          size="small"
        />

        {/* COMMENT */}
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            lineHeight: 1.6
          }}
        >
          {review?.comment || "No comment provided."}
        </Typography>

      </Stack>
    </Paper>
  );
}