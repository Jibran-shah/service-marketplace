import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ShopCard({
  shop,
  isOwnProfile,
  onEdit,
  onDelete,
  onCreate,
}) {
  const navigate = useNavigate();

  if (!shop) {
    if (!isOwnProfile) return null;

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Shop
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            You haven't created a shop yet.
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={onCreate}>
            Create Shop
          </Button>
        </CardContent>
      </Card>
    );
  }

  const logo = shop.logo?.file?.url;

  const viewShop = () => {
    navigate(`/shop/${shop._id}`);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={logo}
            alt={shop.name}
            sx={{ width: 56, height: 56 }}
          >
            {shop.name?.charAt(0)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {shop.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Rating
                value={shop.ratingAverage || 0}
                precision={0.1}
                size="small"
                readOnly
              />

              <Typography variant="body2" color="text.secondary">
                ({shop.ratingCount || 0})
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {shop.description && (
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
            {shop.description}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {shop.totalProducts || 0} products
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={viewShop}>
            View Shop
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