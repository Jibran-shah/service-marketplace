import {
  TextField,
  Stack,
  Box,
  Chip,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";

import ProviderProfileForm from "./ProviderProfileForm";

import {
  useMyProvider,
  useUpdateProviderByUser,
} from "../../hooks/api/provider/provider.hooks";
import { useProviderForm } from "../../hooks/form/provider/useProvider.form";
import { useGeoLocation } from "../../hooks/ui/useGeoLocation";
import { buildProviderPayload } from "../../utils/form/providerFormData";

/** @type {import("@mui/material").SxProps} */
const skillsListSx = {
  mt: 1.25,
  gap: 1,
};

/** @type {import("@mui/material").SxProps} */
const locationCardSx = {
  p: 2,
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  bgcolor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const locationContentSx = {
  minWidth: 0,
};

/** @type {import("@mui/material").SxProps} */
const locationTitleSx = {
  fontSize: "0.875rem",
  fontWeight: 600,
  lineHeight: 1.4,
};

/** @type {import("@mui/material").SxProps} */
const coordinatesSx = {
  mt: 0.35,
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: "text.secondary",
};

/** @type {import("@mui/material").SxProps} */
const locationStatusSx = {
  fontSize: "0.875rem",
  lineHeight: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const locationButtonSx = {
  alignSelf: "flex-start",
};

export default function EditProviderProfilePage() {
  const { data, isLoading, isError } = useMyProvider();
  const mutation = useUpdateProviderByUser();
  const form = useProviderForm();

  const [skillInput, setSkillInput] = useState("");
  const skills = form.watch("skills") || [];

  useEffect(() => {
    if (isLoading || isError || !data?.provider) return;

    setDefaults(form, data.provider);
  }, [data, isError, isLoading, form]);

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value || skills.includes(value)) return;

    form.setValue("skills", [...skills, value], {
      shouldDirty: true,
    });

    setSkillInput("");
  };

  const removeSkill = (index) => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const onSubmit = (data) => {
    if (mutation.isPending) return;

    mutation.mutate(buildProviderPayload(data));
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error loading provider info...</Box>;
  }

  return (
    <ProviderProfileForm
      title="Edit Profession Info"
      subtitle="Update your professional information"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={mutation.isPending}
      submitText="Update Profile"
    >
      <Stack spacing={2.5}>
        <TextField
          label="Professional Title"
          fullWidth
          {...form.register("title")}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          {...form.register("description")}
        />

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

          {skills.length > 0 && (
            <Stack
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={skillsListSx}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  onDelete={() => removeSkill(index)}
                />
              ))}
            </Stack>
          )}
        </Box>

        <TextField
          label="Experience (Years)"
          type="number"
          fullWidth
          {...form.register("experienceYears")}
        />

        <TextField
          label="Full Address"
          fullWidth
          {...form.register("fullAddress")}
        />

        <LocationSection form={form} />
      </Stack>
    </ProviderProfileForm>
  );
}

function LocationSection({ form }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const latitude = form.watch("locationLat");
  const longitude = form.watch("locationLn");
  const { status, error } = useGeoLocation(form.setValue);
  const updateLocation = () => {
    setIsUpdating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        form.setValue("locationLat", coords.latitude, {
          shouldDirty: true,
        });

        form.setValue("locationLn", coords.longitude, {
          shouldDirty: true,
        });

        setIsUpdating(false);
      },
      () => {
        setIsUpdating(false);
        alert("Location permission denied");
      }
    );
  };

  return (
    <Stack spacing={1.5}>
      <Box sx={locationCardSx}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <LocationOnIcon color="primary" />

          <Box sx={locationContentSx}>
            <Box sx={locationTitleSx}>
              Service Location
            </Box>

            {isUpdating ? (
              <LocationSkeleton />
            ) : (
              <Box sx={coordinatesSx}>
                Lat: {formatCoordinate(latitude)}°{" "}
                Lon: {formatCoordinate(longitude)}°
              </Box>
            )}
          </Box>
        </Stack>
      </Box>

      {status === "requesting" && (
        <Box sx={{ ...locationStatusSx, color: "text.secondary" }}>
          Detecting your location...
        </Box>
      )}

      {status === "granted" && (
        <Box sx={{ ...locationStatusSx, color: "success.main" }}>
          Location updated
        </Box>
      )}

      {error && (
        <Box sx={{ ...locationStatusSx, color: "error.main" }}>
          {error}
        </Box>
      )}

      <Button
        variant="outlined"
        startIcon={<LocationOnIcon />}
        onClick={updateLocation}
        disabled={isUpdating}
        sx={locationButtonSx}
      >
        {isUpdating ? "Updating Location..." : "Update Location"}
      </Button>
    </Stack>
  );
}

function LocationSkeleton() {
  return (
    <Stack spacing={0.5} sx={{ mt: 0.35 }}>
      <Box
        sx={{
          width: 210,
          height: 18,
          borderRadius: 1,
          bgcolor: "action.hover",
          animation: "locationPulse 1.5s ease-in-out infinite",
          "@keyframes locationPulse": {
            "0%": { opacity: 0.5 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.5 },
          },
        }}
      />

      <Box
        sx={{
          width: 170,
          height: 18,
          borderRadius: 1,
          bgcolor: "action.hover",
          animation: "locationPulse 1.5s ease-in-out infinite",
        }}
      />
    </Stack>
  );
}

const formatCoordinate = (value) => {
  const coordinate = Number(value);

  return Number.isFinite(coordinate) ? coordinate.toFixed(5) : "—";
};

const setDefaults = (form, provider) => {
  const coordinates = provider.location?.coordinates || [];

  form.reset({
    title: provider.title || "",
    description: provider.description || "",
    skills: provider.skills || [],
    experienceYears: provider.experienceYears || "",
    locationLat: coordinates[1] ?? "",
    locationLn: coordinates[0] ?? "",
    fullAddress: provider.fullAddress || "",
  });
};