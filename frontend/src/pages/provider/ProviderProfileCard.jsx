import {
  Typography,
  Stack,
  Chip
} from "@mui/material";

export default function ProviderProfileCard({
  provider
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">
        {provider.title}
      </Typography>

      <Typography>
        {provider.description}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap:"wrap"
        }}
      >
        {provider.skills?.map((skill) => (
          <Chip
            key={skill}
            label={skill}
          />
        ))}
      </Stack>

      <Typography>
        Experience: {provider.experienceYears} Years
      </Typography>

      <Typography>
        Rating: {provider.rating}
      </Typography>

      <Typography>
        {provider.fullAddress}
      </Typography>

      <Typography>
        Approved: {provider.isApproved ? "Yes" : "No"}
      </Typography>
    </Stack>
  );
}