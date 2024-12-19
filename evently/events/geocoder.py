import requests

def get_address_coords(address: str) -> tuple[float, float]:
	params = {
		"q": address,
		"api_key": ""
	} 
	url = "https://geocode.maps.co/search"
	response = requests.get(url, params=params)
	response.raise_for_status()
	data = response.json()
	coords = (float(data[0]["lat"]), float(data[0]["lon"]))
	return coords