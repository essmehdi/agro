import { useMapEvents } from "react-leaflet";

type MapEventHandlersProps = {
	onZoomChange: (zoom: number) => void;
	onCoordinatesChange: (latitude: number, longitude: number) => void;
}

export function MapEventHandlers({ onZoomChange, onCoordinatesChange }: MapEventHandlersProps) {
	const mapEvents = useMapEvents({
		zoomend: () => {
			onZoomChange(mapEvents.getZoom());
		},
		moveend: () => {
			const center = mapEvents.getCenter();
			onCoordinatesChange(center.lat, center.lng);
		}
	});

	return null;
}