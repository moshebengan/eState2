import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

const calculateCenter = (items) => {
  if (items.length === 0) return [52.4797, -1.90269]; // Default center if no items

  const latSum = items.reduce((sum, item) => sum + item.latitude, 0);
  const lngSum = items.reduce((sum, item) => sum + item.longitude, 0);
  const latAvg = latSum / items.length;
  const lngAvg = lngSum / items.length;

  return [latAvg, lngAvg];
};

function Map({ items }) {
  const center = calculateCenter(items);
  console.log(center)
 
  


  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : center
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
