import { getTokenHeader } from "../storage";
import { Event, MessageResponse } from "../types";
import { BASE_URL } from "./common";

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/events/`, { headers: getTokenHeader() });
  if (!res.ok) {
	throw new Error("Failed to fetch events");
  }
  return await res.json();
}

export async function getFilteredEvents(lat: number, long: number,  radius: number): Promise<Event[]> {
	const url = new URL(`${BASE_URL}/events/filter/`);
	url.searchParams.append("radius", radius.toString());
	url.searchParams.append("latitude", lat.toString());
	url.searchParams.append("longitude", long.toString());
	const res = await fetch(url, { headers: getTokenHeader() });
	if (!res.ok) {
	  throw new Error("Failed to fetch events");
	}
	return await res.json();
  }
  

export async function getEvent(id: number): Promise<Event> {
  const res = await fetch(`${BASE_URL}/events/${id}/`, { headers: getTokenHeader() });
  if (!res.ok) {
	throw new Error("Failed to fetch event");
  }
  return await res.json();
}

export async function toggleAttendEvent(id: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE_URL}/events/${id}/attendance/`, {
	method: "POST",
	headers: getTokenHeader()
  });
  if (!res.ok) {
	throw new Error("Failed to attend event");
  }
  return await res.json();
}

export async function createEvent(data: Event) {
  const res = await fetch(`${BASE_URL}/events/`, {
	method: "POST",
	headers: {
	  "Content-Type": "application/json",
	  ...getTokenHeader()
	},
	body: JSON.stringify(data)
  });
  if (!res.ok) {
	throw new Error("Failed to create event");
  }
  return await res.json();
}
