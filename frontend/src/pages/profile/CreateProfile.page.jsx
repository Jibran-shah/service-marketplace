import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

useCreateProfile
import { useCreateProfile } from "../../hooks/api/profile/profile.hooks";
import { useCreateProfileForm } from "../../hooks/form/profile/useCreateProfileForm";
import ProfileForm from "./ProfileForm";
import {buildProfileFormData} from "../../utils/form/profileFormData"

export default function CreateProfilePage() {
  const navigate = useNavigate();

  const form = useCreateProfileForm();
  const createMutation = useCreateProfile();

  const onSubmit = (data) => {
    const formData = buildProfileFormData(data);
    createMutation.mutate(formData, {
      onSuccess: () =>{
        navigate("/profile")
      }
    });
  };


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" sx={{mb:2}}>
          Create Profile
        </Typography>

        <ProfileForm
          form={form}
          onSubmit={onSubmit}
          isLoading={createMutation.isPending}
          mode="create"
        />
      </Paper>
    </Box>
  );
}