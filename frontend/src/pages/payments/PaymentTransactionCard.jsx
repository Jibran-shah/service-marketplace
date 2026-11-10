import {
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";

export default function PaymentTransactionCard({
  payment,
  onView,
}) {
  const {
    id,
    status,
    amount,
    currency = "PKR",
  } = payment;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          alignItems:"center",
          justifyContent:"space-between"
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            Transaction #{id}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 0.5, alignItems:"center" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Status:
            </Typography>

            <Chip
              size="small"
              label={status}
              color={
                status === "completed"
                  ? "success"
                  : status === "pending"
                  ? "warning"
                  : status === "failed"
                  ? "error"
                  : "default"
              }
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Amount: {currency} {amount}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => onView?.(payment)}
        >
          View
        </Button>
      </Stack>
    </Paper>
  );
}