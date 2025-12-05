const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function geocodeCity(city) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur réseau (géocodage)');
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error('Ville introuvable');
  const { latitude, longitude, name, country_code } = data.results[0];
  return { latitude, longitude, name, country_code };
}

export async function fetchWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current_weather: 'true',
    daily: ['temperature_2m_max','temperature_2m_min','weathercode'].join(','),
    timezone: 'auto',
    forecast_days: '5'
  });
  const url = `${WEATHER_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur réseau (météo)');
  return await res.json();
}

export function mapWeatherCodeToIcon(code){
  // Minimal mapping; can be expanded
  if (code === 0) return '☀️';
  if ([1,2,3].includes(code)) return '⛅';
  if ([45,48].includes(code)) return '🌫️';
  if ([51,53,55,56,57,61,63,65,66,67].includes(code)) return '🌧️';
  if ([71,73,75,77,85,86].includes(code)) return '❄️';
  if ([80,81,82].includes(code)) return '🌦️';
  if ([95,96,99].includes(code)) return '⛈️';
  return '🌡️';
}
