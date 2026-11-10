import { Paper, Stack, Typography, Chip, Button } from "@mui/material";

export default function CategoryCard({ category }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>

        <Typography fontWeight={600}>
          {category.name}
        </Typography>

        <Typography variant="body2">
          Path: {category.path}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip label={category.hierarchyLevel || "ROOT"} />
          <Chip label={`Depth: ${category.depth}`} />

          {category.appliesTo?.map((a, i) => (
            <Chip key={i} label={a} />
          ))}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </Stack>

      </Stack>
    </Paper>
  );
}