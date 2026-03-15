import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default marker icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
        {pins.map((pin) => (
          <Marker key={pin.slug} position={[pin.lat, pin.lng]}>
            <Popup>
              <div style={{ color: "#000" }}>
                <strong>{pin.title}</strong>
                <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                  {pin.summary}
                </p>
                <a href={`/articles/${pin.slug}`}>Read more →</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
