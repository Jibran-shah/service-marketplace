import { Paper, Typography, Stack, Chip, Divider } from "@mui/material";

export default function CategoryDetailsPage() {
  const category = {};

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>

          <Typography variant="h4">
            Category Details
          </Typography>

          <Divider />

          <Typography>Name: {category.name}</Typography>
          <Typography>Slug: {category.slug}</Typography>
          <Typography>Path: {category.path}</Typography>
          <Typography>Depth: {category.depth}</Typography>

          <Chip label={category.hierarchyLevel || "ROOT"} />

          <Divider />

          <Typography fontWeight={600}>
            Applies To
          </Typography>

          <Stack direction="row" spacing={1}>
            {category.appliesTo?.map((a, i) => (
              <Chip key={i} label={a} />
            ))}
          </Stack>

        </Stack>
      </Paper>
    </>
  );
}