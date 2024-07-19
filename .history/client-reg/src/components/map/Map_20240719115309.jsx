import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { useEffect } from "react";
import L from 'leaflet';

const FitBounds = ({items}) => {
  const map = useMap();
  
  useEffect(() => {
    if (items.length === 0) return;

    const bounds = new L.latLngBounds(
      items.map(item => [item.latitude, item.longitude])
    );
    map.fitBounds(bounds, {
      padding:[50, 50],
    })
  },[items, map])

  return null;
}

function Map({ items }) {
  
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [52.4797, -1.90269]
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds items={items} />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
