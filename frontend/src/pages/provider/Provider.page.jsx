import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";

import { useProvider } from "../../hooks/api/provider/provider.hooks";
import { useServices } from "../../hooks/api/services/services.hooks";
import ServiceCard from "../services/ServiceCard";
import ReviewBox from "../reviews/ReviewBox";
import { REVIEW_ENTITYS } from "../../../../backend/constants/review.constants";
import ChatButton from "../chat/ChatButton";

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  py: 4,
};

/** @type {import("@mui/material").SxProps} */
const profileCardSx = {
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const coverSx = {
  height: { xs: 160, md: 220 },
  backgroundColor: "grey.200",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

/** @type {import("@mui/material").SxProps} */
const profileContentSx = {
  px: { xs: 3, md: 4 },
  pb: 4,
};

/** @type {import("@mui/material").SxProps} */
const avatarSx = {
  width: { xs: 96, md: 120 },
  height: { xs: 96, md: 120 },
  border: "4px solid",
  borderColor: "background.paper",
  mt: { xs: -6, md: -7 },
};

/** @type {import("@mui/material").SxProps} */
const profileInfoSx = {
  justifyContent:"space-between",
  alignItems:{ xs: "flex-start", sm: "center" },
  mt: 2,
};

/** @type {import("@mui/material").SxProps} */
const descriptionSx = {
  mt: 2,
  maxWidth: 850,
  lineHeight: 1.7,
};

/** @type {import("@mui/material").SxProps} */
const messageButtonSx = {
  textTransform: "none",
  borderRadius: 1,
  px: 2,
  alignSelf:"center"
};

/** @type {import("@mui/material").SxProps} */
const sectionSx = {
  mt: 5,
};

/** @type {import("@mui/material").SxProps} */
const sectionTitleSx = {
  mb: 2.5,
};

export default function ProviderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useProvider(id);
  const provider = data?.provider;

  const {
    data: servicesData,
    isLoading: servicesIsLoading,
    isError: servicesIsError,
    error: servicesError,
  } = useServices(
    { provider: provider?._id },
    !isError && !isLoading
  );

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Typography>Loading provider...</Typography>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Typography color="error">
            {error?.message || "Error loading provider"}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!provider) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Typography>Provider not found.</Typography>
        </Box>
      </Container>
    );
  }

  const services = servicesData?.services || [];
  const profile = provider.user?.profile;

  const avatarUrl = profile?.avatar?.file?.url;
  const coverUrl = profile?.cover?.file?.url;

  return (
    <Container maxWidth="lg">
      <Box sx={pageSx}>
        <Paper variant="outlined" sx={profileCardSx}>
          <Box
            sx={{
              ...coverSx,
              backgroundImage: coverUrl
                ? `url(${coverUrl})`
                : "none",
            }}
          />

          <Box sx={profileContentSx}>
            <Avatar
              src={avatarUrl}
              alt={profile?.name || "Provider"}
              sx={avatarSx}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={profileInfoSx}
            >
              <Box>
                <Typography variant="h4" fontWeight={600}>
                  {profile?.name || "Provider"}
                </Typography>

                <Typography variant="h6" color="text.secondary">
                  {provider.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  <Rating
                    value={provider.ratingAverage || 0}
                    precision={0.1}
                    size="small"
                    readOnly
                  />

                  <Typography variant="body2" color="text.secondary">
                    {provider.ratingCount || 0} reviews
                  </Typography>
                </Stack>
              </Box>

              <ChatButton id={provider?.user?._id}/>
            </Stack>

            {provider.description && (
              <Typography color="text.secondary" sx={descriptionSx}>
                {provider.description}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 5 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <WorkOutlineOutlinedIcon color="action" />

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Experience
                  </Typography>

                  <Typography fontWeight={500}>
                    {provider.experienceYears || 0} years
                  </Typography>
                </Box>
              </Stack>

              {provider.location?.fullAddress && (
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <LocationOnOutlinedIcon color="action" />

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>

                    <Typography fontWeight={500}>
                      {provider.location.fullAddress}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>

            {provider.skills?.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />

                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                    Skills
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    {provider.skills.map((skill) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Paper>

        <Box sx={sectionSx}>
          <Typography variant="h5" fontWeight={600} sx={sectionTitleSx}>
            Services
          </Typography>

          {servicesIsLoading && (
            <Typography color="text.secondary">
              Loading services...
            </Typography>
          )}

          {servicesIsError && (
            <Typography color="error">
              {servicesError?.message || "Error loading services"}
            </Typography>
          )}

          {!servicesIsLoading && !servicesIsError && services.length > 0 && (
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid key={service._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
            </Grid>
          )}

          {!servicesIsLoading &&
            !servicesIsError &&
            services.length === 0 && (
              <Typography color="text.secondary">
                No services available.
              </Typography>
            )}
        </Box>

        <Box sx={sectionSx}>
          <ReviewBox
            entityId={provider._id}
            entityType={REVIEW_ENTITYS.PROVIDER}
          />
        </Box>
      </Box>
    </Container>
  );
}