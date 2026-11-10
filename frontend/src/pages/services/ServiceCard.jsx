import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({ service, isOwn }) {

  const navigate = useNavigate();

  const provider = service.provider;
  const profile = provider?.user?.profile;

  const providerName = profile?.name || "Unknown Provider";
  const providerAvatar = profile?.avatar?.file?.url;
  const image = service.images?.[0]?.file?.url;

  const isAvailable = service.status === "available";

  const handleCardClick = () => {
    navigate(`/services/${service._id}`);
  };

  const handleProviderClick = (event) => {
    event.stopPropagation();
    navigate(`/provider/${provider?._id}`);
  };

  const handleBook = (event) => {
    event.stopPropagation();
    navigate(`/booking/create/${service._id}`);
  };

  return (
    <Card onClick={handleCardClick} sx={cardSx}>
      <Box sx={imageWrapperSx}>
        <Box
          component="img"
          src={image}
          alt={service.name}
          sx={imageSx}
        />

        <Typography sx={statusSx}>
          {isAvailable ? "Available" : "Unavailable"}
        </Typography>
      </Box>

      <Box sx={contentSx}>
        <Stack
          direction="row"
          spacing={1}
          onClick={handleProviderClick}
          sx={providerSx}
        >
          <Avatar
            src={providerAvatar}
            alt={providerName}
            sx={providerAvatarSx}
          >
            {providerName.charAt(0)}
          </Avatar>

          <Typography sx={providerNameSx}>
            {providerName}
          </Typography>
        </Stack>

        <Typography sx={serviceNameSx}>
          {service.name}
        </Typography>

        <Typography sx={descriptionSx}>
          {service.description ||
            "Professional service delivered with quality and reliability."}
        </Typography>

        <Stack
          direction="row"
          sx={detailsSx}
        >
          <Typography sx={ratingSx}>
            ★ {service.ratingAverage || "0.0"}
          </Typography>

          <Typography sx={priceSx}>
            {Number(service.price).toLocaleString()}
            <Box component="span" sx={currencySx}>
              PKR
            </Box>
          </Typography>
        </Stack>

        { !isOwn && <Button
          fullWidth
          onClick={handleBook}
          variant="contained"
          size="small"
          sx={bookButtonSx}
        >
          Book Service
        </Button> }
      </Box>
    </Card>
  );
}

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  cursor: "pointer",
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  boxShadow: "none",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: 3,
  },
};

/** @type {import("@mui/material").SxProps} */
const imageWrapperSx = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  bgcolor: "action.hover",
};

/** @type {import("@mui/material").SxProps} */
const imageSx = {
  display: "block",
  width: "100%",
  aspectRatio: "2 / 1",
  objectFit: "cover",
};

/** @type {import("@mui/material").SxProps} */
const statusSx = {
  position: "absolute",
  top: 10,
  right: 10,
  px: 1,
  py: 0.4,
  borderRadius: 1,
  bgcolor: "rgba(0, 0, 0, 0.65)",
  color: "common.white",
  fontSize: 10,
  fontWeight: 600,
  backdropFilter: "blur(4px)",
};

/** @type {import("@mui/material").SxProps} */
const contentSx = {
  p: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const providerSx = {
  width: "fit-content",
  mb: 1.25,
  cursor: "pointer",
  borderRadius: 1,
  transition: "opacity 0.2s ease",
  alignItems:"center",
  "&:hover": {
    opacity: 0.75,
  },
};

/** @type {import("@mui/material").SxProps} */
const providerAvatarSx = {
  width: 24,
  height: 24,
  flexShrink: 0,
  fontSize: 13,
};

/** @type {import("@mui/material").SxProps} */
const providerNameSx = {
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.3,
};

/** @type {import("@mui/material").SxProps} */
const serviceNameSx = {
  fontSize: 17,
  fontWeight: 700,
  lineHeight: 1.35,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

/** @type {import("@mui/material").SxProps} */
const descriptionSx = {
  mt: 0.5,
  minHeight: 38,
  fontSize: 12.5,
  lineHeight: 1.5,
  color: "text.secondary",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const detailsSx = {
  mt: 1.5,
  pt: 1.25,
  borderTop: 1,
  borderColor: "divider",
  alignItems:"center",
  justifyContent:"space-between"
};

/** @type {import("@mui/material").SxProps} */
const ratingSx = {
  px: 0.75,
  py: 0.35,
  borderRadius: 1,
  bgcolor: "action.hover",
  fontSize: 12,
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const priceSx = {
  display: "flex",
  alignItems: "baseline",
  fontSize: 16,
  fontWeight: 700,
};

/** @type {import("@mui/material").SxProps} */
const currencySx = {
  ml: 0.4,
  fontSize: 9,
  fontWeight: 600,
  color: "text.secondary",
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