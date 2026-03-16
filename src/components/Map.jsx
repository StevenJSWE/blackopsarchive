import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Fix Leaflet default marker icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STATUS_COLORS = {
  confirmed: "#39ff14",
  alleged: "#cc0000",
  disputed: "#f59e0b",
};

function createMarkerIcon(status) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.alleged;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 19 11 19S22 19.25 22 11C22 4.925 17.075 0 11 0z" fill="${color}" opacity="0.85"/>
    <circle cx="11" cy="11" r="4.5" fill="#0a0a0a"/>
  </svg>`;
  return L.divIcon({
    className: "",
    html: svg,
    iconSize: [22, 30],
    iconAnchor: [11, 30],
    popupAnchor: [0, -32],
  });
}

function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 36px;
      height: 36px;
      background: #0a0a0a;
      border: 1px solid #39ff14;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: IBM Plex Mono, monospace;
      font-size: 12px;
      color: #39ff14;
      font-weight: bold;
    ">${count}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export default function Map({ pins }) {
  return (
    <div style={{ height: "100%", width: "100%", minHeight: "500px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
          maxClusterRadius={40}
        >
          {pins.map((pin) => {
            const statusColor = STATUS_COLORS[pin.status] || STATUS_COLORS.alleged;
            const statusLabel = pin.status ? pin.status.toUpperCase() : "UNKNOWN";
            return (
              <Marker
                key={pin.slug}
                position={[pin.lat, pin.lng]}
                icon={createMarkerIcon(pin.status)}
              >
                <Popup>
                  <div style={{
                    background: "#0f0f0f",
                    border: "1px solid #4a4a4a",
                    padding: "12px 14px",
                    minWidth: "200px",
                    fontFamily: "IBM Plex Mono, monospace",
                  }}>
                    <span style={{
                      fontSize: "9px",
                      color: statusColor,
                      border: `1px solid ${statusColor}`,
                      padding: "1px 5px",
                      letterSpacing: "0.15em",
                      display: "inline-block",
                      marginBottom: "6px",
                    }}>
                      {statusLabel}
                    </span>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#e5e5e5",
                      marginBottom: "4px",
                      fontFamily: "Russo One, sans-serif",
                      letterSpacing: "0.03em",
                    }}>
                      {pin.title}
                    </div>
                    <p style={{ fontSize: "11px", color: "#707070", margin: "0 0 8px 0", lineHeight: "1.5" }}>
                      {pin.summary.length > 100 ? pin.summary.slice(0, 100) + "…" : pin.summary}
                    </p>
                    <a
                      href={`/articles/${pin.slug}`}
                      style={{ fontSize: "10px", color: "#39ff14", letterSpacing: "0.1em", textDecoration: "none" }}
                    >
                      READ FILE →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
