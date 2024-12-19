"use client";

import Error from "@/components/error";
import EventCard from "@/components/event-card";
import Loading from "@/components/loading";
import { getFilteredEvents } from "@/lib/backend/events";
import { useQuery } from "@tanstack/react-query";

type EventsListProps = {
	latitude: number;
	longitude: number;
	radius: number;
};

export default function EventsList({ latitude, longitude, radius }: EventsListProps) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["events", latitude, longitude, radius],
		queryFn: () => getFilteredEvents(latitude, longitude, radius),
	});

	if (!data && isLoading) return <Loading className="block p-10 text-neutral-700" />;

	if (!data || error) return <Error message="Could not fetch events" className="px-10 py-20" />;

	if (data.length === 0) return <Error message="No event in this area" className="px-10 py-20" />;

	return (
		<div>
			{data.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</div>
	)
}