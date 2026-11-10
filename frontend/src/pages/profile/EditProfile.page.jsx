import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

import { useProfile } from "../../hooks/api/profile/profile.hooks";
import { useUpdateProfile } from "../../hooks/api/profile/profile.hooks";
import { useEditProfileForm } from "../../hooks/form/profile/useEditProfileForm";

import ProfileForm from "./ProfileForm";


export default function EditProfilePage() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();
  const form = useEditProfileForm();

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile]);

  const onSubmit = (data) => {
    const formData = buildProfileFormData(data);
    updateMutation.mutate(formData, {
      onSuccess: () => navigate("/profile")
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={2}>
          Edit Profile
        </Typography>

        <ProfileForm
          form={form}
          onSubmit={onSubmit}
          isLoading={updateMutation.isPending}
          mode="edit"
        />
      </Paper>
    </Box>
  );
}