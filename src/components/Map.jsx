import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// ── Leaflet icon fix ──────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Agency HQ data ────────────────────────────────────────────
// Real-world headquarters coordinates for each agency
const AGENCY_HQS = {
  "CIA":    { name: "CIA",    full: "Central Intelligence Agency",        lat: 38.9517,  lng: -77.1468, color: "#39ff14", country: "USA"    },
  "NSA":    { name: "NSA",    full: "National Security Agency",           lat: 39.1077,  lng: -76.7719, color: "#39ff14", country: "USA"    },
  "FBI":    { name: "FBI",    full: "Federal Bureau of Investigation",    lat: 38.8951,  lng: -77.0247, color: "#39ff14", country: "USA"    },
  "MI6":    { name: "MI6",    full: "Secret Intelligence Service",        lat: 51.4875,  lng: -0.1245,  color: "#4a9fff", country: "UK"     },
  "GCHQ":   { name: "GCHQ",   full: "Government Communications HQ",      lat: 51.8993,  lng: -2.0784,  color: "#4a9fff", country: "UK"     },
  "Mossad": { name: "Mossad", full: "Institute for Intelligence",         lat: 32.0741,  lng: 34.7922,  color: "#f59e0b", country: "Israel" },
  "KGB":    { name: "KGB",    full: "Committee for State Security",       lat: 55.7602,  lng: 37.6253,  color: "#cc0000", country: "USSR"   },
  "FSB":    { name: "FSB",    full: "Federal Security Service",           lat: 55.7602,  lng: 37.6253,  color: "#cc0000", country: "Russia" },
  "NATO":   { name: "NATO",   full: "North Atlantic Treaty Organization", lat: 50.8805,  lng: 4.4292,   color: "#4a9fff", country: "BE"     },
  "BND":    { name: "BND",    full: "Bundesnachrichtendienst",            lat: 52.5200,  lng: 13.4050,  color: "#f59e0b", country: "Germany"},
  "OSS":    { name: "OSS",    full: "Office of Strategic Services",       lat: 38.9517,  lng: -77.1468, color: "#39ff14", country: "USA"    },
  "MI5":    { name: "MI5",    full: "Security Service",                   lat: 51.4876,  lng: -0.1237,  color: "#4a9fff", country: "UK"     },
  "MSS":    { name: "MSS",    full: "Ministry of State Security",         lat: 39.9087,  lng: 116.3975, color: "#ff4444", country: "China"  },
  "PLA":    { name: "PLA",    full: "PLA Unit 61398 (APT1)",              lat: 31.2244,  lng: 121.4691, color: "#ff4444", country: "China"  },
  "DGSE":   { name: "DGSE",   full: "Direction Générale de la Sécurité Extérieure", lat: 48.8900, lng: 2.3770, color: "#f59e0b", country: "France" },
  "SVR":    { name: "SVR",    full: "Foreign Intelligence Service",       lat: 55.7060,  lng: 37.5240,  color: "#cc0000", country: "Russia" },
};

// ── Status colours ────────────────────────────────────────────
const STATUS_COLORS = {
  confirmed: "#39ff14",
  alleged:   "#cc0000",
  disputed:  "#f59e0b",
};

// ── Operation pin marker ──────────────────────────────────────
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
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z"
      fill="${color}" opacity="${isConfirmed ? 0.9 : 0.75}"/>
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

// ── HQ node marker ────────────────────────────────────────────
function createHQIcon(agency, isActive) {
  const hq    = AGENCY_HQS[agency];
  const color = hq?.color ?? "#39ff14";
  const size  = 44;

  // Diamond shape (rotated square) with agency code
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 44 44">
    <!-- Outer pulse ring -->
    <circle cx="22" cy="22" r="19" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.2">
      <animate attributeName="r" from="16" to="24" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite"/>
    </circle>
    <!-- Diamond body -->
    <rect x="11" y="11" width="22" height="22" rx="2"
      fill="#0a0a0a"
      stroke="${color}"
      stroke-width="${isActive ? 2 : 1.5}"
      transform="rotate(45 22 22)"
      style="filter: drop-shadow(0 0 ${isActive ? 8 : 4}px ${color})"
    />
    <!-- Inner dot -->
    <circle cx="22" cy="22" r="3" fill="${color}" opacity="0.9"/>
  </svg>`;

  return L.divIcon({
    className: "",
    html: svg,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

// ── Cluster icon ──────────────────────────────────────────────
function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  const size  = count > 20 ? 44 : count > 10 ? 40 : 36;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:#0d0d0d;
      border:1px solid #39ff14;
      box-shadow:0 0 8px rgba(57,255,20,0.25);
      display:flex; align-items:center; justify-content:center;
      font-family:'IBM Plex Mono',monospace;
      font-size:${count > 9 ? 11 : 12}px;
      color:#39ff14; font-weight:700; letter-spacing:0.05em;
    ">${count}</div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ── Map bounds helpers ────────────────────────────────────────
const LAT_BOUNDS = L.latLngBounds([[-85.0511, -36000], [85.0511, 36000]]);

function calcMinZoom() {
  if (typeof window === "undefined") return 2;
  return Math.ceil(Math.log2(Math.max(window.innerWidth, window.innerHeight) / 256));
}

function FitWorldMinZoom() {
  const map = useMap();
  useEffect(() => {
    const update = () => {
      const { x, y } = map.getSize();
      const zoom = Math.ceil(Math.log2(Math.max(x, y) / 256));
      map.setMinZoom(zoom);
      if (map.getZoom() < zoom) map.setZoom(zoom);
    };
    map.on("resize", update);
    return () => map.off("resize", update);
  }, [map]);
  return null;
}

// ── Animated network edges via SVG overlay ────────────────────
// Injects a <style> tag into the Leaflet SVG layer to drive
// stroke-dashoffset animation — the "signal travelling the wire" effect.
function NetworkEdgeAnimator() {
  const map = useMap();
  useEffect(() => {
    // Target the SVG pane leaflet uses for vector layers
    const pane = map.getPanes().overlayPane;
    if (!pane) return;
    const styleId = "boa-edge-anim";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .boa-edge {
        stroke-dasharray: 8 6;
        animation: boa-dash 1.8s linear infinite;
      }
      .boa-edge-alleged {
        stroke-dasharray: 4 8;
        animation: boa-dash 2.4s linear infinite;
      }
      @keyframes boa-dash {
        to { stroke-dashoffset: -28; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [map]);
  return null;
}

// ── Popup content helpers ─────────────────────────────────────
function OpPopup({ pin }) {
  const statusColor = STATUS_COLORS[pin.status] || STATUS_COLORS.alleged;
  const statusLabel = (pin.status || "unknown").toUpperCase();
  return (
    <div style={{
      background: "#0d0d0d",
      border: `1px solid ${statusColor}30`,
      borderTop: `2px solid ${statusColor}`,
      padding: "12px 14px",
      minWidth: "210px", maxWidth: "260px",
      fontFamily: "'IBM Plex Mono', monospace",
      boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 12px ${statusColor}15`,
    }}>
      <span style={{
        fontSize: "8px", color: statusColor,
        border: `1px solid ${statusColor}60`,
        background: `${statusColor}10`,
        padding: "1px 6px", letterSpacing: "0.2em",
        textTransform: "uppercase", display: "inline-block", marginBottom: "8px",
      }}>
        {statusLabel}
      </span>
      <div style={{
        fontSize: "13px", fontWeight: "bold", color: "#e5e5e5",
        marginBottom: "5px", fontFamily: "'Russo One', sans-serif",
        letterSpacing: "0.03em", lineHeight: "1.3",
      }}>
        {pin.title}
      </div>
      <p style={{ fontSize: "11px", color: "#707070", margin: "0 0 10px 0", lineHeight: "1.55" }}>
        {pin.summary.length > 90 ? pin.summary.slice(0, 90) + "…" : pin.summary}
      </p>
      <a href={`/articles/${pin.slug}`} style={{
        fontSize: "9px", color: statusColor,
        letterSpacing: "0.15em", textDecoration: "none",
        textTransform: "uppercase",
        borderBottom: `1px solid ${statusColor}40`,
        paddingBottom: "1px", display: "inline-block",
      }}>
        Access File →
      </a>
    </div>
  );
}

function HQPopup({ agency, operationCount, ops }) {
  const hq    = AGENCY_HQS[agency];
  const color = hq?.color ?? "#39ff14";
  return (
    <div style={{
      background: "#0d0d0d",
      border: `1px solid ${color}40`,
      borderTop: `3px solid ${color}`,
      padding: "14px 16px",
      minWidth: "220px", maxWidth: "280px",
      fontFamily: "'IBM Plex Mono', monospace",
      boxShadow: `0 4px 24px rgba(0,0,0,0.7), 0 0 16px ${color}20`,
    }}>
      <div style={{
        fontSize: "8px", color, letterSpacing: "0.25em",
        textTransform: "uppercase", marginBottom: "6px",
      }}>
        ◆ HQ NODE — {hq?.country ?? "UNKNOWN"}
      </div>
      <div style={{
        fontSize: "16px", fontFamily: "'Russo One', sans-serif",
        color: color, marginBottom: "2px", letterSpacing: "0.1em",
      }}>
        {agency}
      </div>
      <div style={{ fontSize: "10px", color: "#707070", marginBottom: "10px" }}>
        {hq?.full ?? agency}
      </div>
      <div style={{
        fontSize: "10px", color: "#4a4a4a",
        borderTop: `1px solid #1e1e1e`, paddingTop: "8px",
      }}>
        <span style={{ color }}>{operationCount}</span>
        {" "}operation{operationCount !== 1 ? "s" : ""} on record
      </div>
      {ops.slice(0, 3).map(op => (
        <a key={op.slug} href={`/articles/${op.slug}`} style={{
          display: "block", fontSize: "9px", color: "#4a4a4a",
          marginTop: "4px", textDecoration: "none", letterSpacing: "0.05em",
        }}
          onMouseEnter={e => e.target.style.color = color}
          onMouseLeave={e => e.target.style.color = "#4a4a4a"}
        >
          › {op.title}
        </a>
      ))}
      {ops.length > 3 && (
        <div style={{ fontSize: "9px", color: "#2a2a2a", marginTop: "4px" }}>
          +{ops.length - 3} more
        </div>
      )}
    </div>
  );
}

// ── Main Map component ────────────────────────────────────────
export default function Map({ pins }) {
  const [networkMode, setNetworkMode]     = useState(false);
  const [activeAgency, setActiveAgency]   = useState(null); // highlight single agency
  const [edgesVisible, setEdgesVisible]   = useState(true);
  const minZoom = calcMinZoom();

  // Build agency → pins lookup
  const agencyPins = {};
  for (const pin of pins) {
    for (const agency of (pin.agencies || [])) {
      if (!agencyPins[agency]) agencyPins[agency] = [];
      agencyPins[agency].push(pin);
    }
  }

  // Which HQs have at least one pin?
  const activeHQs = Object.keys(AGENCY_HQS).filter(
    ag => agencyPins[ag]?.length > 0
  );

  // Edges to render: HQ → each connected operation pin
  const edges = [];
  if (networkMode && edgesVisible) {
    for (const agency of activeHQs) {
      if (activeAgency && activeAgency !== agency) continue;
      const hq   = AGENCY_HQS[agency];
      const ops  = agencyPins[agency] || [];
      for (const op of ops) {
        edges.push({ agency, hq, op, color: hq.color });
      }
    }
  }

  return (
    <div style={{ position: "absolute", inset: 0 }}>

      {/* ── Mode toggle UI ─────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 24, left: 16,
        zIndex: 9999, display: "flex", flexDirection: "column", gap: "8px",
      }}>
        {/* MAP / NETWORK toggle */}
        <div style={{
          background: "#0a0a0a",
          border: "1px solid #2a2a2a",
          display: "flex",
          overflow: "hidden",
        }}>
          <button
            onClick={() => { setNetworkMode(false); setActiveAgency(null); }}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "7px 12px", border: "none", cursor: "pointer",
              background: !networkMode ? "#39ff1415" : "transparent",
              color:      !networkMode ? "#39ff14"   : "#4a4a4a",
              borderRight: "1px solid #2a2a2a",
              transition: "all 0.2s",
            }}
          >
            ◉ Map
          </button>
          <button
            onClick={() => setNetworkMode(true)}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "7px 12px", border: "none", cursor: "pointer",
              background: networkMode ? "#39ff1415" : "transparent",
              color:      networkMode ? "#39ff14"   : "#4a4a4a",
              transition: "all 0.2s",
            }}
          >
            ◆ Network
          </button>
        </div>

        {/* Agency filter pills — only in network mode */}
        {networkMode && (
          <div style={{
            background: "#0a0a0a",
            border: "1px solid #2a2a2a",
            padding: "8px",
            display: "flex", flexDirection: "column", gap: "4px",
            maxHeight: "260px", overflowY: "auto",
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "8px", letterSpacing: "0.2em",
              color: "#4a4a4a", textTransform: "uppercase",
              marginBottom: "4px",
            }}>
              Filter by agency
            </div>
            <button
              onClick={() => setActiveAgency(null)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px", letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 8px", border: "1px solid",
                borderColor: !activeAgency ? "#39ff14" : "#2a2a2a",
                color:        !activeAgency ? "#39ff14" : "#4a4a4a",
                background:   !activeAgency ? "#39ff1410" : "transparent",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              All agencies
            </button>
            {activeHQs.map(agency => {
              const hq     = AGENCY_HQS[agency];
              const isAct  = activeAgency === agency;
              return (
                <button
                  key={agency}
                  onClick={() => setActiveAgency(isAct ? null : agency)}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px", letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 8px", border: "1px solid",
                    borderColor: isAct ? hq.color : "#2a2a2a",
                    color:        isAct ? hq.color : "#4a4a4a",
                    background:   isAct ? `${hq.color}10` : "transparent",
                    cursor: "pointer", textAlign: "left",
                    display: "flex", justifyContent: "space-between",
                    transition: "all 0.15s",
                  }}
                >
                  <span>◆ {agency}</span>
                  <span style={{ color: "#2a2a2a" }}>{agencyPins[agency]?.length ?? 0}</span>
                </button>
              );
            })}

            {/* Edge toggle */}
            <button
              onClick={() => setEdgesVisible(v => !v)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "8px", letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 8px", border: "1px solid #2a2a2a",
                color: edgesVisible ? "#707070" : "#4a4a4a",
                background: "transparent",
                cursor: "pointer", textAlign: "left",
                marginTop: "4px",
                transition: "all 0.15s",
              }}
            >
              {edgesVisible ? "● Hide edges" : "○ Show edges"}
            </button>
          </div>
        )}
      </div>

      {/* ── Leaflet map ─────────────────────────────────────── */}
      <MapContainer
        center={[20, 0]}
        zoom={minZoom}
        minZoom={minZoom}
        maxBounds={LAT_BOUNDS}
        maxBoundsViscosity={1.0}
        worldCopyJump={true}
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <FitWorldMinZoom />
        {networkMode && <NetworkEdgeAnimator />}

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/" style="color:#4a4a4a">CARTO</a>'
          maxZoom={18}
        />

        {/* ── Network edges (polylines) ───────────────────── */}
        {edges.map(({ agency, hq, op, color }) => (
          <Polyline
            key={`edge-${agency}-${op.slug}`}
            positions={[[hq.lat, hq.lng], [op.lat, op.lng]]}
            pathOptions={{
              color,
              weight: 1,
              opacity: activeAgency === agency ? 0.6 : 0.25,
              className: op.status === "confirmed" ? "boa-edge" : "boa-edge-alleged",
            }}
          />
        ))}

        {/* ── Operation pins (map mode) ────────────────────── */}
        {!networkMode && (
          <MarkerClusterGroup
            iconCreateFunction={createClusterIcon}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={true}
            maxClusterRadius={50}
            animate={true}
            chunkedLoading={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={minZoom}
          >
            {pins.map(pin => (
              <Marker
                key={pin.slug}
                position={[pin.lat, pin.lng]}
                icon={createMarkerIcon(pin.status)}
              >
                <Popup><OpPopup pin={pin} /></Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}

        {/* ── Operation pins (network mode — no clustering) ── */}
        {networkMode && pins
          .filter(pin =>
            !activeAgency ||
            (pin.agencies || []).includes(activeAgency)
          )
          .map(pin => (
            <Marker
              key={`net-${pin.slug}`}
              position={[pin.lat, pin.lng]}
              icon={createMarkerIcon(pin.status)}
            >
              <Popup><OpPopup pin={pin} /></Popup>
            </Marker>
          ))
        }

        {/* ── HQ nodes (network mode only) ────────────────── */}
        {networkMode && activeHQs
          .filter(ag => !activeAgency || activeAgency === ag)
          .map(agency => {
            const hq  = AGENCY_HQS[agency];
            const ops = agencyPins[agency] || [];
            return (
              <Marker
                key={`hq-${agency}`}
                position={[hq.lat, hq.lng]}
                icon={createHQIcon(agency, activeAgency === agency)}
                zIndexOffset={1000}
              >
                <Popup>
                  <HQPopup agency={agency} operationCount={ops.length} ops={ops} />
                </Popup>
              </Marker>
            );
          })
        }

      </MapContainer>
    </div>
  );
}
