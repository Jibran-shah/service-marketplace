import { Stack, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";

import { InputField } from "../../components/InputField";
import CategoryTreeSelect from "./CategoryTreeSelect";
import {CATEGORY_APPLIES_TO_ARRAY } from "../../../../backend/constants/category.constants";

/* =========================
   KEEP YOUR BACKEND VALUES
========================= */
const APPLIES_TO_OPTIONS = CATEGORY_APPLIES_TO_ARRAY.map((v) => ({
  label: v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
  value: v
}));

export default function CategoryForm({
  mode = "create",
  onSubmit,
  loading = false,
  initialValues = {}
}) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
      appliesTo: initialValues.appliesTo || CATEGORY_APPLIES_TO_ARRAY,
      parentCategory: initialValues.parentCategory || null
    }
  });

  const appliesTo = watch("appliesTo") || [];
  const parentCategory = watch("parentCategory");

  /* =========================
     TOGGLE
  ========================= */
  const handleAppliesToChange = (value) => {
    const current = appliesTo || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    // ✅ SAFE + SCALABLE FILTER
    const clean = [...new Set(updated)].filter((v) =>
      CATEGORY_APPLIES_TO_ARRAY.includes(v)
    );

    setValue("appliesTo", clean, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  const handleParentChange = (value) => {
    setValue("parentCategory", value || null);
  };

  const submitHandler = (data) => {
    const cleanPayload = {
      ...data,
      parentCategory: data.parentCategory || null,

      appliesTo: [...new Set(data.appliesTo || [])].filter((v) =>
        CATEGORY_APPLIES_TO_ARRAY.includes(v)
      )
    };

    onSubmit?.(cleanPayload);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(submitHandler)}>
      <InputField label="Name" name="name" register={register} />
      <InputField label="Description" name="description" register={register} />

      <CategoryTreeSelect
        value={parentCategory}
        onChange={handleParentChange}
        label="Parent Category"
      />

      <FormGroup>
        {APPLIES_TO_OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={appliesTo.includes(opt.value)}
                onChange={() => handleAppliesToChange(opt.value)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>

      <Button type="submit" variant="contained" disabled={loading}>
        {mode === "create" ? "Create" : "Update"}
      </Button>
    </Stack>
  );
}