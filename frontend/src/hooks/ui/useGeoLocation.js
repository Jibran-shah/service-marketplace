import { useEffect, useState } from "react";
export function useGeoLocation(setValue) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      setError("Geolocation is not supported by this browser.");
      return;
    }
    setStatus("requesting");
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("locationLat", coords.latitude);
        setValue("locationLn", coords.longitude);
        setStatus("granted");
      },
      (geoError) => {
        setStatus("denied");
        setError(getErrorMessage(geoError));
      },
      GEOLOCATION_OPTIONS
    );
  }, [setValue]);

  return { status, error };
}

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const getErrorMessage = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access denied. You can still continue manually.";
    case error.POSITION_UNAVAILABLE:
      return "Your current location is unavailable.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again.";
    default:
      return "Unable to retrieve your location.";
  }
};