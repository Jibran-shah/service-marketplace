import { Stack, Button } from "@mui/material";

export default function MessageActions({
  onEdit,
  onDelete,
  onMarkRead
}) {
  return (
    <Stack direction="row" spacing={1}>
      {onEdit && (
        <Button size="small">
          Edit
        </Button>
      )}

      {onDelete && (
        <Button size="small" color="error">
          Delete
        </Button>
      )}

      {onMarkRead && (
        <Button size="small">
          Mark Read
        </Button>
      )}
    </Stack>
  );
}