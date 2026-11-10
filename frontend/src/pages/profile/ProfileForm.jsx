import { Stack, Button } from "@mui/material";

import { InputField } from "../../components/InputField";
import FileInputField from "../../components/FileInputField";

export default function ProfileForm({
  form,
  onSubmit,
  isLoading,
  mode = "create",
}) {
  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <InputField
        label="Full Name"
        name="name"
        register={form.register}
        error={form.formState.errors.name}
      />

      <FileInputField
        label="Avatar"
        value={form.watch("avatar") ? [form.watch("avatar")] : []}
        onChange={(files) =>
          form.setValue("avatar", files[0] ?? null, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        accept="image/*"
        maxSizeMB={5}
      />

      <FileInputField
        label="Cover"
        value={form.watch("cover") ? [form.watch("cover")] : []}
        onChange={(files) =>
          form.setValue("cover", files[0] ?? null, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        accept="image/*"
        maxSizeMB={5}
      />

      <InputField
        label="Phone"
        name="phone"
        register={form.register}
        error={form.formState.errors.phone}
      />

      <InputField
        label="Bio"
        name="bio"
        register={form.register}
        error={form.formState.errors.bio}
      />

      <InputField
        label="Country"
        name="country"
        register={form.register}
        error={form.formState.errors.country}
      />

      <InputField
        label="City"
        name="city"
        register={form.register}
        error={form.formState.errors.city}
      />

      <InputField
        label="Address"
        name="address"
        register={form.register}
        error={form.formState.errors.address}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading
          ? mode === "edit"
            ? "Updating..."
            : "Creating..."
          : mode === "edit"
            ? "Update Profile"
            : "Create Profile"}
      </Button>
    </Stack>
  );
}