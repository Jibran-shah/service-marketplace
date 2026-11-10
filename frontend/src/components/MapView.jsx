import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";

import { Box } from "@mui/material";
import { useState } from "react";

import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { createDivIcon } from "../utils/mapUtils";

export default function MapView({
  markers = [],
  center = [33.6844, 73.0479],
  zoom = 12,
  renderMarker,
  renderClicked,
  onMarkerClick,
}) {

  const [clickedMarker, setClickedMarker] = useState(null);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          maxClusterRadius={80}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createDivIcon(renderMarker(marker))}
              eventHandlers={{
                click: () => {
                  setClickedMarker(marker);
                  onMarkerClick?.(marker);
                }              }}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {clickedMarker && renderClicked && (
        <Box
          sx={{
            position: "relative",
            zIndex: 1000,
          }}
        >
          {renderClicked( clickedMarker, () => {
            setClickedMarker(null);
          })}
        </Box>
      )}
    </Box>
  );
}