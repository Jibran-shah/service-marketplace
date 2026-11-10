import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import MapView from "../../components/MapView";
import ServiceCard from "./ServiceCard";

import { useServices } from "../../hooks/api/services/services.hooks";
import { ServiceMarker } from "./ServiceMarker";

const getCurrentLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError?.(new Error("Geolocation is not supported"));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      onSuccess([coords.latitude, coords.longitude]);
    },
    onError
  );
};

// ================= STYLES =================

/** @type {import("@mui/material").SxProps} */
const pageStyles = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const mapStyles = {
  width: "100%",
  height: "100%",
};

/** @type {import("@mui/material").SxProps} */
const backButtonStyles = {
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 1000,
};

/** @type {import("@mui/material").SxProps} */
const loadingStyles = {
  width: "100%",
  height: "100vh",
  display: "grid",
  placeItems: "center",
};

/** @type {import("@mui/material").SxProps} */
const errorStyles = {
  width: "100%",
  height: "100vh",
  display: "grid",
  placeItems: "center",
};

export default function ServicesMapPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation(
      setCurrentLocation,
      (error) => console.error("Location error:", error)
    );
  }, []);

  const query = useMemo(() => {
    return {
      search: searchParams.get("search"),
      category: searchParams.get("category"),
      minPrice: searchParams.get("minPrice"),
      maxPrice: searchParams.get("maxPrice"),
      sort: searchParams.get("sort"),
      status: searchParams.get("status"),
      provider: searchParams.get("provider"),
      page: searchParams.get("page"),
      limit: 12,
    };
  }, [searchParams]);

  const { data, isLoading, isError } = useServices(query,true);

  const services = data?.services ?? [];

  const mapMarkers = useMemo(() => {
    return services
      .filter(
        (service) =>
          Array.isArray(service?.location?.coordinates) &&
          service.location.coordinates.length === 2
      )
      .map((service) => ({
        id: service._id,
        lng: service.location.coordinates[0],
        lat: service.location.coordinates[1],
        name: service.name,
        description: service.description || "",
        image: service.provider?.user?.profile?.avatar?.file?.url,
        raw: service,
      }));
  }, [services]);

  const handleViewList = () => {
    navigate(`/services/search?${searchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <Box sx={loadingStyles}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={errorStyles}>
        <Typography color="error">
          Failed to load services
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={pageStyles}>
      {currentLocation && (
        <MapView
          markers={mapMarkers}
          renderMarker={(service) => (
            <ServiceMarker service={service}/>
          )}
          renderClicked={(service,onClear) => (
            <Box sx={{ width: 300, position:"fixed", top:12, left:0}}>
              <ServiceCard
                service={service.raw}
                compact
              />
              <Button onClick={onClear} fullWidth sx={{
                backgroundColor:"background.paper"
              }}>Clear</Button>
            </Box>
          )}
          onMarkerClick={(service) => {
            console.log("Clicked service:", service.raw);
          }}
          sx={mapStyles}
          center={currentLocation}
        />
      )}
    
      <IconButton
        onClick={handleViewList}
        sx={backButtonStyles}
      >
        <GridViewOutlined
          sx={{
            width: 60,
            height: 60,
          }}
        />
      </IconButton>
    </Box>
  );
}