import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Fix Leaflet default marker icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STATUS_COLORS = {
  confirmed: "#39ff14",
  alleged:   "#cc0000",
  disputed:  "#f59e0b",
};

// SVG marker with optional pulse ring for confirmed ops
function createMarkerIcon(status) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.alleged;
  const isConfirmed = status === "confirmed";

  const pulseRing = isConfirmed
    ? `<circle cx="11" cy="11" r="9" fill="none" stroke="${color}" stroke-width="1" opacity="0.4">
         <animate attributeName="r" from="9" to="16" dur="2s" repeatCount="indefinite"/>
         <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite"/>
       </circle>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    ${pulseRing}
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill="${color}" opacity="${isConfirmed ? 0.9 : 0.75}"/>
    <circle cx="14" cy="14" r="5" fill="#0a0a0a"/>
    ${isConfirmed ? `<circle cx="14" cy="14" r="2.5" fill="${color}" opacity="0.8"/>` : ""}
  </svg>`;

  return L.divIcon({
    className: "",
    html: svg,
    iconSize:    [28, 36],
    iconAnchor:  [14, 36],
    popupAnchor: [0, -38],
  });
}

function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  const size  = count > 20 ? 44 : count > 10 ? 40 : 36;
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: #0d0d0d;
      border: 1px solid #39ff14;
      box-shadow: 0 0 8px rgba(57,255,20,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: ${count > 9 ? 11 : 12}px;
      color: #39ff14;
      font-weight: 700;
      letter-spacing: 0.05em;
    ">${count}</div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function Map({ pins }) {
  return (
    <div style={{ height: "100%", width: "100%", minHeight: "500px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/" style="color:#4a4a4a">CARTO</a>'
          maxZoom={18}
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
          maxClusterRadius={50}
          animate={true}
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
                    background: "#0d0d0d",
                    border: `1px solid ${statusColor}30`,
                    borderTop: `2px solid ${statusColor}`,
                    padding: "12px 14px",
                    minWidth: "210px",
                    maxWidth: "260px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 12px ${statusColor}15`,
                  }}>
                    {/* Status badge */}
                    <span style={{
                      fontSize: "8px",
                      color: statusColor,
                      border: `1px solid ${statusColor}60`,
                      background: `${statusColor}10`,
                      padding: "1px 6px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "8px",
                    }}>
                      {statusLabel}
                    </span>

                    {/* Title */}
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#e5e5e5",
                      marginBottom: "5px",
                      fontFamily: "'Russo One', sans-serif",
                      letterSpacing: "0.03em",
                      lineHeight: "1.3",
                    }}>
                      {pin.title}
                    </div>

                    {/* Summary */}
                    <p style={{
                      fontSize: "11px",
                      color: "#707070",
                      margin: "0 0 10px 0",
                      lineHeight: "1.55",
                    }}>
                      {pin.summary.length > 90 ? pin.summary.slice(0, 90) + "…" : pin.summary}
                    </p>

                    {/* CTA */}
                    <a
                      href={`/articles/${pin.slug}`}
                      style={{
                        fontSize: "9px",
                        color: statusColor,
                        letterSpacing: "0.15em",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        borderBottom: `1px solid ${statusColor}40`,
                        paddingBottom: "1px",
                        display: "inline-block",
                      }}
                    >
                      Access File →
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
