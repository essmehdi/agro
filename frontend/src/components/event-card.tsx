"use client";

import { Event } from "@/lib/types";
import { CaretRight, MapPin, UsersThree } from "@phosphor-icons/react";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <a
      href={`/events/${event.id}`}
      className="flex justify-between items-center relative p-5 group box-content w-full cursor-pointer rounded-lg hover:bg-neutral-100 transition-all right-5"
    >
      <div className="h-[1px] w-1/2 bg-neutral-200 absolute top-0 left-1/2 -translate-x-1/2 group-first:hidden group-hover:hidden"></div>
      <div className="h-[1px] w-1/2 bg-neutral-200 absolute bottom-0 left-1/2 -translate-x-1/2 group-last:hidden group-hover:hidden"></div>
      <div className="space-y-2">
        <h2 className="text-2xl text-black font-semibold">{event.title}</h2>
        <p className="text-neutral-500 line-clamp-3 text-ellipsis max-w-md text-justify leading-[1.15]">
          {event.description}
        </p>
        <p className="text-ochre flex items-center gap-2">
          <MapPin weight="fill" />
          {event.location ?? `${event.latitude}, ${event.longitude}`}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-ochre rounded-full px-3 py-1 text-white">
          <UsersThree weight="fill" size={20} />
          <p>{event.attendees}</p>
        </div>
        <CaretRight size={20} />
      </div>
    </a>
  );
}
