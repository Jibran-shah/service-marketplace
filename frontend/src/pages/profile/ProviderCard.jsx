import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProviderCard({
  provider,
  isOwnProfile,
  onEdit,
  onDelete,
  onCreate,
}) {
  const navigate = useNavigate();

  if (!provider) {
    if (!isOwnProfile) return null;

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Service Provider
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            You haven't created a service provider profile yet.
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={onCreate}>
            Become a Service Provider
          </Button>
        </CardContent>
      </Card>
    );
  }

  const viewProvider = () => {
    navigate(`/provider/${provider._id}`);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{
            alignItems:"center"
          }}>
          <Avatar sx={{ width: 56, height: 56 }}>
            {provider.title?.charAt(0)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {provider.title}
            </Typography>

            <Stack direction="row" spacing={1} sx={{
                alignItems:"center"
              }}>
              <Rating
                value={provider.ratingAverage || 0}
                precision={0.1}
                size="small"
                readOnly
              />

              <Typography variant="body2" color="text.secondary">
                ({provider.ratingCount || 0})
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {provider.description && (
          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {provider.description}
          </Typography>
        )}

        {provider.skills?.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ mt: 2, flexWrap: "wrap" }}
          >
            {provider.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" />
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={viewProvider}>
            View Profile
          </Button>

          {isOwnProfile && (
            <>
              <Button variant="outlined" onClick={onEdit}>
                Edit
              </Button>

              <Button color="error" variant="outlined" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}