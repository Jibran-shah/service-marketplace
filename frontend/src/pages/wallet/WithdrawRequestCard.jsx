import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Button,
  TextField,
  Divider,
} from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";

import { useUpdateWithdrawStatus } from "../../hooks/api/withdraw/withdraw.hooks";

export default function WithdrawRequestCard({
  request,
}) {
  const { user } = useSelector(
    (state) => state.auth
  );

  const isAdmin = user?.role === "admin";

  const {
    mutateAsync: updateStatus,
    isPending,
  } = useUpdateWithdrawStatus();

  const [proofMediaId, setProofMediaId] =
    useState("");
  const [adminNote, setAdminNote] = useState("");

  const handleAction = async (status) => {
    await updateStatus({
      id: request._id,
      data: {
        status,
        proofMediaId:
          proofMediaId || undefined,
        adminNote: adminNote || undefined,
      },
    });

    setProofMediaId("");
    setAdminNote("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          justifyContent:"space-between",
          alignItems:"center"
        }}
      >
        <Typography fontWeight={600}>
          Withdraw Request
        </Typography>

        <Chip
          label={request?.status}
          color={getStatusColor(
            request?.status
          )}
          size="small"
        />
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      {/* Info */}
      <Stack spacing={0.5}>
        <Typography variant="body2">
          <b>Amount:</b> ₨ {request?.amount}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          <b>User ID:</b> {request?.userId}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          <b>Wallet:</b> {request?.wallet}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Created:{" "}
          {new Date(
            request?.createdAt
          ).toLocaleString()}
        </Typography>
      </Stack>

      {/* ADMIN ACTIONS */}
      {isAdmin && (
        <>
          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            <TextField
              size="small"
              label="Proof Media ID"
              value={proofMediaId}
              onChange={(e) =>
                setProofMediaId(e.target.value)
              }
            />

            <TextField
              size="small"
              label="Admin Note"
              value={adminNote}
              onChange={(e) =>
                setAdminNote(e.target.value)
              }
              multiline
              minRows={2}
            />

            <Stack
              direction="row"
              spacing={1}
            >
              <Button
                variant="contained"
                color="success"
                disabled={isPending}
                onClick={() =>
                  handleAction("APPROVED")
                }
              >
                Approve
              </Button>

              <Button
                variant="contained"
                color="error"
                disabled={isPending}
                onClick={() =>
                  handleAction("REJECTED")
                }
              >
                Reject
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Paper>
  );
}