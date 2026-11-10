import {
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { InputField } from "../../components/InputField";
import FileInputField from "../../components/FileInputField";
import { useCreateService } from "../../hooks/api/services/services.hooks";
import CategoryTreeSelect from "../categories/CategoryTreeSelect";
import { createServiceSchema } from "../../schemas/service.schema";
import { toFormData } from "../../utils/form/formData";

export default function CreateServiceForm() {
  const { mutate: createService, isPending } = useCreateService();

  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: createServiceSchema.parse({}),
  });

  const onSubmit = (data) => {
    const formData = toFormData(
      {
        ...data,
        price: Number(data.price),
        durationHours: Number(data.durationHours),
        category: data.category?._id || data.category,
      },
      {
        imageFiles: data.imageFiles,
      }
    );

    createService(formData, {
      onSuccess: () => {
        reset(createServiceSchema.parse({}));
      },
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 700,
        display:"flex",
        flexDirection:"column",
        gap:2
      }}
    >
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

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <CategoryTreeSelect
            value={field.value}
            onChange={field.onChange}
            label="Category"
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

      <InputField
        label="Address"
        name="fullAddress"
        register={register}
      />

      <Controller
        name="imageFiles"
        control={control}
        render={({ field }) => (
          <FileInputField
            label="Service Images"
            value={field.value}
            onChange={field.onChange}
            multiple
            maxFiles={5}
            maxSizeMB={5}
            accept="image/*"
          />
        )}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={isPending}
        >
        {isPending ? "Creating..." : "Create Service"}
      </Button>
    </Paper>
  );
}