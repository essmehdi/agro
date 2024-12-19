"use client";

import Error from "@/components/error";
import Loading from "@/components/loading";
import { toggleAttendEvent, getEvent } from "@/lib/backend/events";
import { Clock, MapPin, User } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type EventDetailsProps = {
  id: number;
  onEventLocationChange?: (location: [number, number]) => void;
};

export default function EventDetails({
  id,
  onEventLocationChange,
}: EventDetailsProps) {
  const queryClient = useQueryClient();
  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
  });

  const { mutate, status } = useMutation({
    mutationFn: () => toggleAttendEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });

  useEffect(() => {
    if (event && onEventLocationChange) {
      onEventLocationChange([event.latitude, event.longitude]);
    }
  }, [event, onEventLocationChange]);

  if (isLoading) return <Loading className="block p-10 text-neutral-700" />;

  if (!event || error)
    return <Error message="Could not fetch events" className="px-10 py-20" />;

  const handleAttendButton = () => {
    mutate();
  }

  const locationSplit = event.location?.split(",") ?? [
    `${event.latitude}, ${event.longitude}`,
  ];
  const locationFirst =
    locationSplit.length > 1
      ? locationSplit.slice(0, -1).join(", ")
      : locationSplit[0];
  const locationLast = locationSplit.length > 1 ? locationSplit.at(-1)! : null;

  const eventStartDate = new Date(event.start_time);
  const eventEndDate = event.end_time ? new Date(event.end_time) : null;

  return (
    <div className="min-h-full mb-24">
      <h1 className="text-5xl font-bold text-drab-brown mt-5">{event.title}</h1>
      <div className="flex items-center mt-5 gap-20">
        <div className="text-reseda-green flex items-center gap-3">
          <MapPin size={24} weight="fill" />
          <p className="leading-none">
            <span className="text-lg font-bold">{locationFirst}</span>
            {locationLast ? (
              <>
                <br />
                {locationLast}
              </>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div className="text-reseda-green flex items-center gap-3">
          <Clock size={24} weight="fill" />
          <p className="leading-none">
            <span className="text-lg font-bold">
              {eventStartDate.toLocaleDateString()}
            </span>
            <br />
            {eventStartDate.toLocaleTimeString()}
            {eventEndDate ? ` to ${eventEndDate.toLocaleTimeString()}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-10 space-y-3">
        <h3 className="text-xl font-bold text-drab-brown">Description</h3>
        <p className="text-lg text-neutral-600 text-justify">
          {event.description}
        </p>
      </div>
      <div className="mt-10 space-y-3">
        <h3 className="text-xl font-bold text-drab-brown">Organizers</h3>
        <div className="text-lg text-neutral-600 text-justify">
          {[event.owner, ...event.organizers].map((organizer) => (
            <div
              key={organizer.id}
              className="flex items-center gap-3 text-black"
            >
              <User />
              {`${organizer.first_name} ${organizer.last_name}`}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 px-5 py-2 bg-white border-t border-neutral-200 w-1/2">
        <button
          type="submit"
          disabled={status === "pending"}
          onClick={handleAttendButton}
          className={`w-full p-3 ${event.is_user_attending ? "bg-opacity-20 text-ochre" : "text-white"} bg-ochre font-semibold rounded-xl text-xl transition-all hover:scale-[101%] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ochre`}
        >
          { event.is_user_attending ? "You are attending" : "Attend"}
        </button>
      </div>
    </div>
  );
}
