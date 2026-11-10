import { Paper, Typography, Button, Stack } from "@mui/material";
import { useDeleteService } from "../../../hooks/api/services/useDeleteService";

export default function DeleteServiceModal({
  serviceId,
  onClose
}) {
  const { mutate: deleteService, isLoading } = useDeleteService();

  const handleDelete = () => {
    deleteService(serviceId, {
      onSuccess: () => {
        onClose?.();
      }
    });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5">
          Delete Service
        </Typography>

        <Typography>
          This action cannot be undone.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Service"}
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}