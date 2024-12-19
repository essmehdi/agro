"use client";

import BaseLayout from "@/components/layouts/base";
import { Target } from "@phosphor-icons/react";
import EventsList from "./events-list";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { Map } from "leaflet";
import { MapEventHandlers } from "@/components/map-handlers";
import { getLoginToken } from "@/lib/storage";
import Redirect from "@/components/redirect";

function radiusToZoom(radius: number) {
  const earthCircumference = 40075.017;

  const kmPerPixel = earthCircumference / 256;

  const requiredPixels = (radius * 2) / kmPerPixel;

  const zoom = Math.log(1024 / requiredPixels) / Math.log(2);

  return Math.min(Math.max(Math.floor(zoom), 0), 18);
}

function zoomToRadius(zoom: number) {
  const earthCircumference = 40075.017;
  const kmPerPixel = earthCircumference / 256;

  const visiblePixels = 1024 / Math.pow(2, zoom);

  const radius = (visiblePixels * kmPerPixel) / 2;

  return Math.round(radius * 100) / 100;
}

export default function Page() {
  const [radius, setRadius] = useState(5000);
  const [coordinates, setCoordinates] = useState([34, 6.85]);
  const mapRef = useRef<Map>(null);

  const [loggedIn] = useState(() => {
    if (getLoginToken() === "") {
      return false;
    }
    return true;
  });
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  const onRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (mapRef.current) {
      mapRef.current.setZoom(radiusToZoom(newRadius));
    }
  };

  const handleZoomChange = (zoom: number) => {
    setRadius(zoomToRadius(zoom));
  };

  const handleCoordinatesChange = (lat: number, lon: number) => {
    console.log("Changing coordinates");
    setCoordinates([lat, lon]);
  };

  return (
    <div className="flex h-screen">
      <BaseLayout className="basis-1/2 overflow-y-auto">
        <main className="px-12 pt-10">
          <h1 className="flex items-center font-bold gap-5 text-4xl text-drab-brown mb-5">
            <Target size={42} />
            Events near me
          </h1>
          <EventsList
            latitude={coordinates[0]}
            longitude={coordinates[1]}
            radius={radius}
          />
        </main>
      </BaseLayout>
      <div className="basis-1/2 relative">
        <MapContainer
          center={[34, 6.85]}
          zoom={radiusToZoom(radius)}
          scrollWheelZoom={true}
          ref={mapRef}
          maxZoom={radiusToZoom(1)}
          minZoom={radiusToZoom(10000)}
          className="h-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEventHandlers
            onCoordinatesChange={handleCoordinatesChange}
            onZoomChange={handleZoomChange}
          />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white rounded-xl space-y-1 z-[99999] py-3 px-5">
            <div className="flex justify-between">
              <p className="text-lg">Search radius</p>
              <p className="text-lg font-bold text-ochre">{radius}Km</p>
            </div>
            <input
              type="range"
              min={1}
              max={10000}
              step={1}
              value={radius}
              onChange={(e) => onRadiusChange(+e.target.value)}
              className="w-80 h-1 bg-ochre rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </MapContainer>
      </div>
    </div>
  );
}
