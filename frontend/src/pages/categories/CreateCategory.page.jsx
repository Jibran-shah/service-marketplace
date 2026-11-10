import { Box, Typography, Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CategoryForm from "./CategoryForm";
import { useCreateCategory } from "../../hooks/api/categories/categories.hooks";

export default function CategoryCreatePage() {
  const { mutate, isPending } = useCreateCategory();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Category created successfully");
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to create category"
        );
      }
    });
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography variant="h5" mb={3}>
        Create Category
      </Typography>

      <CategoryForm
        mode="create"
        onSubmit={handleSubmit}
        loading={isPending}
      />
      <Stack direction="row" spacing={2} mt={6} py={16}>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Stack>
    </Box>
  );
}