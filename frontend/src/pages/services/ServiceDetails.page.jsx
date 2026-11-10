import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useDeleteService,
  useService,
} from "../../hooks/api/services/services.hooks";
import ImageCarousel from "../../components/ImageCarousel";
import ReviewBox from "../reviews/ReviewBox";
import { REVIEW_ENTITYS } from "../../../../backend/constants/review.constants";
import { AspectRatio } from "@mui/icons-material";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useService(id);
  const { mutate: deleteService, isPending: deleting } =
    useDeleteService();

  const service = data?.service

  const [openConfirm, setOpenConfirm] = useState(false);

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (isError || !service) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          Failed to load service
        </Typography>
      </Box>
    );
  }

  const provider = service.provider;
  const profile = provider?.user?.profile;

  const images =
    service.images?.map((image) => image.file?.url).filter(Boolean) || [];

  const isOwn = provider?._id === user?.provider;

  const confirmDelete = () => {
    deleteService(id, {
      onSuccess: () => {
        setOpenConfirm(false);
        navigate("/services");
      },
    });
  };

  
  const handleBook = (event) => {
    event.stopPropagation();
    navigate(`/booking/create/${service._id}`);
  };

  return (
    <Box sx={pageSx}>
      <Paper sx={cardSx}>
        {/* IMAGES */}
        <ImageCarousel
          images={images}
          imageStyles={{
            aspectRatio:"2/1"
          }}
        />

        <Box sx={contentSx}>
          {/* TITLE */}
          <Typography variant="h4" fontWeight={700}>
            {service.name}
          </Typography>

          {/* PROVIDER */}
          {provider && (
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={providerSx}
            >
              <Avatar
                src={profile?.avatar?.file?.url}
                alt={profile?.name}
                sx={{ width: 52, height: 52 }}
                onClick={()=>{navigate(`/provider/${provider._id}`)}}
              >
                {profile?.name?.charAt(0)}
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={600}>
                  {profile?.name || "Service Provider"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {provider.title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Rating
                    value={provider.ratingAverage || 0}
                    precision={0.1}
                    size="small"
                    readOnly
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    ({provider.ratingCount || 0})
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          )}

          <Divider />

          {/* DESCRIPTION */}
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              About this service
            </Typography>

            <Typography color="text.secondary" sx={descriptionSx}>
              {service.description || "No description available."}
            </Typography>
          </Box>

          {/* SERVICE INFO */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 4 }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Price
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                Rs. {Number(service.price).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography fontWeight={600}>
                {service.durationHours} hours
              </Typography>
            </Box>

            {service.category?.name && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Category
                </Typography>
                <Typography fontWeight={600}>
                  {service.category.name}
                </Typography>
              </Box>
            )}
          </Stack>

          {service.fullAddress && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
              <Typography fontWeight={500}>
                {service.fullAddress}
              </Typography>
            </Box>
          )}

          {/* ACTIONS */}
          <Stack direction="row" spacing={1}>
            {!isOwn && (
              <Button
                fullWidth
                onClick={handleBook}
                variant="contained"
                size="small"
                sx={bookButtonSx}
              >
                Book Service
              </Button>
            )}

            {isOwn && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/services/update/${id}`)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenConfirm(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>

          <Divider />

          <ReviewBox
            entityId={service._id}
            entityType={REVIEW_ENTITYS.SERVICE}
          />
        </Box>
      </Paper>

      <Dialog
        open={openConfirm}
        onClose={() => !deleting && setOpenConfirm(false)}
      >
        <DialogTitle>Delete Service?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenConfirm(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  p: { xs: 2, md: 4 },
  display: "flex",
  justifyContent: "center",
};

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  width: "100%",
  maxWidth: 900,
  overflow: "hidden",
  border: 1,
  borderColor: "divider",
  boxShadow: "none",
};

/** @type {import("@mui/material").SxProps} */
const contentSx = {
  p: { xs: 2, md: 4 },
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

/** @type {import("@mui/material").SxProps} */
const providerSx = {
  p: 1.5,
  borderRadius: 1,
  bgcolor: "action.hover",
  width: "fit-content",
  maxWidth: "100%",
};

/** @type {import("@mui/material").SxProps} */
const descriptionSx = {
  lineHeight: 1.7,
  whiteSpace: "pre-line",
};


/** @type {import("@mui/material").SxProps} */
const bookButtonSx = {
  mt: 1.5,
  height: 36,
  borderRadius: 1.25,
  textTransform: "none",
  fontSize: 12.5,
  fontWeight: 600,
  boxShadow: "none",

  "&:hover": {
    boxShadow: "none",
  },
};