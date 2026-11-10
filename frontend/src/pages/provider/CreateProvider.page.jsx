import { TextField, Stack, Box, Chip, Button, Typography } from "@mui/material";
import { useState } from "react";

import ProviderProfileForm from "./ProviderProfileForm";

import { useProviderForm } from "../../hooks/form/provider/useProvider.form";
import { useCreateProvider } from "../../hooks/api/provider/provider.hooks";
import { useGeoLocation } from "../../hooks/ui/useGeoLocation";
import { buildProviderPayload } from "../../utils/form/providerFormData";
import { useNavigate } from "react-router-dom";

export default function CreateProviderProfilePage() {
  const form = useProviderForm();
  const mutation = useCreateProvider();

  const [skillInput, setSkillInput] = useState("");

  const skills = form.watch("skills") || [];

  const navigate = useNavigate();

  const { status: locationStatus, error: locationError } =
    useGeoLocation(form.setValue);

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;

    if (skills.includes(value)) return;

    form.setValue("skills", [...skills, value]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data) => {
    if (mutation.isPending) return;
      mutation.mutate(buildProviderPayload(data), {
      onSuccess: (res) =>{
        console.log("create profile res",res)
        navigate("/profile")
      }
    });
  };

  return (
    <ProviderProfileForm
      title="Create Service Provider Profile"
      subtitle="Build your professional presence"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={mutation.isPending}
      submitText="Create Profile"
    >
      <Stack spacing={2.5}>

        {/* LOCATION STATUS */}
        {locationStatus === "requesting" && (
          <Typography variant="body2" color="text.secondary">
            Detecting your location...
          </Typography>
        )}

        {locationStatus === "granted" && (
          <Typography variant="body2" color="success.main">
            Location detected successfully
          </Typography>
        )}

        {locationError && (
          <Typography variant="body2" color="error">
            {locationError}
          </Typography>
        )}

        {/* TITLE */}
        <TextField
          label="Professional Title"
          fullWidth
          {...form.register("title")}
        />

        {/* DESCRIPTION */}
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          {...form.register("description")}
        />

        {/* SKILLS */}
        <Box>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill"
            />

            <Button variant="outlined" onClick={addSkill}>
              Add
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
            {skills.map((skill, i) => (
              <Chip
                key={`${skill}-${i}`}
                label={skill}
                onDelete={() => removeSkill(i)}
              />
            ))}
          </Stack>
        </Box>

        {/* EXPERIENCE */}
        <TextField
          label="Experience (Years)"
          type="number"
          fullWidth
          {...form.register("experienceYears")}
        />

        {/* ADDRESS */}
        <TextField
          label="Full Address"
          fullWidth
          {...form.register("fullAddress")}
        />

      </Stack>
    </ProviderProfileForm>
  );
}