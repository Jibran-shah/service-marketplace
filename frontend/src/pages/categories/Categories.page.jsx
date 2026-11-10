import { Typography, Stack, Button } from "@mui/material";
import CategoryCard from "../../components/categories/CategoryCard";

export default function CategoriesPage() {
  const categories = [];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Categories
        </Typography>

        <Button variant="contained">
          Create Category
        </Button>
      </Stack>

      <Stack spacing={2}>
        {categories.length === 0 && (
          <Typography>No categories found</Typography>
        )}

        {categories.map((cat, idx) => (
          <CategoryCard key={idx} category={cat} />
        ))}
      </Stack>
    </>
  );
}