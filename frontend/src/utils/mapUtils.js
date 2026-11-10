import L from "leaflet";
import { renderToString } from "react-dom/server";

export function createDivIcon(component, cacheKey) {
  return L.divIcon({
    className: "",
    html: renderToString(component),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });
}