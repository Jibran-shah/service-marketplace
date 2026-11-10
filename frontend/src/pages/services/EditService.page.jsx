import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {InputField} from "../../components/InputField";
import CategoryTreeSelect from "../categories/CategoryTreeSelect";

import {
  useService,
  useUpdateService,
} from "../../hooks/api/services/services.hooks";
import { useServiceForm } from "../../hooks/form/services/useService.form";

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useService(id);
  const { mutate: updateService, isPending } = useUpdateService();

  const form = useServiceForm();

  const { register, handleSubmit, reset, control, formState } = form;

  /* =========================
     FILL FORM ON LOAD
  ========================= */
  useEffect(() => {
    if (!data) return;

    reset({
      name: data.name || "",
      description: data.description || "",
      category: data.category?._id || data.category || "",
      price: data.price || 0,
      durationHours: data.durationHours || 0,
    });
  }, [data, reset]);

  /* =========================
     DIRTY CHECK
  ========================= */
  const isChangeMade = formState.isDirty;

  /* =========================
     SUBMIT
  ========================= */
  const onSubmit = handleSubmit((values) => {
    updateService(
      {
        id,
        data: values,
      },
      {
        onSuccess: (res) => {
          const serviceId = res?._id || res?.id || id;
          navigate(`/services/${serviceId}`);
        },
      }
    );
  });

  /* =========================
     LOADING STATE
  ========================= */
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          Failed to load service
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        component="form"
        onSubmit={onSubmit}
        sx={{ p: 4, width: "100%", maxWidth: 700 }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Edit Service
        </Typography>

        <Stack spacing={2}>
          <InputField
            label="Service Name"
            name="name"
            register={register}
          />

          <InputField
            label="Description"
            name="description"
            register={register}
          />

          {/* =========================
              CATEGORY (FIXED)
          ========================= */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CategoryTreeSelect
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            register={register}
          />

          <InputField
            label="Duration Hours"
            name="durationHours"
            type="number"
            register={register}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={isPending || !isChangeMade}
          >
            {isPending ? "Updating..." : "Update Service"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}