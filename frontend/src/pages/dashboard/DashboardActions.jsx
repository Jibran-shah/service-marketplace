import { Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardActions({
  actions = [],
  onSelectAction,
}) {
  const navigate = useNavigate();

  const handleClick = (action) => {

    if (action.component) {
      onSelectAction?.(action);
      return;
    }

    if (action.path) {
      navigate(action.path);
      return;
    }

    onSelectAction?.(action);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        width: 280,
      }}
    >
      <Stack spacing={2}>
        {actions.map((action) => (
          <Button
            variant="outlined"
            startIcon={action.icon}
            onClick={() => handleClick(action)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
            key={action.label}
          >
            {action.label}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
}