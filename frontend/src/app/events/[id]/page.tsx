"use client";

import BaseLayout from "@/components/layouts/base";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import EventDetails from "./event-details";
import { useParams } from "next/navigation";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Map } from "leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { getLoginToken } from "@/lib/storage";
import Redirect from "@/components/redirect";

const ICON = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [50, 82],
});

export default function Page() {
  const [eventLocation, setEventLocation] = useState<[number, number] | null>(
    null
  );
  const params = useParams<{ id: string }>();
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

  const onEventLocationChange = (location: [number, number]) => {
    if (
      eventLocation?.[0] === location[0] &&
      eventLocation?.[1] === location[1]
    ) {
      return;
    }
    setEventLocation(location);
    if (mapRef.current) {
      console.log("Panning to location", location);
      mapRef.current.panTo(location);
    }
  };

  return (
    <div className="flex h-screen">
      <BaseLayout className="basis-1/2 overflow-y-auto min-h-screen relative">
        <main className="px-12 pt-10">
          <Link className="text-ochre flex items-center gap-2" href="/events">
            <CaretLeft size={15} />
            <p>Go to events list</p>
          </Link>
          <EventDetails
            id={parseInt(params.id)}
            onEventLocationChange={onEventLocationChange}
          />
        </main>
      </BaseLayout>
      <div className="basis-1/2 relative">
        <MapContainer
          center={[34, 6.85]}
          zoom={9}
          scrollWheelZoom={true}
          ref={mapRef}
          className="h-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {eventLocation !== null && (
            <Marker position={eventLocation} icon={ICON} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
